// Adapted from unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.
// Split into modules; see ../../UPSTREAM.md for source and changes.
import { createRequire } from 'node:module';
import { join } from 'node:path';

export async function browserKit() {
  for (const name of ["playwright", "playwright-core"]) {
    try {
      return await import(name);
    } catch {}
    try {
      return createRequire(join(process.cwd(), "package.json"))(name);
    } catch {}
  }
  console.error("Playwright is not installed. In your project, run `npm install -D playwright` followed by `npx playwright install chromium`.");
  process.exit(1);
}
