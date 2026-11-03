# Unslop Korean

[한국어](README.md) · English

A fork of [unslop](https://github.com/heydamir/unslop) by [Damir Sokolovsky](https://x.com/heydamir), replacing its English copy criteria with Korean criteria. It retains the original screen audit, direction, nine design passes, screenshot tool and story video tool.

![An example of unslop improving a screen](skills/unslop-korean/references/refs/story-dashboard-frames.webp)

## Install

For Claude Code, copy the skill folder. For a single project, use `.claude/skills/` instead of `~/.claude/skills/`.

```sh
git clone https://github.com/jingjing2222/unslop-korean
mkdir -p ~/.claude/skills
cp -r unslop-korean/skills/unslop-korean ~/.claude/skills/
```

For Codex, make this request or copy the same folder into `~/.agents/skills/`.

```text
$skill-installer install https://github.com/jingjing2222/unslop-korean/tree/main/skills/unslop-korean
```

Existing Codex and Claude Code plugin installation metadata is also included. This fork is not listed in either official plugin directory.

Live-site capture and story videos use the original Node.js and Playwright tools. Install these in the project where you run them. Video also requires ffmpeg on PATH.

```sh
pnpm add -D playwright
pnpm exec playwright install chromium
```

## Use

Use `/unslop-korean` in Claude Code or `$unslop-korean` in Codex.

```text
/unslop-korean polish this dashboard
/unslop-korean polish this landing page and make the story video
```

The skill audits the screen, sets a direction from the product, then improves spacing, color, icons, copy, type, layout, details, visuals and motion in order. A well-designed screen receives only the refinements it needs.

Korean copy is judged against the user's task, surrounding journey and verified behavior. The existing [UX and Korean evidence](docs/evidence/README.md) supplies scoped criteria and exceptions; English word bans and punctuation rules are not translated into universal Korean rules. Other languages and foreign-language spans in mixed copy are preserved. A Korean-copy-only request does not change the design.

[Skill instructions](skills/unslop-korean/SKILL.md) · [Original examples](examples) · [Development and validation](docs/development.md)

## Attribution and license

The original unslop was created by Damir Sokolovsky. Original and derived design guidance, images, scripts and examples retain [CC BY 4.0](skills/unslop-korean/LICENSE-CC-BY-4.0). Independently authored Korean criteria and validation code use [MIT](skills/unslop-korean/LICENSE-MIT). External evidence publications retain their respective terms. See [attribution and changes](skills/unslop-korean/UPSTREAM.md).
