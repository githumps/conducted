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
        }

        if (this.animationQueue.length === 0) {
            this.checkBattleEnd();
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

        this.animationQueue.push({
            callback: () => {
                if (!result.hit) {
                    this.addMessage("Attack missed!");
                } else {
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

        this.animationQueue.push({
            callback: () => {
                if (!result.hit) {
                    this.addMessage("Attack missed!");
                } else {
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
        if (this.playerInventory.pokeball > 0) {
            items.push({ name: 'pokeball', displayName: 'Trainball', quantity: this.playerInventory.pokeball });
        }

        return items;
    }

    useItem(item) {
        if (item.name === 'potion' || item.name === 'super_potion') {
            this.usePotion(item.name);
        } else if (item.name === 'pokeball') {
            this.useTrainball();
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

    useTrainball() {
        // Can't catch trainer's trains
        if (!this.isWild) {
            this.addMessage("Can't catch a trainer's train!");
            this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
            this.currentMessage = 0;
            return;
        }

        this.state = CONSTANTS.BATTLE_STATES.ANIMATION;
        this.addMessage("You threw a Trainball!");

        this.playerInventory.pokeball--;

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

        // Background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Enemy train info (top)
        if (this.enemyActive) {
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 20px monospace';
            ctx.fillText(this.enemyActive.nickname || this.enemyActive.species.name, 50, 50);
            ctx.font = '16px monospace';
            ctx.fillText(`Lv${this.enemyActive.level}`, 50, 75);

            // Enemy HP bar
            const enemyHPPercent = this.enemyActive.currentHP / this.enemyActive.maxHP;
            ctx.fillStyle = '#CCCCCC';
            ctx.fillRect(50, 90, 200, 20);
            ctx.fillStyle = enemyHPPercent > 0.5 ? '#00FF00' : enemyHPPercent > 0.2 ? '#FFFF00' : '#FF0000';
            ctx.fillRect(50, 90, 200 * enemyHPPercent, 20);
            ctx.strokeStyle = '#000000';
            ctx.strokeRect(50, 90, 200, 20);
        }

        // Player train info (bottom)
        if (this.playerActive) {
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 20px monospace';
            ctx.fillText(this.playerActive.nickname || this.playerActive.species.name, 450, 400);
            ctx.font = '16px monospace';
            ctx.fillText(`Lv${this.playerActive.level}`, 450, 425);

            // Player HP bar
            const playerHPPercent = this.playerActive.currentHP / this.playerActive.maxHP;
            ctx.fillStyle = '#CCCCCC';
            ctx.fillRect(450, 440, 200, 20);
            ctx.fillStyle = playerHPPercent > 0.5 ? '#00FF00' : playerHPPercent > 0.2 ? '#FFFF00' : '#FF0000';
            ctx.fillRect(450, 440, 200 * playerHPPercent, 20);
            ctx.strokeStyle = '#000000';
            ctx.strokeRect(450, 440, 200, 20);

            // HP numbers
            ctx.fillStyle = '#000000';
            ctx.font = '14px monospace';
            ctx.fillText(`${this.playerActive.currentHP}/${this.playerActive.maxHP}`, 455, 456);
        }

        // Message box (bottom)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(20, 500, canvas.width - 40, 140);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 500, canvas.width - 40, 140);

        // Display current message
        ctx.fillStyle = '#000000';
        ctx.font = '18px monospace';
        if (this.messages.length > 0 && this.currentMessage < this.messages.length) {
            const message = this.messages[this.currentMessage];
            this.wrapText(ctx, message, 40, 530, canvas.width - 80, 25);
        }

        // Battle menu
        if (this.state === CONSTANTS.BATTLE_STATES.MENU) {
            const menuOptions = ['FIGHT', 'TRAIN', 'ITEM', 'RUN'];
            const menuX = 450;
            const menuY = 500;

            menuOptions.forEach((option, index) => {
                const x = menuX + (index % 2) * 140;
                const y = menuY + Math.floor(index / 2) * 40;

                ctx.fillStyle = index === this.menuSelection ? '#FFD700' : '#FFFFFF';
                ctx.fillRect(x, y, 130, 35);
                ctx.strokeStyle = '#000000';
                ctx.strokeRect(x, y, 130, 35);

                ctx.fillStyle = '#000000';
                ctx.font = 'bold 16px monospace';
                ctx.fillText(option, x + 10, y + 23);
            });
        }

        // Move selection menu
        if (this.state === CONSTANTS.BATTLE_STATES.FIGHT) {
            const moves = this.playerActive.moves;
            const menuX = 450;
            const menuY = 500;

            moves.forEach((move, index) => {
                if (move) {
                    const x = menuX + (index % 2) * 140;
                    const y = menuY + Math.floor(index / 2) * 40;

                    ctx.fillStyle = index === this.moveSelection ? '#FFD700' : '#FFFFFF';
                    ctx.fillRect(x, y, 130, 35);
                    ctx.strokeStyle = '#000000';
                    ctx.strokeRect(x, y, 130, 35);

                    ctx.fillStyle = '#000000';
                    ctx.font = 'bold 14px monospace';
                    const moveName = typeof move === 'string' ? move : move.name;
                    ctx.fillText(moveName, x + 5, y + 23);
                }
            });
        }
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
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Battle;
}
