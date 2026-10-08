import { readdirSync, writeFileSync } from "node:fs";
const versions = readdirSync("src/pages/spec").filter(n => /^v[0-9.]+\.md$/.test(n)).map(n => n.slice(1, -3)).sort((a,b) => b.localeCompare(a, undefined, { numeric: true }));
if (!versions.length) throw new Error("No published spec versions");
writeFileSync("public/_redirects", `/spec /spec/v${versions[0]}/ 302\n/spec/ /spec/v${versions[0]}/ 302\n`);
writeFileSync("src/pages/spec/versions.md", `---\nlayout: ../../layouts/Layout.astro\ntitle: Specification versions\ndescription: Current and historical versions of Brand Context Protocol.\n---\n\n# Specification versions\n\nCurrent specification: [BCP v${versions[0]}](/spec/v${versions[0]}/).\n\n${versions.map(v => `- [BCP v${v}](/spec/v${v}/)`).join("\n")}\n`);
