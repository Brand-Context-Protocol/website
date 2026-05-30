---
layout: ../layouts/Layout.astro
title: JSON Schema
---

# JSON Schema

Machine-readable JSON Schemas for validating BCP files. Served with `Content-Type: application/schema+json` to enable automated tooling.

## v0.2 Schemas (current)

- [voice.schema.json](https://schema.brandcontextprotocol.dev/v0.2/voice.schema.json) — Validates `voice.md` frontmatter and structured body blocks (traits, vocabulary, messaging tiers, anti-AI patterns)
- [visual.json](https://schema.brandcontextprotocol.dev/v0.2/visual.json) — Validates `visual.md` (logo variants, color tokens, typography, imagery)
- [representation.json](https://schema.brandcontextprotocol.dev/v0.2/representation.json) — Validates `representation.md` including `never_compare_to` and `framing_traps`

## v0.1 Schemas

- [brand.json](https://schema.brandcontextprotocol.dev/v0.1/brand.json) — Root frontmatter schema

## Schema source

All schemas are published in the [canonical spec repository](https://github.com/Brand-Context-Protocol/spec/tree/main/schema).
