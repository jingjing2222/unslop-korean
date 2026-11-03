import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkAssets, checkInventory, checkLines, checkSections, files, json, lineCount, read, SKILL } from '../scripts/checks.ts';

const pin = json('docs/upstream.json');
const entry = read(`${SKILL}/SKILL.md`);
test('non-copy workflow and design sections match upstream', () => {
  assert.deepEqual(checkSections(entry, pin.unchanged_sections), []);
});
test('changed workflow, deleted design section and duplicate section are detected', () => {
  const run = entry.match(/^## Run it\n[\s\S]*?(?=^## )/m)![0];
  for (const changed of [entry.replace(run, ''), entry.replace(run, run + 'Additional workflow\n\n'), entry + run]) {
    assert.ok(checkSections(changed, pin.unchanged_sections).length > 0);
  }
});
test('Korean copy changes do not change the upstream design contract', () => {
  assert.deepEqual(checkSections(entry.replace(/^## 4\. [\s\S]*?(?=^## )/m,
    '## 4. Korean copy\n\nDifferent Korean criteria.\n\n'), pin.unchanged_sections), []);
});
test('source assets and license texts match the pinned originals', () => {
  assert.deepEqual(checkAssets(SKILL, pin.unchanged_assets), []);
  assert.deepEqual(checkAssets('.', pin.unchanged_repository_assets), []);
});
test('skill packaging rejects both missing resources and additional legacy binaries', () => {
  const paths = files(SKILL).map(path => path.slice(SKILL.length + 1));
  assert.deepEqual(checkInventory(paths, pin.skill_files), []);
  assert.equal(checkInventory([...paths, 'scripts/bin/kuw'], pin.skill_files).length, 1);
  assert.equal(checkInventory(paths.slice(1), pin.skill_files).length, 1);
});
test('physical lines include blanks and an unterminated final line', () => {
  assert.equal(lineCount(''), 0);
  assert.equal(lineCount('a\n\nb'), 3);
  assert.equal(lineCount('a\n\nb\n'), 3);
  assert.deepEqual(checkLines(files('scripts')), []);
});
