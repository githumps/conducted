/**
 * World Maps - All towns, routes, and zones
 */

// Import tile types
// const { TILE_TYPES } = require('./graphics.js');

const TILE_TYPES = {
    VOID: 0,
    GRASS: 1,
    TALL_GRASS: 2,
    PATH: 3,
    WATER: 4,
    WALL: 5,
    RAILS: 6,
    BUILDING: 7,
    STATION: 8,
    GRAVEYARD: 9,
    SAND: 10,
    CAVE: 11,
    DOOR: 12
};

/**
 * World Map Generator
 */
class WorldMap {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.tiles = Utils.create2DArray(width, height, TILE_TYPES.VOID);
        this.npcs = [];
        this.encounters = [];
        this.connections = []; // {direction, mapName, x, y}
        this.music = 'default';
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return TILE_TYPES.VOID;
        }
        return this.tiles[y][x];
    }

    setTile(x, y, tileType) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.tiles[y][x] = tileType;
        }
    }

    fillRect(x, y, width, height, tileType) {
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                this.setTile(x + dx, y + dy, tileType);
            }
        }
    }

    isWalkable(x, y) {
        const tile = this.getTile(x, y);
        // Doors are always walkable (for building entry)
        if (tile === TILE_TYPES.DOOR) {
            return true;
        }
        // Block: VOID, WALL, WATER, BUILDING, STATION, CAVE
        return tile !== TILE_TYPES.VOID &&
               tile !== TILE_TYPES.WALL &&
               tile !== TILE_TYPES.WATER &&
               tile !== TILE_TYPES.BUILDING &&
               tile !== TILE_TYPES.STATION &&
               tile !== TILE_TYPES.CAVE;
    }

    isDoor(x, y) {
        const tile = this.getTile(x, y);
        return tile === TILE_TYPES.DOOR;
    }

    checkForEncounter() {
        return Math.random() < 0.10;
    }

    getRandomEncounter() {
        if (this.encounters.length === 0) {
            const level = Utils.randomInt(2, 7);
            const speciesId = Utils.randomInt(1, 26);
            return new Train(speciesId, level);
        }

        const encounterData = Utils.randomChoice(this.encounters);
        const level = Utils.randomInt(encounterData.minLevel, encounterData.maxLevel);
        return new Train(encounterData.speciesId, level);
    }

    addNPC(npc) {
        this.npcs.push(npc);
    }

    getNPCAt(x, y) {
        return this.npcs.find(npc => npc.x === x && npc.y === y);
    }
}

/**
 * Create Piston Town - Starting town
 */
function createPistonTown() {
    const map = new WorldMap('piston_town', 40, 30);

    // Fill with grass
    map.fillRect(0, 0, 40, 30, TILE_TYPES.GRASS);

    // Border walls
    for (let x = 0; x < 40; x++) {
        map.setTile(x, 0, TILE_TYPES.WALL);
        map.setTile(x, 29, TILE_TYPES.WALL);
    }
    for (let y = 0; y < 30; y++) {
        map.setTile(0, y, TILE_TYPES.WALL);
        map.setTile(39, y, TILE_TYPES.WALL);
    }

    // Central path
    for (let y = 10; y < 20; y++) {
        for (let x = 5; x < 35; x++) {
            map.setTile(x, y, TILE_TYPES.PATH);
        }
    }

    // Professor's Lab (top left)
    map.fillRect(5, 5, 8, 6, TILE_TYPES.BUILDING);
    map.setTile(9, 10, TILE_TYPES.DOOR);

    // Player's House (top right)
    map.fillRect(27, 5, 8, 6, TILE_TYPES.BUILDING);
    map.setTile(31, 10, TILE_TYPES.DOOR);

    // Train Station (bottom)
    map.fillRect(15, 20, 10, 6, TILE_TYPES.STATION);
    map.setTile(20, 20, TILE_TYPES.DOOR);

    // Old Iron Memorial
    map.fillRect(18, 13, 4, 3, TILE_TYPES.RAILS);

    // Exit to Route 1 (bottom)
    map.setTile(20, 29, TILE_TYPES.PATH);
    map.connections.push({
        direction: 'south',
        mapName: 'route_1',
        toX: 20,
        toY: 1
    });

    // NPCs
    map.addNPC({
        id: 'prof_cypress',
        name: 'Professor Cypress',
        x: 9,
        y: 8,
        type: 'professor',
        color: '#2C3E50',
        dialogue: [
            { speaker: 'Professor Cypress', text: 'Welcome! Are you ready to choose your first train partner?' }
        ]
    });

    map.addNPC({
        id: 'mom',
        name: 'Mom',
        x: 31,
        y: 8,
        type: 'npc',
        color: '#E91E63',
        dialogue: [
            { speaker: 'Mom', text: 'Be safe on your journey, dear! Come back anytime to rest.' }
        ]
    });

    map.addNPC({
        id: 'item_giver_1',
        name: 'Helpful Person',
        x: 15,
        y: 15,
        type: 'item',
        item: 'potion',
        quantity: 1,
        itemTaken: false,
        dialogue: [
            { speaker: 'Helpful Person', text: 'You look like you could use this!' }
        ],
        movement: {
            pattern: 'square',
            radius: 2
        }
    });

    map.addNPC({
        id: 'rival',
        name: 'Blake',
        x: 25,
        y: 15,
        type: 'trainer',
        canBattle: true,
        defeated: false,
        party: [
            { speciesId: 4, level: 5 }
        ],
        dialogue: [
            { speaker: 'Blake', text: 'Hey! I was just about to challenge you!' },
            { speaker: 'Blake', text: 'Let\'s see whose train is stronger!' }
        ],
        defeatDialogue: [
            { speaker: 'Blake', text: 'Hmph! You got lucky this time!' }
        ],
        event: 'start_battle'
    });

    map.music = 'piston_town';
    return map;
}

/**
 * Create Route 1 - First route
 */
function createRoute1() {
    const map = new WorldMap('route_1', 40, 60);

    // Grass and tall grass
    map.fillRect(0, 0, 40, 60, TILE_TYPES.GRASS);

    // Tall grass patches for encounters
    map.fillRect(8, 10, 24, 8, TILE_TYPES.TALL_GRASS);
    map.fillRect(10, 25, 20, 10, TILE_TYPES.TALL_GRASS);
    map.fillRect(5, 40, 30, 12, TILE_TYPES.TALL_GRASS);

    // Path through the middle
    for (let y = 0; y < 60; y++) {
        map.setTile(20, y, TILE_TYPES.PATH);
        map.setTile(21, y, TILE_TYPES.PATH);
    }

    // Trees/obstacles (walls)
    for (let i = 0; i < 20; i++) {
        const x = Utils.randomInt(1, 39);
        const y = Utils.randomInt(1, 59);
        if (map.getTile(x, y) === TILE_TYPES.GRASS) {
            map.setTile(x, y, TILE_TYPES.WALL);
        }
    }

    // Encounters
    map.encounters = [
        { speciesId: 1, minLevel: 2, maxLevel: 4 },  // Steamini
        { speciesId: 10, minLevel: 2, maxLevel: 5 }, // Trackie
        { speciesId: 16, minLevel: 3, maxLevel: 5 }, // Railoo
    ];

    // Connections
    map.connections.push({
        direction: 'north',
        mapName: 'piston_town',
        toX: 20,
        toY: 28
    });
    map.connections.push({
        direction: 'south',
        mapName: 'coal_harbor',
        toX: 20,
        toY: 1
    });

    // Trainers
    map.addNPC({
        id: 'trainer_rookie_1',
        name: 'Youngster Tim',
        x: 15,
        y: 20,
        type: 'trainer',
        color: '#16A085',
        canBattle: true,
        defeated: false,
        party: [
            { speciesId: 19, level: 5 }, // Trackat
            { speciesId: 16, level: 4 }  // Railoo
        ],
        dialogue: [
            { speaker: 'Youngster Tim', text: 'Hey! I just got my first train! Let\'s battle!' }
        ],
        defeatDialogue: [
            { speaker: 'Youngster Tim', text: 'Wow, you\'re good! I need more practice!' }
        ]
    });

    map.music = 'route';
    return map;
}

/**
 * Create Coal Harbor - First gym town
 */
function createCoalHarbor() {
    const map = new WorldMap('coal_harbor', 50, 40);

    // Water on the right side
    map.fillRect(0, 0, 50, 40, TILE_TYPES.PATH);
    map.fillRect(30, 0, 20, 40, TILE_TYPES.WATER);

    // Docks (rails over water)
    for (let y = 10; y < 30; y += 5) {
        for (let x = 28; x < 45; x++) {
            map.setTile(x, y, TILE_TYPES.RAILS);
        }
    }

    // Buildings
    map.fillRect(5, 5, 10, 8, TILE_TYPES.BUILDING);   // Poke Center equivalent
    map.fillRect(5, 25, 10, 8, TILE_TYPES.BUILDING);  // Mart
    map.fillRect(18, 10, 8, 12, TILE_TYPES.STATION);  // GYM
    map.setTile(22, 21, TILE_TYPES.DOOR);

    // Train Station
    map.fillRect(20, 30, 8, 6, TILE_TYPES.STATION);

    // Connections
    map.connections.push({
        direction: 'north',
        mapName: 'route_1',
        toX: 25,
        toY: 58
    });

    // Gym Leader
    map.addNPC({
        id: 'gym_leader_marina',
        name: 'Captain Marina',
        x: 22,
        y: 16,
        type: 'gym_leader',
        color: '#3498DB',
        badgeColor: '#1ABC9C',
        canBattle: true,
        defeated: false,
        badge: 'Harbor Badge',
        party: [
            { speciesId: 7, level: 12 },  // Water/Freight type
            { speciesId: 8, level: 14 },
            { speciesId: 9, level: 16 }
        ],
        dialogue: [
            { speaker: 'Captain Marina', text: 'Ahoy! Welcome to Coal Harbor! I\'m the harbor master here.' },
            { speaker: 'Captain Marina', text: 'My freight trains can haul anything! Think you can stop them?' }
        ],
        defeatDialogue: [
            { speaker: 'Captain Marina', text: 'You\'ve got the makings of a great conductor!' },
            { speaker: 'Captain Marina', text: 'Take the Harbor Badge! You\'ve earned it!' }
        ]
    });

    map.music = 'coal_harbor';
    return map;
}

/**
 * Create Ghost Rail Graveyard - Spooky zone
 */
function createGhostGraveyard() {
    const map = new WorldMap('ghost_graveyard', 45, 50);

    // Dark grass base
    map.fillRect(0, 0, 45, 50, TILE_TYPES.GRAVEYARD);

    // Old broken rails everywhere
    for (let i = 0; i < 30; i++) {
        const x = Utils.randomInt(5, 40);
        const y = Utils.randomInt(5, 45);
        map.setTile(x, y, TILE_TYPES.RAILS);
        map.setTile(x + 1, y, TILE_TYPES.RAILS);
    }

    // Mystery building (gym)
    map.fillRect(18, 20, 12, 14, TILE_TYPES.BUILDING);

    // Path to gym
    for (let y = 15; y < 35; y++) {
        map.setTile(24, y, TILE_TYPES.PATH);
    }

    // Encounters - Ghost type trains
    map.encounters = [
        { speciesId: 92, minLevel: 25, maxLevel: 30 },  // Ghost trains
        { speciesId: 93, minLevel: 28, maxLevel: 32 },
        { speciesId: 94, minLevel: 30, maxLevel: 35 }
    ];

    // Gym Leader
    map.addNPC({
        id: 'gym_leader_raven',
        name: 'Phantom Conductor Raven',
        x: 24,
        y: 28,
        type: 'gym_leader',
        color: '#8E44AD',
        badgeColor: '#34495E',
        canBattle: true,
        defeated: false,
        badge: 'Specter Badge',
        party: [
            { speciesId: 92, level: 32 },
            { speciesId: 93, level: 34 },
            { speciesId: 94, level: 36 }
        ],
        dialogue: [
            { speaker: 'Phantom Conductor Raven', text: 'The spirits of old trains call this place home...' },
            { speaker: 'Phantom Conductor Raven', text: 'Can your trains face the spectral railway?' }
        ],
        defeatDialogue: [
            { speaker: 'Phantom Conductor Raven', text: 'The spirits acknowledge your strength.' },
            { speaker: 'Phantom Conductor Raven', text: 'Take the Specter Badge.' }
        ]
    });

    // Legendary Old Iron
    map.addNPC({
        id: 'old_iron',
        name: '???',
        x: 10,
        y: 10,
        type: 'legendary',
        color: '#95A5A6',
        canBattle: true,
        defeated: false,
        party: [
            { speciesId: 150, level: 70 } // Old Iron - legendary
        ],
        dialogue: [
            { speaker: '???', text: '...' },
            { speaker: 'Old Iron', text: '*An ancient steam locomotive materializes from the mist*' },
            { speaker: 'Old Iron', text: '*It seems to recognize you... Your grandfather\'s presence lingers*' }
        ]
    });

    map.music = 'graveyard';
    return map;
}

/**
 * Create Voltage City - Electric gym
 */
function createVoltageCity() {
    const map = new WorldMap('voltage_city', 60, 50);

    // City paths
    map.fillRect(0, 0, 60, 50, TILE_TYPES.PATH);

    // Electric rails crisscrossing
    for (let x = 10; x < 50; x += 10) {
        for (let y = 0; y < 50; y++) {
            map.setTile(x, y, TILE_TYPES.RAILS);
        }
    }

    // Buildings
    map.fillRect(5, 5, 12, 10, TILE_TYPES.BUILDING);   // Dept Store
    map.fillRect(45, 5, 10, 8, TILE_TYPES.BUILDING);   // Battle Arena
    map.fillRect(25, 20, 10, 12, TILE_TYPES.STATION);  // GYM
    map.fillRect(20, 38, 8, 8, TILE_TYPES.BUILDING);   // Train Center

    // Gym Leader
    map.addNPC({
        id: 'gym_leader_spark',
        name: 'Engineer Spark',
        x: 30,
        y: 26,
        type: 'gym_leader',
        color: '#F1C40F',
        badgeColor: '#F39C12',
        canBattle: true,
        defeated: false,
        badge: 'Voltage Badge',
        party: [
            { speciesId: 25, level: 20 },
            { speciesId: 26, level: 22 },
            { speciesId: 6, level: 24 }
        ],
        dialogue: [
            { speaker: 'Engineer Spark', text: 'Voltage City never sleeps! Our electric trains are the fastest!' },
            { speaker: 'Engineer Spark', text: 'Let\'s see if you can keep up with the speed of lightning!' }
        ],
        defeatDialogue: [
            { speaker: 'Engineer Spark', text: 'Shocking! Your trains are electrifying!' },
            { speaker: 'Engineer Spark', text: 'The Voltage Badge is yours!' }
        ]
    });

    map.music = 'voltage_city';
    return map;
}

/**
 * Create all world maps
 */
function createAllMaps() {
    const maps = {};

    maps['piston_town'] = createPistonTown();
    maps['route_1'] = createRoute1();
    maps['coal_harbor'] = createCoalHarbor();
    maps['ghost_graveyard'] = createGhostGraveyard();
    maps['voltage_city'] = createVoltageCity();
    maps['professors_lab'] = createProfessorsLab();
    maps['coal_harbor_gym'] = createCoalHarborGym();

    // TODO: Create remaining towns and routes
    // - Steamspring Village
    // - Diesel Den
    // - Maglev Heights
    // - Nuclear Station
    // - Monorail Mountaintop
    // - Routes 2-8
    // - Victory Road

    return maps;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WorldMap, createAllMaps, TILE_TYPES };
}
