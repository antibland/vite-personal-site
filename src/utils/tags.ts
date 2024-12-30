export const formatTag = (tag: string): string => {
  return tag.toLowerCase().replace(/\s+/g, "-");
};

export const unformatTag = (tag: string): string => {
  // Special cases for tags that should be uppercase
  const uppercaseTags = ["css", "html", "mdx", "jsx", "tsx", "api"];
  const lowercaseTag = tag.toLowerCase();

  if (uppercaseTags.includes(lowercaseTag)) {
    return tag.toUpperCase();
  }

  // Default case: capitalize each word
  return tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const sortTags = (tags: string[]): string[] => {
  return [...tags].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
};
