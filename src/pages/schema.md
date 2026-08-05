---
layout: ../layouts/Layout.astro
title: JSON Schema
---

# JSON Schema

Machine-readable JSON Schemas for validating BCP files. Served with `Content-Type: application/schema+json` to enable automated tooling.

## Current schema

- [brand-context.schema.json](https://schema.brandcontextprotocol.dev/brand-context.schema.json) — Validates v0.8 root, pointer, and daughter frontmatter, including self-hosted and Registry-backed references
- [claims.schema.json](https://schema.brandcontextprotocol.dev/claims.schema.json) — Validates the deterministic claims companion
- [manifest.schema.json](https://schema.brandcontextprotocol.dev/manifest.schema.json) — Validates package file records, checksums, and extension metadata

## v0.2 daughter schemas

- [voice.schema.json](https://schema.brandcontextprotocol.dev/v0.2/voice.schema.json) — Validates `voice.md` frontmatter and structured body blocks (traits, vocabulary, messaging tiers, anti-AI patterns)
- [visual.json](https://schema.brandcontextprotocol.dev/v0.2/visual.json) — Validates `visual.md` (logo variants, color tokens, typography, imagery)
- [representation.json](https://schema.brandcontextprotocol.dev/v0.2/representation.json) — Validates `representation.md` including `never_compare_to` and `framing_traps`

## v0.1 Schemas

- [brand.json](https://schema.brandcontextprotocol.dev/v0.1/brand.json) — Root frontmatter schema

## Schema source

All schemas are published in the [canonical spec repository](https://github.com/Brand-Context-Protocol/spec/tree/main/schema).
