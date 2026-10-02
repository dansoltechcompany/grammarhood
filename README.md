# Grammarhood

Adult self-learners. Ten-minute sessions. 100 topics in the map, all live.

A product of Dansol Tech Pvt Ltd. Contact: info@dansoltech.com

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Quality gate

```bash
npm run check:topics
```

Mechanical only: 8+ questions, hints, explanations, `subRule`, no duplicate prompts, rule text not copied from sisters.

Draft topic URLs 404 and are omitted from `sitemap.xml`.

## Search

Public URLs are `https://grammarhood.com/...`.

`http://` and `www.` 301 to that host. Both hostnames are worker routes in `wrangler.jsonc`, so `www` is answered by the app instead of Cloudflare error 522.

Each indexable page sets its own canonical. `/practice` and `/recap` stay `noindex`. The sitemap lists only the pages that should be indexed, with no rotating `lastmod`.
