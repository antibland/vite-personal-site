import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { Tag } from "./Tag";
import { sortTags } from "../utils/tags";
import { DotsToHome } from "./DotsToHome";

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
    <article>
      <header style={{ marginBottom: "2rem" }}>
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <DotsToHome />
          <div style={{ textAlign: "right" }}>
            <time style={{ opacity: 0.8 }}>{fm.date}</time>
          </div>
        </div>
        <h1>{fm.title}</h1>
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
