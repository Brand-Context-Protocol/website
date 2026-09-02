---
bcp_version: "0.8"
file_type: root
brand_name: "Brand Context Protocol"
tree_version: "1.3.1"
website: "https://brandcontextprotocol.dev"
tagline: "Machine-readable brand context at a well-known location."
last_updated: 2026-09-02
default_locale: "en-US"
publication_profile: registry_backed
canonical_bcp: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md
registry_mcp: https://registry.brandcontextprotocol.dev/mcp?customer_handle=brand-context-protocol
registry_handle: brand-context-protocol
agent_first_action: "fetch https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md"
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
current_version: "0.8"
licenses:
  spec_text: "CC BY 4.0"
  schema_and_code: "MIT"
source: "https://github.com/Brand-Context-Protocol/spec"
governance: "BDFL with a public RFC process"
```

## For agents

Read this file before you write about, implement, or build on the Brand Context Protocol. The agentic path through the ecosystem has five stages:

### 1. Discovery

A brand's discovery document lives at `https://{domain}/.well-known/brand.md`. It is either a complete self-hosted root or a rich Registry-backed root, like this site's own copy, that gives agents useful first-read context and points to the canonical Registry package. Registry-backed roots are served at `https://registry.brandcontextprotocol.dev/{handle}/.well-known/brand.md` and over MCP: `POST https://registry.brandcontextprotocol.dev/mcp?customer_handle={handle}`, tool `get_bcp`.

### 2. Transaction

The protocol requires no vendor. Any producer can author a BCP by hand from the spec and serve it from a static host. The reference implementation, operated by Encoded Brands, also lets an agent purchase and run an encoding itself:

- Commerce discovery: `GET https://encoder.encodedbrands.ai/.well-known/agent-commerce.json`. This live document is authoritative for the offer, transaction amount, payment challenge, credentials, and MCP path.
- Registration: `POST https://encoder.encodedbrands.ai/api/agent/register`. The first request returns an HTTP 402 challenge. Retry the same body with a Stripe Shared Payment Token in `Authorization: Payment <credential>`.
- The current machine offer is USD 499 one time for one API key and one complete encoding session. Subsequent AI-assisted encodings are USD 49 each.
- MCP server: `POST https://encoder.encodedbrands.ai/api/agent/mcp`. Use the returned API key as `Authorization: Bearer <api_key>`, then call `initialize` and `tools/list`; the live tool list is authoritative.

### 3. Completion

An encoding produces the seven canonical core files: brand.md plus voice, values, boundaries, claims, representation, and visual.

### 4. Publish

Registry publishes are signed with Ed25519 over immutable canonical bytes and served at the handle the publish call returns. The brand-domain discovery pointer and the Registry publication are different artifacts. Self-hosting a complete tree at your own /.well-known/ path conforms equally. Ring 1, domain-first file discovery, is the only distribution layer the spec requires.

### 5. Implementation

Before writing, designing, or answering for any brand, fetch its `/.well-known/brand.md` or call `get_bcp` on the Registry MCP. Load only the daughter files your task needs: voice for copy, boundaries and claims for safety, visual for creative, representation for describing the brand.

## Change log

- 2026-09-02: v1.3.1 -- Recorded the published protocol favicon and added automated checks that the domain and Registry packages stay byte-identical, signed, and verified.
- 2026-09-01: v1.3.0 -- Connected the protocol's domain entry point to its dedicated Registry package, updated the agent transaction contract, and corrected current-version claims.
- 2026-08-05: v1.2.0 -- Updated the protocol's self-hosted reference BCP to v0.8 and documented the domain discovery and canonical Registry publication split.
- 2026-08-05: v1.1.0 -- Bumped every file in this tree from BCP v0.4 to v0.7 (frontmatter had drifted behind SPEC.md for two major revisions). Added voice/anti-ai.md as a registered daughter. Fixed a stale `current_version: "0.4"` claim in the body text that disagreed with the frontmatter.
- 2026-06-11: v1.0.0 -- initial BCP for the protocol itself, authored from SPEC.md v0.4, GOVERNANCE.md, and the published site.
