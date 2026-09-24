#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../src/pages/schema.md", import.meta.url), "utf8");
const rawRoot = "https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/schema/";
const canonicalRoot = "https://schema.brandcontextprotocol.dev/";
const fallbackPaths = [
  "brand-context.schema.json",
  "claims.schema.json",
  "manifest.schema.json",
  "v0.2/voice.schema.json",
  "v0.2/visual.json",
  "v0.2/representation.json",
];

assert.match(page, /raw source fallbacks/);
assert.match(page, /endpoints return 404/);
assert.match(page, /GitHub serves these JSON files as `text\/plain`/);

for (const schemaPath of fallbackPaths) {
  const url = `${rawRoot}${schemaPath}`;
  assert.ok(page.includes(`](${url})`), `${schemaPath} must link its raw source fallback`);
  assert.ok(!page.includes(`](${canonicalRoot}${schemaPath})`), `${schemaPath} must not link a known 404`);

  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  assert.equal(response.status, 200, `${url} must be fetchable`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain/i, `${url} must be labeled as a raw source response`);
  const schema = await response.json();
  assert.equal(schema.$id, `${canonicalRoot}${schemaPath}`, `${schemaPath} must retain its intended canonical ID`);
}

const historicalUrl = `${canonicalRoot}v0.1/brand.json`;
assert.ok(page.includes(`](${historicalUrl})`), "the live historical schema link must be preserved");
console.log("Six raw schema fallbacks return valid JSON; historical v0.1 link remains unchanged.");
