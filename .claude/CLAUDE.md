# Claude Code Session Instructions for CONDUCTED

> **READ THIS FIRST**: Start EVERY session here to maintain coherence

## 📍 Quick Context

**CONDUCTED** = Browser-based train battle RPG (Pokemon Red/Blue with trains)
- Pure JS + Canvas, no framework, mobile-optimized
- Repo: `/Users/evan/Documents/GitHub/conducted`
- Live: https://githumps.github.io/conducted/
- **Status**: ~40% complete, Milestone 1 MVP in progress

**Blocking Issues**: #52 (map transitions) → #51 (items) → #53 (money) → #49 (trainer battles)

---

## ⚠️ HARD RULES (Never Break)

### Context Budget: <8k tokens/turn
- Quote max 30 lines of code at once
- Use file paths + line ranges, not full pastes
- Dump long reasoning to `DOCS/TASKLOG.md`

### Memory = GitHub Issues
- Every bug/feature needs an issue before coding
- Design decisions → issue comments
- Planning → `DEVELOPMENT_ROADMAP.md`
- Session notes → `DOCS/TASKLOG.md` (ISO timestamps)

### Small Steps Only
- Max 150 lines/PR (hooks enforce this)
- One issue per PR: "Fixes #N"
- Green builds only
- Mobile + save/load tested before merge

---

## 🗂️ Codebase Map

**Stack**: Pure JS (ES6+), Canvas 2D, localStorage, GitHub Pages deploy

**Key Directories**:
```
/js/              Core engine (20 files)
  ├── game.js         State machine, 935 lines, EDIT OFTEN
  ├── battle.js       Turn-based combat, Gen 1 mechanics
  ├── world-maps.js   Map data, EDIT OFTEN for doors
  ├── player.js       Inventory/party, EDIT OFTEN
  ├── ui.js           Menus/HUD
  └── train-data.js   151 trains (READ ONLY - balanced!)
/DOCS/            Planning docs (YOU create TASKLOG.md)
/docs/            Design specs (READ ONLY - existing)
/tests/           Minimal (needs expansion)
```

**Don't Touch**:
- `/game/` (legacy Python version)
- `train-data.js` stats (already balanced)
- `/docs/` narrative files (read-only specs)

---

## 🏗️ What Exists

| System | Status | Notes |
|--------|--------|-------|
| 151 trains + moves | ✅ Complete | train-data.js, moves.js |
| Battle mechanics | ✅ Works | Gen 1 formula, type chart, STAB |
| XP/evolution | ✅ Works | Curves, triggers implemented |
| Save/load | ✅ Works | localStorage + export tokens |
| Touch controls | ✅ Works | Mobile D-Pad functional |
| Items | ❌ Missing | #51 - No potions/trainballs |
| Money | ❌ Missing | #53 - No currency system |
| Trainer battles | ❌ Missing | #49 - Can't fight NPCs |
| Map doors | ⚠️ Broken | #52 - Some buildings inaccessible |
| Healing/Shopping | ❌ Missing | #23, #24 - Depot/Mart broken |

---

## 📦 Versioning & Releases

**Semantic Versioning**: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Milestone completions (M1 = v1.0.0, M2 = v2.0.0, etc.)
- **MINOR** (0.1.0): New features within milestone (items system, trainer battles)
- **PATCH** (0.0.1): Bug fixes, refactors, no new functionality

**Current Version**: `0.4.0` (~40% to M1 MVP)

### Release Checklist
- [ ] Update version in `package.json` (if exists) or `index.html` meta tag
- [ ] Tag commit: `git tag v0.4.1`
- [ ] Update CHANGELOG.md with changes
- [ ] GitHub release with notes
- [ ] Test deployed version on GitHub Pages

### Version Triggers
- Complete #52, #51, #53, #49 → **v0.5.0** (major features)
- Fix door bug only → **v0.4.1** (patch)
- Finish ALL M1 criteria → **v1.0.0** (milestone release)

**Tag Format**: `v0.4.1` (always prefix with 'v')

---

## 📋 Workflow

### Session Start
1. **Load correct agent** (`.claude/agents/`)
2. **Check Milestone 1**: Run `/milestone1`
3. **Pick ONE P0/P1 issue** from critical path
4. **Post plan before coding**:
```
   Goal: (1 sentence)
   Plan: (3-5 bullets)
   Files: (paths + line ranges)
   Tests: (what you'll verify)
   Risks: (what could break)
```

### Before Merge Checklist
- [ ] Mobile controls tested
- [ ] Save/load verified
- [ ] Tests pass (if exist)
- [ ] **Version bumped appropriately** (semver)
- [ ] Issue closed: "Fixes #N"
- [ ] Context dumped to TASKLOG if >6k tokens

---

## 🚨 Common Pitfalls

| Don't | Why |
|-------|-----|
| Break localStorage schema | Corrupts existing saves |
| Change train stats | 151 trains already balanced |
| Remove touch controls | Mobile players stranded |
| Paste huge files | Context budget violation |
| Skip GitHub issues | Memory loss between sessions |
| Make 200+ line PRs | Hooks will block merge |

---

## 🎮 Game Loop Status
```
Title → Intro → Starter Selection → Piston Town → Wild Battles → XP/Evolve
  ✅       ✅         ✅                  ✅              ✅            ✅

→ Catch Trains → Use Items → Earn Money → Shop → Heal → Trainer Battles → Gyms
      ❌            ❌           ❌         ❌      ❌          ❌            ❌
```

**Currently Playable**: First 20 min (title through starter battles + evolution)  
**Blocked**: Everything requiring items/money/NPCs

---

## 🎯 Milestone 1 MVP Criteria

**Must Work**:
- [x] Boot, intro, starter selection
- [x] Overworld movement in Piston Town
- [x] Wild encounters + battles
- [x] XP gain, level-up, evolution
- [ ] **Catch trains (#27)**
- [ ] **Use items in battle (#26)**
- [ ] **Earn money from wins (#53)**
- [ ] **Buy items at Rail Mart (#24)**
- [ ] **Heal at Train Depot (#23)**
- [ ] **All doors functional (#52)**
- [ ] **Battle trainer NPCs (#49)**
- [ ] **30-60 min bug-free gameplay**

---

## 🔧 Response Format
```markdown
## Goal
(1-2 sentences)

## Plan
1-4 numbered steps

## Files
- path/file.js (lines X-Y: description)

## Diffs
(Max 30 lines, hunks only)

## Tests
- Manual: (action → expected result)
- Edge case: (failure mode)
- Mobile: (touch works?)

## Follow-ups
Fixes #N, creates #M
```

---

## 🤖 Agent Handoff

Wrong specialty? **Stop → Dump to TASKLOG → Update issue → Name correct agent**

Agents: Enforcer PM | Gameplay | World | UI | QA

---

## 📞 Context Overflow Protocol

If >8k tokens:
1. Dump to `DOCS/TASKLOG.md` (ISO timestamp)
2. Create issue: "Context Overflow - [topic]"
3. Close chat, restart with Enforcer PM
4. Reference new issue #

---

## 🎯 Today's Focus

**Sprint**: Milestone 1 MVP  
**Critical Path**: #52 → #51 → #53 → #49  
**Next**: Fix map transitions  
**Updated**: 2025-10-30

**Remember**: Small steps. GitHub issues for memory. <8k context. Test mobile.

🚂