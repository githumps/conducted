/**
 * Player class - manages player state and party
 */

class Player {
    constructor() {
        this.name = "Red";
        this.x = CONSTANTS.PLAYER_START.x;
        this.y = CONSTANTS.PLAYER_START.y;
        this.direction = CONSTANTS.DIRECTIONS.DOWN;
        this.currentMap = CONSTANTS.PLAYER_START.map;

        // Party
        this.party = [
            new Train(1, 5),  // Starter train
        ];

        // Inventory
        this.items = {
            potion: 3,
            super_potion: 1,
            pokeball: 5
        };

        this.money = 3000;
        this.badges = 0;

        // Animation
        this.isMoving = false;
        this.moveProgress = 0;
        this.targetX = this.x;
        this.targetY = this.y;
    }

    move(direction) {
        if (this.isMoving) return false;

        this.direction = direction;

        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case CONSTANTS.DIRECTIONS.UP:
                newY--;
                break;
            case CONSTANTS.DIRECTIONS.DOWN:
                newY++;
                break;
            case CONSTANTS.DIRECTIONS.LEFT:
                newX--;
                break;
            case CONSTANTS.DIRECTIONS.RIGHT:
                newX++;
                break;
        }

        // Check collision (simplified - would check map data in full game)
        if (newX >= 0 && newX < 20 && newY >= 0 && newY < 18) {
            this.targetX = newX;
            this.targetY = newY;
            this.isMoving = true;
            this.moveProgress = 0;
            return true;
        }

        return false;
    }

    update(deltaTime) {
        if (this.isMoving) {
            this.moveProgress += deltaTime * 4; // Move speed

            if (this.moveProgress >= 1.0) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.isMoving = false;
                this.moveProgress = 0;
            }
        }
    }

    getDisplayPosition() {
        if (this.isMoving) {
            const currentX = Utils.lerp(this.x, this.targetX, this.moveProgress);
            const currentY = Utils.lerp(this.y, this.targetY, this.moveProgress);
            return { x: currentX, y: currentY };
        }
        return { x: this.x, y: this.y };
    }

    hasAliveTrain() {
        return this.party.some(train => !train.fainted);
    }

    healParty() {
        for (const train of this.party) {
            train.heal(train.maxHP);
        }
    }

    addTrain(train) {
        if (this.party.length < CONSTANTS.MAX_PARTY_SIZE) {
            this.party.push(train);
            return true;
        }
        return false;
    }

    toJSON() {
        return {
            name: this.name,
            x: this.x,
            y: this.y,
            direction: this.direction,
            currentMap: this.currentMap,
            party: this.party.map(t => t.toJSON()),
            items: this.items,
            money: this.money,
            badges: this.badges
        };
    }

    static fromJSON(data) {
        const player = new Player();
        player.name = data.name;
        player.x = data.x;
        player.y = data.y;
        player.direction = data.direction;
        player.currentMap = data.currentMap;
        player.party = data.party.map(t => Train.fromJSON(t));
        player.items = data.items;
        player.money = data.money;
        player.badges = data.badges;
        return player;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Player;
}
