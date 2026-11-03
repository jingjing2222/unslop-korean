# Korean copy criteria

Apply these within unslop's Copy pass. The screen audit, direction, nine passes,
check and report remain the workflow. No separate four-stage run or mandatory
audit report is required.

## Read the context, then the relevant sources

Read the affected funnel before editing: what the user is trying to do, the
information actually available on each entry path, current choices, later results,
failure and recovery. Record pre-action expectations separately from verified
results. If implementation was already known, disclose it rather than inventing
an independent first impression. State task assumptions when no user research exists.

Inspect every usage of a shared string. If one key serves distinct tasks, separate
the meanings before diagnosis. Record the current Korean reading against the
intended meaning; grammar alone does not establish a good fit. A short label or
specialist term can already be appropriate in its actual context.

The [rule catalog](rules.json) and [diagnostic catalog](translationese.json) retain
the existing Korean evidence, scope and exceptions. Fetch the pinned source
registry with the bundled native executable:

```sh
<skill-directory>/scripts/kuw evidence --out <working-directory>/sources.json
```

This verifies the registry hash. It does not verify source truth or copy quality.
Read the relevant source's `locator`, `claim`, `scope`, `limitations` and
`verification` before applying its rule. Unavailable or inapplicable evidence
means holding that judgment. Do not turn partial sources into verified rules.
Source copies remain outside the installed skill. Runtime details are in
[runtime.md](runtime.md).

| Question | Existing criteria |
|---|---|
| What should this action, input, error or result communicate? | UX-01–07 |
| Are names consistent, information sufficient, and tone appropriate to the audience? | UX-08–10 |
| What does this user know on this path, and when is missing context first needed? | UX-11–13 |
| Do the Korean words express the intended action, object and relationship? | LT-05, KO-07–08 |
| Are there context-supported signs of awkward constructions or interference? | LT-01–04; inspect exceptions, never infer translation origin |
| Can repetition or difficult expression be improved without losing meaning? | KO-01–02, KO-06 |
| Are spelling, spacing, honorifics and button forms appropriate here? | KO-03–05 |

UX sources establish what to communicate; Korean sources establish expression.
Product code establishes behavior. Unslop supplies the design process, not Korean
writing authority. Do not force one brand's tone or an author's preference on
every product, and do not translate English word bans into Korean ones.

## Keep the result accountable

For each Korean string, retain its original, usage, change/keep/hold decision,
result and contextual reason with the applicable evidence. These can live in the
normal unslop audit and final report; there is no required JSON schema. Preserve
foreign-language spans, variables, conditions, amounts and technical identifiers.
An English-only screen does not need invented Korean rows.

Resolve meaning first, then refine expression. Do not treat a friendlier ending
as a fix for the wrong action or missing prerequisite information. Identify where
missing context first belongs and keep unapplied flow suggestions unresolved.
Recheck the same user task and actual diff, including retained text and all usage
sites. State which screens or behaviors were not verified. Reader understanding
and naturalness still require editorial judgment.
