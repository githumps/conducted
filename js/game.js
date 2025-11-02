/**
 * Game - Main game state machine and orchestration
 * Manages transitions between title, intro, overworld, battle states
 */

function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = CONSTANTS.STATES.TITLE;

    // Core systems
    this.input = new InputHandler();
    this.player = new Player();
    this.ui = new UI(this.ctx);

    // Map system
    this.currentMap = null;
    this.maps = {}; // Will be populated from createStarterMap() and world-maps.js maps

    // Scene controllers
    this.introScene = null;
    this.starterSelection = null;
    this.battle = null;

    // Image storage
    this.images = {};

    // Initialize maps
    this.initMaps();

    // Preload starter sprites
    this.preloadStarterSprites();

    console.log('✅ Game initialized');
}

Game.prototype.initMaps = function() {
    // Create starter map (legacy from map.js)
    this.maps['pallet_town'] = createStarterMap();

    // Add world maps if available
    if (typeof WORLD_MAPS !== 'undefined') {
        this.maps['PistonTown'] = WORLD_MAPS.PistonTown;
        this.maps['LabInterior'] = WORLD_MAPS.LabInterior;
        this.maps['Route1'] = WORLD_MAPS.Route1;
        // Set current map to Piston Town
        this.currentMap = this.maps['PistonTown'];
    } else {
        // Fallback to pallet_town
        this.currentMap = this.maps['pallet_town'];
    }
};

Game.prototype.preloadStarterSprites = function() {
    const starters = ['Steamini', 'Sparkart', 'Diesling'];
    for (const starter of starters) {
        const img = new Image();
        img.src = `assets/sprites/${starter}/front.png`;
        this.images[starter] = img;
    }
};

Game.prototype.update = function(deltaTime) {
    if (!this.currentMap) return;

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
    }
};

Game.prototype.updateTitle = function() {
    if (this.input.isKeyJustPressed('Enter') || this.input.isVirtualKeyJustPressed('a')) {
        this.state = CONSTANTS.STATES.INTRO;
        this.introScene = new IntroScene();
        console.log('→ INTRO');
    }
};

Game.prototype.updateIntro = function() {
    if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
        if (this.introScene.isComplete()) {
            this.state = CONSTANTS.STATES.STARTER_SELECTION;
            this.starterSelection = new StarterSelection(this);
            console.log('→ STARTER_SELECTION');
        } else {
            this.introScene.advance();
        }
    }
};

Game.prototype.updateStarterSelection = function() {
    const ss = this.starterSelection;

    // Handle input based on phase
    if (ss.phase === 'intro') {
        if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            ss.advanceIntro();
        }
    } else if (ss.phase === 'selection') {
        if (this.input.isKeyJustPressed('ArrowLeft') || this.input.isVirtualKeyJustPressed('left')) {
            ss.moveSelection('left');
        } else if (this.input.isKeyJustPressed('ArrowRight') || this.input.isVirtualKeyJustPressed('right')) {
            ss.moveSelection('right');
        } else if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            ss.confirmSelection();
        }
    } else if (ss.phase === 'confirmation') {
        // Check CANCEL first (B/X/Backspace)
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b')) {
            ss.cancelSelection();
            console.log('Cancelled starter selection');
        } else if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            ss.confirmSelection();
        }
    } else if (ss.phase === 'post-selection') {
        if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            const complete = ss.advancePostSelection();
            if (complete) {
                this.state = CONSTANTS.STATES.OVERWORLD;
                console.log('→ OVERWORLD');
            }
        }
    }
};

Game.prototype.updateOverworld = function(deltaTime) {
    // Track if player just finished moving
    const wasMoving = this.player.isMoving;

    // Update player animation
    this.player.update(deltaTime);

    const justStopped = wasMoving && !this.player.isMoving;

    // Player movement (only if not currently moving)
    if (!this.player.isMoving) {
        if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
            this.player.move(CONSTANTS.DIRECTIONS.UP, this.currentMap);
        } else if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
            this.player.move(CONSTANTS.DIRECTIONS.DOWN, this.currentMap);
        } else if (this.input.isKeyJustPressed('ArrowLeft') || this.input.isVirtualKeyJustPressed('left')) {
            this.player.move(CONSTANTS.DIRECTIONS.LEFT, this.currentMap);
        } else if (this.input.isKeyJustPressed('ArrowRight') || this.input.isVirtualKeyJustPressed('right')) {
            this.player.move(CONSTANTS.DIRECTIONS.RIGHT, this.currentMap);
        }
    }

    // Check for warp transitions after movement animation completes
    if (justStopped) {
        this.checkWarpTransition();

        // Check for wild encounters in tall grass
        if (this.currentMap.getTile(this.player.x, this.player.y) === 2) {
            if (this.currentMap.checkForEncounter && this.currentMap.checkForEncounter() && this.player.party.length > 0) {
                if (this.currentMap.getRandomEncounter) {
                    const wildTrain = this.currentMap.getRandomEncounter();
                    this.startBattle(wildTrain, false);
                }
            }
        }
    }

    // ESC to return to title (for testing)
    if (this.input.isKeyJustPressed('Escape')) {
        if (confirm('Return to title screen?')) {
            this.state = CONSTANTS.STATES.TITLE;
            console.log('→ TITLE');
        }
    }
};

Game.prototype.checkWarpTransition = function() {
    // Only works with new world-maps system
    if (!this.currentMap.warps) return;

    const warp = this.findWarp(this.currentMap, this.player.x, this.player.y);
    if (warp) {
        const to = warp.to;
        console.log(`🚪 Warp: ${this.currentMap.id} → ${to.mapId} (${to.x},${to.y})`);

        // Change map
        if (this.maps[to.mapId]) {
            this.currentMap = this.maps[to.mapId];
            this.player.currentMap = to.mapId;
        } else {
            console.error(`Map not found: ${to.mapId}`);
            return;
        }

        // Teleport player
        this.player.x = to.x;
        this.player.y = to.y;
        this.player.targetX = to.x;
        this.player.targetY = to.y;

        // Set direction if specified
        if (to.dir) {
            const dirMap = { 'up': 0, 'down': 1, 'left': 2, 'right': 3 };
            this.player.direction = dirMap[to.dir] ?? CONSTANTS.DIRECTIONS.DOWN;
        }
    }
};

Game.prototype.findWarp = function(map, x, y) {
    if (!map.warps) return null;

    for (const w of map.warps) {
        const f = w.from;
        if (x >= f.x && x < f.x + f.w && y >= f.y && y < f.y + f.h) {
            return w;
        }
    }
    return null;
};

Game.prototype.startBattle = function(wildTrain, isTrainerBattle) {
    if (this.player.party.length === 0) {
        console.warn('Cannot start battle - no trains in party');
        return;
    }

    this.battle = new Battle(this.player, wildTrain, isTrainerBattle);
    this.state = CONSTANTS.STATES.BATTLE;
    console.log('→ BATTLE');
};

Game.prototype.updateBattle = function(deltaTime) {
    if (!this.battle) {
        this.state = CONSTANTS.STATES.OVERWORLD;
        return;
    }

    this.battle.update(this.input);

    if (this.battle.isComplete && this.battle.isComplete()) {
        this.battle = null;
        this.state = CONSTANTS.STATES.OVERWORLD;
        console.log('→ OVERWORLD');
    }
};

Game.prototype.render = function() {
    const ctx = this.ctx;

    // Clear screen
    ctx.fillStyle = CONSTANTS.COLORS.BLACK;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    switch (this.state) {
        case CONSTANTS.STATES.TITLE:
            this.renderTitle(ctx);
            break;
        case CONSTANTS.STATES.INTRO:
            this.renderIntro(ctx);
            break;
        case CONSTANTS.STATES.STARTER_SELECTION:
            this.renderStarterSelection(ctx);
            break;
        case CONSTANTS.STATES.OVERWORLD:
            this.renderOverworld(ctx);
            break;
        case CONSTANTS.STATES.BATTLE:
            this.renderBattle(ctx);
            break;
    }
};

Game.prototype.renderTitle = function(ctx) {
    ctx.fillStyle = CONSTANTS.COLORS.WHITE;
    ctx.font = '32px monospace';
    ctx.fillText('TRAIN BATTLE RPG', 150, 200);
    ctx.font = '16px monospace';
    ctx.fillText('Press ENTER to start', 250, 300);
};

Game.prototype.wrapText = function(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (const word of words) {
        const testLine = line + word + ' ';
        if (ctx.measureText(testLine).width > maxWidth && line.length > 0) {
            ctx.fillText(line, x, currentY);
            line = word + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, currentY);
};

Game.prototype.renderIntro = function(ctx) {
    if (!this.introScene) return;

    const dialogue = this.introScene.getCurrentDialogue();
    if (dialogue) {
        ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        ctx.font = '16px monospace';
        ctx.fillText(dialogue.speaker, 50, 100);
        this.wrapText(ctx, dialogue.text, 50, 150, 600, 25);
        ctx.fillText('Press ENTER to continue', 50, 600);
    }
};

Game.prototype.renderStarterSelection = function(ctx) {
    if (!this.starterSelection) return;

    const ss = this.starterSelection;
    ctx.fillStyle = CONSTANTS.COLORS.WHITE;
    ctx.font = '16px monospace';

    if (ss.phase === 'intro') {
        const dialogue = ss.getCurrentIntroDialogue();
        if (dialogue) {
            ctx.fillText(dialogue.speaker, 50, 100);
            this.wrapText(ctx, dialogue.text, 50, 150, 600, 25);
            ctx.fillText('Press ENTER to continue', 50, 600);
        }
    } else if (ss.phase === 'selection') {
        ctx.fillText('Choose your starter train:', 200, 100);

        // Draw starters
        for (let i = 0; i < ss.starters.length; i++) {
            const starter = ss.starters[i];
            const x = 100 + i * 200;
            const y = 200;

            // Highlight selected
            if (i === ss.selection) {
                ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
                ctx.fillRect(x - 10, y - 10, 180, 200);
            }

            // Draw sprite image
            const spriteImg = this.images[starter.name];
            if (spriteImg && spriteImg.complete) {
                ctx.drawImage(spriteImg, x + 10, y + 70, 128, 128);
            }

            ctx.fillStyle = CONSTANTS.COLORS.WHITE;
            ctx.fillText(starter.displayName, x, y + 20);
            ctx.font = '12px monospace';
            ctx.fillText(`Type: ${starter.types[0]}`, x, y + 50);
            ctx.font = '16px monospace';
        }

        ctx.fillText('Use ← → to select, ENTER to confirm', 150, 500);
    } else if (ss.phase === 'confirmation') {
        const starter = ss.getCurrentStarter();
        ctx.fillText(`Choose ${starter.displayName}?`, 250, 250);
        ctx.fillText('ENTER = Yes    B = No', 230, 350);
    } else if (ss.phase === 'post-selection') {
        const dialogue = ss.getCurrentPostDialogue();
        if (dialogue) {
            ctx.fillText(dialogue.speaker, 50, 100);
            this.wrapText(ctx, dialogue.text, 50, 150, 600, 25);
            ctx.fillText('Press ENTER to continue', 50, 600);
        }
    }
};

Game.prototype.renderOverworld = function(ctx) {
    if (!this.currentMap) return;

    // Draw map tiles
    const tileSize = CONSTANTS.TILE_SIZE * CONSTANTS.SCALE;
    for (let y = 0; y < this.currentMap.height; y++) {
        for (let x = 0; x < this.currentMap.width; x++) {
            const tile = this.currentMap.getTile(x, y);
            const color = this.getTileColor(tile);
            ctx.fillStyle = color;
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Draw player
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(this.player.x * tileSize, this.player.y * tileSize, tileSize, tileSize);

    // Debug info
    ctx.fillStyle = CONSTANTS.COLORS.WHITE;
    ctx.font = '12px monospace';
    ctx.fillText(`Map: ${this.currentMap.id || this.currentMap.name}`, 10, 20);
    ctx.fillText(`Pos: (${this.player.x}, ${this.player.y})`, 10, 35);
};

Game.prototype.getTileColor = function(tile) {
    const colors = {
        0: '#000000', // void/wall
        1: '#00AA00', // grass
        2: '#00FF00', // tall grass
        3: '#CCAA88', // path
        4: '#0066FF', // water
        5: '#666666', // wall
        6: '#888888', // rails
        12: '#8B4513' // door
    };
    return colors[tile] || '#FF00FF';
};

Game.prototype.renderBattle = function(ctx) {
    if (this.battle && this.battle.render) {
        this.battle.render(ctx);
    }
};

// Save/Load system
Game.prototype.save = function() {
    try {
        const saveData = {
            player: {
                name: this.player.name,
                x: this.player.x,
                y: this.player.y,
                direction: this.player.direction,
                currentMap: this.player.currentMap,
                money: this.player.money,
                party: this.player.party.map(t => t.toJSON ? t.toJSON() : t),
                items: this.player.items,
                hasStarterTrain: this.player.hasStarterTrain
            },
            state: this.state
        };

        localStorage.setItem('trainBattleRPG_save', JSON.stringify(saveData));
        console.log('💾 Game saved');
        return true;
    } catch (err) {
        console.error('Save failed:', err);
        return false;
    }
};

Game.prototype.load = function() {
    try {
        const saved = localStorage.getItem('trainBattleRPG_save');
        if (!saved) return false;

        const data = JSON.parse(saved);

        // Restore player state
        this.player.name = data.player.name;
        this.player.x = data.player.x;
        this.player.y = data.player.y;
        this.player.direction = data.player.direction;
        this.player.currentMap = data.player.currentMap;
        this.player.money = data.player.money;
        this.player.items = data.player.items;
        this.player.hasStarterTrain = data.player.hasStarterTrain;

        // Restore party
        this.player.party = data.player.party.map(t => Train.fromJSON ? Train.fromJSON(t) : new Train(t.species, t.level));

        // Restore map
        if (this.maps[this.player.currentMap]) {
            this.currentMap = this.maps[this.player.currentMap];
        }

        // Restore state
        this.state = data.state;

        console.log('📁 Game loaded');
        return true;
    } catch (err) {
        console.error('Load failed:', err);
        return false;
    }
};

Game.prototype.exportSaveToken = function() {
    const saved = localStorage.getItem('trainBattleRPG_save');
    return saved ? btoa(saved) : null;
};

Game.prototype.importSaveToken = function(token) {
    try {
        const decoded = atob(token);
        localStorage.setItem('trainBattleRPG_save', decoded);
        return this.load();
    } catch (err) {
        console.error('Import failed:', err);
        return false;
    }
};
