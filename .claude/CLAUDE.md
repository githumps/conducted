# Claude Code Session Instructions for CONDUCTED

> **CRITICAL**: Read this file at the start of EVERY session to maintain coherence and keep context lean

## 📍 Project Context

**CONDUCTED** is a browser-based train battle RPG - a Pokemon Red/Blue replica where you catch, train, and battle trains instead of Pokemon. Built with pure JavaScript + HTML5 Canvas, no framework, mobile-optimized with touch controls.

**Repository**: `/Users/evan/Documents/GitHub/conducted`
**GitHub**: https://github.com/githumps/conducted
**Live Demo**: https://githumps.github.io/conducted/

---

## 🎯 Current Mission

**Goal**: Ship Milestone 1 MVP - A complete playable loop from Piston Town to Victory Rail

**Status**: ~40% complete - Game boots and basics work, but CRITICAL systems missing

**Blocking Issues** (must fix first):
- **#52** (P0) - Map transitions broken, can't enter some buildings
- **#51** (P1) - No item system (potions, trainballs)
- **#53** (P1) - No money/currency system
- **#49** (P1) - No trainer NPC battles yet

---

## ⚠️ HARD CONSTRAINTS (Never Break These)

### 1. Context Budget: Target <8,000 tokens per turn
- **Never paste full files** - use file paths + line ranges only
- Quote max 30 lines of code at a time
- Summarize long reasoning into DOCS/TASKLOG.md
- If response exceeds 1,800 tokens, hooks will auto-dump to TASKLOG

### 2. Memory Offloading: GitHub Issues are Your Long-Term Memory
- Every bug/feature MUST have a GitHub issue before coding
- Design decisions → GitHub issue comments
- Roadmap/planning → `DEVELOPMENT_ROADMAP.md` (already exists)
- Session notes → `DOCS/TASKLOG.md` (create with ISO timestamps)

### 3. Small Steps Only
- Max 150 lines changed per PR
- If larger, hooks will force a split plan
- Green builds only - broken tests block merge
- One issue per PR, link with "Fixes #N"

### 4. Issue-First Development
- Check existing 59 issues before creating new ones
- Use labels: `P0-critical`, `P1-high`, `P2-medium`, `P3-low`
- Use milestones: `milestone-1` through `milestone-6`
- Reference issues by number: `#52`, not descriptions

---

## 🗂️ Codebase Architecture

### Tech Stack
- **Language**: Pure JavaScript (ES6+), no TypeScript, no build step
- **Rendering**: HTML5 Canvas 2D context (1280x720 logical pixels)
- **State**: Object-oriented with game loop at 60 FPS
- **Storage**: localStorage for saves (with export/import tokens)
- **Mobile**: Touch D-Pad + A/B buttons, works on phones/tablets
- **Deploy**: GitHub Pages, auto-deploys from `main` branch

### Directory Structure
```
/js/                    # Core game engine (20 files, ~100KB total)
  ├── game.js           # Main game manager, state machine, ~935 lines
  ├── battle.js         # Turn-based battle engine, Gen 1 mechanics
  ├── graphics.js       # Canvas rendering, tile drawing, ~1,140 lines
  ├── train-data.js     # All 151 train species + stats + evolutions
  ├── moves.js          # Move database with damage calculations
  ├── world-maps.js     # Map data (Piston Town, Coal Harbor, Route 1, etc.)
  ├── player.js         # Player state, party management
  ├── ui.js             # UI components, menus, dialogue
  ├── input.js          # Keyboard + touch input handling
  ├── intro.js          # Title screen + starter selection
  └── ...11 more modules
/game/                  # IGNORE - legacy Python/Pygame version
/DOCS/                  # Long-term planning docs
  ├── TASKLOG.md        # AI reasoning dumps (YOU create this)
  └── CONTEXT-BUDGET.md # Rules for staying lean (YOU create this)
/docs/                  # Existing narrative/design specs (DO NOT EDIT)
  ├── DEVELOPMENT_ROADMAP.md  # 59 issues, 6 milestones (READ THIS)
  ├── WORLDBUILDING.md        # NPC dialogue, character scripts
  ├── STORY.md                # 8 gym leaders, Team Steam Punk plot
  ├── ART_DIRECTION_SPECS.md  # Pixel art guidelines
  └── AUDIO_SPECIFICATIONS.md # Music/SFX requirements
/tests/                 # Minimal tests (needs expansion)
/index.html             # Entry point
/styles.css             # Basic layout
```

### Key Files You'll Touch Often
- `js/game.js` (lines 284-300) - Door transition logic
- `js/world-maps.js` - Map definitions + door placements
- `js/player.js` - Inventory, money, party management
- `js/battle.js` - Battle loop, damage calc, rewards
- `js/ui.js` - Menus, HUD, item selection
- `js/train-data.js` - Train stats (READ ONLY - don't change!)

---

## 🏗️ What's Already Built (Don't Reinvent)

### ✅ Complete Systems
- **All 151 trains defined** in `train-data.js` (names, types, stats, evolutions)
- **All moves defined** in `moves.js` (power, accuracy, PP, type)
- **Battle system works** - Gen 1 damage formula, type chart, STAB, criticals
- **Level-up & evolution** - XP curves, evolution triggers
- **Save/load** - localStorage + export/import tokens
- **Touch controls** - Mobile D-Pad already implemented
- **Traindex viewer** - Pokédex equivalent, shows all trains
- **Starter selection** - Professor Cypress intro scene

### ⚠️ Partially Built (Needs Completion)
- **Overworld** - Piston Town & Coal Harbor exist, Route 1 partial
- **Menus** - Pause menu exists but incomplete
- **NPCs** - Dialogue system works, but few trainers implemented

### ❌ Missing / Broken (Your Focus)
- **Items** - No potions, trainballs, repels, etc. (#51)
- **Money** - No currency system (#53)
- **Trainer battles** - Can't fight NPCs yet (#49)
- **Healing** - Train Depot doesn't work (#23)
- **Shopping** - Rail Mart doesn't work (#24)
- **Map transitions** - Some doors broken (#52)
- **Capture** - Can't catch wild trains (#27)
- **Gym battles** - No station masters yet (#33)

---

## 📋 Development Workflow

### Starting a Session
1. **Load the right agent** (see `.claude/agents/`)
   - Enforcer PM → for roadmap/planning/issue triage
   - Gameplay Engineer → for battles/XP/evolution/items
   - World Engineer → for maps/doors/collision/encounters
   - UI Engineer → for menus/HUD/touch controls
   - QA Engineer → for tests/CI/bugs

2. **Check Milestone 1 status**: Run `/milestone1` command

3. **Pick ONE issue** from critical path, read its full description

4. **Post your plan** before coding:
   ```
   **Goal**: (1 sentence)
   **Plan**: (3-5 bullets)
   **Files**: (paths only)
   **Tests**: (what you'll test)
   **Risks**: (what could break)
   ```

### While Working
- **Reference files by path + lines**, not by pasting code
- **Test on mobile** after every UI change (touch controls!)
- **Run `npm run lint`** before committing (if you add lint scripts)
- **Check for save-load bugs** - always test saves work
- **Deterministic randomness** - use seeded RNG for testing

### Before Merging
- [ ] Tests pass (if tests exist)
- [ ] Lint clean (if lint configured)
- [ ] Mobile controls tested
- [ ] Save/load tested
- [ ] Issue closed with "Fixes #N"
- [ ] Context dumped to TASKLOG.md if session was long

---

## 🚨 Common Pitfalls to Avoid

1. **Don't break existing saves** - localStorage schema is sacred
2. **Don't change train stats** - 151 trains already balanced
3. **Don't remove mobile controls** - touch D-Pad must always work
4. **Don't paste huge files** - use line ranges + diffs only
5. **Don't skip GitHub issues** - memory offloading is mandatory
6. **Don't make giant PRs** - max 150 lines, hooks will block larger
7. **Don't ignore the roadmap** - DEVELOPMENT_ROADMAP.md is your guide

---

## 🎮 Game Loop Reference (for context)

```
Title Screen → Intro Scene → Starter Selection
     ↓
Piston Town (overworld)
     ↓
Walk in tall grass → Random encounter
     ↓
Wild Train Battle (turn-based)
     ↓
Defeat → Gain XP → Level Up → Maybe Evolve
     ↓
Low HP? → Go to Train Depot → Heal (NOT IMPLEMENTED YET)
     ↓
Need items? → Go to Rail Mart → Shop (NOT IMPLEMENTED YET)
     ↓
Trainer sees you → Trainer Battle (NOT IMPLEMENTED YET)
     ↓
Win → Earn Money (NOT IMPLEMENTED YET)
     ↓
Challenge Gym → Beat Station Master → Earn Badge (NOT IMPLEMENTED YET)
     ↓
Repeat for 8 badges → Victory Road → Elite Four → Champion
```

**Current Playable**: Title → Intro → Starter → Piston Town → Wild battles → XP/evolve → Save
**Blocked**: Everything after "Low HP?" due to missing systems

---

## 📊 Milestone 1 Acceptance Criteria

The MVP is complete when ALL of these work:

- [x] Boot to title, press Enter to start
- [x] Watch intro scene with Professor Cypress
- [x] Choose starter (Steamini, Sparkart, or Diesling)
- [x] Spawn in Piston Town, walk around
- [x] Wild train encounters in tall grass
- [x] Battle wild trains, win, gain XP, level up
- [x] Trains evolve at correct levels
- [ ] **Catch wild trains with Trainballs** (#27)
- [ ] **Use items in battle (Potions)** (#26)
- [ ] **Party management (switch trains, PC storage)** (#25, #28)
- [ ] **Earn money from battles** (#53)
- [ ] **Buy items at Rail Mart** (#24)
- [ ] **Heal at Train Depot** (#23)
- [ ] **Enter all buildings (doors work)** (#52)
- [ ] **Battle trainer NPCs** (#49)
- [ ] **Defeat respawn at last depot** (#56)
- [ ] **Pause menu works (Trains/Bag/Save/Options)** (#57)
- [ ] **30-60 minutes of bug-free gameplay**

---

## 🔧 Response Format Template

When proposing changes, ALWAYS use this format:

```markdown
## Goal
(1-2 sentences - what are you fixing/building?)

## Plan
1. (Step one)
2. (Step two)
3. (Step three)
4. (Step four - max 6 steps)

## Files Touched
- path/to/file.js (lines 100-150 - what you're changing)
- path/to/other.js (lines 50-75 - what you're adding)

## Diffs
(Show ONLY the hunks that change, max 30 lines total)

## Tests
- [ ] Manual test: (describe user action → expected result)
- [ ] Edge case: (what breaks if this fails?)
- [ ] Mobile: (does touch control work?)
- [ ] Save/load: (does game still load after this change?)

## Follow-ups
- Link to any new issues created
- Link to issues this closes (Fixes #N)
```

---

## 🤖 Agent Handoff Protocol

If you realize you're the wrong agent for the task:

1. Stop immediately
2. Summarize what you learned (max 100 tokens)
3. Post to DOCS/TASKLOG.md with ISO timestamp
4. Create/update the relevant GitHub issue
5. State which agent should take over (Enforcer PM / Gameplay / World / UI / QA)

**Do NOT try to do work outside your specialty** - handoffs keep context lean.

---

## 📞 Emergency Context Reset

If context exceeds 8k tokens or you're confused:

1. Dump everything to `DOCS/TASKLOG.md` with ISO timestamp
2. Create a GitHub issue titled "Context Overflow - [topic]" with summary label
3. Close the current chat
4. Start fresh with Enforcer PM agent
5. Reference the new issue number to continue

---

## 🎯 Today's Focus (Update Daily)

**Current Sprint**: Milestone 1 MVP - Core Gameplay Loop
**Critical Path**: #52 → #51 → #53 → #49 → #23 → #24
**Next Up**: Fix map transitions so all buildings are enterable
**Blocked By**: None currently
**Last Updated**: 2025-10-30

---

**Remember**: Small steps, GitHub issues for memory, max 8k context, always test on mobile.

Now go build! 🚂
