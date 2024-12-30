import React from "react";
import * as SimpleIcons from "simple-icons";

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    icon?: string;
  }>;
}

const getIconSlug = (name: string): string => {
  // Convert common names to their simple-icons slug
  const nameMap: { [key: string]: string } = {
    React: "react",
    TypeScript: "typescript",
    JavaScript: "javascript",
    HTML5: "html5",
    "Modern CSS": "css3",
    Tailwind: "tailwindcss",
    "Next.js": "nextdotjs",
    "Node.js": "nodedotjs",
    GraphQL: "graphql",
    Git: "git",
    Docker: "docker",
    MongoDB: "mongodb",
    PostgreSQL: "postgresql",
    Redis: "redis",
    Wagmi: "ethereum", // Using Ethereum icon as Wagmi is blockchain-related
    SQL: "mysql", // Using MySQL icon as a general SQL representation
  };

  return nameMap[name] || name.toLowerCase().replace(/\s+/g, "");
};

const getIconByName = (name: string) => {
  const slug = getIconSlug(name);
  const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (SimpleIcons as any)[iconKey];
};

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend Development",
      skills: [
        { name: "React" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "HTML5" },
        { name: "Modern CSS" },
        { name: "Tailwind" },
        { name: "Next.js" },
        { name: "Wagmi" },
      ],
    },
    {
      name: "Backend Development",
      skills: [
        { name: "Node.js" },
        { name: "RESTful APIs" },
        { name: "GraphQL" },
      ],
    },
    {
      name: "Tools & Technologies",
      skills: [
        { name: "Git" },
        { name: "Cursor" },
        { name: "Docker" },
        { name: "CI/CD" },
        { name: "Figma" },
      ],
    },
    {
      name: "Database Technologies",
      skills: [
        { name: "SQL" },
        { name: "Redis" },
        { name: "MongoDB" },
        { name: "PostgreSQL" },
      ],
    },
  ];

  return (
    <div className="section">
      <h1>Skills</h1>
      <div className="content">
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.name}</h3>
              <div className="skills-list">
                {category.skills.map((skill, i) => {
                  const icon = getIconByName(skill.name);
                  return (
                    <span key={i} className="skill-tag">
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
                      {skill.name}
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

export default Skills;
