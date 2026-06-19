import React from "react";
import { getIconByName } from "../utils/simpleIcons";
import { usePageSeo } from "../utils/seo";

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    icon?: string;
  }>;
}

const Skills: React.FC = () => {
  usePageSeo({
    title: "Skills",
    description:
      "Technologies and tools Andy Hoffman works with — from React and TypeScript to AI and DevOps.",
    path: "/skills",
  });

  const skillCategories: SkillCategory[] = [
    {
      name: "AI",
      skills: [
        { name: "Claude" },
        { name: "Cursor" },
        { name: "GPT" },
        { name: "MCP" },
        { name: "Prompt Engineering" },
        { name: "Agent Skills" },
        { name: "Midjourney" },
      ],
    },
    {
      name: "Frontend",
      skills: [
        { name: "React" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "HTML5" },
        { name: "Modern CSS" },
        { name: "Tailwind" },
        { name: "Shadcn" },
        { name: "Next.js" },
        { name: "Vercel" },
        { name: "Motion" },
        { name: "WCAG" },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js" },
        { name: "RESTful APIs" },
        { name: "GraphQL" },
      ],
    },
    {
      name: "Blockchain",
      skills: [
        { name: "Smart Contract Integration" },
        { name: "Wagmi" },
        { name: "Viem" },
        { name: "Transaction Processing" },
      ],
    },
    {
      name: "Tools & Technologies",
      skills: [
        { name: "Git" },
        { name: "Docker" },
        { name: "CI/CD" },
        { name: "Figma" },
      ],
    },
    {
      name: "DB",
      skills: [
        { name: "SQL" },
        { name: "Redis" },
        { name: "MongoDB" },
        { name: "PostgreSQL" },
      ],
    },
  ];

  return (
    <section id="skills" className="section">
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
    </section>
  );
};

export default Skills;
