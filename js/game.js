/**
 * Game - Main game state machine and orchestration
 * Manages transitions between title, intro, overworld, battle states
 */

function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'loading'; // Start in loading state

    // Core systems
    this.input = new InputHandler();
    this.player = new Player();
    this.ui = new UI(this.ctx);

    // Map system
    this.currentMap = null;
    this.maps = {}; // Will be populated from createStarterMap() and world-maps.js maps
    this.tilesets = {}; // To store loaded tilesets

    // Scene controllers
    this.introScene = null;
    this.starterSelection = null;
    this.battle = null;

    // Image storage
    this.images = {};
    this.imagesLoaded = false;
    this.loadingProgress = 0;

    // Debug menu
    this.debugMenuSelection = 0;
    this.debugMenuOptions = [
        { label: 'Title Screen', state: CONSTANTS.STATES.TITLE },
        { label: 'Intro', state: CONSTANTS.STATES.INTRO },
        { label: 'Starter Selection', state: CONSTANTS.STATES.STARTER_SELECTION },
        { label: 'Overworld (Piston Town)', state: CONSTANTS.STATES.OVERWORLD },
        { label: 'Wild Battle', action: 'wildBattle' },
        { label: 'Close Debug Menu', action: 'close' }
    ];

    // Pause menu system
    this.menuSelection = 0;
    this.menuOptions = ['TRAINS', 'BAG', 'SHOP', 'HEAL', 'SAVE', 'CLOSE'];
    this.bagSelection = 0;
    this.bagMode = null; // null, 'list', or 'use_on_train'
    this.selectedItem = null;
    this.trainSelection = 0;

    // Shop system
    this.shopSelection = 0;
    this.shopMode = null;  // null or 'active' when shop is open
    this.shopItems = [
        { name: 'potion', displayName: 'Potion', price: 300, description: 'Heals 20 HP' },
        { name: 'super_potion', displayName: 'Super Potion', price: 700, description: 'Heals 50 HP' },
        { name: 'boxcar', displayName: 'Boxcar', price: 200, description: 'Catches wild trains' }
    ];

    // Initialize maps and assets
    this.initAssets();


    console.log('✅ Game initialized');
}

Game.prototype.initAssets = async function() {
    await this.initMaps();
    this.preloadStarterSprites(); // This can run in parallel
};

Game.prototype.initMaps = async function() {
    // Create starter map (legacy from map.js)
    this.maps['pallet_town'] = createStarterMap();

    // Add world maps if available - iterate through ALL maps dynamically
    if (typeof WORLD_MAPS !== 'undefined') {
        for (const mapId in WORLD_MAPS) {
            this.maps[mapId] = WORLD_MAPS[mapId];
        }
    }

    // Legacy: Coal Harbor Gym now loaded from WORLD_MAPS above
    // (coal_harbor_gym.js is deprecated - gym integrated into world-maps.js)

    // Load all tilesets
    for (const mapId in this.maps) {
        const map = this.maps[mapId];
        if (map.tileset) {
            console.log(`Loading tileset for ${mapId}: ${map.tileset}`);
            try {
                const tileset = await loadTileset({ src: map.tileset });
                this.tilesets[mapId] = tileset;
                map.tilesetRef = tileset; // Add a direct reference to the map object
                console.log(`✅ Tileset loaded for ${mapId}`);
            } catch (error) {
                console.error(`❌ Failed to load tileset for ${mapId}:`, error);
            }
        }
    }

    // Set current map after loading
    if (this.maps['PistonTown']) {
        this.currentMap = this.maps['PistonTown'];
    } else {
        this.currentMap = this.maps['pallet_town'];
    }
};

Game.prototype.preloadStarterSprites = function() {
    const starters = ['Steamini', 'Sparkart', 'Diesling'];
    const characters = ['professor-cypress-1']; // Character sprites to load
    const allImages = [...starters, ...characters];
    let loadedCount = 0;
    const totalImages = allImages.length;

    const onImageLoad = (name) => {
        loadedCount++;
        this.loadingProgress = loadedCount / totalImages;
        console.log(`✅ Loaded ${name} (${loadedCount}/${totalImages})`);
        if (loadedCount === totalImages) {
            this.imagesLoaded = true;
            // Only transition to title if we're in loading state (not if we loaded from save)
            if (this.state === 'loading') {
                this.state = CONSTANTS.STATES.TITLE;
            }
            console.log('✅ All sprites loaded');
        }
    };

    const onImageError = (name) => {
        console.error(`❌ Failed to load sprite: ${name}`);
        loadedCount++;
        this.loadingProgress = loadedCount / totalImages;
    };

    // Load starter sprites
    for (const starter of starters) {
        const img = new Image();
        img.onload = () => onImageLoad(starter);
        img.onerror = () => onImageError(starter);
        img.src = `assets/sprites/${starter}/front.png`;
        this.images[starter] = img;
    }

    // Load character sprites
    for (const character of characters) {
        const img = new Image();
        img.onload = () => onImageLoad(character);
        img.onerror = () => onImageError(character);
        img.src = `assets/sprites/characters/${character}.png`;
        this.images[character] = img;
    }
};

Game.prototype.update = function(deltaTime) {
    switch (this.state) {
        case 'loading':
            // Images are loading, wait for completion
            break;
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
        case CONSTANTS.STATES.BATTLE_SUMMARY:
            this.updateBattleSummary();
            break;
        case CONSTANTS.STATES.MENU:
            this.updateMenu();
            break;
        case 'debug':
            this.updateDebugMenu();
            break;
    }
};

Game.prototype.updateTitle = function() {
    // Debug menu shortcut
    if (this.input.isKeyJustPressed('`') || this.input.isKeyJustPressed('F1')) {
        this.state = 'debug';
        console.log('→ DEBUG MENU');
        return;
    }

    if (this.input.isKeyJustPressed('Enter') || this.input.isVirtualKeyJustPressed('a')) {
        this.state = CONSTANTS.STATES.INTRO;
        this.introScene = new IntroScene();
        console.log('→ INTRO');
    }
};

Game.prototype.updateDebugMenu = function() {
    // Navigation
    if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
        this.debugMenuSelection = (this.debugMenuSelection - 1 + this.debugMenuOptions.length) % this.debugMenuOptions.length;
    }
    if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
        this.debugMenuSelection = (this.debugMenuSelection + 1) % this.debugMenuOptions.length;
    }

    // Selection
    if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
        const option = this.debugMenuOptions[this.debugMenuSelection];

        if (option.action === 'close') {
            this.state = CONSTANTS.STATES.TITLE;
            console.log('→ TITLE (from debug menu)');
            return;
        }

        if (option.action === 'wildBattle') {
            // Initialize a wild battle
            this.state = CONSTANTS.STATES.OVERWORLD;
            // Ensure player has a starter
            if (!this.player.party || this.player.party.length === 0) {
                this.player.party = [new Train(1, 5)]; // Steamini (ID 1)
            }
            // Trigger wild encounter
            const wildTrainId = Math.floor(Math.random() * 10) + 1; // Random from IDs 1-10
            const wildTrain = new Train(wildTrainId, 5);
            this.battle = new Battle(this.player.party, [wildTrain]);
            this.state = CONSTANTS.STATES.BATTLE;
            console.log('→ WILD BATTLE (debug)');
            return;
        }

        if (option.state) {
            // Jump to state
            switch (option.state) {
                case CONSTANTS.STATES.TITLE:
                    this.state = CONSTANTS.STATES.TITLE;
                    console.log('→ TITLE (debug)');
                    break;
                case CONSTANTS.STATES.INTRO:
                    this.state = CONSTANTS.STATES.INTRO;
                    this.introScene = new IntroScene();
                    console.log('→ INTRO (debug)');
                    break;
                case CONSTANTS.STATES.STARTER_SELECTION:
                    this.state = CONSTANTS.STATES.STARTER_SELECTION;
                    this.starterSelection = new StarterSelection(this);
                    console.log('→ STARTER_SELECTION (debug)');
                    break;
                case CONSTANTS.STATES.OVERWORLD:
                    this.state = CONSTANTS.STATES.OVERWORLD;
                    // Ensure player has a starter
                    if (!this.player.party || this.player.party.length === 0) {
                        this.player.party = [new Train(1, 5)]; // Steamini (ID 1)
                    }
                    console.log('→ OVERWORLD (debug)');
                    break;
            }
        }
    }

    // ESC or B to close
    if (this.input.isKeyJustPressed('Escape') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b')) {
        this.state = CONSTANTS.STATES.TITLE;
        console.log('→ TITLE (from debug menu)');
    }
};

Game.prototype.updateIntro = function() {
    // Allow B to go back through intro or return to title
    if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b')) {
        if (this.introScene.currentIndex > 0) {
            this.introScene.currentIndex--;
            console.log('Back through intro scene');
        } else {
            this.state = CONSTANTS.STATES.TITLE;
            console.log('→ TITLE (cancelled from intro)');
        }
    } else if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
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
        // Allow B to go back through dialogue or return to title
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b')) {
            if (ss.dialogueIndex > 0) {
                ss.dialogueIndex--;
                console.log('Back through intro dialogue');
            } else {
                this.state = CONSTANTS.STATES.TITLE;
                console.log('→ TITLE (cancelled from intro)');
            }
        } else if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            ss.advanceIntro();
        }
    } else if (ss.phase === 'selection') {
        // Allow B to go back to intro dialogue
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b')) {
            ss.phase = 'intro';
            ss.dialogueIndex = Math.max(0, ss.dialogueIndex - 1);
            console.log('Back to intro from selection');
        } else if (this.input.isKeyJustPressed('ArrowLeft') || this.input.isVirtualKeyJustPressed('left')) {
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
        // Allow B to go back during post-selection dialogue
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b')) {
            ss.phase = 'selection';
            ss.confirmed = false;
            console.log('Cancelled from post-selection - back to selection');
        } else if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            const complete = ss.advancePostSelection();
            if (complete) {
                this.state = CONSTANTS.STATES.OVERWORLD;
                console.log('→ OVERWORLD');
            }
        }
    }
};

Game.prototype.updateOverworld = function(deltaTime) {
    // Open pause menu with Escape key (only when not moving)
    if (!this.player.isMoving && this.input.isKeyJustPressed('Escape')) {
        this.state = CONSTANTS.STATES.MENU;
        this.menuSelection = 0;
        this.bagMode = null;  // Don't auto-open BAG - require Enter
        this.shopMode = null;  // Ensure shop is also closed
        console.log('→ MENU');
        return;
    }

    // Track if player just finished moving
    const wasMoving = this.player.isMoving;

    // Update player animation
    this.player.update(deltaTime);

    const justStopped = wasMoving && !this.player.isMoving;

    // Player movement (only if not currently moving)
    if (!this.player.isMoving) {
        // Check for NPC interaction (A button)
        if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            this.checkNPCInteraction();
            return; // Don't process movement if interacting
        }

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

        // Check for wild encounters in grass (not on paths)
        if (this.currentMap.checkForEncounter && this.currentMap.checkForEncounter(this.player.x, this.player.y) && this.player.party.length > 0) {
            if (this.currentMap.getRandomEncounter) {
                const wildTrain = this.currentMap.getRandomEncounter();
                this.startBattle(wildTrain, false);
            }
        }
    }

};

Game.prototype.checkNPCInteraction = function() {
    if (!this.currentMap.npcs || this.currentMap.npcs.length === 0) return;

    // Calculate tile player is facing
    let facingX = this.player.x;
    let facingY = this.player.y;

    switch (this.player.direction) {
        case CONSTANTS.DIRECTIONS.UP:
            facingY--;
            break;
        case CONSTANTS.DIRECTIONS.DOWN:
            facingY++;
            break;
        case CONSTANTS.DIRECTIONS.LEFT:
            facingX--;
            break;
        case CONSTANTS.DIRECTIONS.RIGHT:
            facingX++;
            break;
    }

    // Find NPC at facing position
    const npc = this.currentMap.npcs.find(n => n.x === facingX && n.y === facingY);

    if (npc) {
        // Start trainer battle if applicable
        if ((npc.type === 'trainer' || npc.type === 'gym_leader') && npc.canBattle && !npc.defeated) {
            this.startTrainerBattle(npc);
        } else {
            // Show dialogue for defeated trainers or non-battle NPCs
            const dialogue = npc.defeated && npc.defeatDialogue ? npc.defeatDialogue : npc.dialogue;
            if (dialogue && dialogue.length > 0) {
                console.log(`${npc.name}: ${dialogue[0].text}`);
            }
        }
    }
};

Game.prototype.startTrainerBattle = function(npc) {
    if (this.player.party.length === 0) {
        console.warn('Cannot start trainer battle - no trains in party');
        return;
    }

    console.log(`Starting trainer battle with ${npc.name}...`);

    // Show dialogue first (for now just log it, could use DialogueBox later)
    if (npc.dialogue && npc.dialogue.length > 0) {
        console.log(`${npc.dialogue[0].text}`);
    }

    // Generate enemy trains from NPC party data
    const enemyTrains = npc.party.map(data => {
        const species = TRAIN_DATA.find(t => t.id === data.speciesId);
        if (!species) {
            console.error(`Species not found: ${data.speciesId}`);
            return null;
        }
        return new Train(species, data.level);
    }).filter(t => t !== null);

    if (enemyTrains.length === 0) {
        console.error('No valid enemy trains!');
        return;
    }

    // Create trainer battle
    this.battle = new Battle(this.player.party, enemyTrains, false, npc);

    // Set up victory callback for defeat tracking and badges
    const originalOnVictory = this.battle.onVictory;
    this.battle.onVictory = () => {
        // Mark trainer as defeated
        npc.defeated = true;
        console.log(`${npc.name} defeated!`);

        // Award badge if gym leader
        if (npc.type === 'gym_leader' && npc.badge) {
            const earned = this.player.earnBadge(npc.badge);
            if (earned) {
                console.log(`🏅 Earned ${npc.badge}!`);
            }
        }

        // Call original callback if exists
        if (originalOnVictory) {
            originalOnVictory();
        }
    };

    this.state = CONSTANTS.STATES.BATTLE;
    console.log('→ BATTLE (Trainer)');
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

Game.prototype.startBattle = function(wildTrain, isTrainerBattle = false) {
    if (this.player.party.length === 0) {
        console.warn('Cannot start battle - no trains in party');
        return;
    }

    // Battle constructor expects: (playerTrains[], enemyTrains[], isWild, trainerNPC)
    if (isTrainerBattle) {
        // Trainer battle (not yet implemented)
        this.battle = new Battle(this.player.party, [wildTrain], false, null);
    } else {
        // Wild encounter
        this.battle = new Battle(this.player.party, [wildTrain], true);
    }
    this.state = CONSTANTS.STATES.BATTLE;
    console.log('→ BATTLE');
};

Game.prototype.updateBattle = function(deltaTime) {
    if (!this.battle) {
        this.state = CONSTANTS.STATES.OVERWORLD;
        return;
    }

    // Update battle animations
    this.battle.update(deltaTime);

    // Handle input
    if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
        this.battle.handleInput('a');
    } else if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
        this.battle.handleInput('up');
    } else if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
        this.battle.handleInput('down');
    } else if (this.input.isKeyJustPressed('ArrowLeft') || this.input.isVirtualKeyJustPressed('left')) {
        this.battle.handleInput('left');
    } else if (this.input.isKeyJustPressed('ArrowRight') || this.input.isVirtualKeyJustPressed('right')) {
        this.battle.handleInput('right');
    } else if (this.input.isKeyJustPressed('x') || this.input.isKeyJustPressed('Backspace') || this.input.isVirtualKeyJustPressed('b')) {
        this.battle.handleInput('b');
    }

    // Handle battle completion
    if (this.battle.isComplete && this.battle.isComplete()) {
        // Check if player was defeated
        if (this.battle.state === CONSTANTS.BATTLE_STATES.DEFEAT) {
            this.handleDefeat();
        } else if (this.battle.state === CONSTANTS.BATTLE_STATES.VICTORY) {
            // Award money from battle
            if (this.battle.moneyEarned) {
                this.player.money += this.battle.moneyEarned;
                console.log(`Earned $${this.battle.moneyEarned}! Total: $${this.player.money}`);
            }
            this.state = CONSTANTS.STATES.BATTLE_SUMMARY;
        } else {
            this.battle = null;
            this.state = CONSTANTS.STATES.OVERWORLD;
            console.log('→ OVERWORLD');
        }
    }
};

Game.prototype.updateBattleSummary = function() {
    if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
        this.battle = null;
        this.state = CONSTANTS.STATES.OVERWORLD;
        console.log('→ OVERWORLD');
    }
};


Game.prototype.renderBattleSummary = function(ctx) {
    if (!this.battle) return;

    // Render the battle behind the summary
    this.renderBattle(ctx);

    // Draw a semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the summary box
    const boxX = this.canvas.width / 2 - 200;
    const boxY = this.canvas.height / 2 - 100;
    const boxWidth = 400;
    const boxHeight = 200;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Summary text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('VICTORY!', this.canvas.width / 2, boxY + 50);

    if (this.battle.moneyEarned) {
        ctx.font = '20px monospace';
        ctx.fillText(`You earned $${this.battle.moneyEarned}!`, this.canvas.width / 2, boxY + 100);
    }

    ctx.textAlign = 'left'; // Reset text align
};

Game.prototype.handleDefeat = function() {
    console.log('Player defeated - triggering blackout');

    // Heal all trains to full HP
    this.player.healParty();

    // Reduce money by 50% (or set to 0 if less than 100)
    if (this.player.money < 100) {
        this.player.money = 0;
    } else {
        this.player.money = Math.floor(this.player.money * 0.5);
    }

    // Teleport player back to Piston Town (default healing depot spawn point)
    this.player.x = 10;
    this.player.y = 7;
    this.player.currentMap = 'piston_town';
    this.player.direction = CONSTANTS.DIRECTIONS.DOWN;

    console.log(`Blackout - Money reduced to ${this.player.money}, teleported to Piston Town`);
};

Game.prototype.render = function() {
    const ctx = this.ctx;

    // Clear screen
    ctx.fillStyle = CONSTANTS.COLORS.BLACK;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    switch (this.state) {
        case 'loading':
            this.renderLoading(ctx);
            break;
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
        case CONSTANTS.STATES.BATTLE_SUMMARY:
            this.renderBattleSummary(ctx);
            break;
        case CONSTANTS.STATES.MENU:
            this.renderMenu(ctx);
            break;
        case 'debug':
            this.renderDebugMenu(ctx);
            break;
    }
};

Game.prototype.renderLoading = function(ctx) {
    ctx.fillStyle = CONSTANTS.COLORS.WHITE;
    ctx.font = '24px monospace';
    ctx.fillText('Loading...', 300, 280);

    // Progress bar
    const barWidth = 400;
    const barHeight = 30;
    const barX = (this.canvas.width - barWidth) / 2;
    const barY = 320;

    // Border
    ctx.strokeStyle = CONSTANTS.COLORS.WHITE;
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Fill
    ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
    ctx.fillRect(barX + 2, barY + 2, (barWidth - 4) * this.loadingProgress, barHeight - 4);

    ctx.font = '16px monospace';
    const percent = Math.floor(this.loadingProgress * 100);
    ctx.fillStyle = CONSTANTS.COLORS.WHITE;
    ctx.fillText(`${percent}%`, 360, 370);
};

Game.prototype.renderTitle = function(ctx) {
    ctx.fillStyle = CONSTANTS.COLORS.WHITE;
    ctx.font = '32px monospace';
    ctx.fillText('TRAIN BATTLE RPG', 150, 200);
    ctx.font = '16px monospace';
    ctx.fillText('Press ENTER to start', 250, 300);
};

Game.prototype.renderDebugMenu = function(ctx) {
    ctx.fillStyle = CONSTANTS.COLORS.WHITE;
    ctx.font = '28px monospace';
    ctx.fillText('DEBUG MENU', 260, 80);

    ctx.font = '14px monospace';
    ctx.fillStyle = CONSTANTS.COLORS.UI_TEXT;
    ctx.fillText('Press ` or F1 from title screen to open', 180, 110);
    ctx.fillText('Arrow Keys: Navigate | Enter: Select | ESC/B: Close', 130, 130);

    const startY = 180;
    const lineHeight = 40;

    this.debugMenuOptions.forEach((option, index) => {
        const y = startY + (index * lineHeight);
        const isSelected = index === this.debugMenuSelection;

        // Selection indicator
        if (isSelected) {
            ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
            ctx.fillRect(100, y - 25, 560, 35);
        }

        // Option text
        ctx.fillStyle = isSelected ? CONSTANTS.COLORS.BLACK : CONSTANTS.COLORS.WHITE;
        ctx.font = isSelected ? 'bold 18px monospace' : '18px monospace';
        ctx.fillText(option.label, 120, y);
    });
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
        // Draw professor sprite if available
        const professorSprite = this.images['professor-cypress-1'];
        if (professorSprite && professorSprite.complete && dialogue.speaker === 'Professor Cypress') {
            ctx.drawImage(professorSprite, 50, 200, 128, 128);
        }

        ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        ctx.font = '20px monospace';
        ctx.fillText(dialogue.speaker, 200, 250);
        ctx.font = '16px monospace';
        this.wrapText(ctx, dialogue.text, 200, 280, 550, 25);
        ctx.fillText('Press ENTER to continue', 250, 600);
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

    const tileSize = CONSTANTS.TILE_SIZE * CONSTANTS.SCALE;
    const canvas = ctx.canvas;

    // Camera system - center on player
    const cameraX = Math.floor((this.player.x * tileSize) - (canvas.width / 2) + (tileSize / 2));
    const cameraY = Math.floor((this.player.y * tileSize) - (canvas.height / 2) + (tileSize / 2));

    // Clamp camera to map bounds
    const mapPixelWidth = this.currentMap.width * tileSize;
    const mapPixelHeight = this.currentMap.height * tileSize;
    const clampedCameraX = Math.max(0, Math.min(cameraX, mapPixelWidth - canvas.width));
    const clampedCameraY = Math.max(0, Math.min(cameraY, mapPixelHeight - canvas.height));

    // Calculate visible tile range
    const startTileX = Math.floor(clampedCameraX / tileSize);
    const startTileY = Math.floor(clampedCameraY / tileSize);
    const endTileX = Math.min(this.currentMap.width, Math.ceil((clampedCameraX + canvas.width) / tileSize));
    const endTileY = Math.min(this.currentMap.height, Math.ceil((clampedCameraY + canvas.height) / tileSize));

    // Draw visible map tiles
    if (this.currentMap.tilesetRef) {
        for (let y = startTileY; y < endTileY; y++) {
            for (let x = startTileX; x < endTileX; x++) {
                const tileIndex = this.currentMap.getTile(x, y);
                const dx = (x * tileSize) - clampedCameraX;
                const dy = (y * tileSize) - clampedCameraY;
                drawTile(this.ctx, this.currentMap.tilesetRef, tileIndex, dx, dy, tileSize);
            }
        }
    } else {
                    // Fallback to colored rectangles if no tileset is loaded
                for (let y = startTileY; y < endTileY; y++) {
                    for (let x = startTileX; x < endTileX; x++) {
                        const tile = this.currentMap.getTile(x, y);
                        const color = this.getTileColor(tile);
                        const screenX = (x * tileSize) - clampedCameraX;
                        const screenY = (y * tileSize) - clampedCameraY;
                        
                        this.ctx.fillStyle = color;
                        this.ctx.fillRect(
                            screenX,
                            screenY,
                            tileSize,
                            tileSize
                        );
        
                        // Draw grid outline
                        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                        this.ctx.strokeRect(screenX, screenY, tileSize, tileSize);
                    }
                }
            }
    // Draw NPCs
    if (this.currentMap.npcs && this.currentMap.npcs.length > 0) {
        for (const npc of this.currentMap.npcs) {
            const npcScreenX = (npc.x * tileSize) - clampedCameraX;
            const npcScreenY = (npc.y * tileSize) - clampedCameraY;

            // Only draw if in visible range
            if (npcScreenX >= -tileSize && npcScreenX < canvas.width &&
                npcScreenY >= -tileSize && npcScreenY < canvas.height) {

                // Color based on type and defeated status
                if (npc.defeated) {
                    ctx.fillStyle = '#888888'; // Gray for defeated trainers
                } else if (npc.type === 'gym_leader') {
                    ctx.fillStyle = '#FFD700'; // Gold for gym leaders
                } else if (npc.type === 'trainer') {
                    ctx.fillStyle = '#FF6600'; // Orange for trainers
                } else {
                    ctx.fillStyle = '#FFFF00'; // Yellow for NPCs
                }

                ctx.fillRect(npcScreenX, npcScreenY, tileSize, tileSize);
            }
        }
    }

    // Draw player (centered on screen or clamped to map edges)
    const playerScreenX = (this.player.x * tileSize) - clampedCameraX;
    const playerScreenY = (this.player.y * tileSize) - clampedCameraY;

    // TODO: Load proper player sprite from assets/sprites/player/
    // For now, draw a Pokemon-style trainer representation
    this.drawPlayer(ctx, playerScreenX, playerScreenY, tileSize, this.player.direction);

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

// Draw player character (interim solution until proper sprite is generated)
Game.prototype.drawPlayer = function(ctx, x, y, size, direction) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const radius = size * 0.35;

    // Body (Pokemon trainer style - simple circle/oval)
    ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT; // Blue shirt
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + size * 0.1, radius * 0.9, radius * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = CONSTANTS.COLORS.LIGHT; // Skin tone
    ctx.beginPath();
    ctx.arc(centerX, centerY - size * 0.15, radius * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Hat (Pokemon trainer style)
    ctx.fillStyle = CONSTANTS.COLORS.HP_RED;
    ctx.beginPath();
    ctx.arc(centerX, centerY - size * 0.15, radius * 0.65, Math.PI, Math.PI * 2);
    ctx.fill();

    // Direction indicator (simple arrow/facing)
    ctx.fillStyle = CONSTANTS.COLORS.BLACK;
    ctx.beginPath();
    switch (direction) {
        case CONSTANTS.DIRECTIONS.UP:
            ctx.moveTo(centerX, centerY - size * 0.35);
            ctx.lineTo(centerX - size * 0.1, centerY - size * 0.2);
            ctx.lineTo(centerX + size * 0.1, centerY - size * 0.2);
            break;
        case CONSTANTS.DIRECTIONS.DOWN:
            ctx.moveTo(centerX, centerY + size * 0.4);
            ctx.lineTo(centerX - size * 0.1, centerY + size * 0.25);
            ctx.lineTo(centerX + size * 0.1, centerY + size * 0.25);
            break;
        case CONSTANTS.DIRECTIONS.LEFT:
            ctx.moveTo(centerX - size * 0.35, centerY);
            ctx.lineTo(centerX - size * 0.2, centerY - size * 0.1);
            ctx.lineTo(centerX - size * 0.2, centerY + size * 0.1);
            break;
        case CONSTANTS.DIRECTIONS.RIGHT:
            ctx.moveTo(centerX + size * 0.35, centerY);
            ctx.lineTo(centerX + size * 0.2, centerY - size * 0.1);
            ctx.lineTo(centerX + size * 0.2, centerY + size * 0.1);
            break;
    }
    ctx.fill();
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
// TEMP FILE: Menu methods to add to game.js before final line
// Add these methods before the final closing of game.js

Game.prototype.updateMenu = function() {
    // SHOP mode - browse and purchase items (only if shop is actually open, not just highlighted)
    if (this.menuOptions[this.menuSelection] === 'SHOP' && this.shopMode === 'active') {
        // Navigate shop items
        if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
            this.shopSelection = Math.max(0, this.shopSelection - 1);
        } else if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
            this.shopSelection = Math.min(this.shopItems.length - 1, this.shopSelection + 1);
        }

        // Purchase item
        if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            const item = this.shopItems[this.shopSelection];
            if (this.player.money >= item.price) {
                this.player.money -= item.price;
                this.player.items[item.name] = (this.player.items[item.name] || 0) + 1;
                console.log(`Bought ${item.displayName} for $${item.price}! Money: $${this.player.money}`);
            } else {
                console.log(`Not enough money! Need $${item.price}, have $${this.player.money}`);
            }
        }

        // Exit shop
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b') || this.input.isKeyJustPressed('Escape')) {
            this.menuSelection = 0;
            this.shopMode = null;  // Clear shop mode to return to main menu
            return;
        }

        return; // Don't process main menu navigation while in shop
    }

    // BAG mode with item usage
    if (this.menuOptions[this.menuSelection] === 'BAG' && this.bagMode === 'use_on_train') {
        // Navigate trains
        if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
            this.trainSelection = Math.max(0, this.trainSelection - 1);
        } else if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
            this.trainSelection = Math.min(this.player.party.length - 1, this.trainSelection + 1);
        }

        // Select train to use item on
        if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
            const train = this.player.party[this.trainSelection];
            const itemName = this.selectedItem;

            if (itemName === 'potion' && train.currentHP < train.stats.hp) {
                train.heal(20);
                this.player.items.potion = Math.max(0, this.player.items.potion - 1);
                this.bagMode = 'list';
                this.selectedItem = null;
                console.log(`Used Potion on ${train.name}`);
            } else if (itemName === 'super_potion' && train.currentHP < train.stats.hp) {
                train.heal(50);
                this.player.items.super_potion = Math.max(0, this.player.items.super_potion - 1);
                this.bagMode = 'list';
                this.selectedItem = null;
                console.log(`Used Super Potion on ${train.name}`);
            }
        }

        // Cancel
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b') || this.input.isKeyJustPressed('Escape')) {
            this.bagMode = 'list';
            this.selectedItem = null;
        }
        return;
    }

    // BAG mode - list items (only if bag is actually open, not just highlighted)
    if (this.menuOptions[this.menuSelection] === 'BAG' && this.bagMode === 'list') {
        const items = Object.keys(this.player.items).filter(item => this.player.items[item] > 0);

        if (items.length > 0) {
            if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
                this.bagSelection = Math.max(0, this.bagSelection - 1);
            } else if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
                this.bagSelection = Math.min(items.length - 1, this.bagSelection + 1);
            }

            // Use item
            if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
                const selectedItem = items[this.bagSelection];

                if (selectedItem === 'boxcar') {
                    console.log("Can't use Boxcars here!");
                } else if (selectedItem === 'potion' || selectedItem === 'super_potion') {
                    this.selectedItem = selectedItem;
                    this.bagMode = 'use_on_train';
                    this.trainSelection = 0;
                }
            }
        }

        // Back to main menu
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b') || this.input.isKeyJustPressed('Escape')) {
            this.menuSelection = 0;
            this.bagMode = null;  // Clear bag mode to return to main menu
        }
        return;
    }

    // TRAINS mode - view party
    if (this.menuOptions[this.menuSelection] === 'TRAINS' && this.bagMode === 'trains') {
        // Navigate trains
        if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
            this.trainSelection = Math.max(0, this.trainSelection - 1);
        } else if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
            this.trainSelection = Math.min(this.player.party.length - 1, this.trainSelection + 1);
        }

        // Back to main menu
        if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b') || this.input.isKeyJustPressed('Escape')) {
            this.menuSelection = 0;
            this.bagMode = null;  // Clear trains mode to return to main menu
        }
        return;
    }

    // Main menu navigation with wrapping
    if (this.input.isKeyJustPressed('ArrowUp') || this.input.isVirtualKeyJustPressed('up')) {
        this.menuSelection = (this.menuSelection - 1 + this.menuOptions.length) % this.menuOptions.length;
    } else if (this.input.isKeyJustPressed('ArrowDown') || this.input.isVirtualKeyJustPressed('down')) {
        this.menuSelection = (this.menuSelection + 1) % this.menuOptions.length;
    }

    // Select menu option
    if (this.input.isKeyJustPressed('Enter') || this.input.isKeyJustPressed('z') || this.input.isVirtualKeyJustPressed('a')) {
        const option = this.menuOptions[this.menuSelection];

        if (option === 'TRAINS') {
            this.trainSelection = 0;
            this.bagMode = 'trains'; // Reuse bagMode for trains view
        } else if (option === 'BAG') {
            this.bagSelection = 0;
            this.bagMode = 'list';
        } else if (option === 'SHOP') {
            this.shopSelection = 0;
            this.shopMode = 'active';
        } else if (option === 'HEAL') {
            this.player.healAllTrains();
            console.log('All trains healed to full HP!');
            // Brief visual feedback then return to overworld
            setTimeout(() => {
                this.state = CONSTANTS.STATES.OVERWORLD;
                console.log('→ OVERWORLD');
            }, 1000);
        } else if (option === 'SAVE') {
            this.save();
            console.log('Game saved!');
        } else if (option === 'CLOSE') {
            this.state = CONSTANTS.STATES.OVERWORLD;
            console.log('→ OVERWORLD');
        }
    }

    // Close menu with B/X
    if (this.input.isKeyJustPressed('Backspace') || this.input.isKeyJustPressed('x') || this.input.isVirtualKeyJustPressed('b') || this.input.isKeyJustPressed('Escape')) {
        this.state = CONSTANTS.STATES.OVERWORLD;
        console.log('→ OVERWORLD');
    }
};

Game.prototype.renderMenu = function() {
    // Render overworld behind menu
    this.renderOverworld(this.ctx);

    // Draw semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Only show submenus when they're actually open (shopMode/bagMode set), not just highlighted
    if (this.menuOptions[this.menuSelection] === 'SHOP' && this.shopMode === 'active') {
        UI.drawShop(this.ctx, this.shopItems, this.shopSelection, this.player);
    } else if (this.menuOptions[this.menuSelection] === 'TRAINS' && this.bagMode === 'trains') {
        UI.drawTrainParty(this.ctx, this.player, this.trainSelection);
    } else if (this.menuOptions[this.menuSelection] === 'BAG' && this.bagMode) {
        if (this.bagMode === 'use_on_train') {
            UI.drawBagUseOnTrain(this.ctx, this.player, this.trainSelection, this.selectedItem);
        } else {
            UI.drawBag(this.ctx, this.player, this.bagSelection);
        }
    } else {
        UI.drawPauseMenu(this.ctx, this.menuOptions, this.menuSelection, this.player);
    }
};
