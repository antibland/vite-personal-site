import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const postsDir = join(root, "src/content/posts");

const cname = readFileSync(join(root, "public/CNAME"), "utf8").trim();
const siteUrl = `https://${cname}`;

const STATIC_ROUTES = ["/", "/portfolio", "/skills", "/blog", "/contact"];

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const result = {};

  for (const line of match[1].split("\n")) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (!keyMatch) continue;

    const [, key, rawValue] = keyMatch;
    let value = rawValue.trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""));
    } else if (value === "true" || value === "false") {
      value = value === "true";
    }

    result[key] = value;
  }

  return result;
}

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

const posts = [];

for (const file of readdirSync(postsDir).filter((name) => name.endsWith(".mdx"))) {
  const content = readFileSync(join(postsDir, file), "utf8");
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter || frontmatter.draft) {
    continue;
  }

  const slug = file.replace(".mdx", "");
  posts.push({ slug, date: frontmatter.date });
}

const latestBlogDate = posts
  .map((post) => post.date)
  .sort()
  .reverse()[0];

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
