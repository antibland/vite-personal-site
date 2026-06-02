import { execFileSync, spawn } from "node:child_process";

const PORT = 4177;
const HOST = "127.0.0.1";
const URL = `http://${HOST}:${PORT}/`;

const lighthouseArgs = process.argv.slice(2);
const args =
  lighthouseArgs.length > 0
    ? lighthouseArgs
    : [
        "--only-categories=performance",
        "--output=json",
        "--output-path=./lighthouse-report.json",
      ];

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Preview not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function runPreview() {
  return spawn(
    "pnpm",
    ["exec", "vite", "preview", "--host", HOST, "--port", String(PORT)],
    { stdio: "inherit" },
  );
}

console.log("Building production bundle...");
execFileSync("pnpm", ["build"], { stdio: "inherit" });

console.log(`Starting preview at ${URL}`);
const preview = runPreview();

const shutdown = () => {
  if (!preview.killed) {
    preview.kill("SIGTERM");
  }
};

process.on("SIGINT", () => {
  shutdown();
  process.exit(130);
});
process.on("SIGTERM", shutdown);

try {
  await waitForServer(URL);
  console.log("Running Lighthouse...");
  execFileSync("pnpm", ["exec", "lighthouse", URL, ...args], {
    stdio: "inherit",
  });
  if (!lighthouseArgs.includes("--view")) {
    console.log("Wrote lighthouse-report.json");
  }
} finally {
  shutdown();
}
