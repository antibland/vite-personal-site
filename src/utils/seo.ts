import { useSeoMeta } from "@unhead/react";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "./site";

interface PageSeoOptions {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

export function usePageSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: PageSeoOptions) {
  const url = `${SITE_URL}${path}`;
  const pageTitle =
    path === "/" ? "Andy Hoffman dot codes" : `${title} | ${SITE_NAME}`;

  useSeoMeta({
    title: pageTitle,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: image,
    ogType: type,
    ogSiteName: SITE_NAME,
    twitterCard: "summary_large_image",
    twitterImage: image,
    ...(noindex ? { robots: "noindex" } : {}),
  });
}
