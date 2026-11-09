import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { isAllowlistedCorrection, publicationDecision, specDigest } from './sync-spec.mjs';

const approvedDigest = 'bfa5aacd40776dfae46100b13b05e3f1eb224b1df765c5e34df6b0ca7585e2bc';

test('specDigest is the sha256 of the SPEC.md utf8 text', () => {
  assert.equal(specDigest('version line\n'), '6c43a74d85f43380a785a8d9e65d7f6ab3a3340bfd8a43bb970ee4dd04749f1f');
  assert.notEqual(specDigest('a'), specDigest('b'));
});

test('the committed allowlist names only the approved 2.0.0 document', () => {
  const allowlist = JSON.parse(readFileSync(new URL('./same-version-corrections.json', import.meta.url), 'utf8'));
  assert.deepEqual(
    allowlist.corrections.map((entry) => ({ version: entry.version, specSha256: entry.specSha256, specCommit: entry.specCommit })),
    [{
      version: '2.0.0',
      specSha256: approvedDigest,
      specCommit: '919f48ebfd3224e1c9f726f3256676e55198f17c',
    }],
  );
  assert.equal(isAllowlistedCorrection(allowlist, '2.0.0', approvedDigest), true);
  assert.equal(isAllowlistedCorrection(allowlist, '2.0.0', 'a'.repeat(64)), false);
  assert.equal(isAllowlistedCorrection(allowlist, '1.1.1', approvedDigest), false);
  assert.equal(isAllowlistedCorrection({ corrections: [] }, '2.0.0', approvedDigest), false);
});

test('published pages stay immutable unless the exact document is allowlisted', () => {
  assert.equal(publicationDecision({ exists: true, sameContent: true, status: 'current', allowlisted: false }), 'unchanged');
  assert.equal(publicationDecision({ exists: true, sameContent: false, status: 'current', allowlisted: false }), 'refuse');
  assert.equal(publicationDecision({ exists: true, sameContent: false, status: 'current', allowlisted: true }), 'update-correction');
  assert.equal(publicationDecision({ exists: true, sameContent: false, status: 'draft', allowlisted: false }), 'update-draft');
  assert.equal(publicationDecision({ exists: false, sameContent: false, status: 'current', allowlisted: false }), 'create');
  assert.equal(publicationDecision({ exists: true, sameContent: false, status: '', allowlisted: false }), 'refuse');
});
