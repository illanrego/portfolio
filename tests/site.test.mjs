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

test("all six projects use one consistent card system", () => {
  for (const name of projectNames) assert.match(html, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((html.match(/class="project-card"/g) || []).length, 6);
  assert.equal((html.match(/class="card-proof"/g) || []).length, 6);
  assert.doesNotMatch(html, /featured-work|feature-project|other-work|other-card/);
});

test("every project retains concise engineering evidence", () => {
  assert.match(html, /70 tests/);
  assert.match(html, /131 test functions/);
  assert.match(html, /Key-safe Worker/);
  assert.match(html, /Versioned saves/);
});

test("external blank-target links are protected", () => {
  const blankTargets = html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || [];
  assert.ok(blankTargets.length >= 12);
  for (const anchor of blankTargets) assert.match(anchor, /rel="noreferrer"/);
});

test("accessible navigation and motion safeguards remain", () => {
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /@media \(max-width: 1040px\)/);
});

test("hero content stays contained and reflows on phones", () => {
  assert.match(css, /\.intro-copy\s*{[^}]*min-width:\s*0/s);
  assert.match(css, /\.intro h1 em\s*{[^}]*display:\s*block/s);
  assert.match(
    css,
    /@media \(max-width: 700px\)[\s\S]*?\.intro-workbench\s*{[^}]*grid-template-columns:\s*minmax\(112px, 0\.72fr\) minmax\(0, 1fr\)/,
  );
  assert.match(css, /\.workbench-stamp\s*{[^}]*grid-column:\s*1 \/ -1/s);
});

test("content and identity rules are preserved", () => {
  const beforeContact = html.split('<section class="contact"')[0];
  assert.doesNotMatch(beforeContact, /working stand-up comedian/i);
  assert.doesNotMatch(html, /\bLua\b|\bPython\b/);
  assert.match(html, /Supabase authentication, RLS-protected cloud data/);
  assert.match(html, /HI, I’M ILLAN — BUT YOU CAN CALL ME WILL\./);
  assert.match(html, /I build useful things with <em>personality\.<\/em>/);
  assert.match(html, /SEE WHAT I’VE BUILT/);
  assert.match(html, /assets\/illan\.webp/);
});

test("every project image exists", async () => {
  const media = [...html.matchAll(/src="(assets\/project-[^"]+)"/g)].map((match) => match[1]);
  assert.equal(media.length, 6);
  for (const path of media) {
    const file = await readFile(new URL(path, root));
    assert.ok(file.length > 100, `${path} should not be empty`);
  }
});

test("client script stays focused on the current year", () => {
  assert.match(script, /currentYear/);
  assert.doesNotMatch(script, /AudioContext|localStorage|aria-pressed/);
  assert.doesNotMatch(script, /projectDetails|selectMode|showModal/);
});
