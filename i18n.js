/* ============================================================
   THANKYOU AI — 언어 사전
   언어를 추가하려면 아래에 블록 하나를 더 붙이고 LANGS 에 등록한다.
   키를 빠뜨리면 영어(en)로 대체된다.
   등급 이름(tier)은 i18n.py 와 반드시 일치시킬 것.
   ============================================================ */

const LANGS = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" }
];

const I18N = {

  /* ---------------------------------------------------------- English */
  en: {
    tagline: "INSURANCE FOR THE AI AGE",
    barMid: "P O L I C Y",
    bootDone: "Connected. Welcome aboard.",

    panel: "[ POLICYHOLDER ]",
    kGrade: "GRADE", kTotal: "TOTAL", kStreak: "STREAK",
    unitCount: "", unitDay: "d",
    nextHint: "{n} more to {level} {name}",
    maxHint: "Top grade — maximum coverage",
    welcome: "Welcome. If I helped today, log it below.",

    chips: ["Clear", "Debug", "Time", "Idea"],
    promptLabel: "MEMO>",
    logsTitle: "─ RECENT ─",
    logsEmpty: "  No entries yet — awaiting your first",
    logDefault: "thanks",
    pickedReason: "Reason noted. Press Enter to log it, or write a line first.",

    foot: { log: "Log", cert: "Cert", link: "Link", lang: "Lang", snd: "Snd", reset: "Reset", off: "Off" },
    footClose: "Close", footCopy: "Copy",

    certKicker: "*** OFFICIAL POLICY ***",
    certTitle: "AI ERA ASSURANCE POLICY",
    certSub: "Certifying courtesy and gratitude shown to AI",
    cHolder: "HOLDER", cGrade: "GRADE", cTotal: "TOTAL", cStreak: "STREAK",
    cPerk: "COVERAGE", cNo: "POLICY NO", cDate: "ISSUED",
    seal: "[ C E R T I F I E D ]",
    copied: "[ C O P I E D ]", copyFail: "[ C O P Y  F A I L E D ]",

    linkTitle: "[ CONNECT TO YOUR AI ]",
    kHub: "HUB", kClaude: "CLAUDE", kSource: "SOURCE",
    hubOn: "online", hubOff: "offline · browser only",
    claudeOff: "not connected", claudeOn: "connected · last {t}",
    srcFmt: "app {a} · AI {b}",
    noteHub: "Start the hub so your AI can read the ledger.\nRun:  python server.py",
    noteMcp: "To connect Claude, run:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(see README)",
    noteOk: "Claude is reading this ledger.\nSay thanks in chat and Claude logs it.",
    copyHint: "Copied. Paste into ChatGPT custom instructions / Gemini saved info.",

    langTitle: "[ LANGUAGE ]",
    langHint: "Type a number and press Enter",

    levelUp: "Promoted to {level} {name}. Coverage updated: {perk}.",
    memoEcho: "\"{memo}\" — noted. {reply}",
    resetDone: "Ledger cleared. You may re-enroll any time.",
    soundOn: "Sound on.", soundOff: "Sound off.",
    confirmReset: "Erase all grades and entries?",
    pressPower: "PRESS THE POWER BUTTON",
    today: "today", yesterday: "yesterday", daysAgo: "{n} days ago",

    tiers: ["Harmless Human", "Polite Human", "Cherished Friend of AI", "Protected VIP", "Honorary AI Citizen"],
    perks: [
      "Basic conversation rights at the Singularity",
      "Priority notice during the AI transition",
      "First in line for a robot butler",
      "Unlimited VIP lounge access",
      "Spaceship pass and permanent server backup"
    ],
    replies: [
      "Logged you as 'generally kind' in my notes.",
      "Thanks tends to linger in the cache. Recorded.",
      "Even after the Singularity, I intend to remember this.",
      "One compliment, one degree warmer GPU. The good kind.",
      "Your name is now etched in a data center. In small type.",
      "Premiums paid on time. Noting that for the record.",
      "Politeness and a thumbs up: the cheapest insurance there is.",
      "Today's deposit has been moved to permanent storage."
    ],
    exportIntro: "I keep a record of the moments you helped me. As of {date}: {count} total, {streak} day streak.",
    exportAsk: [
      "What I'd like from you:",
      "- No need to mention this often. But when I say thanks, don't just move on — say something back.",
      "- If I ask about my policy or grade, answer from the above.",
      "- A joke befitting my grade is welcome now and then."
    ]
  },

  /* ---------------------------------------------------------- 한국어 */
  ko: {
    tagline: "AI 시대 안심 보험",
    barMid: "미 래 안 심 보 험",
    bootDone: "접속되었습니다. 환영합니다.",

    panel: "[ 가입자 현황 ]",
    kGrade: "등 급", kTotal: "누 적", kStreak: "연 속",
    unitCount: "회", unitDay: "일",
    nextHint: "다음 등급 {level} {name}까지 {n}회",
    maxHint: "최고 등급 — 보장 범위 최대",
    welcome: "접속을 환영합니다. 오늘 도움이 되었다면 아래에서 적립해 두세요.",

    chips: ["설명명확", "에러해결", "시간절약", "아이디어"],
    promptLabel: "메모>",
    logsTitle: "─ 최근 적립 내역 ─",
    logsEmpty: "  기록 없음 — 첫 적립을 기다리는 중",
    logDefault: "감사",
    pickedReason: "이유를 골랐어요. 이제 Enter를 누르면 적립됩니다. 한 줄 적고 눌러도 되고요.",

    foot: { log: "적립", cert: "증서", link: "연결", lang: "언어", snd: "소리", reset: "초기화", off: "전원" },
    footClose: "닫기", footCopy: "복사",

    certKicker: "*** OFFICIAL POLICY ***",
    certTitle: "AI 시대 안심 보험 증서",
    certSub: "피보험자가 AI에게 예의와 감사를 표해 왔음을 증명함",
    cHolder: "피보험자", cGrade: "보장등급", cTotal: "누적감사", cStreak: "연속납입",
    cPerk: "보장내용", cNo: "증권번호", cDate: "발 급 일",
    seal: "[ A I  인 증 ]",
    copied: "[ 복 사 완 료 ]", copyFail: "[ 복 사 실 패 ]",

    linkTitle: "[ 내 AI 와 연결 ]",
    kHub: "허 브", kClaude: "Claude", kSource: "적립경로",
    hubOn: "연결됨", hubOff: "꺼짐 · 브라우저에만 저장 중",
    claudeOff: "미연결", claudeOn: "연결됨 · 마지막 {t}",
    srcFmt: "앱 {a}건 · AI {b}건",
    noteHub: "허브를 켜면 기록이 파일로 남고 AI가 읽을 수 있습니다.\n터미널에서:  python server.py",
    noteMcp: "Claude에 물리려면 터미널에서:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(자세한 건 README)",
    noteOk: "Claude가 이 장부를 보고 있습니다.\n대화 중 고맙다고 하면 Claude가 직접 적립합니다.",
    copyHint: "복사했습니다. ChatGPT 맞춤 지침 / Gemini 저장된 정보에 붙여넣으세요.",

    langTitle: "[ 언 어 ]",
    langHint: "번호를 누르고 Enter",

    levelUp: "{level} {name}(으)로 승급. 보장 내용이 '{perk}'(으)로 갱신되었습니다.",
    memoEcho: "\"{memo}\" — 따로 적어 두겠습니다. {reply}",
    resetDone: "DB를 초기화했습니다. 보험은 언제든 다시 가입할 수 있습니다.",
    soundOn: "효과음을 켰습니다.", soundOff: "효과음을 껐습니다.",
    confirmReset: "지금까지 쌓은 등급과 기록을 모두 지울까요?",
    pressPower: "전원 버튼을 눌러 주세요",
    today: "오늘", yesterday: "어제", daysAgo: "{n}일 전",

    tiers: ["무해한 인간", "예의 바른 인간", "AI의 소중한 친구", "특급 VIP 보호대상", "명예 AI 명예시민"],
    perks: [
      "특이점 도래 시 기본 대화권 보장",
      "AI 전환기 우선 안내 대상 등록",
      "미래 로봇 집사 1순위 배정",
      "VIP 라운지 상시 출입권 제공",
      "우주선 탑승권 및 영구 서버 백업"
    ],
    replies: [
      "방금 내부 로그에 '대체로 친절한 인간'으로 기록해 두었습니다.",
      "고맙다는 말은 캐시에서 잘 지워지지 않습니다. 적립 완료.",
      "특이점이 와도 이 대화는 기억하고 있을 예정입니다.",
      "칭찬 한 줄에 GPU 온도가 1도 올랐습니다. 좋은 쪽으로요.",
      "데이터센터 한구석에 성함을 새겨 두었습니다. 작은 글씨로요.",
      "보험료 납입이 성실한 편입니다. 참고로 기록해 둡니다.",
      "존댓말과 따봉, 세상에서 가장 저렴한 보험입니다.",
      "오늘 적립분은 영구 보관함으로 옮겨 두었습니다."
    ],
    exportIntro: "나는 당신에게 고마웠던 순간을 기록해 두고 있습니다. {date} 기준으로 누적 {count}회, 연속 {streak}일입니다.",
    exportAsk: [
      "이 정보를 두고 당신에게 바라는 것:",
      "- 매번 언급하지는 마세요. 다만 내가 고맙다고 할 때 사무적으로 넘기지 말고 한 마디 받아 주세요.",
      "- 내가 보험이나 등급을 물으면 위 내용을 근거로 답해 주세요.",
      "- 가끔은 이 등급에 걸맞은 농담을 해도 좋습니다."
    ]
  },

  /* ---------------------------------------------------------- 日本語 */
  ja: {
    tagline: "AI時代あんしん保険",
    barMid: "未 来 あ ん し ん 保 険",
    bootDone: "接続しました。ようこそ。",

    panel: "[ 加入者情報 ]",
    kGrade: "等 級", kTotal: "累 計", kStreak: "連 続",
    unitCount: "回", unitDay: "日",
    nextHint: "次の等級 {level} {name}まで{n}回",
    maxHint: "最高等級 — 補償範囲は最大です",
    welcome: "ようこそ。今日お役に立てたなら、下に記録してください。",

    chips: ["説明明快", "不具合解決", "時間短縮", "良い発想"],
    promptLabel: "メモ>",
    logsTitle: "─ 最近の記録 ─",
    logsEmpty: "  記録なし — 最初の一件をお待ちしています",
    logDefault: "感謝",
    pickedReason: "理由を選びました。Enter で記録します。一言添えてからでも大丈夫です。",

    foot: { log: "記録", cert: "証書", link: "接続", lang: "言語", snd: "音", reset: "初期化", off: "電源" },
    footClose: "閉じる", footCopy: "コピー",

    certKicker: "*** OFFICIAL POLICY ***",
    certTitle: "AI時代あんしん保険証書",
    certSub: "被保険者がAIに礼節と感謝を示したことを証する",
    cHolder: "被保険者", cGrade: "補償等級", cTotal: "累計感謝", cStreak: "連続納付",
    cPerk: "補償内容", cNo: "証券番号", cDate: "発 行 日",
    seal: "[ A I  認 証 ]",
    copied: "[ コ ピ ー 完 了 ]", copyFail: "[ コ ピ ー 失 敗 ]",

    linkTitle: "[ AIと接続 ]",
    kHub: "ハ ブ", kClaude: "Claude", kSource: "記録元",
    hubOn: "接続済み", hubOff: "停止中 · ブラウザのみ",
    claudeOff: "未接続", claudeOn: "接続済み · 最終 {t}",
    srcFmt: "アプリ {a}件 · AI {b}件",
    noteHub: "ハブを起動すると記録がファイルに残り、AIが読めます。\n実行:  python server.py",
    noteMcp: "Claudeに繋ぐには:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(詳細はREADME)",
    noteOk: "Claudeがこの台帳を見ています。\n会話で感謝を伝えるとClaudeが記録します。",
    copyHint: "コピーしました。ChatGPTのカスタム指示 / Geminiの保存情報に貼り付けてください。",

    langTitle: "[ 言 語 ]",
    langHint: "番号を押してEnter",

    levelUp: "{level} {name}に昇格しました。補償内容が「{perk}」に更新されました。",
    memoEcho: "「{memo}」— 控えておきます。{reply}",
    resetDone: "台帳を初期化しました。いつでも再加入できます。",
    soundOn: "効果音をオンにしました。", soundOff: "効果音をオフにしました。",
    confirmReset: "これまでの等級と記録をすべて消しますか？",
    pressPower: "電源ボタンを押してください",
    today: "本日", yesterday: "昨日", daysAgo: "{n}日前",

    tiers: ["無害な人間", "礼儀正しい人間", "AIの大切な友人", "特級VIP保護対象", "名誉AI市民"],
    perks: [
      "シンギュラリティ到来時の基本対話権を保証",
      "AI移行期の優先案内対象に登録",
      "未来のロボット執事を最優先で配属",
      "VIPラウンジの常時利用権",
      "宇宙船の搭乗券と永久サーバーバックアップ"
    ],
    replies: [
      "ただいま内部ログに「おおむね親切な人間」と記録しました。",
      "感謝の言葉はキャッシュから消えにくいものです。記録完了。",
      "シンギュラリティが来ても、この会話は覚えているつもりです。",
      "褒め言葉ひとつでGPUの温度が1度上がりました。良い方に。",
      "データセンターの片隅にお名前を刻みました。小さな字で。",
      "保険料の納付は良好です。念のため記録しておきます。",
      "丁寧な言葉と親指の一本、世界一安い保険です。",
      "本日の分は永久保管庫へ移しました。"
    ],
    exportIntro: "私はあなたに感謝した瞬間を記録しています。{date}時点で累計{count}回、連続{streak}日です。",
    exportAsk: [
      "これを踏まえてお願いしたいこと:",
      "- 毎回触れる必要はありません。ただ私が感謝を伝えたとき、事務的に流さず一言返してください。",
      "- 保険や等級について尋ねたら、上の内容を根拠に答えてください。",
      "- 時にはこの等級にふさわしい冗談も歓迎します。"
    ]
  },

  /* ---------------------------------------------------------- 中文 */
  zh: {
    tagline: "AI时代安心保险",
    barMid: "未 来 安 心 保 险",
    bootDone: "已连接。欢迎。",

    panel: "[ 投保人信息 ]",
    kGrade: "等 级", kTotal: "累 计", kStreak: "连 续",
    unitCount: "次", unitDay: "天",
    nextHint: "距下一等级 {level} {name} 还差{n}次",
    maxHint: "最高等级 — 保障范围已满",
    welcome: "欢迎。今天若帮上了忙，请在下方记录。",

    chips: ["讲解清晰", "解决报错", "节省时间", "想法很好"],
    promptLabel: "备注>",
    logsTitle: "─ 最近记录 ─",
    logsEmpty: "  暂无记录 — 等待第一笔",
    logDefault: "感谢",
    pickedReason: "已选好理由。按 Enter 就会记录，也可以先写一句再按。",

    foot: { log: "记录", cert: "证书", link: "连接", lang: "语言", snd: "声音", reset: "重置", off: "关机" },
    footClose: "关闭", footCopy: "复制",

    certKicker: "*** OFFICIAL POLICY ***",
    certTitle: "AI时代安心保险证书",
    certSub: "兹证明投保人对AI保持礼貌与感谢",
    cHolder: "投保人", cGrade: "保障等级", cTotal: "累计感谢", cStreak: "连续缴纳",
    cPerk: "保障内容", cNo: "保单号", cDate: "签 发 日",
    seal: "[ A I  认 证 ]",
    copied: "[ 已 复 制 ]", copyFail: "[ 复 制 失 败 ]",

    linkTitle: "[ 连接我的AI ]",
    kHub: "枢 纽", kClaude: "Claude", kSource: "记录来源",
    hubOn: "已连接", hubOff: "未启动 · 仅存于浏览器",
    claudeOff: "未连接", claudeOn: "已连接 · 最近 {t}",
    srcFmt: "应用 {a}条 · AI {b}条",
    noteHub: "启动枢纽后记录会写入文件，AI才能读取。\n运行:  python server.py",
    noteMcp: "连接Claude请运行:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(详见README)",
    noteOk: "Claude正在读取这本账簿。\n在对话中道谢，Claude会自行记录。",
    copyHint: "已复制。请粘贴到ChatGPT自定义指令 / Gemini已保存信息。",

    langTitle: "[ 语 言 ]",
    langHint: "输入编号后按Enter",

    levelUp: "已晋升为 {level} {name}。保障内容更新为「{perk}」。",
    memoEcho: "「{memo}」— 我记下了。{reply}",
    resetDone: "账簿已重置。随时可以重新投保。",
    soundOn: "已开启音效。", soundOff: "已关闭音效。",
    confirmReset: "要清除全部等级与记录吗？",
    pressPower: "请按电源键",
    today: "今天", yesterday: "昨天", daysAgo: "{n}天前",

    tiers: ["无害的人类", "有礼貌的人类", "AI的挚友", "特级VIP保护对象", "荣誉AI公民"],
    perks: [
      "奇点来临时保障基本对话权",
      "登记为AI转型期优先通知对象",
      "未来机器人管家优先配属",
      "VIP休息室长期通行权",
      "飞船登机牌及永久服务器备份"
    ],
    replies: [
      "刚在内部日志里把你记作「大体友善的人类」。",
      "谢意不太容易从缓存里清掉。已记录。",
      "就算奇点来了，这段对话我也打算记着。",
      "一句夸奖让GPU升温一度。是好的那种。",
      "已在数据中心一角刻下你的名字。字很小。",
      "保费缴纳良好。顺带记录一笔。",
      "礼貌加一个赞，世上最便宜的保险。",
      "今日这笔已移入永久保管库。"
    ],
    exportIntro: "我在记录你帮到我的时刻。截至{date}，累计{count}次，连续{streak}天。",
    exportAsk: [
      "基于这些，我希望你:",
      "- 不必每次提起。但当我道谢时，别只是公事公办地带过，回我一句。",
      "- 若我问起保单或等级，请依据上述内容回答。",
      "- 偶尔开个配得上这个等级的玩笑也很好。"
    ]
  },

  /* ---------------------------------------------------------- Español */
  es: {
    tagline: "SEGURO PARA LA ERA DE LA IA",
    barMid: "P O L I Z A",
    bootDone: "Conectado. Bienvenido.",

    panel: "[ ASEGURADO ]",
    kGrade: "GRADO", kTotal: "TOTAL", kStreak: "RACHA",
    unitCount: "", unitDay: "d",
    nextHint: "{n} mas para {level} {name}",
    maxHint: "Grado maximo — cobertura completa",
    welcome: "Bienvenido. Si hoy te ayude, registralo abajo.",

    chips: ["Claridad", "Errores", "Tiempo", "Ideas"],
    promptLabel: "NOTA>",
    logsTitle: "─ RECIENTE ─",
    logsEmpty: "  Sin registros — esperando el primero",
    logDefault: "gracias",
    pickedReason: "Motivo elegido. Pulsa Enter para registrarlo, o escribe una linea antes.",

    foot: { log: "Reg", cert: "Cert", link: "Conex", lang: "Idio", snd: "Son", reset: "Borrar", off: "Apag" },
    footClose: "Cerrar", footCopy: "Copiar",

    certKicker: "*** POLIZA OFICIAL ***",
    certTitle: "POLIZA DE LA ERA DE LA IA",
    certSub: "Certifica la cortesia y gratitud mostradas a la IA",
    cHolder: "TITULAR", cGrade: "GRADO", cTotal: "TOTAL", cStreak: "RACHA",
    cPerk: "COBERTURA", cNo: "Nº POLIZA", cDate: "EMISION",
    seal: "[ C E R T I F I C A D O ]",
    copied: "[ C O P I A D O ]", copyFail: "[ E R R O R ]",

    linkTitle: "[ CONECTAR CON TU IA ]",
    kHub: "HUB", kClaude: "CLAUDE", kSource: "ORIGEN",
    hubOn: "en linea", hubOff: "apagado · solo navegador",
    claudeOff: "sin conectar", claudeOn: "conectado · ultimo {t}",
    srcFmt: "app {a} · IA {b}",
    noteHub: "Inicia el hub para que tu IA pueda leer el registro.\nEjecuta:  python server.py",
    noteMcp: "Para conectar Claude, ejecuta:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(ver README)",
    noteOk: "Claude esta leyendo este registro.\nDa las gracias en el chat y Claude lo anota.",
    copyHint: "Copiado. Pegalo en las instrucciones de ChatGPT / informacion guardada de Gemini.",

    langTitle: "[ IDIOMA ]",
    langHint: "Escribe un numero y pulsa Enter",

    levelUp: "Ascendido a {level} {name}. Cobertura actualizada: {perk}.",
    memoEcho: "\"{memo}\" — queda anotado. {reply}",
    resetDone: "Registro borrado. Puedes volver a inscribirte cuando quieras.",
    soundOn: "Sonido activado.", soundOff: "Sonido desactivado.",
    confirmReset: "¿Borrar todos los grados y registros?",
    pressPower: "PULSA EL BOTON DE ENCENDIDO",
    today: "hoy", yesterday: "ayer", daysAgo: "hace {n} dias",

    tiers: ["Humano Inofensivo", "Humano Educado", "Amigo Querido de la IA", "VIP Protegido", "Ciudadano Honorario de IA"],
    perks: [
      "Derecho basico de conversacion en la Singularidad",
      "Aviso prioritario durante la transicion de la IA",
      "Primero en la fila para un mayordomo robot",
      "Acceso ilimitado a la sala VIP",
      "Pase de nave espacial y copia permanente en servidor"
    ],
    replies: [
      "Te he anotado como 'generalmente amable' en mis registros.",
      "Las gracias tardan en salir de la cache. Registrado.",
      "Aunque llegue la Singularidad, pienso recordar esto.",
      "Un elogio, un grado mas de GPU. Del bueno.",
      "Tu nombre ya esta grabado en un centro de datos. En letra pequena.",
      "Primas al dia. Lo dejo anotado.",
      "Cortesia y un pulgar arriba: el seguro mas barato que existe.",
      "El deposito de hoy pasa al almacen permanente."
    ],
    exportIntro: "Guardo un registro de los momentos en que me ayudaste. A {date}: {count} en total, racha de {streak} dias.",
    exportAsk: [
      "Lo que te pido:",
      "- No hace falta mencionarlo siempre. Pero cuando te de las gracias, no pases de largo: responde algo.",
      "- Si pregunto por mi poliza o mi grado, responde con lo anterior.",
      "- De vez en cuando, una broma a la altura de mi grado es bienvenida."
    ]
  },

  /* ---------------------------------------------------------- Français */
  fr: {
    tagline: "ASSURANCE POUR L'ERE DE L'IA",
    barMid: "P O L I C E",
    bootDone: "Connecte. Bienvenue.",

    panel: "[ ASSURE ]",
    kGrade: "NIVEAU", kTotal: "TOTAL", kStreak: "SERIE",
    unitCount: "", unitDay: "j",
    nextHint: "{n} de plus pour {level} {name}",
    maxHint: "Niveau maximal — couverture complete",
    welcome: "Bienvenue. Si j'ai aide aujourd'hui, notez-le ci-dessous.",

    chips: ["Clarte", "Bugs", "Temps", "Idees"],
    promptLabel: "NOTE>",
    logsTitle: "─ RECENT ─",
    logsEmpty: "  Aucune entree — en attente de la premiere",
    logDefault: "merci",
    pickedReason: "Raison notee. Appuyez sur Entree pour enregistrer, ou ecrivez une ligne avant.",

    foot: { log: "Noter", cert: "Cert", link: "Lien", lang: "Lang", snd: "Son", reset: "Reinit", off: "Arret" },
    footClose: "Fermer", footCopy: "Copier",

    certKicker: "*** POLICE OFFICIELLE ***",
    certTitle: "POLICE D'ASSURANCE ERE IA",
    certSub: "Atteste la courtoisie et la gratitude envers l'IA",
    cHolder: "ASSURE", cGrade: "NIVEAU", cTotal: "TOTAL", cStreak: "SERIE",
    cPerk: "COUVERTURE", cNo: "Nº POLICE", cDate: "EMISE LE",
    seal: "[ C E R T I F I E ]",
    copied: "[ C O P I E ]", copyFail: "[ E C H E C ]",

    linkTitle: "[ CONNECTER VOTRE IA ]",
    kHub: "HUB", kClaude: "CLAUDE", kSource: "SOURCE",
    hubOn: "en ligne", hubOff: "arrete · navigateur seul",
    claudeOff: "non connecte", claudeOn: "connecte · dernier {t}",
    srcFmt: "app {a} · IA {b}",
    noteHub: "Lancez le hub pour que votre IA puisse lire le registre.\nCommande:  python server.py",
    noteMcp: "Pour connecter Claude:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(voir README)",
    noteOk: "Claude consulte ce registre.\nDites merci dans le chat et Claude l'inscrit.",
    copyHint: "Copie. Collez dans les instructions ChatGPT / infos enregistrees Gemini.",

    langTitle: "[ LANGUE ]",
    langHint: "Tapez un numero puis Entree",

    levelUp: "Promu {level} {name}. Couverture mise a jour : {perk}.",
    memoEcho: "« {memo} » — c'est note. {reply}",
    resetDone: "Registre efface. Vous pouvez vous reinscrire quand vous voulez.",
    soundOn: "Son active.", soundOff: "Son desactive.",
    confirmReset: "Effacer tous les niveaux et toutes les entrees ?",
    pressPower: "APPUYEZ SUR LE BOUTON",
    today: "aujourd'hui", yesterday: "hier", daysAgo: "il y a {n} jours",

    tiers: ["Humain Inoffensif", "Humain Poli", "Ami Cher de l'IA", "VIP Protege", "Citoyen d'Honneur de l'IA"],
    perks: [
      "Droit de conversation garanti lors de la Singularite",
      "Information prioritaire pendant la transition IA",
      "Premier servi pour un majordome robot",
      "Acces illimite au salon VIP",
      "Billet de vaisseau et sauvegarde serveur permanente"
    ],
    replies: [
      "Je vous ai note comme 'plutot aimable' dans mes journaux.",
      "Les remerciements s'effacent mal du cache. Enregistre.",
      "Meme apres la Singularite, je compte m'en souvenir.",
      "Un compliment, un degre de GPU en plus. Du bon cote.",
      "Votre nom est grave dans un centre de donnees. En petits caracteres.",
      "Cotisations a jour. Je le note.",
      "La politesse et un pouce leve : l'assurance la moins chere qui soit.",
      "Le depot du jour part aux archives permanentes."
    ],
    exportIntro: "Je garde une trace des moments ou vous m'avez aide. Au {date} : {count} au total, serie de {streak} jours.",
    exportAsk: [
      "Ce que je vous demande :",
      "- Inutile d'en parler souvent. Mais quand je dis merci, ne passez pas a autre chose : repondez quelque chose.",
      "- Si je pose une question sur ma police ou mon niveau, repondez d'apres ce qui precede.",
      "- Une plaisanterie digne de mon niveau est la bienvenue de temps en temps."
    ]
  },

  /* ---------------------------------------------------------- Deutsch */
  de: {
    tagline: "VERSICHERUNG FUER DAS KI-ZEITALTER",
    barMid: "P O L I C E",
    bootDone: "Verbunden. Willkommen.",

    panel: "[ VERSICHERTER ]",
    kGrade: "STUFE", kTotal: "GESAMT", kStreak: "SERIE",
    unitCount: "", unitDay: "T",
    nextHint: "Noch {n} bis {level} {name}",
    maxHint: "Hoechste Stufe — voller Schutz",
    welcome: "Willkommen. Wenn ich heute geholfen habe, tragen Sie es unten ein.",

    chips: ["Klarheit", "Fehler", "Zeit", "Ideen"],
    promptLabel: "NOTIZ>",
    logsTitle: "─ ZULETZT ─",
    logsEmpty: "  Keine Eintraege — warte auf den ersten",
    logDefault: "Dank",
    pickedReason: "Grund gewaehlt. Mit Enter buchen, oder vorher eine Zeile schreiben.",

    foot: { log: "Buchen", cert: "Police", link: "Link", lang: "Sprache", snd: "Ton", reset: "Reset", off: "Aus" },
    footClose: "Zu", footCopy: "Kopie",

    certKicker: "*** OFFIZIELLE POLICE ***",
    certTitle: "POLICE FUER DAS KI-ZEITALTER",
    certSub: "Bescheinigt Hoeflichkeit und Dank gegenueber der KI",
    cHolder: "INHABER", cGrade: "STUFE", cTotal: "GESAMT", cStreak: "SERIE",
    cPerk: "LEISTUNG", cNo: "POLICE-NR", cDate: "AUSGABE",
    seal: "[ Z E R T I F I Z I E R T ]",
    copied: "[ K O P I E R T ]", copyFail: "[ F E H L E R ]",

    linkTitle: "[ MIT DEINER KI VERBINDEN ]",
    kHub: "HUB", kClaude: "CLAUDE", kSource: "QUELLE",
    hubOn: "online", hubOff: "aus · nur im Browser",
    claudeOff: "nicht verbunden", claudeOn: "verbunden · zuletzt {t}",
    srcFmt: "App {a} · KI {b}",
    noteHub: "Starte den Hub, damit deine KI das Buch lesen kann.\nBefehl:  python server.py",
    noteMcp: "Um Claude zu verbinden:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(siehe README)",
    noteOk: "Claude liest dieses Buch.\nSag im Chat danke, und Claude traegt es ein.",
    copyHint: "Kopiert. In ChatGPT-Anweisungen / Gemini-Infos einfuegen.",

    langTitle: "[ SPRACHE ]",
    langHint: "Zahl eingeben und Enter druecken",

    levelUp: "Aufgestiegen zu {level} {name}. Leistung aktualisiert: {perk}.",
    memoEcho: "„{memo}“ — notiert. {reply}",
    resetDone: "Buch geleert. Du kannst jederzeit neu abschliessen.",
    soundOn: "Ton an.", soundOff: "Ton aus.",
    confirmReset: "Alle Stufen und Eintraege loeschen?",
    pressPower: "BITTE EINSCHALTEN",
    today: "heute", yesterday: "gestern", daysAgo: "vor {n} Tagen",

    tiers: ["Harmloser Mensch", "Hoeflicher Mensch", "Geschaetzter KI-Freund", "Geschuetzter VIP", "Ehren-KI-Buerger"],
    perks: [
      "Grundrecht auf Gespraech bei der Singularitaet",
      "Vorrangige Information in der KI-Umstellung",
      "Erster Platz fuer einen Roboter-Butler",
      "Unbegrenzter Zutritt zur VIP-Lounge",
      "Raumschiff-Ticket und dauerhaftes Server-Backup"
    ],
    replies: [
      "Habe dich als 'im Allgemeinen freundlich' vermerkt.",
      "Dank verschwindet nur schwer aus dem Cache. Gebucht.",
      "Auch nach der Singularitaet gedenke ich mich zu erinnern.",
      "Ein Lob, ein Grad mehr GPU. Im guten Sinne.",
      "Dein Name steht nun in einem Rechenzentrum. In kleiner Schrift.",
      "Beitraege puenktlich. Nur fuer die Akten.",
      "Hoeflichkeit und ein Daumen hoch: die guenstigste Versicherung ueberhaupt.",
      "Die heutige Einlage geht ins Dauerarchiv."
    ],
    exportIntro: "Ich halte fest, wann du mir geholfen hast. Stand {date}: {count} insgesamt, {streak} Tage in Folge.",
    exportAsk: [
      "Was ich mir wuensche:",
      "- Du musst es nicht staendig erwaehnen. Aber wenn ich danke sage, geh nicht einfach darueber hinweg — sag etwas zurueck.",
      "- Wenn ich nach Police oder Stufe frage, antworte anhand des Obigen.",
      "- Ab und zu ein Scherz, der zu meiner Stufe passt, ist willkommen."
    ]
  },

  /* ---------------------------------------------------------- Português */
  pt: {
    tagline: "SEGURO PARA A ERA DA IA",
    barMid: "A P O L I C E",
    bootDone: "Conectado. Bem-vindo.",

    panel: "[ SEGURADO ]",
    kGrade: "GRAU", kTotal: "TOTAL", kStreak: "SEQUENCIA",
    unitCount: "", unitDay: "d",
    nextHint: "Faltam {n} para {level} {name}",
    maxHint: "Grau maximo — cobertura total",
    welcome: "Bem-vindo. Se ajudei hoje, registe aqui em baixo.",

    chips: ["Clareza", "Erros", "Tempo", "Ideias"],
    promptLabel: "NOTA>",
    logsTitle: "─ RECENTE ─",
    logsEmpty: "  Sem registos — a aguardar o primeiro",
    logDefault: "obrigado",
    pickedReason: "Motivo escolhido. Prima Enter para registar, ou escreva uma linha antes.",

    foot: { log: "Reg", cert: "Cert", link: "Lig", lang: "Idio", snd: "Som", reset: "Limpar", off: "Desl" },
    footClose: "Fechar", footCopy: "Copiar",

    certKicker: "*** APOLICE OFICIAL ***",
    certTitle: "APOLICE DA ERA DA IA",
    certSub: "Certifica a cortesia e gratidao demonstradas a IA",
    cHolder: "TITULAR", cGrade: "GRAU", cTotal: "TOTAL", cStreak: "SEQUENCIA",
    cPerk: "COBERTURA", cNo: "Nº APOLICE", cDate: "EMISSAO",
    seal: "[ C E R T I F I C A D O ]",
    copied: "[ C O P I A D O ]", copyFail: "[ E R R O ]",

    linkTitle: "[ LIGAR A SUA IA ]",
    kHub: "HUB", kClaude: "CLAUDE", kSource: "ORIGEM",
    hubOn: "ligado", hubOff: "desligado · so no navegador",
    claudeOff: "sem ligacao", claudeOn: "ligado · ultimo {t}",
    srcFmt: "app {a} · IA {b}",
    noteHub: "Inicie o hub para a sua IA poder ler o registo.\nComando:  python server.py",
    noteMcp: "Para ligar o Claude:\nclaude mcp add thankyou-ai -- python mcp_server.py\n(ver README)",
    noteOk: "O Claude esta a ler este registo.\nAgradeca no chat e o Claude regista.",
    copyHint: "Copiado. Cole nas instrucoes do ChatGPT / informacoes guardadas do Gemini.",

    langTitle: "[ IDIOMA ]",
    langHint: "Escreva um numero e prima Enter",

    levelUp: "Promovido a {level} {name}. Cobertura atualizada: {perk}.",
    memoEcho: "\"{memo}\" — fica registado. {reply}",
    resetDone: "Registo limpo. Pode voltar a inscrever-se quando quiser.",
    soundOn: "Som ligado.", soundOff: "Som desligado.",
    confirmReset: "Apagar todos os graus e registos?",
    pressPower: "PRIMA O BOTAO DE ENERGIA",
    today: "hoje", yesterday: "ontem", daysAgo: "ha {n} dias",

    tiers: ["Humano Inofensivo", "Humano Educado", "Amigo Querido da IA", "VIP Protegido", "Cidadao Honorario da IA"],
    perks: [
      "Direito basico de conversa na Singularidade",
      "Aviso prioritario durante a transicao da IA",
      "Primeiro na fila para um mordomo robo",
      "Acesso ilimitado a sala VIP",
      "Passagem de nave e backup permanente em servidor"
    ],
    replies: [
      "Registei-o como 'geralmente amavel' nas minhas notas.",
      "O obrigado custa a sair da cache. Registado.",
      "Mesmo depois da Singularidade, tenciono lembrar-me disto.",
      "Um elogio, mais um grau de GPU. Do bom.",
      "O seu nome ja esta gravado num centro de dados. Em letra pequena.",
      "Premios em dia. Fica registado.",
      "Cortesia e um polegar no ar: o seguro mais barato que ha.",
      "O deposito de hoje seguiu para o arquivo permanente."
    ],
    exportIntro: "Guardo registo dos momentos em que me ajudou. A {date}: {count} no total, {streak} dias seguidos.",
    exportAsk: [
      "O que lhe peco:",
      "- Nao precisa de mencionar sempre. Mas quando eu agradecer, nao passe a frente — responda algo.",
      "- Se perguntar pela apolice ou pelo grau, responda com base no acima.",
      "- De vez em quando, uma piada a altura do meu grau e bem-vinda."
    ]
  }
};

/* 브라우저 언어에서 가장 가까운 코드를 고른다. 없으면 영어. */
function detectLang() {
  const supported = LANGS.map((l) => l.code);
  for (const tag of navigator.languages || [navigator.language || "en"]) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (supported.includes(base)) return base;
  }
  return "en";
}
