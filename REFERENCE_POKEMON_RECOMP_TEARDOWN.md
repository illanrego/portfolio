# Reference Teardown — pokemon-recomp.netlify.app

Scraped: 2026-08-14 · target for: Illan's portfolio site (blue remap)
Source: https://pokemon-recomp.netlify.app/ (FAFF0x's Gen1Recomp mod catalog, IT/EN/ES/FR/DE)

## 1. What the site is

A single-page catalog site for Gen1Recomp mods. One huge self-contained HTML
(381 KB, everything inlined: CSS ~125 KB + JS ~231 KB + markup). The whole
experience is a "retro console / cartridge game" metaphor:

- hero = game-start screen ("PRESS START")
- mod catalog = cartridge selector with MODE 01 / MODE 02 tabs
- BGM cassette player in the header (music + sound effects)
- TV power-on animation, sprite materialize portals, scanlines, pixel fonts

## 2. Stack

- Vanilla HTML/CSS/JS in a single file (Vite-built, all inlined; no runtime deps)
- Google Fonts: `Press Start 2P` (headings/UI), `Silkscreen` (subheads/badges),
  `VT323` (terminal/status text), monospace fallbacks
- Netlify hosting; no build needed at deploy time
- Favicon: inline SVG pixel-art (shape-rendering: crispEdges)

## 3. Design tokens (CSS custom properties — the core of the theme)

```css
--red:        #a6202f   /* accent (cartridge red) */
--red-dark:   #691724
--cream:      #f4e7c5   /* panel bg */
--paper:      #fffaf0   /* page bg */
--ink:        #171717   /* text + borders (near black) */
--lcd:        #afc98f   /* "screen" areas (Game Boy LCD green) */
--lcd-dark:   #425d47
--gray:       #e7e3d8
--white:      #ffffff
--shadow:     7px 7px 0 var(--ink)   /* hard offset, ZERO blur = pixel shadow */
--border:     3px solid var(--ink)   /* thick solid border */
--radius:     8px
--max:        1180px
--quest-accent: #e6c94c  /* gold, used for quest/endgame category */
```

Extra inline palette: #493d73/#735fa7 (purple bands), #450d17 (dark maroon),
#383838, #f3df54. Per-category accent colors (battle/inventory/art/etc.).

The whole look = cream + ink + one accent + hard shadows + thick borders.
Nothing else. That restraint is what makes it read "pixel".

## 4. Pixel / CRT techniques (reusable recipes)

1. **Hard shadow instead of blur**: `box-shadow: 7px 7px 0 var(--ink)` (96 uses).
2. **Thick solid border**: `border: 3px solid var(--ink)` + `border-radius: 8px`.
3. **Scanlines**: `background: repeating-linear-gradient(0deg, rgba(0,0,0,.14) 0 1px, transparent 1px 4px)` (22 gradient uses: scanlines, 45deg stripes, LCD banding).
4. **Pixelated rendering**: `image-rendering: pixelated` (13 uses) for sprites/icons.
5. **Floating icons**: absolutely-positioned pixel icons at hero corners
   (`left: 7%; top: 26%` etc.), staggered `animation-delay` (.8s / 1.5s / 2.1s),
   keyframe `hero-icon-float { 50% { transform: translateY(-10px) } }`,
   `animation: hero-icon-float 3s ease-in-out infinite`.
6. **TV power-on**: `tv-on-open` — `scale(.82,.025)` → `scale(1.015,1.02)`,
   brightness/saturation filter sweep (CRT warming up); backdrop fades to
   `rgba(23,23,23,.74)`.
7. **Blinking CTA**: `press-start-blink` (opacity toggling on "PRESS START").

## 5. Animation library (30 keyframes)

- Floating/bob: `icon-float`, `hero-title-float`, `hero-icon-float`, `party-jump`,
  `cartridge-sprite-bob`, `cartridge-jitter`
- Onboarding/portal: `tv-on-open`, `tv-backdrop-on`, `sprite-portal`,
  `sprite-particle-burst`, `sprite-materialize`, `sprite-glitch-line`,
  `sprite-exit-portal`, `rpg-screen-flash`, `catalog-panel-on`
- Blink/pulse: `press-start-blink`, `rpg-arrow-blink`, `mode-arrow-blink`,
  `hero-star-blink`, `hero-status-pulse`, `quest-emblem-pulse`, `blink`
- Cassette: `cassette-spin`, `cassette-spin-reverse`, `cassette-eq`, `mini-eq`
- Misc: `walk-across`, `party-hue`, `exp-rush`, `achievement-in`, `achievement-out`

## 6. Layout & sections (top → bottom)

1. **Header/nav**: logo, Home / MODS / FAQ links, cassette player (BGM on/off,
   volume 1–5, SFX toggle, EQ bars), language dropdown (5 langs), GITHUB link.
2. **Hero (game-start)**: "◢ MOD CATALOG ◣ · GEN1RECOMP · READY" status line,
   giant stacked title (GEN1RECOMP / MODS), tagline, **PRESS START** button
   (blinking) + "OPEN THE MODS ON GITHUB" link, 4 floating pixel icons,
   highlights row (⚙️ QoL / 🗺️ quests / 🏆 endgame / 💾 open source),
   "project information" stat block (MODS / 28+14 / VERSION 1.0 / MOD REPO).
3. **The mods intro**: 🧰 section label, H2, feature list (▶ reduce repetition…),
   stat cards (28 QoL / 14 quests / 1 repo).
4. **Catalog (MODE 01 / MODE 02 tabs)**: tablist, per-tab panel with search box
   + filter chips (All/Battle/Art/Exploration/Party/Inventory/Quest/Endgame/
   Accessibility/System) + responsive grid of mod cards.
   Card = "MOD-01" index, name, category tag, emoji tags, "Open details" button,
   "Open GitHub" link.
5. **How it works**: 3 steps — CHOOSE YOUR MODS / VISIT GITHUB / CUSTOMIZE.
6. **CTA band**: "WEBSITE AND MODS AVAILABLE ON GITHUB" + button, credit link.
7. **FAQ**: accordion (JS dialog/summary based).
8. **Footer**: logo, EXPLORE links, GITHUB links (repo, docs, base project).
9. **Back-to-top** floating button.

## 7. Interactions (JS feature scan)

- `AudioContext` x6, `BGM` x29 — WebAudio-driven cassette player (music loop,
  volume 1–5, SFX toggle, EQ animation), persisted in `localStorage` (13 uses).
- `language` x99 / `i18n` x8 — 5-language dictionary + switcher, persisted.
- `filter` x50 / `search` x40 — live mod filtering + name search.
- `modal` x35 / `dialog` x41 — mod detail modals; FAQ accordions.
- `keydown` x6 — keyboard support (Esc to close, arrows/tab nav).
- Accessibility: skip-to-content link, ARIA labels, semantic landmarks
  (banner/nav/main/contentinfo), visible focus.

## 8. Mapping to Illan's portfolio

| Reference | Portfolio equivalent |
|---|---|
| GEN1RECOMP MODS hero | ILLAN DEV / PORTFOLIO hero, tagline "products for entertainment & creators" |
| PRESS START button | CTA scrolling to projects |
| 4 floating pixel icons | floating pixel icons (web/ai/game/creator) |
| highlights row (QoL/quests/…) | disciplines: Full-stack / Front-end / AI tools / Games |
| stat block (28 mods/1.0/repo) | projects count, repos, years coding |
| MODE tabs + filter chips | categories: Web apps / AI & media tools / Games / Creator |
| Mod card grid | project cards: name, category, stack tags, "details" modal, GitHub link |
| 3 steps (how it works) | how I work: listen → build → ship |
| FAQ | FAQ (or contact) |
| Cassette player | optional ambient BGM + SFX (fits Illan's "UI sounds" taste) |
| 5-language switcher | skip (EN-only site) — or PT/EN toggle |
| Footer + back to top | same |

## 9. Blue remap (token swap, keep the same system)

```css
/* reference → blue variant */
--ink:        #171717   → #0b1220   (near-black navy — borders/text)
--paper:      #fffaf0   → #0d1f3c   (deep navy page bg)
--cream:      #f4e7c5   → #12294d   (panel blue)
--red:        #a6202f   → #2f6bff   (electric blue accent)
--red-dark:   #691724   → #1e40af   (accent shadow/alt)
--lcd:        #afc98f   → #7fd4e6   (LCD cyan "screens")
--lcd-dark:   #425d47   → #2c6b80
--gray:       #e7e3d8   → #9fb3d9
--white:      #ffffff   → #e8f1ff   (text on dark)
--quest-accent:#e6c94c  → #f2c94c   (keep gold for contrast pop)
```

Shadow/border/radius/scanline recipes stay identical — the blue palette
keeps the CRT feel while reading "tech/developer" instead of "cartridge".
Optional light alt: paper #e8f1ff bg with navy ink (flip). Dark navy +
electric blue + cyan LCD is the recommended default.

## 10. Hosting plan (ties into the current domain situation)

- Repurpose `illanrego/illanrego.github.io` (user page — currently private,
  dead old startpage content) as the portfolio: make public, orphan history
  (fresh commit, no old personal content exposed), Pages custom domain
  `sitedoillan.com.br`.
- DNS: apex A records ALREADY point to GitHub Pages IPs ✓, www CNAME already
  → illanrego.github.io ✓ → **zero DNS changes needed**; user pages serve both
  apex and www with one custom domain. This also fixes the currently-dead apex.
- Alternative if user prefers a new repo: `portfolio` public repo + cname
  sitedoillan.com.br; then www record needs re-pointing (messier).

## 11. Vision-corrected visual read

The first pass over-described the page as magenta/cyan. With actual vision, the
reference is more specific and more useful:

- **Hero mood:** deep burgundy / wine-red stage, not neon magenta. The hero feels
  like a boot screen on a cartridge/CRT, with dark red scanlines, subtle dot noise,
  and a large half-sun / striped disk behind the title.
- **Title treatment:** huge cream pixel letters with a dark red offset shadow and
  near-black backing. The title is two stacked lines; the lower line slightly
  overlaps the shadow of the upper line. This is the main logo moment.
- **Floating objects:** small square, pixel-art item tiles float at the left/right
  edges of the hero (lightning, save disk, pencil/brush, map-like icon). They are
  not decorative blobs; they look like game inventory tiles: cream tile, black
  border, hard dark shadow, tiny sprite centered.
- **Header:** sticky/top bar in a darker burgundy strip. The logo is tiny, nav is
  very small all-caps pixel text, and the right side has compact machine controls:
  cassette/BGM module, language select, and a red GitHub button. Header density is
  high, but text stays tiny so the hero keeps dominance.
- **Hero CTAs:** two side-by-side pixel buttons. Primary is outline/cream with
  a play triangle and `PRESS START`; secondary is darker and says open GitHub.
  Below them are four tiny cream status chips.
- **Stats strip:** a black horizontal bar immediately below the hero with three
  tiny green/cream status readouts. This is a strong section divider and should be
  reused for portfolio stats.
- **Background sections:** after the hero, the page alternates between large
  theatrical zones:
  - cream graph-paper grid for the intro;
  - pale gray/green dotted field for the catalog;
  - pale LCD green scanline panel for "how it works";
  - almost-black grid void before FAQ/footer;
  - cream triangle pattern for FAQ.
  This is more spacious than a normal landing page. It intentionally uses *huge*
  vertical gaps/negative space, so the page feels like moving between game rooms.
- **Intro/stat cards:** two-column layout: left text block and bullet list, right
  stack of three big cream stat cards. Cards have black border + gray hard shadow;
  numbers are red; labels are tiny black pixel caps. This maps perfectly to
  portfolio metrics/proof points.
- **Mode tabs:** two large horizontal cartridge cards. Selected tab gets a red
  checkered top strip and red outer border; inactive tab uses purple checkered
  strip and black border. Each tab has a square icon tile, tiny mode label, big
  title, short description, and a small arrow at far right.
- **Catalog panel:** big cream bordered panel with a red square index (`01`) on
  the left, tiny green label, and bold heading. This should become a portfolio
  category intro panel before project cards.
- **Footer:** deep near-black/brown with sparse cream text and simple columns,
  separated by thin lines; not flashy.

## 12. Revised blue direction for Illan

Keep the structure; remap the emotional palette:

```css
/* recommended blue variant after visual pass */
--ink:          #08111f;  /* hard borders / deepest text */
--hero-bg:      #071a33;  /* deep blue CRT stage */
--hero-bg-2:    #0b2b55;  /* subtle radial/scanline layer */
--paper:        #eaf3ff;  /* cream equivalent, slightly blue */
--panel:        #f6fbff;  /* card/panel fill */
--grid:         #c7d9f4;  /* graph paper lines */
--accent:       #2f6bff;  /* selected tab / CTA / logo shadow */
--accent-dark:  #183b8f;  /* deep offset shadow */
--lcd:          #9be7ff;  /* status chips / CRT readouts */
--lcd-dark:     #2b7f9d;
--purple-alt:   #5147a6;  /* inactive tab strip, optional */
--gold:         #f2c94c;  /* tiny contrast pop only */
--danger-red:   #c43b56;  /* reserve for warnings or comedy/live tag */
--shadow:       7px 7px 0 var(--ink);
--border:       3px solid var(--ink);
```

Do **not** turn the whole page dark-blue. The reference works because dark hero
is followed by light playable spaces. For Illan, use:

1. Deep blue boot-screen hero.
2. Light blue/cream graph-paper intro.
3. Pale desaturated blue dotted project catalog.
4. Cyan LCD/scanline "how I build" section.
5. Near-black navy footer.

This keeps the blue identity while preserving readability and recruiter-friendly
project scanning.

## 13. Portfolio page plan based on the vision pass

1. **Boot hero**
   - Tiny status line: `◢ PORTFOLIO SYSTEM ◣ · ILLANREGO · READY`
   - Giant stacked logo: `ILLAN` / `REGO` or `ILLAN.DEV`
   - Subtitle: `Full-stack developer building products for creators, games, and entertainment.`
   - CTAs: `▶ PRESS START` and `↗ GITHUB`
   - Floating tiles: React/web tile, gamepad tile, cassette/media tile, terminal/AI tile.

2. **Black status strip**
   - `PROJECTS 6+`
   - `STACK JS/TS · REACT · NODE · SUPABASE · WORKERS`
   - `REMOTE READY`

3. **Intro + proof cards**
   - Left: short about paragraph + bullets.
   - Right stat cards:
     - `6` featured projects
     - `3` shipped/public sites
     - `1` published game/mod ecosystem

4. **Project modes**
   - Big cartridge tabs:
     - `MODE 01 · WEB APPS` — Startpage, Will's Locadora, CCAPP, Guia do Comic if presentable.
     - `MODE 02 · TOOLS & GAMES` — Willcuts, Open Mic RPG, Will's Mod.
   - Optional extra filters as chips: `AI`, `Supabase`, `Cloudflare`, `Game`, `Media`, `Comedy`.

5. **Project cards**
   - Use the reference's mod cards, but with portfolio content:
     - index (`PRJ-01`)
     - project name
     - category tag
     - 1–2 line recruiter-readable value prop
     - stack chips
     - buttons: `DETAILS`, `LIVE`, `GITHUB`
   - Details open a pixel modal with problem / solution / stack / proof.

6. **How I build**
   - LCD green/blue scanline section with three cards:
     - `01 LISTEN` — understand the real workflow
     - `02 BUILD` — small, testable product slices
     - `03 SHIP` — deploy, verify, document

7. **FAQ/contact**
   - Replace the reference's long FAQ with short recruiter/client FAQ and contact links.

## 14. Build recommendations

- Single-file (or 3-file: html/css/js) vanilla — matches user's stack,
  GH Pages friendly, no build step.
- Include: skip-to-content, aria labels, keyboard-close modals, focus styles,
  reduced-motion media query (kill float/blink animations for prefers-reduced-motion).
- Keep the 30-keyframe spirit but curate: tv-on-open, hero float x4,
  press-start-blink, cassette EQ (if BGM), catalog-panel-on, achievement-in/out.
- Use big vertical stage spacing like the reference, but reduce the most extreme
  blank areas by ~30–40% so recruiters reach projects faster.
- Keep the cassette/BGM optional and muted by default. Sound is a cool signature,
  but portfolio UX must not surprise people at work.
