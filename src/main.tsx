import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, type HydrationState } from "react-router-dom";
import { createHead, UnheadProvider } from "@unhead/react/client";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdx-components";
import { routes } from "./routes";

// React Router (and React's ViewTransition integration in canary) uses the
// browser View Transitions API. When users click rapidly, the browser is allowed
// to abort an in-flight transition in favor of a new one.
//
// In dev, Vite treats unhandled promise rejections as errors and can show an
// overlay that makes the app feel "broken". Aborted transitions are expected,
// so we ignore just those specific rejections.
if (import.meta.env.DEV) {
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason as unknown;
    const err =
      typeof reason === "object" && reason !== null
        ? (reason as { name?: unknown; message?: unknown })
        : null;
    const name = err && typeof err.name === "string" ? err.name : "";
    const message =
      err && typeof err.message === "string" ? err.message : "";

    if (name === "AbortError" && /view transition/i.test(message)) {
      event.preventDefault();
    }
  });
}

const hydrationData = (
  window as Window & { __staticRouterHydrationData?: HydrationState }
).__staticRouterHydrationData;

const head = createHead();
const router = createBrowserRouter(routes, {
  ...(hydrationData ? { hydrationData } : {}),
});

const rootElement = document.getElementById("app")!;
const app = (
  <StrictMode>
    <UnheadProvider head={head}>
      <MDXProvider components={mdxComponents}>
        <RouterProvider router={router} />
      </MDXProvider>
    </UnheadProvider>
  </StrictMode>
);

if (import.meta.env.DEV) {
  createRoot(rootElement).render(app);
} else {
  hydrateRoot(rootElement, app);
}
