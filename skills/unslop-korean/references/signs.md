# Signs of slop

Go through every group and note each sign you find with where it lives. Design suggestions below do not authorize deleting text, changing foreign-language spans, or inventing data. Korean writing decisions follow korean.md and its scoped evidence, including when a later visual group mentions headlines or labels.

## Surfaces and color

- Purple to blue or violet to pink gradients on backgrounds, cards, buttons or the active nav item → one neutral surface, accent only where it means something
- Gradient text in headings, numbers or the logo → solid primary text color
- Colored glows, like `shadow-[0_0_20px_rgba(139,92,246,0.5)]`, `drop-shadow` on emoji or glowing pills → remove, depth from surface steps and hairlines
- Radial color washes or blurred blobs behind content → remove
- Neon or high contrast colored borders → hairline at 6 to 10% opacity
- Many near identical tints of the same hue for text, like five lavenders → three text roles from one neutral ramp
- Every element highlighted, so nothing stands out → one accent used once or twice per screen
- Glass cards with a white inner highlight and a colored shadow → plain raised surface with a hairline

## Type

- Headings at weight 800 or 900 → 400 to 500 and size for hierarchy
- Wide tracking that hurts label readability → adjust the style while preserving original spelling and case; inspect Korean glyphs and wrapping
- Too many sizes and weights on one screen → a few sizes from the scale, weights 400 and 500
- Numbers in mixed formats, like `$48,210` next to `$124,860.40`, or `07` → one format, tabular figures
- Negative letter spacing on small text → zero or slightly positive
- Italic used for emphasis → color or weight instead

## Icons

- Emoji as nav icons, label decoration or status, like 🏠 📥 🚀 💰 ⚠️ 📈 🔥 😬 → one line icon set or nothing
- Emoji inside pills and counts, like `18 👤` → plain number
- Icons in many sizes and colors → one size, one stroke, text role color
- Icons nudged off the column → same icon box width in every row
- A sparkle ✨ for anything AI → remove or use a plain icon only where it explains something

## Spacing

- Arbitrary values, like `mt-[13px]`, `ml-[7px]`, `h-[31px]` → steps on the 4px scale
- Rows in one list with different heights or gaps → one height, one gap
- Groups that sit closer to their neighbours than to their own items → smaller gaps inside groups, bigger between them
- Uneven padding inside sibling cards → one padding
- Big empty gaps above a section and cramped space below it → balanced rhythm

## Korean copy

문구 진단 전에는 [korean.md](korean.md)에 따라 해당 퍼널의 맥락을 확인한다. 아래 항목은 탐색 질문이며 단어 검색이나 일괄 치환 규칙이 아니다. 실제 기준은 고정된 UX·한국어 출처에서 읽는다.

- 현재 단어가 사용자의 행동·대상과 다른 뜻으로 읽히는가? → 모든 사용처의 한국어 읽기와 확인한 동작을 대조한다 (LT-05, KO-07).
- 접수·검토·처리 완료를 섞거나 확인되지 않은 혜택을 약속하는가? → 확인한 상태와 주장 차이를 기록한다 (UX-01, UX-04).
- 짧은 문구를 이해하려면 뒤 단계의 조건이나 내부 지식이 필요한가? → 처음 필요한 안내 위치를 흐름 문제로 남긴다 (UX-12, UX-13).
- 반복·추상어·어색한 결합이 필요한 뜻을 가리는가? → 조건·전문 용어·권리 범위를 지키며 해당 표현을 검토한다 (KO-01, KO-02, KO-08).
- 어미·높임·조사·띄어쓰기·문장부호가 해당 문맥과 규범에 맞는가? → 허용 표기와 제품 말투를 확인한다 (KO-03~06).

인사말·감탄사·마침표·명사형·피동형은 그 자체로 수정 사유가 아니다. 혼합 문장의 외국어 구절과 다른 언어 문구는 디자인 패스에서도 보존한다.

## Components

- Glowing pills for counts, plans, shortcuts or status → quiet mono text or a keycap
- `PRO`, `New ✨`, `Beta 🚀` badges everywhere → remove or one quiet text badge
- Every element a full pill, from search to buttons to cards → radius by size, nested radius math
- Charts with rainbow bars, glowing bars, pill shaped bars or uppercase day labels → one or two series, muted grid and mono labels, one highlight color
- Every chart or stack in several shades of the accent, so nothing leads → neutral steps with the accent only on the one thing that matters
- Sparklines, tallies or mini bars added to every stat card → the number, its label and its change
- Equal cards side by side, each with the same chart or layout → one main chart, compact stats, varied widths
- Logo as a gradient tile with a sparkle and a gradient wordmark → product name as text plus a simple flat mark
- Logo mark as a glossy orb, a gradient ball or a glowing dot → a flat glyph in one solid color, or the wordmark alone

## Landing pages and heroes

- A pill badge above the headline, like `✨ Introducing X 2.0` → remove, or a quiet text link if it is real news
- 한국어 제목에서 대상·행동이 불분명함 → 현재 과업과 사용처를 읽고 KO-08로 검토; 외국어 제목은 보존
- Gradient or shimmer on the headline → solid text
- Floating blobs, orbs, grids and glowing lines behind the hero → plain background or one real product visual
- Everything stacked and centered, headline, text, buttons and a picture below → an asymmetric split or text over a large product view, see the Layout pass
- Three or more buttons, or chips and avatars stacked under the buttons → one primary and at most one secondary action
- 출처를 확인하지 못한 수치·추천·평가 표시 → 사실 확인 전 보류; 사실을 만들거나 추정으로 삭제하지 않으며 외국어 문구는 보존
- Parallax and elements floating on scroll → static layout, motion only with a purpose
- Feature cards with an emoji, a bold title and a vague line each → fewer features, concrete copy, line icons or none

## Visuals

- Glossy 3D blobs, orbs, liquid chrome shapes or a purple nebula as the hero visual → the product itself or one concrete metaphor for what it does
- Stock robots, glowing brains, circuit lines or holograms for anything AI → remove, or show what the AI actually produces
- Text, fake buttons or a fake logo baked into an image → real text in the page, a clean image without text
- An image that does not blend into the page, with a hard edge and a different black → background matched to the page and a soft mask at the edges
- A visual on every section → one visual where it helps, usually only the hero

## Motion

- `animate-pulse`, `animate-ping` or breathing glows on things that are not live → static
- `transition-all` and `hover:scale` on cards and buttons → color or surface step on hover, a tiny scale down on press
- Bouncy springs and overshoot on simple UI → one ease-out curve
- Everything flying in on load from different directions → one short fade and rise with a small stagger
- Parallax, floating loops and elements that move on scroll → static layout
- Animating width, height, top or left → transform and opacity

## Template look

These are not slop, but they are what a cleaned up screen falls back to when nobody made a decision. Watch for them after the passes.

- Pure grey #161616 page, Inter, white text and the old brand color on one button, on a product whose world is warm or bright → a ramp tinted toward the world and an accent from it
- 한국어 제목의 뜻이 모호함 → korean.md의 독자·과업·실제 동작 대조로 판단; 제품명만 바꾼 비교는 품질 판정의 증거가 아님
- A hero visual that is an empty box or a generic picture → a product preview in code or an image from the world
- Every product getting the same layout, type and palette → let the direction choose

---

Part of unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0. Keep this credit in copies and adaptations.

Modified for Unslop Korean: English copy guidance and Korean applicability were adjusted. See [attribution and changes](../UPSTREAM.md). This adaptation retains CC BY 4.0.
