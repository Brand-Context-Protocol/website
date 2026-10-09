---
layout: ../layouts/Layout.astro
title: JSON Schema
description: JSON Schemas for validating Brand Context Protocol files and building conformant tools.
---

# JSON Schema

Machine-readable JSON Schemas for validating BCP files. Served with `Content-Type: application/schema+json` to enable automated tooling.

## BCP 2.0 schemas and validator

- [2.0 frontmatter](/schema/2.0/frontmatter.schema.json) — exact protocol version, source coverage and file metadata.
- [2.0 claims blocks](/schema/2.0/claims.schema.json) — independent use, evidence and brand-approval statuses.
- [2.0 delivery](/schema/2.0/delivery.schema.json) — response scope, exact requested-file identity and integrity scope.
- [Reference validator download](/validator/bcp-2.0.0.tgz) — extract, run `npm install --ignore-scripts`, then `npm test` or `npm run validate -- package files.json`.
- [2.0 migration mapping](/spec/migrations/1.x-to-2.0/) — preserve ownership, editorial content, evidence dates and historical signatures.
- [Independent example and conformance tests](https://github.com/Brand-Context-Protocol/spec/tree/main/examples/2.0) — no Encoded account or domain required.

The validator checks document structure and delivery consistency. It does not establish factual truth, legal approval, successful AI ingestion or independent signature verification.

## Historical schemas (1.x and earlier)

- [brand-context.schema.json](https://schema.brandcontextprotocol.dev/brand-context.schema.json) — Validates BCP v1.1.0 root, pointer, and daughter frontmatter, including Registry-direct, self-hosted, and Registry-backed packages
- [claims.schema.json](https://schema.brandcontextprotocol.dev/claims.schema.json) — Validates the deterministic claims companion, including three-component BCP versions
- [manifest.schema.json](https://schema.brandcontextprotocol.dev/manifest.schema.json) — Validates package file records, checksums, extension metadata, and three-component BCP versions

## v0.2 daughter schemas

- [voice.schema.json](https://schema.brandcontextprotocol.dev/v0.2/voice.schema.json) — Validates `voice.md` frontmatter and structured body blocks (traits, vocabulary, messaging tiers, anti-AI patterns)
- [visual.json](https://schema.brandcontextprotocol.dev/v0.2/visual.json) — Validates `visual.md` (logo variants, color tokens, typography, imagery)
- [representation.json](https://schema.brandcontextprotocol.dev/v0.2/representation.json) — Validates `representation.md` including `never_compare_to` and `framing_traps`

## v0.1 Schemas

- [brand.json](https://schema.brandcontextprotocol.dev/v0.1/brand.json) — Root frontmatter schema

## Schema source

All schemas are published in the [canonical spec repository](https://github.com/Brand-Context-Protocol/spec/tree/main/schema).
