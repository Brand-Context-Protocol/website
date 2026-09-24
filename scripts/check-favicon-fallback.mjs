import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const redirect = "/favicon.ico /favicon.svg 302";
const approvedSvgSha256 = "aa83e8e54678533577a701934e6eaab00681ae312ec41ca08d52864af31cb9e0";
const sourceRule = readFileSync(resolve("public/_redirects"), "utf8").trim();
const builtRule = readFileSync(resolve("dist/_redirects"), "utf8").trim();
const sourceSvg = readFileSync(resolve("public/favicon.svg"));
const builtSvg = readFileSync(resolve("dist/favicon.svg"));

assert.equal(sourceRule, redirect, "the only Pages redirect should target the approved SVG");
assert.equal(builtRule, redirect, "Astro must copy the Pages redirect into dist");
assert.equal(createHash("sha256").update(sourceSvg).digest("hex"), approvedSvgSha256);
assert.deepEqual(builtSvg, sourceSvg, "the deployed SVG must match the approved source bytes");
assert.equal(existsSync(resolve("dist/favicon.ico")), false, "do not ship a second favicon asset");

console.log("Spec favicon fallback targets the approved upright SVG in the built Pages output.");
