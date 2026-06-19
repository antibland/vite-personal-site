import { Link } from "react-router-dom";

interface NotFoundMessageProps {
  title: string;
  message: string;
}

export function NotFoundMessage({ title, message }: NotFoundMessageProps) {
  return (
    <section className="section not-found-section">
      <h1>{title}</h1>
      <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>{message}</p>
      <nav aria-label="Helpful links" className="not-found-links">
        <Link to="/" viewTransition>
          Back to home
        </Link>
        <Link to="/blog" viewTransition>
          Read the blog
        </Link>
        <Link to="/portfolio" viewTransition>
          View portfolio
        </Link>
      </nav>
    </section>
  );
}
