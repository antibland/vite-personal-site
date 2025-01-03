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
  image?: string;
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
          <Link to={`/post/${post.slug}`} className="archive-post-grid">
            {post.image && (
              <figure className="archive-post-image">
                <img src={`/posts/${post.image}`} alt={post.title} />
              </figure>
            )}
            <div
              className={`archive-post-content ${
                !post.image ? "no-image" : ""
              }`}
            >
              <h2 className="archive-post-title">{post.title}</h2>
              <time>{post.date}</time>
              {post.description && <p>{post.description}</p>}
            </div>
          </Link>
        </article>
      ))}
    </div>
  ) : (
    <div>No posts found</div>
  );
};

export default Archive;
