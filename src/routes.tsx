import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Archive from "./components/Archive";
import Post from "./components/Post";
import TagPosts from "./components/TagPosts";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: About },
      { path: "work", element: <Navigate to="/portfolio" replace /> },
      { path: "portfolio", Component: Portfolio },
      { path: "skills", Component: Skills },
      { path: "blog", Component: Archive },
      { path: "contact", Component: Contact },
      { path: "post/:slug", Component: Post },
      { path: "tag/:tag", Component: TagPosts },
    ],
  },
];
