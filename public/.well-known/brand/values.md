---
bcp_version: "0.8"
file_type: values
parent: /.well-known/brand.md
last_updated: 2026-09-01
---

# Values

These are the design commitments the specification actually encodes. Each one is checkable against the spec text.

## 1. Human-authorable, machine-readable

The required core is markdown with YAML frontmatter. A person can write a conforming BCP in a text editor. Structure serves agents; format serves people. Extension layers (manifest, tokens, assets) are optional and never required for core conformance.

## 2. Complete first. Enrich later.

A small required core, then optional enrichment. A core-complete BCP is the root plus six canonical daughters. Manifests, checksums, design tokens, and assets come after, if at all. The spec blesses them without requiring them.

## 3. Additive evolution

Versions add; they do not break. Each draft since v0.1 has been additive per the spec's own change policy (SPEC.md section 8.2). Files written against an earlier minor version remain valid.

## 4. No required vendor

Ring 1, static files on the brand's own domain, is the only required distribution layer. Any HTTP client can consume a BCP. CLI and MCP layers are optional. Hosted publishing is one of three equally valid distribution models.

## 5. Independence

The specification is independent of any single commercial entity. Encoded Brands authored it and maintains it, and the stated goal in GOVERNANCE.md is a neutral ecosystem of co-maintainers and an eventual foundation or working group. Changes go through a public RFC process.

## When values collide

Higher wins. Example: a richer machine format (value 1 vs value 2) loses to a small human-authorable core; richness moves to optional extensions.
