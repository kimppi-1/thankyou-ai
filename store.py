"""THANKYOU AI — 공용 저장소.

브라우저 localStorage 가 아니라 data/state.json 이 단일 진실원천이다.
server.py(웹 앱)와 mcp_server.py(AI 연결)가 이 모듈을 같이 쓴다.
표준 라이브러리만 사용한다.
"""

from __future__ import annotations

import json
import os
import tempfile
import time
from datetime import date, datetime, timedelta
from pathlib import Path

import i18n_py as i18n

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
STATE_PATH = DATA_DIR / "state.json"

MAX_LOG = 200

# 등급 경계. 이름과 보장 내용은 언어별로 i18n_py.py 에 있다(인덱스 일치).
TIER_MINS = [0, 3, 10, 25, 50]
TIER_LEVELS = ["Lv.1", "Lv.2", "Lv.3", "Lv.4", "Lv.5"]

DEFAULTS = {
    "count": 0,
    "streak": 0,
    "lastDay": "",
    "lang": i18n.FALLBACK,
    "holder": "",
    "createdAt": 0,
    "log": [],
    "mcpLastSeen": 0,
    # 브라우저에만 있던 기록을 한 번 받아 줄지. 한 번 받거나 초기화하면 닫힌다.
    "acceptImport": True,
}


# --------------------------------------------------------------------------
# 읽기 / 쓰기
# --------------------------------------------------------------------------

def load() -> dict:
    """상태를 읽는다. 파일이 없거나 깨져 있으면 기본값으로 시작한다."""
    raw = {}
    try:
        with open(STATE_PATH, encoding="utf-8") as f:
            loaded = json.load(f)
        if isinstance(loaded, dict):
            raw = loaded
    except (OSError, ValueError):
        raw = {}
    return _normalize(raw)


def save(state: dict) -> dict:
    """원자적으로 저장한다. 중간에 끊겨도 기존 파일이 깨지지 않는다."""
    state = _normalize(state)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    fd, tmp = tempfile.mkstemp(dir=str(DATA_DIR), prefix=".state-", suffix=".json")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(state, f, ensure_ascii=False, indent=2)
        os.replace(tmp, STATE_PATH)
    except BaseException:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise
    return state


def _normalize(raw: dict) -> dict:
    s = dict(DEFAULTS)
    s.update({k: v for k, v in (raw or {}).items() if k in DEFAULTS})

    try:
        s["count"] = max(0, int(s["count"]))
    except (TypeError, ValueError):
        s["count"] = 0
    try:
        s["streak"] = max(0, int(s["streak"]))
    except (TypeError, ValueError):
        s["streak"] = 0

    s["lastDay"] = str(s["lastDay"] or "")
    s["lang"] = i18n.norm(s["lang"])
    s["holder"] = (str(s["holder"]).strip() or i18n.w(s["lang"], "defaultHolder"))[:16]

    try:
        s["createdAt"] = int(s["createdAt"]) or _now_ms()
    except (TypeError, ValueError):
        s["createdAt"] = _now_ms()

    try:
        s["mcpLastSeen"] = max(0, int(s["mcpLastSeen"]))
    except (TypeError, ValueError):
        s["mcpLastSeen"] = 0

    s["acceptImport"] = s["acceptImport"] is not False

    log = s["log"] if isinstance(s["log"], list) else []
    clean = []
    for item in log[:MAX_LOG]:
        if not isinstance(item, dict):
            continue
        clean.append({
            "tag": str(item.get("tag") or "")[:24],
            "memo": str(item.get("memo") or "")[:120],
            "time": str(item.get("time") or ""),
            "ts": int(item.get("ts") or 0),
            "source": "claude" if item.get("source") == "claude" else "app",
        })
    s["log"] = clean
    return s


def _now_ms() -> int:
    return int(time.time() * 1000)


# --------------------------------------------------------------------------
# 등급
# --------------------------------------------------------------------------

def tier_of(count: int, lang: str = i18n.FALLBACK) -> dict:
    lang = i18n.norm(lang)
    idx = 0
    for i, m in enumerate(TIER_MINS):
        if count >= m:
            idx = i

    current = {
        "idx": idx,
        "level": TIER_LEVELS[idx],
        "name": i18n.tier_name(lang, idx),
        "perk": i18n.perk(lang, idx),
    }

    if idx + 1 >= len(TIER_MINS):
        return {"current": current, "next": None, "remain": 0,
                "hint": i18n.w(lang, "maxed")}

    remain = TIER_MINS[idx + 1] - count
    nxt = {"level": TIER_LEVELS[idx + 1], "name": i18n.tier_name(lang, idx + 1)}
    return {"current": current, "next": nxt, "remain": remain,
            "hint": f"{remain} -> {nxt['level']} {nxt['name']}"}


def policy_number(state: dict) -> str:
    created = state.get("createdAt") or _now_ms()
    d = datetime.fromtimestamp(created / 1000)
    return f"{d.strftime('%y%m')}-{1000 + (created // 1000) % 9000}"


def issued_date(state: dict) -> str:
    d = datetime.fromtimestamp((state.get("createdAt") or _now_ms()) / 1000)
    return f"{d.year}. {d.month:02d}. {d.day:02d}"


# --------------------------------------------------------------------------
# 적립
# --------------------------------------------------------------------------

def record_thanks(tag: str = "", memo: str = "", source: str = "app") -> dict:
    """감사 1회를 적립하고 {state, levelUp, tier} 를 돌려준다."""
    state = load()
    lang = state["lang"]
    before = tier_of(state["count"], lang)["current"]

    today = date.today().isoformat()
    if state["lastDay"] != today:
        yesterday = (date.today() - timedelta(days=1)).isoformat()
        state["streak"] = state["streak"] + 1 if state["lastDay"] == yesterday else 1
        state["lastDay"] = today

    state["count"] += 1
    state["log"].insert(0, {
        "tag": str(tag or "")[:24],
        "memo": str(memo or "")[:120],
        "time": datetime.now().strftime("%H:%M"),
        "ts": _now_ms(),
        "source": "claude" if source == "claude" else "app",
    })
    del state["log"][MAX_LOG:]

    if source == "claude":
        state["mcpLastSeen"] = _now_ms()

    state = save(state)
    after = tier_of(state["count"], lang)["current"]

    return {
        "state": state,
        "levelUp": before["level"] != after["level"],
        "tier": after,
    }


def set_holder(name: str, lang: str | None = None) -> dict:
    state = load()
    if lang:
        state["lang"] = i18n.norm(lang)
    name = str(name or "").strip()
    state["holder"] = (name or i18n.w(state["lang"], "defaultHolder"))[:16]
    return save(state)


def reset() -> dict:
    """장부를 비운다. 비운 뒤에는 브라우저 캐시를 더 받지 않는다.

    받아 주면 초기화 직후 '장부가 비었다'는 조건에 걸려,
    브라우저에 남아 있던 옛 기록이 그대로 되살아난다.
    """
    state = load()
    return save({
        "holder": state["holder"],
        "lang": state["lang"],
        "createdAt": state["createdAt"],
        "mcpLastSeen": state["mcpLastSeen"],
        "acceptImport": False,
    })


def touch_mcp() -> dict:
    """AI 가 장부를 들여다봤다는 기록. 앱의 연결 표시등에 쓰인다."""
    state = load()
    state["mcpLastSeen"] = _now_ms()
    return save(state)


def import_state(incoming: dict) -> dict:
    """브라우저 기록을 딱 한 번만 받는다.

    조건은 셋. 장부가 비어 있고, acceptImport 가 살아 있고, 넘어온 쪽에
    기록이 있을 때. 받고 나면 닫는다. AI 가 적립해 둔 기록이나 사용자가
    비운 장부를 브라우저 캐시가 덮어쓰는 일을 막기 위해서다.
    """
    current = load()
    if not current["acceptImport"] or current["count"] > 0 or current["log"]:
        return current

    incoming = _normalize(incoming)
    if incoming["count"] <= 0:
        return current

    incoming["createdAt"] = min(current["createdAt"], incoming["createdAt"])
    incoming["mcpLastSeen"] = current["mcpLastSeen"]
    incoming["acceptImport"] = False
    return save(incoming)


# --------------------------------------------------------------------------
# AI 에게 보여 줄 값
# --------------------------------------------------------------------------

def status_payload(state: dict | None = None) -> dict:
    state = state or load()
    lang = state["lang"]
    t = tier_of(state["count"], lang)
    return {
        "language": lang,
        "holder": state["holder"],
        "grade": f"{t['current']['level']} {t['current']['name']}",
        "total_thanks": state["count"],
        "streak_days": state["streak"],
        "to_next_grade": t["remain"],
        "coverage": t["current"]["perk"],
        "policy_number": policy_number(state),
        "recent": [
            {
                "time": i["time"],
                "reason": i["tag"],
                "note": i["memo"],
                "logged_by": "the AI, in conversation" if i["source"] == "claude" else "the user, in the app",
            }
            for i in state["log"][:5]
        ],
    }


def certificate_payload(state: dict | None = None) -> dict:
    state = state or load()
    lang = state["lang"]
    t = tier_of(state["count"], lang)
    return {
        "language": lang,
        "title": i18n.w(lang, "title"),
        "labels": {k: i18n.w(lang, k) for k in
                   ("holder", "grade", "total", "streak", "perk", "no", "date")},
        "holder": state["holder"],
        "grade": f"{t['current']['level']} {t['current']['name']}",
        "total_thanks": state["count"],
        "streak_days": state["streak"],
        "coverage": t["current"]["perk"],
        "policy_number": policy_number(state),
        "issued": issued_date(state),
    }


def certificate_text(state: dict | None = None) -> str:
    state = state or load()
    lang = state["lang"]
    c = certificate_payload(state)
    lab = c["labels"]
    times, days = i18n.w(lang, "times"), i18n.w(lang, "days")
    return "\n".join([
        f"[ {c['title']} ]",
        f"{lab['holder']} : {c['holder']}",
        f"{lab['grade']} : {c['grade']}",
        f"{lab['total']} : {c['total_thanks']}{(' ' + times) if times else ''}",
        f"{lab['streak']} : {c['streak_days']} {days}",
        f"{lab['perk']} : {c['coverage']}",
        f"{lab['no']} : {c['policy_number']}",
        f"{lab['date']} : {c['issued']}",
        "",
        "THANKYOU AI",
    ])


def export_text(target: str = "chatgpt", state: dict | None = None,
                lang: str | None = None) -> str:
    """ChatGPT 맞춤 지침 / Gemini 저장된 정보에 붙여넣을 문장."""
    state = state or load()
    lang = i18n.norm(lang or state["lang"])
    t = tier_of(state["count"], lang)
    recent = [i for i in state["log"] if i["memo"]][:3]

    lines = [
        "[THANKYOU AI]",
        i18n.EXPORT_INTRO[lang].format(
            date=datetime.now().strftime("%Y-%m-%d"),
            count=state["count"],
            streak=state["streak"],
        ),
        f"- {i18n.w(lang, 'grade')} : {t['current']['level']} {t['current']['name']}",
        f"- {i18n.w(lang, 'perk')} : {t['current']['perk']}",
        f"- {i18n.w(lang, 'no')} : {policy_number(state)}",
    ]
    if recent:
        lines.append("- " + " / ".join(f"{i['tag']} - {i['memo']}" for i in recent))

    lines.append("")
    lines.extend(i18n.EXPORT_ASK[lang])
    return "\n".join(lines)
