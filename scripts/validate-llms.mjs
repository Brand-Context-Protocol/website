#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const llms = readFileSync(resolve("public/llms.txt"), "utf8");
const domainRoot = readFileSync(resolve("public/.well-known/brand.md"), "utf8");
const domainVersion = domainRoot.match(/^bcp_version: "([^"]+)"$/m)?.[1];
const domainUrl = "https://brandcontextprotocol.dev/.well-known/brand.md";
const registryUrl = "https://registry.brandcontextprotocol.dev/brand-context-protocol/.well-known/brand.md";
const failures = [];

if (!domainVersion) failures.push("domain BCP root has no bcp_version");
if (!llms.includes(`[Current specification](https://brandcontextprotocol.dev/spec/v1.1.0): Normative BCP v1.1.0 specification.`)) {
  failures.push("llms.txt must identify the normative specification separately");
}
if (!llms.includes(`[Domain-hosted protocol BCP draft](${domainUrl}): Proposed BCP ${domainVersion} package`)) {
  failures.push("llms.txt must label the domain package as a draft with its actual version");
}
if (!llms.includes("does not make these draft files the signed publication")) {
  failures.push("llms.txt must not imply the domain draft is signed");
}
if (!llms.includes(`[Signed protocol BCP in the reference Registry](${registryUrl}): Canonical signed package`)) {
  failures.push("llms.txt must link the separate signed Registry package");
}
if (!llms.includes("its root declared BCP 0.8 when checked on 2026-09-23")) {
  failures.push("llms.txt must date-qualify the observed signed package version");
}
if (/\[Protocol BCP\]\([^\n]+Canonical machine-readable identity/i.test(llms)) {
  failures.push("llms.txt must not call the domain draft canonical");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("llms.txt distinguishes the normative spec, domain-hosted draft, and signed Registry publication.");
