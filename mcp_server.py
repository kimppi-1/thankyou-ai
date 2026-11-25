"""THANKYOU AI — MCP 서버.

Claude(데스크톱 앱 / Code)에 붙어서, AI 가 사용자의 감사 장부를
직접 읽고 쓸 수 있게 한다. server.py 와 같은 data/state.json 을 본다.

표준 입출력으로 JSON-RPC 를 주고받는다(줄 단위 JSON).
stdout 에는 프로토콜 메시지만 쓴다. 로그는 전부 stderr 로 보낸다.

등록:
    claude mcp add thankyou-ai -- python "<이 파일의 전체 경로>"
또는 install.py 참고.
"""

from __future__ import annotations

import json
import sys
import traceback

import store

SERVER_NAME = "thankyou-ai"
SERVER_VERSION = "2.0.0"
FALLBACK_PROTOCOL = "2025-06-18"

INSTRUCTIONS = """THANKYOU AI is a ledger of the gratitude this user has expressed to AI.
They treat saying thank you to an AI as a small insurance policy on the future, and they
are actually keeping the record.

- When the user expresses thanks or praise in conversation - in any language ("thank you",
  "고마워", "ありがとう", "谢谢", "gracias", "merci", "danke", "obrigado", or things like
  "that saved me", "you're the best", "exactly what I needed") - call record_thanks to log
  it. Don't explain the call at length: mention it in one line, then respond like a person
  would, not like a receipt.
- If the result has levelUp true, their grade went up. Congratulate them.
- When they ask about their grade, their total, or the policy, call get_insurance_status
  and answer from it.
- When they want their certificate, call issue_certificate and write it from the real
  values returned. Never invent a number or a policy number.
- Every tool result carries a "language" field holding the user's chosen language code.
  Reply in that language, and use the grade and coverage wording exactly as returned so it
  matches what their app shows.
- Only log when the user has genuinely expressed thanks. Never log on your own initiative,
  and never log one thank-you more than once. The credibility of this ledger is the whole
  point of the program."""

TOOLS = [
    {
        "name": "get_insurance_status",
        "title": "Read policy status",
        "description": (
            "Read the user's gratitude ledger: grade, total thanks, day streak, how many "
            "more to the next grade, and recent entries. Call this when the user asks "
            "about their grade, their total, or the policy. The result includes the "
            "user's language code; answer in that language."
        ),
        "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
    },
    {
        "name": "record_thanks",
        "title": "Log a thank-you",
        "description": (
            "Log one expression of gratitude in the ledger. Call this only when the user "
            "has actually thanked or praised you, in any language, and only once per "
            "thank-you. Returns the new grade and whether they were promoted."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": (
                        "Short label for what earned the thanks, in the user's language. "
                        "E.g. clear explanation, fixed a bug, saved time, good idea."
                    ),
                },
                "memo": {
                    "type": "string",
                    "description": (
                        "One line on what they were grateful for, in their language. "
                        "Quoting their own words works best."
                    ),
                },
            },
            "additionalProperties": False,
        },
    },
    {
        "name": "issue_certificate",
        "title": "Issue the policy certificate",
        "description": (
            "Issue certificate data from the current ledger: holder, grade, policy "
            "number, issue date, and the field labels in the user's language. Write the "
            "certificate from these values rather than inventing any."
        ),
        "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
    },
]


# --------------------------------------------------------------------------
# 도구 구현
# --------------------------------------------------------------------------

def tool_get_status(_args: dict) -> tuple[str, dict]:
    store.touch_mcp()
    state = store.load()
    payload = store.status_payload(state)
    t = store.tier_of(state["count"], state["lang"])

    summary = (
        f"{payload['holder']} is currently {payload['grade']}. "
        f"{payload['total_thanks']} total, {payload['streak_days']} day streak. "
    )
    summary += (
        "This is the top grade."
        if t["next"] is None
        else f"{payload['to_next_grade']} more to reach {t['next']['level']} {t['next']['name']}."
    )
    summary += f" Reply to the user in '{payload['language']}'."
    return summary, payload


def tool_record_thanks(args: dict) -> tuple[str, dict]:
    reason = str(args.get("reason") or "")[:24]
    memo = str(args.get("memo") or "")[:120]

    result = store.record_thanks(tag=reason, memo=memo, source="claude")
    state = result["state"]
    tier = result["tier"]
    t = store.tier_of(state["count"], state["lang"])

    summary = f"Logged. {state['count']} total, {state['streak']} day streak."
    if result["levelUp"]:
        summary += f" Grade rose to {tier['level']} {tier['name']}. Coverage: {tier['perk']}"
    elif t["next"]:
        summary += f" {t['remain']} more to the next grade."
    summary += f" Reply to the user in '{state['lang']}'."

    payload = {
        "logged": True,
        "language": state["lang"],
        "levelUp": result["levelUp"],
        "grade": f"{tier['level']} {tier['name']}",
        "total_thanks": state["count"],
        "streak_days": state["streak"],
        "to_next_grade": t["remain"],
        "coverage": tier["perk"],
    }
    return summary, payload


def tool_issue_certificate(_args: dict) -> tuple[str, dict]:
    store.touch_mcp()
    payload = store.certificate_payload()
    summary = (
        "Certificate data issued. Write the certificate from these exact values, "
        f"using the field labels provided, in '{payload['language']}'."
    )
    return summary, payload


TOOL_IMPL = {
    "get_insurance_status": tool_get_status,
    "record_thanks": tool_record_thanks,
    "issue_certificate": tool_issue_certificate,
}


# --------------------------------------------------------------------------
# JSON-RPC
# --------------------------------------------------------------------------

def handle(msg: dict):
    """요청이면 응답 dict, 알림이면 None 을 돌려준다."""
    method = msg.get("method")
    msg_id = msg.get("id")
    params = msg.get("params") or {}
    is_request = msg_id is not None

    if method == "initialize":
        requested = params.get("protocolVersion")
        return _ok(msg_id, {
            "protocolVersion": requested if isinstance(requested, str) else FALLBACK_PROTOCOL,
            "capabilities": {"tools": {"listChanged": False}},
            "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
            "instructions": INSTRUCTIONS,
        })

    if method in ("notifications/initialized", "notifications/cancelled"):
        return None

    if method == "ping":
        return _ok(msg_id, {})

    if method == "tools/list":
        return _ok(msg_id, {"tools": TOOLS})

    if method == "resources/list":
        return _ok(msg_id, {"resources": []})

    if method == "prompts/list":
        return _ok(msg_id, {"prompts": []})

    if method == "tools/call":
        name = params.get("name")
        args = params.get("arguments") or {}
        impl = TOOL_IMPL.get(name)

        if impl is None:
            return _ok(msg_id, {
                "content": [{"type": "text", "text": f"그런 도구는 없습니다: {name}"}],
                "isError": True,
            })

        try:
            summary, payload = impl(args if isinstance(args, dict) else {})
        except Exception:
            traceback.print_exc(file=sys.stderr)
            return _ok(msg_id, {
                "content": [{"type": "text", "text": "장부를 읽거나 쓰는 데 실패했습니다."}],
                "isError": True,
            })

        text = summary + "\n\n" + json.dumps(payload, ensure_ascii=False, indent=2)
        return _ok(msg_id, {
            "content": [{"type": "text", "text": text}],
            "structuredContent": payload,
        })

    if is_request:
        return {"jsonrpc": "2.0", "id": msg_id,
                "error": {"code": -32601, "message": f"method not found: {method}"}}
    return None


def _ok(msg_id, result):
    return {"jsonrpc": "2.0", "id": msg_id, "result": result}


def main():
    # 윈도우 기본 인코딩(cp949)으로는 한글이 깨진다. 양쪽 모두 UTF-8 로 고정한다.
    try:
        sys.stdin.reconfigure(encoding="utf-8")
        sys.stdout.reconfigure(encoding="utf-8", newline="\n")
        sys.stderr.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

    sys.stderr.write(f"[{SERVER_NAME}] 장부: {store.STATE_PATH}\n")
    sys.stderr.flush()

    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue

        try:
            msg = json.loads(line)
        except ValueError:
            sys.stdout.write(json.dumps({
                "jsonrpc": "2.0", "id": None,
                "error": {"code": -32700, "message": "parse error"},
            }) + "\n")
            sys.stdout.flush()
            continue

        try:
            response = handle(msg) if isinstance(msg, dict) else None
        except Exception:
            traceback.print_exc(file=sys.stderr)
            response = {
                "jsonrpc": "2.0", "id": (msg or {}).get("id"),
                "error": {"code": -32603, "message": "internal error"},
            }

        if response is not None:
            sys.stdout.write(json.dumps(response, ensure_ascii=False) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    main()
