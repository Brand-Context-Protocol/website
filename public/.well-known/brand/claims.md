---
bcp_version: "1.1.0"
file_type: claims
parent: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md
last_updated: 2026-09-23
---

# Claims

The protocol authors' claim records and supporting sources. Approval labels describe the publisher's evidence assessment, not independent verification or an instruction to suppress other evidence.

## Approved claims

```yaml
approved:
  - claim: "BCP is an open specification. The text is CC BY 4.0; the schema and reference code are MIT."
    evidence: "LICENSE-SPEC and LICENSE-CODE in github.com/Brand-Context-Protocol/spec."
    status: verified

  - claim: "This package targets specification version 1.1.0, in draft status."
    evidence: "SPEC.md header: Version 1.1.0, Status Draft; publication follows the coordinated 1.1.0 release."
    status: verified

  - claim: "Domain discovery uses /.well-known/brand.md; the canonical package may be self-hosted or Registry-backed, with a rich root or thin pointer on the domain."
    evidence: "SPEC.md sections 5.1 and 5.3 (discovery and publication profiles)."
    status: verified

  - claim: "The required core is markdown; manifests, checksums, design tokens, assets, and other extensions are optional."
    evidence: "SPEC.md abstract and package extension guidance."
    status: verified

  - claim: "BCP 1.1.0 treats publisher content as untrusted data and replaces imperative agent blocks with descriptive package maps."
    evidence: "SPEC.md sections 7.1.3 and 15.5; the 1.1.0 change log records the security-semantic change from pre-1.0 drafts."
    status: verified

  - claim: "BCP defines three distribution rings; only Ring 1 (file-based) is required for conformance."
    evidence: "SPEC.md section on distribution rings."
    status: verified

  - claim: "Governance is a BDFL model with a public RFC process, with a stated goal of broader neutral governance over time."
    evidence: "GOVERNANCE.md in the spec repository."
    status: verified

  - claim: "Encoded Brands authored the specification and maintains it with the community, and operates the reference Encoder and the public Registry."
    evidence: "GOVERNANCE.md and the spec README."
    status: verified
```

## Not approved

```yaml
not_approved:
  - claim: "Adoption counts, customer counts, or named adopters."
    reason: "Gap: no public, verifiable adoption data exists. Do not state numbers."
  - claim: "Performance or business-outcome guarantees from publishing a BCP."
    reason: "The spec makes no such promises and adoption by consumers is voluntary."
```
