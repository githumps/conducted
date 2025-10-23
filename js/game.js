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
                this.updateDialogue();
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
                    this.starterSelection = new StarterSelection();
                    this.state = CONSTANTS.STATES.STARTER_SELECTION;
                    console.log('Intro complete! Moving to starter selection...');
                }
            }
        }
    }

    updateStarterSelection() {
        const action = this.input.getAction();

        if (!this.starterSelection) return;

        // Handle different phases of starter selection
        if (this.starterSelection.phase === 'intro') {
            // Pre-selection dialogue
            if (action === 'a') {
                this.starterSelection.advanceIntro();
            }
        } else if (this.starterSelection.phase === 'selection') {
            // Selecting starter
            if (action === 'left') {
                this.starterSelection.moveSelection('left');
            } else if (action === 'right') {
                this.starterSelection.moveSelection('right');
            } else if (action === 'a') {
                // Confirm selection
                const starterTrain = this.starterSelection.confirm();
                this.player.addTrain(starterTrain);

                // Give player starting items
                this.player.items.pokeball = 5;  // Trainballs
                this.player.items.potion = 2;     // Potions

                this.starterSelection.phase = 'post-selection';
                console.log(`Selected ${starterTrain.species.name}!`);
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

        // Update camera
        if (this.currentMap) {
            this.graphics.updateCamera(this.player, this.currentMap);
        }

        const action = this.input.getAction();

        if (!this.player.isMoving) {
            if (action === 'up') {
                if (this.player.move(CONSTANTS.DIRECTIONS.UP, this.currentMap)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'down') {
                if (this.player.move(CONSTANTS.DIRECTIONS.DOWN, this.currentMap)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'left') {
                if (this.player.move(CONSTANTS.DIRECTIONS.LEFT, this.currentMap)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'right') {
                if (this.player.move(CONSTANTS.DIRECTIONS.RIGHT, this.currentMap)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'start') {
                this.state = CONSTANTS.STATES.TITLE;
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

        if (action === 'b' || action === 'start') {
            this.state = CONSTANTS.STATES.OVERWORLD;
        }
    }

    updateDialogue() {
        const action = this.input.getAction();

        if (action === 'a') {
            this.dialogueBox.advance();

            if (!this.dialogueBox.isActive()) {
                this.state = CONSTANTS.STATES.OVERWORLD;
            }
        }
    }

    checkForEncounter() {
        // Only check in tall grass tiles and if cooldown is over
        if (!this.currentMap) return;

        const tile = this.currentMap.getTile(this.player.x, this.player.y);

        // Check if in tall grass (TILE_TYPES.TALL_GRASS = 2)
        if (tile === 2 && this.encounterCooldown <= 0 && this.player.party.length > 0) {
            if (this.currentMap.checkForEncounter()) {
                this.startBattle();
            }
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

            if (npc.canBattle && !npc.defeated) {
                // Start battle with NPC
                this.startNPCBattle(npc);
            } else if (npc.dialogue && npc.dialogue.length > 0) {
                // Show dialogue
                this.dialogueBox.show(npc.dialogue);
                this.state = CONSTANTS.STATES.DIALOGUE;
            }
        }
    }

    startBattle() {
        if (!this.currentMap || this.player.party.length === 0) return;

        const wildTrain = this.currentMap.getRandomEncounter();
        console.log(`Wild ${wildTrain.species.name} appeared!`);

        this.battle = new Battle([...this.player.party], [wildTrain], true);
        this.state = CONSTANTS.STATES.BATTLE;
    }

    startNPCBattle(npc) {
        console.log(`Battle with ${npc.name}!`);

        // Create trainer's party from their data
        const enemyParty = npc.party.map(data => {
            return new Train(data.speciesId, data.level);
        });

        this.battle = new Battle([...this.player.party], enemyParty, false);
        this.state = CONSTANTS.STATES.BATTLE;

        // Mark NPC as battled
        npc.defeated = true;

        // Award badge if gym leader
        if (npc.type === 'gym_leader' && npc.badge) {
            this.battle.onVictory = () => {
                this.player.earnBadge(npc.badge);
                console.log(`Earned ${npc.badge}!`);
            };
        }
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
        this.ctx.fillText('Choose Your Partner!', CONSTANTS.CANVAS_WIDTH / 2, 80);

        // Draw three starter "eggs" / boxes
        const starters = this.starterSelection.starters;
        const boxWidth = 240;
        const boxHeight = 320;
        const spacing = 40;
        const totalWidth = (boxWidth * 3) + (spacing * 2);
        const startX = (CONSTANTS.CANVAS_WIDTH - totalWidth) / 2;
        const y = 150;

        for (let i = 0; i < starters.length; i++) {
            const x = startX + (i * (boxWidth + spacing));
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
            const trainX = x + (boxWidth - 100) / 2;
            const trainY = y + 40;

            // Draw the actual train sprite (all starters are level 5, so they're babies)
            this.graphics.drawCuteTrainSprite(starter.id, 5, trainX, trainY, 100);

            // Starter name (below the train sprite)
            this.ctx.fillStyle = isSelected ? '#FFD700' : '#FFFFFF';
            this.ctx.font = 'bold 24px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(starter.displayName, x + boxWidth / 2, y + 170);

            // Type
            this.ctx.font = '16px monospace';
            this.ctx.fillText(`Type: ${starter.types[0]}`, x + boxWidth / 2, y + 200);
        }

        // Description box at bottom
        const currentStarter = this.starterSelection.getCurrentStarter();
        const descX = 50;
        const descY = 520;
        const descWidth = 860;
        const descHeight = 280;

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.fillRect(descX, descY, descWidth, descHeight);
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(descX, descY, descWidth, descHeight);

        // Description text
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '18px monospace';
        this.ctx.textAlign = 'left';

        const lines = Utils.wrapText(currentStarter.description, descWidth - 40, this.ctx, 18);
        for (let i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], descX + 20, descY + 40 + i * 28);
        }

        // Instructions
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 20px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Use ← → to select, press A to confirm', CONSTANTS.CANVAS_WIDTH / 2, descY + descHeight - 20);
    }

    renderOverworld() {
        if (!this.currentMap) return;

        // Draw map with camera
        this.graphics.drawMap(this.currentMap, this.graphics.camera);

        // Draw NPCs
        for (const npc of this.currentMap.npcs) {
            this.graphics.drawNPC(npc, this.graphics.camera);
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

        // Badges counter
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(20, 700, 200, 40);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(20, 700, 200, 40);

        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = '14px monospace';
        this.ctx.fillText(`Badges: ${this.player.badgeCount}/8`, 30, 725);
    }

    renderBattle() {
        if (this.battle) {
            this.graphics.drawBattle(this.battle);
        }
    }

    renderMenu() {
        this.renderOverworld();

        // Draw menu overlay
        UI.drawMenu(
            this.ctx,
            200,
            150,
            560,
            500,
            [
                'TRAINS',
                'INVENTORY',
                'SAVE',
                'OPTIONS',
                'EXIT'
            ],
            0
        );
    }

    renderDialogue() {
        // Draw overworld in background
        this.renderOverworld();

        // Draw dialogue box on top
        const dialogue = this.dialogueBox.getCurrentDialogue();
        if (dialogue) {
            this.graphics.drawDialogue(dialogue);
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
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
}
