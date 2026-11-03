# Unslop Korean

[한국어](README.md) · English

A Korean adaptation of [unslop](https://github.com/heydamir/unslop) that keeps its UI improvement structure and replaces the English copy-editing layer with Korean criteria. It works through spacing, color, icons, copy, type, layout, details, visuals and motion.

Korean copy review starts with the user's available information and complete task, checks meaning, then refines expression. It uses the existing published UX and Korean-language evidence; no English original is needed.

## Install

In a Codex terminal:

```sh
codex plugin marketplace add jingjing2222/unslop-korean
codex plugin add unslop-korean@unslop-korean
```

In a Claude Code conversation:

```text
/plugin marketplace add jingjing2222/unslop-korean
/plugin install unslop-korean@unslop-korean
```

Start a new conversation after installation. Distribution uses this repository's marketplace, not either product's official plugin catalog. Korean evidence and audit tools are bundled as native executables.

## Use

For design and Korean copy together:

```text
Use unslop-korean to polish this dashboard.
Keep its features and content, and review Korean copy across the surrounding user journey.
```

For copy alone:

```text
Use unslop-korean to review and polish only the Korean copy in the signup flow.
```

The skill audits the screen, sets a product-specific direction, then applies nine passes. Screens that already work receive only necessary changes. Copy-only requests do not change the visual design.

## Korean copy review

Review the user's goal, earlier guidance, current choice and later result. Assess meaning at each usage site and record **change, keep or hold**, with reasons. Save the diagnosis before editing, then check the same paths again.

Only existing Korean is polished. Other languages and foreign-language spans in mixed text are preserved. Translation, editing other languages and new content require separate requests. Greetings, exclamation marks and periods are not blanket violations, and no single tone is imposed on every sentence.

When prerequisite information is missing, identify where it first needs to appear. Retain unresolved flow problems and unverified screens in the result even after copy edits are finished. Distinguish agent review from observed participant testing.

In the [evidence documentation](docs/evidence/README.md), UX sources support what to communicate and when; Korean sources support expression. Product code establishes actual behavior. Unslop's design suggestions are not Korean writing authorities.

Screen snapshots and before/after videos use the original unslop Node.js and Playwright scripts. Install these dependencies in the project where you use them. Video rendering also needs ffmpeg on PATH.

```sh
pnpm add -D playwright
pnpm exec playwright install chromium
```

[Skill instructions](skills/unslop-korean/SKILL.md) · [Supported platforms](skills/unslop-korean/references/runtime.md) · [Development](docs/development.md)

Original design examples are in [examples](examples). Their English copy remains unchanged; they are visual design examples.

## Attribution and licenses

Original unslop was created by [Damir Sokolovsky](https://x.com/heydamir). Its design guidance, reference images, snapshot/story scripts, examples and adaptations retain [CC BY 4.0](skills/unslop-korean/LICENSE-CC-BY-4.0). Redistribution must retain author credit, the source link, license and change notice. See [attribution and changes](skills/unslop-korean/UPSTREAM.md) for scope.

This project's existing Korean guidance and original code remain under [MIT](skills/unslop-korean/LICENSE-MIT). External evidence documents retain their own terms. Runtime licenses are in `licenses/` beside each executable.
