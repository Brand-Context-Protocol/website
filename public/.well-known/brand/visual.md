---
bcp_version: "0.7"
file_type: visual
parent: /.well-known/brand.md
last_updated: 2026-06-11
---

# Visual

The visual system below is extracted from the published site at brandcontextprotocol.dev (src/styles/global.css in the website repository). It is a documentation aesthetic: warm paper, near-black ink, one muted red accent, hairline rules. It signals a standards document, not a marketing site.

## Color

```yaml
color_tokens:
  paper:
    value: "#FAFAF6"
    role: "background"
  ink:
    value: "#0F0F0D"
    role: "primary text and code-block background"
  ink_2:
    value: "#2B2923"
    role: "secondary text"
  ink_3:
    value: "#6B6560"
    role: "muted text, footer"
  rule:
    value: "rgba(15,15,13,0.10)"
    role: "hairline borders and section rules"
  accent:
    value: "#B33D2A"
    role: "links, emphasis, code-block border; the only accent color"
```

## Typography

```yaml
typography:
  primary:
    family: "Space Grotesk"
    fallback: "system-ui, sans-serif"
    role: "body and headings; headings at weight 500 with tight letter-spacing"
  editorial:
    family: "Instrument Serif"
    fallback: "Georgia, serif"
    role: "italic emphasis only, rendered in the accent color"
  mono:
    family: "IBM Plex Mono"
    fallback: "monospace"
    role: "navigation, code, tables headers, footer labels"
```

## Rules

- One accent color. Links and emphasis use it; nothing else competes.
- Hairline 1px rules separate sections; h2 headings carry a top rule.
- Code blocks are ink-dark with a 4px accent left border.
- Underlined links with a 4px underline offset.

## Gaps

- Gap: no logo or wordmark asset exists. Do not invent one. Set the name in Space Grotesk when a mark is needed.
- Gap: no imagery, illustration, or motion guidance exists.
- Gap: no favicon is published.
