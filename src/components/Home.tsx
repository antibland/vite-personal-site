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
}

interface MDXModule {
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    author?: string;
    readingTime?: number;
    tags?: string[];
    category?: string;
    featured?: boolean;
  };
  default: React.ComponentType;
}

const Home: React.FC = () => {
  const posts = useMemo(() => {
    const allPosts = import.meta.glob<MDXModule>("../content/posts/*.mdx", {
      eager: true,
    });
    return Object.entries(allPosts)
      .map(([path, post]) => ({
        slug: path.replace("../content/posts/", "").replace(".mdx", ""),
        ...post.frontmatter,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const recentPosts = posts.slice(0, 5);
  const hasMorePosts = posts.length > 5;

  return (
    <div>
      {recentPosts.map((post) => (
        <article key={post.slug}>
          <Link to={`/post/${post.slug}`} className="post-title">
            <h2>{post.title}</h2>
          </Link>
          <time>{post.date}</time>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
      {hasMorePosts && (
        <footer style={{ marginTop: "4rem", textAlign: "right" }}>
          <Link to="/archive" style={{ color: "var(--title-color)" }}>
            older posts..
          </Link>
        </footer>
      )}
    </div>
  );
};

export default Home;
