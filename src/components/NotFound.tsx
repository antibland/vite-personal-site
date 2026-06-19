import { usePageSeo } from "../utils/seo";
import { NotFoundMessage } from "./NotFoundMessage";

const NotFound: React.FC = () => {
  usePageSeo({
    title: "Page not found",
    description: "The page you are looking for does not exist.",
    path: "/404",
    noindex: true,
  });

  return (
    <NotFoundMessage
      title="Page not found"
      message="That URL doesn't match anything on this site. Double-check the address, or head back to a page that exists."
    />
  );
};

export default NotFound;
