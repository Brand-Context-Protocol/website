---
layout: ../layouts/Layout.astro
title: Registry signing-key lifecycle
description: Public policy for Registry signing-key rotation and emergency revocation.
---

# Registry signing-key lifecycle

Registry publications are signed with Ed25519 keys. Consumers discover currently trusted verification keys at [registry.brandcontextprotocol.dev/.well-known/registry-public-keys](https://registry.brandcontextprotocol.dev/.well-known/registry-public-keys).

Each signed file exposes `X-Signature`, `X-Signature-Kid`, and `X-Content-Sha256`. Consumers must select the public key whose `kid` exactly matches the response header and fail closed when that key is absent, revoked, or cannot verify the response bytes.

## Routine rotation

During a planned rotation, the Registry publishes the new verification key while retaining the prior key. Newly published records use the current key. Previously published records remain verifiable under their existing key until their owners republish them or the agreed migration period ends.

The Registry does not rewrite an existing record's signature. A republish creates a new immutable revision, signed by the current key.

## Emergency revocation

If a signing key may be compromised, the Registry suspends affected publications and removes that key from the trusted keyset. Consumers must then reject affected records rather than treating historical signatures as valid.

Affected records are restored only after a trusted source republishes them under a replacement key. Integrity takes precedence over availability.

## Consumer requirements

- Fetch the plural keyset, not a pinned or legacy single-key endpoint.
- Match keys exactly by `kid`.
- Verify both the SHA-256 digest and the Ed25519 signature over the exact response bytes.
- Treat missing headers, unavailable keys, mismatched digests, and invalid signatures as verification failures.

Use the [canonical verification procedure](/registry-verification) and its [dependency-free Node.js verifier](/verify-publication.mjs) for a complete implementation.
