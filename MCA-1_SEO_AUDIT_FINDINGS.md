# MCA-1 SEO Audit — MCADD Compass (mcadd-research.github.io)

**Date:** 2026-10-09  
**Branch audited:** `seo/mca-1-canonical-and-social-fixes` (commit `8430a74`)  
**Live site (pre-merge):** `https://mcadd-research.github.io/` (root) + `https://mcadd-research.github.io/MCADD/` (stale duplicate)  
**PR:** #1 — "SEO: fix canonical host, add og:image, trailing-slash consistency (MCA-1)"

---

## Executive Summary

**Overall health:** Poor (pre-merge) → Strong (post-merge)  
**Top issue:** **Two live GitHub Pages deployments serving identical content** — a root user site and a stale `/MCADD/` project site — with all canonical/OG/JSON-LD pointing at the wrong one. This splits authority and kills indexing.  
**Organic traffic:** Near zero (user reported 0).  
**Quick wins implemented in PR #1:** Canonical host fix, trailing-slash consistency, OG/Twitter images, descriptive home title, corrected `robots.txt` sitemap pointer.  
**Remaining critical action:** Disable/remove the stale `MCADD-Research/MCADD` Pages deployment to eliminate the duplicate at the source.

---

## Technical SEO Findings

### 1. CRITICAL — Duplicate site at `/MCADD/` (Project Pages deployment)

| | |
|---|---|
| **Impact** | High — splits link equity, confuses Google, canonicals point to wrong copy |
| **Evidence** | • Two repos: `MCADD-Research/mcadd-research.github.io` (user site) AND `MCADD-Research/MCADD` (project site) both have Pages enabled<br>• Live URLs: `https://mcadd-research.github.io/` (root) AND `https://mcadd-research.github.io/MCADD/` (project)<br>• Both return 200 with identical HTML body (different asset paths)<br>• Root `robots.txt` points to `https://mcadd-research.github.io/MCADD/sitemap.xml` (the stale sitemap)<br>• Stale sitemap lists `https://MCADD-Research.github.io/MCADD...` (wrong case, wrong host)<br>• All live canonicals, `og:url`, JSON-LD URLs point to `/MCADD/` |
| **Fix** | **Primary:** Delete/disable Pages on `MCADD-Research/MCADD` repo (Settings → Pages → "Remove site").<br>**Secondary (in PR #1):** Canonicals/OG/JSON-LD corrected to root host; `robots.txt` sitemap URL corrected; trailing-slash consistency enforced. |

### 2. CRITICAL — Canonical/OG/JSON-LD URLs pointed at wrong host (pre-merge)

| | |
|---|---|
| **Impact** | High — Google indexes the wrong canonical, authority leaks to stale copy |
| **Evidence** | Live `https://mcadd-research.github.io/` returns:<br>`<link rel="canonical" href="https://mcadd-research.github.io/MCADD/">`<br>`<meta property="og:url" content="https://mcadd-research.github.io/MCADD/">`<br>JSON-LD `WebSite.url` = `https://mcadd-research.github.io/MCADD/` |
| **Fix in PR #1** | `site.siteUrl` changed from `https://mcadd-research.github.io/MCADD` → `https://mcadd-research.github.io`; `usePageSeo.ts` emits trailing-slash canonicals; `ogImage` + `twitter:image` added; JSON-LD `url` updated to root with slash. |

### 3. HIGH — Sitemap & `robots.txt` pointed to stale duplicate

| | |
|---|---|
| **Impact** | High — crawlers sent to wrong sitemap, wrong URLs indexed |
| **Evidence** | Live `robots.txt`: `Sitemap: https://mcadd-research.github.io/MCADD/sitemap.xml`<br>Live stale sitemap: lists `https://MCADD-Research.github.io/MCADD` (uppercase host, no trailing slash)<br>Root sitemap (correct): lists `https://mcadd-research.github.io/` + 8 trailing-slash topic URLs |
| **Fix in PR #1** | `public/robots.txt` updated to `Sitemap: https://mcadd-research.github.io/sitemap.xml`; `@nuxtjs/sitemap` config uses correct `site.url` + `trailingSlash: true`. |

### 4. HIGH — Missing social image (`og:image` / `twitter:image`)

| | |
|---|---|
| **Impact** | Medium — poor social sharing appearance, no rich cards, no `og:image` in crawl |
| **Evidence** | Live home has no `og:image` or `twitter:image` meta tags; `og-image.png` 404s on both `/og-image.png` and `/MCADD/og-image.png` |
| **Fix in PR #1** | Added `public/og-image.png` (1200×630, 32 KB); `site.ogImageUrl` set; `usePageSeo` injects `ogImage` + `twitterImage` on every page. Verified in build output. |

### 5. MEDIUM — Home title too short / non-descriptive

| | |
|---|---|
| **Impact** | Medium — low CTR in SERPs, no keyword signal |
| **Evidence** | Live home `<title>MCADD</title>` (4 chars). Built branch: `MCADD — medium-chain acyl-CoA dehydrogenase deficiency, explained` (65 chars, keyword-rich). |
| **Fix in PR #1** | `nuxt.config.ts` `app.head.title` + `site.longTitle` updated. |

### 6. MEDIUM — Trailing-slash inconsistency

| | |
|---|---|
| **Impact** | Medium — potential duplicate content if both `/x` and `/x/` indexable |
| **Evidence** | Live: `/understanding` 301 → `/understanding/`; `/diagnosis` 301 → `/diagnosis/` etc. But sitemap (stale) listed non-slash URLs; canonicals had no slash. |
| **Fix in PR #1** | `site.trailingSlash: true` in `nuxt.config.ts`; `usePageSeo` appends slash to canonical; sitemap now lists all URLs with trailing slash. |

### 7. LOW — H1 on home is visual only (hero), not semantic

| | |
|---|---|
| **Impact** | Low — home H1 is "MCADD, made clear." (split across `<br>`), not the primary topic |
| **Evidence** | Built `index.html`: `<h1 class="hero-title">MCADD,<br>made clear.</h1>` — not a clean keyword H1. Other pages have proper H1s. |
| **Recommendation** | Consider moving the descriptive sentence to a sub-headline; make H1 match title: "MCADD — medium-chain acyl-CoA dehydrogenase deficiency, explained" or "MCADD: Understanding the Condition". No medical content change needed — this is a template adjustment. |

### 8. LOW — FCP 1.9s on live site (Lighthouse)

| | |
|---|---|
| **Impact** | Low — still "good" (threshold 1.8s), but could be faster |
| **Evidence** | Lighthouse on live `https://mcadd-research.github.io/`: Performance 97, SEO 100, Accessibility 96, Best Practices 100. FCP 1.9s, LCP 2.0s, CLS 0.001, TBT 30ms. |
| **Notes** | Static site, self-hosted variable fonts (Inter + Fraunces). FCP dominated by font load + JS hydration. Acceptable for a content site. |

### 9. LOW — Link-in-text-block accessibility (Lighthouse)

| | |
|---|---|
| **Impact** | Low — links rely on color only for distinction |
| **Evidence** | Lighthouse accessibility: `link-in-text-block` score 0. |
| **Recommendation** | Add underline or distinct style to in-content links in `assets/css/main.css`. |

---

## On-Page SEO Findings

| Page | Title (chars) | Description (chars) | H1 | JSON-LD Type | Notes |
|------|---------------|---------------------|-----|--------------|-------|
| `/` | 65 | 176 | Hero title split | WebSite | Title fixed in PR; hero H1 could be tighter |
| `/understanding/` | 27 | 160 | "Understanding MCADD" | MedicalWebPage | Good |
| `/diagnosis/` | 34 | 140 | "Diagnosis & biomarkers" | MedicalWebPage | Good |
| `/living/` | 25 | 140 | "Living with MCADD" | MedicalWebPage | Good |
| `/emergency/` | 28 | 139 | "Emergency situations" | MedicalWebPage | Good |
| `/research/` | 38 | 173 | "Research & clinical trials" | MedicalWebPage | Good |
| `/methodology/` | 19 | 115 | "How this content is made" | MedicalWebPage | Good |
| `/glossary/` | 16 | 97 | "Glossary" | MedicalWebPage | Good |
| `/resources/` | 31 | 111 | "Resources & sources" | MedicalWebPage | Good |

All pages: unique titles/descriptions, proper H1 hierarchy, `og:image` + `twitter:image` present, trailing-slash canonicals, `MedicalWebPage` schema with `about` → `MedicalCondition` (MCADD), `dateModified` from `content/site.ts` `contentLastVerified`.

---

## Content & E-E-A-T

**Medical content integrity:** ✅ Verified — all medical prose lives in `content/*.ts` with source attribution, PMIDs, evidence levels, `lastVerified` dates. No AI-generated medical claims. AGENTS.md enforces Knowledge Base as single source of truth.

**E-E-A-T signals present:**
- **Experience:** Patient-facing practical guidance (fasting, emergencies, daily living)
- **Expertise:** Source hierarchy (HAS, Orphanet, GeneReviews, PubMed), evidence levels A–X
- **Authoritativeness:** Transparent methodology page, disclaimer on every page, citation of official bodies
- **Trustworthiness:** HTTPS, medical disclaimer, no ads/tracking, contact via GitHub Issues, `lastVerified` dates

**Schema markup:** `WebSite` (home), `MedicalWebPage` (topics), `MedicalCondition` (MCADD entity). Valid JSON-LD injected server-side (visible in static HTML). No JS-injected schema — Lighthouse/Rich Results Test will detect it.

---

## Authority & Backlinks (User Goal: "share the site", "backlinks suspected important")

**Current state:** Zero organic traffic, near-zero backlinks (new site, duplicate issue blocked indexing).

**Post-merge immediate actions:**
1. **Disable stale Pages deployment** (`MCADD-Research/MCADD` repo Settings → Pages → Remove site) — eliminates duplicate at source.
2. **Verify root property in Google Search Console** — submit corrected `sitemap.xml`, request indexing for home + 8 topic pages.
3. **Rich Results Test** — validate `MedicalWebPage` + `MedicalCondition` schema on each URL.
4. **Bing Webmaster Tools** — submit same sitemap.

**Outreach/backlink targets (prioritized):**
| Target | Why | Approach |
|--------|-----|----------|
| Orphanet MCADD page | Authoritative rare-disease portal | Suggest adding MCADD Compass as patient resource |
| GeneReviews / NCBI Bookshelf | Clinician-facing, high trust | Same — "patient-friendly companion" |
| Metabolic clinic websites (e.g., CHOP, Mayo, UCL, Great Ormond Street) | Specialist care referrals | Email metabolic coordinators with one-pager |
| Patient orgs: CLIMB (UK), FOD Family Support Group (US), EURORDIS | Patient communities | Offer guest post / resource page link |
| Rare disease alliances (NORD, Genetic Alliance) | Aggregators | Submit resource |
| Academic reviewers / authors of key MCADD papers | Citations in literature | Cold email with methodology page link |
| Wikipedia MCADD article | High visibility | Add as external link in "Patient resources" section (if policy allows) |

**Content assets for outreach:**
- Methodology page (transparent evidence grading)
- Emergency page (actionable, shareable)
- Glossary (plain-language definitions)
- Research page (trial tracker, updated)

---

## Verification Evidence (Branch `seo/mca-1-canonical-and-social-fixes`)

```bash
npm run generate   # ✅ 22 routes prerendered
npm run typecheck  # ✅ exit 0
```

**Built `.output/public/` inspection:**
- `index.html`: canonical `https://mcadd-research.github.io/`, `og:url` same, `og:image` + `twitter:image` present, title descriptive
- `sitemap.xml`: 9 URLs, all trailing-slash, correct host
- `robots.txt`: `Sitemap: https://mcadd-research.github.io/sitemap.xml`
- `og-image.png`: present at root (32 KB, 1200×630)
- All topic pages: correct canonical/OG/JSON-LD, `MedicalWebPage` schema

**Lighthouse (live pre-merge):** Performance 97, SEO 100, Accessibility 96, Best Practices 100. CWV: LCP 2.0s, CLS 0.001, TBT 30ms.

---

## Prioritized Action Plan

| # | Action | Owner | Status |
|---|--------|-------|--------|
| 1 | **Merge PR #1** (canonical/host, og:image, trailing slash, title, robots) | Human review | Pending |
| 2 | **Disable Pages on `MCADD-Research/MCADD`** (delete duplicate at source) | Repo admin | ⏳ Not done |
| 3 | **GSC: verify root property + submit sitemap** | SEO | ⏳ After merge |
| 4 | **Rich Results Test** on home + 8 topic URLs | SEO | ⏳ After merge |
| 5 | **Bing Webmaster Tools** submit sitemap | SEO | ⏳ After merge |
| 6 | **Outreach campaign** (see table above) | Content/Community | ⏳ Post-indexing |
| 7 | Consider H1 refinement on home (template tweak) | Dev | 💡 Optional |
| 8 | Add underline to in-content links (accessibility) | Dev | 💡 Optional |

---

## Notes

- **Wave 0 scope:** This audit is read-only (findings only). PR #1 contains the safe fixes; merge is a human decision.
- **No medical content touched:** PR #1 modifies only SEO config/metadata (`nuxt.config.ts`, `content/site.ts`, `composables/usePageSeo.ts`, `pages/index.vue`, `public/robots.txt`, `public/og-image.png`).
- **Shared Knowledge Base:** All medical claims trace to `/home/eliot/.openclaw/workspace/mcadd_knowledge_base/` per AGENTS.md.