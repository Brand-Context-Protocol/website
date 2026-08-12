#!/usr/bin/env node

// Public, dependency-free verifier for a signed Registry publication.
// Source and verification guidance: https://brandcontextprotocol.dev/registry-verification

import { createHash, createPublicKey, verify } from "node:crypto";
import { realpathSync } from "node:fs";
import { pathToFileURL } from "node:url";

function requireHeader(response, name) {
  const value = response.headers.get(name);
  if (!value) throw new Error(`missing ${name} response header`);
  return value;
}

function rawEd25519Jwk(rawBase64) {
  const raw = Buffer.from(rawBase64, "base64");
  if (raw.byteLength !== 32) throw new Error("registry key is not a 32-byte Ed25519 public key");
  return {
    kty: "OKP",
    crv: "Ed25519",
    x: raw.toString("base64url"),
    key_ops: ["verify"],
    ext: true,
  };
}

export async function verifyPublication(recordUrl, options = {}) {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  if (typeof fetchImpl !== "function") throw new Error("fetch is unavailable");

  const url = new URL(recordUrl);
  if (url.protocol !== "https:" && !options.allowInsecureHttp) {
    throw new Error("publication URL must use HTTPS");
  }
  const keysetUrl = options.keysetUrl ?? new URL("/.well-known/registry-public-keys", url).href;

  const recordResponse = await fetchImpl(url, {
    headers: { accept: "text/markdown, application/json;q=0.9, */*;q=0.1" },
    cache: "no-store",
  });
  if (!recordResponse.ok) throw new Error(`publication fetch failed with HTTP ${recordResponse.status}`);

  const content = Buffer.from(await recordResponse.arrayBuffer());
  const expectedDigest = requireHeader(recordResponse, "x-content-sha256").toLowerCase();
  const signatureBase64 = requireHeader(recordResponse, "x-signature");
  const kid = requireHeader(recordResponse, "x-signature-kid");
  const actualDigest = createHash("sha256").update(content).digest("hex");
  if (actualDigest !== expectedDigest) {
    throw new Error(`content digest mismatch: expected ${expectedDigest}, got ${actualDigest}`);
  }

  const keyResponse = await fetchImpl(keysetUrl, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!keyResponse.ok) throw new Error(`registry keyset fetch failed with HTTP ${keyResponse.status}`);
  const payload = await keyResponse.json();
  if (!payload || !Array.isArray(payload.keys)) throw new Error("registry keyset response is invalid");
  const key = payload.keys.find((candidate) => candidate?.kid === kid);
  if (!key) throw new Error(`signing key ${kid} is absent from the current Registry keyset`);
  if (key.algorithm !== "Ed25519") throw new Error(`signing key ${kid} uses unsupported algorithm ${key.algorithm}`);

  const publicKey = createPublicKey({ key: rawEd25519Jwk(key.raw), format: "jwk" });
  const signature = Buffer.from(signatureBase64, "base64");
  if (!verify(null, content, publicKey, signature)) {
    throw new Error(`Ed25519 signature verification failed for key ${kid}`);
  }

  return { url: url.href, kid, sha256: actualDigest, bytes: content.byteLength, verified: true };
}

async function main() {
  const recordUrl = process.argv[2];
  if (!recordUrl) {
    console.error("Usage: node verify-publication.mjs <https://registry.../brand.md>");
    process.exitCode = 2;
    return;
  }
  console.log(JSON.stringify(await verifyPublication(recordUrl), null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main().catch((error) => {
    console.error(`Verification failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
