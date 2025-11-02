# Tile & Collision System - Train Battle RPG
> Comprehensive guide to the tile-based world system

## 🎯 Overview

The game uses a tile-based map system with:
- **Tile Types**: Define what the player can/cannot walk on
- **Seamless Transitions**: Maps connect like chunks
- **Collision Detection**: Walls, buildings, grass all have proper collision
- **Warp Zones**: Doors and map edges trigger transitions

---

## 🧱 Tile Types

Defined in `js/world-maps.js`:

```javascript
const TILE_TYPES = {
  BLOCKED: 0,      // Walls, buildings, trees - CANNOT walk
  WALKABLE: 1,     // Paths, floors - can walk
  GRASS: 2,        // Grass - can walk, encounters possible
  TALL_GRASS: 3,   // Tall grass - can walk, MORE encounters
  DOOR: 4,         // Doors - can walk, triggers warp
  WATER: 5         // Water - CANNOT walk (unless surfing)
};
```

### Collision Rules

**Walkable Tiles**: 1, 2, 3, 4 (12 for legacy doors)
**Blocked Tiles**: 0, 5

---

## 🗺️ Map Structure

Each map in `WORLD_MAPS` has:

```javascript
{
  id: 'MapName',
  name: 'Display Name',
  tileset: 'path/to/tileset.png',  // Visual tiles (768×768 sheet)
  width: 20,                         // Map width in tiles
  height: 15,                        // Map height in tiles
  tiles: [ [...], [...], ... ],      // 2D array of tile indices
  warps: [ {...}, {...} ],           // Door/exit definitions
  connections: { ... },              // Seamless map linking
  npcs: [],                          // NPC positions
  getTile(x, y),                     // Get tile at position
  isWalkable(x, y),                  // Check if tile is walkable
  checkForEncounter()                // Random encounter check
}
```

---

## 🚪 Warps (Doors & Exits)

Warps teleport the player between maps:

```javascript
warps: [
  {
    from: rect(x, y, w, h),  // Trigger area
    to: {
      mapId: 'TargetMap',
      x: 10,
      y: 7,
      dir: 'down'            // Player faces this direction after warp
    }
  }
]
```

### Example: Lab Door

```javascript
{ from: rect(9, 5), to: { mapId: 'LabInterior', x: 4, y: 7, dir: 'down' } }
```

---

## 🔗 Seamless Map Connections

Maps connect at their edges for smooth transitions:

```javascript
connections: {
  north: { mapId: 'NorthMap', offsetX: 0, offsetY: 0 },
  south: { mapId: 'SouthMap', offsetX: 0, offsetY: 0 },
  east: { mapId: 'EastMap', offsetX: 0, offsetY: 0 },
  west: { mapId: 'WestMap', offsetX: 0, offsetY: 0 }
}
```

### How It Works

When the player walks off the bottom edge of **PistonTown**:
- Game checks `connections.south`
- Finds `Route1`
- Player appears at top edge of Route1 at same X coordinate
- **NO loading screen, NO jarring transition - seamless!**

---

## 🎨 Tile Rendering

### Current System (Placeholder Colors)

```javascript
// Rendered in map.js or game.js
0: Gray (#808080)   - Walls/blocked
1: Green (#90EE90)  - Grass
2: Dark Green (#228B22) - Tall grass
3: Tan (#D2B48C)    - Paths
5: Black (#000000)  - Void/cliffs
12: Brown (#8B4513) - Doors
```

### Future System (Real Tilesets)

- Load `assets/tiles/piston-town/town-buildings.png` (768×768 sheet)
- Slice into 16×16 tiles
- Map tile index → sprite position in sheet
- Render actual pixel art instead of colors

---

## 📐 Map Coordinates

### PistonTown (20×15)

```
   0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
0  [2][2][2][2][2][2][2][2][2][2][2][2][2][2][2][2][2][2][2][2]
1  [2][2][5][5][2][2][1][1][1][1][1][1][1][1][2][2][2][2][2][2]
...
14 [2][2][2][2][2][2][2][2][2][2][3][2][2][2][2][2][2][2][2][2]
                                  ↑
                                Exit to Route1 (warp)
```

**Player Spawn**: (10, 7)
**Lab Door**: (9, 5)
**Route1 Exit**: (10, 14)

---

## ⚙️ Collision Detection

### In `isWalkable(x, y)`:

```javascript
const tile = this.getTile(x, y);
const walkableTiles = [1, 2, 3, 4, 12]; // Grass, paths, doors
return walkableTiles.includes(tile);
```

### Player Movement (in `game.js`):

```javascript
if (this.currentMap.isWalkable(newX, newY)) {
  this.player.x = newX;
  this.player.y = newY;
} else {
  // Blocked! Play bump sound
}
```

---

## 🏗️ Building New Maps

### Step 1: Define Tiles

```javascript
MyNewMap: {
  id: 'MyNewMap',
  width: 20,
  height: 15,
  tiles: [
    [0, 0, 0, 0, 0, ...],  // Row 0: all walls
    [0, 1, 1, 1, 0, ...],  // Row 1: walkable path inside walls
    ...
  ]
}
```

### Step 2: Add Collision

```javascript
isWalkable: function(x, y) {
  const tile = this.getTile(x, y);
  return [1, 2, 3].includes(tile); // Only paths/grass walkable
}
```

### Step 3: Connect to World

```javascript
connections: {
  north: { mapId: 'NorthMap', offsetX: 0, offsetY: 0 }
}
```

---

## 🐛 Common Issues & Fixes

### Issue: Player gets stuck in walls
**Fix**: Check `isWalkable()` - ensure blocked tiles return `false`

### Issue: Map transitions are jarring
**Fix**: Use `connections` instead of just `warps` for edge transitions

### Issue: Can walk through buildings
**Fix**: Set building tiles to `0` (BLOCKED) in the tiles array

### Issue: No encounters in grass
**Fix**: Use tile type `2` or `3` and implement `checkForEncounter()`

---

## 📊 Tile Index Reference

### Piston Town
- `0` = Void/Blocked
- `1` = Grass (light green)
- `2` = Tall Grass (dark green borders)
- `3` = Path (tan/brown)
- `5` = Building/Wall (gray)
- `12` = Door (brown)

### Route 1
- `2` = Tall Grass (encounters)
- `5` = Cliff/Border (blocked)

### Interiors (Lab, Depot, etc.)
- `0` = Floor (walkable)
- `3` = Wall (blocked)

---

## 🔄 Migration Path

### Current State (v1.0.14)
- ✅ Tile types defined
- ✅ Collision detection working
- ✅ Seamless map connections added
- ⚠️ Visual tiles are placeholder colors

### Next Steps
- [ ] Slice generated tileset PNG sheets into 16×16 tiles
- [ ] Create tile coordinate mapping
- [ ] Render actual pixel art tiles
- [ ] Add tile animations (water, grass)
- [ ] Implement layers (ground, objects, overlay)

---

Generated: 2025-11-02 (v1.0.14)
