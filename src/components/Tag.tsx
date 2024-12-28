import { Link } from "react-router-dom";
import { formatTag, unformatTag } from "../utils/tags";

interface TagProps {
  tag: string;
  isActive?: boolean;
}

export const Tag: React.FC<TagProps> = ({ tag, isActive = false }) => {
  const formattedTag = formatTag(tag);
  const displayTag = unformatTag(tag);

  return (
    <Link
      to={`/tag/${formattedTag}`}
      style={{
        display: "inline-block",
        padding: "0.2rem 0.5rem",
        margin: "0.2rem",
        border: "1px solid var(--text-color)",
        borderRadius: "4px",
        fontSize: "0.8rem",
        opacity: isActive ? 1 : 0.8,
        textDecoration: "none",
        backgroundColor: isActive ? "var(--text-color)" : "transparent",
        color: isActive ? "var(--bg-color)" : "var(--text-color)",
      }}
    >
      {displayTag}
    </Link>
  );
};
