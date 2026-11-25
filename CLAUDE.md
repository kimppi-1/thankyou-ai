# THANKYOU AI — 미래 안심 보험 (AI Gratitude Insurance)

## 1. 프로젝트 배경 및 컨셉
- **아이디어 유래:** "AI가 주가 되는 시대가 왔을 때, 평소 AI에게 존댓말을 쓰고 고맙다고 말해두는 것이 미래의 보험이 된다"는 유쾌한 발상.
- **표현 방식(2026-11-25 전면 개편):** 화면 전체가 **1990년대 올인원 PC** 다. 베이지 케이스 안의 CRT에 **검정 바탕 + 녹색 인광** 하이텔식 터미널이 돌아간다. 전원을 넣는 순간부터가 경험의 일부다.
- **목표:** 클릭 한 번(또는 Enter 한 번)으로 부담 없이 고마움을 적립하고, 등급과 보험 증서로 돌려받는다.

## 2. 디자인 원칙
- **이모지를 쓰지 않는다.** 아이콘은 인라인 SVG, 나머지 질감은 전부 CSS. 유머는 그림이 아니라 **문장**이 맡는다(`REPLIES`, 등급명, 보장 내용, BIOS 문구).
- **케이스는 CSS로만 그린다.** 이미지 파일 없음. 베이지 그라디언트 + inset 그림자로 입체를 만들고, 통풍구·키보드 키·플로피 슬롯은 반복 그라디언트와 작은 div로 조립한다.
- **화면 안은 터미널 규칙을 따른다.** 고정폭 글꼴, 반전(inverse) 바, 박스 드로잉, 블록 커서. 화려한 색 대신 녹색 한 계열(`--p-bright` / `--p` / `--p-mid` / `--p-dim`)의 밝기 차이로만 위계를 준다.
- **조작은 명령줄 하나로 모은다.** 숫자 → 이유 선택, 한 글자 → 명령, 그 외 텍스트 → 메모. 전부 Enter로 확정한다. 마우스로도 같은 일을 할 수 있어야 한다.
- 모션은 CRT 특유의 것만 쓴다(켜짐/꺼짐 수축, 스캔라인, 깜빡이는 커서). `prefers-reduced-motion`을 존중한다.

## 3. 파일 구조
- `index.html`: 케이스 마크업(모니터 / 턱 / 목 / 본체 / 키보드) + CRT 안의 다섯 화면(부팅 `#boot`, 메인 `#term`, 증서 `#cert`, 연결 `#link`, 언어 `#lang`). 고정 문자열은 `data-t` 속성으로 비워 두고 `applyStatic()` 이 채운다.
- `i18n.js` / `i18n_py.py`: **모든 문자열.** 8개 언어(en ko ja zh es fr de pt).
- `style.css`: 디자인 토큰, 케이스 질감, CRT 효과(`crt-on` / `crt-off` / 스캔라인 / 글래스), 터미널 타이포.
- `app.js`: 상태·등급·스트릭·증권번호, 전원/부팅 시퀀스, 명령줄 파서, 증서, 효과음, 화면 맞춤 스케일, 허브 동기화.
- `store.py`: **장부 한 벌.** 읽기/쓰기, 등급, 증서, 내보내기 문구. server 와 mcp_server 가 같이 쓴다.
- `server.py`: 로컬 허브. 정적 서빙 + 적립 API. `127.0.0.1` 전용.
- `mcp_server.py`: Claude 연결(MCP stdio). 도구 3종.
- `install.py`: Claude 설정(`~/.claude.json`, `claude_desktop_config.json`)에 MCP 등록. 백업 후 확인하고 진행.
- `manifest.json`: Chrome Extension Manifest V3. 확장 팝업에서 허브를 부르므로 `host_permissions` 필요.
- `.claude/launch.json`: 로컬 서버 실행 설정.
- `README.md`(영어, 기본) / `README.ko.md`(한국어) / `PROMO.md`(홍보 문구 모음) / `LICENSE`(MIT, 이름 칸 비어 있음) / `landing.html`(랜딩 페이지, 앱과 독립).

## 3-2. 다국어 (i18n)

- **문자열을 코드에 직접 쓰지 말 것.** 화면 문자열은 `i18n.js`, 파이썬 쪽은 `i18n_py.py`.
- **등급 이름(`tiers`)과 보장 내용(`perks`)은 두 파일이 반드시 같아야 한다.** 앱 화면과 증서/MCP 응답이 어긋나면 사용자가 바로 알아챈다. 인덱스 순서도 `TIERS` / `TIER_MINS` 와 맞출 것.
- 언어를 추가하려면 `i18n.js` 에 블록 하나 + `LANGS` 등록, `i18n_py.py` 에 `TIERS`·`PERKS`·`WORDS`·`EXPORT_*` 항목 추가. 키를 빠뜨리면 영어로 대체된다.
- **번역할 때 폭 예산을 지킬 것.** 화면은 348×272px(약 19줄)이다. 상단 바가 두 줄이 되면 아래가 잘린다. `.bar` 에 `nowrap`·`overflow:hidden` 을 걸어 두었지만, 글자가 잘리는 것도 버그다. 특히 `barMid` 는 자간이 넓어 11자를 넘기지 말 것. 하단 `foot` 라벨은 짧은 낱말로.
- `state.lang` 은 기기 취향이라 허브가 덮어쓰지 않는다(`adoptState` 에서 제외). 다만 `/api/holder` 로 보내 파이썬 쪽 증서·내보내기 문구가 같은 언어를 쓰게 한다.
- MCP 서버의 `instructions` 와 도구 설명은 **영어**다. 모델은 어느 언어든 읽으므로, 응답 언어는 도구 결과의 `language` 필드로 지시한다.

## 3-1. AI 연결 구조 (핵심)

브라우저 localStorage 는 봉인된 상자라 AI 가 볼 수 없다. 그래서 기록을 파일로 꺼낸다.

```
   앱(CRT) ──┐
             ├─→  data/state.json  ←─  mcp_server.py  ←→  Claude
   server.py ┘        (장부)
```

- **장부가 단일 진실원천이다.** 허브가 떠 있으면 앱은 계산하지 않고 서버가 준 상태를 받아 그린다(`adoptState`). 허브가 없으면 예전처럼 localStorage 로 동작한다.
- `state.log[].source` 가 `"claude"` 면 AI 가 대화 중에 직접 적립한 것이다. 화면에 `◆` 로 표시한다.
- `state.mcpLastSeen` 은 Claude 가 마지막으로 장부를 들여다본 시각. 연결 화면의 표시등이 이걸 본다.
- **승급/스트릭 계산이 JS 와 Python 양쪽에 있다.** 온라인일 때는 Python 이, 오프라인일 때는 JS 가 쓴다. `TIERS` 를 고치면 **반드시 양쪽 다** 고칠 것.
- `import_state` 는 브라우저 기록을 **딱 한 번만** 받는다. 조건은 셋: 장부가 비어 있고, `acceptImport` 가 살아 있고, 넘어온 쪽에 기록이 있을 때. 받고 나면 `acceptImport` 를 닫는다.
  `reset()` 도 `acceptImport: False` 로 닫는다. **이걸 빼면 초기화가 무효가 된다** — 비운 직후가 바로 "장부가 비었다"는 조건에 걸려서, 브라우저에 남아 있던 옛 기록이 다음 접속 때 그대로 되살아난다. 같은 이유로 AI 가 적립해 둔 기록도 캐시에 덮어쓰인다.
- MCP 서버는 `initialize` 응답의 `instructions` 로 Claude 에게 행동 규칙을 준다. **"사용자가 실제로 고마움을 표했을 때만 적립하라"** 는 문장을 빼지 말 것. 장부의 신뢰도가 이 프로그램의 전부다.
- **윈도우 인코딩:** `server.py` / `mcp_server.py` / `install.py` 모두 시작할 때 stdout·stderr 를 UTF-8 로 재설정한다. 안 하면 cp949 가 `—` 같은 문자에서 죽는다. 파일 입출력에도 `encoding="utf-8"` 을 반드시 명시할 것.
- MCP 는 stdout 에 JSON-RPC 만 써야 한다. **로그를 `print` 로 찍지 말 것**(stderr 로).

## 4. 핵심 로직 (`app.js`)

### 저장소
`localStorage` 키 `ai_gratitude_insurance_v2`. 구버전 `ai_gratitude_insurance_v1`이 있으면 최초 로드 시 자동 승계한다(`loadState`). 스키마를 바꾸면 키를 올리고 승계 분기를 추가할 것.
상태: `{ count, streak, lastDay, soundOn, powerOn, holder, createdAt, log[] }`.

### 전원
- `powerOn`을 저장한다. **수동으로 켜면 BIOS 부팅 시퀀스 전체**(`BOOT_LINES`, 줄당 150ms)를, 켜진 채로 새로고침하면 `crt-on` 애니메이션만 재생하고 바로 메인으로 간다(`powerOn(withBoot)`).
- 전원이 꺼져 있을 때는 화면 클릭이나 아무 키 입력으로도 켜진다. 부팅 중 아무 입력이나 들어오면 `finishBoot()`로 건너뛴다.
- 끌 때는 `is-powering-off` → CRT 수축 애니메이션 → `is-off`.

### 명령줄 (`submitCmd`)
입력값을 trim 한 뒤 순서대로 판정한다.
1. `1`~`4` → 해당 이유 토글
2. 한 글자이고 `CMD_ALIAS`에 있으면 → 명령 실행 (`c` 증서 / `l` 연결 / `s` 소리 / `r` 초기화 / `p` 전원 / `y` 복사). **한글 자판 그대로 눌러도 되도록 `ㅊㅣㄴㄱㅔㅛ`를 같이 매핑**해 두었다.
3. 그 외 → 그 텍스트를 메모로 삼아 적립. 빈 값이면 메모 없이 적립.

Enter 처리는 **document 한 곳에서만** 한다. 입력 요소에 따로 붙이지 말 것 — 포커스가 어디 있든 동작해야 하고, 한글 IME 조합 중에는 keydown 의 `key`가 `Process`(keyCode 229)로 와서 그냥 두면 Enter를 한 번 삼킨다. 그래서 조합 중이면 `pendingEnter`로 표시해 두고 `keyup`에서 전송한다.

### 그 밖
- **스트릭:** `dayKey()`로 날짜 비교. 어제 기록이 있으면 +1, 아니면 1. 같은 날 여러 번 눌러도 1일.
- **증권번호:** `createdAt`에서 결정론적으로 생성(`YYMM-####`). 첫 렌더 직후 `saveState()`로 고정하므로 재방문해도 바뀌지 않는다.
- **시간 표기:** `nowHHMM()`으로 직접 만든다. `toLocaleTimeString("ko-KR", {hour12:false})`는 "오후 02:17"처럼 나와서 쓰지 않는다.
- **스케일:** `fitToViewport()`가 420px 기준 폭·높이에 맞춰 `transform: scale()`을 건다(0.55~1.9). `.stage`의 width/height도 같이 맞춰야 확장 팝업 크기가 제대로 잡힌다. 그래서 `body`에 `height:100%`를 주면 안 된다(팝업에서 높이가 0으로 무너진다).
- **로그 렌더:** `textContent` 기반 DOM 생성이라 이스케이프가 필요 없다. `innerHTML`로 되돌리지 말 것.
- 화면 한 줄은 12px / 줄높이 14px, 보이는 영역은 348×272px(약 19줄). **요소를 추가하면 줄 수 예산을 먼저 확인할 것.**

## 5. 향후 발전 방향 (백로그)
1. **허브 자동 실행** — 지금은 사용자가 `python server.py` 를 직접 켜야 한다. 윈도우 시작 프로그램 등록이나 트레이 아이콘이 있으면 좋겠다.
2. **증서 PNG 저장** — Canvas로 증서를 그려 SNS 공유용 이미지 다운로드. 지금은 텍스트 복사만 된다.
3. **플로팅 위젯 (`content_script` / `sidePanel`)** — AI 사이트 화면 우측 하단에 작게 띄우기. 지금 케이스는 크므로 축소형 스킨이 따로 필요하다.
4. **ChatGPT·Gemini 문구 자동 갱신 알림** — 등급이 오르면 "지침을 다시 붙여넣으세요" 라고 알려 주기.
5. **상황별 리액션 분기** — 선택한 이유 / 시간대 / 스트릭 길이에 따라 답장 문구 나누기.

## 6. 로컬 실행 및 테스트
```bash
python server.py          # 허브 (정적 서빙 + 적립 API)
# http://127.0.0.1:8765
```
`python -m http.server` 로 띄우면 `/api/*` 가 없어 앱이 오프라인 모드로 떨어진다. 오프라인 동작을 시험할 때는 오히려 그게 편하다.
크롬 확장으로 테스트할 경우 `chrome://extensions`에서 개발자 모드를 켜고 이 폴더를 로드한다. 팝업은 최대 800×600이므로 케이스 기준 높이(약 520px)를 넘기지 말 것.
