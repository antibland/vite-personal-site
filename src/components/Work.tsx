import React, { ReactNode, useRef } from "react";
import { getAssetPath } from "../utils/assetPath";
import * as SimpleIcons from "simple-icons";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  icon?: ReactNode;
  images?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
}

const getIconSlug = (name: string): string => {
  // Convert common names to their simple-icons slug
  const nameMap: { [key: string]: string } = {
    React: "react",
    TypeScript: "typescript",
    JavaScript: "javascript",
    "Next.js": "nextdotjs",
    TailwindCSS: "tailwindcss",
    Vite: "vite",
    MDX: "mdx",
    CSS: "css3",
    Wagmi: "ethereum", // Using Ethereum icon as Wagmi is blockchain-related
  };

  return nameMap[name] || name.toLowerCase().replace(/\s+/g, "");
};

const getIconByName = (name: string) => {
  const slug = getIconSlug(name);
  const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (SimpleIcons as any)[iconKey];
};

const Work: React.FC = () => {
  const dialogRefs = useRef<(HTMLDialogElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleStackClick = (index: number) => {
    const dialog = dialogRefs.current[index];
    if (dialog) {
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.classList.add("dialog-open");
      });
    }
  };

  const handleDialogClose = (dialog: HTMLDialogElement) => {
    const dialogIndex = dialogRefs.current.indexOf(dialog);
    const triggerButton = buttonRefs.current[dialogIndex];

    // Start the closing animation
    dialog.classList.remove("dialog-open");

    // Wait for the animation to finish before actually closing
    const handleTransitionEnd = () => {
      dialog.close();
      if (triggerButton) {
        triggerButton.focus();
      }
      dialog.removeEventListener("transitionend", handleTransitionEnd);
    };

    dialog.addEventListener("transitionend", handleTransitionEnd);
  };

  const projects: Project[] = [
    {
      title: "Fabrica (current)",
      icon: (
        <img
          src={getAssetPath("icons/fabrica.png")}
          alt="Fabrica logo"
          width={24}
          height={24}
        />
      ),
      description:
        "Fabrica brings physical land onchain, and allows you to buy, sell, borrow againsg it, and trade it. As the only front end developer on the team, I'm responsible for the entire user experience.",
      technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Wagmi"],
      link: "https://fabrica.land/",
      images: [
        {
          src: getAssetPath("work/fabrica/1.webp"),
          alt: "Marketplace land purchase options",
          caption: "Marketplace land purchase made easy",
        },
        {
          src: getAssetPath("work/fabrica/2.webp"),
          alt: "Onchain social profile header",
          caption: "Onchain social profile header",
        },
        {
          src: getAssetPath("work/fabrica/3.webp"),
          alt: "Beautiful, expressive profile pages",
          caption: "Beautiful, expressive profile pages",
        },
      ],
    },
    {
      title: "Custom Blog Integration",
      icon: (
        <svg className="logo" style={{ width: 22, height: 24 }}>
          <use
            xlinkHref={getAssetPath("assets/svg-defs.svg") + "?v=2#svg-logo"}
          />
        </svg>
      ),
      description:
        "This web app integreates with a custom markdown blog, and allows you to create, edit, and delete posts.",
      technologies: ["React", "Vite", "TypeScript", "MDX"],
      images: [
        {
          src: getAssetPath("work/custom-blog/1.webp"),
          alt: "Blog post editor with live preview",
          caption: "Rich markdown editor with live preview",
        },
        {
          src: getAssetPath("work/custom-blog/2.webp"),
          alt: "Blog post listing with categories",
          caption: "Organized post listing with category filtering",
        },
        {
          src: getAssetPath("work/custom-blog/3.webp"),
          alt: "Code syntax highlighting",
          caption: "Beautiful code syntax highlighting",
        },
      ],
    },
    {
      title: "Stack Overflow Elite Contributor",
      icon: (
        <svg className="logo" style={{ width: 22, height: 20, fill: "orange" }}>
          <use
            xlinkHref={getAssetPath("assets/svg-defs.svg") + "?v=3#svg-so"}
          />
        </svg>
      ),
      description: `I've reached millions of people over a ${
        new Date().getFullYear() - 2011
      } year period, and have been a top contributor to Stack Overflow during its most vibrant years.`,
      technologies: ["React", "JavaScript", "TypeScript", "CSS"],
      link: "https://stackoverflow.com/users/949217/andy-hoffman",
    },
  ];

  return (
    <div className="section">
      <h1>My Work</h1>
      <div className="content">
        <div className="projects">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">
                {project.icon && (
                  <span className="project-icon">{project.icon}</span>
                )}
                <span>{project.title}</span>
              </h3>
              <p className="project-content">{project.description}</p>
              {project.images && (
                <>
                  <button
                    ref={(el) => (buttonRefs.current[index] = el)}
                    className="project-images-stack"
                    onClick={() => handleStackClick(index)}
                    aria-label={`View all ${project.title} images`}
                  >
                    {project.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="project-image-wrapper">
                        <img
                          className="project-image"
                          src={image.src}
                          alt={image.alt}
                        />
                        {imgIndex === 0 && (
                          <div className="project-image-caption">
                            View all product images
                          </div>
                        )}
                      </div>
                    ))}
                  </button>
                  <dialog
                    ref={(el) => (dialogRefs.current[index] = el)}
                    className="project-dialog"
                    onCancel={(e) => {
                      e.preventDefault();
                      handleDialogClose(e.currentTarget);
                    }}
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        handleDialogClose(e.currentTarget);
                      }
                    }}
                  >
                    <div className="dialog-content">
                      <header className="dialog-header">
                        <h2>{project.title} Images</h2>
                        <button
                          className="dialog-close"
                          onClick={(e) =>
                            handleDialogClose(
                              e.currentTarget.closest("dialog")!
                            )
                          }
                          aria-label="Close dialog"
                        >
                          ×
                        </button>
                      </header>
                      <div className="dialog-body">
                        {project.images.map((image, imgIndex) => (
                          <figure key={imgIndex}>
                            <img src={image.src} alt={image.alt} />
                            <figcaption>{image.caption}</figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  </dialog>
                </>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "fit-content",
                    marginBottom: "1rem",
                    display: "inline-block",
                  }}
                >
                  View Project →
                </a>
              )}
              <div className="technologies">
                {project.technologies.map((tech, i) => {
                  const icon = getIconByName(tech);
                  return (
                    <span key={i} className="tech-tag">
                      {icon && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="skill-icon"
                          fill="currentColor"
                        >
                          <path d={icon.path} />
                        </svg>
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
