import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

// GitHub Pages serves `page/index.html` only at `/page/` and 301-redirects
// `/page` to `/page/` with an empty redirect body (no OG tags). Flat
// `page.html` files are served directly at `/page` with no redirect, which
// link-preview crawlers need.
const SKIP = new Set(["index.html", "404.html"]);

function walk(dir) {
  const files = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry === "index.html" && !SKIP.has(relative(distDir, fullPath))) {
      files.push(fullPath);
    }
  }

  return files;
}

let count = 0;

for (const indexPath of walk(distDir)) {
  const routeDir = relative(distDir, dirname(indexPath));
  const outputPath = join(distDir, `${routeDir}.html`);

  copyFileSync(indexPath, outputPath);
  count += 1;
}

console.log(`Generated ${count} extensionless HTML file(s) for GitHub Pages.`);
