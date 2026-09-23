---
bcp_version: "1.1.0"
file_type: values
parent: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md
last_updated: 2026-09-23
---

# Values

These are the design commitments the specification actually encodes. Each one is checkable against the spec text.

## 1. Human-authorable, machine-readable

The required core is markdown with YAML frontmatter. A person can write a conforming BCP in a text editor. Structure serves agents; format serves people. Extension layers (manifest, tokens, assets) are optional and never required for core conformance.

## 2. Complete first. Enrich later.

A small required core, then optional enrichment. A core-complete BCP is the root plus six canonical daughters. Manifests, checksums, design tokens, and assets come after, if at all. The spec blesses them without requiring them.

## 3. Explicit evolution

Versioned changes distinguish additive extensions from changed semantics. The 1.1.0 cut makes the untrusted-data boundary normative; older imperative blocks remain readable as data, not instructions. The change log records that migration rather than describing it as an additive-only correction.

## 4. No required vendor

The file format is independent of any vendor. Domain discovery may expose a self-hosted root, a rich Registry-backed root, or a thin pointer to a canonical package. CLI and MCP layers are optional; a full tree on the brand domain is not required.

## 5. Independence

The specification is independent of any single commercial entity. Encoded Brands authored it and maintains it, and the stated goal in GOVERNANCE.md is a neutral ecosystem of co-maintainers and an eventual foundation or working group. Changes go through a public RFC process.

## When values collide

Higher wins. Example: a richer machine format (value 1 vs value 2) loses to a small human-authorable core; richness moves to optional extensions.
