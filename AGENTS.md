# MCADD Compass — Agent Guide

## Project Overview

MCADD Compass is an evidence-based public website about **medium-chain acyl-CoA dehydrogenase deficiency (MCADD)**, built with Nuxt 3 and deployed as a static site to GitHub Pages.

**Audience:** People living with MCADD — especially teenagers, young adults, and adults — who want to understand their condition, learn to live safely with it, follow the latest research, and find reliable resources.

**Core principle:** *Easy to understand, but never simplistic.* A newly diagnosed teenager should immediately grasp the basics; an experienced patient should be able to dive deep into ACADM, MCAD, fatty-acid β-oxidation, C8, genetics, pathophysiology, and emerging therapies.

---

## Medical Safety — Hard Rules

These rules are non-negotiable. Every AI session working in this repo MUST follow them.

1. **The Knowledge Base is the single source of truth.** All medical content lives in `/home/eliot/.openclaw/workspace/mcadd_knowledge_base/`. Read the relevant KB file before writing or updating any medical claim.
2. **Never invent or alter medical claims.** No fabricated citations, PMIDs, DOIs, URLs, trial identifiers, publication dates, study names, authors, or treatments.
3. **Preserve source attribution and evidence levels exactly** as they appear in the KB.
4. **If you identify missing or questionable content, flag it** in a comment or issue — do NOT fill the gap by guessing.
5. **Never present experimental treatments as established treatments.** Always label preclinical findings as such.
6. **Never present preclinical findings as human evidence.**
7. **Include a prominent medical disclaimer** on every page (already in the layout).
8. **Show uncertainty explicitly.** Where evidence is thin, say so. Do not smooth over gaps.

### Forbidden as Evidence

Reddit, forums, blogs, commercial websites, AI-generated medical content, unsourced social media.

---

## Source Hierarchy

| Tier | Sources |
|------|---------|
| **A — Authoritative** | HAS, Orphanet, NIH, GeneReviews/NCBI Bookshelf, ACMG, metabolic disease societies, recognized guidelines, university hospitals, EURORDIS |
| **B — Scientific literature** | PubMed, peer-reviewed publications, systematic reviews, meta-analyses, clinical/cohort studies |
| **C — Trial registries** | ClinicalTrials.gov, EU CTIS, WHO ICTRP, national registries |
| **D — Other** | Used only when necessary, clearly labeled |

---

## Evidence Levels

| Level | Definition |
|-------|-----------|
| **A** | Official consensus/recommendation from authoritative guideline or institution |
| **B** | Strong scientific evidence — multiple consistent scientific sources |
| **C** | Limited evidence — small studies, observational, indirect, or significant limitations |
| **D** | Experimental/hypothesis — preclinical, mechanistic, animal, in-vitro |
| **X** | Insufficient evidence — **not suitable for patient-facing recommendations** |

---

## Claim Categories

Every medical statement carries one of these categories:

- `ESTABLISHED FACT` — Well-documented, broadly accepted
- `MEDICAL RECOMMENDATION` — From an authoritative guideline or institution
- `OBSERVATIONAL DATA` — From observational studies
- `EXPERT OPINION` — From expert consensus without strong evidence
- `SCIENTIFIC HYPOTHESIS` — Proposed but not established
- `EXPERIMENTAL DATA` — Preclinical or early experimental
- `INSUFFICIENTLY DOCUMENTED DATA` — Evidence insufficient to support the claim

---

## Traceability Requirements

Every medical paragraph in `content/*.ts` must contain:

- Organization/Author
- Title
- Journal or database
- Publication year
- PMID/DOI when applicable
- URL
- A `lastVerified` date

---

## Content Architecture

```
content/           ← Single source of truth (typed TypeScript data)
  types.ts         ← Shared types (EvidenceLevel, ClaimCategory, Block, Section, Topic)
  site.ts          ← Site-wide config (nav, metadata)
  understanding.ts ← Pathophysiology, genetics, biochemistry
  diagnosis.ts     ← Newborn screening, biomarkers, confirmatory testing
  living.ts        ← Fasting prevention, nutrition, exercise, illness
  emergency.ts     ← Warning signs, emergency action
  research.ts      ← Clinical trials, emerging therapies
  methodology.ts   ← Evidence levels, source hierarchy, conflicts
  glossary.ts      ← Plain-language definitions
  resources.ts     ← Authoritative sources, trial registries
  evidenceLegend.ts← Evidence level + claim category definitions

pages/             ← Vue renderers (do NOT hand-edit medical copy here)
  index.vue        ← Home: 30-second explainer + evidence legend
  understanding/   ← Rendered via TopicPage
  diagnosis/       ← Rendered via TopicPage
  living/          ← Rendered via TopicPage
  emergency/       ← EmergencyBanner + sections
  research/        ← TrialCard grid + TherapyCard
  methodology/     ← Source tiers, validation, conflicts
  resources/       ← ResourceCard list
  glossary/        ← GlossaryList

components/        ← Reusable UI (EvidenceBadge, SourceList, TrialCard, etc.)
layouts/           ← default.vue (header, nav, footer, disclaimer)
```

**Rule:** Medical content lives in `content/*.ts`. Pages render it. Do not duplicate medical prose in Vue files.

---

## Tech Stack

- **Nuxt 3** (TypeScript, strict mode)
- **@nuxtjs/sitemap** for `sitemap.xml`
- **Self-hosted variable fonts** (Inter + Fraunces via Fontsource)
- **Light/dark theme** with no flash-of-wrong-theme
- **JSON-LD** structured data (`WebSite`, `MedicalWebPage`, `MedicalCondition`)

### Commands

```bash
npm install          # Install deps (runs nuxt prepare via postinstall)
npm run dev          # Dev server at http://localhost:3000
npm run generate     # Static build into .output/public
npm run typecheck    # vue-tsc --noEmit
```

### Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) → `npm run generate` → GitHub Pages.

The workflow auto-detects base URL for user vs project Pages sites.

---

## Verification

There is no test suite or lint config. The only gate is:

```bash
npm run generate    # Must succeed and prerender all routes
npm run typecheck   # Must pass cleanly
```

Before committing, run both. If either fails, fix before pushing.

---

## Knowledge Base Update Procedure

When new research emerges:

1. Read the relevant KB file at `/home/eliot/.openclaw/workspace/mcadd_knowledge_base/`
2. Update the corresponding `content/*.ts` file
3. Record the change in `content/methodology.ts` (or the KB's `07_changelog.md`)
4. Verify all cross-references still hold
5. For guideline changes, verify current status with the primary source

---

## Limitations

- This system is NOT a physician or metabolic disease specialist
- This system does NOT provide individualized medical advice
- This system does NOT replace emergency services
- Knowledge may be incomplete despite best efforts
- Sources may change after their verification date
