/**
 * World Maps - Piston Town, interiors, and Route 1
 * Minimal starter maps with warp/door metadata and collision helpers
 */

// --- helpers ---
function rect(x, y, w = 1, h = 1) { return { x, y, w, h }; }
function pos(x, y, dir = 'down') { return { x, y, dir }; }

// make an empty map filled with tileIndex
function grid(width, height, fillIndex = 0) {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => fillIndex));
}

// quick border builder: frame with a wall tile, inside floor tile
function boxed(width, height, wallIndex = 1, floorIndex = 0) {
  const t = grid(width, height, floorIndex);
  for (let x = 0; x < width; x++) { t[0][x] = wallIndex; t[height - 1][x] = wallIndex; }
  for (let y = 0; y < height; y++) { t[y][0] = wallIndex; t[y][width - 1] = wallIndex; }
  return t;
}

// Tile collision types
const TILE_TYPES = {
  BLOCKED: 0,      // Walls, buildings, trees - can't walk
  WALKABLE: 1,     // Paths, floors - can walk
  GRASS: 2,        // Grass - can walk, encounters
  TALL_GRASS: 3,   // Tall grass - can walk, more encounters
  DOOR: 4,         // Doors - can walk, triggers warp
  WATER: 5         // Water - blocked unless surfing
};

// --- map registry (global WORLD_MAPS object) ---
const WORLD_MAPS = {
  PistonTown: {
    id: 'PistonTown',
    name: 'Piston Town',
    tileset: 'assets/tiles/piston-town.png',
    width: 20, height: 15,
    tiles: [
      // Row 0 - Top border with tall grass
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      // Row 1 - Tall grass border with player house (top-left)
      [2, 2, 5, 5, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
      // Row 2 - Player house with door, grass area
      [2, 2, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
      // Row 3 - Path starts, grass areas, Professor Lab (top)
      [2, 2, 12, 3, 3, 3, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 2, 2, 2, 2],
      // Row 4 - Main horizontal path with Lab middle
      [2, 1, 1, 3, 1, 3, 3, 3, 5, 0, 5, 3, 3, 3, 1, 1, 1, 2, 2, 2],
      // Row 5 - Lab bottom with door, path continues
      [2, 1, 1, 3, 1, 1, 1, 3, 5, 12, 5, 3, 1, 1, 1, 1, 1, 1, 2, 2],
      // Row 6 - Central path intersection
      [2, 1, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 2],
      // Row 7 - Town center path (player spawn at 10,7), Depot (right)
      [2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 5, 5, 1, 1, 2],
      // Row 8 - Depot with door, Mart (top), grass
      [2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 5, 5, 1, 1, 2],
      // Row 9 - Path to south, Mart (bottom)
      [2, 1, 3, 1, 1, 1, 1, 1, 5, 5, 3, 1, 1, 1, 1, 12, 3, 1, 1, 2],
      // Row 10 - Vertical path continues with Mart door
      [2, 1, 3, 1, 1, 1, 1, 1, 5, 5, 3, 1, 1, 1, 1, 1, 3, 1, 1, 2],
      // Row 11 - Path widens south
      [2, 1, 3, 1, 1, 1, 1, 1, 12, 3, 3, 3, 1, 1, 1, 1, 3, 1, 1, 2],
      // Row 12 - Path continues to exit
      [2, 1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 2],
      // Row 13 - Near exit with grass
      [2, 1, 1, 3, 3, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3, 1, 1, 2],
      // Row 14 - Bottom border with exit at center
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ],
    warps: [
      // door into Player House
      { from: rect(2, 3), to: { mapId: 'PlayerHouse', ...pos(3, 6, 'down') } },
      // door into Lab
      { from: rect(9, 5), to: { mapId: 'LabInterior', ...pos(4, 7, 'down') } },
      // door into Depot
      { from: rect(15, 9), to: { mapId: 'HealingDepot', ...pos(3, 6, 'down') } },
      // door into Mart
      { from: rect(8, 11), to: { mapId: 'TrainMart', ...pos(3, 6, 'down') } },
      // route exit on bottom (SEAMLESS transition)
      { from: rect(10, 14), to: { mapId: 'Route1', ...pos(10, 0, 'down') } },
    ],
    connections: {
      south: { mapId: 'Route1', offsetX: 0, offsetY: 0 } // Connect bottom edge to Route1 top
    },
    npcs: [],
    getTile: function(x, y) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
      return this.tiles[y][x];
    },
    isWalkable: function(x, y) {
      const tile = this.getTile(x, y);
      // Walkable tiles: grass(1), tall grass(2), paths(3), doors(12)
      const walkableTiles = [TILE_TYPES.WALKABLE, TILE_TYPES.GRASS, TILE_TYPES.TALL_GRASS, TILE_TYPES.DOOR, 1, 2, 3, 12];
      return walkableTiles.includes(tile);
    },
    checkForEncounter: function() {
      return false; // No encounters in town
    }
  },

  LabInterior: {
    id: 'LabInterior',
    name: 'Professor Cypress Lab',
    tileset: 'assets/tiles/interiors-lab.png',
    width: 10, height: 10,
    tiles: boxed(10, 10, 3, 0),
    warps: [
      // door back to town (Lab entrance)
      { from: rect(4, 9), to: { mapId: 'PistonTown', ...pos(9, 7, 'down') } },
    ],
    npcs: [],
    getTile: function(x, y) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
      return this.tiles[y][x];
    },
    isWalkable: function(x, y) {
      const tile = this.getTile(x, y);
      const walkableTiles = [0, 1, 2, 3, 6, 9, 10, 12];
      return walkableTiles.includes(tile);
    },
    checkForEncounter: function() {
      return false;
    }
  },

  Route1: {
    id: 'Route1',
    name: 'Route 1',
    tileset: 'assets/tiles/route-grass.png',
    width: 20, height: 15,
    tiles: boxed(20, 15, 5, 2), // 5=wall/cliff, 2=tall grass (for encounters)
    warps: [
      // back to town top edge (SEAMLESS transition)
      { from: rect(10, 0), to: { mapId: 'PistonTown', ...pos(10, 14, 'up') } },
    ],
    connections: {
      north: { mapId: 'PistonTown', offsetX: 0, offsetY: 0 } // Connect top edge to PistonTown bottom
    },
    npcs: [
      {
        id: 'route1_youngster_joey',
        name: 'Youngster Joey',
        x: 10,
        y: 7,
        type: 'trainer',
        direction: 'down',
        canBattle: true,
        defeated: false,
        baseReward: 50,
        party: [
          { speciesId: 1, level: 5 } // Steamini
        ],
        dialogue: [
          { speaker: 'Youngster Joey', text: 'Hey! You look like a new conductor!' },
          { speaker: 'Youngster Joey', text: 'Let me show you how it\'s done!' }
        ],
        defeatDialogue: [
          { speaker: 'Youngster Joey', text: 'Wow! You\'re really good!' },
          { speaker: 'Youngster Joey', text: 'I need to train more...' }
        ]
      }
    ],
    getTile: function(x, y) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
      return this.tiles[y][x];
    },
    isWalkable: function(x, y) {
      const tile = this.getTile(x, y);
      const walkableTiles = [0, 1, 2, 3, 4, 6, 9, 10, 12];
      return walkableTiles.includes(tile);
    },
    checkForEncounter: function() {
      return Math.random() < 0.10; // 10% encounter rate
    },
    getRandomEncounter: function() {
      const level = Utils.randomInt(3, 7); // Wild trains level 3-7
      const speciesId = Utils.randomInt(1, 20); // Early game trains (IDs 1-20)
      console.log(`Wild encounter: Train #${speciesId} (Lv.${level})`);
      return new Train(speciesId, level);
    }
  },
};

// Add collisions to each map (only non-walkable tiles: void=0, wall=5)
for (const m of Object.values(WORLD_MAPS)) {
  m.collisions = new Set();
  const { tiles } = m;
  for (let y = 0; y < m.height; y++) {
    for (let x = 0; x < m.width; x++) {
      const idx = tiles[y][x];
      // Only add walls (5) and void (0) as collisions
      if (idx === 0 || idx === 5) {
        m.collisions.add(`${x},${y}`);
      }
    }
  }
}

console.log('🗺️ World maps loaded:', Object.keys(WORLD_MAPS));
