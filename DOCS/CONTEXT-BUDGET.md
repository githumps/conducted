# Context Budget Guidelines

## Why Context Limits Matter

Claude Code works best with **tight context windows**. Going over budget causes:
- Slower responses
- Lower quality reasoning
- Increased cost
- Risk of context confusion

**Target**: Keep every conversation turn under **8,000 tokens** total.

---

## Token Budget Breakdown

### System Prompt (~1,200 tokens)
- `.claude/CLAUDE.md` master instructions
- Agent-specific instructions (if loaded)
- Constraints and workflow rules

### Conversation History (~2,000-4,000 tokens)
- Your messages
- Claude's responses
- Tool call results

### File Context (~1,000-3,000 tokens)
- Code snippets (max 30 lines at a time)
- File paths and line references
- Diffs and hunks

### Safety Margin (~1,000 tokens)
- Buffer for reasoning
- Unexpected expansions
- Multi-turn conversations

---

## Strategies to Stay Lean

### 1. Never Paste Full Files
❌ **BAD**: "Here's the entire game.js file..."
✅ **GOOD**: "In `js/game.js` lines 284-300, the `checkForDoor()` function..."

### 2. Use Line Ranges
```javascript
// Instead of reading entire file:
fs.read("js/game.js")

// Read only what you need:
fs.read("js/game.js", start_line=284, end_line=300)
```

### 3. Offload Design Decisions to GitHub
Instead of long planning discussions in chat:
1. Summarize in 3-5 bullets
2. Create GitHub issue with full details
3. Reference issue number in chat

### 4. Use TASKLOG.md for Session Notes
After 3-4 turns of discussion:
1. Summarize key points
2. Append to `DOCS/TASKLOG.md` with timestamp
3. Reference timestamp in future conversations

### 5. Agent Specialization
Each agent only loads their domain:
- **Gameplay Engineer**: Only `js/battle.js`, `js/player.js`, `js/train.js`
- **World Engineer**: Only `js/world-maps.js`, `js/game.js` (door logic)
- **UI Engineer**: Only `js/ui.js`, `js/input.js`, `js/mobile-controls.js`
- **QA Engineer**: Only `tests/`, bug reports
- **Enforcer PM**: Only issue list, roadmap, no code files

### 6. Diff Hunks, Not Full Files
When showing changes:
```diff
❌ BAD: Show entire 935-line game.js file

✅ GOOD: Show only the changed hunk:
--- a/js/game.js
+++ b/js/game.js
@@ -290,6 +290,8 @@
     checkForDoor() {
         if (!this.currentMap) return;

+        // Check if player is standing on a door tile
+        if (this.currentMap.isDoor(this.player.x, this.player.y)) {
```

### 7. Close and Restart When Needed
If context hits 7k tokens:
1. Dump to TASKLOG.md
2. Create summary issue
3. Close chat
4. Start fresh with Enforcer PM
5. Reference the summary issue

---

## Automated Safeguards (Hooks)

### Hook 1: Long Response (>1,800 tokens)
Auto-dumps to TASKLOG.md and creates GitHub issue.

### Hook 2: Context Overflow (>8,000 tokens)
Emergency halt, creates issue, forces restart.

### Hook 3: Large Diff (>150 lines)
Blocks PR, forces split into smaller changes.

---

## How to Check Context Usage

Run `/context-check` command to see:
- Current token count
- Breakdown by category
- Warning if approaching limit
- Recommendations

---

## Example: Good vs Bad Context Management

### ❌ BAD Session (12k tokens)
```
User: "Help me fix the battle system"
Claude: [Reads all of js/battle.js, js/train.js, js/moves.js]
Claude: [Pastes 200 lines of code analysis]
Claude: [Discusses 10 different potential approaches]
Claude: [Keeps all of this in memory for next turns]
```

### ✅ GOOD Session (4k tokens)
```
User: "Help me fix the battle system"
Claude: "What specific issue? Please link GitHub issue number."
User: "Issue #X says damage calculation is wrong"
Claude: [Reads only js/battle.js lines 120-150, the damage calc function]
Claude: "I see the bug on line 137. Here's a 5-line fix..."
Claude: [Posts fix, closes issue, dumps summary to TASKLOG.md]
```

---

## Red Flags (Stop Immediately If You See These)

🚩 Response is longer than this entire document
🚩 Pasting more than 30 lines of code at once
🚩 Loading multiple unrelated files in one turn
🚩 Discussing multiple issues without GitHub tracking
🚩 Re-explaining the same context multiple times
🚩 No progress after 4-5 conversation turns

**Fix**: Summarize to TASKLOG.md, create issues, restart fresh.

---

## Bottom Line

**Think of context like RAM** - you have limited space. Be ruthless about what you load. Use GitHub issues as your hard drive for long-term memory.

**Every file read, every code paste, every design discussion costs tokens.**

**Stay lean. Ship fast. Use the hooks.** 🚂

---

_Enforced by: `.claude/hooks.json` on-long-response and on-context-overflow hooks_
