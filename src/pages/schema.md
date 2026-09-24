---
layout: ../layouts/Layout.astro
title: JSON Schema
---

# JSON Schema

Machine-readable JSON Schemas for validating BCP files. The six current and v0.2 links below are **raw source fallbacks** from the canonical spec repository while their intended `schema.brandcontextprotocol.dev` endpoints return 404. GitHub serves these JSON files as `text/plain`; parse the response body as JSON. The `$id` values still name the intended canonical endpoints and are **not yet live schema URLs**. The historical v0.1 link remains hosted with `Content-Type: application/schema+json`.

## Current schema

- [brand-context.schema.json (raw source fallback)](https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/schema/brand-context.schema.json) — Validates BCP v1.1.0 root, pointer, and daughter frontmatter, including Registry-direct, self-hosted, and Registry-backed packages
- [claims.schema.json (raw source fallback)](https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/schema/claims.schema.json) — Validates the deterministic claims companion, including three-component BCP versions
- [manifest.schema.json (raw source fallback)](https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/schema/manifest.schema.json) — Validates package file records, checksums, extension metadata, and three-component BCP versions

## v0.2 daughter schemas

- [voice.schema.json (raw source fallback)](https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/schema/v0.2/voice.schema.json) — Validates `voice.md` frontmatter and structured body blocks (traits, vocabulary, messaging tiers, anti-AI patterns)
- [visual.json (raw source fallback)](https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/schema/v0.2/visual.json) — Validates `visual.md` (logo variants, color tokens, typography, imagery)
- [representation.json (raw source fallback)](https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/schema/v0.2/representation.json) — Validates `representation.md` including `never_compare_to` and `framing_traps`

## v0.1 Schemas

- [brand.json](https://schema.brandcontextprotocol.dev/v0.1/brand.json) — Root frontmatter schema

## Schema source

All schemas are published in the [canonical spec repository](https://github.com/Brand-Context-Protocol/spec/tree/main/schema).
