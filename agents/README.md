# Agent Framework - Usage Guide

This directory contains specialized agent templates for the multi-agent development framework.

## Quick Start

### For the Enforcer Agent

1. Read `AGENT_FRAMEWORK.md` in the parent directory
2. Read `enforcer-agent.md` (your role definition)
3. Review current project status
4. Create a sprint plan with clear goals
5. Assign tasks to specialized agents using the directive format
6. Monitor progress and conduct integration reviews

### For Specialized Agents

1. Read `AGENT_FRAMEWORK.md` for context
2. Read your specific agent file (e.g., `game-design-agent.md`)
3. Review your assigned task from the Enforcer Agent
4. Reference relevant design documents
5. Produce deliverables according to your role
6. Submit status reports to Enforcer Agent

## Agent Roles

| Agent | Primary Focus | Key Deliverables |
|-------|---------------|------------------|
| **Enforcer** | Project coordination, quality assurance | Master Design Document, sprint plans, integration checklists |
| **Game Design** | Mechanics, balance, systems | Game Design Document, balance spreadsheets, feature specs |
| **Art Direction** | Visual consistency, style enforcement | Art Style Guide, sprite specs, tileset designs, UI mockups |
| **Worldbuilding** | Story, lore, dialogue, characters | World Bible, character profiles, dialogue scripts, train descriptions |
| **Programming** | Technical implementation | Functional code, bug fixes, performance optimization |
| **Sound & Music** | Audio design (spec-only initially) | Music composition specs, sound effect library, audio guidelines |
| **Integration** | Testing, QA, validation | Test reports, bug reports, playtest feedback, sign-offs |

## Workflow Overview

```
1. PLANNING PHASE
   └── Enforcer creates sprint plan
       ├── Game Design writes specs
       ├── Art Direction creates visual specs
       └── Worldbuilding writes narrative content

2. IMPLEMENTATION PHASE
   └── Enforcer approves specs
       ├── Programming implements features
       ├── Sound & Music creates audio specs
       └── Art Direction reviews visual compliance

3. INTEGRATION PHASE
   └── Integration Agent tests all work
       ├── Reports bugs and issues
       ├── Programming fixes critical bugs
       └── Enforcer validates quality

4. REVIEW & ITERATION
   └── Enforcer conducts playtest
       ├── All agents review integrated build
       ├── Agents provide feedback
       └── Enforcer updates Master Design Document
```

## Communication Protocols

### Status Report Format
```
AGENT: [Agent Name]
TASK: [Current task from assignment]
STATUS: [In Progress / Blocked / Complete]
PROGRESS: [% complete or milestone reached]
DELIVERABLES: [What has been produced]
BLOCKERS: [Any issues preventing progress]
NEXT STEPS: [What will be done next]
```

### Directive Format (Enforcer to Agent)
```
TO: [Agent Name]
TASK: [Clear task description]
CONTEXT: [Why this task is needed]
ACCEPTANCE CRITERIA: [How success is measured]
DEADLINE: [Sprint or milestone]
DEPENDENCIES: [What must be complete first]
REFERENCE: [Links to relevant docs]
```

## Key Principles

1. **Single Source of Truth**: All agents reference the Master Design Document
2. **Locked Art Direction**: The art style cannot be changed (painterly pixel art)
3. **Iterative Refinement**: Agents work in cycles, reviewing each other's work
4. **Concrete Deliverables**: Every agent produces tangible outputs
5. **Integration-First**: All work must be tested before moving forward

## Quality Standards

All deliverables must meet these criteria:

### Code Quality
- Follows existing style
- Properly commented
- No console errors
- Cross-browser compatible
- Mobile-friendly
- 60fps performance

### Visual Quality
- Adheres to locked art style
- Consistent pixel density
- Smooth animations
- Cohesive color palettes
- Readable on small screens

### Content Quality
- Clear and engaging writing
- No typos or grammar errors
- Consistent tone
- Internally consistent lore
- Unique identity for all 151 trains

### Integration Quality
- No merge conflicts
- All features documented
- Save/load works correctly
- No game-breaking bugs
- Performance is acceptable

## File Structure

```
/conducted/
├── AGENT_FRAMEWORK.md           # Main framework document (READ THIS FIRST)
├── agents/
│   ├── README.md                # This file
│   ├── enforcer-agent.md        # Enforcer Agent role
│   ├── game-design-agent.md     # Game Design Agent role
│   ├── art-direction-agent.md   # Art Direction Agent role
│   ├── worldbuilding-agent.md   # Worldbuilding Agent role
│   ├── programming-agent.md     # Programming Agent role
│   ├── sound-music-agent.md     # Sound & Music Agent role
│   └── integration-agent.md     # Integration Agent role
├── docs/                        # Design documents (created by agents)
│   ├── MASTER_DESIGN_DOC.md     # Central reference (maintained by Enforcer)
│   ├── GAME_DESIGN.md           # Mechanics (by Game Design Agent)
│   ├── ART_STYLE_GUIDE.md       # Visuals (by Art Direction Agent)
│   ├── WORLD_BIBLE.md           # Lore (by Worldbuilding Agent)
│   ├── TECHNICAL_SPEC.md        # Code architecture (by Programming Agent)
│   ├── AUDIO_DESIGN.md          # Sound/music (by Sound & Music Agent)
│   └── INTEGRATION_CHECKLIST.md # Testing (by Integration Agent)
└── [game code files...]
```

## Current Project Status

### Completed
- ✅ Core battle system (Gen 1 formula)
- ✅ 151 train species with stats
- ✅ Mobile touch controls
- ✅ Save/load with export tokens
- ✅ Scrolling camera system
- ✅ 5 zones (Piston Town, Route 1, Coal Harbor, Ghost Graveyard, Voltage City)
- ✅ NPC dialogue and gym battles

### In Progress
- ⏳ Remaining 4 towns
- ⏳ Starter selection sequence
- ⏳ Complete world story arc
- ⏳ Enhanced train sprites

### Not Started
- ❌ Audio system (specs only)
- ❌ Victory Road
- ❌ Elite Four
- ❌ Post-game content
- ❌ Battle animations
- ❌ Evolution system

## Locked Art Style

**IMPORTANT**: The art style is immutable and cannot be changed.

**Style**: Painterly Pixel Art
- **Palette**: Muted earth tones (browns, greens, soft blues)
- **Characters**: Chibi proportions (2:3 head-to-body)
- **Trains**: Detailed (12-16 colors, visible textures)
- **Tiles**: 16x16 base, soft edges, gradient shading
- **Animation**: 2-4 frames, smooth interpolation
- **Effects**: Particle-based, subtle glow

All agents must adhere to this style. Art Direction Agent enforces compliance.

## How to Use This Framework

### If you are coordinating the project:
1. Read `AGENT_FRAMEWORK.md` thoroughly
2. Act as the Enforcer Agent
3. Create sprint plans with prioritized tasks
4. Assign tasks to specialized agents
5. Monitor progress and conduct integration reviews

### If you are implementing a specific feature:
1. Read the relevant agent file for your domain
2. Review assigned task from Enforcer
3. Reference design documents
4. Produce deliverables per your role
5. Submit for integration testing

## Example Sprint Plan

```markdown
# Sprint 1: Starter Selection & Town Expansion

## Goals
1. Implement intro sequence and starter selection
2. Complete 2 remaining towns (Steamspring Village, Diesel Den)
3. Write dialogue for all gym leaders

## Agent Assignments

### Game Design Agent
- Task: Balance starter train stats and evolution levels
- Deadline: Day 2

### Worldbuilding Agent
- Task: Write Professor Cypress dialogue for intro
- Task: Write gym leader personalities and dialogue
- Deadline: Day 3

### Programming Agent
- Task: Implement intro and starter selection system
- Task: Create 2 new town maps
- Deadline: Day 5
- Dependencies: Worldbuilding Agent's dialogue

### Integration Agent
- Task: Test starter selection once implemented
- Task: Test new town maps for collisions and bugs
- Deadline: Day 6

## Definition of Done
- Player can choose from 3 starters (Chuglet, Voltrail, Oilpup)
- Steamspring Village and Diesel Den are fully functional
- All gym leaders have complete dialogue
- No critical bugs
- Enforcer Agent approves
```

## Tips for Success

### For Enforcer Agent
- Keep agents unblocked (provide resources and context)
- Review deliverables promptly
- Make clear decisions on conflicts
- Update Master Design Document regularly

### For Specialized Agents
- Ask questions before implementing incorrectly
- Produce concrete deliverables (not just plans)
- Collaborate with other agents
- Submit status reports regularly

### For Integration Agent
- Test early and often
- Document reproduction steps clearly
- Prioritize bugs correctly
- Provide constructive feedback

## Getting Help

If you're stuck:
1. Review the main `AGENT_FRAMEWORK.md` document
2. Check your specific agent template
3. Ask the Enforcer Agent for clarification
4. Reference existing design documents

## Version History

- **v1.0** (2025-10-23): Initial framework created

---

**Ready to collaborate?** Start by reading the main `AGENT_FRAMEWORK.md` and your agent-specific file!
