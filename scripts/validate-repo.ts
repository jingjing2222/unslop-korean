import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { checkAssets, checkInventory, checkLines, checkSections, files, json, read, SKILL } from './checks.ts';

const pin = json('docs/upstream.json');
const errors = [
  ...checkAssets(SKILL, pin.unchanged_assets),
  ...checkAssets('.', pin.unchanged_repository_assets),
  ...checkSections(read(`${SKILL}/SKILL.md`), pin.unchanged_sections),
  ...checkInventory(files(SKILL).map(path => path.slice(SKILL.length + 1)), pin.skill_files),
];
const paths = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  { encoding: 'utf8' }).split('\0').filter(path => path && existsSync(path));
errors.push(...checkLines([...new Set(paths)].filter(path => !Object.hasOwn(pin.unchanged_assets, path.slice(SKILL.length + 1)) || !path.startsWith(`${SKILL}/`))));
for (const path of paths.filter(path => path.endsWith('.md'))) {
  for (const match of read(path).matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const link = match[1].split('#')[0];
    if (!link || /^(?:[a-z]+:|\/\/|<)/i.test(link)) continue;
    if (!existsSync(resolve(dirname(path), decodeURIComponent(link)))) errors.push(`${path}: broken link ${link}`);
  }
}
const version = json('package.json').version;
for (const path of ['plugin.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json']) {
  const manifest = json(path);
  if (manifest.name !== 'unslop-korean' || manifest.version !== version || manifest.license !== 'CC-BY-4.0 AND MIT') {
    errors.push(`${path}: inconsistent name, version or license`);
  }
}
const sources = read('docs/evidence/sources.md');
for (const path of ['rules.md', 'translationese.md']) {
  for (const match of read(`${SKILL}/references/${path}`).matchAll(/#(src-\d+)/g)) {
    if (!sources.includes(`id="${match[1]}"`)) errors.push(`${path}: unknown evidence ${match[1]}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Fork inventory, upstream preservation, evidence links, licenses and code line limits passed.');
