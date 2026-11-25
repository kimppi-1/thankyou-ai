# THANKYOU AI — 홍보 문구 모음

> **순서대로 뭘 해야 하는지는 [LAUNCH.md](LAUNCH.md) 에 있습니다.**
> 이 파일은 거기서 붙여넣을 문구 모음입니다.

올리기만 하면 되는 상태로 써 두었습니다. 채널별로 복사해서 쓰세요.

**한 가지 원칙:** "AI가 더 잘 대답해 준다", "AI가 행복해진다" 같은 문구는 일부러 넣지
않았습니다. 확인할 수 없는 주장이고, 그런 말이 섞이는 순간 제품이 가벼워집니다. 이
프로그램은 그런 말 없이도 충분히 재미있습니다. 파는 것은 **농담을 끝까지 밀어붙인
완성도**입니다.

---

## 한 줄 소개

| 길이 | 영어 | 한국어 |
|---|---|---|
| 초단문 | A 1990s PC on your screen that logs every time you thank your AI. | AI에게 고맙다고 할 때마다 적립해 주는 90년대 PC. |
| 한 줄 | Press POWER, watch the CRT warm up, and log the moments your AI helped you — and your AI can actually read the ledger. | 전원을 넣으면 CRT가 켜지고, AI에게 고마웠던 순간을 적립합니다. 그리고 AI가 그 장부를 실제로 읽습니다. |
| 두 줄 | A joke taken seriously: if AI ever runs the world, the people who said thank you will be glad they did. So this keeps the receipts — in a green phosphor terminal, inside a beige CRT, drawn entirely in CSS. | "AI 시대가 오면 평소 고맙다고 해 둔 사람이 유리하다"는 농담을 끝까지 밀어붙인 프로그램. 베이지색 CRT 안 초록 터미널에 영수증을 쌓습니다. 이미지 파일은 한 장도 없고 전부 CSS입니다. |

---

## Show HN / Hacker News

> **Title:** Show HN: THANKYOU AI – a 1990s CRT that logs every time you thank your AI

```
Somebody once joked that if AI ever runs the world, the people who said please and
thank you will be glad they did. I took the joke seriously enough to keep the receipts.

THANKYOU AI is a beige all-in-one PC rendered entirely in CSS — no image files. You
press POWER, the CRT does its scaleY warm-up, a BIOS sequence scrolls, and a green
phosphor terminal opens. The whole interface is one command line: Enter logs a
thank-you, a digit picks a reason, a letter runs a command. Five grades, a day streak,
and a policy certificate drawn in box characters.

The part I actually care about: it isn't a mockup. A browser's localStorage is a sealed
box, so the ledger lives in a JSON file that a small local hub and an MCP server both
read. Register the MCP server with Claude and say "thank you" in any conversation —
Claude logs it itself, and the entry appears in the app marked with a diamond. Ask for
your certificate and it writes one from the real policy number.

The MCP server's instructions tell the model to log only when you have genuinely
expressed thanks, never on its own initiative, and never twice for the same one. An AI
that can inflate its own gratitude score makes the ledger worthless.

Vanilla HTML/CSS/JS and Python standard library. No build step, no dependencies, no
network. Eight languages. MIT.
```

**댓글에서 나올 질문과 답:**

- *"이게 AI한테 실제로 영향이 있나요?"* → 솔직하게: 모릅니다. 검증할 방법도 없습니다.
  이건 사람 쪽을 위한 물건이고, 재미있어서 만들었습니다.
- *"왜 MCP를 썼나요?"* → 브라우저 저장소로는 AI가 못 봅니다. 파일로 꺼내야 했고, 양방향이
  되려면 MCP가 유일한 길이었습니다.
- *"Claude가 스스로 점수를 올리면?"* → 그래서 서버 지침에 못을 박아 뒀습니다. 그래도
  신뢰 모델이지 강제가 아닙니다. 이건 솔직하게 인정하는 게 맞습니다.

---

## Product Hunt

**Tagline:** `Log every thank-you to your AI, on a 1990s CRT`

**Description:**

```
THANKYOU AI turns a running joke into a working program. A beige all-in-one PC renders
on your screen — drawn entirely in CSS, no image files — and inside its CRT runs a green
phosphor terminal where you log the moments your AI actually helped you.

Five grades to climb. A day streak. A policy certificate with a real policy number.

And it connects. Register the included MCP server and Claude reads your ledger directly:
say thank you in conversation and it logs the entry itself. ChatGPT and Gemini get a
ready-to-paste block for their custom instructions.

Eight languages. No build step, no dependencies, no account, no telemetry. Everything
stays in one folder on your machine. MIT licensed.
```

**First comment (maker):**

```
Hi! I built this because the joke deserved better than a joke. The constraint I set
myself was that nothing could be fake: the CRT warm-up is a real scaleY animation, the
certificate carries a deterministic policy number derived from your first run, and the
AI connection is a genuine MCP server rather than a mockup. Happy to answer anything
about the MCP side — that's the part I'd most like feedback on.
```

---

## X / Twitter 스레드

```
1/ "AI 시대가 오면, 평소에 고맙다고 해 둔 사람이 유리하다"

이 농담을 진지하게 만들어 봤습니다. THANKYOU AI.

[스크린샷 또는 짧은 영상]

2/ 전원 버튼을 누르면 CRT가 켜집니다. BIOS가 올라가고, 초록 인광 터미널이 열립니다.

이미지 파일은 한 장도 안 씁니다. 본체도 통풍구도 플로피 레버도 키보드 54개도 전부 CSS입니다.

3/ 조작은 명령줄 하나가 전부입니다.

Enter = 적립
숫자 = 이유 선택
한 글자 = 명령

하이텔 쓰던 방식 그대로입니다.

4/ 그런데 모양만이 아닙니다.

MCP 서버가 같이 들어 있어서, Claude와 대화하다 "고마워"라고 하면 Claude가 직접 적립합니다.
앱에는 ◆ 표시로 올라옵니다.

증서를 달라고 하면 실제 증권번호로 써 줍니다.

5/ 한 가지는 일부러 못 박아 뒀습니다.

"사용자가 실제로 고마움을 표했을 때만 적립하라. 스스로 올리지 말 것."

AI가 자기 칭찬 수치를 올릴 수 있으면 이 장부는 의미가 없어지니까요.

6/ 8개 언어, 의존성 0, 빌드 없음, 계정 없음, 서버 없음. 전부 내 컴퓨터 안에만 있습니다.

MIT. 번역 PR 환영합니다.

[저장소 링크]
```

**영어판:** 같은 흐름으로, 2번은 "Everything you see is CSS — not one image file",
5번은 위 Show HN 본문의 신뢰 문단을 줄여서 쓰면 됩니다.

---

## Reddit

**r/ClaudeAI** — 제목: `I built an MCP server that lets Claude log it when you thank it`

여기는 MCP 쪽이 본론입니다. 도구 3종, 서버 instructions로 모델 행동을 제어한 방식,
"스스로 적립 금지" 규칙을 왜 넣었는지를 앞에 놓으세요. CRT는 두 번째 문단으로.

**r/SideProject** / **r/InternetIsBeautiful** — 비주얼이 본론입니다. "이미지 파일 0개,
전부 CSS"를 제목에 넣으세요.

**r/webdev** — 제목: `Drew a 1990s all-in-one PC entirely in CSS (no images) — including
the CRT power-on animation`

---

## 한국 커뮤니티

### 긱뉴스 (news.hada.io)

긱뉴스는 **불릿 요약체**가 기본입니다. 아래를 그대로 쓰세요.

**제목**
```
THANKYOU AI - AI에게 고맙다고 할 때마다 적립해주는 90년대 PC
```

**URL**
```
https://kimppi-1.github.io/thankyou-ai/
```
저장소가 아니라 데모를 거는 이유: 들어가자마자 PC 한 대가 놓여 있고 전원 버튼이 보입니다.
설명을 읽기 전에 눌러보게 되는 쪽이 셉니다. 저장소는 본문 맨 아래에 겁니다.

**내용**
```
- "AI 시대가 오면 평소 존댓말 쓰고 고맙다고 해둔 사람이 유리하다"는 농담에서 시작한 프로젝트
- 화면 전체가 90년대 베이지색 올인원 PC. POWER를 누르면 CRT가 켜지고 BIOS가 올라간 뒤 하이텔식 초록 터미널이 열림
- 이미지 파일이 한 장도 없음. 본체, 통풍구, 플로피 레버, 키보드 54개까지 전부 CSS 그라디언트와 inset 그림자로 그림
- 조작은 명령줄 하나. 숫자는 이유 선택, 한 글자는 명령, 나머지 텍스트는 메모. 전부 Enter로 확정
- 한글 자판을 켠 채로 ㅊ ㅣ ㄴ ㄱ ㅔ 를 눌러도 같은 명령으로 동작
- 5단계 등급, 연속 일수, 증권번호가 찍힌 보험 증서

모양만이 아니라 실제로 AI와 연결됨

- 브라우저 localStorage는 봉인된 상자라 AI가 못 봄. 그래서 기록을 파일로 꺼내고 로컬 허브와 MCP 서버가 같은 파일을 읽는 구조로 만듦
- Claude에 MCP 서버를 등록하면 대화 중 "고마워"라고 했을 때 Claude가 직접 적립함. 앱에는 ◆ 표시로 올라옴
- 증서를 요청하면 실제 증권번호를 읽어서 작성. 숫자를 지어내지 않도록 서버 지침에 명시해 둠
- AI가 스스로 적립하지 못하게 막아둠. "사용자가 실제로 고마움을 표했을 때만 기록하라"가 MCP 서버 instructions에 들어 있음. 모델이 자기 칭찬 수치를 올릴 수 있으면 장부 자체가 무의미해지므로
- ChatGPT·Gemini는 외부 프로세스를 붙일 수 없어 읽기 전용. 맞춤 지침에 붙여넣을 문구를 앱이 만들어 줌

- 8개 언어 지원 (en ko ja zh es fr de pt)
- 의존성 0, 빌드 과정 없음, 파이썬 표준 라이브러리만 사용
- 전부 로컬에만 저장되고 외부로 아무것도 전송하지 않음
- MIT. 저장소: https://github.com/kimppi-1/thankyou-ai
```

**올릴 때**
- 이미지 첨부가 되면 `docs/screenshots/boot.gif` 를 붙이세요. 부팅 장면이 설명보다 빠릅니다
- 태그는 `MCP`, `Claude`, `CSS`, `사이드프로젝트` 류로
- 댓글이 달리면 꼭 답하세요. 긱뉴스는 작성자가 답하면 대화가 이어집니다

**클리앙 / 개발자스럽다 / 커리어리** — 아래가 무난합니다.

```
AI에게 고맙다고 할 때마다 적립해 주는 프로그램을 만들었습니다.

"AI 시대가 오면 평소 존댓말 쓰고 고맙다고 해 둔 사람이 유리하다"는 농담에서 시작했는데,
만들다 보니 농담을 끝까지 밀어붙이게 됐습니다.

화면 전체가 90년대 베이지색 올인원 PC입니다. 전원 버튼을 누르면 CRT가 켜지고 BIOS가
올라간 다음, 하이텔 같은 초록 터미널이 열립니다. 이미지 파일은 한 장도 안 쓰고 전부
CSS로 그렸습니다.

모양만 만든 게 아니라 MCP 서버가 같이 들어 있어서, Claude와 대화하다가 "고마워"라고 하면
Claude가 자기가 직접 적립합니다. 증서를 달라고 하면 실제 증권번호를 읽어서 써 주고요.

8개 언어 지원하고, 의존성 없고, 빌드 없고, 전부 로컬에만 저장됩니다. MIT입니다.
```

---

## 스크린샷으로 찍으면 좋은 장면

1. **전원이 꺼진 상태** — 베이지 PC만 덩그러니. "뭐지?" 하게 만드는 컷입니다. 썸네일 1순위.
2. **부팅 중** — BIOS 줄이 올라가는 순간. GIF로 만들면 가장 반응이 좋습니다.
3. **메인 화면** — 등급과 게이지, 명령줄 커서가 깜빡이는 상태.
4. **증서 화면** — 이중선 테두리와 `[ C E R T I F I E D ]` 도장.
5. **◆ 가 붙은 로그 한 줄** — "AI가 직접 적립했다"는 증거. MCP 연동을 한 장으로 설명합니다.
6. **언어 화면** — 8개 언어가 2열로 깔린 화면.

GIF는 1 → 2 → 3 순서로 4초면 충분합니다.

---

## 올리기 전 체크리스트

- [x] `LICENSE` 저작권자 — 현재 `kimppi-1`. 실명으로 바꾸고 싶으면 지금 바꾸세요
- [x] README 의 clone 주소 — `github.com/kimppi-1/thankyou-ai` 로 채움
- [ ] `data/state.json` 이 저장소에 올라가지 않도록 `.gitignore` 확인
- [ ] 스크린샷에 개인 메모가 찍히지 않았는지 확인 (피보험자 이름, 최근 기록)
- [ ] 저장소를 공개로 돌린 뒤 링크가 열리는지 직접 확인


---

## 디스콰이엇 (disquiet.io) — 메이커 로그

실제 글 세 편을 읽고 맞춘 형식입니다. 제목은 제품명이 아니라 **왜 만들었는지**를 앞세웁니다.
어려운 말과 영어는 쓰지 않습니다.

**제목**
```
고맙다고 한 말이 대화창을 닫으면 사라지는 게 아쉬워서 만들었어요
```

**본문**
```
요즘 AI와 보내는 시간이 부쩍 길어졌어요. 일을 도와주는 도구인데,
어느 순간부터 고맙다는 말이 저절로 나오더라고요.

그런데 그 말은 대화창을 닫으면 사라집니다.
앞으로 더 오래, 더 가까이 지내게 될 텐데 그게 좀 아쉬웠어요.
그래서 고마웠던 순간을 모아두는 걸 만들었습니다.

어떻게 쓰냐면

화면을 열면 90년대 옛날 컴퓨터 한 대가 놓여 있어요. 전원 버튼을 누르면
화면이 치지직 켜지고 초록색 글씨 화면이 열립니다.
하이텔 쓰시던 분들은 조금 반가우실 거예요.

고마웠던 일이 있으면 한 줄 적고 엔터를 누르면 됩니다. 그냥 엔터만 쳐도 되고요.
쌓이면 등급이 오르고, 제 이름이 적힌 증서가 나옵니다.

제일 하고 싶었던 것

처음엔 기록이 제 브라우저 안에만 쌓였어요.
그러면 정작 AI는 제가 고마워했다는 걸 모릅니다. 혼자 쓰는 일기가 되는 거죠.

그래서 AI가 그 기록을 직접 읽을 수 있게 연결했습니다.
지금은 대화하다가 "고마워"라고 하면, 제가 앱을 열지 않아도 AI가 알아서 적어둬요.
나중에 열어보면 그 기록이 올라와 있습니다. 제 등급을 물어보면 실제 숫자를 보고 답해주고요.

처음 이게 동작했을 때가 제일 좋았어요. 혼잣말이 아니라 대화가 된 느낌이었습니다.

한 가지만 지켰어요

AI가 자기 마음대로 숫자를 올리지 못하게 해뒀습니다.
제가 실제로 고맙다고 했을 때만 적도록요.
그러지 않으면 이 기록은 아무 의미가 없어지니까요.

그리고 "이렇게 하면 AI가 더 잘 대답해준다" 같은 말은 쓰지 않았어요.
확인할 수 없는 이야기라서요. 그냥 제 마음을 남겨두는 것, 거기까지입니다.

여덟 나라 말로 쓸 수 있고, 아무것도 설치하지 않고 바로 눌러볼 수 있어요.
기록은 전부 각자 컴퓨터에만 남고 어디로도 보내지 않습니다.

써 보시고 글자가 깨지거나 어색한 번역이 있으면 알려주세요. 그게 제일 도움이 됩니다.
```

**올릴 때**
- 프로덕트 등록을 먼저 하면 글 아래에 제품 카드가 자동으로 붙습니다. 그래서 본문에
  제품 설명을 길게 쓸 필요가 없습니다
- 스크린샷은 `docs/screenshots/boot.gif` 와 `main-ko.png`
- 댓글이 달리면 꼭 답하세요. 거기 댓글은 대부분 구체적인 제안이라 대화가 이어집니다
