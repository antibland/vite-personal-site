import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAssetPath } from "../utils/assetPath";
import { getLatestPublishedPost } from "../utils/posts";
import {
  siFiles,
  siGithub,
  siStackoverflow,
  siX,
} from "../utils/simpleIcons";

// CodePen was removed from simple-icons (no brand permission to redistribute the mark).
// This path is the CC0 shape previously shipped as `siCodepen` in simple-icons@14.15.0.
const CODEPEN_SVG_PATH =
  "M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z";

const About: FC = () => {
  const latestPost = useMemo(() => getLatestPublishedPost(), []);

  return (
    <div id="home" className="section about-section">
      <div className="about-container">
        <div className="about-main">
          <img
            src={getAssetPath("andy-profile-scarf.webp")}
            srcSet={`${getAssetPath(
              "andy-profile-scarf.webp",
            )} 800w, ${getAssetPath("andy-profile-scarf@2x.webp")} 1600w`}
            sizes="(max-width: 800px) 100vw, 515px"
            alt="Andy Hoffman"
            width="515"
            height="344"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className="priority-image"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              display: "block",
              contentVisibility: "auto",
            }}
          />
          <div className="text-content">
            <h1>👋 Internet</h1>
            <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>
              I'm Andy Hoffman, a senior full-stack engineer, front-end expert
              and team builder. I ship well-reviewed, production-ready software
              at scale and ensure accessibility guidelines are met throughout
              the development process. I prioritize giving and receiving
              feedback from my teammates, because a team that communicates well
              creates a better product. I believe in 10x teams, not 10x
              engineers.
            </p>
            <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>
              When I first started tinkering on the web in 2000, I was drawn to
              the semantic expressiveness of HTML, the ability of well written
              CSS to transform the look and feel of a web application, and the
              raw power of JavaScript. The way these technologies are expressed
              has changed, but the underlying approach remains the same.
              Front-end engineering is an act of subtraction. Remove everything
              that doesn't absolutely serve the user, and what remains is the
              truth.
            </p>
            {latestPost && (
              <aside
                className="about-latest-post"
                aria-labelledby="about-latest-post-title"
              >
                <Link
                  to={`/post/${latestPost.slug}`}
                  className="about-latest-post-link"
                  style={{
                    backgroundImage: `url(${getAssetPath(`posts/${latestPost.image}`)})`,
                  }}
                >
                  <div className="about-latest-post-content">
                    <h2
                      id="about-latest-post-title"
                      className="about-latest-post-title"
                    >
                      {latestPost.title}
                    </h2>
                    {latestPost.description && (
                      <p className="about-latest-post-description">
                        {latestPost.description}
                      </p>
                    )}
                  </div>
                  <time
                    className="about-latest-post-date"
                    dateTime={latestPost.date}
                  >
                    {latestPost.date}
                  </time>
                </Link>
              </aside>
            )}
          </div>
        </div>
        <aside className="about-sidebar">
          <nav className="social-links">
            <a
              href="https://github.com/antibland/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
              >
                <path fill="currentColor" d={siGithub.path} />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com/ClosingBrace"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
              >
                <path fill="currentColor" d={siX.path} />
              </svg>
              <span>X (Twitter)</span>
            </a>
            <a
              href="https://codepen.io/antibland"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
              >
                <path fill="currentColor" d={CODEPEN_SVG_PATH} />
              </svg>
              <span>CodePen</span>
            </a>
            <a
              href="https://stackoverflow.com/users/949217/andy-hoffman"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  fill="currentColor"
                  d={siStackoverflow.path}
                />
              </svg>
              <span>Stack Overflow</span>
            </a>
            <a
              href="https://www.linkedin.com/in/andybhoffman/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  fill="currentColor"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href={getAssetPath("assets/Andy_Hoffman_Resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
              >
                <path fill="currentColor" d={siFiles.path} />
              </svg>
              <span>Resume (PDF)</span>
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default About;
