import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const postsDir = join(root, "src/content/posts");

export const STATIC_ROUTES = [
  "/",
  "/portfolio",
  "/skills",
  "/blog",
  "/contact",
];

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
    } else if (value === "true" || value === "false") {
      value = value === "true";
    }

    result[key] = value;
  }

  return result;
}

export function getPublishedPosts() {
  const posts = [];

  for (const file of readdirSync(postsDir).filter((name) =>
    name.endsWith(".mdx"),
  )) {
    const content = readFileSync(join(postsDir, file), "utf8");
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter || frontmatter.draft) {
      continue;
    }

    posts.push({
      slug: file.replace(".mdx", ""),
      date: frontmatter.date,
    });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostPrerenderPaths() {
  return getPublishedPosts().map((post) => `/post/${post.slug}`);
}

export function getSiteUrl() {
  const cname = readFileSync(join(root, "public/CNAME"), "utf8").trim();
  return `https://${cname}`;
}
