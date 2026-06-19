import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Tag } from "./Tag";
import { sortTags } from "../utils/tags";
import { getPostBySlug } from "../utils/posts";
import { usePageSeo } from "../utils/seo";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../utils/site";
import { NotFoundMessage } from "./NotFoundMessage";

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const frontmatter = post?.frontmatter;
  const isMissing = !post;

  usePageSeo({
    title: isMissing ? "Post not found" : (frontmatter?.title ?? "Post"),
    description: isMissing
      ? "This blog post does not exist."
      : frontmatter?.description,
    path: `/post/${slug ?? ""}`,
    image: frontmatter?.image
      ? `${SITE_URL}/posts/${frontmatter.image}`
      : DEFAULT_OG_IMAGE,
    type: "article",
    noindex: isMissing,
  });

  if (!post) {
    return (
      <NotFoundMessage
        title="Post not found"
        message="There isn't a published post at this address. It may have moved, or the link could be mistyped."
      />
    );
  }

  const Content = post.default;
  const fm = post.frontmatter;

  return (
    <article id="blog" className="post-content">
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
