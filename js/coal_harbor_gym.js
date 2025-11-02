/**
 * Coal Harbor Gym Map
 */
function createCoalHarborGym() {
    const map = new GameMap("coal_harbor_gym", 15, 15);

    // Interior walls
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            if (x === 0 || x === 14 || y === 0 || y === 14) {
                map.tiles[y][x] = 5; // Wall
            } else {
                map.tiles[y][x] = 1; // Floor
            }
        }
    }

    // Add some water tiles
    map.fillRect(1, 5, 13, 5, 4); // Water

    // Add a path to the gym leader
    for (let y = 1; y < 14; y++) {
        map.tiles[y][7] = 3; // Path
    }

    // Add an exit door
    map.tiles[14][7] = 12; // Door

    // Add warps (return to town)
    map.warps = [
        { from: { x: 7, y: 14, width: 1, height: 1 }, to: { mapId: 'PistonTown', x: 5, y: 8, direction: 'down' } }
    ];

    // Add Gym Leader Marina
    map.npcs.push({
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
    });

    return map;
}
