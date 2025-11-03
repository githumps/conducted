# Graphics Enhancement Plan
**Priority:** P0 - Game is unplayable without this
**Date:** 2025-11-02

## Current State (BROKEN)

**Overworld:**
- Solid bright green screen
- Player = red square
- No terrain visible
- No buildings visible
- No visual distinction between walkable/non-walkable tiles

**Battle:**
- Simple colored rectangles for trains
- No background
- Basic UI (works but ugly)

**Impact:** Game mechanics work but player can't see what they're doing.

## Root Causes

1. **Tileset images missing/not loading:**
   - `assets/tiles/piston-town.png` - doesn't exist or not loading
   - `assets/tiles/route-grass.png` - doesn't exist or not loading
   - `assets/tiles/interiors-lab.png` - doesn't exist or not loading

2. **Rendering code not drawing tiles:**
   - `js/game.js` `drawMap()` function likely just filling with solid color
   - Not calling `ctx.drawImage()` to render tile sprites

3. **Train sprites are placeholders:**
   - Battle sprites defined but using fallback rectangles

## Fix Plan - Phase 1: Make It Playable (Quick)

### Step 1: Create Placeholder Tilesets (30 min)

Create simple 16x16 pixel tiles using Canvas/simple image editor:

**piston-town-placeholder.png:**
- Tile 0: Black (impassable wall)
- Tile 1: Tan (path/walkable)
- Tile 2: Green (grass)
- Tile 3: Brown (building floor)
- Tile 4: Red (building wall)
- Tile 5: Dark gray (cliff/barrier)
- Tile 6: Blue (water)

**route-grass-placeholder.png:**
- Tile 0: Black (impassable)
- Tile 1: Tan (path)
- Tile 2: Dark green with pattern (tall grass - encounters)
- Tile 5: Dark gray (cliff)

### Step 2: Fix Rendering Code (js/game.js)

**Current (broken):**
```javascript
drawMap() {
  // Likely just doing:
  ctx.fillStyle = '#00ff00'; // Bright green
  ctx.fillRect(0, 0, width, height);
}
```

**Fix to:**
```javascript
drawMap() {
  const map = this.map;
  const tileset = this.tilesets[map.tileset]; // Load tileset image
  const tileSize = 16;

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tileId = map.tiles[y][x];

      // Calculate source position in tileset
      const tilesPerRow = 8; // Adjust based on tileset width
      const srcX = (tileId % tilesPerRow) * tileSize;
      const srcY = Math.floor(tileId / tilesPerRow) * tileSize;

      // Calculate destination position on canvas
      const destX = x * tileSize * this.scale;
      const destY = y * tileSize * this.scale;

      // Draw tile
      ctx.drawImage(
        tileset,
        srcX, srcY, tileSize, tileSize,
        destX, destY, tileSize * this.scale, tileSize * this.scale
      );
    }
  }
}
```

### Step 3: Add Player Sprite

Replace red square with simple 16x16 sprite:
- Draw character facing direction
- 4 directions: up, down, left, right
- Simple train conductor sprite

### Step 4: Test

After these fixes, should see:
- ✅ Tiles rendering (grass, paths, walls)
- ✅ Player sprite with direction
- ✅ Terrain visually distinguishable
- ✅ Buildings visible

## Fix Plan - Phase 2: Make It Look Good (Later)

### Use Local GPU (ComfyUI/Stable Diffusion)

Generate proper pixel art using local RTX 3080:

**Tilesets needed:**
1. Piston Town (industrial town theme)
2. Route 1 (grass route)
3. Train Depot interior
4. Gym interior
5. Lab interior

**Sprites needed:**
1. Player character (conductor) - 4 directions
2. 20+ train battle sprites (front view)
3. NPCs (trainers, gym leaders, depot workers)

**ComfyUI Prompt Template:**
```
pixel art, 16x16, game boy color style, [SUBJECT], top-down view,
clean lines, limited palette, retro rpg, pokemon-style
```

### Battle Backgrounds

Add simple backgrounds:
- Grass field for Route 1
- Indoor floor for trainer battles
- Gym arena for gym battles

### UI Polish

- Better fonts
- Nicer borders/frames
- Battle HUD improvements
- Menu styling

## Implementation Order

**Session 1: Core Rendering (HIGH PRIORITY)**
1. Create placeholder tilesets (assets/tiles/)
2. Fix drawMap() in js/game.js
3. Fix player sprite rendering
4. Test on all maps

**Session 2: Polish**
5. Generate proper tilesets with GPU
6. Create train battle sprites
7. Add backgrounds
8. UI improvements

## Files to Modify

### New Files:
- `assets/tiles/piston-town-placeholder.png`
- `assets/tiles/route-grass-placeholder.png`
- `assets/tiles/depot-interior-placeholder.png`
- `assets/sprites/player-16x16.png`

### Modified Files:
- `js/game.js` - Fix drawMap() and drawPlayer()
- `js/main.js` - Preload tileset images

## Success Criteria

**Phase 1 Done When:**
- [ ] Can see grass vs paths on Route 1
- [ ] Can see buildings in Piston Town
- [ ] Player sprite shows facing direction
- [ ] No more solid green screen
- [ ] Game is playable visually

**Phase 2 Done When:**
- [ ] Tilesets look good (not just placeholders)
- [ ] Train sprites look like actual trains
- [ ] Backgrounds add atmosphere
- [ ] UI looks polished

## Estimated Time

- **Phase 1 (Critical):** 1-2 hours
- **Phase 2 (Polish):** 4-6 hours with GPU

## Notes

- Keep tile size 16x16 for retro feel
- Use Game Boy Color palette (limited colors, warm tones)
- Ensure readability - clarity > complexity
- Test on both desktop and mobile
- Follow .claude/CLAUDE.md art guidelines

## Next Session TODO

1. Start with Phase 1, Step 1
2. Create placeholder tilesets
3. Fix rendering code
4. Test immediately
5. Show user the visual improvement
