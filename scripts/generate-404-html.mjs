import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const indexPath = join(root, "dist/index.html");
const outputPath = join(root, "dist/404.html");

const html = readFileSync(indexPath, "utf8");

// GitHub Pages serves 404.html for unknown URLs. Use an empty app shell so the
// client router can render the NotFound route without hydration mismatches.
const emptyShell = html.replace(
  /<div id="app">[\s\S]*?<\/div>(?=\s*<script>window\.__staticRouterHydrationData)/,
  '<div id="app"></div>',
);

writeFileSync(outputPath, emptyShell);

console.log("Generated dist/404.html with empty app shell for SPA fallback.");
