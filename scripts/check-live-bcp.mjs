#!/usr/bin/env node
import { createHash, createPublicKey, verify } from "node:crypto";

const domainBase = "https://brandcontextprotocol.dev";
const registryBase = "https://registry.brandcontextprotocol.dev";
const handle = "brand-context-protocol";
const paths = [
  "/.well-known/brand.md",
  "/.well-known/brand/voice.md",
  "/.well-known/brand/voice/anti-ai.md",
  "/.well-known/brand/values.md",
  "/.well-known/brand/boundaries.md",
  "/.well-known/brand/claims.md",
  "/.well-known/brand/representation.md",
  "/.well-known/brand/visual.md",
];

async function fetchBytes(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return { response, bytes: Buffer.from(await response.arrayBuffer()) };
}

const keysResponse = await fetch(`${registryBase}/.well-known/registry-public-keys`, {
  signal: AbortSignal.timeout(15_000),
});
if (!keysResponse.ok) throw new Error(`Registry public keys returned HTTP ${keysResponse.status}`);
const keyDocument = await keysResponse.json();
const keys = new Map(
  (Array.isArray(keyDocument.keys) ? keyDocument.keys : [])
    .filter((key) => key && key.revoked !== true && key.jwk)
    .map((key) => [key.kid, createPublicKey({ key: key.jwk, format: "jwk" })]),
);
if (keys.size === 0) throw new Error("Registry published no usable verification key");

let rootHeaders;
for (const path of paths) {
  const domain = await fetchBytes(`${domainBase}${path}`);
  const registry = await fetchBytes(`${registryBase}/${handle}${path}`);
  if (!domain.bytes.equals(registry.bytes)) throw new Error(`${path} differs between domain and Registry`);

  const digest = createHash("sha256").update(registry.bytes).digest("hex");
  if (registry.response.headers.get("x-content-sha256") !== digest) {
    throw new Error(`${path} content digest does not match its Registry header`);
  }
  const kid = registry.response.headers.get("x-signature-kid");
  const signature = registry.response.headers.get("x-signature");
  const key = keys.get(kid);
  if (!kid || !signature || !key || !verify(null, registry.bytes, key, Buffer.from(signature, "base64"))) {
    throw new Error(`${path} Registry signature is invalid`);
  }
  if (path === "/.well-known/brand.md") rootHeaders = registry.response.headers;
}

const requiredRootHeaders = {
  "x-trust-level": "verified",
  "x-official-brand-source": "true",
  "x-handle-verified": "yes",
  "x-handle-verified-domain": "brandcontextprotocol.dev",
};
for (const [name, expected] of Object.entries(requiredRootHeaders)) {
  if (rootHeaders?.get(name) !== expected) throw new Error(`${name} must equal ${expected}`);
}
for (const name of ["x-verified-at", "x-verification-last-checked-at", "x-verification-expires-at"]) {
  const value = rootHeaders?.get(name);
  if (!value || Number.isNaN(Date.parse(value))) throw new Error(`${name} must contain a valid timestamp`);
}

console.log("Protocol BCP is byte-identical, signature-valid, and DNS verified across all 8 files.");
