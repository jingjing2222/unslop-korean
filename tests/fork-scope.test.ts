import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);

test('installed scripts contain only the upstream screenshot and story tools', () => {
  const files = walk('skills/unslop-korean/scripts').map(file => file.split('/scripts/')[1]);
  const allowed = ['snapshot.mjs', 'story.mjs'];
  assert.deepEqual(files.sort(), allowed.sort());
});

test('legacy audit application and report protocol are absent', () => {
  for (const path of ['src', 'scripts/build-native.ts', 'skills/unslop-korean/sources.lock.json',
    'skills/unslop-korean/references/audit-format.md', 'skills/unslop-korean/references/workflow.md']) {
    assert.equal(existsSync(path), false, path);
  }
});
