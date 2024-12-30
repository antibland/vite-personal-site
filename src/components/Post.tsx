import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Tag } from "./Tag";
import { sortTags } from "../utils/tags";

interface FrontMatter {
  title: string;
  date: string;
  description?: string;
  author?: string;
  readingTime?: number;
  tags?: string[];
  category?: string;
  lastModified?: string;
}

interface MDXModule {
  frontmatter: FrontMatter;
  default: React.ComponentType;
}

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => {
    const posts = import.meta.glob<MDXModule>("../content/posts/*.mdx", {
      eager: true,
    });
    const postFile = Object.entries(posts).find(([path]) =>
      path.includes(`${slug}.mdx`)
    );

    if (!postFile) return null;
    if (!postFile[1].frontmatter) {
      console.warn(`No frontmatter found for ${postFile[0]}`);
      return null;
    }

    return postFile[1];
  }, [slug]);

  if (!post) {
    return <div>Post not found</div>;
  }

  const Content = post.default;
  const { frontmatter: fm } = post;

  return (
    <article className="post-content">
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", flexDirection: "column" }}>
          <span>{fm.title}</span>
          <time
            style={{
              opacity: 0.8,
              fontSize: "1rem",
              paddingLeft: "0.25rem",
              marginTop: "0.5rem",
            }}
          >
            {fm.date}
          </time>
        </h1>
      </header>
      <Content />
      {fm.tags && (
        <footer
          style={{
            marginTop: "4rem",
            borderTop: "0.5px solid var(--text-color-muted)",
            paddingTop: "2rem",
          }}
        >
          <div>
            {sortTags(fm.tags).map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </footer>
      )}
    </article>
  );
};

export default Post;
