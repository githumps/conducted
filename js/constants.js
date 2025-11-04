/**
 * Game constants - matching Pokemon Red/Blue style
 */

const CONSTANTS = {
    // Display settings
    TILE_SIZE: 16,
    SCALE: 3,
    SCREEN_TILES_X: 16,
    SCREEN_TILES_Y: 14,
    CANVAS_WIDTH: 768,
    CANVAS_HEIGHT: 672,
    FPS: 60,

    // Game info
    GAME_TITLE: "Train Battle RPG",
    VERSION: "1.0.9",

    // Colors (Game Boy style palette)
    COLORS: {
        WHITE: '#F8F8F8',
        LIGHT_GRAY: '#A8A8A8',
        DARK_GRAY: '#585858',
        BLACK: '#080808',
        TRANSPARENT: '#FF00FF',
        UI_BG: '#FFFFFF',
        UI_BORDER: '#000000',
        UI_TEXT: '#000000',
        UI_HIGHLIGHT: '#0070C0',
        HP_GREEN: '#10B010',
        HP_YELLOW: '#F0C010',
        HP_RED: '#E03020'
    },

    // Game states
    STATES: {
        TITLE: 'title',
        INTRO: 'intro',
        STARTER_SELECTION: 'starter_selection',
        OVERWORLD: 'overworld',
        BATTLE: 'battle',
        BATTLE_SUMMARY: 'battle_summary',
        MENU: 'menu',
        DIALOGUE: 'dialogue',
        TRANSITION: 'transition'
    },

    // Directions
    DIRECTIONS: {
        UP: 0,
        DOWN: 1,
        LEFT: 2,
        RIGHT: 3
    },

    // Train types
    TYPES: [
        'STEAM',
        'ELECTRIC',
        'DIESEL',
        'MAGLEV',
        'FREIGHT',
        'PASSENGER',
        'NUCLEAR',
        'MONORAIL'
    ],

    // Type colors for UI
    TYPE_COLORS: {
        'STEAM': '#B0B0B0',
        'ELECTRIC': '#F8D030',
        'DIESEL': '#705848',
        'MAGLEV': '#A890F0',
        'FREIGHT': '#B8A038',
        'PASSENGER': '#A8A878',
        'NUCLEAR': '#A040A0',
        'MONORAIL': '#A8B820'
    },

    // Type effectiveness chart
    TYPE_CHART: {
        'STEAM': { 'ELECTRIC': 0.5, 'DIESEL': 2.0, 'NUCLEAR': 0.5 },
        'ELECTRIC': { 'STEAM': 2.0, 'DIESEL': 0.5, 'MAGLEV': 2.0 },
        'DIESEL': { 'ELECTRIC': 2.0, 'STEAM': 0.5, 'FREIGHT': 0.5 },
        'MAGLEV': { 'FREIGHT': 2.0, 'ELECTRIC': 0.5, 'MONORAIL': 0.5 },
        'FREIGHT': { 'MAGLEV': 0.5, 'PASSENGER': 2.0, 'DIESEL': 2.0 },
        'PASSENGER': { 'NUCLEAR': 2.0, 'FREIGHT': 0.5, 'MONORAIL': 0.5 },
        'NUCLEAR': { 'PASSENGER': 0.5, 'MONORAIL': 2.0, 'STEAM': 2.0 },
        'MONORAIL': { 'NUCLEAR': 0.5, 'MAGLEV': 2.0, 'PASSENGER': 2.0 }
    },

    // Max values
    MAX_LEVEL: 100,
    MAX_PARTY_SIZE: 6,
    MAX_MOVES: 4,
    TOTAL_TRAINS: 151,

    // Battle
    BATTLE_STATES: {
        INTRO: 'intro',
        MENU: 'menu',
        FIGHT: 'fight',
        POKEMON: 'pokemon',
        ITEM: 'item',
        RUN: 'run',
        ANIMATION: 'animation',
        MESSAGE: 'message',
        VICTORY: 'victory',
        DEFEAT: 'defeat',
        BATTLE_SUMMARY: 'battle_summary'
    },

    // Player starting position
    PLAYER_START: {
        x: 10,
        y: 10,
        map: 'pallet_town'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONSTANTS;
}
