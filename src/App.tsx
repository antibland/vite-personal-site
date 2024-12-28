import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import Layout from "./layouts/Layout";
import Home from "./components/Home";
import Post from "./components/Post";
import TagPosts from "./components/TagPosts";
import Archive from "./components/Archive";

const components = {
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
    <a style={{ color: "var(--text-color)" }} {...props} />
  ),
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/post/:slug" element={<Post />} />
      <Route path="/tag/:tag" element={<TagPosts />} />
      <Route path="/archive" element={<Archive />} />
    </Route>
  )
);

function App() {
  return (
    <MDXProvider components={components}>
      <RouterProvider router={router} />
    </MDXProvider>
  );
}

export default App;
