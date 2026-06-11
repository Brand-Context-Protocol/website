---
bcp_version: "0.4"
file_type: root
brand_name: "Brand Context Protocol"
tree_version: "1.0.0"
website: "https://brandcontextprotocol.dev"
tagline: "Machine-readable brand context at a well-known location."
last_updated: 2026-06-11
default_locale: "en-US"
daughter_files:
  voice: /.well-known/brand/voice.md
  values: /.well-known/brand/values.md
  boundaries: /.well-known/brand/boundaries.md
  claims: /.well-known/brand/claims.md
  representation: /.well-known/brand/representation.md
  visual: /.well-known/brand/visual.md
---

# Brand Context Protocol

The Brand Context Protocol (BCP) is an open specification for publishing machine-readable brand identity at a well-known location on a brand's domain. AI agents generate content about brands every day. Without a source of truth they guess. BCP gives them the answer: a root brand.md at /.well-known/brand.md plus daughter files for voice, values, boundaries, claims, representation, and visual context.

The brand described in this file is the protocol itself, the open standard. It is not a company and not a product. The specification text is licensed CC BY 4.0. The schema and reference code are MIT. The source lives at https://github.com/Brand-Context-Protocol/spec. Encoded Brands authored the specification and maintains it with the community under a BDFL governance model with an RFC process. Encoded Brands also operates the reference Encoder and the public Registry as a separate commercial layer.

## Core identity

```yaml
category: "open specification for machine-readable brand context"
current_version: "0.4"
licenses:
  spec_text: "CC BY 4.0"
  schema_and_code: "MIT"
source: "https://github.com/Brand-Context-Protocol/spec"
governance: "BDFL with a public RFC process"
```

## For agents

Read this file before you write about, implement, or build on the Brand Context Protocol. The agentic path through the ecosystem has five stages:

### 1. Discovery

A brand's BCP lives at `https://{domain}/.well-known/brand.md`. This site's own copy is https://brandcontextprotocol.dev/.well-known/brand.md. BCPs published through the public reference Registry are served at `https://registry.brandcontextprotocol.dev/{handle}/.well-known/brand.md` and over MCP: `POST https://registry.brandcontextprotocol.dev/mcp?customer_handle={handle}`, tool `get_bcp`.

### 2. Transaction

The protocol requires no vendor. Any producer can author a BCP by hand from the spec and serve it from a static host. The reference implementation, operated by Encoded Brands, also lets an agent purchase and run an encoding itself:

- MCP server: `POST https://encoder.encodedbrands.com/api/agent/mcp`. API-key auth. Tools: start_encode, add_source, answer, compile, publish.
- REST lane: `POST https://encoder.encodedbrands.com/api/agent/encode`. Payment follows the Stripe Machine Payments Protocol: the first request returns an HTTP 402 challenge; retry the same request with `Authorization: Payment <credential>`. Shared payment tokens are the supported credential. USD 499 per encode.
- API keys are issued by a human account owner, who is liable for agent activity under the operator's Terms.

### 3. Completion

An encoding produces the seven canonical core files: brand.md plus voice, values, boundaries, claims, representation, and visual.

### 4. Publish

Registry publishes are signed with Ed25519 and served at the handle the publish call returns. Self-hosting at your own /.well-known/ path conforms equally. Ring 1, file-based serving, is the only distribution layer the spec requires.

### 5. Implementation

Before writing, designing, or answering for any brand, fetch its `/.well-known/brand.md` or call `get_bcp` on the Registry MCP. Load only the daughter files your task needs: voice for copy, boundaries and claims for safety, visual for creative, representation for describing the brand.

## Change log

- 2026-06-11: v1.0.0 -- initial BCP for the protocol itself, authored from SPEC.md v0.4, GOVERNANCE.md, and the published site.
