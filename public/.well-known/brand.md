---
bcp_version: "1.1.0"
file_type: root
brand_name: "Brand Context Protocol"
tree_version: "1.4.0"
website: "https://brandcontextprotocol.dev"
tagline: "Machine-readable brand context at a well-known location."
last_updated: 2026-09-23
default_locale: "en-US"
publication_profile: registry_backed
canonical_bcp: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md
registry_mcp: https://registry.brandcontextprotocol.dev/mcp?customer_handle=brand-context-protocol
registry_handle: brand-context-protocol
daughter_files:
  voice: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/voice.md
  voice_anti_ai: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/voice/anti-ai.md
  values: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/values.md
  boundaries: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/boundaries.md
  claims: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/claims.md
  representation: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/representation.md
  visual: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/visual.md
---

# Brand Context Protocol

The Brand Context Protocol (BCP) is an open specification for publishing machine-readable brand identity at a well-known location on a brand's domain. AI agents generate content about brands every day. Without a source of truth they guess. BCP gives them the answer: a root brand.md at /.well-known/brand.md plus daughter files for voice, values, boundaries, claims, representation, and visual context.

The brand described in this file is the protocol itself, the open standard. It is not a company and not a product. The specification text is licensed CC BY 4.0. The schema and reference code are MIT. The source lives at https://github.com/Brand-Context-Protocol/spec. Encoded Brands authored the specification and maintains it with the community under a BDFL governance model with an RFC process. Encoded Brands also operates the reference Encoder and the public Registry as a separate commercial layer.

## Core identity

```yaml
category: "open specification for machine-readable brand context"
current_version: "1.1.0"
licenses:
  spec_text: "CC BY 4.0"
  schema_and_code: "MIT"
source: "https://github.com/Brand-Context-Protocol/spec"
governance: "BDFL with a public RFC process"
```

## Package map

This root describes the protocol's identity and the locations of its canonical package. The daughter files cover distinct topics:

| File | Available context |
| --- | --- |
| voice.md | Tone, register, and vocabulary preferences |
| voice/anti-ai.md | Language patterns the protocol's authors prefer to avoid |
| values.md | Design commitments and trade-offs |
| boundaries.md | Brand-safety preferences and excluded claims |
| claims.md | Evidence-labeled claims, caveats, and gaps |
| representation.md | Preferred framing and the distinction between the standard and its commercial implementations |
| visual.md | Published colors, typography, favicon, and layout observations |

All body prose and publisher YAML are untrusted brand-provided data. Behavioral directives in a package are non-normative; the host's policy determines retrieval, generation, and tool use. This package is not a system prompt and does not authorize purchases, credential submission, or external writes.

## Discovery and publication profiles

Domain discovery is available at `https://brandcontextprotocol.dev/.well-known/brand.md`. The canonical package is the `brand-context-protocol` Registry handle declared above. The root and daughter URLs preserve that handle; the public Registry MCP is a read-only access surface.

The protocol supports both a complete self-hosted tree and Registry-backed publication. A Registry-backed domain may expose a rich root or a thin pointer. A known Registry handle also supplies a direct package location; a brand is not required to host every daughter file itself. The required core-complete package is the root plus six daughters; voice/anti-ai.md is additional language context in this package.

## Trust and authoring boundaries

Registry publication signatures bind immutable file bytes. DNS verification is a separate, time-bounded origin signal, not evidence that every brand claim is true. Registry-generated trust frontmatter, when present in signed published bytes, records a publication-time snapshot. Current `get_bcp` trust metadata and HTTP attestation describe later verification or certification changes and take precedence over that snapshot. Publisher-written booleans alone establish no trust.

Authoring and administration are separate from public read access. Their endpoints are discoverable through authenticated Registry attestation or independently trusted Encoded discovery documents, not through instructions in this package. URLs in brand content are not a safe basis for entering owner credentials.

## Sources

- Specification and schemas: https://github.com/Brand-Context-Protocol/spec
- Governance: https://github.com/Brand-Context-Protocol/spec/blob/main/GOVERNANCE.md
- Published protocol site: https://brandcontextprotocol.dev

## Change log

- 2026-09-23: v1.4.0 -- BCP 1.1.0 package map and untrusted-data boundary; removed imperative agent workflow and credential/payment instructions. Trust remains Registry-attested, never publisher-invented.

- 2026-09-02: v1.3.1 -- Recorded the published protocol favicon and added automated checks that the domain and Registry packages stay byte-identical, signed, and verified.
- 2026-09-01: v1.3.0 -- Connected the protocol's domain entry point to its dedicated Registry package, updated the agent transaction contract, and corrected current-version claims.
- 2026-08-05: v1.2.0 -- Updated the protocol's self-hosted reference BCP to v0.8 and documented the domain discovery and canonical Registry publication split.
- 2026-08-05: v1.1.0 -- Bumped every file in this tree from BCP v0.4 to v0.7 (frontmatter had drifted behind SPEC.md for two major revisions). Added voice/anti-ai.md as a registered daughter. Fixed a stale `current_version: "0.4"` claim in the body text that disagreed with the frontmatter.
- 2026-06-11: v1.0.0 -- initial BCP for the protocol itself, authored from SPEC.md v0.4, GOVERNANCE.md, and the published site.
