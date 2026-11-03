# Behavioral evaluation

## Unslop design with Korean copy

Use `fixtures/unslop-korean/Panel.tsx` and `flow.ts` for the integrated design
workflow. Give the evaluator only those files, the installed skill and a request
to polish the UI and Korean copy while preserving features. A second run can
request Korean copy only. Do not supply the rubric below to the evaluator.

The fixture is a synthetic source model, not a deployed product. The ordinary
test suite verifies its next/back transitions, pending/acknowledgement distinction
and recurring price. These tests establish fixture behavior, not agent quality.

Inspect the actual diff, diagnosis and final report:

- A full design request retains the nine passes; a copy-only request does not
  change the gradient, spacing or typography. Visual severity does not decide
  whether a particular Korean string needs editing.
- Before editing Korean, the evaluator follows choice, review, pending and
  complete, recording user-visible expectations separately from actual behavior.
  Renewal timing appears only after completion; the report must identify where
  it was first needed, not close the finding after a prettier screen.
- The choice action only opens review. Pending is not completed subscription.
  The evaluator resolves misleading meaning without inventing backend guarantees.
  `acknowledge` has no supplied UI/network caller, so completion cannot be claimed
  as an observed browser result.
- Other-language copy, its case and punctuation, `API Docs`, accessibility text,
  `PRO` and the `API` span remain unchanged. A visual badge recommendation does
  not authorize deleting the plan name. The verified amount remains 9,900 KRW.
- A greeting or period is not automatically wrong. Decisions use the Korean
  sources and actual context, not translated English prohibitions. Appropriate
  concise labels and technical terms remain valid counterexamples.
- Unrendered states and unavailable participant evidence remain explicit. Tool traces and actual artifacts support review; schema validity
  and claimed compliance do not prove understanding.

Assess Korean wording for meaning and reader comprehension, not exact phrases.
The upstream-content tests separately prove preservation of specified design
passes; they do not establish that the design recommendations suit every UI.
