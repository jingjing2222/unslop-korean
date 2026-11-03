# Development

This is a fork of unslop with Korean copy criteria. The installed skill contains
Markdown guidance and the original snapshot/story scripts. There is no native
audit application, report schema, checkpoint system or required build step.

Repository checks use Node.js 24+, pnpm and TypeScript 7.1.0-beta:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
pnpm test
pnpm validate
```

The upstream snapshot and story tools remain byte-for-byte unchanged. They use
Playwright and Chromium; story rendering additionally uses ffmpeg. Install these
in the project where you invoke the tools, as described in the README.

`upstream.json` pins the original commit, unchanged workflow/design sections,
assets, licenses and installed file inventory. Validation rejects changed upstream
content, missing resources, added skill files, broken local Markdown links,
unknown evidence anchors and inconsistent plugin metadata. Development code stays
within 200 physical lines; pinned upstream code is preserved without refactoring.

Tests exercise those checks with changed, missing and extra inputs. The synthetic
flow fixture tests its own state transitions; [behavioral evaluation](../evals/README.md)
uses the actual agent's edits and report to assess Korean judgment. Automated
checks establish preservation and reference integrity, not writing quality or
source truth. Full source evidence remains outside the skill in `docs/evidence/`.

Keep the original workflow and tools when updating the fork. Adapt only the Korean
copy criteria, related language examples/checks, identification and attribution.
Plugin manifests are installation metadata, not an additional execution layer.
