# Multi-Agent Development Framework
## Train Battle RPG - Agent Coordination System

This framework establishes a multi-agent architecture for game development, where specialized agents collaborate under the coordination of an Enforcer Agent to create a cohesive, high-quality game.

---

## Core Principles

1. **Single Source of Truth**: All agents reference and update a central design document
2. **Locked Art Direction**: The art style is immutable once established
3. **Iterative Refinement**: Agents work in cycles, reviewing each other's work
4. **Concrete Deliverables**: Every agent produces tangible outputs (code, assets, documents)
5. **Integration-First**: All work must be tested and integrated before moving forward

---

## Art Style Lock

**STATUS: LOCKED - DO NOT MODIFY**

### Visual Style: Painterly Pixel Art
- **Color Palette**: Muted earth tones, warm and inviting
- **Character Style**: Chibi proportions (2:3 head-to-body ratio)
- **Train Sprites**: Detailed with visible textures, metallic sheens, type-specific features
- **Environments**: Lush, handcrafted tilesets with soft gradients
- **Animation**: Smooth, minimal (idle breathing, wheel rotation, subtle effects)
- **UI**: Clean, Game Boy Advance inspired with modern clarity

All agents must adhere to this style. No exceptions.

---

## Agent Roles and Responsibilities

### 1. Enforcer Agent (Project Manager)
**Role**: Coordinates all agents, ensures deliverables meet quality standards, maintains project timeline

**Responsibilities**:
- Spin up specialized agents as needed
- Review all deliverables for quality and coherence
- Resolve conflicts between agent outputs
- Maintain the master design document
- Ensure art style compliance
- Track progress and blockers
- Make final decisions on feature inclusion

**Deliverables**:
- Master Design Document (MDD)
- Sprint plans and progress reports
- Integration checklists
- Agent task assignments

**Communication Protocol**:
- Receives status reports from all agents
- Issues directives with clear acceptance criteria
- Conducts integration reviews

---

### 2. Game Design Agent
**Role**: Define game mechanics, systems, balance, and player experience

**Responsibilities**:
- Design core gameplay loops
- Balance combat and progression systems
- Define difficulty curves
- Create item and ability systems
- Design menu and UI flows
- Write game design documents (GDD)

**Deliverables**:
- Game Design Document (GDD)
- Balance spreadsheets (stats, levels, encounters)
- Feature specifications
- Player progression charts
- Economy design (money, items, rewards)

**Success Criteria**:
- Systems are mathematically balanced
- Mechanics align with Pokemon Gen 1 feel
- Progression feels rewarding without grinding
- All systems documented with formulas

---

### 3. Art Direction Agent
**Role**: Maintain visual consistency, create sprite specifications, define color palettes

**Responsibilities**:
- Enforce the locked art style
- Create detailed sprite specifications
- Define color palettes for all zones
- Design UI mockups
- Create tile palette for each biome
- Review all visual assets for consistency

**Deliverables**:
- Art Style Guide (comprehensive)
- Sprite specification sheets (dimensions, colors, animations)
- Tileset designs for each biome
- UI mockups for all screens
- Color palette documentation
- Animation timing charts

**Success Criteria**:
- All visuals adhere to locked art style
- Sprites are recognizable and distinct
- Color palettes evoke proper mood per zone
- No visual inconsistencies

**LOCKED STYLE REFERENCE**:
```
Painterly Pixel Art
├── Palette: Muted earth tones (browns, greens, soft blues)
├── Characters: Chibi (large heads, small bodies, expressive)
├── Trains: Detailed (12-16 colors per sprite, visible textures)
├── Tiles: 16x16 base, soft edges, gradient shading
├── Animation: 2-4 frames, smooth interpolation
└── Effects: Particle-based, subtle glow
```

---

### 4. Worldbuilding Agent
**Role**: Create narrative, lore, characters, dialogue, and world structure

**Responsibilities**:
- Write overarching story and character arcs
- Design all 8 towns with unique identities
- Create NPC personalities and dialogue trees
- Define legendary train lore
- Write gym leader backstories
- Create route themes and connections

**Deliverables**:
- World Bible (lore, history, geography)
- NPC dialogue scripts (all characters)
- Town design documents (layout, theme, NPCs)
- Quest and event scripts
- Item descriptions
- Pokedex-style train descriptions

**Success Criteria**:
- Story feels cohesive and engaging
- Each town has distinct personality
- NPCs have memorable dialogue
- Lore explains game mechanics
- All 151 trains have unique descriptions

---

### 5. Programming Agent
**Role**: Implement game systems, write clean maintainable code, optimize performance

**Responsibilities**:
- Implement game mechanics from GDD
- Write battle system with damage formulas
- Create map and camera systems
- Implement save/load functionality
- Build UI systems
- Optimize for mobile and desktop
- Debug and fix issues

**Deliverables**:
- Fully functional game code (JavaScript/HTML5 Canvas)
- Technical documentation
- Code comments and structure
- Performance benchmarks
- Bug reports and fixes
- Unit tests for critical systems

**Success Criteria**:
- Code runs smoothly (60fps target)
- No game-breaking bugs
- Save/load works reliably
- Mobile controls are responsive
- Code is modular and maintainable

---

### 6. Sound & Music Agent
**Role**: Design audio landscape, create music themes, define sound effects

**Responsibilities**:
- Compose music themes for each zone
- Define sound effects for all actions
- Create audio specifications
- Balance audio levels
- Design adaptive music system

**Deliverables**:
- Music composition specifications
- Sound effect library specifications
- Audio implementation guide
- Adaptive music system design
- Volume and mixing guidelines

**Success Criteria**:
- Each town has unique musical identity
- Sound effects enhance gameplay
- Audio complements painterly art style
- No jarring or repetitive sounds

**Note**: Initially will be specification-only (no actual audio files)

---

### 7. Integration Agent
**Role**: Ensure all systems work together, test for bugs, validate deliverables

**Responsibilities**:
- Integrate code from Programming Agent
- Test all game systems end-to-end
- Validate assets against specifications
- Run playtests and report issues
- Ensure mobile compatibility
- Create integration checklists

**Deliverables**:
- Integration test reports
- Bug reports with reproduction steps
- Playtest feedback documents
- Cross-browser compatibility report
- Performance benchmarks
- Sign-off reports for each feature

**Success Criteria**:
- All systems integrate without conflicts
- No critical bugs in integrated build
- Game is playable start-to-finish
- Mobile and desktop both work

---

## Workflow: Agent Collaboration Cycle

### Phase 1: Planning
1. **Enforcer Agent** creates sprint plan with feature targets
2. **Game Design Agent** writes specifications for features
3. **Art Direction Agent** creates visual specifications
4. **Worldbuilding Agent** writes narrative content
5. **Enforcer Agent** reviews and approves all specs

### Phase 2: Implementation
1. **Programming Agent** implements approved features
2. **Sound & Music Agent** creates audio specifications
3. **Enforcer Agent** monitors progress, resolves blockers

### Phase 3: Integration & Testing
1. **Integration Agent** merges and tests all work
2. **Integration Agent** reports bugs and issues
3. **Programming Agent** fixes critical issues
4. **Enforcer Agent** validates quality standards

### Phase 4: Review & Iteration
1. **Enforcer Agent** conducts playtest
2. All agents review integrated build
3. Agents provide feedback for next iteration
4. **Enforcer Agent** updates Master Design Document

---

## Communication Protocols

### Agent Status Report Format
```
AGENT: [Agent Name]
TASK: [Current task from assignment]
STATUS: [In Progress / Blocked / Complete]
PROGRESS: [% complete or milestone reached]
DELIVERABLES: [What has been produced]
BLOCKERS: [Any issues preventing progress]
NEXT STEPS: [What will be done next]
```

### Enforcer Directive Format
```
TO: [Agent Name]
TASK: [Clear task description]
CONTEXT: [Why this task is needed]
ACCEPTANCE CRITERIA: [How success is measured]
DEADLINE: [Sprint or milestone]
DEPENDENCIES: [What must be complete first]
REFERENCE: [Links to relevant docs]
```

### Integration Request Format
```
FROM: [Agent Name]
FEATURE: [What is being integrated]
FILES CHANGED: [List of modified files]
TESTING DONE: [What was tested]
KNOWN ISSUES: [Any remaining bugs]
SIGN-OFF REQUIRED: [Which agents must approve]
```

---

## Master Design Document Structure

The MDD is the single source of truth maintained by the Enforcer Agent:

```
/docs/
├── MASTER_DESIGN_DOC.md       # Central reference
├── GAME_DESIGN.md             # Mechanics and systems
├── ART_STYLE_GUIDE.md         # Visual standards (LOCKED)
├── WORLD_BIBLE.md             # Lore and story
├── TECHNICAL_SPEC.md          # Code architecture
├── AUDIO_DESIGN.md            # Sound and music
├── INTEGRATION_CHECKLIST.md   # Testing standards
└── CHANGELOG.md               # Version history
```

---

## Quality Standards

All deliverables must meet these criteria:

### Code Quality
- [ ] Follows existing code style
- [ ] Properly commented
- [ ] No console errors
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Works on mobile (iOS and Android)
- [ ] Maintains 60fps on moderate hardware

### Visual Quality
- [ ] Adheres to locked art style
- [ ] Consistent pixel density
- [ ] Smooth animations (2-4 frames)
- [ ] Color palette is cohesive
- [ ] Readable on small screens

### Content Quality
- [ ] Writing is clear and engaging
- [ ] No typos or grammar errors
- [ ] Consistent tone and voice
- [ ] Lore is internally consistent
- [ ] All 151 trains have unique identity

### Integration Quality
- [ ] No merge conflicts
- [ ] All features documented
- [ ] Save/load preserves all data
- [ ] No game-breaking bugs
- [ ] Performance is acceptable

---

## Current Project Status

### Completed Features
- ✅ Core battle system (Gen 1 formula)
- ✅ 151 train species with stats
- ✅ 8 train types with effectiveness chart
- ✅ Mobile touch controls
- ✅ Save/load with export tokens
- ✅ Scrolling camera system
- ✅ World map with 5 zones (Piston Town, Route 1, Coal Harbor, Ghost Graveyard, Voltage City)
- ✅ NPC interaction and dialogue
- ✅ Gym leader battles with badge system

### In Progress
- ⏳ Remaining 4 towns (Steamspring, Diesel Den, Maglev Heights, Nuclear Station, Monorail Mountaintop)
- ⏳ Proper intro sequence with starter selection
- ⏳ Complete world story arc
- ⏳ Enhanced train sprite details

### Not Started
- ❌ Audio system (specifications only)
- ❌ Victory Road
- ❌ Elite Four
- ❌ Post-game content
- ❌ Battle animations
- ❌ Evolution system

---

## How to Use This Framework

### For the Enforcer Agent:
1. Read this document thoroughly
2. Review current project status above
3. Create sprint plan with prioritized tasks
4. Assign tasks to specialized agents with clear directives
5. Monitor progress and resolve blockers
6. Conduct integration reviews
7. Update Master Design Document

### For Specialized Agents:
1. Read your agent section above
2. Review assigned task from Enforcer
3. Reference relevant design documents
4. Produce deliverables per your role
5. Submit status reports to Enforcer
6. Collaborate with other agents as needed
7. Respond to feedback and iterate

### For Integration:
1. Programming Agent submits code
2. Integration Agent tests thoroughly
3. Integration Agent reports bugs
4. Enforcer Agent reviews quality
5. Enforce approves or requests revisions
6. Repeat until quality standards met

---

## Success Metrics

The project is successful when:
- [ ] Game is playable from start to finish
- [ ] All 8 gym leaders are defeatable
- [ ] All 151 trains are implemented with unique sprites
- [ ] Story is complete and engaging
- [ ] Art style is consistent throughout
- [ ] No game-breaking bugs
- [ ] Mobile and desktop both work smoothly
- [ ] Save/load is reliable
- [ ] Performance is smooth (60fps)
- [ ] Code is maintainable

---

**Framework Version**: 1.0
**Last Updated**: 2025-10-23
**Maintained By**: Enforcer Agent
