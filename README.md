# Unslop Korean

한국어 · [English](README.en.md)

[unslop](https://github.com/heydamir/unslop)의 UI 개선 구조를 유지하고, 영어 윤문 부분을 한국어 기준으로 교체한 스킬입니다. 화면의 간격·색·아이콘·문구·글꼴·배치·세부 요소·비주얼·모션을 차례로 다듬습니다.

한국어 문구는 사용자가 실제로 받은 안내와 전체 과업을 읽고, 뜻이 맞는지 확인한 뒤 다듬습니다. 기존의 공개 UX 지침과 한국어 자료를 사용하며 영어 원문은 필요하지 않습니다.

## 설치

Codex 터미널에서:

```sh
codex plugin marketplace add jingjing2222/unslop-korean
codex plugin add unslop-korean@unslop-korean
```

Claude Code 대화창에서:

```text
/plugin marketplace add jingjing2222/unslop-korean
/plugin install unslop-korean@unslop-korean
```

설치 후 새 대화에서 요청하세요. 이 저장소의 마켓플레이스로 배포하며, 두 제품의 공식 플러그인 목록에는 등록되어 있지 않습니다. 한국어 근거 조회·감사 도구는 네이티브 실행 파일로 포함되어 있습니다.

## 사용

화면 디자인과 한국어 문구를 함께 다듬으려면:

```text
unslop-korean으로 이 대시보드를 다듬어 줘.
제품의 기능과 내용은 유지하고, 한국어 문구는 앞뒤 사용자 흐름까지 확인해 줘.
```

문구만 검토하려면:

```text
unslop-korean으로 회원가입 흐름의 한국어 문구만 검토하고 다듬어 줘.
```

화면을 점검하고 제품에 맞는 방향을 정한 뒤 9개 패스를 진행합니다. 이미 잘 만들어진 화면은 필요한 부분만 고칩니다. 문구만 요청하면 시각 디자인을 바꾸지 않습니다.

## 한국어 문구 검토

사용자의 목적, 앞선 안내, 현재 선택, 이후 결과를 확인합니다. 같은 문구도 사용처별 뜻을 대조하고 **수정·유지·보류**와 이유를 남깁니다. 표현을 고치기 전에 진단을 보관하고, 수정 후 같은 경로를 다시 확인합니다.

기존 한국어만 다듬으며 다른 언어와 혼합 문장 속 외국어 표기는 보존합니다. 번역·다른 언어의 교정·새 콘텐츠 작성은 별도로 요청해야 합니다. 감탄사·마침표·인사말을 일괄 삭제하거나 모든 문장을 같은 말투로 바꾸지 않습니다.

필요한 안내가 빠졌다면 처음 안내해야 할 위치를 함께 짚습니다. 문구를 다듬어도 해결되지 않은 흐름 문제와 확인하지 못한 화면은 결과에 남깁니다. 에이전트의 점검은 실제 사용자 관찰과 구분합니다.

[근거 자료](docs/evidence/README.md)의 UX 자료는 무엇을 언제 안내할지, 한국어 자료는 어떻게 표현할지 판단하는 데 씁니다. 제품 코드는 실제 동작을 확인하는 자료입니다. unslop의 디자인 제안은 한국어 쓰기 규범으로 사용하지 않습니다.

화면 저장과 전후 영상은 원본 unslop의 Node.js·Playwright 스크립트를 사용합니다. 이 기능을 쓸 프로젝트에서 다음 명령을 실행하세요. 영상 제작에는 PATH에서 실행할 수 있는 ffmpeg도 필요합니다.

```sh
pnpm add -D playwright
pnpm exec playwright install chromium
```

[스킬 지침](skills/unslop-korean/SKILL.md) · [지원 환경](skills/unslop-korean/references/runtime.md) · [개발 안내](docs/development.md)

원본의 디자인 예제는 [examples](examples)에 있습니다. 영문 문구는 그대로 보존한 시각 디자인 예제입니다.

## 출처와 라이선스

원본 unslop은 [Damir Sokolovsky](https://x.com/heydamir)가 만들었습니다. 디자인 지침·참고 이미지·캡처 및 영상 스크립트·예제와 그 파생물에는 [CC BY 4.0](skills/unslop-korean/LICENSE-CC-BY-4.0)이 적용됩니다. 재배포할 때 저작자·원본 링크·라이선스·변경 사항을 표시해야 합니다. 자세한 범위는 [출처와 변경 사항](skills/unslop-korean/UPSTREAM.md)을 참고하세요.

이 저장소의 기존 한국어 지침과 자체 코드에는 [MIT](skills/unslop-korean/LICENSE-MIT)가 적용됩니다. 외부 근거 문서는 각각의 이용 조건을 따릅니다. 실행 파일의 런타임 라이선스는 각 파일 옆의 `licenses/`에 있습니다.
