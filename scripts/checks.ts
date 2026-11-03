import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const SKILL = 'skills/unslop-korean';
export const hash = (text: string | Buffer) => createHash('sha256').update(text).digest('hex');
export const read = (path: string) => readFileSync(path, 'utf8');
export const json = (path: string) => JSON.parse(read(path));
export function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path.replaceAll('\\', '/')];
  });
}
export function checkAssets(dir: string, pins: Record<string, string>): string[] {
  return Object.entries(pins).flatMap(([path, expected]) =>
    existsSync(join(dir, path)) && hash(readFileSync(join(dir, path))) === expected
      ? [] : [`Changed or missing upstream asset: ${path}`]);
}
export function checkSections(text: string, pins: Record<string, string>): string[] {
  const sections = text.match(/^## [^\n]+\n[\s\S]*?(?=^## |(?![\s\S]))/gm) ?? [];
  return Object.entries(pins).flatMap(([heading, expected]) => {
    const found = sections.filter(section => section.split('\n')[0] === heading);
    return found.length === 1 && hash(found[0]) === expected ? [] : [`Changed upstream section: ${heading}`];
  });
}
export const lineCount = (text: string) => text === '' ? 0 : text.split('\n').length - Number(text.endsWith('\n'));
export function checkLines(paths: string[]): string[] {
  return paths.filter(path => /\.(?:[cm]?[jt]sx?|html|css|sh|py)$/.test(path))
    .filter(path => lineCount(read(path)) > 200).map(path => `Over 200 physical lines: ${path}`);
}
export function checkInventory(actual: string[], allowed: string[]): string[] {
  return [...actual.filter(path => !allowed.includes(path)).map(path => `Unexpected skill file: ${path}`),
    ...allowed.filter(path => !actual.includes(path)).map(path => `Missing skill file: ${path}`)];
}
