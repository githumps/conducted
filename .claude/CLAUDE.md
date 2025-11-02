# Claude Code Session Instructions for CONDUCTED
> READ THIS FIRST — start EVERY session here to maintain coherence.

## 📍 Quick Context
CONDUCTED = Browser-based train battle RPG (Pokémon Red/Blue feel, but with original trains).
- Pure JS + Canvas, no framework, mobile-optimized
- Repo: /Users/evan/Documents/GitHub/conducted
- Live: https://githumps.github.io/conducted/
- Status: Milestone 1 (M1) → MVP rebuild in progress
Critical Path: #52 (map transitions) → #51 (items & catching) → #53 (money & mart) → #49 (trainer battles)

## ⚠️ HARD RULES (Never break)
Context Budget: < 8k tokens/turn
- Max 30 lines quoted per code block
- Prefer file paths + line ranges over full pastes
- Dump any long reasoning to DOCS/TASKLOG.md (with ISO timestamp)

Memory = GitHub Issues
- Every bug/feature has an issue before coding
- Design decisions → issue comments
- Planning → DEVELOPMENT_ROADMAP.md (or the issues themselves)
- Session notes → DOCS/TASKLOG.md

Small Steps Only
- Max 150 lines per PR (hooks enforce)
- One issue per PR with “Fixes #N”
- Green builds only
- Mobile + save/load tested before merge

## 🎨 Art & Tone Guidelines
Tone: Serious adventure, subtle absurdity. The world treats train-taming like a noble calling; players and NPCs speak sincerely. Occasional dry jokes acknowledge the premise (“who does capture trains?”) without breaking immersion.
Visuals: Game Boy-era pixel art vibe:
- 16×16 tiles for world maps; 64×64 (or 80×80) battle sprites for trains
- Color allowed (think GBC/GBA palettes): warm, slightly muted tones; readable contrast; consistent per-biome palettes
- UI: minimalist retro — battle HUD with name/level/HP bar, bottom text box with paging
Audio: Chiptune-ish music & fx. Keep short loops, simple waveforms. Use local generation where possible (see DOCS/ASSET_PIPELINE.md).
Consistency: Names, locations, and narrative must match /docs/ specs (worldbuilding/story). If code and docs disagree, align code to docs and note the change in an issue.

## 🧠 Local Resource Integration (SAVE CLAUDE TOKENS)
GPU Art (RTX 3080): Use ComfyUI / Stable Diffusion locally for tilesets, train battle sprites, icons. Do NOT attempt token-heavy ASCII/pixel descriptions — instead, output prompts and file targets per DOCS/ASSET_PIPELINE.md, then reference produced assets.
Local LLM (Ollama): For large repetitive text/data (bulk item tables, dialog stubs, trainer rosters), draft with a local model. Claude should:
1) Output a small seed schema/spec
2) Ask to run locally
3) Review & integrate results
Division of labor: Claude = architecture, diffs, glue code, reviews. Local tools = heavy asset gen & bulk content.

## 🗂️ Codebase Map
Stack: ES6, Canvas 2D, localStorage, GitHub Pages deploy
Key Directories (current/expected):
/js/
  game.js            // state machine (EDIT OFTEN)
  battle.js          // turn-based combat (Gen 1 mechanics)
  world-maps.js      // map data & transitions (EDIT OFTEN)
  player.js          // inventory/party/money (EDIT OFTEN)
  ui.js              // menus/HUD/pause
  moves.js           // moves and effects
  train-data.js      // 151 trains (READ-ONLY: balanced)
/assets/
  tiles/             // tilesets (png)
  sprites/           // train battle sprites (front/back png)
  ui/                // fonts, icons
/DOCS/
  IMPLEMENTATION_PLAN.md
  ASSET_PIPELINE.md
  TASKLOG.md
/docs/               // design specs (READ-ONLY)
/tests/
Don’t Touch:
- train-data.js stats (assumed balanced)
- /docs/ narrative files (source of truth)

## 🏗️ Current Systems
| System | Status | Notes |
|---------|--------|-------|
| 151 trains+moves | ✅ | train-data.js, moves.js |
| Battle mechanics | ✅ | Gen 1 style flow |
| XP/Evolution | ✅ | Curves and triggers |
| Save/Load | ✅ | localStorage + export tokens |
| Touch controls | ✅ | D-Pad functional |
| Items | ❌ | #51 |
| Catching | ❌ | #27 (part of #51) |
| Money | ❌ | #53 |
| Trainer battles | ❌ | #49 |
| Doors/Transitions | ⚠️ | #52 |
| Heal/Shop | ❌ | #23, #24 |

## 📦 Versioning & Releases
Semantic Versioning MAJOR.MINOR.PATCH.
- Complete #52/#51/#53/#49 → bump MINOR (e.g., 0.5.0)
- Patch-level fixes (no new features) → bump PATCH
- M1 MVP complete → 1.0.0
Follow release checklist (CHANGELOG, tag, GH release, live test).

## 📋 Workflow
Session Start
1) Load correct agent (.claude/agents/)
2) Run /milestone1
3) Pick ONE P0/P1 issue on the critical path
4) Post plan before coding:
Goal: (1 sentence)
Plan: (3–5 bullets)
Files: (paths + line ranges)
Tests: (what you'll verify)
Risks: (what could break)
5) Offload assets/bulk data to local tools (see DOCS/ASSET_PIPELINE.md)

Before Merge Checklist
- Mobile controls tested
- Save/Load verified
- Tests pass (if present)
- Version bumped correctly
- Issue closed with “Fixes #N”
- Long context dumped to TASKLOG

## 🚨 Extended Pitfalls
Don’t deviate from /docs/ design (causes narrative & naming drift)
Don’t change train stats (balance regression)
Don’t break localStorage schema (corrupts saves)
Don’t paste huge files (context violation)
Don’t skip GitHub issues (memory loss)
Don’t generate art in-chat (wastes tokens; use GPU pipeline)
Don’t write bland dialogue (breaks tone)
Overbuild PRs >150 lines (blocked by hooks)

## 🎮 Gameplay Loop (M1 MVP)
Title → Intro → Starter → Piston Town → Route 1 → Wild Battles → XP/Evolve ✅
Catch Trains → Use Items → Earn Money → Shop → Heal → Trainer Battles → Gyms ❌

## 🎯 Milestone 1 MVP Criteria
[x] Boot, intro, starter selection
[x] Overworld movement
[x] Wild battles, XP, evolve
[ ] Catch trains
[ ] Use items in battle
[ ] Earn money
[ ] Buy items
[ ] Heal at Depot
[ ] Doors functional
[ ] Trainer battles
[ ] 30–60 min bug-free gameplay

## 🔧 Response Format
Goal / Plan / Files / Diffs / Tests / Follow-ups (Fixes #N)

## 🤖 Agent Handoff
Stop → Dump to TASKLOG → Update issue → Handoff
Agents: Enforcer PM | Gameplay | World | UI | QA

## 📞 Context Overflow Protocol
If >8k tokens:
1) Dump to TASKLOG
2) Create “Context Overflow – topic” issue
3) Restart with Enforcer PM
4) Reference issue #

## 🧭 Today’s Focus
Sprint: M1 MVP
Critical Path: #52 → #51 → #53 → #49
Start: #52 map transitions

## 📚 References
- Vjeux — Pokémon Red/Blue map reconstruction
- AI-assisted dev articles (asset gen workflows)
- Pokémon community engines (for mechanics)
- Conducted /docs/ for story/world specifics
