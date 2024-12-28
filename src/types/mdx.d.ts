declare module "*.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType;
  export default Component;

  export const frontmatter: {
    // Required fields
    title: string;
    date: string;

    // Meta information
    description?: string;
    author?: string;
    authorTwitter?: string;
    readingTime?: number;

    // Categorization
    tags?: string[];
    category?: string;

    // Display options
    featured?: boolean;
    draft?: boolean;
    toc?: boolean;

    // SEO
    keywords?: string[];
    canonical?: string;
    lang?: string;

    // Additional metadata
    lastModified?: string;
    version?: number;
    license?: string;
  };
}
