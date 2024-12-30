import React, { useMemo } from "react";
import { Link } from "react-router-dom";

interface Post {
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
}

interface MDXModule {
  frontmatter: Post;
  default: React.ComponentType;
}

const Archive: React.FC = () => {
  const posts = useMemo(() => {
    try {
      const allPosts = import.meta.glob<MDXModule>("../content/posts/*.mdx", {
        eager: true,
      });

      return Object.entries(allPosts)
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
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
      console.error("Error loading posts:", error);
      return [];
    }
  }, []);

  return posts.length > 0 ? (
    <div className="posts">
      {posts.map((post) => (
        <article key={post.slug}>
          <Link to={`/post/${post.slug}`} className="post-title">
            <h2>{post.title}</h2>
          </Link>
          <time>{post.date}</time>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  ) : (
    <div>No posts found</div>
  );
};

export default Archive;
