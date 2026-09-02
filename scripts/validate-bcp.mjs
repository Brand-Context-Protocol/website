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
if (!root.startsWith('---\nbcp_version: "0.8"')) failures.push("root must declare BCP v0.8");
if (!root.includes("publication_profile: registry_backed")) failures.push("root must be Registry-backed");
if (!root.includes("registry_handle: brand-context-protocol")) failures.push("root must declare the dedicated handle");
if (!root.includes('tree_version: "1.3.1"')) failures.push("root must declare tree version 1.3.1");
if (!root.includes("last_updated: 2026-09-02")) failures.push("root must carry the current package date");
if (!root.includes("canonical_bcp: https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md")) {
  failures.push("root must declare the canonical Registry BCP");
}
if (!root.includes("agent_first_action: \"fetch https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md\"")) {
  failures.push("root must direct agents to the canonical Registry root");
}
if (!claims.includes("current specification version is 0.8")) failures.push("claims must name v0.8");
if (/USD 499 per encode|issued by a human account owner|current specification version is 0\.7|no protocol-specific favicon is published/i.test(`${root}\n${claims}\n${readFileSync(resolve("public/.well-known/brand/visual.md"), "utf8")}`)) {
  failures.push("root contains stale product or protocol language");
}
for (const [file, fileType] of files) {
  const path = resolve("public/.well-known/brand", file);
  const content = readFileSync(path, "utf8");
  if (!content.includes('bcp_version: "0.8"')) failures.push(`${file} must declare BCP v0.8`);
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
if (!visual.includes("`/favicon.svg`")) failures.push("visual guidance must register the published favicon");
const favicon = readFileSync(resolve("public/favicon.svg"), "utf8");
if (!favicon.includes('aria-label="Brand Context Protocol"')) failures.push("favicon must identify the protocol");
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Protocol BCP v0.8 package is internally consistent (8 files).");
