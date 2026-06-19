import { defineReactSsgConfig } from "vite-plugin-react-ssg";
import { getPostPrerenderPaths, getSiteUrl } from "./scripts/site-routes.mjs";
import { routes } from "./src/routes";

export default defineReactSsgConfig({
  history: "browser",
  origin: getSiteUrl(),
  routes,
  // Blog post slugs are discovered from MDX frontmatter at build time.
  paths: getPostPrerenderPaths(),
  logLevel: "normal",
});
