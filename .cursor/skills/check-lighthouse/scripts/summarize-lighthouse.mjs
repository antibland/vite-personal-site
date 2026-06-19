import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const reportPath = resolve(process.argv[2] ?? "lighthouse-report.json");
const report = JSON.parse(readFileSync(reportPath, "utf8"));

const categories = Object.entries(report.categories ?? {}).map(([id, cat]) => ({
  id,
  score: cat.score == null ? null : Math.round(cat.score * 100),
  title: cat.title,
}));

const metricIds = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
  "interactive",
];

const metrics = metricIds
  .map((id) => report.audits[id])
  .filter(Boolean)
  .map((audit) => ({
    id: audit.id,
    value: audit.displayValue ?? String(audit.numericValue),
    score: audit.score == null ? null : Math.round(audit.score * 100),
  }));

const issues = Object.values(report.audits)
  .filter(
    (audit) =>
      audit.score !== null &&
      audit.score < 1 &&
      audit.scoreDisplayMode !== "informative" &&
      audit.scoreDisplayMode !== "manual",
  )
  .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
  .map((audit) => ({
    id: audit.id,
    title: audit.title,
    score: audit.score == null ? null : Math.round(audit.score * 100),
    displayValue: audit.displayValue ?? null,
  }));

console.log(JSON.stringify(
  {
    url: report.finalUrl ?? report.requestedUrl,
    fetchTime: report.fetchTime,
    categories: report.configSettings?.onlyCategories ?? ["all"],
    scores: categories,
    coreWebVitals: metrics,
    opportunities: issues.slice(0, 15),
  },
  null,
  2,
));
