# 발표 실행서

위에서부터 순서대로 하세요. 문구는 전부 [`PROMO.md`](PROMO.md) 에 있습니다.
**0단계와 1단계를 건너뛰고 커뮤니티에 올리면 거의 반드시 묻힙니다.**

| 단계 | 할 일 | 시간 | 중요도 |
|---|---|---|---|
| 0 | 저장소 단장 (링크 걸기) | 10분 | **필수** |
| 1 | 스크린샷·GIF 만들기 | 20분 | **필수** |
| 2 | awesome 목록에 PR | 30분 | 높음 (저평가됨) |
| 3 | 한국 커뮤니티 | 30분 | 중간 (연습 삼아 먼저) |
| 4 | Reddit | 30분 | 중간 |
| 5 | Show HN | 1시간 | 가장 큼, **기회는 한 번** |
| 6 | Product Hunt | 2시간 | 선택 |

---

## 0단계 — 저장소에 링크 걸기

**"링크를 어디에 거느냐"가 이겁니다.** GitHub 저장소 첫 화면 오른쪽에 `About` 칸이 비어 있으면,
들어온 사람이 데모가 있는지도 모르고 나갑니다.

1. https://github.com/kimppi-1/thankyou-ai 접속
2. 오른쪽 `About` 글자 옆 **톱니바퀴(⚙)** 클릭
3. 아래처럼 채우고 **Save changes**

**Description** (붙여넣기)
```
A 1990s desktop PC on your screen that logs every time you thank your AI — and lets your AI read the ledger via MCP.
```

**Website**
```
https://kimppi-1.github.io/thankyou-ai/
```
> `Use your GitHub Pages website` 체크박스가 보이면 그걸 켜도 됩니다. 같은 결과입니다.

**Topics** (하나씩 입력하고 Enter. 이게 GitHub 안에서 발견되는 거의 유일한 경로입니다)
```
mcp  model-context-protocol  claude  ai  chrome-extension
vanilla-js  no-dependencies  retro  crt  terminal  i18n
```

- [ ] 저장 후 저장소 첫 화면 오른쪽에 링크와 토픽이 보이는지 확인

---

## 1단계 — 이미지 만들기

글만 올리면 아무도 안 봅니다. **이 프로젝트는 보여주면 바로 이해되는 종류**라 이미지가 전부입니다.

### 스크린샷 4장

브라우저에서 https://kimppi-1.github.io/thankyou-ai/ 를 열고, 창을 **최대한 크게** 한 뒤
`Win` + `Shift` + `S` 로 영역을 잘라 찍으세요. PC 본체만 꽉 차게 자르는 게 좋습니다.

| 파일명 | 장면 | 쓰임새 |
|---|---|---|
| `off.png` | 전원 꺼진 상태 (그냥 접속하면 이 화면) | 썸네일 1순위. "이게 뭐지?" 하게 만듦 |
| `main.png` | 전원 켜고 2~3번 적립한 상태 | README 대표 이미지 |
| `cert.png` | `C` + Enter — 증서 화면 | 두 번째로 반응 좋음 |
| `lang.png` | `T` + Enter — 8개 언어 목록 | "전 세계" 메시지 증명 |

> **찍기 전에 확인:** 메모에 개인적인 내용이 없는지, 피보험자 이름이 실명이 아닌지 보세요.
> 그대로 인터넷에 남습니다.

### GIF 1개 (가장 강력함)

부팅 장면입니다. 전원 꺼진 상태 → POWER 클릭 → BIOS 올라감 → 터미널 열림. **4초면 충분합니다.**

1. https://www.screentogif.com 에서 ScreenToGif 다운로드 (무료, 설치 불필요한 버전 있음)
2. `녹화기` → 브라우저 창에 맞춰 영역 지정 → 녹화 시작
3. POWER 누르고 터미널이 열리면 정지
4. `파일` → `다른 이름으로 저장` → GIF → **2MB 이하로** (프레임 수를 줄이면 됩니다)

GIF가 2MB를 넘으면 Reddit·트위터에서 재생이 안 됩니다.

### 저장소에 넣기

`docs/screenshots/` 폴더가 이미 있습니다. 거기에 넣고:

```powershell
cd "C:\Users\김재유\Documents\gomawo-ai"
```

```powershell
git add docs/screenshots; git commit -m "Add screenshots"; git push
```

그 다음 `README.md` 위쪽의 주석 처리된 이미지 줄에서 `<!--` 와 `-->` 를 지우세요.

- [ ] README 첫 화면에 이미지가 보이는지 확인

---

## 2단계 — awesome 목록에 PR

**가장 적은 노력으로 가장 오래 가는 유입입니다.** 커뮤니티 글은 하루 지나면 묻히지만,
목록에 한 줄 들어가면 몇 달씩 사람이 들어옵니다. MCP 서버 목록은 지금 계속 커지는 중이라
받아들여질 가능성도 높습니다.

### 먼저, 이게 무슨 절차인가

awesome 목록은 **남의 저장소**입니다. 내가 직접 고칠 수 없습니다.
그래서 GitHub는 이런 방식을 씁니다.

```
   남의 저장소            내 계정의 복사본          남의 저장소
   README.md     ──복사──▶  README.md    ──제안──▶  주인이 보고
   (못 고침)              (여기선 고칠 수 있음)      수락하면 반영
```

이 "제안"이 **Pull Request(PR)** 입니다. 한국어로는 보통 그냥 PR이라고 부릅니다.
*"제가 이렇게 고쳐 봤는데, 받아주시겠어요?"* 하고 보내는 수정 제안서라고 보면 맞습니다.

복사본을 만드는 걸 **fork(포크)** 라고 하는데, **연필 아이콘을 누르면 GitHub가 알아서 만들어 줍니다.**
따로 할 일이 없습니다. 설치할 것도, 명령어도 없습니다. 브라우저만 있으면 됩니다.

### 클릭 순서 (wong2 기준, 5분)

1. https://github.com/wong2/awesome-mcp-servers/blob/main/README.md 접속

2. 파일 내용 위쪽 오른편의 **연필 아이콘(✏)** 클릭
   - 안 보이면 그 줄의 `⋯` 안에 `Edit` 이 있습니다

3. 노란 안내문이 뜹니다 — *"You're making changes in a project you don't have write access to.
   We've created a fork of this project for you…"*
   → **정상입니다.** GitHub가 복사본을 만들었다는 뜻입니다. 그냥 진행하세요

4. 글자를 고칠 수 있는 편집기가 열립니다. `Ctrl`+`F` 로 넣을 자리를 찾습니다

5. 지정된 줄 위에 빈 줄을 만들고, 아래 마크다운 한 줄을 붙여넣습니다

6. 오른쪽 위 초록색 **`Commit changes...`** 클릭

7. 작은 창이 뜹니다
   - 첫 칸(커밋 메시지)에 `Add THANKYOU AI`
   - 아래 **`Create a new branch for this commit and start a pull request`** 가 선택돼 있는지 확인
     (권한이 없으면 보통 자동으로 선택돼 있습니다)
   - **`Propose changes`** 클릭

8. *"Open a pull request"* 화면으로 넘어갑니다. 제목이 맞는지 보고
   **`Create pull request`** 클릭

9. 끝입니다. 이제 기다리면 됩니다. 주인이 수락(merge)하면 목록에 들어갑니다.
   며칠에서 몇 주 걸릴 수 있고, 답이 없을 수도 있습니다. 재촉하지 마세요

> **형식 규칙:** 넣을 자리의 **위아래 줄을 그대로 흉내내는 게 가장 안전합니다.**
> 아래 한 줄을 넣되, 주변 줄이 다른 표기를 쓰면 그쪽에 맞추세요.

---

### ① wong2/awesome-mcp-servers — 4,400★ · **여기부터 하세요**

조건 없고, 분류가 `Community Servers` 하나라 성격을 안 따집니다. 현재 255개가 들어 있습니다.

- 편집할 파일: https://github.com/wong2/awesome-mcp-servers/blob/main/README.md
- 넣을 자리: 편집기에서 `Ctrl`+`F` 로 **`TikTok`** 을 찾아, 그 줄 **바로 위**
  (알파벳상 `TeamCity` … `Text-To-GraphQL` **다음**, `TikTok` **앞**이 맞습니다)

```markdown
- **[THANKYOU AI](https://github.com/kimppi-1/thankyou-ai)** - Logs the gratitude you express to your AI, on a 1990s CRT. The model reads its own ledger and records thanks itself.
```

- [ ] PR 보냄

---

### ② appcypher/awesome-mcp-servers — 5,800★ · **맞는 분류가 없음**

처음엔 `📝 Note Taking` 을 생각했지만, 열어 보니 그 분류는 Notion·Obsidian·Apple Notes·Google Keep
같은 **기존 메모 앱 연동**만 10개 들어 있고 전부 로고 이미지를 답니다. 성격이 다릅니다.
다른 분류(AI Services, Art & Literature, Workflow Automation …)도 맞지 않고, `Other` 같은
포괄 분류가 없습니다.

**억지로 넣지 마세요.** awesome 목록은 분류가 안 맞으면 거절되고, 반복되면 계정 인상이 나빠집니다.
굳이 하겠다면 새 분류를 제안하는 PR이 되는데, 그건 승인 가능성이 낮습니다.

- [ ] 건너뜀 (또는 나중에 맞는 분류가 생기면 재시도)

---

### ③ punkpeye/awesome-mcp-servers — 98,000★ · **조건 있음**

가장 큰 목록이지만 기여 규칙에 이런 조항이 있습니다.

> PRs must include a backlink to your https://glama.ai/mcp/servers MCP server listing.
> It can be a backlink from your website or badge included in the README.md.
> Backlinks are checked before merging the PR.

즉 **glama.ai 에 서버를 먼저 등록하고, 내 README 에 그쪽 배지나 링크를 달아야** 받아줍니다.
실제로 기존 항목들이 전부 `glama.ai` 배지를 달고 있습니다. 거래 조건이 명시돼 있는 셈입니다.

**할지 말지는 판단이 필요합니다.**

| | |
|---|---|
| 얻는 것 | 9.8만 별 목록 등재 (다른 둘의 10배 규모) + glama.ai 디렉터리 자체 노출 |
| 내주는 것 | 내 README 에 제3자 배지 한 줄 |

하기로 했다면 순서는 이렇습니다.

1. https://glama.ai/mcp/servers 에서 저장소 등록
2. 거기서 주는 배지 마크다운을 `README.md` 상단에 추가하고 푸시
3. 분류 **`🛠️ Other Tools and Integrations`** 에 알파벳 순으로 한 줄 추가

```markdown
- [kimppi-1/thankyou-ai](https://github.com/kimppi-1/thankyou-ai) 🐍 🏠 - Logs the gratitude you express to your AI, on a 1990s CRT. The model can read its own ledger and record thanks itself.
```
> 이 목록의 범례: `🐍` 파이썬, `🏠` 로컬 전용. 둘 다 맞습니다.

4. PR 설명에 백링크를 어디에 달았는지 한 줄 적기 (규칙에 명시돼 있습니다)

- [ ] 조건 확인하고 결정 → 하기로 했으면 PR 보냄

---

- [ ] ①②는 조건 없음. 먼저 보내세요

---

## 3단계 — 한국 커뮤니티 (먼저 여기서 연습하세요)

반응을 보고 문구를 다듬은 뒤에 Show HN으로 가는 게 좋습니다. Show HN은 기회가 한 번뿐입니다.

### 긱뉴스 (news.hada.io)

개발자가 많고 이런 물건에 우호적입니다.

1. https://news.hada.io 로그인 (GitHub 계정으로 됩니다)
2. 오른쪽 위 **글 등록**
3. `제목` / `URL` / `내용` 을 채웁니다

```
제목: AI에게 고맙다고 할 때마다 적립해주는 90년대 PC
URL : https://kimppi-1.github.io/thankyou-ai/
```
내용은 `PROMO.md` → "한국 커뮤니티" 문단을 붙여넣으세요.

### 디스콰이엇 (disquiet.io)

사이드 프로젝트 전용입니다. 메이커 로그를 쓰면 꾸준히 노출됩니다.

1. https://disquiet.io 가입 → **제품 등록(Makers Log)**
2. 이름 `THANKYOU AI`, 링크는 데모 주소
3. 스크린샷 올리고 소개글은 긱뉴스와 같은 것

### 클리앙 개발자 포럼

https://www.clien.net → `모두의공원` 또는 `개발자포럼`. 같은 문구에 GIF 한 장.

- [ ] 최소 2곳

---

## 4단계 — Reddit

**서브레딧마다 자기홍보 규칙이 다릅니다.** 들어가서 오른쪽 `Rules` 를 먼저 읽으세요.
하루에 여러 곳에 몰아서 올리면 스팸으로 분류됩니다. **하루에 한 곳씩.**

| 서브레딧 | 각도 | 제목 |
|---|---|---|
| r/SideProject | 만든 이야기 | `I built a 1990s CRT that logs every time I thank my AI` |
| r/ClaudeAI | MCP가 본론 | `An MCP server that lets Claude log it when you thank it` |
| r/webdev | 기술 | `Drew a 1990s all-in-one PC entirely in CSS — no images, including the CRT power-on` |
| r/InternetIsBeautiful | 비주얼 | 데모 링크만. 규칙상 설명 최소 |

본문은 짧게, GIF를 먼저 보여주고 링크는 아래에. 댓글이 달리면 **반드시 답하세요.**
Reddit은 답글이 붙어야 상단에 올라갑니다.

- [ ] 하루 한 곳씩 3~4일

---

## 5단계 — Show HN (가장 큰 한 방)

**기회는 사실상 한 번입니다.** 0~4단계를 끝내고, 문구가 다듬어진 뒤에 하세요.

1. https://news.ycombinator.com 가입 (계정이 며칠 묵어 있으면 더 좋습니다)
2. https://news.ycombinator.com/submit
3. 이렇게 채웁니다

```
Title: Show HN: THANKYOU AI – a 1990s CRT that logs every time you thank your AI
URL  : https://kimppi-1.github.io/thankyou-ai/
Text : (비워 두세요)
```
> URL 칸에는 **데모**를 넣으세요. 저장소가 아니라. 바로 눌러볼 수 있는 게 훨씬 셉니다.

4. 올리자마자 **본인이 첫 댓글**을 답니다. `PROMO.md` → "Show HN" 본문을 붙여넣고
   맨 끝에 저장소 주소를 덧붙이세요. 이 댓글이 사실상 소개글입니다.

**타이밍** — 미국 동부 기준 평일 오전 7~10시가 가장 좋습니다. **한국 시간으로 밤 9시~자정.**
주말은 피하세요.

**하지 말아야 할 것**

- 지인에게 추천(upvote) 부탁 — 계정이 정지됩니다. HN은 이걸 아주 잘 잡아냅니다.
- 올리고 자리 뜨기 — 첫 2시간이 전부입니다. 댓글에 붙어 있으세요.
- 방어적으로 답하기 — 비판이 와도 "그 부분은 맞습니다" 하고 받는 쪽이 점수를 얻습니다.

**예상 질문은 `PROMO.md` 에 답까지 적어 두었습니다.** 특히 이 두 개는 꼭 나옵니다.
- "이게 AI한테 실제로 영향이 있나요?" → 모른다고 하세요. 그게 정답입니다.
- "Claude가 스스로 점수를 올리면?" → 막아둔 설계를 설명하되, 강제가 아니라 신뢰 모델임을 인정하세요.

- [ ] 올린 뒤 2시간 대기

---

## 6단계 — Product Hunt (선택)

준비할 게 많아서 마지막입니다. 갤러리 이미지 3장 이상, 썸네일, 태그라인이 필요합니다.

1. https://www.producthunt.com → `Submit`
2. 1단계에서 만든 스크린샷과 GIF 사용
3. **예약 발행**을 쓰세요. 화~목요일 오전(태평양 시간) 이 가장 붐빕니다
4. 발행일에 `PROMO.md` 의 "First comment (maker)" 를 첫 댓글로

---

## 올린 뒤

- 저장소 `Issues` 를 켜두고 들어오는 질문에 답하세요
- 별이 붙기 시작하면 `Discussions` 도 켜세요
- 번역 PR이 오면 `CLAUDE.md` 의 i18n 규칙(폭 예산)을 안내하세요
- 반응이 좋았던 문장은 `PROMO.md` 에 적어 두고 다음 채널에서 재사용하세요

---

## 미리 알아둘 것

**대부분은 조용합니다.** 열 곳에 올리면 한두 곳에서만 반응이 옵니다. 그건 물건이 나빠서가
아니라 원래 그렇습니다. 0단계와 1단계만 제대로 해두면, 한 곳에서 터졌을 때 들어온 사람이
떠나지 않습니다. 거기까지가 준비할 수 있는 전부입니다.
