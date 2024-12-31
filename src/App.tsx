import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import Layout from "./layouts/Layout";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Archive from "./components/Archive";
import Post from "./components/Post";
import TagPosts from "./components/TagPosts";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<About />} />
      <Route path="/work" element={<Work />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/blog" element={<Archive />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/post/:slug" element={<Post />} />
      <Route path="/tag/:tag" element={<TagPosts />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <MDXProvider components={components}>
        <RouterProvider router={router} />
      </MDXProvider>
    </React.StrictMode>
  );
};

export default App;
