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
        this.currentMap = null;
        this.battle = null;

        // Timing
        this.stepCounter = 0;
        this.encounterCooldown = 0;

        // Initialize
        this.init();
    }

    init() {
        console.log('Train Battle RPG Initialized!');
        this.currentMap = createStarterMap();
    }

    newGame() {
        this.player = new Player();
        this.state = CONSTANTS.STATES.OVERWORLD;
        this.stepCounter = 0;

        console.log('New game started!');
        console.log('Party:', this.player.party);
    }

    update(deltaTime) {
        switch (this.state) {
            case CONSTANTS.STATES.TITLE:
                this.updateTitle();
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

    updateOverworld(deltaTime) {
        this.player.update(deltaTime);

        const action = this.input.getAction();

        if (!this.player.isMoving) {
            if (action === 'up') {
                if (this.player.move(CONSTANTS.DIRECTIONS.UP)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'down') {
                if (this.player.move(CONSTANTS.DIRECTIONS.DOWN)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'left') {
                if (this.player.move(CONSTANTS.DIRECTIONS.LEFT)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'right') {
                if (this.player.move(CONSTANTS.DIRECTIONS.RIGHT)) {
                    this.stepCounter++;
                    this.checkForEncounter();
                }
            } else if (action === 'start') {
                this.state = CONSTANTS.STATES.TITLE;
            } else if (action === 'a') {
                // Interact (not implemented)
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

    checkForEncounter() {
        // Only check in grass tiles and if cooldown is over
        const tile = this.currentMap.getTile(this.player.x, this.player.y);

        if (tile === 1 && this.encounterCooldown <= 0) {
            if (this.currentMap.checkForEncounter()) {
                this.startBattle();
            }
        }
    }

    startBattle() {
        const wildTrain = this.currentMap.getRandomEncounter();
        console.log(`Wild ${wildTrain.species.name} appeared!`);

        this.battle = new Battle([...this.player.party], [wildTrain], true);
        this.state = CONSTANTS.STATES.BATTLE;
    }

    render() {
        this.graphics.clear();

        switch (this.state) {
            case CONSTANTS.STATES.TITLE:
                this.renderTitle();
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
        }
    }

    renderTitle() {
        this.graphics.drawTitleScreen();
    }

    renderOverworld() {
        // Draw map
        this.graphics.drawMap(this.currentMap);

        // Draw player
        this.graphics.drawPlayer(this.player);

        // Draw HUD
        this.renderOverworldHUD();
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

        // Steps counter
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(20, 700, 200, 40);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(20, 700, 200, 40);

        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = '14px monospace';
        this.ctx.fillText(`Steps: ${this.stepCounter}`, 30, 725);
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
        const saveData = Utils.loadFromStorage('trainbattle_save');

        if (saveData && saveData.version === CONSTANTS.VERSION) {
            this.player = Player.fromJSON(saveData.player);
            this.state = CONSTANTS.STATES.OVERWORLD;
            console.log('Game loaded!');
            return true;
        }

        return false;
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
