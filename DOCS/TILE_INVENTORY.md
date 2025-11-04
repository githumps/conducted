# CONDUCTED - Tile Asset Inventory & Gap Analysis

**Date:** 2025-11-03  
**Scope:** Complete tile system documentation for M1 MVP  
**Status:** Routes & basic interiors prioritized for #52 (map transitions)

---

## Executive Summary

CONDUCTED uses a tile-based system with:
- **Tile Size:** 16×16 pixels (standard Game Boy style)
- **Tileset Format:** 512×512 PNG sheets (32×32 grid = 1024 tiles potential per sheet)
- **Tile System:** Index-based (0-12+ coded as TILE_TYPES in world-maps.js)
- **Color System:** Placeholder colors (overrides graphics.js) + real asset fallback

**Current State:**
- 3 primary tilesets active (piston-town.png, route-grass.png, interiors-lab.png)
- 80+ generated tileset variants (routes, forests, caves, cities, etc.)
- 48 individual building/decor assets for Piston Town refinement
- **CRITICAL GAP:** No ledge/border/sign tiles for proper route design

---

## Tile Type System (from world-maps.js)

### Core Tile Types (TILE_TYPES constant)

```javascript
const TILE_TYPES = {
  BLOCKED: 0,      // Walls, buildings, trees - CANNOT walk
  WALKABLE: 1,     // Paths, floors - can walk
  GRASS: 2,        // Grass - can walk, encounters possible
  TALL_GRASS: 3,   // Tall grass - can walk, MORE encounters
  DOOR: 12,        // Doors - can walk, triggers warp
  WATER: 5         // Water - CANNOT walk (unless surfing later)
};
```

### Collision Rules

**Walkable Tiles:** 1, 2, 3, 12  
**Blocked Tiles:** 0, 5  

Reference: world-maps.js:98 `walkableTiles = [1, 2, 3, 12]`

### Legacy Tile Types (from map.js - older system)

These appear in comments/historical code but NOT currently used:

```
4  = WATER (reserved, currently uses 5)
6  = RAILS
7  = BUILDING
8  = STATION
9  = GRAVEYARD
10 = SAND
11 = CAVE
```

**Note:** Discrepancy exists between world-maps.js (5 = WATER) and map.js comments (4 = WATER). Current system uses 5.

---

## Active Tilesets (Currently Used)

### Piston Town (PRIMARY)

**File:** `/assets/tiles/piston-town.png` (512×512)  
**Used In:** PistonTown map (20×15 tiles)  
**Tile Count:** Up to 1024 tiles in sheet, ~200 actively used  
**Biome:** Town/settlement  
**Tiles Included:**
- Grass (variations)
- Tall grass
- Paths/roads (tan/brown)
- Doors (brown)
- Void/blocked areas

**Status:** Visually complete but raw asset. Needs integration with tileset loader.

---

### Route Grass (SECONDARY)

**File:** `/assets/tiles/route-grass.png` (512×512)  
**Used In:** Route1 map (20×15 tiles)  
**Tile Count:** Limited, mostly tall grass + borders  
**Biome:** Grassy route/meadow  
**Tiles Included:**
- Tall grass (dark green)
- Cliff/border tiles (gray/black)

**Status:** Minimal. Needs path tiles, signs, ledges.

---

### Lab Interior (SECONDARY)

**File:** `/assets/tiles/interiors-lab.png` (512×512)  
**Used In:** LabInterior map (10×10 tiles)  
**Tile Count:** Limited  
**Biome:** Building interior  
**Tiles Included:**
- Floor (light)
- Walls (dark)

**Status:** Minimal but functional.

---

## Generated Tileset Variants (Experimental)

Located in `/assets/tiles/generated/` - these are AI-generated variants created via Stable Diffusion (ComfyUI).  
**Current Status:** Variants exist but NOT integrated into game maps yet.

### Route Assets (6 variants each)

- `route-grass-1.png` through `route-grass-6.png` - Grassy meadow variations
- **Status:** Exist but unused. Should evaluate and select best 1-2 for Route1 redesign.

### Biome Types (6 variants each)

1. **Forest** (6 variants) - Dense vegetation, trees
2. **Cave** (6 variants) - Rocky, stalagmites
3. **Mountain** (6 variants) - Cliffs, snow, peaks
4. **Water Route** (6 variants) - Ocean, waves, shore, sand
5. **City** (6 variants) - Buildings, houses, streets
6. **Railyard** (6 variants) - Tracks, metal, gears, industrial

**Status:** All exist; awaiting integration into world-maps.js and proper tile slicing.

---

## Interior Tileset Variants (Experimental)

Located in `/assets/tiles/interiors-generated/` - building interior variations.

### Interior Types (6 variants each)

1. **Lab** (6 variants) - Professor's laboratory
2. **House** (6 variants) - Residential dwelling
3. **Mart** (6 variants) - Train shop
4. **Gym** (6 variants) - Trainer gym
5. **Healing Depot** (6 variants) - Hospital/healing center
6. **Museum** (6 variants) - Museum building

**Status:** All exist; awaiting integration.

---

## Piston Town Refinement Assets

Located in `/assets/tiles/piston-town/` - detailed building & decor components.

### Asset Breakdown (8 variants each)

1. **town-buildings** (8 variants) - Houses, shops, NPCs buildings
2. **depot** (8 variants) - Train depot/station building
3. **lab-building** (8 variants) - Professor's lab building
4. **town-paths** (8 variants) - Road/path variations
5. **town-square** (8 variants) - Central plaza tiles
6. **town-decor** (8 variants) - Trees, fences, decorative objects

**Total:** 48 individual refinement assets  
**Purpose:** Hand-curated, high-quality Piston Town visuals  
**Status:** Exist but NOT integrated. Awaiting manual selection & tiling.

---

## Rendering System

### How Tiles Are Drawn

From `js/graphics.js:37-42`:

```javascript
function drawTile(ctx, tileset, tileIndex, dx, dy) {
  if (tileIndex < 0) return; // -1 = empty/no-op
  const { image, tileSize, cols } = tileset;
  const sx = (tileIndex % cols) * tileSize;        // Column in tileset
  const sy = Math.floor(tileIndex / cols) * tileSize; // Row in tileset
  ctx.drawImage(image, sx, sy, tileSize, tileSize, dx, dy, tileSize, tileSize);
}
```

### Tileset Configuration

From `graphics.js:22-33`:

```javascript
async function loadTileset({ src, tileSize = TILE_SIZE, atlasJson = null }) {
  const image = await loadImage(src);
  const cols = Math.floor(image.width / tileSize);  // Columns in sheet
  const rows = Math.floor(image.height / tileSize); // Rows in sheet
  return {
    src, image, tileSize, cols, rows,
    atlas: atlasJson  // Optional: { [name]: index } mapping
  };
}
```

**For 512×512 sheet with 16×16 tiles:** 32×32 grid = 1024 potential tiles

### Placeholder Color System

From `game.js:963-975`:

```javascript
Game.prototype.getTileColor = function(tile) {
    const colors = {
        0: '#000000', // void/wall (black)
        1: '#00AA00', // grass (green)
        2: '#00FF00', // tall grass (bright green)
        3: '#CCAA88', // path (tan)
        4: '#0066FF', // water (blue) [legacy]
        5: '#666666', // wall (gray)
        6: '#888888', // rails (light gray) [legacy]
        12: '#8B4513' // door (brown)
    };
    return colors[tile] || '#FF00FF'; // Pink for undefined
};
```

**Note:** Colors are fallback only. Real PNG tilesets override this.

---

## Map Specifications

### PistonTown

```
Dimensions: 20×15 tiles (320×240 px at 16px/tile)
Tileset: assets/tiles/piston-town.png
Tiles Used: 0 (wall), 1 (grass), 2 (tall grass), 3 (path), 5 (building), 12 (door)
Spawn Point: (10, 7)
Walkable: [1, 2, 3, 12]
Encounters: None (checkForEncounter = false)
```

### Route1

```
Dimensions: 20×15 tiles (320×240 px at 16px/tile)
Tileset: assets/tiles/route-grass.png
Tiles Used: 2 (tall grass), 5 (cliff/wall)
Spawn Point: (10, 0) [from PistonTown (10, 14)]
Walkable: [2, 3]
Encounters: 10% per step (getRandomEncounter = levels 3-7, species 1-20)
```

### LabInterior

```
Dimensions: 10×10 tiles (160×160 px)
Tileset: assets/tiles/interiors-lab.png
Tiles Used: 0 (floor), 3 (wall)
Spawn Point: (4, 7) [from PistonTown (9, 5)]
Walkable: [0, 12]
Encounters: None
```

---

## Tile ID Mapping System

### Current Implementation (Index-Based)

The game uses **simple tile index mapping**:
- Tileset is a grid of 16×16 tiles
- Index 0 = top-left (0,0) position
- Index N = calculated as: `row = N / cols; col = N % cols`
- Rendering uses this to slice from the PNG sheet

**Example (32×32 grid sheet):**
```
Index 0   → (0,0)   → (0px, 0px)
Index 1   → (0,1)   → (16px, 0px)
Index 32  → (1,0)   → (0px, 16px)
Index 33  → (1,1)   → (16px, 16px)
```

### Tile Assignments in Maps

Each map's `tiles` array stores indices:

```javascript
Route1: {
  tiles: [
    [5, 5, 5, 5, 5, ...],  // Row 0: all cliffs
    [5, 2, 2, 2, 5, ...],  // Row 1: cliffs, tall grass
    [5, 2, 2, 2, 5, ...],
    ...
  ]
}
```

### No Atlas JSON Currently

Maps do NOT use named atlas mappings (e.g., `"grass": 10, "tree": 45`).  
This could be added in future for clarity.

---

## CRITICAL GAPS - What's Missing for Route 1

The following tile types are **NOT available** but are **ESSENTIAL** for proper Pokémon-style route design:

### 1. Border/Ledge Tiles (HIGH PRIORITY)

**Why Needed:** Pokémon routes have cliffs you can't fall off; impassable terrain creates natural boundaries.  
**Current:** Using tile `5` (blocked/wall) which renders as gray blocks - looks unnatural.  
**What's Missing:**
- Cliff edges (north, south, east, west faces)
- Ledge ledges (passable cliff sides)
- Rocky borders with vegetation

**Asset Needed:** Route border tileset with:
- Cliff north edge (flat top)
- Cliff south edge (overhang)
- Cliff east edge (vertical wall)
- Cliff west edge (vertical wall)
- Corner transitions (4-way)
- Ledge with grass variations

---

### 2. Path/Dirt Road Tiles (HIGH PRIORITY)

**Why Needed:** Routes need obvious walking paths; tall grass everywhere is confusing.  
**Current:** Tile `3` (path) is used in town but route-grass.png has no equivalent.  
**What's Missing:**
- Horizontal path (1 tile wide)
- Vertical path (1 tile wide)
- 4-way intersection
- T-junctions (3-way)
- Path-to-grass transitions
- Dirt variants (reddish, darker, lighter)

**Asset Needed:** Route path tileset with directional transitions.

---

### 3. Grass Variations (MEDIUM PRIORITY)

**Why Needed:** Visual interest; prevents tiling monotony.  
**Current:** Tile `2` (tall grass) is uniform bright green.  
**What's Missing:**
- Short grass (lighter)
- Tall grass (current - keep)
- Flowers in grass (small patch)
- Grass with rocks
- Grass clumps (different color variation)

**Asset Needed:** 4-6 grass variation tiles.

---

### 4. Sign Tiles (MEDIUM PRIORITY)

**Why Needed:** Pokémon routes have signs with location/lore; needed for immersion.  
**Current:** None.  
**What's Missing:**
- Wooden sign (generic)
- Sign post with text area
- Warning sign
- Directional sign variations

**Asset Needed:** 2-4 sign variations (static objects, don't need animation).

---

### 5. Tree Tiles (MEDIUM PRIORITY)

**Why Needed:** Routes have trees; create visual interest and block paths naturally.  
**Current:** None specific to routes (Piston Town has some but not route-style).  
**What's Missing:**
- Tall tree (single or multi-tile)
- Tree cluster
- Pine tree (winter style)
- Deciduous tree (summer style)
- Tree with passable side (scenic blocker)

**Asset Needed:** 3-5 tree tile variations.

---

### 6. Water/Pond Tiles (MEDIUM PRIORITY)

**Why Needed:** Routes often have water features; future Surf mechanic.  
**Current:** Tile `5` can't be used (already = wall). Tile `4` is legacy/unused.  
**What's Missing:**
- Still water (pond)
- Shallow water (wading)
- Beach/sand transition to water
- Animated water (if possible)

**Asset Needed:** Water tileset for routes near water.

---

### 7. Fence/Gate Tiles (LOW PRIORITY - M2+)

**Why Needed:** Fences create visual barriers; gates block routes until quest completion.  
**Current:** None.  
**What's Missing:**
- Wooden fence (horizontal)
- Metal fence (railyard style)
- Gate (closed, open)
- Fence corner/posts

**Asset Needed:** For future Ranch, Gate, and post-game areas.

---

### 8. Sign/Building Indicators (LOW PRIORITY - M2+)

**Why Needed:** Pokémon routes lead to towns; visual hint of next location.  
**Current:** None; uses Piston Town's existing buildings.  
**What's Missing:**
- Building roof (distant hint)
- Sign pointing to next city
- Smoke from chimney

**Asset Needed:** Atmospheric elements for route branching.

---

## Priority Tile Implementation Roadmap

### PHASE 1: CRITICAL (Must have for M1 MVP Route 1 redesign)

1. **Border/Ledge Tiles** (tile IDs: TBD)
   - Cliff edges on all 4 sides
   - Corner transitions
   - Integration into Route1 tileset

2. **Path/Dirt Road Tiles** (tile IDs: TBD)
   - Horizontal, vertical, intersection variations
   - Grass transition tiles
   - Integration into route-grass.png

3. **Grass Variations** (tile IDs: TBD)
   - Short grass, flowers, rock patches
   - Reduce 4-tile monotony of current tall-grass-only design

### PHASE 2: RECOMMENDED (Nice-to-have for M1 launch)

4. **Sign Tiles** (tile IDs: TBD)
   - Generic route sign for flavor text
   - Direction indicators

5. **Tree Tiles** (tile IDs: TBD)
   - Single/clustered for natural barriers
   - Visual variety

### PHASE 3: FUTURE (M2+, post-MVP)

6. **Water/Pond Tiles** (tile ID: 4 or new)
   - Support for swimming routes
   - Beach transitions

7. **Fence/Gate Tiles** (new IDs)
   - Ranch and gated areas
   - Post-game content

---

## Asset Generation Strategy

### Current Workflow

1. **GPU Generation:** ComfyUI with Stable Diffusion (pixelArtDiffusionXL_spriteShaper)
2. **Location:** `/assets/tiles/generated/` for experiments
3. **Manual Curation:** Select best variants
4. **Integration:** Slice into 16×16 tiles, add to active tilesets

### Scripts Available

- `gen_world_tilesets.sh` - Generates route, forest, cave, mountain, water, city, railyard variants
- `gen_interior_tilesets.sh` - Generates lab, house, mart, gym, depot, museum interiors
- `gen_piston_town_tileset.sh` - Generates Piston Town building components

### Recommended Next Steps

1. **Evaluate existing generated variants** in `/assets/tiles/generated/`
   - route-grass-1.png through route-grass-6.png
   - Select 1-2 best for actual Route1 use

2. **Generate missing tile types** via ComfyUI:
   - Prompt: "16x16 pixel art cliff edges, ledges, Game Boy style, seamless"
   - Prompt: "16x16 pixel art dirt path road tiles, Game Boy style"
   - Prompt: "16x16 pixel art grass variations, flowers, rocks, Game Boy"

3. **Create master route tileset** (384×384 or 512×512) including:
   - Grass (3-4 variations)
   - Tall grass (current)
   - Path tiles (4-way)
   - Ledges/cliffs (8 directions)
   - Signs (2-3)
   - Trees (2-3)
   - Water (if needed)

4. **Test in-game** with Route1 redesign before commit

---

## Current Tile Color Mapping (Debug)

| Index | Color | Meaning | Walkable? |
|-------|-------|---------|-----------|
| 0 | Black (#000000) | Void/Wall | ❌ No |
| 1 | Green (#00AA00) | Grass | ✅ Yes |
| 2 | Bright Green (#00FF00) | Tall Grass | ✅ Yes |
| 3 | Tan (#CCAA88) | Path | ✅ Yes |
| 4 | Blue (#0066FF) | Water [legacy] | ❌ No |
| 5 | Gray (#666666) | Wall/Cliff | ❌ No |
| 6 | Light Gray (#888888) | Rails [legacy] | ⚠️ TBD |
| 12 | Brown (#8B4513) | Door | ✅ Yes |
| Other | Pink (#FF00FF) | Undefined | ⚠️ Error |

---

## File References & Code Locations

### Core Tile System

- **Tile Types Definition:** `/js/world-maps.js:24-31`
- **Collision Rules:** `/js/world-maps.js:94-99, 121-126, 174-179`
- **Color Mapping:** `/js/game.js:963-975`
- **Documentation:** `/DOCS/TILE_SYSTEM.md`

### Tileset Loading & Rendering

- **Tileset Loader:** `/js/graphics.js:22-33`
- **Tile Draw Function:** `/js/graphics.js:37-42`
- **Map Draw Function:** `/js/graphics.js:46-60`
- **Legacy Map Class:** `/js/map.js:5-68` (older system, some code duplication)

### Map Definitions

- **World Maps:** `/js/world-maps.js:34-191`
- **PistonTown:** `/js/world-maps.js:35-104`
- **Route1:** `/js/world-maps.js:133-190`
- **LabInterior:** `/js/world-maps.js:106-131`

### Asset Pipeline

- **Generation Scripts:** `/gen_world_tilesets.sh`, `/gen_interior_tilesets.sh`, `/gen_piston_town_tileset.sh`
- **Asset Documentation:** `/DOCS/ASSET_PIPELINE.md`
- **Generated Assets:** `/assets/tiles/generated/`, `/assets/tiles/interiors-generated/`
- **Piston Town Assets:** `/assets/tiles/piston-town/`

---

## Summary: Tile System Health & Next Actions

### What Works ✅
- Tile type system clearly defined (0-12)
- Collision detection functional
- Map loading and rendering system operational
- 3 starter maps functional (Piston Town, Route 1, Lab)
- Extensive AI-generated variant assets available
- Asset pipeline established (ComfyUI)

### What's Missing ❌
- **Ledge/border tiles** (blocking visual monotony)
- **Path/dirt tiles** (routes look all grass)
- **Grass variations** (tiling looks artificial)
- **Sign tiles** (no flavor/directions)
- **Tree tiles** (sparse, unnatural)
- **Integration of generated variants** into active maps
- **Tileset slicing workflow** (assets generated but not properly indexed)

### Critical for Route 1 Redesign (#52) 🚀
1. Create **border/ledge tileset** (8-10 tiles)
2. Create **path/road tileset** (8-10 tiles)
3. Add **grass variations** (4 tiles minimum)
4. Integrate into route-grass.png as master tileset
5. Update Route1 map `tiles` array to use new indices
6. Test encounterability and walkability

### Estimated Effort
- Asset generation: 1-2 hours (GPU pipeline)
- Tileset curation & slicing: 1-2 hours (manual)
- Map redesign: 1-2 hours (coding)
- Testing: 30 min
- **Total:** ~4-6 hours for complete Route 1 redesign with proper tile variety

---

## References

- TILE_SYSTEM.md - System mechanics
- ASSET_PIPELINE.md - Asset generation workflow
- BUG_3_TILE_TYPES_FIX.md - Historical tile type confusion
- world-maps.js - Active map definitions
- graphics.js - Rendering pipeline
- game.js - Game loop & tile color fallback
