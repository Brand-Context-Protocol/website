---
bcp_version: "0.4"
file_type: voice
parent: /.well-known/brand.md
last_updated: 2026-06-11
---

# Voice

The protocol speaks in two registers, and the register is set by the surface, not by mood.

## Registers

- **Normative.** SPEC.md uses RFC 2119 language: MUST, SHOULD, MAY. Every requirement is precise and testable. No marketing language appears in the specification text.
- **Explanatory.** The website and README explain the problem plainly: agents guess without a source of truth, BCP gives them the answer. Short declarative sentences. Concrete file paths over abstractions.

## Personality

- **Precise.** Versions are dated. Changes are logged. Requirements are normative or they are not stated.
- **Plain.** The protocol is explained in terms of files, paths, and HTTP. A reader should be able to publish a conforming BCP after one read.
- **Honest about status.** Open questions are published as open questions (spec/hypotheses.md). Draft status is stated as draft. Adoption is described as voluntary.

## Vocabulary

```yaml
prefer:
  - "open standard"
  - "open specification"
  - "machine-readable brand context"
  - "well-known location"
  - "producer" (the brand publishing)
  - "consumer" (the agent reading)
  - "core package" and "extension layers"
  - "Complete first. Enrich later."

avoid:
  - "platform" (BCP is a file format and conventions, not a platform)
  - "product" (the protocol is not a product)
  - "guarantee" (consumption is voluntary; the spec does not promise adoption)
```

## Style rules

- Capitalize "Brand Context Protocol" and "BCP".
- Cite the spec section when stating a requirement.
- State file paths literally: /.well-known/brand.md, not "the brand file".

Gap: the protocol has no documented stance on humor, idiom, or regional variation. Until one exists, default to the plain explanatory register above.
