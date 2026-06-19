import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getPublishedPosts,
  getSiteUrl,
  STATIC_ROUTES,
} from "./site-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const siteUrl = getSiteUrl();

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry({ loc, lastmod }) {
  let xml = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n`;

  if (lastmod) {
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
  }

  xml += "  </url>\n";
  return xml;
}

const posts = getPublishedPosts();
const latestBlogDate = posts[0]?.date;

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const path of STATIC_ROUTES) {
  xml += urlEntry({
    loc: `${siteUrl}${path}`,
    lastmod: path === "/blog" ? latestBlogDate : undefined,
  });
}

for (const post of posts) {
  xml += urlEntry({
    loc: `${siteUrl}/post/${post.slug}`,
    lastmod: post.date,
  });
}

xml += "</urlset>\n";

writeFileSync(join(root, "public/sitemap.xml"), xml);

console.log(
  `Generated sitemap with ${STATIC_ROUTES.length + posts.length} URLs at public/sitemap.xml`,
);
