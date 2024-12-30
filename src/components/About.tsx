import { FC } from "react";
import { getAssetPath } from "../utils/assetPath";
import * as SimpleIcons from "simple-icons";

const About: FC = () => {
  return (
    <div className="section about-section">
      <div className="about-container">
        <div className="about-main">
          <img
            src={getAssetPath("andy-profile-scarf.webp")}
            srcSet={`${getAssetPath(
              "andy-profile-scarf.webp"
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
            <p style={{ fontSize: "var(--text-lg)" }}>
              Hi, I'm Andy Hoffman, a senior front-end engineer building elegant
              solutions to complex problems. Today, everyone brands themselves
              with the full-stack moniker, and while I'm technically full stack,
              my strongest skills are on the front end of the stack. I'm proud
              to be a front-end engineer.
            </p>
            <p style={{ fontSize: "var(--text-lg)" }}>
              I started tinkering on the web back in 2000, and was quickly drawn
              to HTML semantics and the simplicity and expressiveness of clean
              markup and CSS. Becoming skilled in UI/UX means identifying what
              matters to users and what does not. Once everything unnecessary is
              removed, the front end revs and purrs like a well-tuned machine.
              This has never changed since I started and is even more true
              today.
            </p>
          </div>
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
