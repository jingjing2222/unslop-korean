import assert from 'node:assert/strict';
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT, SKILL } from '../scripts/repository/context.ts';
import { checkDesignPasses, checkPinnedAssets } from '../scripts/repository/upstream.ts';

const original = readFileSync(join(SKILL, 'SKILL.md'), 'utf8');
const provenance = JSON.parse(readFileSync(join(ROOT, 'docs/upstream.json'), 'utf8'));

test('non-copy design passes retain the pinned upstream content', () => {
  assert.deepEqual(checkDesignPasses(original, provenance.unchanged_design_passes), []);
});

test('upstream check detects a changed or missing design pass', () => {
  const section = /^## 2\. [\s\S]*?(?=^## )/m.exec(original)![0];
  assert.equal(checkDesignPasses(original.replace(section, ''), provenance.unchanged_design_passes).length, 1);
  assert.equal(checkDesignPasses(original.replace(section, section + 'Extra rule\n\n'),
    provenance.unchanged_design_passes).length, 1);
});

test('Korean copy can evolve without pretending an upstream design pass changed', () => {
  const revised = original.replace(/^## 4\. [\s\S]*?(?=^## )/m,
    '## 4. Korean copy\n\nA different Korean copy guide.\n\n');
  assert.deepEqual(checkDesignPasses(revised, provenance.unchanged_design_passes), []);
});

test('bundled license texts, citation and unchanged visual assets match their sources', () => {
  assert.deepEqual(checkPinnedAssets(SKILL, provenance.unchanged_assets), []);
});

test('missing and truncated license text fail, while a complete original passes', t => {
  const directory = mkdtempSync(join(tmpdir(), 'unslop-license-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const name = 'LICENSE-CC-BY-4.0';
  const hashes = { [name]: provenance.unchanged_assets[name] };
  assert.equal(checkPinnedAssets(directory, hashes).length, 1);
  copyFileSync(join(SKILL, name), join(directory, name));
  assert.deepEqual(checkPinnedAssets(directory, hashes), []);
  writeFileSync(join(directory, name), readFileSync(join(SKILL, name), 'utf8').slice(0, 200));
  assert.equal(checkPinnedAssets(directory, hashes).length, 1);
});
