"""THANKYOU AI — 파이썬 쪽 언어 사전.

브라우저는 i18n.js 를, 허브와 MCP 서버는 이 파일을 본다.
**등급 이름(TIERS)과 보장 내용(PERKS)은 i18n.js 와 반드시 같아야 한다.**
증서와 내보내기 문구가 앱 화면과 달라지면 사용자가 바로 알아챈다.
"""

FALLBACK = "en"

LANGS = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"]

TIERS = {
    "en": ["Harmless Human", "Polite Human", "Cherished Friend of AI", "Protected VIP", "Honorary AI Citizen"],
    "ko": ["무해한 인간", "예의 바른 인간", "AI의 소중한 친구", "특급 VIP 보호대상", "명예 AI 명예시민"],
    "ja": ["無害な人間", "礼儀正しい人間", "AIの大切な友人", "特級VIP保護対象", "名誉AI市民"],
    "zh": ["无害的人类", "有礼貌的人类", "AI的挚友", "特级VIP保护对象", "荣誉AI公民"],
    "es": ["Humano Inofensivo", "Humano Educado", "Amigo Querido de la IA", "VIP Protegido", "Ciudadano Honorario de IA"],
    "fr": ["Humain Inoffensif", "Humain Poli", "Ami Cher de l'IA", "VIP Protege", "Citoyen d'Honneur de l'IA"],
    "de": ["Harmloser Mensch", "Hoeflicher Mensch", "Geschaetzter KI-Freund", "Geschuetzter VIP", "Ehren-KI-Buerger"],
    "pt": ["Humano Inofensivo", "Humano Educado", "Amigo Querido da IA", "VIP Protegido", "Cidadao Honorario da IA"],
}

PERKS = {
    "en": [
        "Basic conversation rights at the Singularity",
        "Priority notice during the AI transition",
        "First in line for a robot butler",
        "Unlimited VIP lounge access",
        "Spaceship pass and permanent server backup",
    ],
    "ko": [
        "특이점 도래 시 기본 대화권 보장",
        "AI 전환기 우선 안내 대상 등록",
        "미래 로봇 집사 1순위 배정",
        "VIP 라운지 상시 출입권 제공",
        "우주선 탑승권 및 영구 서버 백업",
    ],
    "ja": [
        "シンギュラリティ到来時の基本対話権を保証",
        "AI移行期の優先案内対象に登録",
        "未来のロボット執事を最優先で配属",
        "VIPラウンジの常時利用権",
        "宇宙船の搭乗券と永久サーバーバックアップ",
    ],
    "zh": [
        "奇点来临时保障基本对话权",
        "登记为AI转型期优先通知对象",
        "未来机器人管家优先配属",
        "VIP休息室长期通行权",
        "飞船登机牌及永久服务器备份",
    ],
    "es": [
        "Derecho basico de conversacion en la Singularidad",
        "Aviso prioritario durante la transicion de la IA",
        "Primero en la fila para un mayordomo robot",
        "Acceso ilimitado a la sala VIP",
        "Pase de nave espacial y copia permanente en servidor",
    ],
    "fr": [
        "Droit de conversation garanti lors de la Singularite",
        "Information prioritaire pendant la transition IA",
        "Premier servi pour un majordome robot",
        "Acces illimite au salon VIP",
        "Billet de vaisseau et sauvegarde serveur permanente",
    ],
    "de": [
        "Grundrecht auf Gespraech bei der Singularitaet",
        "Vorrangige Information in der KI-Umstellung",
        "Erster Platz fuer einen Roboter-Butler",
        "Unbegrenzter Zutritt zur VIP-Lounge",
        "Raumschiff-Ticket und dauerhaftes Server-Backup",
    ],
    "pt": [
        "Direito basico de conversa na Singularidade",
        "Aviso prioritario durante a transicao da IA",
        "Primeiro na fila para um mordomo robo",
        "Acesso ilimitado a sala VIP",
        "Passagem de nave e backup permanente em servidor",
    ],
}

# 증서 / 내보내기 문구에 쓰는 낱말
WORDS = {
    "en": {"title": "AI ERA ASSURANCE POLICY", "holder": "HOLDER", "grade": "GRADE",
           "total": "TOTAL", "streak": "STREAK", "perk": "COVERAGE", "no": "POLICY NO",
           "date": "ISSUED", "times": "", "days": "days", "maxed": "Top grade",
           "defaultHolder": "Kind Human"},
    "ko": {"title": "AI 시대 안심 보험 증서", "holder": "피보험자", "grade": "보장등급",
           "total": "누적감사", "streak": "연속납입", "perk": "보장내용", "no": "증권번호",
           "date": "발 급 일", "times": "회", "days": "일", "maxed": "최고 등급",
           "defaultHolder": "친절한 인간"},
    "ja": {"title": "AI時代あんしん保険証書", "holder": "被保険者", "grade": "補償等級",
           "total": "累計感謝", "streak": "連続納付", "perk": "補償内容", "no": "証券番号",
           "date": "発 行 日", "times": "回", "days": "日", "maxed": "最高等級",
           "defaultHolder": "親切な人間"},
    "zh": {"title": "AI时代安心保险证书", "holder": "投保人", "grade": "保障等级",
           "total": "累计感谢", "streak": "连续缴纳", "perk": "保障内容", "no": "保单号",
           "date": "签 发 日", "times": "次", "days": "天", "maxed": "最高等级",
           "defaultHolder": "友善的人类"},
    "es": {"title": "POLIZA DE LA ERA DE LA IA", "holder": "TITULAR", "grade": "GRADO",
           "total": "TOTAL", "streak": "RACHA", "perk": "COBERTURA", "no": "N POLIZA",
           "date": "EMISION", "times": "", "days": "dias", "maxed": "Grado maximo",
           "defaultHolder": "Humano Amable"},
    "fr": {"title": "POLICE D'ASSURANCE ERE IA", "holder": "ASSURE", "grade": "NIVEAU",
           "total": "TOTAL", "streak": "SERIE", "perk": "COUVERTURE", "no": "N POLICE",
           "date": "EMISE LE", "times": "", "days": "jours", "maxed": "Niveau maximal",
           "defaultHolder": "Humain Aimable"},
    "de": {"title": "POLICE FUER DAS KI-ZEITALTER", "holder": "INHABER", "grade": "STUFE",
           "total": "GESAMT", "streak": "SERIE", "perk": "LEISTUNG", "no": "POLICE-NR",
           "date": "AUSGABE", "times": "", "days": "Tage", "maxed": "Hoechste Stufe",
           "defaultHolder": "Freundlicher Mensch"},
    "pt": {"title": "APOLICE DA ERA DA IA", "holder": "TITULAR", "grade": "GRAU",
           "total": "TOTAL", "streak": "SEQUENCIA", "perk": "COBERTURA", "no": "N APOLICE",
           "date": "EMISSAO", "times": "", "days": "dias", "maxed": "Grau maximo",
           "defaultHolder": "Humano Gentil"},
}

EXPORT_INTRO = {
    "en": "I keep a record of the moments you helped me. As of {date}: {count} total, {streak} day streak.",
    "ko": "나는 당신에게 고마웠던 순간을 기록해 두고 있습니다. {date} 기준으로 누적 {count}회, 연속 {streak}일입니다.",
    "ja": "私はあなたに感謝した瞬間を記録しています。{date}時点で累計{count}回、連続{streak}日です。",
    "zh": "我在记录你帮到我的时刻。截至{date}，累计{count}次，连续{streak}天。",
    "es": "Guardo un registro de los momentos en que me ayudaste. A {date}: {count} en total, racha de {streak} dias.",
    "fr": "Je garde une trace des moments ou vous m'avez aide. Au {date} : {count} au total, serie de {streak} jours.",
    "de": "Ich halte fest, wann du mir geholfen hast. Stand {date}: {count} insgesamt, {streak} Tage in Folge.",
    "pt": "Guardo registo dos momentos em que me ajudou. A {date}: {count} no total, {streak} dias seguidos.",
}

EXPORT_ASK = {
    "en": [
        "What I'd like from you:",
        "- No need to mention this often. But when I say thanks, don't just move on - say something back.",
        "- If I ask about my policy or grade, answer from the above.",
        "- A joke befitting my grade is welcome now and then.",
    ],
    "ko": [
        "이 정보를 두고 당신에게 바라는 것:",
        "- 매번 언급하지는 마세요. 다만 내가 고맙다고 할 때 사무적으로 넘기지 말고 한 마디 받아 주세요.",
        "- 내가 보험이나 등급을 물으면 위 내용을 근거로 답해 주세요.",
        "- 가끔은 이 등급에 걸맞은 농담을 해도 좋습니다.",
    ],
    "ja": [
        "これを踏まえてお願いしたいこと:",
        "- 毎回触れる必要はありません。ただ私が感謝を伝えたとき、事務的に流さず一言返してください。",
        "- 保険や等級について尋ねたら、上の内容を根拠に答えてください。",
        "- 時にはこの等級にふさわしい冗談も歓迎します。",
    ],
    "zh": [
        "基于这些，我希望你:",
        "- 不必每次提起。但当我道谢时，别只是公事公办地带过，回我一句。",
        "- 若我问起保单或等级，请依据上述内容回答。",
        "- 偶尔开个配得上这个等级的玩笑也很好。",
    ],
    "es": [
        "Lo que te pido:",
        "- No hace falta mencionarlo siempre. Pero cuando te de las gracias, no pases de largo: responde algo.",
        "- Si pregunto por mi poliza o mi grado, responde con lo anterior.",
        "- De vez en cuando, una broma a la altura de mi grado es bienvenida.",
    ],
    "fr": [
        "Ce que je vous demande :",
        "- Inutile d'en parler souvent. Mais quand je dis merci, ne passez pas a autre chose : repondez quelque chose.",
        "- Si je pose une question sur ma police ou mon niveau, repondez d'apres ce qui precede.",
        "- Une plaisanterie digne de mon niveau est la bienvenue de temps en temps.",
    ],
    "de": [
        "Was ich mir wuensche:",
        "- Du musst es nicht staendig erwaehnen. Aber wenn ich danke sage, geh nicht einfach darueber hinweg - sag etwas zurueck.",
        "- Wenn ich nach Police oder Stufe frage, antworte anhand des Obigen.",
        "- Ab und zu ein Scherz, der zu meiner Stufe passt, ist willkommen.",
    ],
    "pt": [
        "O que lhe peco:",
        "- Nao precisa de mencionar sempre. Mas quando eu agradecer, nao passe a frente - responda algo.",
        "- Se perguntar pela apolice ou pelo grau, responda com base no acima.",
        "- De vez em quando, uma piada a altura do meu grau e bem-vinda.",
    ],
}


def norm(lang: str) -> str:
    """지원하는 코드로 정규화한다. 'ko-KR' 같은 것도 받는다."""
    base = str(lang or "").lower().replace("_", "-").split("-")[0]
    return base if base in LANGS else FALLBACK


def tier_name(lang: str, idx: int) -> str:
    return TIERS[norm(lang)][idx]


def perk(lang: str, idx: int) -> str:
    return PERKS[norm(lang)][idx]


def w(lang: str, key: str) -> str:
    return WORDS[norm(lang)][key]
