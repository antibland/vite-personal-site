export const formatTag = (tag: string): string => {
  return tag.toLowerCase().replace(/\s+/g, "-");
};

export const unformatTag = (tag: string): string => {
  // Special cases for tags that should be uppercase
  const uppercaseTags = ["css", "html", "mdx", "jsx", "tsx", "api", "rsc"];
  const lowercaseTag = tag.toLowerCase();

  if (uppercaseTags.includes(lowercaseTag)) {
    return tag.toUpperCase();
  }

  // Special cases for tags with custom formatting
  const customTags: { [key: string]: string } = {
    "next-js": "Next.js",
  };

  if (customTags[lowercaseTag]) {
    return customTags[lowercaseTag];
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
