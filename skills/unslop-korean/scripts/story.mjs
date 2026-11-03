// Adapted from unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.
// Module split only; see ../UPSTREAM.md.
import { stage as buildStage } from './story/stage.mjs';
import { runtime as buildRuntime } from './story/runtime.mjs';
import { browserKit } from './story/browser-kit.mjs';
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, extname, join, normalize, resolve } from "node:path";

const usage = "usage: node story.mjs <story.html> <out.mp4> [--wide], or node story.mjs <story.html> --play to watch it live in a browser window";
const args = process.argv.slice(2);
const [input, out] = args.filter((arg) => !arg.startsWith("--"));
const wide = args.includes("--wide");
const play = args.includes("--play");
if (!input || (!out && !play)) {
  console.error(usage);
  process.exit(1);
}


try {
  execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
} catch {
  console.error("ffmpeg is not installed. Install it to render the video, for example `brew install ffmpeg`.");
  process.exit(1);
}

const file = resolve(input);
const root = dirname(file);
const html = readFileSync(file, "utf8");
const meta = (name) => new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, "i").exec(html)?.[1];
const steps = (meta("unslop-steps") ?? "")
  .split(",")
  .map((step) => step.trim())
  .filter(Boolean);
if (steps.length === 0) {
  console.error('story.html needs <meta name="unslop-steps" content="Spacing, Color, Type"> listing the steps in order');
  process.exit(1);
}
const [frameX = 0, frameY = 0, frameWidth = 960] = (meta("unslop-frame") ?? "0 0 960").split(/\s+/).map(Number);
const kindOf = (text) => (/spac/i.test(text) ? "spacing" : /detail|radius|corner/i.test(text) ? "details" : null);

const FRAME = wide ? { width: 1920, height: 1080 } : { width: 1080, height: 1080 };
const PAGE_WIDTH = 1440;
const MARGIN = 72;
const VIEW = 0.75;
const scale = (FRAME.width - MARGIN) / frameWidth;
const offsetX = MARGIN / scale - frameX;
const offsetY = MARGIN / scale - frameY;
const padLeft = Math.max(0, offsetX);
const padTop = Math.max(0, offsetY);
const left = Math.min(0, offsetX) * scale;
const top = Math.min(0, offsetY) * scale;
const pageWidth = Math.max(PAGE_WIDTH + padLeft, Math.ceil((FRAME.width - left) / scale) + 2);
const padRight = pageWidth - PAGE_WIDTH - padLeft;
const pageHeight = Math.max(900 + padTop, Math.ceil((FRAME.height - top) / scale) + 2);



const stage = buildStage({ FRAME, play, VIEW, left, top, pageWidth, pageHeight, scale, file, root });
const runtime = buildRuntime(steps);

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff", ".mp4": "video/mp4" };
const server = createServer((request, response) => {
  const path = decodeURIComponent(new URL(request.url, "http://local").pathname);
  if (path === "/__stage.html") {
    response.writeHead(200, { "content-type": "text/html" });
    return response.end(stage);
  }
  const target = normalize(join(root, path.replace(/^\/__story\//, "/")));
  if (!target.startsWith(root) || !existsSync(target)) {
    response.writeHead(404);
    return response.end();
  }
  response.writeHead(200, { "content-type": types[extname(target).toLowerCase()] ?? "application/octet-stream" });
  response.end(readFileSync(target));
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const base = `http://127.0.0.1:${server.address().port}`;

const FPS = 60;
const LENGTH = 10;
const frames = join(root, ".story-frames");
if (!play) {
  rmSync(frames, { recursive: true, force: true });
  mkdirSync(frames, { recursive: true });
}

const chrome = [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((path) => path && existsSync(path));
const { chromium } = await browserKit();
const browser = await chromium.launch({ ...(chrome ? { executablePath: chrome } : {}), headless: !play });
const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));
let total = 0;
try {
  const page = await browser.newPage(play ? { viewport: { width: Math.round(FRAME.width * VIEW), height: Math.round(FRAME.height * VIEW) } } : { viewport: FRAME, deviceScaleFactor: 2 });
  await page.goto(`${base}/__stage.html`, { waitUntil: "networkidle" });
  const frame = page.frames().find((item) => item !== page.mainFrame());
  await frame.waitForLoadState("networkidle");
  await frame.evaluate(async () => {
    const families = new Set();
    for (const sheet of document.styleSheets) {
      let rules = [];
      try {
        rules = [...sheet.cssRules];
      } catch {}
      const walk = (list) => list.forEach((rule) => {
        if (rule.cssRules) walk([...rule.cssRules]);
        const value = rule.style && rule.style.fontFamily;
        if (value) value.split(",").forEach((name) => families.add(name.trim().replace(/^["']|["']$/g, "")));
      });
      walk(rules);
    }
    await Promise.all([...families].flatMap((family) => [400, 500, 600, 700, 800].map((weight) => document.fonts.load(`${weight} 16px "${family}"`).catch(() => null))));
    await document.fonts.ready;
  });
  await frame.addStyleTag({ content: `html { padding: ${padTop}px ${padRight}px 0 ${padLeft}px !important; }` });
  await frame.addScriptTag({ content: runtime });
  await frame.evaluate(() => window.__story.install());
  await page.waitForTimeout(300);

  const slop = await frame.evaluate(() => document.querySelectorAll("[data-slop]").length);
  const call = (name, value) => () => frame.evaluate(([name, value]) => window.__story[name](value), [name, value]);
  const plan = [];
  const at = (time, run) => plan.push({ time, run });
  let cursor = 0.5;
  if (slop) {
    at(cursor, call("show", "audit"));
    at(cursor + 0.9, call("clear"));
    cursor += 1.1;
  }
  const blocks = steps.map((name) => (kindOf(name) ? 1.75 : 1.25));
  const fit = Math.min(1, (LENGTH - cursor - 1.6) / blocks.reduce((sum, block) => sum + block, 0));
  steps.forEach((name, index) => {
    const kind = kindOf(name);
    if (kind) {
      at(cursor, call("show", kind));
      at(cursor + 0.35 * fit, call("step", index + 1));
      at(cursor + 1.35 * fit, call("settle"));
      at(cursor + 1.7 * fit, call("clear"));
    } else {
      at(cursor, call("step", index + 1));
    }
    cursor += blocks[index] * fit;
  });
  total = cursor + 1.6;
  plan.sort((a, b) => a.time - b.time);

  if (play) {
    console.log("playing in the browser window, close it to stop");
    while (browser.isConnected()) {
      await frame.evaluate(() => window.__story.reset());
      await sleep(400);
      const begin = Date.now();
      for (const { time, run } of plan) {
        await sleep(begin + time * 1000 - Date.now());
        await run();
      }
      await sleep(begin + total * 1000 - Date.now());
    }
  } else {
    let next = 0;
    for (let index = 0; index <= Math.round(total * FPS); index++) {
      const now = index / FPS;
      while (next < plan.length && plan[next].time <= now + 1e-6) await plan[next++].run();
      await frame.evaluate((ms) => window.__story.tick(ms), now * 1000);
      await page.screenshot({ path: join(frames, `f-${String(index).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
    }
  }
} catch (error) {
  if (!play) throw error;
} finally {
  await browser.close().catch(() => {});
  server.close();
}
if (play) process.exit(0);

execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", join(frames, "f-%05d.jpg"), "-vf", `scale=${FRAME.width * 2}:${FRAME.height * 2}:flags=lanczos`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow", "-movflags", "+faststart", resolve(out)]);
rmSync(frames, { recursive: true, force: true });
console.log(`saved ${resolve(out)}, ${steps.length} steps, ${total.toFixed(1)}s`);
