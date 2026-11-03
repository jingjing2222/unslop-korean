# Development

Plugin users install through Codex or Claude Code. Korean evidence/audit tools
are native executables. Optional upstream snapshot/story features use Node.js
and Playwright, plus ffmpeg for video. The compiler toolchain below is needed
only when changing and rebuilding the Korean native tools.

- Node.js 24 or later runs development scripts and the test harness.
- pnpm 11.17.0 manages dependencies; `pnpm-lock.yaml` pins their versions.
- [TypeScript 7.1.0-beta](https://github.com/microsoft/TypeScript) checks types.
  Version 7.1 is currently a prerelease; its exact version is pinned.
- [scriptc 0.4.0](https://github.com/vercel-labs/scriptc/releases/tag/v0.4.0)
  compiles the tools into native executables. It needs the host platform's
  linker and SDK: Xcode Command Line Tools on macOS, a C/C++ toolchain on Linux,
  or Zig 0.16.0 on Windows.

From the repository root:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
pnpm build
pnpm test
pnpm validate
```

`pnpm validate` and the regression suite enforce the 200-line limit for code
files, including scripts, tests and fixtures. They count comments, blank lines and
the final unterminated line, and include untracked files not excluded by Git.
JSON evidence, prose and native binaries are not code files for this check.
Split modules by responsibility instead of compressing statements.

Dependency installation skips lifecycle scripts. `pnpm build` explicitly prepares
the pinned scriptc compiler. The build produces the current host's
executable, its runtime license notices, and a `build.json` containing binary and
source hashes. Tests exercise that executable, including execution without Node
or Python on `PATH`.

The CI matrix builds and tests macOS ARM64/x64, Linux ARM64/x64, and Windows x64
on their respective hosts, including TypeScript checks. Cross-compilation is also
available with `pnpm build --target <platform-arch>`. Install the matching
`@scriptc/runtime-<target>@0.4.0` in a development workspace and set
`SCRIPTC_RUNTIME_PACK` to that package directory. Linux packages use a `-gnu`
suffix and Windows uses `-msvc`. Put Zig 0.16.0 on `PATH`; macOS targets also need
the Xcode SDK. The build verifies the runtime package identity and version,
records source/binary hashes and copies its license notices. A cross-build does
not execute target tests; run the suite on the target host before publishing.
Before publishing,
include all five tested bundles and
run `pnpm validate --require-all-binaries`. Artifact downloads may lose executable
permissions; restore those permissions for macOS and Linux binaries before
committing. Source hashes include the TypeScript sources and pnpm lockfile, so
changing either requires rebuilding every bundle. Build and validation share a
recursive source inventory, so newly extracted modules are included automatically.

The audit report format remains version 2; plugin and executable releases have
independent versions. A skill or evidence update can reuse the same verified
native executable. Native tool 3.1.0 enforces the documented user-perspective
companion requirement: the file is resolved relative to the report directory,
its links and declared coverage are checked, and open findings must remain in
the final audit. Authorized new copy uses a separate `additions` collection;
original inventory and diagnosis remain unchanged. Existing v2 reports need
the structured companion described in [the report contract](../skills/unslop-korean/references/audit-format.md).
`kuw prepare` validates a pre-edit report and creates a self-contained checkpoint,
working companion and decision scaffolding in a new directory. Final
`kuw audit --require-checkpoint` checks saved originals, diagnoses, baseline paths,
retained findings and per-path recheck links. Source files are not overwritten.
Review order, evidence truth, actual path equivalence and reader understanding
still require human or agent review. Passing structural validation does not
establish that work was performed.
See [behavioral evaluations](../evals/README.md) for the report
contract and skill evaluation procedure. Passing automated tests does not grade
the quality of Korean copy.

Writing criteria belong in [the evidence documentation](evidence/README.md).
Packaging changes must preserve the distinction between product facts, UX
criteria, and Korean-language criteria.

## Unslop is the base

The entrypoint retains unslop's audit, direction, nine passes, check and report.
Korean writing criteria replace its English Copy pass and related signs/checks.
`references/korean.md` maps that pass to the existing evidence catalogs. It does
not route the agent through a separate four-stage workflow or require JSON
reports, `kuw prepare`, or a final native audit during ordinary design work.

The existing native audit APIs and their optional manuals remain available for
explicit structured-report work and regression testing. They are not prerequisites
for unslop's Copy pass. `kuw evidence` is the native source-registry loader used
by that pass. The executable keeps its independent Korean UX Writing identity
and version; no report migration or binary rebuild is needed for the skill rename.

[Upstream attribution](../skills/unslop-korean/UPSTREAM.md) records the original
commit, CC BY 4.0 scope and adaptation changes. `upstream.json` pins unchanged
design passes, reference assets and full license texts. Validation checks those
bytes and package links, not whether a design or phrase is good.

The upstream snapshot and story scripts run with Node.js and Playwright; story
video rendering also requires ffmpeg. These keep the upstream runtime. The story implementation is split by responsibility to keep
each code file below 200 lines. Equivalence tests compare its generated browser
program and stage with the pinned upstream output, including the author credit.
Korean evidence and report version 2 are unchanged.

Use the integrated scenario in [behavioral evaluations](../evals/README.md) to
inspect the actual agent decisions and artifacts. Native report tests establish
only the separate reporting invariants, not the skill's semantic performance.
