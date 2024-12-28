export const formatTag = (tag: string): string => {
  return tag.toLowerCase().replace(/\s+/g, "-");
};

export const unformatTag = (tag: string): string => {
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
