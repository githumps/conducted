/**
 * Train class - represents a single train creature
 */

class Train {
    constructor(speciesId, level = 5, moves = null) {
        this.speciesId = speciesId;
        this.species = TRAIN_SPECIES[speciesId];
        this.nickname = this.species.name;
        this.level = level;
        this.exp = this.calculateExpForLevel(level);

        // Base stats
        this.baseHP = this.species.baseStats.hp;
        this.baseAttack = this.species.baseStats.attack;
        this.baseDefense = this.species.baseStats.defense;
        this.baseSpeed = this.species.baseStats.speed;
        this.baseSpecial = this.species.baseStats.special;

        // Individual Values (IVs) - like Pokemon
        this.ivHP = Utils.randomInt(0, 15);
        this.ivAttack = Utils.randomInt(0, 15);
        this.ivDefense = Utils.randomInt(0, 15);
        this.ivSpeed = Utils.randomInt(0, 15);
        this.ivSpecial = Utils.randomInt(0, 15);

        // Calculate actual stats
        this.maxHP = this.calculateStat('hp');
        this.currentHP = this.maxHP;
        this.attack = this.calculateStat('attack');
        this.defense = this.calculateStat('defense');
        this.speed = this.calculateStat('speed');
        this.special = this.calculateStat('special');

        // Moves
        this.moves = moves || this.getStartingMoves();

        // Status
        this.status = null;
        this.fainted = false;

        // Types
        this.types = this.species.types;
    }

    calculateStat(statName) {
        let base, iv;

        if (statName === 'hp') {
            base = this.baseHP;
            iv = this.ivHP;
            return Math.floor(((base + iv) * 2 * this.level) / 100) + this.level + 10;
        } else {
            if (statName === 'attack') {
                base = this.baseAttack;
                iv = this.ivAttack;
            } else if (statName === 'defense') {
                base = this.baseDefense;
                iv = this.ivDefense;
            } else if (statName === 'speed') {
                base = this.baseSpeed;
                iv = this.ivSpeed;
            } else {
                base = this.baseSpecial;
                iv = this.ivSpecial;
            }

            return Math.floor(((base + iv) * 2 * this.level) / 100) + 5;
        }
    }

    calculateExpForLevel(level) {
        // Medium Fast growth rate
        return level ** 3;
    }

    gainExp(amount) {
        this.exp += amount;

        while (this.exp >= this.calculateExpForLevel(this.level + 1) && this.level < CONSTANTS.MAX_LEVEL) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;

        // Recalculate stats
        const oldMaxHP = this.maxHP;
        this.maxHP = this.calculateStat('hp');
        this.currentHP += (this.maxHP - oldMaxHP);
        this.attack = this.calculateStat('attack');
        this.defense = this.calculateStat('defense');
        this.speed = this.calculateStat('speed');
        this.special = this.calculateStat('special');

        // Check for new moves
        this.checkForNewMoves();

        return true;
    }

    checkForNewMoves() {
        for (const moveData of this.species.learnset) {
            if (moveData.level === this.level) {
                if (this.moves.length < CONSTANTS.MAX_MOVES) {
                    this.moves.push(moveData.move);
                }
                // In full game, would trigger move learning dialog
            }
        }
    }

    getStartingMoves() {
        const moves = [];
        for (const moveData of this.species.learnset) {
            if (moveData.level <= this.level && moves.length < CONSTANTS.MAX_MOVES) {
                moves.push(moveData.move);
            }
        }
        return moves.length > 0 ? moves : ["Tackle"];
    }

    takeDamage(damage) {
        this.currentHP = Math.max(0, this.currentHP - damage);
        if (this.currentHP === 0) {
            this.fainted = true;
        }
    }

    heal(amount) {
        this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
        if (this.currentHP > 0) {
            this.fainted = false;
        }
    }

    getHPPercentage() {
        return (this.currentHP / this.maxHP) * 100;
    }

    getHPColor() {
        const percentage = this.getHPPercentage();
        if (percentage > 50) return CONSTANTS.COLORS.HP_GREEN;
        if (percentage > 20) return CONSTANTS.COLORS.HP_YELLOW;
        return CONSTANTS.COLORS.HP_RED;
    }

    canEvolve() {
        const evolution = this.species.evolution;
        if (evolution) {
            if (evolution.method === 'level' && this.level >= evolution.level) {
                return true;
            }
        }
        return false;
    }

    evolve() {
        const evolution = this.species.evolution;
        if (evolution && this.canEvolve()) {
            this.speciesId = evolution.evolvesTo;
            this.species = TRAIN_SPECIES[this.speciesId];
            this.nickname = this.species.name;
            this.types = this.species.types;

            // Update base stats
            this.baseHP = this.species.baseStats.hp;
            this.baseAttack = this.species.baseStats.attack;
            this.baseDefense = this.species.baseStats.defense;
            this.baseSpeed = this.species.baseStats.speed;
            this.baseSpecial = this.species.baseStats.special;

            // Recalculate stats
            const oldMaxHP = this.maxHP;
            this.maxHP = this.calculateStat('hp');
            this.currentHP += (this.maxHP - oldMaxHP);
            this.attack = this.calculateStat('attack');
            this.defense = this.calculateStat('defense');
            this.speed = this.calculateStat('speed');
            this.special = this.calculateStat('special');

            return true;
        }
        return false;
    }

    toJSON() {
        return {
            speciesId: this.speciesId,
            nickname: this.nickname,
            level: this.level,
            exp: this.exp,
            currentHP: this.currentHP,
            moves: this.moves,
            ivHP: this.ivHP,
            ivAttack: this.ivAttack,
            ivDefense: this.ivDefense,
            ivSpeed: this.ivSpeed,
            ivSpecial: this.ivSpecial,
            status: this.status,
            fainted: this.fainted
        };
    }

    static fromJSON(data) {
        const train = new Train(data.speciesId, data.level, data.moves);
        train.nickname = data.nickname;
        train.exp = data.exp;
        train.currentHP = data.currentHP;
        train.ivHP = data.ivHP;
        train.ivAttack = data.ivAttack;
        train.ivDefense = data.ivDefense;
        train.ivSpeed = data.ivSpeed;
        train.ivSpecial = data.ivSpecial;
        train.status = data.status;
        train.fainted = data.fainted;

        // Recalculate stats
        train.maxHP = train.calculateStat('hp');
        train.attack = train.calculateStat('attack');
        train.defense = train.calculateStat('defense');
        train.speed = train.calculateStat('speed');
        train.special = train.calculateStat('special');

        return train;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Train;
}
