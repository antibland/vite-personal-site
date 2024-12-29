import React from "react";

interface SkillCategory {
  name: string;
  skills: string[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend Development",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "Modern CSS",
        "Tailwind",
        "Next.js",
        "Wagmi",
      ],
    },
    {
      name: "Backend Development",
      skills: ["Node.js", "RESTful APIs", "GraphQL"],
    },
    {
      name: "Tools & Technologies",
      skills: ["Git", "Cursor", "Docker", "CI/CD", "Figma"],
    },
    {
      name: "Database Technologies",
      skills: ["SQL", "Redis", "MongoDB", "PostgreSQL"],
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
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
