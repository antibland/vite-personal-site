import { Link } from "react-router-dom";

export const DotsToHome = () => {
  return (
    <Link
      to="/"
      aria-label="Back to home"
      style={{
        textDecoration: "underline",
        fontSize: "0.9rem",
        color: "var(--text-color)",
      }}
    >
      ..
    </Link>
  );
};
