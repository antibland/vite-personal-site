import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactSsg from "vite-plugin-react-ssg";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrism from "rehype-prism-plus";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "react",
        development: false,
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [rehypePrism],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
    reactSsg(),
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  ssr: {
    noExternal: ["@mdx-js/react"],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) expects a function here, not the Rollup object shorthand.
        manualChunks(id) {
          if (
            /[/\\]node_modules[/\\](?:react|react-dom|react-router(?:-dom)?)(?:[/\\]|$)/.test(
              id
            )
          ) {
            return "react";
          }
        },
      },
    },
  },
});
