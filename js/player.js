/**
 * Player class - manages player state and party
 */

class Player {
    constructor() {
        this.name = "Alex";
        this.x = 10;  // Start in center of Piston Town (map is 20x15, so center is ~10,7)
        this.y = 7;
        this.direction = CONSTANTS.DIRECTIONS.DOWN;
        this.currentMap = 'piston_town';

        // Party - empty until starter selection
        this.party = [];

        // Inventory - empty until starter selection
        this.items = {
            potion: 0,
            super_potion: 0,
            boxcar: 0,  // Will receive 5 Boxcars after starter selection
            train_ticket: 1
        };

        this.money = 3000;
        this.badges = [];  // Array of badge names
        this.badgeCount = 0;

        // Story flags
        this.hasStarterTrain = false;
        this.metProfessor = false;
        this.defeatedGymLeaders = [];

        // Animation
        this.isMoving = false;
        this.moveProgress = 0;
        this.targetX = this.x;
        this.targetY = this.y;
    }

    move(direction, map = null) {
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

        // Check collision with map if provided
        if (map) {
            if (map.isWalkable(newX, newY)) {
                this.targetX = newX;
                this.targetY = newY;
                this.isMoving = true;
                this.moveProgress = 0;
                return true;
            }
        } else {
            // Fallback for compatibility
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
            // Smoother movement: 2.5 instead of 4 (was too fast/jumpy)
            this.moveProgress += deltaTime * 2.5;

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

    addItem(item, quantity) {
        if (this.items[item]) {
            this.items[item] += quantity;
        } else {
            this.items[item] = quantity;
        }
    }

    addMoney(amount) {
        this.money = Math.max(0, this.money + amount);
    }

    earnBadge(badgeName) {
        if (!this.badges.includes(badgeName)) {
            this.badges.push(badgeName);
            this.badgeCount = this.badges.length;
            return true;
        }
        return false;
    }

    hasBadge(badgeName) {
        return this.badges.includes(badgeName);
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
            badges: this.badges,
            badgeCount: this.badgeCount,
            hasStarterTrain: this.hasStarterTrain,
            metProfessor: this.metProfessor,
            defeatedGymLeaders: this.defeatedGymLeaders
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
        player.badges = data.badges || [];
        player.badgeCount = data.badgeCount || 0;
        player.hasStarterTrain = data.hasStarterTrain || false;
        player.metProfessor = data.metProfessor || false;
        player.defeatedGymLeaders = data.defeatedGymLeaders || [];
        return player;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Player;
}
