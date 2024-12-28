import { Link } from "react-router-dom";
import { useMemo } from "react";
import { DotsToHome } from "./DotsToHome";

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
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <div>
          <DotsToHome />
          <h1 style={{ margin: 0, textAlign: "right" }}>archive</h1>
        </div>
      </header>
      <div>
        {posts.map((post) => (
          <article key={post.slug} style={{ marginBottom: "1.5rem" }}>
            <Link to={`/post/${post.slug}`} className="post-title">
              <h2>{post.title}</h2>
            </Link>
            <time>{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Archive;
