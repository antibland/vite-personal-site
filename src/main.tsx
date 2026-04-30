import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

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
    const name =
      typeof reason === "object" && reason && "name" in reason
        ? String((reason as any).name)
        : "";
    const message =
      typeof reason === "object" && reason && "message" in reason
        ? String((reason as any).message)
        : "";

    if (name === "AbortError" && /view transition/i.test(message)) {
      event.preventDefault();
    }
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
