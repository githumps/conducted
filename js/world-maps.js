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
  DOOR: 12,         // Doors - can walk, triggers warp
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
      // Row 0 - Top border with tall grass (using row 7 of tileset, indices ~227)
      [227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 227],
      // Row 1 - Tall grass border with player house (top-left)
      [227, 227, 163, 163, 227, 227, 226, 226, 226, 226, 226, 226, 226, 226, 227, 227, 227, 227, 227, 227],
      // Row 2 - Player house with door, grass area
      [227, 227, 163, 163, 227, 226, 226, 226, 226, 226, 226, 226, 226, 226, 226, 227, 227, 227, 227, 227],
      // Row 3 - Path starts, grass areas, Professor Lab (top)
      [227, 227, 140, 139, 139, 139, 226, 226, 163, 163, 163, 226, 226, 226, 226, 226, 227, 227, 227, 227],
      // Row 4 - Main horizontal path with Lab middle
      [227, 226, 226, 139, 226, 139, 139, 139, 163, 132, 163, 139, 139, 139, 226, 226, 226, 227, 227, 227],
      // Row 5 - Lab bottom with door, path continues
      [227, 226, 226, 139, 226, 226, 226, 139, 163, 140, 163, 139, 226, 226, 226, 226, 226, 226, 227, 227],
      // Row 6 - Central path intersection
      [227, 226, 139, 139, 139, 226, 226, 139, 139, 139, 139, 139, 139, 139, 226, 226, 226, 226, 226, 227],
      // Row 7 - Town center path (player spawn at 10,7), Depot (right)
      [227, 226, 139, 226, 226, 140, 226, 226, 226, 226, 139, 226, 226, 226, 226, 163, 163, 226, 226, 227],
      // Row 8 - Depot with door, Mart (top), grass
      [227, 226, 139, 226, 226, 226, 226, 226, 226, 226, 139, 226, 226, 226, 226, 163, 163, 226, 226, 227],
      // Row 9 - Path to south, Mart (bottom)
      [227, 226, 139, 226, 226, 226, 226, 226, 163, 163, 139, 226, 226, 226, 226, 140, 139, 226, 226, 227],
      // Row 10 - Vertical path continues with Mart door
      [227, 226, 139, 226, 226, 226, 226, 226, 163, 163, 139, 226, 226, 226, 226, 226, 139, 226, 226, 227],
      // Row 11 - Path widens south
      [227, 226, 139, 226, 226, 226, 226, 226, 140, 139, 139, 139, 226, 226, 226, 226, 139, 226, 226, 227],
      // Row 12 - Path continues to exit
      [227, 226, 139, 139, 226, 226, 226, 226, 226, 226, 139, 226, 226, 226, 226, 226, 139, 226, 226, 227],
      // Row 13 - Near exit with grass
      [227, 226, 226, 139, 139, 139, 226, 226, 226, 226, 139, 226, 226, 226, 139, 139, 139, 226, 226, 227],
      // Row 14 - Bottom border with exit at center
      [227, 227, 227, 227, 227, 227, 227, 227, 227, 227, 139, 227, 227, 227, 227, 227, 227, 227, 227, 227],
    ],
    warps: [
      // door into Player House
      { from: rect(2, 3), to: { mapId: 'PlayerHouse', ...pos(3, 6, 'down') } },
      // door into Lab
      { from: rect(9, 5), to: { mapId: 'LabInterior', ...pos(4, 7, 'down') } },
      // door into Coal Harbor Gym
      { from: rect(5, 7), to: { mapId: 'coal_harbor_gym', ...pos(7, 13, 'up') } },
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
      const npcAtPosition = this.npcs.find(npc => npc.x === x && npc.y === y);
      if (npcAtPosition) return false;

      // PistonTown uses tileset indices from piston-town.png
      // Walkable: 139=path, 140=door, 226=grass, 227=tall_grass
      // Blocked: 163=buildings, 132=special_tiles
      const walkableTiles = [139, 140, 226, 227];
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
      const npcAtPosition = this.npcs.find(npc => npc.x === x && npc.y === y);
      if (npcAtPosition) return false;
      const walkableTiles = [0, 12]; // Floor and door
      return walkableTiles.includes(tile);
    },
    checkForEncounter: function() {
      return false;
    }
  },

  CoalHarbor: {
    id: 'CoalHarbor',
    name: 'Coal Harbor',
    tileset: 'assets/tiles/piston-town.png',
    width: 20, height: 15,
    tiles: [
      // Row 0 - Entry from Route 1 (north, columns 8-11)
      [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
      // Row 1 - Path expands, houses on west
      [2, 2, 5, 5, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
      // Row 2 - House with door, path continues
      [2, 2, 5, 5, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
      // Row 3 - House door, grass, Depot (top-right)
      [2, 2, 12, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 2, 2],
      // Row 4 - Main horizontal path, Depot middle
      [2, 1, 1, 3, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 5, 2, 2],
      // Row 5 - Another house (west), Depot door
      [2, 1, 5, 5, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 12, 5, 2, 2],
      // Row 6 - House door, central path continues
      [2, 1, 5, 5, 1, 1, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 2, 2],
      // Row 7 - House door at 2,7, town center intersection
      [2, 1, 12, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 2, 2],
      // Row 8 - Path continues, Mart (top-right)
      [2, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 5, 5, 1, 2, 2],
      // Row 9 - Mart with door
      [2, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 5, 5, 1, 2, 2],
      // Row 10 - Path to gym
      [2, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 12, 3, 1, 2, 2],
      // Row 11 - Gym entrance (top), south path
      [2, 1, 3, 3, 1, 1, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 3, 1, 2, 2],
      // Row 12 - Gym middle with door at center
      [2, 1, 1, 3, 1, 1, 5, 0, 0, 12, 5, 1, 1, 1, 1, 1, 3, 1, 2, 2],
      // Row 13 - Gym bottom
      [2, 1, 1, 3, 3, 1, 5, 5, 5, 5, 5, 1, 1, 3, 3, 3, 3, 1, 2, 2],
      // Row 14 - Bottom border with grass
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ],
    warps: [
      // House doors (west side)
      { from: rect(2, 3), to: { mapId: 'PlayerHouse', ...pos(3, 6, 'down') } },
      { from: rect(2, 7), to: { mapId: 'PlayerHouse', ...pos(3, 6, 'down') } },
      // Depot door (east)
      { from: rect(16, 5), to: { mapId: 'HealingDepot', ...pos(3, 6, 'down') } },
      // Mart door (southeast)
      { from: rect(15, 10), to: { mapId: 'TrainMart', ...pos(3, 6, 'down') } },
      // Gym door (south center)
      { from: rect(9, 12), to: { mapId: 'CoalHarborGym', ...pos(7, 13, 'up') } },
      // Route 1 entrance (north)
      { from: rect(8, 0), to: { mapId: 'Route1', ...pos(8, 14, 'up') } },
      { from: rect(9, 0), to: { mapId: 'Route1', ...pos(9, 14, 'up') } },
      { from: rect(10, 0), to: { mapId: 'Route1', ...pos(10, 14, 'up') } },
      { from: rect(11, 0), to: { mapId: 'Route1', ...pos(11, 14, 'up') } },
    ],
    connections: {
      north: { mapId: 'Route1', offsetX: 0, offsetY: 0 }
    },
    npcs: [],
    getTile: function(x, y) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
      return this.tiles[y][x];
    },
    isWalkable: function(x, y) {
      const tile = this.getTile(x, y);
      const npcAtPosition = this.npcs.find(npc => npc.x === x && npc.y === y);
      if (npcAtPosition) return false;
      const walkableTiles = [1, 2, 3, 12];
      return walkableTiles.includes(tile);
    },
    checkForEncounter: function() {
      return false; // No encounters in town
    }
  },

  Route1: {
    id: 'Route1',
    name: 'Route 1',
    tileset: 'assets/tiles/route-grass.png',
    width: 20, height: 15,
    tiles: [
      // Row 0 - Entry from Piston Town (seamless connection)
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      // Row 1 - Path begins, grass on sides
      [5, 5, 5, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5, 5],
      // Row 2 - Path with grass patches on sides
      [5, 5, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5],
      // Row 3 - Ledge on left, sign on path, grass on right
      [5, 5, 2, 2, 6, 1, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 5, 5],
      // Row 4 - Path continues, grass patches
      [5, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 5],
      // Row 5 - Wider path section, trainer battle zone
      [5, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 5],
      // Row 6 - Path with trees/landmarks on sides
      [5, 2, 2, 1, 1, 1, 1, 1, 7, 1, 1, 7, 1, 1, 1, 1, 2, 2, 2, 5],
      // Row 7 - Central area (trainer positioned here)
      [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 5],
      // Row 8 - Path continues with grass
      [5, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 5],
      // Row 9 - Narrower path section
      [5, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 5],
      // Row 10 - Path with ledge on right
      [5, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 6, 2, 2, 2, 2, 2, 5],
      // Row 11 - Path widens before exit
      [5, 5, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 5, 5],
      // Row 12 - Grass patches narrow path
      [5, 5, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5],
      // Row 13 - Approaching next area
      [5, 5, 5, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5, 5],
      // Row 14 - Exit to next route/area
      [5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    ],
    warps: [
      // back to town top edge (SEAMLESS transition)
      { from: rect(10, 0), to: { mapId: 'PistonTown', ...pos(10, 14, 'up') } },
      // south exit to Coal Harbor (columns 8-10, row 14)
      { from: rect(8, 14, 3, 1), to: { mapId: 'CoalHarbor', ...pos(9, 0, 'down') } },
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
      const npcAtPosition = this.npcs.find(npc => npc.x === x && npc.y === y);
      if (npcAtPosition) return false;
      const walkableTiles = [1, 2, 3, 4]; // 1=path, 2=tall grass, 3=normal grass, 4=sign (walkable but interactive)
      return walkableTiles.includes(tile);
    },
    checkForEncounter: function(x, y) {
      const tile = this.getTile(x, y);
      // Only encounter in grass tiles (2=tall grass, 3=normal grass)
      if (tile !== 2 && tile !== 3) return false;
      return Math.random() < 0.10; // 10% encounter rate in grass
    },
    getRandomEncounter: function() {
      const level = Utils.randomInt(3, 7); // Wild trains level 3-7
      const speciesId = Utils.randomInt(1, 20); // Early game trains (IDs 1-20)
      console.log(`Wild encounter: Train #${speciesId} (Lv.${level})`);
      return new Train(speciesId, level);
    }
  },

  CoalHarborGym: {
    id: 'CoalHarborGym',
    name: 'Coal Harbor Gym',
    tileset: 'assets/tiles/piston-town.png',
    width: 15, height: 15,
    tiles: [
      // Row 0 - Top wall
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      // Row 1 - Interior with path
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 2 - Gym Leader Marina position (center)
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 3
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 4
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 5 - Water strip
      [5, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 5],
      // Row 6
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 7
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 8
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 9
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 10
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 11
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 12
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 13
      [5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5],
      // Row 14 - Bottom wall with door at center
      [5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5],
    ],
    warps: [
      // Door back to Coal Harbor
      { from: rect(7, 14), to: { mapId: 'CoalHarbor', ...pos(9, 12, 'down') } },
    ],
    npcs: [
      {
        id: 'gym_leader_marina',
        name: 'Captain Marina',
        x: 7,
        y: 2,
        type: 'gym_leader',
        color: '#3498DB',
        badgeColor: '#1ABC9C',
        canBattle: true,
        defeated: false,
        badge: 'Harbor Badge',
        party: [
          { speciesId: 7, level: 12 },
          { speciesId: 8, level: 14 },
          { speciesId: 9, level: 16 }
        ],
        dialogue: [
          { speaker: 'Captain Marina', text: 'Ahoy! Welcome to the Coal Harbor Gym!' },
          { speaker: 'Captain Marina', text: 'My freight trains are the toughest in the region! Let\'s see if you can handle them!' }
        ],
        defeatDialogue: [
          { speaker: 'Captain Marina', text: 'Well, blow me down! You\'re a natural!' },
          { speaker: 'Captain Marina', text: 'You\'ve earned the Harbor Badge!' }
        ]
      }
    ],
    getTile: function(x, y) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
      return this.tiles[y][x];
    },
    isWalkable: function(x, y) {
      const tile = this.getTile(x, y);
      const npcAtPosition = this.npcs.find(npc => npc.x === x && npc.y === y);
      if (npcAtPosition) return false;
      const walkableTiles = [1, 3, 12]; // Floor, path, and door
      return walkableTiles.includes(tile);
    },
    checkForEncounter: function() {
      return false; // No encounters in gym
    }
  },
};

// Add collisions to each map (non-walkable tiles: void=0, wall=5, ledge=6, tree=7)
for (const m of Object.values(WORLD_MAPS)) {
  m.collisions = new Set();
  const { tiles } = m;
  for (let y = 0; y < m.height; y++) {
    for (let x = 0; x < m.width; x++) {
      const idx = tiles[y][x];
      // Add walls (5), void (0), ledges (6), and trees (7) as collisions
      if (idx === 0 || idx === 5 || idx === 6 || idx === 7) {
        m.collisions.add(`${x},${y}`);
      }
    }
  }
}

console.log('🗺️ World maps loaded:', Object.keys(WORLD_MAPS));
