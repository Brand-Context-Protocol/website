---
layout: ../layouts/Layout.astro
title: Verify the Reference Registry
description: Independently verify signed Brand Context Protocol records from the Encoded Brands Registry.
---

# Verify the Reference Registry

The Encoded Brands reference Registry signs the exact bytes of every file when a publication is committed. You can verify any hosted BCP file independently using the public Ed25519 keyset and the integrity headers returned with the file.

Signing and DNS verification answer different questions:

- **Registry signing** proves that the bytes you received match an immutable publication committed under a currently trusted Registry signing key.
- **DNS verification** proves that the publishing account demonstrated control of the claimed brand domain at a point in time.

Neither proof warrants that every statement inside a BCP is true. Together they provide byte integrity, Registry provenance, and a separate domain-control signal.

## Canonical verification procedure

1. Fetch the Registry file over HTTPS and preserve the decoded HTTP entity bytes exactly. Do not trim, normalize, parse and reserialize, or change line endings.
2. Require `X-Content-Sha256`, `X-Signature`, and `X-Signature-Kid`.
3. Compute SHA-256 over the exact bytes and compare the lowercase hexadecimal digest with `X-Content-Sha256`.
4. Fetch the current kid-aware keyset from [registry.brandcontextprotocol.dev/.well-known/registry-public-keys](https://registry.brandcontextprotocol.dev/.well-known/registry-public-keys).
5. Select the Ed25519 public key whose `kid` exactly matches `X-Signature-Kid`. Fail closed if that key is absent.
6. Base64-decode the signature and public key, then verify the Ed25519 signature over the exact file bytes.
7. Accept the file as Registry-authenticated only when both digest and signature checks pass.

Do not silently fall back to unverified content if any header is missing, the key is absent, the digest differs, or the signature fails.

## Executable verifier

The public BCP site hosts the complete procedure, a dependency-free Node.js verifier, and the Registry's public key-lifecycle policy:

- [Verification procedure and failure semantics](#canonical-verification-procedure)
- [Executable verification script](/verify-publication.mjs)
- [Key rotation and emergency revocation policy](/registry-key-lifecycle)

Run it against any hosted file:

```bash
curl -O https://brandcontextprotocol.dev/verify-publication.mjs
node verify-publication.mjs \
  https://registry.brandcontextprotocol.dev/example-brand/.well-known/brand.md
```

A successful run returns a receipt containing the URL, key id, SHA-256 digest, byte count, and `verified: true`. A failed check exits nonzero.

## Key lifecycle

Consumers should use the plural keyset and select keys by `kid`. During an orderly rotation, the current and retained verification keys coexist until active publications have moved to the new key.

If a signing key is compromised, the Registry suspends affected publications and removes that key from the trusted keyset. Registry readers and independent consumers then fail closed. Affected records are restored only after they are republished from a trusted source under a replacement key.
