import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const css = await readFile(new URL("styles.css", root), "utf8");
const script = await readFile(new URL("script.js", root), "utf8");

const projectNames = [
  "WILL'S LOCADORA",
  "COMEDY CLUB MANAGER",
  "WILLCUTS",
  "STARTPAGE",
  "OPEN MIC RPG",
  "WILL'S MOD",
];

test("page has a clear three-part portfolio structure", () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<main\b[^>]*id="main-content"/);
  assert.match(html, /<section class="intro"[^>]*id="top"/);
  assert.match(html, /<section class="projects"[^>]*id="projects"/);
  assert.match(html, /<section class="contact"[^>]*id="contact"/);
  assert.equal((html.match(/<section\b/g) || []).length, 3);
  assert.doesNotMatch(html, /role="tab"|<dialog\b|id="process"|id="about"/);
});

test("all six projects are visible without tabs or modal data", () => {
  for (const name of projectNames) assert.match(html, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((html.match(/class="feature-project(?: |")/g) || []).length, 3);
  assert.equal((html.match(/class="other-card"/g) || []).length, 3);
});

test("featured work exposes ownership and engineering evidence", () => {
  assert.equal((html.match(/<h4>WHAT I OWNED<\/h4>/g) || []).length, 3);
  assert.equal((html.match(/<h4>ENGINEERING PROOF<\/h4>/g) || []).length, 3);
  assert.match(html, /70 current tests/);
  assert.match(html, /131 automated test functions/);
  assert.match(html, /Cloudflare Worker/);
});

test("external blank-target links are protected", () => {
  const blankTargets = html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || [];
  assert.ok(blankTargets.length >= 12);
  for (const anchor of blankTargets) assert.match(anchor, /rel="noreferrer"/);
});

test("accessible controls and motion safeguards remain", () => {
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-pressed="false"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /@media \(max-width: 1040px\)/);
});

test("content and identity rules are preserved", () => {
  const beforeContact = html.split('<section class="contact"')[0];
  assert.doesNotMatch(beforeContact, /working stand-up comedian/i);
  assert.doesNotMatch(html, /\bLua\b|\bPython\b/);
  assert.match(html, /Supabase authentication, RLS-protected cloud data/);
  assert.match(html, /AVAILABLE FOR REMOTE WORK/);
  assert.match(html, /VIEW SELECTED WORK/);
});

test("every project image exists", async () => {
  const media = [...html.matchAll(/src="(assets\/project-[^"]+)"/g)].map((match) => match[1]);
  assert.equal(media.length, 6);
  for (const path of media) {
    const file = await readFile(new URL(path, root));
    assert.ok(file.length > 100, `${path} should not be empty`);
  }
});

test("client script stays focused on optional SFX and the year", () => {
  assert.match(script, /portfolio\.sfx/);
  assert.match(script, /aria-pressed/);
  assert.match(script, /currentYear/);
  assert.doesNotMatch(script, /projectDetails|selectMode|showModal/);
});
