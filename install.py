"""THANKYOU AI — Claude 연결 설치 도우미.

mcp_server.py 를 Claude 의 MCP 서버 목록에 등록한다.
손대기 전에 설정 파일을 반드시 백업하고, 물어본 뒤에만 쓴다.

    python install.py            # 등록 (확인 후 진행)
    python install.py --print    # 직접 넣을 설정만 출력, 파일은 건드리지 않음
    python install.py --remove   # 등록 해제
"""

from __future__ import annotations

import json
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path

SERVER_KEY = "thankyou-ai"
BASE_DIR = Path(__file__).resolve().parent
MCP_PATH = BASE_DIR / "mcp_server.py"


def targets() -> list[tuple[str, Path]]:
    """Claude 설정 파일 후보. 있는 것만 건드린다."""
    found = []

    code_cfg = Path.home() / ".claude.json"
    if code_cfg.exists():
        found.append(("Claude Code / 데스크톱 앱(Code 탭)", code_cfg))

    appdata = os.environ.get("APPDATA")
    if appdata:
        desktop_cfg = Path(appdata) / "Claude" / "claude_desktop_config.json"
    else:  # macOS
        desktop_cfg = Path.home() / "Library/Application Support/Claude/claude_desktop_config.json"
    if desktop_cfg.exists():
        found.append(("Claude 데스크톱(챗)", desktop_cfg))

    return found


def entry() -> dict:
    return {
        "command": sys.executable or "python",
        "args": [str(MCP_PATH)],
    }


def snippet() -> str:
    return json.dumps({"mcpServers": {SERVER_KEY: entry()}}, ensure_ascii=False, indent=2)


def backup(path: Path) -> Path:
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    dest = path.with_suffix(path.suffix + f".bak-{stamp}")
    shutil.copy2(path, dest)
    return dest


def patch(path: Path, remove: bool) -> str:
    try:
        with open(path, encoding="utf-8") as f:
            cfg = json.load(f)
    except (OSError, ValueError) as e:
        return f"건너뜀 (읽지 못함: {e})"

    if not isinstance(cfg, dict):
        return "건너뜀 (형식이 예상과 다름)"

    servers = cfg.get("mcpServers")
    if not isinstance(servers, dict):
        servers = {}

    if remove:
        if SERVER_KEY not in servers:
            return "이미 등록되어 있지 않음"
        del servers[SERVER_KEY]
        action = "등록 해제함"
    else:
        if servers.get(SERVER_KEY) == entry():
            return "이미 같은 내용으로 등록되어 있음"
        servers[SERVER_KEY] = entry()
        action = "등록함"

    cfg["mcpServers"] = servers
    saved = backup(path)

    tmp = path.with_suffix(path.suffix + ".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(cfg, f, ensure_ascii=False, indent=2)
    os.replace(tmp, path)

    return f"{action} (백업: {saved.name})"


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):
            pass

    args = set(sys.argv[1:])
    remove = "--remove" in args

    if not MCP_PATH.exists():
        print(f"mcp_server.py 를 찾지 못했습니다: {MCP_PATH}")
        return 1

    print("THANKYOU AI — Claude 연결 설치")
    print(f"  MCP 서버 : {MCP_PATH}")
    print(f"  파이썬   : {sys.executable}")
    print()

    if "--print" in args:
        print("아래 내용을 Claude 설정 파일의 mcpServers 에 직접 넣으세요.")
        print()
        print(snippet())
        print()
        print("또는 터미널에서:")
        print(f'  claude mcp add {SERVER_KEY} -- "{sys.executable}" "{MCP_PATH}"')
        return 0

    found = targets()
    if not found:
        print("Claude 설정 파일을 찾지 못했습니다.")
        print("--print 로 설정 내용을 받아 직접 넣어 주세요.")
        return 1

    print("다음 파일을 고칩니다. 고치기 전에 각각 백업합니다.")
    for label, path in found:
        print(f"  - {label}\n    {path}")
    print()

    answer = input("등록 해제할까요? (y/N) " if remove else "등록할까요? (y/N) ").strip().lower()
    if answer not in ("y", "yes"):
        print("아무것도 바꾸지 않았습니다.")
        return 0

    print()
    for label, path in found:
        print(f"  {label}: {patch(path, remove)}")

    print()
    print("Claude 를 완전히 껐다 켜면 연결됩니다.")
    print("확인: Claude 에게 '내 보험 등급 알려줘' 라고 물어보세요.")
    print()
    print("허브도 같이 켜 두어야 앱에서 적립한 것이 AI 에게 보입니다:")
    print(f'  python "{BASE_DIR / "server.py"}"')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
