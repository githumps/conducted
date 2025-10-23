/**
 * Train Species Database - All 151 trains!
 */

const TRAIN_SPECIES = {
    1: {
        id: 1,
        name: "Steamini",
        types: ["STEAM"],
        baseStats: { hp: 45, attack: 49, defense: 49, speed: 45, special: 65 },
        learnset: [
            { level: 1, move: "Whistle" },
            { level: 7, move: "Coal Throw" },
            { level: 13, move: "Steam Jet" },
            { level: 20, move: "Boiler Burst" }
        ],
        evolution: { method: "level", level: 16, evolvesTo: 2 },
        catchRate: 45,
        expYield: 64
    },
    2: {
        id: 2,
        name: "Steamore",
        types: ["STEAM"],
        baseStats: { hp: 60, attack: 62, defense: 63, speed: 60, special: 80 },
        learnset: [
            { level: 1, move: "Whistle" },
            { level: 7, move: "Coal Throw" },
            { level: 13, move: "Steam Jet" },
            { level: 20, move: "Boiler Burst" },
            { level: 32, move: "Pressure Blast" }
        ],
        evolution: { method: "level", level: 32, evolvesTo: 3 },
        catchRate: 45,
        expYield: 142
    },
    3: {
        id: 3,
        name: "Locomotor",
        types: ["STEAM", "FREIGHT"],
        baseStats: { hp: 80, attack: 82, defense: 83, speed: 80, special: 100 },
        learnset: [
            { level: 1, move: "Whistle" },
            { level: 7, move: "Coal Throw" },
            { level: 13, move: "Steam Jet" },
            { level: 20, move: "Boiler Burst" },
            { level: 32, move: "Pressure Blast" },
            { level: 45, move: "Mega Steam" }
        ],
        evolution: null,
        catchRate: 45,
        expYield: 236
    },
    4: {
        id: 4,
        name: "Sparkart",
        types: ["ELECTRIC"],
        baseStats: { hp: 39, attack: 52, defense: 43, speed: 65, special: 60 },
        learnset: [
            { level: 1, move: "Spark" },
            { level: 9, move: "Charge Beam" },
            { level: 15, move: "Thunder Wave" },
            { level: 22, move: "Rail Gun" }
        ],
        evolution: { method: "level", level: 16, evolvesTo: 5 },
        catchRate: 45,
        expYield: 62
    },
    5: {
        id: 5,
        name: "Voltrain",
        types: ["ELECTRIC"],
        baseStats: { hp: 58, attack: 64, defense: 58, speed: 80, special: 80 },
        learnset: [
            { level: 1, move: "Spark" },
            { level: 9, move: "Charge Beam" },
            { level: 15, move: "Thunder Wave" },
            { level: 22, move: "Rail Gun" },
            { level: 36, move: "Lightning Express" }
        ],
        evolution: { method: "level", level: 36, evolvesTo: 6 },
        catchRate: 45,
        expYield: 142
    },
    6: {
        id: 6,
        name: "Thunderail",
        types: ["ELECTRIC", "MAGLEV"],
        baseStats: { hp: 78, attack: 84, defense: 78, speed: 100, special: 109 },
        learnset: [
            { level: 1, move: "Spark" },
            { level: 9, move: "Charge Beam" },
            { level: 15, move: "Thunder Wave" },
            { level: 22, move: "Rail Gun" },
            { level: 36, move: "Lightning Express" },
            { level: 52, move: "Electromagnetic Pulse" }
        ],
        evolution: null,
        catchRate: 45,
        expYield: 240
    },
    7: {
        id: 7,
        name: "Diesling",
        types: ["DIESEL"],
        baseStats: { hp: 44, attack: 48, defense: 65, speed: 43, special: 50 },
        learnset: [
            { level: 1, move: "Tackle" },
            { level: 8, move: "Diesel Spray" },
            { level: 15, move: "Engine Rev" },
            { level: 22, move: "Fuel Blast" }
        ],
        evolution: { method: "level", level: 16, evolvesTo: 8 },
        catchRate: 45,
        expYield: 63
    },
    8: {
        id: 8,
        name: "Wartorque",
        types: ["DIESEL"],
        baseStats: { hp: 59, attack: 63, defense: 80, speed: 58, special: 65 },
        learnset: [
            { level: 1, move: "Tackle" },
            { level: 8, move: "Diesel Spray" },
            { level: 15, move: "Engine Rev" },
            { level: 22, move: "Fuel Blast" },
            { level: 32, move: "Turbo Charge" }
        ],
        evolution: { method: "level", level: 32, evolvesTo: 9 },
        catchRate: 45,
        expYield: 142
    },
    9: {
        id: 9,
        name: "Titanorque",
        types: ["DIESEL", "FREIGHT"],
        baseStats: { hp: 79, attack: 83, defense: 100, speed: 78, special: 85 },
        learnset: [
            { level: 1, move: "Tackle" },
            { level: 8, move: "Diesel Spray" },
            { level: 15, move: "Engine Rev" },
            { level: 22, move: "Fuel Blast" },
            { level: 32, move: "Turbo Charge" },
            { level: 48, move: "Heavy Haul" }
        ],
        evolution: null,
        catchRate: 45,
        expYield: 239
    },
    10: {
        id: 10,
        name: "Trackie",
        types: ["PASSENGER"],
        baseStats: { hp: 45, attack: 30, defense: 35, speed: 45, special: 20 },
        learnset: [
            { level: 1, move: "Tackle" },
            { level: 9, move: "String Shot" }
        ],
        evolution: { method: "level", level: 7, evolvesTo: 11 },
        catchRate: 255,
        expYield: 53
    },
    11: {
        id: 11,
        name: "Coachoon",
        types: ["PASSENGER"],
        baseStats: { hp: 50, attack: 20, defense: 55, speed: 30, special: 25 },
        learnset: [{ level: 1, move: "Harden" }],
        evolution: { method: "level", level: 10, evolvesTo: 12 },
        catchRate: 120,
        expYield: 72
    },
    12: {
        id: 12,
        name: "Majesticab",
        types: ["PASSENGER", "MAGLEV"],
        baseStats: { hp: 60, attack: 45, defense: 50, speed: 70, special: 90 },
        learnset: [
            { level: 10, move: "Confusion" },
            { level: 13, move: "Gust" },
            { level: 17, move: "Passenger Rush" },
            { level: 25, move: "Express Service" }
        ],
        evolution: null,
        catchRate: 45,
        expYield: 178
    },
    // Continue with remaining trains (13-151)
    13: { id: 13, name: "Cartle", types: ["FREIGHT"], baseStats: { hp: 40, attack: 35, defense: 30, speed: 50, special: 20 }, learnset: [{ level: 1, move: "Tackle" }], evolution: { method: "level", level: 7, evolvesTo: 14 }, catchRate: 255, expYield: 52 },
    14: { id: 14, name: "Haulkoon", types: ["FREIGHT"], baseStats: { hp: 45, attack: 25, defense: 50, speed: 35, special: 25 }, learnset: [{ level: 1, move: "Harden" }], evolution: { method: "level", level: 10, evolvesTo: 15 }, catchRate: 120, expYield: 71 },
    15: { id: 15, name: "Cargodrill", types: ["FREIGHT", "DIESEL"], baseStats: { hp: 65, attack: 90, defense: 40, speed: 75, special: 45 }, learnset: [{ level: 10, move: "Fury Attack" }], evolution: null, catchRate: 45, expYield: 178 },
    16: { id: 16, name: "Railoo", types: ["PASSENGER"], baseStats: { hp: 40, attack: 45, defense: 40, speed: 56, special: 35 }, learnset: [{ level: 1, move: "Tackle" }], evolution: { method: "level", level: 18, evolvesTo: 17 }, catchRate: 255, expYield: 55 },
    17: { id: 17, name: "Raileon", types: ["PASSENGER"], baseStats: { hp: 63, attack: 60, defense: 55, speed: 71, special: 50 }, learnset: [{ level: 1, move: "Tackle" }], evolution: { method: "level", level: 36, evolvesTo: 18 }, catchRate: 120, expYield: 113 },
    18: { id: 18, name: "Railgeot", types: ["PASSENGER", "MAGLEV"], baseStats: { hp: 83, attack: 80, defense: 75, speed: 101, special: 70 }, learnset: [{ level: 1, move: "Tackle" }], evolution: null, catchRate: 45, expYield: 216 },
    19: { id: 19, name: "Trackat", types: ["PASSENGER"], baseStats: { hp: 30, attack: 56, defense: 35, speed: 72, special: 25 }, learnset: [{ level: 1, move: "Tackle" }], evolution: { method: "level", level: 20, evolvesTo: 20 }, catchRate: 255, expYield: 57 },
    20: { id: 20, name: "Railcate", types: ["PASSENGER"], baseStats: { hp: 55, attack: 81, defense: 60, speed: 97, special: 50 }, learnset: [{ level: 1, move: "Tackle" }], evolution: null, catchRate: 127, expYield: 116 },
    21: { id: 21, name: "Monowl", types: ["MONORAIL", "PASSENGER"], baseStats: { hp: 40, attack: 60, defense: 30, speed: 70, special: 31 }, learnset: [{ level: 1, move: "Peck" }], evolution: { method: "level", level: 20, evolvesTo: 22 }, catchRate: 255, expYield: 58 },
    22: { id: 22, name: "Monoking", types: ["MONORAIL", "PASSENGER"], baseStats: { hp: 65, attack: 90, defense: 65, speed: 100, special: 61 }, learnset: [{ level: 1, move: "Peck" }], evolution: null, catchRate: 90, expYield: 162 },
    23: { id: 23, name: "Tunnela", types: ["DIESEL"], baseStats: { hp: 35, attack: 60, defense: 44, speed: 55, special: 40 }, learnset: [{ level: 1, move: "Tackle" }], evolution: { method: "level", level: 22, evolvesTo: 24 }, catchRate: 255, expYield: 62 },
    24: { id: 24, name: "Cobraloco", types: ["DIESEL"], baseStats: { hp: 60, attack: 95, defense: 69, speed: 80, special: 65 }, learnset: [{ level: 1, move: "Tackle" }], evolution: null, catchRate: 90, expYield: 147 },
    25: { id: 25, name: "Zaptram", types: ["ELECTRIC"], baseStats: { hp: 35, attack: 55, defense: 40, speed: 90, special: 50 }, learnset: [{ level: 1, move: "Thunder Shock" }], evolution: { method: "item", item: "thunder_stone", evolvesTo: 26 }, catchRate: 190, expYield: 112 },
    26: { id: 26, name: "Raitram", types: ["ELECTRIC"], baseStats: { hp: 60, attack: 90, defense: 55, speed: 110, special: 90 }, learnset: [{ level: 1, move: "Thunder Shock" }], evolution: null, catchRate: 75, expYield: 218 },
};

// Clever train names for all 151 trains!
const TRAIN_NAMES = {
    27: "Haztrak", 28: "Dynamini", 29: "Amperoad", 30: "Megawattage",
    31: "Levitot", 32: "Magline", 33: "Teleporth", 34: "Brawlcar",
    35: "Combattery", 36: "Championtrak", 37: "Chilldren", 38: "Frostline",
    39: "Glaciator", 40: "Spookcar", 41: "Phantomotive", 42: "Spectrailer",
    43: "Pebbleway", 44: "Bouldroad", 45: "Mountaineer", 46: "Wyrmcar",
    47: "Dracotrack", 48: "Leviathan", 49: "Shadowline", 50: "Eclipser",
    51: "Nightmarail", 52: "Tinytank", 53: "Armoroad", 54: "Warfortress",
    55: "Twinkleway", 56: "Starline", 57: "Celestrain", 58: "Commutot",
    59: "Routiner", 60: "Metropolis", 61: "Chronocart", 62: "Spatialway",
    63: "Gravitrak", 64: "Quantumline", 65: "Nucleon", 66: "Fusioneer",
    67: "Hyperloop", 68: "Subwayvern", 69: "Aeropress", 70: "Marinetrain",
    71: "Bulleter", 72: "Shinkanstrike", 73: "Orientalist", 74: "Transiberian",
    75: "Eurosteam", 76: "Amtraction", 77: "Cargoplex", 78: "Coalburner",
    79: "Oilslick", 80: "Grainery", 81: "Lumberyard", 82: "Ironcross",
    83: "Goldrusher", 84: "Armordillo", 85: "Peaceliner", 86: "Hospitrain",
    87: "Schoolbus", 88: "Firetruck", 89: "Policar", 90: "Ambulanche",
    91: "Tramsit", 92: "Cableway", 93: "Funicular", 94: "Monorider",
    95: "Dualrail", 96: "Multicart", 97: "Unitrain", 98: "Omnibus",
    99: "Versatile", 100: "Transformotive", 101: "Heritager", 102: "Vintager",
    103: "Modernia", 104: "Futurist", 105: "Pionear", 106: "Innovator",
    107: "Classique", 108: "Luxuria", 109: "Regalia", 110: "Excelsior",
    111: "Primeridian", 112: "Terminus", 113: "Junction", 114: "Switchback",
    115: "Sidetrack", 116: "Mainliner", 117: "Branchway", 118: "Spurline",
    119: "Loopback", 120: "Railyard", 121: "Stationmaster", 122: "Conductor",
    123: "Enginear", 124: "Brakeman", 125: "Signaler", 126: "Switchman",
    127: "Flagman", 128: "Porterway", 129: "Ticketron", 130: "Schedular",
    131: "Horologium", 132: "Whistler", 133: "Bellringer", 134: "Lamplight",
    135: "Semafor", 136: "Telegraf", 137: "Radiotrain", 138: "Cellular",
    139: "Satellink", 140: "Networker", 141: "Steelwheel", 142: "Ironcoupler",
    143: "Bronzebolt", 144: "Silverstream", 145: "Goldtrak", 146: "Platinumline",
    147: "Diamondexpress", 148: "Crystalline", 149: "Mythrilway", 150: "Adamantrain",
    151: "MEGALOCOMOTIVE"
};

// Generate remaining trains (27-151) with clever names!
for (let i = 27; i <= 151; i++) {
    const types = [Utils.randomChoice(CONSTANTS.TYPES)];
    if (Math.random() > 0.7) {
        types.push(Utils.randomChoice(CONSTANTS.TYPES.filter(t => t !== types[0])));
    }

    TRAIN_SPECIES[i] = {
        id: i,
        name: TRAIN_NAMES[i] || `Train${String(i).padStart(3, '0')}`,
        types: types,
        baseStats: {
            hp: Utils.randomInt(30, 120),
            attack: Utils.randomInt(30, 120),
            defense: Utils.randomInt(30, 120),
            speed: Utils.randomInt(30, 120),
            special: Utils.randomInt(30, 120)
        },
        learnset: [
            { level: 1, move: "Tackle" },
            { level: 10, move: "Quick Attack" },
            { level: 20, move: "Body Slam" }
        ],
        evolution: null,
        catchRate: Utils.randomInt(45, 255),
        expYield: Utils.randomInt(50, 250)
    };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TRAIN_SPECIES;
}
