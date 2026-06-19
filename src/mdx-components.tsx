import React from "react";

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 style={{ color: "var(--text-color)" }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{ color: "var(--text-color)" }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ color: "var(--text-color)" }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      style={{
        color: "var(--primary-color)",
        textDecoration: "none",
        outline: "1px solid transparent",
        outlineOffset: "2px",
        transition: "outline-color 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.outlineColor = "var(--primary-color)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.outlineColor = "transparent";
      }}
      {...props}
    />
  ),
};
