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

// --- map registry (global WORLD_MAPS object) ---
const WORLD_MAPS = {
  PistonTown: {
    id: 'PistonTown',
    name: 'Piston Town',
    width: 20, height: 15,
    tiles: boxed(20, 15, /*wall*/ 2, /*floor*/ 0),
    warps: [
      // door into Lab
      { from: rect(9, 6), to: { mapId: 'LabInterior', ...pos(4, 7, 'down') } },
      // route exit on bottom
      { from: rect(10, 14), to: { mapId: 'Route1', ...pos(10, 1, 'down') } },
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
      return false; // No encounters in town
    }
  },

  LabInterior: {
    id: 'LabInterior',
    name: 'Professor Cypress Lab',
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
    width: 20, height: 15,
    tiles: boxed(20, 15, 5, 4), // 5=wall/cliff, 4=grass floor
    warps: [
      // back to town top edge
      { from: rect(10, 0), to: { mapId: 'PistonTown', ...pos(10, 13, 'up') } },
    ],
    npcs: [],
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
      return Math.random() < 0.10;
    },
    getRandomEncounter: function() {
      const level = Utils.randomInt(2, 7);
      const speciesId = Utils.randomInt(1, 26);
      return new Train(speciesId, level);
    }
  },
};

// Add collisions to each map
for (const m of Object.values(WORLD_MAPS)) {
  m.collisions = new Set();
  const { tiles } = m;
  for (let y = 0; y < m.height; y++) {
    for (let x = 0; x < m.width; x++) {
      const idx = tiles[y][x];
      if (idx === 2 || idx === 5 || idx === 3) {
        m.collisions.add(`${x},${y}`);
      }
    }
  }
}

console.log('🗺️ World maps loaded:', Object.keys(WORLD_MAPS));
