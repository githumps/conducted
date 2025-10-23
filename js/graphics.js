/**
 * Graphics and Rendering System
 */

class Graphics {
    constructor(ctx) {
        this.ctx = ctx;
        this.tileSize = CONSTANTS.TILE_SIZE;
        this.scale = CONSTANTS.SCALE;
    }

    clear() {
        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    }

    drawMap(map, offsetX = 0, offsetY = 0) {
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tile = map.getTile(x, y);
                this.drawTile(tile, x, y, offsetX, offsetY);
            }
        }
    }

    drawTile(tileType, x, y, offsetX = 0, offsetY = 0) {
        const screenX = (x + offsetX) * this.tileSize * this.scale;
        const screenY = (y + offsetY) * this.tileSize * this.scale;
        const size = this.tileSize * this.scale;

        // Simple tile colors (in full game, would use sprites)
        let color;
        switch (tileType) {
            case 0:
                color = '#2C3E50'; // Wall
                break;
            case 1:
                color = '#27AE60'; // Grass
                break;
            case 2:
                color = '#BDC3C7'; // Path
                break;
            default:
                color = '#34495E';
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(screenX, screenY, size, size);

        // Add grass pattern
        if (tileType === 1) {
            this.ctx.fillStyle = '#229954';
            const dotSize = 3;
            this.ctx.fillRect(screenX + size / 4, screenY + size / 4, dotSize, dotSize);
            this.ctx.fillRect(screenX + size * 3 / 4, screenY + size / 4, dotSize, dotSize);
            this.ctx.fillRect(screenX + size / 2, screenY + size * 3 / 4, dotSize, dotSize);
        }
    }

    drawPlayer(player) {
        const pos = player.getDisplayPosition();
        const x = pos.x * this.tileSize * this.scale;
        const y = pos.y * this.tileSize * this.scale;
        const size = this.tileSize * this.scale;

        // Draw simple player sprite
        this.ctx.fillStyle = '#E74C3C'; // Red
        this.ctx.fillRect(x + size / 4, y + size / 4, size / 2, size / 2);

        // Draw direction indicator
        this.ctx.fillStyle = '#000000';
        switch (player.direction) {
            case CONSTANTS.DIRECTIONS.UP:
                this.ctx.fillRect(x + size / 2 - 3, y + size / 4 - 6, 6, 6);
                break;
            case CONSTANTS.DIRECTIONS.DOWN:
                this.ctx.fillRect(x + size / 2 - 3, y + size * 3 / 4, 6, 6);
                break;
            case CONSTANTS.DIRECTIONS.LEFT:
                this.ctx.fillRect(x + size / 4 - 6, y + size / 2 - 3, 6, 6);
                break;
            case CONSTANTS.DIRECTIONS.RIGHT:
                this.ctx.fillRect(x + size * 3 / 4, y + size / 2 - 3, 6, 6);
                break;
        }
    }

    drawBattle(battle) {
        // Draw battle background
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT / 2);
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, CONSTANTS.CANVAS_HEIGHT / 2, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT / 2);

        // Draw enemy train platform
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(500, 150, 200, 20);

        // Draw player train platform
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(150, 450, 200, 20);

        // Draw enemy train (simplified sprite)
        this.drawTrainSprite(battle.enemyActive, 550, 50, false);

        // Draw player train (simplified sprite)
        this.drawTrainSprite(battle.playerActive, 200, 350, true);

        // Draw HP bars
        this.drawBattleHUD(battle);

        // Draw battle menu or message
        if (battle.state === CONSTANTS.BATTLE_STATES.MENU) {
            this.drawBattleMenu(battle);
        } else if (battle.state === CONSTANTS.BATTLE_STATES.FIGHT) {
            this.drawMoveSelection(battle);
        } else {
            this.drawMessage(battle.getCurrentMessage());
        }
    }

    drawTrainSprite(train, x, y, isPlayer) {
        const size = 120;

        // Draw train body (simplified - using colored rectangles)
        const typeColor = CONSTANTS.TYPE_COLORS[train.types[0]] || '#888888';

        this.ctx.fillStyle = typeColor;
        this.ctx.fillRect(x, y + size / 2, size, size / 2);

        // Draw train wheels
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(x + 30, y + size, 15, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + 90, y + size, 15, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw train cab
        this.ctx.fillStyle = typeColor;
        this.ctx.fillRect(x + size / 4, y + size / 4, size / 2, size / 2);

        // Draw chimney/antenna based on type
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(x + size / 2 - 10, y, 20, size / 4);
    }

    drawBattleHUD(battle) {
        // Enemy train info
        this.drawTrainInfo(battle.enemyActive, 500, 50, false);

        // Player train info
        this.drawTrainInfo(battle.playerActive, 50, 500, true);
    }

    drawTrainInfo(train, x, y, showHP) {
        const width = 350;
        const height = showHP ? 100 : 80;

        // Background
        this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(x, y, width, height);

        // Train name and level
        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = 'bold 20px monospace';
        this.ctx.fillText(train.species.name, x + 10, y + 30);
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`Lv${train.level}`, x + width - 60, y + 30);

        if (showHP) {
            // HP bar
            const hpBarX = x + 100;
            const hpBarY = y + 50;
            const hpBarWidth = 200;
            const hpBarHeight = 12;

            this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            this.ctx.font = '14px monospace';
            this.ctx.fillText('HP:', x + 10, hpBarY + 10);

            // HP bar background
            this.ctx.fillStyle = CONSTANTS.COLORS.LIGHT_GRAY;
            this.ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);

            // HP bar fill
            const hpPercentage = train.getHPPercentage();
            const fillWidth = (hpBarWidth * hpPercentage) / 100;
            this.ctx.fillStyle = train.getHPColor();
            this.ctx.fillRect(hpBarX, hpBarY, fillWidth, hpBarHeight);

            // HP numbers
            this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            this.ctx.fillText(`${train.currentHP}/${train.maxHP}`, x + 10, y + 80);
        }
    }

    drawBattleMenu(battle) {
        const x = 50;
        const y = 650;
        const width = 860;
        const height = 160;

        // Menu background
        this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, width, height);

        // Menu options
        const options = ['FIGHT', 'BAG', 'TRAIN', 'RUN'];
        const optionWidth = width / 2;
        const optionHeight = height / 2;

        this.ctx.font = 'bold 24px monospace';

        for (let i = 0; i < options.length; i++) {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const optionX = x + col * optionWidth;
            const optionY = y + row * optionHeight;

            // Highlight selected option
            if (i === battle.menuSelection) {
                this.ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
                this.ctx.fillRect(optionX, optionY, optionWidth, optionHeight);
            }

            // Draw option text
            this.ctx.fillStyle = i === battle.menuSelection ? CONSTANTS.COLORS.WHITE : CONSTANTS.COLORS.BLACK;
            this.ctx.fillText(options[i], optionX + 60, optionY + 50);
        }
    }

    drawMoveSelection(battle) {
        const x = 50;
        const y = 650;
        const width = 860;
        const height = 160;

        // Menu background
        this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, width, height);

        // Draw moves
        const moves = battle.playerActive.moves;
        const optionWidth = width / 2;
        const optionHeight = height / 2;

        this.ctx.font = 'bold 20px monospace';

        for (let i = 0; i < moves.length && i < 4; i++) {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const optionX = x + col * optionWidth;
            const optionY = y + row * optionHeight;

            // Highlight selected move
            if (i === battle.moveSelection) {
                this.ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
                this.ctx.fillRect(optionX, optionY, optionWidth, optionHeight);
            }

            // Draw move name
            this.ctx.fillStyle = i === battle.moveSelection ? CONSTANTS.COLORS.WHITE : CONSTANTS.COLORS.BLACK;
            this.ctx.fillText(moves[i], optionX + 40, optionY + 40);

            // Draw move type
            const moveData = MOVES_DB[moves[i]];
            if (moveData) {
                this.ctx.font = '14px monospace';
                this.ctx.fillText(`Type: ${moveData.type}`, optionX + 40, optionY + 65);
                this.ctx.font = 'bold 20px monospace';
            }
        }
    }

    drawMessage(message) {
        const x = 50;
        const y = 650;
        const width = 860;
        const height = 160;

        // Message box
        this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, width, height);

        // Message text
        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = '20px monospace';

        const lines = Utils.wrapText(message, width - 40, this.ctx, 20);
        for (let i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], x + 20, y + 40 + i * 30);
        }

        // Blinking arrow
        if (Math.floor(Date.now() / 500) % 2 === 0) {
            this.ctx.fillText('▼', x + width - 40, y + height - 30);
        }
    }

    drawTitleScreen() {
        // Background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, CONSTANTS.CANVAS_HEIGHT);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

        // Title
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 72px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('TRAIN BATTLE', CONSTANTS.CANVAS_WIDTH / 2, 200);

        this.ctx.font = 'bold 48px monospace';
        this.ctx.fillText('RPG', CONSTANTS.CANVAS_WIDTH / 2, 280);

        // Subtitle
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '24px monospace';
        this.ctx.fillText('A Pokémon-Style Adventure!', CONSTANTS.CANVAS_WIDTH / 2, 350);

        // Start prompt
        if (Math.floor(Date.now() / 1000) % 2 === 0) {
            this.ctx.font = 'bold 28px monospace';
            this.ctx.fillText('PRESS ENTER TO START', CONSTANTS.CANVAS_WIDTH / 2, 600);
        }

        // Version
        this.ctx.fillStyle = '#888888';
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`v${CONSTANTS.VERSION}`, CONSTANTS.CANVAS_WIDTH / 2, 800);

        this.ctx.textAlign = 'left';
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Graphics;
}
