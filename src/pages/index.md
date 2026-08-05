---
layout: ../layouts/Layout.astro
title: Home
description: The Brand Context Protocol specification.
---

# Brand Context Protocol

AI agents generate content about your brand every day. Without a machine-readable source of truth, they guess. BCP gives them the answer.

Publish a discovery document at `/.well-known/brand.md` on your domain. It can contain your complete self-hosted BCP or point to a canonical Registry package. Agents, platforms, and tools follow the same domain-first discovery path in either case.

BCP is an open protocol published under CC BY 4.0 and maintained by Encoded Brands. Encoded Brands also operates the reference hosted Registry at `registry.brandcontextprotocol.dev`; that runtime signs immutable canonical packages at publication, verifies them on reads, serves them over MCP, and gives teams a managed path when they do not want to run the serving layer themselves.

The protocol and the runtime are separate. You can publish BCP yourself from any static host, use another conformant Registry, or use Encoded Brands' hosted Registry.

---

## Get Started
- **Read the specification:** [BCP Spec](/spec)
- **Author your first BCP:** [Start at encodedbrands.ai](https://encodedbrands.ai)
- **Use the public authoring prompt:** [encodedbrands.ai/bcp-authoring-prompt.md](https://encodedbrands.ai/bcp-authoring-prompt.md)
- **Verify the reference Registry key:** [registry.brandcontextprotocol.dev](https://registry.brandcontextprotocol.dev/.well-known/registry-public-key)
- **View the JSON Schema:** [Schema Reference](/schema)
- **Browse the source:** [GitHub](https://github.com/Brand-Context-Protocol/spec)
