import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SKILL, readJson, object, sha256, type Check } from './context.ts';

/** Verify retained design content, not the correctness of its recommendations. */
export function checkDesignPasses(entry: string, hashes: Record<string, unknown>): string[] {
  const errors: string[] = [];
  for (const [number, expected] of Object.entries(hashes)) {
    if (!/^[1-9]$/.test(number) || typeof expected !== 'string' || !/^[a-f0-9]{64}$/.test(expected)) {
      errors.push(`Invalid upstream design digest: ${number}`);
      continue;
    }
    // Match through the next heading or end of file, including blank lines.
    const blocks = entry.match(/^## [^\n]+\n[\s\S]*?(?=^## |(?![\s\S]))/gm) ?? [];
    const matching = blocks.filter(block => block.startsWith(`## ${number}. `));
    if (matching.length !== 1 || sha256(Buffer.from(matching[0])) !== expected) {
      errors.push(`Design pass ${number} differs from the pinned upstream snapshot`);
    }
  }
  return errors;
}

export function checkPinnedAssets(directory: string, hashes: Record<string, unknown>): string[] {
  return Object.entries(hashes).flatMap(([name, digest]) => {
    const path = join(directory, name);
    return existsSync(path) && sha256(readFileSync(path)) === digest ? []
      : [`Installed source asset or license differs from its pinned original: ${name}`];
  });
}

export function validateUpstream(check: Check): void {
  const upstream = readJson(join(ROOT, 'docs/upstream.json'));
  check(upstream.repository === 'https://github.com/heydamir/unslop', 'Unexpected upstream repository');
  check(typeof upstream.commit === 'string' && /^[a-f0-9]{40}$/.test(upstream.commit), 'Upstream must pin a commit');
  check(upstream.license === 'CC-BY-4.0', 'Preserve the upstream license');
  const hashes = object(upstream.unchanged_design_passes, 'unchanged_design_passes');
  check(Object.keys(hashes).sort().join(',') === '1,2,3,6,7,8,9', 'Missing unchanged design pass provenance');
  for (const error of checkDesignPasses(readFileSync(join(SKILL, 'SKILL.md'), 'utf8'), hashes)) check(false, error);
  for (const name of ['plugin.json', '.codex-plugin/plugin.json', '.claude-plugin/plugin.json']) {
    check(readJson(join(ROOT, name)).license === 'CC-BY-4.0 AND MIT', `${name}: preserve both license scopes`);
  }
  const assets = object(upstream.unchanged_assets, 'unchanged_assets');
  for (const required of ['LICENSE-MIT', 'LICENSE-CC-BY-4.0', 'UPSTREAM.cff']) {
    check(required in assets, `Missing license or attribution provenance: ${required}`);
  }
  for (const error of checkPinnedAssets(SKILL, assets)) check(false, error);
  const repositoryAssets = object(upstream.unchanged_repository_assets, 'unchanged_repository_assets');
  for (const error of checkPinnedAssets(ROOT, repositoryAssets)) check(false, error);
}
