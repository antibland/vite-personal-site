---
name: check-lighthouse
description: Run and analyze Lighthouse audits for this Vite SSG site. Use when the user asks to check Lighthouse scores, scan lighthouse-report.json, run performance audits, or interpret Core Web Vitals from local preview builds.
---

# Check Lighthouse

## Quick start

1. Run a fresh audit (builds `dist`, serves with `serve`, writes JSON):
   ```bash
   pnpm lighthouse
   ```
2. Summarize the report:
   ```bash
   node .cursor/skills/check-lighthouse/scripts/summarize-lighthouse.mjs
   ```
3. Present findings using the output template below.

## Available commands

| Command | Purpose |
|---------|---------|
| `pnpm lighthouse` | Mobile performance audit → `lighthouse-report.json` |
| `pnpm lighthouse:desktop` | Desktop preset audit |
| `pnpm lighthouse:view` | Opens HTML report in browser |

Pass extra Lighthouse CLI flags through the script:
```bash
pnpm lighthouse --only-categories=performance,seo,accessibility
pnpm lighthouse http://127.0.0.1:4177/blog
```

Default URL is `http://127.0.0.1:4177/` (homepage). Override by passing a URL as the first argument.

## How this project audits

- `scripts/lighthouse-preview.mjs` runs `pnpm build`, starts `serve dist` on port **4177**, then runs Lighthouse.
- Preview uses **`serve`**, not `vite preview`, so prerendered routes match production static hosting.
- Default config audits **performance only** on the **homepage**.

## Analyze an existing report

Read `lighthouse-report.json` from the repo root, or pass a path:

```bash
node .cursor/skills/check-lighthouse/scripts/summarize-lighthouse.mjs
node .cursor/skills/check-lighthouse/scripts/summarize-lighthouse.mjs ./lighthouse-report.json
```

Do not guess scores — always read the JSON or run the summarize script.

## Interpreting results for this site

### Expect locally (not production bugs)

- **Cache policy warnings** — `serve` on localhost sends no cache headers. Ignore unless auditing production.
- **Unused JavaScript** — React hydration bundles; expected for this SPA+SSG stack.
- **Render-blocking CSS** — single site stylesheet; minor unless score drops sharply.

### Worth acting on

- **LCP > 2.5s** or **FCP > 1.8s** on mobile — check hero image priority, font loading, render-blocking CSS.
- **CLS > 0.1** — layout shift from images or fonts without dimensions.
- **TBT > 200ms** — main-thread work blocking interaction.
- **SEO/Accessibility categories** — only if those categories were included in the run.

### SSG-specific checks

When auditing SEO-relevant pages, test prerendered routes explicitly:
```bash
pnpm build && pnpm exec serve dist -l 4177 &
# wait for server, then:
pnpm exec lighthouse http://127.0.0.1:4177/blog --only-categories=seo --output=json --output-path=./lighthouse-blog.json
```

View Source (not DevTools Elements) confirms per-page meta tags in prerendered HTML.

## Response template

```markdown
## Lighthouse summary — [URL]

**Run:** [date from report] | **Categories:** [list]

### Scores
| Category | Score |
|----------|-------|
| Performance | XX |

### Core Web Vitals
| Metric | Value | Verdict |
|--------|-------|---------|
| LCP | X.Xs | good / needs work |
| FCP | X.Xs | ... |
| TBT | Xms | ... |
| CLS | X.XXX | ... |

### Top opportunities
1. [Audit title] — [displayValue or savings]
2. ...

### Notes
- [Call out localhost-only findings vs real issues]
- [Suggest next URLs to audit if only homepage was tested]
```

## When scores look wrong

| Symptom | Likely cause |
|---------|----------------|
| Homepage meta on `/blog` in View Source during `vite preview` | Wrong server — use `pnpm preview` (`serve dist`) or `pnpm lighthouse` |
| Very low cache score locally | Expected with `serve`; verify on production |
| Report missing categories | Default run is performance-only; pass `--only-categories=...` |

## Additional audits to suggest

If the user wants deeper coverage, offer to run:
- `/blog` and a representative `/post/:slug`
- `--only-categories=performance,seo,accessibility,best-practices`
- Production URL `https://andyhoffman.codes` (requires network; cache behavior differs from local)
