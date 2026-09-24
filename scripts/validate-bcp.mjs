#!/usr/bin/env node
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = readFileSync(resolve("public/.well-known/brand.md"), "utf8");
const claims = readFileSync(resolve("public/.well-known/brand/claims.md"), "utf8");
const files = new Map([
  ["voice.md", "voice"],
  ["voice/anti-ai.md", "anti_ai"],
  ["values.md", "values"],
  ["boundaries.md", "boundaries"],
  ["claims.md", "claims"],
  ["representation.md", "representation"],
  ["visual.md", "visual"],
]);

function markdownFiles(directory, prefix = "") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return markdownFiles(resolve(directory, entry.name), relative);
    return entry.name.endsWith(".md") ? [relative] : [];
  });
}

const failures = [];
if (!root.startsWith('---\nbcp_version: "1.1.0"')) failures.push("root must declare BCP 1.1.0");
if (!root.includes("publication_profile: registry_backed")) failures.push("root must be Registry-backed");
if (!root.includes("registry_handle: brand-context-protocol")) failures.push("root must declare the dedicated handle");
if (!root.includes('tree_version: "1.4.0"')) failures.push("root must declare tree version 1.4.0");
if (!root.includes("last_updated: 2026-09-23")) failures.push("root must carry the current package date");
if (!root.includes("canonical_bcp: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md")) {
  failures.push("root must declare the canonical Registry BCP");
}
if (!root.includes("## Package map") || !root.includes("untrusted brand-provided data")) failures.push("root must describe affordances and the untrusted-data boundary");
if (!claims.includes("specification version 1.1.0")) failures.push("claims must name 1.1.0");
const forbidden = /^agent_first_action\s*:|^#{1,6}\s+(?:For agents|Agent (?:instructions|default behavior))\b|authoritative over (?:general )?training data|binding brand law|load.{0,30}as system prompt/im;
if (forbidden.test(root)) failures.push("root contains imperative agent guidance");
if (/USD 499 per encode|issued by a human account owner|current specification version is 0\.7|no protocol-specific favicon is published/i.test(`${root}\n${claims}\n${readFileSync(resolve("public/.well-known/brand/visual.md"), "utf8")}`)) {
  failures.push("root contains stale product or protocol language");
}
for (const [file, fileType] of files) {
  const path = resolve("public/.well-known/brand", file);
  const content = readFileSync(path, "utf8");
  if (!content.includes('bcp_version: "1.1.0"')) failures.push(`${file} must declare BCP 1.1.0`);
  const parent = fileType === "anti_ai" ? "/.well-known/brand/voice.md" : "/.well-known/brand.md";
  if (!content.includes(`parent: https://registry.brandcontextprotocol.dev/brand-context-protocol${parent}`)) failures.push(`${file} must retain its canonical parent handle`);
  if (forbidden.test(content)) failures.push(`${file} contains imperative agent guidance`);
  if (!content.includes(`file_type: ${fileType}`)) failures.push(`${file} must declare file_type ${fileType}`);
  const registryUrl = `https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/${file}`;
  if (!root.includes(registryUrl)) failures.push(`root is missing ${registryUrl}`);
}
const actualDaughters = markdownFiles(resolve("public/.well-known/brand")).sort();
const expectedDaughters = [...files.keys()].sort();
if (JSON.stringify(actualDaughters) !== JSON.stringify(expectedDaughters)) {
  failures.push(`daughter file set drifted: ${actualDaughters.join(", ")}`);
}
const visual = readFileSync(resolve("public/.well-known/brand/visual.md"), "utf8");
if (!visual.includes("`/favicon.svg`") || !visual.includes("`/brand-mark.svg`")) failures.push("visual guidance must register the Encoded marks");
if (!visual.includes('"#FF4F00"') || !visual.includes('family: "Aeonik"')) failures.push("visual guidance must match the Encoded palette and display face");
const favicon = readFileSync(resolve("public/favicon.svg"), "utf8");
if (!favicon.includes('<title>Encoded Brands</title>') || !favicon.includes('<path')) failures.push("favicon must carry the upright Encoded mark");
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Protocol BCP 1.1.0 package is internally consistent (8 files); publish-time trust is supplied by Registry, not invented here.");
