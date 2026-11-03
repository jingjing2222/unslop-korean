import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { ROOT, SKILL } from '../scripts/repository/context.ts';

const baseline = JSON.parse(readFileSync(join(ROOT, 'docs/upstream.json'), 'utf8')).story_equivalence;
const hash = (text: string) => createHash('sha256').update(text).digest('hex');

test('split story runtime emits the same browser program as upstream', async () => {
  const module = await import(pathToFileURL(join(SKILL, 'scripts/story/runtime.mjs')).href);
  const program = module.runtime(baseline.steps);
  assert.equal(hash(program), baseline.runtime_sha256);
  assert.doesNotThrow(() => new Function(program));
});

test('split story stage preserves upstream framing, styling and author credit', async () => {
  const module = await import(pathToFileURL(join(SKILL, 'scripts/story/stage.mjs')).href);
  assert.equal(hash(module.stage(baseline.stage_parameters)), baseline.stage_sha256);
});
