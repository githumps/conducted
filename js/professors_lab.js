/**
 * Professor's Lab Map
 */
function createProfessorsLab() {
    const map = new GameMap("professors_lab", 10, 10);

    // Interior walls
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (x === 0 || x === 9 || y === 0 || y === 9) {
                map.tiles[y][x] = 5; // Wall
            } else {
                map.tiles[y][x] = 1; // Floor
            }
        }
    }

    // Add a desk for the professor
    map.tiles[2][4] = 5;
    map.tiles[2][5] = 5;

    // Add an exit door
    map.tiles[9][5] = 12; // Door

    // Add Professor Cypress NPC
    map.npcs.push({
        name: "Professor Cypress",
        x: 5,
        y: 3,
        sprite: 'professor',
        dialogue: [
            {
                speaker: "Professor Cypress",
                text: "Welcome to my lab! I've been expecting you."
            },
            {
                speaker: "Professor Cypress",
                text: "Are you ready to choose your first train partner?",
                choices: [
                    {
                        text: "Yes",
                        callback: () => {
                            game.state = CONSTANTS.STATES.STARTER_SELECTION;
                        }
                    },
                    {
                        text: "No",
                        callback: () => {
                            game.dialogueBox.show([
                                {
                                    speaker: "Professor Cypress",
                                    text: "Come back when you are ready."
                                }
                            ]);
                        }
                    }
                ]
            }
        ]
    });

    return map;
}
