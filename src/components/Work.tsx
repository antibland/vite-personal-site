import React, { ReactNode } from "react";
import { getAssetPath } from "../utils/assetPath";
import * as SimpleIcons from "simple-icons";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  icon?: ReactNode;
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
