import { FC } from "react";
import { getAssetPath } from "../utils/assetPath";
import * as SimpleIcons from "simple-icons";

const About: FC = () => {
  return (
    <div className="section about-section">
      <h1>Hey, I'm Andy</h1>
      <div className="about-container">
        <div className="about-main">
          <img
            src={getAssetPath("andy-profile-scarf.webp")}
            srcSet={`${getAssetPath(
              "andy-profile-scarf.webp"
            )} 1x, ${getAssetPath("andy-profile-scarf@2x.webp")} 2x`}
            alt="Andy Hoffman"
            width="800"
            height="533"
            loading="eager"
            fetchPriority="high"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              display: "block",
              marginBottom: "1.5rem",
            }}
          />
          <p>
            Hi, I'm Andy Hoffman, a front-end engineer building elegant
            solutions to complex problems. Today, everyone brands themselves
            with the full-stack moniker, and while I'm technically full stack,
            my strongest skills are on the front end of the stack.
          </p>
          <p>
            I started tinkering on the web back in 2000, and I fell in love with
            HTML semantics and the simplicity and expressiveness of clean markup
            and CSS. Despite navigating the sometimes tangled jungles of JSX, I
            always narrow my focus toward what matters and what does not. Once
            everything unnecessary is removed, the front end revs and purrs like
            a well-tuned engine. This has never changed since I started and has
            never been more true in modern web development.
          </p>
        </div>
        <aside className="about-sidebar">
          <nav className="social-links">
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
                <path fill="currentColor" d={SimpleIcons.siX.path} />
              </svg>
              <span>X (Twitter)</span>
            </a>
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
                <path fill="currentColor" d={SimpleIcons.siGithub.path} />
              </svg>
              <span>GitHub</span>
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
                <path fill="currentColor" d={SimpleIcons.siCodepen.path} />
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
                  d={SimpleIcons.siStackoverflow.path}
                />
              </svg>
              <span>Stack Overflow</span>
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
                <path fill="currentColor" d={SimpleIcons.siFiles.path} />
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
