import type { ComponentType } from "react";

export interface Post {
  title: string;
  date: string;
  slug: string;
  description?: string;
  author?: string;
  readingTime?: number;
  tags?: string[];
  category?: string;
  featured?: boolean;
  draft?: boolean;
  image?: string;
}

interface MDXModule {
  frontmatter: Post;
  default: ComponentType;
}

const postModules = import.meta.glob<MDXModule>("../content/posts/*.mdx", {
  eager: true,
});

export function loadPublishedPosts(): Post[] {
  try {
    return Object.entries(postModules)
      .map(([path, post]) => {
        if (!post?.frontmatter) {
          console.warn(`No frontmatter found for ${path}`);
          return null;
        }
        return {
          ...post.frontmatter,
          slug: path.replace("../content/posts/", "").replace(".mdx", ""),
        };
      })
      .filter((post): post is Post => post !== null && !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

export function getLatestPublishedPost(): Post | undefined {
  return loadPublishedPosts()[0];
}

export function getPostBySlug(slug: string | undefined): MDXModule | null {
  if (!slug) return null;

  const postFile = Object.entries(postModules).find(([path]) =>
    path.includes(`${slug}.mdx`),
  );

  if (!postFile) return null;
  if (!postFile[1].frontmatter) {
    console.warn(`No frontmatter found for ${postFile[0]}`);
    return null;
  }

  return postFile[1];
}
