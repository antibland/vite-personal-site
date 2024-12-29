import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

// https://vite.dev/config/
export default defineConfig({
  base: "/vite-personal-site/",
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "react",
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
