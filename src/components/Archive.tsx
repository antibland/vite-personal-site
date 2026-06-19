import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { loadPublishedPosts } from "../utils/posts";
import { usePageSeo } from "../utils/seo";

const Archive: React.FC = () => {
  const posts = useMemo(() => loadPublishedPosts(), []);

  usePageSeo({
    title: "Blog",
    description: "Articles on web development, engineering leadership, and more.",
    path: "/blog",
  });

  return posts.length > 0 ? (
    <div id="blog" className="posts">
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
