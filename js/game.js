/**
 * Main Game Manager - orchestrates all game systems
 */

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Game systems
        this.graphics = new Graphics(this.ctx);
        this.input = new InputHandler();

        // Game state
        this.state = CONSTANTS.STATES.TITLE;
        this.player = null;
        this.maps = {};
        this.currentMap = null;
        this.battle = null;
        this.dialogueBox = new DialogueBox();
        this.menuSelection = 0;

        // Intro and starter selection
        this.introScene = null;
        this.starterSelection = null;

        // Timing
        this.stepCounter = 0;
        this.encounterCooldown = 0;

        // Initialize
        this.init();
    }

    init() {
        console.log('Train Battle RPG Initialized!');

        // Load all world maps
        this.maps = createAllMaps();
        console.log('Maps loaded:', Object.keys(this.maps));
    }

    newGame() {
        this.player = new Player();

        // Start with intro sequence instead of directly giving starter
        this.introScene = new IntroScene();
        this.state = CONSTANTS.STATES.INTRO;

        console.log('New game started! Beginning intro sequence...');
    }

    update(deltaTime) {
        switch (this.state) {
            case CONSTANTS.STATES.TITLE:
                this.updateTitle();
                break;

            case CONSTANTS.STATES.INTRO:
                this.updateIntro();
                break;

            case CONSTANTS.STATES.STARTER_SELECTION:
                this.updateStarterSelection();
                break;

            case CONSTANTS.STATES.OVERWORLD:
                this.updateOverworld(deltaTime);
                break;

            case CONSTANTS.STATES.BATTLE:
                this.updateBattle(deltaTime);
                break;

            case CONSTANTS.STATES.MENU:
                this.updateMenu();
                break;

            case CONSTANTS.STATES.DIALOGUE:
                this.updateDialogue(deltaTime);
                break;
        }

        // Decrement encounter cooldown
        if (this.encounterCooldown > 0) {
            this.encounterCooldown -= deltaTime;
        }
    }

    updateTitle() {
        const action = this.input.getAction();

        if (action === 'a' || action === 'start') {
            this.newGame();
        }
    }

    updateIntro() {
        const action = this.input.getAction();

        if (action === 'a') {
            if (this.introScene) {
                this.introScene.advance();

                if (this.introScene.isComplete()) {
                    // Intro is complete, move to starter selection
                    this.starterSelection = new StarterSelection(this);
                    this.state = CONSTANTS.STATES.STARTER_SELECTION;
                    console.log('Intro complete! Moving to starter selection...');
                }
            }
        }
    }

    updateStarterSelection() {
        const action = this.input.getAction();
        const moveAction = this.input.getMovementAction();

        if (!this.starterSelection) return;

        // Handle different phases of starter selection
        if (this.starterSelection.phase === 'intro') {
            // Pre-selection dialogue
            if (action === 'a') {
                this.starterSelection.advanceIntro();
            }
        } else if (this.starterSelection.phase === 'selection') {
            if (moveAction === 'left') {
                this.starterSelection.moveSelection('left');
            } else if (moveAction === 'right') {
                this.starterSelection.moveSelection('right');
            } else if (action === 'a') {
                this.menuSelection = 0;
                this.starterSelection.confirmSelection();
            }
        } else if (this.starterSelection.phase === 'confirmation') {
            if (action === 'left' || action === 'right') {
                this.menuSelection = (this.menuSelection + 1) % 2;
            } else if (action === 'a') {
                if (this.menuSelection === 0) {
                    this.starterSelection.confirm();
                } else {
                    this.starterSelection.cancelSelection();
                }
                this.menuSelection = 0;
            } else if (action === 'b') {
                this.starterSelection.cancelSelection();
            }
        } else if (this.starterSelection.phase === 'post-selection') {
            // Post-selection dialogue
            if (action === 'a') {
                const isComplete = this.starterSelection.advancePostSelection();

                if (isComplete) {
                    // All dialogue complete, transition to overworld
                    this.player.hasStarterTrain = true;
                    this.player.metProfessor = true;

                    this.currentMap = this.maps[this.player.currentMap];
                    if (!this.currentMap) {
                        console.error('Map not found:', this.player.currentMap);
                        this.currentMap = this.maps['piston_town'];
                    }

                    this.state = CONSTANTS.STATES.OVERWORLD;
                    this.stepCounter = 0;

                    console.log('Starting overworld!');
                    console.log('Starting location:', this.player.currentMap);
                    console.log('Player position:', this.player.x, this.player.y);
                }
            }
        }
    }

    updateOverworld(deltaTime) {
        this.player.update(deltaTime);
        this.updateNPCs(deltaTime);

        // Update camera
        if (this.currentMap) {
            this.graphics.updateCamera(this.player, this.currentMap);
        }

        const moveAction = this.input.getMovementAction();
        const action = this.input.getAction();

        if (!this.player.isMoving) {
            let moved = false;
            if (moveAction === 'up') {
                moved = this.player.move(CONSTANTS.DIRECTIONS.UP, this.currentMap);
            } else if (moveAction === 'down') {
                moved = this.player.move(CONSTANTS.DIRECTIONS.DOWN, this.currentMap);
            } else if (moveAction === 'left') {
                moved = this.player.move(CONSTANTS.DIRECTIONS.LEFT, this.currentMap);
            } else if (moveAction === 'right') {
                moved = this.player.move(CONSTANTS.DIRECTIONS.RIGHT, this.currentMap);
            }

            if (moved) {
                this.stepCounter++;
                this.checkForEncounter();
                this.checkForDoor();
            } else if (action === 'start') {
                // Open menu instead of restarting game
                this.state = CONSTANTS.STATES.MENU;
            } else if (action === 'a') {
                // Check for NPC interaction
                this.checkInteraction();
            }
        }
    }

    updateBattle(deltaTime) {
        if (this.battle) {
            this.battle.update(deltaTime);

            const action = this.input.getAction();
            if (action) {
                this.battle.handleInput(action);
            }

            if (this.battle.battleEnded) {
                if (this.battle.playerWon) {
                    console.log('Battle won!');

                    // If a train was caught, add it to the party
                    if (this.battle.caughtTrain && this.player.party.length < CONSTANTS.MAX_PARTY_SIZE) {
                        this.player.addTrain(this.battle.caughtTrain);
                        console.log(`${this.battle.caughtTrain.species.name} added to party!`);
                    }

                    this.state = CONSTANTS.STATES.OVERWORLD;
                    this.encounterCooldown = 5; // 5 second cooldown
                } else {
                    console.log('Battle lost!');
                    this.player.healParty();
                    this.state = CONSTANTS.STATES.OVERWORLD;
                    this.encounterCooldown = 5;
                }
                this.battle = null;
            }
        }
    }

    updateMenu() {
        const action = this.input.getAction();
        const moveAction = this.input.getMovementAction();

        const menuOptions = ['TRAINS', 'INVENTORY', 'SAVE', 'OPTIONS', 'EXIT'];

        // Navigate menu
        if (moveAction === 'up') {
            this.menuSelection = (this.menuSelection - 1 + menuOptions.length) % menuOptions.length;
        } else if (moveAction === 'down') {
            this.menuSelection = (this.menuSelection + 1) % menuOptions.length;
        } else if (action === 'a') {
            // Handle menu selection
            switch (this.menuSelection) {
                case 0: // TRAINS
                    console.log('View trains (not implemented yet)');
                    break;
                case 1: // INVENTORY
                    console.log('View inventory (not implemented yet)');
                    break;
                case 2: // SAVE
                    this.save();
                    break;
                case 3: // OPTIONS
                    console.log('Options (not implemented yet)');
                    break;
                case 4: // EXIT
                    this.state = CONSTANTS.STATES.OVERWORLD;
                    this.menuSelection = 0;
                    break;
            }
        } else if (action === 'b' || action === 'start') {
            // Close menu with B or Start
            this.state = CONSTANTS.STATES.OVERWORLD;
            this.menuSelection = 0;
        }
    }

    updateDialogue(deltaTime) {
        this.dialogueBox.update(deltaTime);

        const action = this.input.getAction();
        const dialogue = this.dialogueBox.getCurrentDialogue();

        if (dialogue && dialogue.choices && this.dialogueBox.isFinished()) {
            if (action === 'up') {
                this.menuSelection = (this.menuSelection - 1 + dialogue.choices.length) % dialogue.choices.length;
            } else if (action === 'down') {
                this.menuSelection = (this.menuSelection + 1) % dialogue.choices.length;
            } else if (action === 'a') {
                this.dialogueBox.handleChoice(this.menuSelection);
                this.menuSelection = 0;
            }
        } else if (action === 'a') {
            this.dialogueBox.advance();

            if (!this.dialogueBox.isActive()) {
                this.state = CONSTANTS.STATES.OVERWORLD;
            }
        }
    }

    checkForEncounter() {
        // Only check in tall grass tiles and if cooldown is over
        if (!this.currentMap) return;

        // Use targetX/targetY because x/y haven't updated yet when this is called
        const tile = this.currentMap.getTile(this.player.targetX, this.player.targetY);

        // Check if in tall grass (TILE_TYPES.TALL_GRASS = 2)
        if (tile === 2 && this.encounterCooldown <= 0 && this.player.party.length > 0) {
            if (this.currentMap.checkForEncounter()) {
                this.startBattle();
            }
        }
    }

    checkForDoor() {
        if (!this.currentMap) return;

        // Use targetX/targetY because x/y haven't updated yet when this is called
        const checkX = this.player.targetX;
        const checkY = this.player.targetY;

        if (this.currentMap.isDoor(checkX, checkY)) {
            // Door transitions with correct spawn coordinates
            if (this.currentMap.name === 'piston_town' && checkX === 9 && checkY === 10) {
                // Enter Professor's Lab, spawn at interior exit door
                this.changeMap('professors_lab', 5, 9);
            } else if (this.currentMap.name === 'professors_lab' && checkX === 5 && checkY === 9) {
                // Exit Lab, spawn one tile below entrance in Piston Town
                this.changeMap('piston_town', 9, 11);
            } else if (this.currentMap.name === 'piston_town' && checkX === 8 && checkY === 20) {
                // Enter Train Depot, spawn at interior exit door
                this.changeMap('train_depot', 6, 8);
            } else if (this.currentMap.name === 'train_depot' && checkX === 6 && checkY === 9) {
                // Exit Train Depot, spawn one tile below entrance in Piston Town
                this.changeMap('piston_town', 8, 21);
            } else if (this.currentMap.name === 'coal_harbor' && checkX === 22 && checkY === 21) {
                // Enter Coal Harbor Gym, spawn at interior exit door
                this.changeMap('coal_harbor_gym', 7, 14);
            } else if (this.currentMap.name === 'coal_harbor_gym' && checkX === 7 && checkY === 14) {
                // Exit Gym, spawn one tile below entrance in Coal Harbor
                this.changeMap('coal_harbor', 22, 22);
            }
        }
    }

    changeMap(mapName, newX, newY) {
        if (this.maps[mapName]) {
            this.currentMap = this.maps[mapName];
            this.player.currentMap = mapName;
            this.player.x = newX;
            this.player.y = newY;
            this.player.targetX = newX;
            this.player.targetY = newY;
            console.log(`Changed map to ${mapName} at ${newX}, ${newY}`);
        } else {
            console.error(`Map "${mapName}" not found!`);
        }
    }

    checkInteraction() {
        if (!this.currentMap) return;

        // Check direction player is facing
        let checkX = this.player.x;
        let checkY = this.player.y;

        switch (this.player.direction) {
            case CONSTANTS.DIRECTIONS.UP:
                checkY--;
                break;
            case CONSTANTS.DIRECTIONS.DOWN:
                checkY++;
                break;
            case CONSTANTS.DIRECTIONS.LEFT:
                checkX--;
                break;
            case CONSTANTS.DIRECTIONS.RIGHT:
                checkX++;
                break;
        }

        // Check for NPC at that position
        const npc = this.currentMap.getNPCAt(checkX, checkY);

        if (npc) {
            console.log('Interacting with:', npc.name);

            if (npc.type === 'healer') {
                // Train Depot Conductor - healing dialogue with YES/NO
                const healDialogue = {
                    speaker: 'Conductor',
                    text: 'Welcome to the Train Depot! Would you like me to restore your trains to perfect condition?',
                    choices: [
                        {
                            text: 'YES',
                            callback: () => {
                                // Heal all party trains
                                this.player.healParty();
                                // Show success message
                                this.dialogueBox.show([
                                    {
                                        speaker: 'Conductor',
                                        text: 'Your trains are fully restored! Come back anytime!'
                                    }
                                ]);
                            }
                        },
                        {
                            text: 'NO',
                            callback: () => {
                                // Show decline message
                                this.dialogueBox.show([
                                    {
                                        speaker: 'Conductor',
                                        text: 'Please come back anytime!'
                                    }
                                ]);
                            }
                        }
                    ]
                };
                this.dialogueBox.show([healDialogue]);
                this.state = CONSTANTS.STATES.DIALOGUE;
            } else if (npc.canBattle && !npc.defeated) {
                // Show pre-battle dialogue, then start battle
                if (npc.dialogue && npc.dialogue.length > 0) {
                    this.dialogueBox.show(npc.dialogue, () => {
                        this.startNPCBattle(npc);
                    });
                    this.state = CONSTANTS.STATES.DIALOGUE;
                } else {
                    // No dialogue, start battle immediately
                    this.startNPCBattle(npc);
                }
            } else if (npc.canBattle && npc.defeated && npc.defeatDialogue) {
                // Show post-defeat dialogue
                this.dialogueBox.show(npc.defeatDialogue);
                this.state = CONSTANTS.STATES.DIALOGUE;
            } else if (npc.type === 'item' && !npc.itemTaken) {
                this.player.addItem(npc.item, npc.quantity);
                npc.itemTaken = true;
                this.dialogueBox.show([
                    {
                        speaker: 'System',
                        text: `You received ${npc.quantity} ${npc.item}(s)!`
                    }
                ]);
                this.state = CONSTANTS.STATES.DIALOGUE;
            } else if (npc.dialogue && npc.dialogue.length > 0) {
                // Show dialogue
                this.dialogueBox.show(npc.dialogue, () => {
                    if (npc.event) {
                        this.triggerEvent(npc.event);
                    }
                });
                this.state = CONSTANTS.STATES.DIALOGUE;
            }
        }
    }

    startBattle() {
        if (!this.currentMap || this.player.party.length === 0) return;

        const wildTrain = this.currentMap.getRandomEncounter();
        console.log(`Wild ${wildTrain.species.name} appeared!`);

        this.battle = new Battle([...this.player.party], [wildTrain], true, this.player.items);
        this.state = CONSTANTS.STATES.BATTLE;
    }

    startNPCBattle(npc) {
        console.log(`Battle with ${npc.name}!`);

        // Create trainer's party from their data
        const enemyParty = npc.party.map(data => {
            return new Train(data.speciesId, data.level);
        });

        this.battle = new Battle([...this.player.party], enemyParty, false, npc);
        this.state = CONSTANTS.STATES.BATTLE;

        // Mark NPC as battled
        npc.defeated = true;

        // Set up victory callback for money and badges
        this.battle.onVictory = () => {
            // Award money if battle earned any
            if (this.battle.moneyEarned) {
                this.player.addMoney(this.battle.moneyEarned);
                console.log(`Earned $${this.battle.moneyEarned}! Total money: $${this.player.money}`);
            }

            // Award badge if gym leader
            if (npc.type === 'gym_leader' && npc.badge) {
                this.player.earnBadge(npc.badge);
                console.log(`Earned ${npc.badge}!`);
            }

            // Show defeat dialogue after battle ends
            if (npc.defeatDialogue && npc.defeatDialogue.length > 0) {
                // Delay showing dialogue until after battle state ends
                setTimeout(() => {
                    if (this.state === CONSTANTS.STATES.OVERWORLD) {
                        this.dialogueBox.show(npc.defeatDialogue);
                        this.state = CONSTANTS.STATES.DIALOGUE;
                    }
                }, 100);
            }
        };
    }

    render() {
        this.graphics.clear();

        switch (this.state) {
            case CONSTANTS.STATES.TITLE:
                this.renderTitle();
                break;

            case CONSTANTS.STATES.INTRO:
                this.renderIntro();
                break;

            case CONSTANTS.STATES.STARTER_SELECTION:
                this.renderStarterSelection();
                break;

            case CONSTANTS.STATES.OVERWORLD:
                this.renderOverworld();
                break;

            case CONSTANTS.STATES.BATTLE:
                this.renderBattle();
                break;

            case CONSTANTS.STATES.MENU:
                this.renderMenu();
                break;

            case CONSTANTS.STATES.DIALOGUE:
                this.renderDialogue();
                break;
        }
    }

    renderTitle() {
        this.graphics.drawTitleScreen();
    }

    renderIntro() {
        // Dark background
        this.ctx.fillStyle = '#1A1A28';
        this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

        // Display current dialogue
        if (this.introScene) {
            const dialogue = this.introScene.getCurrentDialogue();
            if (dialogue) {
                this.graphics.drawDialogue(dialogue);
            }
        }
    }

    renderStarterSelection() {
        if (!this.starterSelection) return;

        // Background
        this.ctx.fillStyle = '#2A3B52';
        this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

        if (this.starterSelection.phase === 'intro') {
            // Show pre-selection dialogue
            const dialogue = this.starterSelection.getCurrentIntroDialogue();
            if (dialogue) {
                this.graphics.drawDialogue(dialogue);
            }
        } else if (this.starterSelection.phase === 'selection') {
            // Show starter selection UI
            this.renderStarterChoices();
        } else if (this.starterSelection.phase === 'post-selection') {
            // Show post-selection dialogue
            const dialogue = this.starterSelection.getCurrentPostDialogue();
            if (dialogue) {
                this.graphics.drawDialogue(dialogue);
            }
        }
    }

    renderStarterChoices() {
        if (!this.starterSelection) return;

        // Title
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 48px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Choose Your Partner!', CONSTANTS.CANVAS_WIDTH / 2, 72);

        const margin = 20;
        const spacing = 16;
        const topY = 110;
        const availableWidth = CONSTANTS.CANVAS_WIDTH - margin * 2;
        const availableHeight = CONSTANTS.CANVAS_HEIGHT - topY - margin;

        // Reserve space for description panel
        let descHeight = Math.max(160, Math.floor(availableHeight * 0.4));
        let boxHeight = availableHeight - descHeight - spacing;
        if (boxHeight < 180) {
            boxHeight = 180;
            descHeight = Math.max(140, availableHeight - boxHeight - spacing);
        }

        const starters = this.starterSelection.starters;
        const boxWidth = Math.floor((availableWidth - spacing * 2) / 3);
        const startX = margin;
        const boxY = topY;

        for (let i = 0; i < starters.length; i++) {
            const x = startX + (i * (boxWidth + spacing));
            const y = boxY;
            const starter = starters[i];
            const isSelected = (i === this.starterSelection.selection);

            // Box background
            if (isSelected) {
                this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
                this.ctx.strokeStyle = '#FFD700';
                this.ctx.lineWidth = 6;
            } else {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                this.ctx.strokeStyle = '#FFFFFF';
                this.ctx.lineWidth = 3;
            }

            this.ctx.fillRect(x, y, boxWidth, boxHeight);
            this.ctx.strokeRect(x, y, boxWidth, boxHeight);

            // Draw cute baby train sprite!
            const spriteSize = Math.min(96, boxWidth - 40);
            const trainX = x + (boxWidth - spriteSize) / 2;
            const trainY = y + 30;

            // Draw the actual train sprite (all starters are level 5, so they're babies)
            this.graphics.drawCuteTrainSprite(starter.id, 5, trainX, trainY, spriteSize);

            // Starter name (below the train sprite)
            this.ctx.fillStyle = isSelected ? '#FFD700' : '#FFFFFF';
            this.ctx.font = 'bold 24px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(starter.displayName, x + boxWidth / 2, y + boxHeight - 70);

            // Type
            this.ctx.font = '16px monospace';
            this.ctx.fillText(`Type: ${starter.types[0]}`, x + boxWidth / 2, y + boxHeight - 40);
        }

        // Description box at bottom
        const currentStarter = this.starterSelection.getCurrentStarter();
        const descX = margin;
        const descY = boxY + boxHeight + spacing;
        const descWidth = availableWidth;

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.fillRect(descX, descY, descWidth, descHeight);
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(descX, descY, descWidth, descHeight);

        // Description text
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '18px monospace';
        this.ctx.textAlign = 'left';

        const lines = Utils.wrapText(currentStarter.description, descWidth - 32, this.ctx, 18);
        for (let i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], descX + 20, descY + 40 + i * 28);
        }

        // Instructions
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 20px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Use ← → to select, press Z to confirm', CONSTANTS.CANVAS_WIDTH / 2, descY + descHeight - 20);

        if (this.starterSelection.phase === 'confirmation') {
            const confirmWidth = 400;
            const confirmHeight = 150;
            const confirmX = (CONSTANTS.CANVAS_WIDTH - confirmWidth) / 2;
            const confirmY = (CONSTANTS.CANVAS_HEIGHT - confirmHeight) / 2;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            this.ctx.fillRect(confirmX, confirmY, confirmWidth, confirmHeight);
            this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
            this.ctx.lineWidth = 4;
            this.ctx.strokeRect(confirmX, confirmY, confirmWidth, confirmHeight);

            this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            this.ctx.font = 'bold 24px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`Choose ${this.starterSelection.getCurrentStarter().displayName}?`, CONSTANTS.CANVAS_WIDTH / 2, confirmY + 50);

            const choiceWidth = 100;
            const choiceHeight = 40;
            const yesX = confirmX + 50;
            const noX = confirmX + confirmWidth - choiceWidth - 50;
            const choiceY = confirmY + 80;

            // Yes
            if (this.menuSelection === 0) {
                this.ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
                this.ctx.fillRect(yesX, choiceY, choiceWidth, choiceHeight);
                this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
            } else {
                this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            }
            this.ctx.fillText('Yes', yesX + choiceWidth / 2, choiceY + 28);

            // No
            if (this.menuSelection === 1) {
                this.ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
                this.ctx.fillRect(noX, choiceY, choiceWidth, choiceHeight);
                this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
            } else {
                this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            }
            this.ctx.fillText('No', noX + choiceWidth / 2, choiceY + 28);
        }

        this.ctx.textAlign = 'left';
    }

    renderOverworld() {
        if (!this.currentMap) return;

        // Draw map with camera
        this.graphics.drawMap(this.currentMap, this.graphics.camera);

        // Draw NPCs (skip NPCs inside buildings or behind walls)
        for (const npc of this.currentMap.npcs) {
            const npcTile = this.currentMap.getTile(npc.x, npc.y);
            // Don't render NPCs on building/wall/station/cave tiles (they're inside)
            const occludedTiles = [0, 5, 7, 8, 11]; // VOID, WALL, BUILDING, STATION, CAVE
            if (!occludedTiles.includes(npcTile)) {
                this.graphics.drawNPC(npc, this.graphics.camera);
            }
        }

        // Draw player
        this.graphics.drawPlayer(this.player, this.graphics.camera);

        // Draw HUD
        if (this.player.party.length > 0) {
            this.renderOverworldHUD();
        }
    }

    renderOverworldHUD() {
        // Draw party info in corner
        const x = 20;
        const y = 20;

        for (let i = 0; i < this.player.party.length && i < 3; i++) {
            const train = this.player.party[i];
            const offsetY = i * 40;

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.fillRect(x, y + offsetY, 300, 35);
            this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y + offsetY, 300, 35);

            this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            this.ctx.font = 'bold 14px monospace';
            this.ctx.fillText(`${train.species.name} Lv.${train.level}`, x + 10, y + offsetY + 22);

            // HP bar
            const hpBarX = x + 180;
            const hpBarY = y + offsetY + 10;
            const hpBarWidth = 100;
            const hpBarHeight = 15;

            this.ctx.fillStyle = CONSTANTS.COLORS.LIGHT_GRAY;
            this.ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);

            const hpPercentage = train.getHPPercentage();
            const fillWidth = (hpBarWidth * hpPercentage) / 100;
            this.ctx.fillStyle = train.getHPColor();
            this.ctx.fillRect(hpBarX, hpBarY, fillWidth, hpBarHeight);

            this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
        }

        // Money display (top-right corner)
        const moneyWidth = 160;
        const moneyHeight = 36;
        const moneyX = CONSTANTS.CANVAS_WIDTH - moneyWidth - 20;
        const moneyY = 20;

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(moneyX, moneyY, moneyWidth, moneyHeight);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(moneyX, moneyY, moneyWidth, moneyHeight);

        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = 'bold 16px monospace';
        this.ctx.fillText(`$${this.player.money}`, moneyX + 10, moneyY + 24);

        // Badges counter
        const badgeWidth = 200;
        const badgeHeight = 36;
        const badgeX = 20;
        const badgeY = CONSTANTS.CANVAS_HEIGHT - badgeHeight - 20;

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);

        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = '14px monospace';
        this.ctx.fillText(`Badges: ${this.player.badgeCount}/8`, badgeX + 10, badgeY + 24);
    }

    renderBattle() {
        if (this.battle) {
            this.graphics.drawBattle(this.battle);
        }
    }

    renderMenu() {
        this.renderOverworld();

        // Draw menu overlay
        const margin = 20;
        const menuWidth = Math.min(340, CONSTANTS.CANVAS_WIDTH - margin * 2);
        const menuHeight = Math.min(360, CONSTANTS.CANVAS_HEIGHT - margin * 2);
        const menuX = (CONSTANTS.CANVAS_WIDTH - menuWidth) / 2;
        const menuY = (CONSTANTS.CANVAS_HEIGHT - menuHeight) / 2;

        UI.drawMenu(
            this.ctx,
            menuX,
            menuY,
            menuWidth,
            menuHeight,
            [
                'TRAINS',
                'INVENTORY',
                'SAVE',
                'OPTIONS',
                'EXIT'
            ],
            this.menuSelection
        );
    }

    renderDialogue() {
        // Draw overworld in background
        this.renderOverworld();

        // Draw dialogue box on top
        if (this.dialogueBox.isActive()) {
            this.graphics.drawDialogue(this.dialogueBox, this.menuSelection);
        }
    }

    save() {
        if (this.player) {
            const saveData = {
                version: CONSTANTS.VERSION,
                player: this.player.toJSON(),
                timestamp: Date.now()
            };

            if (Utils.saveToStorage('trainbattle_save', saveData)) {
                console.log('Game saved!');
                return true;
            }
        }
        return false;
    }

    load() {
        try {
            const saveData = Utils.loadFromStorage('trainbattle_save');

            if (saveData && saveData.version === CONSTANTS.VERSION) {
                this.player = Player.fromJSON(saveData.player);

                // Validate the loaded data
                if (!this.player || !this.player.currentMap) {
                    console.warn('Invalid save data: missing player or map');
                    return false;
                }

                // Ensure the map exists
                this.currentMap = this.maps[this.player.currentMap];
                if (!this.currentMap) {
                    console.warn(`Map '${this.player.currentMap}' not found`);
                    return false;
                }

                // Ensure player has at least one train
                if (!this.player.party || this.player.party.length === 0) {
                    console.warn('Invalid save data: no trains in party');
                    return false;
                }

                this.state = CONSTANTS.STATES.OVERWORLD;
                console.log('Game loaded successfully!');
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error loading save:', error);
            return false;
        }
    }

    clearSave() {
        localStorage.removeItem('trainbattle_save');
        console.log('Save data cleared!');
    }

    exportSaveToken() {
        if (this.player) {
            const saveData = {
                version: CONSTANTS.VERSION,
                player: this.player.toJSON(),
                timestamp: Date.now()
            };

            // Convert to base64 for easy copying
            const jsonString = JSON.stringify(saveData);
            const token = btoa(jsonString);

            console.log('Save token generated!');
            return token;
        }

        return null;
    }

    importSaveToken(token) {
        try {
            // Decode from base64
            const jsonString = atob(token);
            const saveData = JSON.parse(jsonString);

            // Validate save data
            if (saveData && saveData.version === CONSTANTS.VERSION && saveData.player) {
                this.player = Player.fromJSON(saveData.player);
                this.currentMap = this.maps[this.player.currentMap];
                this.state = CONSTANTS.STATES.OVERWORLD;

                // Also save to localStorage
                Utils.saveToStorage('trainbattle_save', saveData);

                console.log('Save token imported successfully!');
                return true;
            }
        } catch (error) {
            console.error('Failed to import save token:', error);
        }

        return false;
    }

    triggerEvent(eventName) {
        console.log(`Triggering event: ${eventName}`);
        switch (eventName) {
            case 'start_battle':
                this.startBattle();
                break;
            default:
                console.warn(`Unknown event: ${eventName}`);
        }
    }

    updateNPCs(deltaTime) {
        if (!this.currentMap) return;

        for (const npc of this.currentMap.npcs) {
            if (npc.movement) {
                if (!npc.movement.timer) {
                    npc.movement.timer = 0;
                    npc.movement.step = 0;
                }
                npc.movement.timer += deltaTime;

                if (npc.movement.timer > 1) { // Move every 1 second
                    npc.movement.timer = 0;

                    let newX = npc.x;
                    let newY = npc.y;

                    if (npc.movement.pattern === 'square') {
                        if (!npc.movement.initialX) {
                            npc.movement.initialX = npc.x;
                            npc.movement.initialY = npc.y;
                        }
                        const radius = npc.movement.radius || 1;
                        switch (npc.movement.step % 4) {
                            case 0: // Right
                                newX = npc.movement.initialX + radius;
                                newY = npc.movement.initialY;
                                break;
                            case 1: // Down
                                newX = npc.movement.initialX + radius;
                                newY = npc.movement.initialY + radius;
                                break;
                            case 2: // Left
                                newX = npc.movement.initialX;
                                newY = npc.movement.initialY + radius;
                                break;
                            case 3: // Up
                                newX = npc.movement.initialX;
                                newY = npc.movement.initialY;
                                break;
                        }
                        npc.movement.step++;
                    } else { // Random movement
                        const direction = Math.floor(Math.random() * 4);
                        switch (direction) {
                            case 0: // Up
                                newY--;
                                break;
                            case 1: // Down
                                newY++;
                                break;
                            case 2: // Left
                                newX--;
                                break;
                            case 3: // Right
                                newX++;
                                break;
                        }
                    }

                    if (this.currentMap.isWalkable(newX, newY)) {
                        npc.x = newX;
                        npc.y = newY;
                    }
                }
            }
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
}

// Browser global
if (typeof window !== 'undefined') {
    window.Game = Game;
}
