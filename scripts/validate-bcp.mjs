#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = readFileSync(resolve("public/.well-known/brand.md"), "utf8");
const claims = readFileSync(resolve("public/.well-known/brand/claims.md"), "utf8");
const files = [
  "voice.md",
  "voice/anti-ai.md",
  "values.md",
  "boundaries.md",
  "claims.md",
  "representation.md",
  "visual.md",
];

const failures = [];
if (!root.startsWith('---\nbcp_version: "0.8"')) failures.push("root must declare BCP v0.8");
if (!root.includes("publication_profile: registry_backed")) failures.push("root must be Registry-backed");
if (!root.includes("registry_handle: brand-context-protocol")) failures.push("root must declare the dedicated handle");
if (!claims.includes("current specification version is 0.8")) failures.push("claims must name v0.8");
if (/USD 499 per encode|issued by a human account owner|current specification version is 0\.7/.test(`${root}\n${claims}`)) {
  failures.push("root contains stale product or protocol language");
}
for (const file of files) {
  const path = resolve("public/.well-known/brand", file);
  const content = readFileSync(path, "utf8");
  if (!content.includes('bcp_version: "0.8"')) failures.push(`${file} must declare BCP v0.8`);
  const registryUrl = `https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand/${file}`;
  if (!root.includes(registryUrl)) failures.push(`root is missing ${registryUrl}`);
}
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Protocol BCP v0.8 package is internally consistent (8 files).");
