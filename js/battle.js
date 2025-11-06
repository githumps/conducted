/**
 * Battle System - Turn-based Pokemon-style battles
 */

class Battle {
    constructor(playerTrains, enemyTrains, isWild = true, trainerNPC = null) {
        this.playerTrains = playerTrains;
        this.enemyTrains = enemyTrains;
        this.isWild = isWild;
        this.trainerNPC = trainerNPC;

        // If trainerNPC is actually playerInventory (backwards compatibility)
        if (trainerNPC && !trainerNPC.name && typeof trainerNPC === 'object') {
            this.playerInventory = trainerNPC;
            this.trainerNPC = null;
        } else {
            this.playerInventory = null;
        }

        this.playerActive = playerTrains[0];
        this.enemyActive = enemyTrains[0];

        this.state = CONSTANTS.BATTLE_STATES.INTRO;
        this.messages = [];
        this.currentMessage = 0;
        this.menuSelection = 0;
        this.moveSelection = 0;
        this.itemSelection = 0;

        this.battleEnded = false;
        this.playerWon = false;
        this.onVictory = null;
        this.caughtTrain = null;

        this.animationQueue = [];
        this.animationTimer = 0;

        // Visual animation state
        this.playerShake = 0;
        this.enemyShake = 0;
        this.enemyFlash = 0;
        this.playerFlash = 0;

        // Intro message
        if (this.isWild) {
            this.addMessage(`A wild ${this.enemyActive.species.name} appeared!`);
            this.addMessage(`Go! ${this.playerActive.species.name}!`);
        } else {
            const trainerName = this.trainerNPC ? this.trainerNPC.name : 'Conductor';
            this.addMessage(`${trainerName} wants to battle!`);
            this.addMessage(`${trainerName} sent out ${this.enemyActive.species.name}!`);
            this.addMessage(`Go! ${this.playerActive.species.name}!`);
        }
    }

    addMessage(text) {
        this.messages.push(text);
    }

    update(deltaTime) {
        this.animationTimer += deltaTime;

        // Decay animation effects
        if (this.playerShake > 0) this.playerShake -= deltaTime * 10;
        if (this.enemyShake > 0) this.enemyShake -= deltaTime * 10;
        if (this.playerFlash > 0) this.playerFlash -= deltaTime * 3;
        if (this.enemyFlash > 0) this.enemyFlash -= deltaTime * 3;

        // Handle state-based updates
        switch (this.state) {
            case CONSTANTS.BATTLE_STATES.INTRO:
                // Wait for intro messages
                break;

            case CONSTANTS.BATTLE_STATES.MENU:
                // Player selecting action
                break;

            case CONSTANTS.BATTLE_STATES.FIGHT:
                // Player selecting move
                break;

            case CONSTANTS.BATTLE_STATES.ANIMATION:
                // Playing battle animation
                this.updateAnimation(deltaTime);
                break;

            case CONSTANTS.BATTLE_STATES.MESSAGE:
                // Showing message
                break;

            case CONSTANTS.BATTLE_STATES.VICTORY:
            case CONSTANTS.BATTLE_STATES.DEFEAT:
                this.battleEnded = true;
                break;
        }
    }

    updateAnimation(deltaTime) {
        if (this.animationQueue.length > 0 && this.animationTimer > 0.5) {
            const anim = this.animationQueue.shift();
            anim.callback();
            this.animationTimer = 0;

            // After executing the last animation, check if battle should end
            if (this.animationQueue.length === 0) {
                this.checkBattleEnd();
            }
        }
    }

    handleInput(action) {
        switch (this.state) {
            case CONSTANTS.BATTLE_STATES.INTRO:
                this.currentMessage++;
                if (this.currentMessage >= this.messages.length) {
                    this.state = CONSTANTS.BATTLE_STATES.MENU;
                    this.messages = [];
                    this.currentMessage = 0;
                }
                break;

            case CONSTANTS.BATTLE_STATES.MENU:
                this.handleMenuInput(action);
                break;

            case CONSTANTS.BATTLE_STATES.FIGHT:
                this.handleFightInput(action);
                break;

            case CONSTANTS.BATTLE_STATES.ITEM:
                this.handleItemInput(action);
                break;

            case CONSTANTS.BATTLE_STATES.MESSAGE:
                this.currentMessage++;
                if (this.currentMessage >= this.messages.length) {
                    this.state = CONSTANTS.BATTLE_STATES.MENU;
                    this.messages = [];
                    this.currentMessage = 0;
                }
                break;
        }
    }

    handleMenuInput(action) {
        if (action === 'up' || action === 'down') {
            this.menuSelection = (this.menuSelection + 2) % 4;
        } else if (action === 'left' || action === 'right') {
            this.menuSelection = this.menuSelection < 2 ? this.menuSelection + 1 : this.menuSelection - 1;
        } else if (action === 'a') {
            switch (this.menuSelection) {
                case 0:
                    this.state = CONSTANTS.BATTLE_STATES.FIGHT;
                    this.moveSelection = 0;
                    break;
                case 1:
                    // ITEM
                    if (this.playerInventory) {
                        this.state = CONSTANTS.BATTLE_STATES.ITEM;
                        this.itemSelection = 0;
                    } else {
                        this.addMessage("No items available!");
                        this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
                        this.currentMessage = 0;
                    }
                    break;
                case 2:
                    // POKEMON - not implemented
                    this.addMessage("No other trains available!");
                    this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
                    this.currentMessage = 0;
                    break;
                case 3:
                    // RUN
                    if (this.isWild) {
                        this.addMessage("Got away safely!");
                        this.battleEnded = true;
                        this.playerWon = false;
                    } else {
                        this.addMessage("Can't run from a trainer battle!");
                        this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
                        this.currentMessage = 0;
                    }
                    break;
            }
        }
    }

    handleFightInput(action) {
        const moves = this.playerActive.moves;

        if (action === 'up' && this.moveSelection >= 2) {
            this.moveSelection -= 2;
        } else if (action === 'down' && this.moveSelection < 2 && this.moveSelection + 2 < moves.length) {
            this.moveSelection += 2;
        } else if (action === 'left' && this.moveSelection % 2 === 1) {
            this.moveSelection--;
        } else if (action === 'right' && this.moveSelection % 2 === 0 && this.moveSelection + 1 < moves.length) {
            this.moveSelection++;
        } else if (action === 'a') {
            this.executePlayerMove(moves[this.moveSelection]);
        } else if (action === 'b') {
            this.state = CONSTANTS.BATTLE_STATES.MENU;
        }
    }

    executePlayerMove(moveName) {
        this.state = CONSTANTS.BATTLE_STATES.ANIMATION;

        // Player attacks first (simplified, should check speed)
        this.addMessage(`${this.playerActive.species.name} used ${moveName}!`);

        const result = calculateDamage(this.playerActive, this.enemyActive, moveName);

        // Trigger attack animation
        const moveData = MOVES_DB[moveName];
        if (moveData?.category === 'physical') {
            this.playerShake = 3; // Physical: attacker shakes forward
        }

        this.animationQueue.push({
            callback: () => {
                if (!result.hit) {
                    this.addMessage("Attack missed!");
                } else {
                    // Show damage flash on defender
                    this.enemyFlash = 1;

                    if (result.critical) {
                        this.addMessage("Critical hit!");
                    }

                    const effectivenessText = getEffectivenessText(result.effectiveness);
                    if (effectivenessText) {
                        this.addMessage(effectivenessText);
                    }

                    this.enemyActive.takeDamage(result.damage);

                    if (this.enemyActive.fainted) {
                        this.addMessage(`Enemy ${this.enemyActive.species.name} fainted!`);
                        this.handleVictory();
                        return;
                    }
                }

                // Enemy turn
                this.executeEnemyMove();
            }
        });
    }

    executeEnemyMove() {
        // Simple AI: pick random move
        const moves = this.enemyActive.moves;
        const moveName = Utils.randomChoice(moves);

        this.addMessage(`Enemy ${this.enemyActive.species.name} used ${moveName}!`);

        const result = calculateDamage(this.enemyActive, this.playerActive, moveName);

        // Trigger attack animation
        const moveData = MOVES_DB[moveName];
        if (moveData?.category === 'physical') {
            this.enemyShake = 3; // Physical: attacker shakes forward
        }

        this.animationQueue.push({
            callback: () => {
                if (!result.hit) {
                    this.addMessage("Attack missed!");
                } else {
                    // Show damage flash on defender
                    this.playerFlash = 1;

                    if (result.critical) {
                        this.addMessage("Critical hit!");
                    }

                    const effectivenessText = getEffectivenessText(result.effectiveness);
                    if (effectivenessText) {
                        this.addMessage(effectivenessText);
                    }

                    this.playerActive.takeDamage(result.damage);

                    if (this.playerActive.fainted) {
                        this.addMessage(`${this.playerActive.species.name} fainted!`);
                        this.handleDefeat();
                        return;
                    }
                }

                // Back to menu
                this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
                this.currentMessage = 0;
            }
        });
    }

    handleVictory() {
        const expGained = Math.floor(this.enemyActive.species.expYield * this.enemyActive.level / 7);
        this.addMessage(`${this.playerActive.species.name} gained ${expGained} EXP!`);

        this.playerActive.gainExp(expGained);

        // Award money for trainer battles
        if (!this.isWild && this.trainerNPC) {
            // Calculate money: baseReward × highestTrainLevel × 2
            const highestLevel = Math.max(...this.trainerNPC.party.map(t => t.level));
            const baseReward = this.trainerNPC.baseReward ||
                              (this.trainerNPC.type === 'gym_leader' ? 100 : 50);
            const moneyEarned = baseReward * highestLevel * 2;

            this.addMessage(`You won $${moneyEarned}!`);

            // Store money to be awarded by onVictory callback
            this.moneyEarned = moneyEarned;
        } else if (this.isWild) {
            // Award smaller money for wild battles
            const moneyEarned = Math.floor(this.enemyActive.level * 10 + Math.random() * 20);
            this.addMessage(`You found $${moneyEarned}!`);
            this.moneyEarned = moneyEarned;
        }

        if (this.onVictory) {
            this.onVictory();
        }

        this.state = CONSTANTS.BATTLE_STATES.VICTORY;
        this.battleEnded = true;
        this.playerWon = true;
    }

    handleDefeat() {
        this.addMessage("You have no more trains!");
        this.addMessage("You blacked out!");
        this.state = CONSTANTS.BATTLE_STATES.DEFEAT;
        this.battleEnded = true;
        this.playerWon = false;
    }

    checkBattleEnd() {
        if (this.playerActive.fainted) {
            // Check for more trains
            const nextTrain = this.playerTrains.find(t => !t.fainted);
            if (nextTrain) {
                this.playerActive = nextTrain;
                this.addMessage(`Go! ${this.playerActive.species.name}!`);
            } else {
                this.handleDefeat();
            }
        }

        if (this.enemyActive.fainted) {
            // Check for more enemy trains
            const nextTrain = this.enemyTrains.find(t => !t.fainted);
            if (nextTrain) {
                this.enemyActive = nextTrain;
                this.addMessage(`Enemy sent out ${this.enemyActive.species.name}!`);
            } else {
                this.handleVictory();
            }
        }
    }

    getCurrentMessage() {
        if (this.messages.length > 0 && this.currentMessage < this.messages.length) {
            return this.messages[this.currentMessage];
        }
        return "";
    }

    handleItemInput(action) {
        const items = this.getUsableItems();

        if (action === 'up' && this.itemSelection > 0) {
            this.itemSelection--;
        } else if (action === 'down' && this.itemSelection < items.length - 1) {
            this.itemSelection++;
        } else if (action === 'a') {
            if (items.length > 0) {
                this.useItem(items[this.itemSelection]);
            }
        } else if (action === 'b') {
            this.state = CONSTANTS.BATTLE_STATES.MENU;
        }
    }

    getUsableItems() {
        if (!this.playerInventory) return [];

        const items = [];
        if (this.playerInventory.potion > 0) {
            items.push({ name: 'potion', displayName: 'Potion', quantity: this.playerInventory.potion });
        }
        if (this.playerInventory.super_potion > 0) {
            items.push({ name: 'super_potion', displayName: 'Super Potion', quantity: this.playerInventory.super_potion });
        }
        if (this.playerInventory.boxcar > 0) {
            items.push({ name: 'boxcar', displayName: 'Boxcar', quantity: this.playerInventory.boxcar });
        }

        return items;
    }

    useItem(item) {
        if (item.name === 'potion' || item.name === 'super_potion') {
            this.usePotion(item.name);
        } else if (item.name === 'boxcar') {
            this.useBoxcar();
        }
    }

    usePotion(potionType) {
        const healAmount = potionType === 'potion' ? 20 : 50;

        // Check if train is at full HP
        if (this.playerActive.currentHP === this.playerActive.maxHP) {
            this.addMessage("HP is already full!");
            this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
            this.currentMessage = 0;
            return;
        }

        // Use the potion
        this.state = CONSTANTS.BATTLE_STATES.ANIMATION;
        const displayName = potionType === 'potion' ? 'Potion' : 'Super Potion';
        this.addMessage(`You used a ${displayName}!`);

        const oldHP = this.playerActive.currentHP;
        this.playerActive.heal(healAmount);
        const actualHealed = this.playerActive.currentHP - oldHP;

        this.playerInventory[potionType]--;

        this.animationQueue.push({
            callback: () => {
                this.addMessage(`${this.playerActive.species.name} recovered ${actualHealed} HP!`);

                // Enemy turn
                this.executeEnemyMove();
            }
        });
    }

    useBoxcar() {
        // Can't catch trainer's trains
        if (!this.isWild) {
            this.addMessage("Can't catch a trainer's train!");
            this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
            this.currentMessage = 0;
            return;
        }

        this.state = CONSTANTS.BATTLE_STATES.ANIMATION;
        this.addMessage("You threw a Boxcar!");

        this.playerInventory.boxcar--;

        // Gen 1 capture formula
        const catchRate = this.enemyActive.species.catchRate || 45;
        const maxHP = this.enemyActive.maxHP;
        const currentHP = this.enemyActive.currentHP;

        // Formula: ((HPmax * 3 - HP * 2) * CatchRate) / (HPmax * 3)
        const a = Math.floor(((maxHP * 3 - currentHP * 2) * catchRate) / (maxHP * 3));

        this.animationQueue.push({
            callback: () => {
                // Simplified shake checks (4 checks like Gen 1)
                let shakes = 0;
                for (let i = 0; i < 4; i++) {
                    const b = Utils.randomInt(0, 255);
                    if (b < a) {
                        shakes++;
                    } else {
                        break;
                    }
                }

                if (shakes === 4) {
                    // Caught!
                    this.addMessage(`Got it! ${this.enemyActive.species.name} was caught!`);
                    this.caughtTrain = this.enemyActive;
                    this.state = CONSTANTS.BATTLE_STATES.VICTORY;
                    this.battleEnded = true;
                    this.playerWon = true;
                } else {
                    // Failed
                    const shakeMessages = [
                        "Oh no! The train broke free!",
                        "Aww! It appeared to be caught!",
                        "Aargh! Almost had it!",
                        "Shoot! It was so close too!"
                    ];
                    this.addMessage(shakeMessages[shakes] || "Oh no! The train broke free!");

                    // Enemy turn
                    this.executeEnemyMove();
                }
            }
        });
    }

    render(ctx) {
        const canvas = ctx.canvas;

        // Pokemon-style solid cream background
        ctx.fillStyle = CONSTANTS.COLORS.UI_BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate animation offsets
        const enemyShakeX = this.enemyShake > 0 ? Math.sin(Date.now() * 0.05) * this.enemyShake * 2 : 0;
        const playerShakeX = this.playerShake > 0 ? Math.sin(Date.now() * 0.05) * this.playerShake * 2 : 0;

        // Pokemon-style sprite positioning
        // Enemy train sprite (upper right, front-facing)
        if (this.enemyActive) {
            // Flash effect when taking damage
            if (this.enemyFlash > 0) {
                ctx.globalAlpha = 0.5 + (this.enemyFlash * 0.5);
                ctx.fillStyle = CONSTANTS.COLORS.HP_RED;
                ctx.fillRect(500 + enemyShakeX - 10, 140 - 10, 100, 100);
                ctx.globalAlpha = 1.0;
            }
            this.drawEnemyTrain(ctx, 500 + enemyShakeX, 140);
        }

        // Player train sprite (lower left, back-facing)
        if (this.playerActive) {
            // Flash effect when taking damage
            if (this.playerFlash > 0) {
                ctx.globalAlpha = 0.5 + (this.playerFlash * 0.5);
                ctx.fillStyle = CONSTANTS.COLORS.HP_RED;
                ctx.fillRect(120 + playerShakeX - 10, 320 - 10, 100, 100);
                ctx.globalAlpha = 1.0;
            }
            this.drawPlayerTrain(ctx, 120 + playerShakeX, 320);
        }

        // Pokemon-style enemy info panel (top-left)
        if (this.enemyActive) {
            // Panel background
            ctx.fillStyle = CONSTANTS.COLORS.WHITE;
            ctx.fillRect(40, 30, 320, 80);
            ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
            ctx.lineWidth = 3;
            ctx.strokeRect(40, 30, 320, 80);

            // Name and level
            ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            ctx.font = '20px monospace';
            ctx.fillText(this.enemyActive.nickname || this.enemyActive.species.name, 55, 58);
            ctx.font = '16px monospace';
            ctx.fillText(`Lv${this.enemyActive.level}`, 290, 58);

            // HP label
            ctx.font = '14px monospace';
            ctx.fillText('HP:', 55, 85);

            // Enemy HP bar (Pokemon Gen 1 style - no numbers shown)
            const enemyHPPercent = this.enemyActive.currentHP / this.enemyActive.maxHP;
            ctx.fillStyle = CONSTANTS.COLORS.HP_BG;
            ctx.fillRect(95, 73, 240, 16);

            // HP bar fill with authentic Pokemon colors
            if (enemyHPPercent > 0.5) {
                ctx.fillStyle = CONSTANTS.COLORS.HP_GREEN;
            } else if (enemyHPPercent > 0.2) {
                ctx.fillStyle = CONSTANTS.COLORS.HP_YELLOW;
            } else {
                ctx.fillStyle = CONSTANTS.COLORS.HP_RED;
            }
            ctx.fillRect(95, 73, 240 * enemyHPPercent, 16);
            ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
            ctx.lineWidth = 2;
            ctx.strokeRect(95, 73, 240, 16);
        }

        // Pokemon-style player info panel (bottom-right)
        if (this.playerActive) {
            // Panel background
            ctx.fillStyle = CONSTANTS.COLORS.WHITE;
            ctx.fillRect(408, 450, 340, 100);
            ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
            ctx.lineWidth = 3;
            ctx.strokeRect(408, 450, 340, 100);

            // Name and level
            ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            ctx.font = '20px monospace';
            ctx.fillText(this.playerActive.nickname || this.playerActive.species.name, 425, 478);
            ctx.font = '16px monospace';
            ctx.fillText(`Lv${this.playerActive.level}`, 680, 478);

            // HP label
            ctx.font = '14px monospace';
            ctx.fillText('HP:', 425, 508);

            // Player HP bar
            const playerHPPercent = this.playerActive.currentHP / this.playerActive.maxHP;
            ctx.fillStyle = CONSTANTS.COLORS.HP_BG;
            ctx.fillRect(465, 496, 260, 16);

            // HP bar fill with authentic Pokemon colors
            if (playerHPPercent > 0.5) {
                ctx.fillStyle = CONSTANTS.COLORS.HP_GREEN;
            } else if (playerHPPercent > 0.2) {
                ctx.fillStyle = CONSTANTS.COLORS.HP_YELLOW;
            } else {
                ctx.fillStyle = CONSTANTS.COLORS.HP_RED;
            }
            ctx.fillRect(465, 496, 260 * playerHPPercent, 16);
            ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
            ctx.lineWidth = 2;
            ctx.strokeRect(465, 496, 260, 16);

            // HP numbers (shown for player's Pokemon in Gen 1)
            ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            ctx.font = '14px monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`${this.playerActive.currentHP}/ ${this.playerActive.maxHP}`, 720, 532);
            ctx.textAlign = 'left'; // Reset alignment
        }

        // Pokemon-style message box (bottom, full width)
        ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        ctx.fillRect(20, 560, canvas.width - 40, 90);
        ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 560, canvas.width - 40, 90);

        // Display current message with Pokemon font
        ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        ctx.font = '18px monospace';
        if (this.messages.length > 0 && this.currentMessage < this.messages.length) {
            const message = this.messages[this.currentMessage];
            this.wrapText(ctx, message, 40, 590, canvas.width - 80, 24);
        }

        // Pokemon-style 2x2 battle menu (overlays right side of message box)
        if (this.state === CONSTANTS.BATTLE_STATES.MENU) {
            const menuOptions = ['FIGHT', 'TRAIN', 'ITEM', 'RUN'];
            const menuX = 420;
            const menuY = 565;
            const buttonWidth = 155;
            const buttonHeight = 38;

            menuOptions.forEach((option, index) => {
                const x = menuX + (index % 2) * (buttonWidth + 5);
                const y = menuY + Math.floor(index / 2) * (buttonHeight + 4);

                // Pokemon-style button styling
                ctx.fillStyle = index === this.menuSelection ? CONSTANTS.COLORS.UI_HIGHLIGHT : CONSTANTS.COLORS.WHITE;
                ctx.fillRect(x, y, buttonWidth, buttonHeight);
                ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
                ctx.lineWidth = 3;
                ctx.strokeRect(x, y, buttonWidth, buttonHeight);

                // Button text
                ctx.fillStyle = index === this.menuSelection ? CONSTANTS.COLORS.WHITE : CONSTANTS.COLORS.BLACK;
                ctx.font = 'bold 16px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(option, x + buttonWidth / 2, y + buttonHeight / 2 + 6);
                ctx.textAlign = 'left'; // Reset alignment
            });
        }

        // Pokemon-style move selection menu (2x2 grid)
        if (this.state === CONSTANTS.BATTLE_STATES.FIGHT) {
            const moves = this.playerActive.moves;
            const menuX = 420;
            const menuY = 565;
            const buttonWidth = 155;
            const buttonHeight = 38;

            moves.forEach((move, index) => {
                if (move) {
                    const x = menuX + (index % 2) * (buttonWidth + 5);
                    const y = menuY + Math.floor(index / 2) * (buttonHeight + 4);

                    // Pokemon-style button styling
                    ctx.fillStyle = index === this.moveSelection ? CONSTANTS.COLORS.UI_HIGHLIGHT : CONSTANTS.COLORS.WHITE;
                    ctx.fillRect(x, y, buttonWidth, buttonHeight);
                    ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
                    ctx.lineWidth = 3;
                    ctx.strokeRect(x, y, buttonWidth, buttonHeight);

                    // Move name text
                    const moveName = typeof move === 'string' ? move : move.name;
                    ctx.fillStyle = index === this.moveSelection ? CONSTANTS.COLORS.WHITE : CONSTANTS.COLORS.BLACK;
                    ctx.font = 'bold 14px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText(moveName, x + buttonWidth / 2, y + buttonHeight / 2 + 5);
                    ctx.textAlign = 'left'; // Reset alignment
                }
            });
        }
    }

    drawEnemyTrain(ctx, x, y) {
        // Red train facing left (front view)
        ctx.fillStyle = '#D32F2F';
        ctx.fillRect(x, y + 20, 80, 40); // Main body
        ctx.fillStyle = '#C62828';
        ctx.fillRect(x + 10, y, 20, 25); // Smoke stack
        ctx.fillStyle = '#424242';
        ctx.beginPath();
        ctx.arc(x + 20, y + 70, 10, 0, Math.PI * 2); // Front wheel
        ctx.arc(x + 60, y + 70, 10, 0, Math.PI * 2); // Back wheel
        ctx.fill();
        ctx.fillStyle = '#FFEB3B';
        ctx.fillRect(x + 5, y + 30, 12, 12); // Window
    }

    drawPlayerTrain(ctx, x, y) {
        // Blue train facing right (back view)
        ctx.fillStyle = '#1976D2';
        ctx.fillRect(x, y + 20, 80, 40); // Main body
        ctx.fillStyle = '#1565C0';
        ctx.fillRect(x + 50, y, 20, 25); // Smoke stack
        ctx.fillStyle = '#424242';
        ctx.beginPath();
        ctx.arc(x + 20, y + 70, 10, 0, Math.PI * 2); // Front wheel
        ctx.arc(x + 60, y + 70, 10, 0, Math.PI * 2); // Back wheel
        ctx.fill();
        ctx.fillStyle = '#FFEB3B';
        ctx.fillRect(x + 63, y + 30, 12, 12); // Window
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
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
    }

    isComplete() {
        return this.battleEnded;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Battle;
}
