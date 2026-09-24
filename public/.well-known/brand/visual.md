---
bcp_version: "1.1.0"
file_type: visual
parent: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md
last_updated: 2026-09-23
---

# Visual

This draft describes the protocol site's Encoded Brands visual identity. It is derived from Encoded Brands' 2026 design-system source and the site's proposed implementation, not from a signed Registry publication. The protocol remains an open standard; sharing a visual system with its maintainer does not make the standard a commercial product.

## Color

```yaml
color_tokens:
  paper:
    value: "#FFFFFF"
    role: "background"
  ink:
    value: "#1A1A1A"
    role: "primary text and code-block background"
  ink_2:
    value: "#292828"
    role: "secondary text"
  ink_3:
    value: "#666666"
    role: "muted text, footer"
  rule:
    value: "rgba(26,26,26,0.10)"
    role: "hairline borders and section rules"
  accent:
    value: "#FF4F00"
    role: "International Orange for links and emphasis; the only brand accent"
```

## Typography

```yaml
typography:
  display:
    family: "Aeonik"
    fallback: "Inter, system-ui, sans-serif"
    role: "headings; line breaks and weight provide emphasis without serif italics"
  body:
    family: "Inter"
    fallback: "system-ui, sans-serif"
    role: "body text and navigation"
  mono:
    family: "Geist Mono"
    fallback: "ui-monospace, monospace"
    role: "meaningful labels, code, and table headers"
```

## Rules

- White, ink, and International Orange form the palette. The approved Dawn image may be used as a hero background beneath an ink scrim; it is not a second brand accent.
- Use inset rings rather than offset drop shadows. Cards and navigation use a 10px radius; shell panels use 20px.
- Hairline rules separate sections. Use only meaningful mono labels; do not repeat decorative eyebrows before every heading.
- Code blocks are ink-dark, and links remain visibly underlined in reading text.
- `/brand-mark.svg` is the upright Encoded Brands logomark in the site navigation. `/favicon.svg` is the matching contained mark for browser tabs and bookmarks. Neither mark is rotated.

## Gaps

- The brand mark, licensed Aeonik files, and Dawn image are copied from the shipped Encoded Brands marketing design kit for this proposed site treatment.
- The Registry's canonical signed protocol BCP has not been republished to match this domain-hosted draft. Do not describe the visual daughter as signed or byte-identical until a separately authorized publication and verification occur.
