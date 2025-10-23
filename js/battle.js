/**
 * Battle System - Turn-based Pokemon-style battles
 */

class Battle {
    constructor(playerTrains, enemyTrains, isWild = true) {
        this.playerTrains = playerTrains;
        this.enemyTrains = enemyTrains;
        this.isWild = isWild;

        this.playerActive = playerTrains[0];
        this.enemyActive = enemyTrains[0];

        this.state = CONSTANTS.BATTLE_STATES.INTRO;
        this.messages = [];
        this.currentMessage = 0;
        this.menuSelection = 0;
        this.moveSelection = 0;

        this.battleEnded = false;
        this.playerWon = false;

        this.animationQueue = [];
        this.animationTimer = 0;

        // Intro message
        if (this.isWild) {
            this.addMessage(`A wild ${this.enemyActive.species.name} appeared!`);
            this.addMessage(`Go! ${this.playerActive.species.name}!`);
        } else {
            this.addMessage(`Conductor sent out ${this.enemyActive.species.name}!`);
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
                    // BAG - not implemented
                    this.addMessage("No items available!");
                    this.state = CONSTANTS.BATTLE_STATES.MESSAGE;
                    this.currentMessage = 0;
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
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Battle;
}
