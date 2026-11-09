#!/usr/bin/env node
// Fetches the canonical SPEC.md from Brand-Context-Protocol/spec and writes:
//   src/pages/spec/v{version}.md   — versioned spec page
//
// Usage:
//   node scripts/sync-spec.mjs                     # fetch from GitHub (dev/CI builds)
//   node scripts/sync-spec.mjs --source <path>     # read from local file (GitHub Action)
//
// Published, non-draft version pages are immutable. A same-version editorial
// correction is written only when scripts/same-version-corrections.json
// allowlists that exact SPEC.md sha256 for that version. Default syncs still
// refuse every other overwrite.
//
// On fetch failure the script exits 0 so offline builds still work from committed files.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, realpathSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SPEC_URL = 'https://raw.githubusercontent.com/Brand-Context-Protocol/spec/main/SPEC.md';
const ALLOWLIST_PATH = join(ROOT, 'scripts/same-version-corrections.json');

export function specDigest(spec) {
  return createHash('sha256').update(spec, 'utf8').digest('hex');
}

export function isAllowlistedCorrection(allowlist, version, digest) {
  if (!allowlist || !Array.isArray(allowlist.corrections)) return false;
  return allowlist.corrections.some((entry) =>
    !!entry && entry.version === version && entry.specSha256 === digest
  );
}

// create: page does not exist yet
// unchanged: committed page already matches
// update-draft: draft versions may be rewritten
// update-correction: exact SPEC.md digest is allowlisted for this version
// refuse: published page would change without that allowlist entry
export function publicationDecision({ exists, sameContent, status, allowlisted }) {
  if (!exists) return 'create';
  if (sameContent) return 'unchanged';
  if (status === 'draft') return 'update-draft';
  if (allowlisted) return 'update-correction';
  return 'refuse';
}

function loadAllowlist() {
  if (!existsSync(ALLOWLIST_PATH)) return { corrections: [] };
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8'));
  } catch (error) {
    const err = new Error(`scripts/same-version-corrections.json is not valid JSON (${error.message})`);
    err.fatal = true;
    throw err;
  }
  if (!parsed || !Array.isArray(parsed.corrections)) {
    const err = new Error('scripts/same-version-corrections.json must contain a corrections array');
    err.fatal = true;
    throw err;
  }
  return parsed;
}

async function getSpec() {
  const flag = process.argv.indexOf('--source');
  if (flag !== -1) {
    return readFileSync(process.argv[flag + 1], 'utf8');
  }
  const specUrl = new URL(SPEC_URL);
  specUrl.searchParams.set(
    'build',
    process.env.CF_PAGES_COMMIT_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA ?? String(Date.now()),
  );
  const res = await fetch(specUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching SPEC.md`);
  return res.text();
}

function renderSpecPage(version, spec) {
  return (
    `---\nlayout: ../../layouts/Layout.astro\ntitle: BCP v${version} Specification\ndescription: Normative specification for Brand Context Protocol v${version}\n---\n\n` +
    `<a href="https://github.com/Brand-Context-Protocol/spec/issues/new" style="display:block; margin-bottom: 40px; font-family:var(--mono); font-size: 13px;">✎ Propose a change</a>\n\n` +
    spec.replace(/\]\(spec\/migrations\/([^)]+)\.md\)/g, '](/spec/migrations/$1/)')
  );
}

function fatal(message) {
  const err = new Error(message);
  err.fatal = true;
  throw err;
}

async function main() {
  const spec = await getSpec();

  const versionMatch = spec.match(/\*\*Version:\*\*\s+(\d+\.\d+(?:\.\d+)?)(?=\s|$)/);
  if (!versionMatch) throw new Error('Could not parse version from SPEC.md');
  const version = versionMatch[1];
  const statusMatch = spec.match(/\*\*Status:\*\*\s+([^\n]+)/);
  const status = statusMatch?.[1]?.trim().toLowerCase() ?? '';

  mkdirSync(join(ROOT, 'src/pages/spec'), { recursive: true });

  const specPage = renderSpecPage(version, spec);
  const versionedPath = join(ROOT, `src/pages/spec/v${version}.md`);
  const exists = existsSync(versionedPath);
  const existing = exists ? readFileSync(versionedPath, 'utf8') : '';
  const sameContent = exists && existing === specPage;
  const digest = specDigest(spec);
  const allowlisted = sameContent || status === 'draft'
    ? false
    : isAllowlistedCorrection(loadAllowlist(), version, digest);
  const decision = publicationDecision({
    exists,
    sameContent,
    status,
    allowlisted,
  });

  if (decision === 'refuse') {
    fatal(
      `refusing to overwrite src/pages/spec/v${version}.md — published version pages are immutable ` +
      `(they're cited externally, e.g. in IANA well-known URI registration). ` +
      `SPEC.md sha256 ${digest} is not an allowlisted same-version correction for v${version}. ` +
      `To publish an approved editorial correction, add that exact digest to ` +
      `scripts/same-version-corrections.json. Otherwise, bump the Version field in SPEC.md.`
    );
  }

  if (decision === 'unchanged') {
    console.log(`[sync-spec] src/pages/spec/v${version}.md unchanged, skipping write`);
  } else {
    writeFileSync(versionedPath, specPage);
    if (decision === 'create') {
      console.log(`[sync-spec] wrote src/pages/spec/v${version}.md`);
    } else if (decision === 'update-draft') {
      console.log(`[sync-spec] updated draft src/pages/spec/v${version}.md`);
    } else {
      console.log(`[sync-spec] applied allowlisted same-version correction to src/pages/spec/v${version}.md (${digest})`);
    }
  }

  // A website PR can land alongside a newer spec PR before GitHub's main branch
  // reflects that version. Never let a build-time fetch move /spec backwards.
  const publishedVersions = readdirSync(join(ROOT, 'src/pages/spec'))
    .map((name) => name.match(/^v(\d+)\.(\d+)(?:\.(\d+))?\.md$/))
    .filter(Boolean)
    .map((match) => ({ version: match[0].slice(1, -3), major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3] ?? 0) }))
    .sort((a, b) => b.major - a.major || b.minor - a.minor || b.patch - a.patch);
  const latestVersion = publishedVersions[0]?.version ?? version;

  console.log(`[sync-spec] current version v${latestVersion}`);
}

function invokedDirectly() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return import.meta.url === pathToFileURL(realpathSync(entry)).href;
  } catch {
    return false;
  }
}

if (invokedDirectly()) {
  main().catch(err => {
    if (err.fatal) {
      console.error('[sync-spec] FATAL:', err.message);
      process.exit(1);
    }
    console.error('[sync-spec] warning: could not sync spec —', err.message);
    console.error('[sync-spec] using committed spec files as fallback');
    process.exit(0);
  });
}
