import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { Tag } from "./Tag";
import { formatTag, unformatTag, sortTags } from "../utils/tags";

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
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    author?: string;
    readingTime?: number;
    tags?: string[];
    category?: string;
    featured?: boolean;
    draft?: boolean;
  };
  default: React.ComponentType;
}

const TagPosts: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const displayTag = tag ? unformatTag(tag) : "";

  const posts = useMemo(() => {
    const postFiles = import.meta.glob<MDXModule>("../content/posts/*.mdx", {
      eager: true,
    });

    return Object.entries(postFiles)
      .map(([path, module]) => {
        if (!module.frontmatter) {
          console.warn(`No frontmatter found for ${path}`);
          return null;
        }
        const { frontmatter: fm } = module;
        if (!fm.tags?.some((t) => formatTag(t) === tag) || fm.draft) {
          return null;
        }
        const post: Post = {
          title: fm.title,
          date: fm.date,
          slug: path.replace("../content/posts/", "").replace(".mdx", ""),
          description: fm.description,
          author: fm.author,
          readingTime: fm.readingTime,
          tags: fm.tags,
          category: fm.category,
          featured: fm.featured,
          draft: fm.draft,
        };
        return post;
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [tag]);

  if (posts.length === 0) {
    return (
      <div>
        <h2>Tag: {displayTag}</h2>
        <p>No posts found with this tag</p>
        <Link to="/blog" style={{ textDecoration: "none" }}>
          ← Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Posts tagged with "{displayTag}"</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              border: post.featured ? "1px solid var(--text-color)" : "none",
              borderRadius: "4px",
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>
              <Link
                to={`/post/${post.slug}`}
                style={{
                  fontSize: "1.2rem",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {post.title}
              </Link>
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              {post.author && <span>By {post.author} • </span>}
              <span>{post.readingTime} min read • </span>
              <time>{post.date}</time>
            </div>
            {post.description && (
              <p style={{ margin: "0.5rem 0" }}>{post.description}</p>
            )}
            {post.tags && (
              <div style={{ marginTop: "0.5rem" }}>
                {sortTags(post.tags).map((t) => (
                  <Tag key={t} tag={t} isActive={formatTag(t) === tag} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <Link to="/blog" style={{ textDecoration: "none" }}>
        ← Back to all posts
      </Link>
    </div>
  );
};

export default TagPosts;
