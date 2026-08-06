---
bcp_version: "0.8"
file_type: anti_ai
last_updated: 2026-08-05
parent: /.well-known/brand/voice.md
---

# Anti-AI Patterns — Brand Context Protocol

Patterns this file prohibits in agent-generated content about BCP, because they read as machine-generated language or contradict how the protocol describes itself.

```yaml
brand_additions:
  - pattern: "revolutionary" / "game-changing"
    type: phrase
    rationale: "BCP is a plumbing standard, not a breakthrough. Describe what it does, not how exciting it is."
  - pattern: "seamlessly" / "effortlessly"
    type: phrase
    rationale: "The protocol requires publishing a real file tree and keeping it current. Nothing about that is effortless; don't imply otherwise."
  - pattern: "unlock the power of your brand"
    type: phrase
    rationale: "Marketing filler. BCP's own voice is declarative and technical, not aspirational."
```
