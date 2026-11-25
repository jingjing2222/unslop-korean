# Unslop Korean

한국어 · [English](README.en.md)

Unslop Korean은 웹 화면의 디자인과 한국어 문구를 다듬는 스킬입니다. Damir Sokolovsky가 만든 [unslop](https://github.com/heydamir/unslop)의 디자인 점검 방식과 화면 캡처·영상 도구를 그대로 쓰고, 문구를 고칠 때는 한국어 기준을 따릅니다.

![대시보드의 간격과 색상, 글꼴이 달라지는 과정을 담은 영상의 주요 장면](skills/unslop-korean/references/refs/story-dashboard-frames.webp)

## 사용법

Codex에서는 `$unslop-korean`, Claude Code에서는 `/unslop-korean` 뒤에 원하는 작업을 적으세요.

```text
$unslop-korean 이 결제 화면에서 버튼을 누르면 바로 결제되는지, 주문을 한 번 더 확인하는지 살펴보고 버튼 문구를 다듬어 줘.
```

```text
/unslop-korean 이 랜딩 페이지를 다듬고, 화면이 어떻게 달라지는지 영상으로 보여 줘.
```

화면 전체를 다듬을 때는 먼저 어디를 왜 고칠지 살핍니다. 간격만 어긋났다면 간격만 맞춥니다. 화면을 전반적으로 손볼 때는 제품에 어울리는 디자인을 정한 뒤 간격, 색상, 아이콘, 문구, 글꼴, 배치, 세부 요소, 이미지, 움직임 순으로 고칩니다.

한국어 문구만 맡길 수도 있습니다. 예를 들어 결제 버튼을 누르면 주문 확인 화면이 열리는 경우, 버튼만 보고도 주문을 한 번 더 확인한다는 점을 알 수 있게 문구를 다듬습니다. 이때 화면 디자인과 외국어 문구, 한국어 문장에 섞인 외국어 표기는 그대로 둡니다. 어떤 근거로 문구를 고치는지는 [한국어·UX 자료](docs/evidence/README.md)에서 살펴볼 수 있습니다.

## 설치

### Codex

Codex 대화창에 다음과 같이 입력하세요.

```text
$skill-installer install https://github.com/jingjing2222/unslop-korean/tree/main/skills/unslop-korean
```

직접 설치하려면 이 저장소의 `skills/unslop-korean` 폴더를 `~/.agents/skills/`에 복사하세요.

### Claude Code

터미널에서 아래 두 명령을 실행한 뒤 새 Claude Code 세션을 여세요.

```sh
claude plugin marketplace add jingjing2222/unslop-korean
claude plugin install unslop-korean@unslop-korean
```

### Google Antigravity

다음 명령으로 저장소를 내려받고 스킬을 설치하면 모든 Google Antigravity 프로젝트에서 쓸 수 있습니다.

```sh
git clone https://github.com/jingjing2222/unslop-korean
mkdir -p ~/.gemini/config/skills
cp -r unslop-korean/skills/unslop-korean ~/.gemini/config/skills/
```

### 화면 캡처와 영상 제작

웹페이지나 로컬 HTML 파일을 캡처할 때는 Node.js와 Playwright, Chromium이 필요합니다. Node.js와 pnpm이 설치된 환경에서 작업할 프로젝트 폴더를 열고 다음 명령을 실행하세요.

```sh
pnpm add -D playwright
pnpm exec playwright install chromium
```

영상도 만들려면 ffmpeg를 설치하세요. 터미널에서 `ffmpeg -version`을 입력해 버전이 나오면 사용할 수 있습니다.

[스킬 지침](skills/unslop-korean/SKILL.md) · [원본 예제](examples) · [개발 및 검증 방법](docs/development.md)

## 출처와 라이선스

원본 unslop의 디자인 지침, 이미지, 스크립트, 예제와 이를 수정한 파일에는 [CC BY 4.0](skills/unslop-korean/LICENSE-CC-BY-4.0)이 적용됩니다. 이 프로젝트에서 작성한 한국어 기준과 검증 코드는 [MIT 라이선스](skills/unslop-korean/LICENSE-MIT)를 따릅니다. 외부 참고 자료는 각 자료의 이용 조건을 따릅니다. 원본에서 가져온 파일과 수정한 내용은 [출처와 변경 내역](skills/unslop-korean/UPSTREAM.md)에 정리했습니다.
