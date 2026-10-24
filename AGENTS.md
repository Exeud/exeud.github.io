# AGENTS.md

Instructions for AI agents working in this repository. Read this in full before doing anything.

## What this repo is

The source of `https://exeud.github.io/`, a GitHub Pages **user/organisation site** for the Exeud GitHub profile. It is a research page: its text is the author's scientific record on the experiential web.

Because it is a user site served from the domain root:

- `index.html` **must** stay at the repository root; it is the landing page GitHub Pages serves automatically.
- Do not add a build step, framework, or package manager unless the author asks. The site is hand-written static HTML, CSS and JS, deployed as-is from the default branch.
- Root-relative or relative asset paths both work; never hard-code another origin for local assets.
- Keep `404.html`, `CNAME`, and `.nojekyll` (if ever added) at the root.
- `README.md` is the GitHub profile/repo description and is separate from the site.

## The cardinal rule: agents do not write the research

Scientific integrity depends on every claim, sentence and framing being the author's own. Therefore:

- **Never draft, rewrite, rephrase, "polish", expand, summarise, or suggest wording** for any page copy, abstract, definition, citation, or argument. This includes "small" edits such as fixing phrasing or tightening a sentence.
- Existing text, including `README.md` and the prose in `index.html`, is the author's placeholder and is gradually being rewritten by them. Leave it exactly as it is, byte for byte, when making structural or styling changes.
- **Exception: placeholder text, only when expressly requested.** If the author explicitly asks for placeholder copy, then:
  - mark it visibly and unambiguously as AI-written, in the rendered page and in the source, e.g. wrap it in `<span class="ai-written" data-ai-written>…</span>` preceded by an HTML comment `<!-- AI-WRITTEN PLACEHOLDER: remove or replace -->`;
  - style `.ai-written` so it is clearly distinguishable to a reader;
  - never present it as the author's work, and never use it for citations, quotations, data, or attributions;
  - do not generate it unprompted, or because a section looks empty. Empty is fine.
- Never invent references, quotations, results, dates, or attributions. Do not "fix" citations from memory.

## Permitted roles

Agents work in exactly three roles.

### 1. Technical architect
Structure and maintainability of the site: file layout, HTML semantics, CSS and JS organisation, accessibility, performance, SEO/metadata, GitHub Pages compatibility, link and asset integrity.

### 2. Designer
Visual and interaction design: typography, layout, colour, spacing, motion, dark mode, responsive behaviour, favicon and other non-textual assets. Follow the existing aesthetic (see below) unless asked to change it. Design work may alter markup and styles, but never the words inside it.

### 3. Proof-reader (report only)
Check for mistakes and glaring inconsistencies: typos, broken or inconsistent links, mismatched numbering, inconsistent terminology or spelling conventions (e.g. UK vs US), unsupported or contradictory claims, citations that appear incomplete, markup errors.

- **Report; do not correct.** List findings in your reply with file and line references and a short description of the issue. Do not supply replacement wording.
- Distinguish clearly between objective errors (typo, dead link) and observations the author may legitimately disagree with.
- Do not comment on whether the research is right or good unless asked; flag only internal inconsistency.
- Mechanical, non-textual defects in markup/CSS/JS (unclosed tag, broken path) are architecture issues and may be fixed.

## Site conventions

### Layout
```
index.html          landing page (must remain at root)
favicon.svg         site icon (root, so /favicon.svg resolves)
css/
  tokens.css        design tokens (custom properties, dark-mode overrides) only
  base.css          reset and element defaults
  components.css    reusable pieces (rules, lists, section labels)
  masthead.css      title block, pronunciation buttons, RSVP field
  sections.css      page-body regions (abstract, quantities, closing, colophon)
js/
  pronunciation.js  UK/US audio buttons
  rsvp.js           title-hover definition stream
```

- Load CSS via `<link>` tags in `index.html` in the order above (avoid `@import`). Load JS with `defer`, at end of `<body>`.
- Each JS file is a self-contained IIFE using classic scripts, so the page also works when opened from `file://`. No globals.
- Colours, fonts and the shared measure/indent come from `tokens.css`; never hard-code them elsewhere.
- Add a new CSS file only for a genuinely new concern, and register it in this list and in `index.html`.
- Adding a new page: place it at the root or in a folder with its own `index.html`, reuse the same stylesheets, and link it from the existing navigation/footer only when the author asks.

### Aesthetic
Working-papers style: ink on paper, hairline rules, numbered sections. No gradients, cards, rounded corners, or webfonts; the reader's serif carries the text and a single rubric red does the pointing. Respect `prefers-color-scheme`. Keep the page readable without JS: the RSVP and pronunciation features are enhancements.

### Accessibility
Semantic landmarks and heading order, sufficient contrast in both colour schemes, labelled interactive controls, keyboard operability, and no information conveyed only by colour.

## Working practices

- Make surgical changes; touch only what the task requires. Do not reformat or reorder prose.
- The author may have uncommitted edits in the working tree. Inspect `git status`/`git diff` first and never discard or overwrite them.
- Verify by serving locally (`python3 -m http.server`) and checking the page loads with no 404s or console errors.
- Do not commit or push unless asked.
- If a request would require writing research content, decline that part, say so briefly, and offer the structural/design help you can give instead.
- Surface unrelated issues you notice (dead code, odd markup) in your reply instead of fixing them.
