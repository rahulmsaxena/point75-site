"""Print what a Claude run in GitHub Actions cost, for the job summary.

Usage: python3 tools/claude_run_report.py <execution_file> <label>
Reads the claude-code-action execution file (a JSON list of messages whose last
"result" message carries total_cost_usd, num_turns and duration_ms) and prints a
short Markdown line. Never fails the job: a missing or odd file prints a note.
"""
import json
import sys


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else ""
    label = sys.argv[2] if len(sys.argv) > 2 else "Claude run"
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        msgs = data if isinstance(data, list) else [data]
        result = next(m for m in reversed(msgs) if isinstance(m, dict) and m.get("type") == "result")
    except Exception as e:  # noqa: BLE001 - report, never fail the job
        print(f"**{label}:** cost not available ({type(e).__name__})")
        return
    cost = result.get("total_cost_usd") or result.get("cost_usd") or 0
    turns = result.get("num_turns", "?")
    mins = (result.get("duration_ms") or 0) / 60000
    print(f"**{label}:** ${cost:.2f} · {turns} turns · {mins:.1f} min")


if __name__ == "__main__":
    main()
