import React from "react";

const About: React.FC = () => {
  return (
    <div className="section">
      <h1>Hey, I'm Andy</h1>
      <div className="content">
        <img
          src="/andy-profile-scarf.webp"
          alt="Andy Hoffman"
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            width: "800px",
            height: "auto",
            display: "block",
            marginBottom: "1.5rem",
          }}
        />
        <p>
          Hi, I'm Andy Hoffman, a front-end engineer building elegant solutions
          to complex problems. Today, everyone brands themselves with the
          full-stack moniker, and while I'm technically full stack, my strongest
          skills are on the front end of the stack.
        </p>
        <p>
          I started tinkering on the web back in 2000, and I fell in love with
          HTML semantics and the simplicity and expressiveness of clean markup
          and CSS. Despite navigating the sometimes tangled jungles of JSX, I
          always narrow my focus toward what matters and what does not. Once
          everything unnecessary is removed, the front end revs and purrs like a
          well-tuned engine. This has never changed since I started and has
          never been more true in modern web development.
        </p>
      </div>
    </div>
  );
};

export default About;
