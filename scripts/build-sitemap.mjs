import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
function pages(dir) { return readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? pages(join(dir,e.name)) : e.name.endsWith(".html") ? [join(dir,e.name)] : []); }
const urls = pages("dist").filter(p => !p.endsWith("404.html")).flatMap(p => {
 const html = readFileSync(p,"utf8");
 if (/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html)) return [];
 const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
 if (!canonical) throw new Error(`Missing canonical: ${p}`);
 if (!canonical[1].endsWith("/")) throw new Error(`Non-final canonical: ${p}`);
 return [canonical[1]];
});
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(urls)].sort().map(url=>`  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Generated sitemap with ${urls.length} canonical pages.`);
