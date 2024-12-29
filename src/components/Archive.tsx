import { Link } from "react-router-dom";
import { useMemo } from "react";

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
    const allPosts = import.meta.glob<MDXModule>("../content/posts/*.mdx", {
      eager: true,
    });
    return Object.entries(allPosts)
      .map(([path, post]) => ({
        ...post.frontmatter,
        slug: path.replace("../content/posts/", "").replace(".mdx", ""),
      }))
      .filter((post) => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return posts.length > 0 ? (
    <div className="posts">
      {posts.map((post) => (
        <article key={post.slug}>
          <Link to={`/post/${post.slug}`} className="post-title">
            <h2>{post.title}</h2>
          </Link>
          <time>{post.date}</time>
        </article>
      ))}
    </div>
  ) : (
    <div>No posts found</div>
  );
};

export default Archive;
