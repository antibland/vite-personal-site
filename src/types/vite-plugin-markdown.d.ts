declare module "*.md" {
  // frontmatter as typed in our posts
  const frontmatter: {
    title: string;
    date: string;
  };
  // compiled markdown content
  const html: string;
  // raw markdown content
  const content: string;
}

declare module "vite-plugin-markdown" {
  import { Plugin } from "vite";

  interface MarkdownOptions {
    mode?: ("html" | "toc")[];
    markdownIt?: {
      html?: boolean;
      linkify?: boolean;
      typographer?: boolean;
    };
  }

  function markdown(options?: MarkdownOptions): Plugin;

  export default markdown;
}
