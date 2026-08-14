# Illan Rego Portfolio — Design Specification

## Goal

A proper developer portfolio with a distinctive blue pixel/CRT visual system. The site borrows the physical language of retro game hardware—hard borders, offset shadows, scanlines, pixel typography, terminal surfaces—but not the structure or choreography of the original visual reference.

## Information architecture

The page has only three main sections:

1. **Introduction** — identity, role, value proposition, technical focus, availability, and concise proof.
2. **Selected work** — six equally weighted project cards in one responsive grid.
3. **Contact** — remote-work intent, email, GitHub, and relevant domain knowledge.

There are no tabs, filters, catalogue modes, process explainer, separate about section, detail modal, or back-to-top overlay.

## Layout identity

- Asymmetric two-column introduction rather than a centered boot screen.
- Name and positioning on the left; a functional profile terminal on the right.
- Floating inventory tiles belong to the profile component rather than orbiting the whole viewport.
- All six projects use the same compact card component and visual weight.
- A concise proof panel remains visible on every card without opening another interface.
- Contact acts as the dark closing surface and contains the footer.

## Visual system

- Deep navy and near-black introduction/contact surfaces.
- Pale blue project surface with sparse pixel dots.
- Electric blue controls and highlights.
- Cyan terminal/status accents.
- Uniform 3–4px dark borders.
- Hard 6–10px zero-blur shadows.
- Square geometry; no glass, soft gradients, or rounded pills.
- `Press Start 2P` for major headings, `Silkscreen` for machine labels, and `VT323` for readable body copy.

## Selected work

The single project grid contains:

1. Will's Locadora
2. Comedy Club Manager
3. Willcuts
4. Startpage
5. Open Mic RPG
6. Will's Mod

Every card exposes the product's purpose, one concise engineering-proof block, and live/source links where available.

## Interaction

- Smooth anchor navigation.
- Pixel pressed states.
- Subtle step-based floating tiles.
- Optional WebAudio SFX, off by default and persisted locally.
- No interaction is required to understand a project.

## Accessibility and responsive behavior

- Semantic landmarks and one descriptive H1.
- Skip link and visible focus outlines.
- Controls maintain a 44px touch target.
- Images have descriptive alt text.
- External links use `rel="noreferrer"`.
- Reduced-motion mode removes animation and scanline overlays.
- The project grid moves from three columns to two and then one; the introduction and contact also collapse into readable single columns.
