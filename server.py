"""고마워 AI — 로컬 허브.

웹 앱을 서빙하면서, 적립 기록을 data/state.json 에 남긴다.
이 파일을 mcp_server.py 가 같이 읽기 때문에 AI 가 내 적립 현황을 알 수 있다.

    python server.py            # http://127.0.0.1:8765
    python server.py 9000       # 포트 지정

외부에 열지 않는다. 127.0.0.1 에만 바인딩한다.
"""

from __future__ import annotations

import json
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

import store

HOST = "127.0.0.1"
DEFAULT_PORT = 8765
MAX_BODY = 64 * 1024


class Handler(SimpleHTTPRequestHandler):
    # 기본 추측은 charset 을 빼먹어서, meta 태그가 없는 파일이 깨진다.
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(store.BASE_DIR), **kwargs)

    # -- 공통 ---------------------------------------------------------------

    def log_message(self, fmt, *args):
        if self.path.startswith("/api/"):
            sys.stderr.write(f"  {self.command} {self.path}\n")

    def _cors(self):
        # 확장 프로그램 팝업(chrome-extension://…)에서도 부르기 때문에 열어 둔다.
        # 127.0.0.1 에만 바인딩하므로 외부에서는 닿지 않는다.
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def _send(self, payload, status=200, content_type="application/json; charset=utf-8"):
        body = payload if isinstance(payload, bytes) else json.dumps(
            payload, ensure_ascii=False
        ).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self) -> dict:
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            return {}
        if length <= 0 or length > MAX_BODY:
            return {}
        try:
            data = json.loads(self.rfile.read(length).decode("utf-8"))
            return data if isinstance(data, dict) else {}
        except (ValueError, UnicodeDecodeError):
            return {}

    def end_headers(self):
        if not self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    # -- 라우팅 -------------------------------------------------------------

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        route = urlparse(self.path)

        if route.path == "/api/state":
            self._send({"ok": True, "state": store.load()})
            return

        if route.path == "/api/export":
            q = parse_qs(route.query)
            target = (q.get("target") or ["chatgpt"])[0]
            lang = (q.get("lang") or [None])[0]
            if target == "certificate":
                text = store.certificate_text()
            else:
                text = store.export_text(target, lang=lang)
            self._send({"ok": True, "target": target, "text": text})
            return

        if route.path.startswith("/api/"):
            self._send({"ok": False, "error": "unknown endpoint"}, 404)
            return

        super().do_GET()

    def do_POST(self):
        route = urlparse(self.path)
        body = self._read_json()

        if route.path == "/api/thanks":
            result = store.record_thanks(
                tag=body.get("tag", ""),
                memo=body.get("memo", ""),
                source="app",
            )
            self._send({
                "ok": True,
                "state": result["state"],
                "levelUp": result["levelUp"],
            })
            return

        if route.path == "/api/holder":
            state = store.set_holder(body.get("holder", ""), body.get("lang"))
            self._send({"ok": True, "state": state})
            return

        if route.path == "/api/reset":
            self._send({"ok": True, "state": store.reset()})
            return

        if route.path == "/api/import":
            incoming = body.get("state")
            state = store.import_state(incoming) if isinstance(incoming, dict) else store.load()
            self._send({"ok": True, "state": state})
            return

        self._send({"ok": False, "error": "unknown endpoint"}, 404)


def main():
    # 윈도우 콘솔 기본 인코딩(cp949)으로는 '—' 같은 문자에서 죽는다.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):
            pass

    port = DEFAULT_PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"포트 번호가 이상합니다: {sys.argv[1]}")
            return 1

    store.DATA_DIR.mkdir(parents=True, exist_ok=True)
    state = store.load()
    store.save(state)
    tier = store.tier_of(state["count"], state["lang"])["current"]

    print("THANKYOU AI — local hub")
    print(f"  url     http://{HOST}:{port}")
    print(f"  ledger  {store.STATE_PATH}")
    print(f"  now     {tier['level']} {tier['name']} · {state['count']} total · {state['streak']} day streak")
    print("  (Ctrl+C to stop)")
    print()

    try:
        with ThreadingHTTPServer((HOST, port), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n허브를 닫았습니다.")
    except OSError as e:
        print(f"서버를 열지 못했습니다: {e}")
        print(f"{port} 번 포트를 이미 쓰고 있는지 확인해 보세요.")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
