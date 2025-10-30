/**
 * Enhanced Graphics System with Scrolling Camera
 */

class Graphics {
    constructor(ctx) {
        this.ctx = ctx;
        this.tileSize = CONSTANTS.TILE_SIZE;
        this.scale = CONSTANTS.SCALE;

        // Camera system
        this.camera = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            smooth: true
        };

        // Screen dimensions in tiles
        this.screenTilesX = CONSTANTS.SCREEN_TILES_X;
        this.screenTilesY = CONSTANTS.SCREEN_TILES_Y;

        // Classic Game Boy inspired palette (four tones)
        this.gbPalette = {
            lightest: '#E0F8D0',
            light: '#88C070',
            dark: '#346856',
            darkest: '#081820',
            accent: '#F2DCA3'
        };
    }

    updateCamera(player, map) {
        // Center camera on player
        const targetX = player.x - Math.floor(this.screenTilesX / 2);
        const targetY = player.y - Math.floor(this.screenTilesY / 2);

        // Clamp camera to map bounds
        this.camera.targetX = Math.max(0, Math.min(targetX, map.width - this.screenTilesX));
        this.camera.targetY = Math.max(0, Math.min(targetY, map.height - this.screenTilesY));

        // Smooth camera movement
        if (this.camera.smooth) {
            this.camera.x += (this.camera.targetX - this.camera.x) * 0.1;
            this.camera.y += (this.camera.targetY - this.camera.y) * 0.1;
        } else {
            this.camera.x = this.camera.targetX;
            this.camera.y = this.camera.targetY;
        }
    }

    clear() {
        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    }

    drawMap(map, camera = { x: 0, y: 0 }) {
        const startX = Math.floor(camera.x);
        const startY = Math.floor(camera.y);
        const endX = Math.min(startX + this.screenTilesX + 1, map.width);
        const endY = Math.min(startY + this.screenTilesY + 1, map.height);

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                const tile = map.getTile(x, y);
                const screenX = x - startX;
                const screenY = y - startY;

                this.drawTile(tile, screenX, screenY);
            }
        }
    }

    drawTile(tileType, screenX, screenY) {
        const x = screenX * this.tileSize * this.scale;
        const y = screenY * this.tileSize * this.scale;
        const size = this.tileSize * this.scale;

        let color = this.gbPalette.light;
        let pattern = null;

        switch (tileType) {
            case TILE_TYPES.VOID:
                color = this.gbPalette.darkest;
                break;
            case TILE_TYPES.GRASS:
                color = this.gbPalette.light;
                pattern = 'grass';
                break;
            case TILE_TYPES.TALL_GRASS:
                color = this.gbPalette.dark;
                pattern = 'tallgrass';
                break;
            case TILE_TYPES.PATH:
                color = this.gbPalette.accent;
                pattern = 'path';
                break;
            case TILE_TYPES.WATER:
                color = '#6AA0D8';
                pattern = 'water';
                break;
            case TILE_TYPES.WALL:
                color = this.gbPalette.darkest;
                pattern = 'wall';
                break;
            case TILE_TYPES.RAILS:
                color = this.gbPalette.accent;
                pattern = 'rails';
                break;
            case TILE_TYPES.BUILDING:
                color = '#B06F3C';
                pattern = 'building';
                break;
            case TILE_TYPES.STATION:
                color = '#D8B15C';
                pattern = 'station';
                break;
            case TILE_TYPES.DOOR:
                color = this.gbPalette.darkest;
                pattern = 'door';
                break;
            case TILE_TYPES.GRAVEYARD:
                color = '#556060';
                pattern = 'graveyard';
                break;
            case TILE_TYPES.SAND:
                color = '#DCC57C';
                pattern = 'sand';
                break;
            case TILE_TYPES.CAVE:
                color = '#2C2F30';
                pattern = 'cave';
                break;
            default:
                color = this.gbPalette.dark;
        }

        // Base tile
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);

        // Add pattern details
        this.drawTilePattern(pattern, x, y, size);
    }

    drawTilePattern(pattern, x, y, size) {
        if (!pattern) return;

        switch (pattern) {
            case 'grass':
                this.ctx.fillStyle = this.gbPalette.dark;
                for (let gx = 2; gx < size; gx += 6) {
                    for (let gy = 2; gy < size; gy += 6) {
                        this.ctx.fillRect(x + gx, y + gy, 2, 2);
                    }
                }
                break;

            case 'tallgrass':
                this.ctx.fillStyle = this.gbPalette.darkest;
                for (let gy = 1; gy < size; gy += 4) {
                    this.ctx.fillRect(x + (gy % 5), y + gy, 2, 6);
                }
                break;

            case 'path':
                this.ctx.fillStyle = '#BFA56F';
                for (let gy = 4; gy < size; gy += 6) {
                    this.ctx.fillRect(x, y + gy, size, 1);
                }
                break;

            case 'water':
                this.ctx.fillStyle = '#3F6AA1';
                for (let gx = 0; gx < size; gx += 4) {
                    this.ctx.fillRect(x + gx, y + ((gx / 2) % size), 3, 1);
                }
                break;

            case 'rails':
                this.ctx.fillStyle = this.gbPalette.darkest;
                this.ctx.fillRect(x + size * 0.3, y, 2, size);
                this.ctx.fillRect(x + size * 0.65, y, 2, size);
                for (let gy = 3; gy < size; gy += 4) {
                    this.ctx.fillRect(x, y + gy, size, 1);
                }
                break;

            case 'graveyard':
                this.ctx.fillStyle = this.gbPalette.darkest;
                this.ctx.fillRect(x + size / 2 - 2, y + 4, 4, size - 8);
                this.ctx.fillRect(x + size / 2 - 1, y + 2, 2, 3);
                break;

            case 'sand':
                this.ctx.fillStyle = '#C2AA64';
                for (let gx = 1; gx < size; gx += 5) {
                    this.ctx.fillRect(x + gx, y + (gx % 7), 2, 1);
                }
                break;

            case 'station':
                this.ctx.fillStyle = this.gbPalette.darkest;
                this.ctx.fillRect(x + 2, y + 2, size - 4, size / 2);
                this.ctx.fillRect(x + size / 2 - 2, y + size / 2, 4, size / 2);
                break;

            case 'building':
                this.ctx.fillStyle = this.gbPalette.darkest;
                this.ctx.fillRect(x + 2, y + 2, size - 4, size - 6);
                this.ctx.fillStyle = this.gbPalette.lightest;
                this.ctx.fillRect(x + 4, y + 4, 4, 4);
                this.ctx.fillRect(x + size - 8, y + 4, 4, 4);
                break;

            case 'door':
                this.ctx.fillStyle = this.gbPalette.accent;
                this.ctx.fillRect(x + 4, y + 4, size - 8, size - 6);
                this.ctx.fillStyle = this.gbPalette.darkest;
                this.ctx.fillRect(x + size - 7, y + size - 7, 2, 2);
                break;

            case 'wall':
                this.ctx.fillStyle = this.gbPalette.dark;
                for (let gy = 0; gy < size; gy += 4) {
                    const offset = (gy / 4) % 2 === 0 ? 0 : 2;
                    for (let gx = offset; gx < size; gx += 6) {
                        this.ctx.fillRect(x + gx, y + gy, 4, 2);
                    }
                }
                break;

            case 'cave':
                this.ctx.fillStyle = this.gbPalette.darkest;
                for (let gx = 0; gx < size; gx += 3) {
                    this.ctx.fillRect(x + gx, y + ((gx * 2) % size), 2, 2);
                }
                break;
        }
    }

    drawPlayer(player, camera) {
        const screenX = (player.x - camera.x) * this.tileSize * this.scale;
        const screenY = (player.y - camera.y) * this.tileSize * this.scale;
        const size = this.tileSize * this.scale;

        this.drawPlayerSprite(screenX, screenY, size, player.direction);
    }

    drawPlayerSprite(x, y, size, direction) {
        const unit = size / this.tileSize;
        const p = this.gbPalette;

        this.ctx.clearRect(x, y, size, size);

        // Hat brim
        this.ctx.fillStyle = p.darkest;
        this.ctx.fillRect(x + 2 * unit, y + 4 * unit, 12 * unit, 2 * unit);

        // Hat top
        this.ctx.fillStyle = p.dark;
        this.ctx.fillRect(x + 3 * unit, y + unit, 10 * unit, 3 * unit);

        // Face
        this.ctx.fillStyle = p.lightest;
        this.ctx.fillRect(x + 5 * unit, y + 5 * unit, 6 * unit, 4 * unit);

        // Body
        this.ctx.fillStyle = p.light;
        this.ctx.fillRect(x + 4 * unit, y + 9 * unit, 8 * unit, 5 * unit);

        // Strap/accent
        this.ctx.fillStyle = p.darkest;
        this.ctx.fillRect(x + 6 * unit, y + 9 * unit, 2 * unit, 5 * unit);

        // Arms
        this.ctx.fillStyle = p.lightest;
        this.ctx.fillRect(x + 3 * unit, y + 9 * unit, unit, 4 * unit);
        this.ctx.fillRect(x + 12 * unit, y + 9 * unit, unit, 4 * unit);

        // Feet
        this.ctx.fillStyle = p.dark;
        this.ctx.fillRect(x + 4 * unit, y + 14 * unit, 3 * unit, 2 * unit);
        this.ctx.fillRect(x + 9 * unit, y + 14 * unit, 3 * unit, 2 * unit);

        // Direction highlight (simple shift)
        if (direction === CONSTANTS.DIRECTIONS.LEFT) {
            this.ctx.fillStyle = p.darkest;
            this.ctx.fillRect(x + 4 * unit, y + 5 * unit, unit, 4 * unit);
        } else if (direction === CONSTANTS.DIRECTIONS.RIGHT) {
            this.ctx.fillStyle = p.darkest;
            this.ctx.fillRect(x + 10 * unit, y + 5 * unit, unit, 4 * unit);
        }
    }

    drawNPC(npc, camera) {
        const screenX = (npc.x - camera.x) * this.tileSize * this.scale;
        const screenY = (npc.y - camera.y) * this.tileSize * this.scale;
        const size = this.tileSize * this.scale;

        // Draw NPC based on type
        if (npc.type === 'gym_leader') {
            this.drawGymLeader(screenX, screenY, size, npc);
        } else if (npc.type === 'trainer') {
            this.drawTrainer(screenX, screenY, size);
        } else {
            this.drawGenericNPC(screenX, screenY, size);
        }
    }

    drawGymLeader(x, y, size, npc) {
        this.drawChibiCharacter(x, y, size, this.gbPalette.light, true);
    }

    drawTrainer(x, y, size) {
        this.drawChibiCharacter(x, y, size, this.gbPalette.lightest);
    }

    drawGenericNPC(x, y, size) {
        this.drawChibiCharacter(x, y, size, this.gbPalette.light);
    }

    drawChibiCharacter(x, y, size, bodyColor, includeCape = false) {
        const unit = size / this.tileSize;
        const p = this.gbPalette;

        this.ctx.clearRect(x, y, size, size);

        // Hair / hat
        this.ctx.fillStyle = bodyColor;
        this.ctx.fillRect(x + 3 * unit, y + 2 * unit, 10 * unit, 3 * unit);
        this.ctx.fillRect(x + 2 * unit, y + 4 * unit, 12 * unit, unit);

        // Face
        this.ctx.fillStyle = p.lightest;
        this.ctx.fillRect(x + 5 * unit, y + 5 * unit, 6 * unit, 4 * unit);

        // Body
        this.ctx.fillStyle = bodyColor;
        this.ctx.fillRect(x + 4 * unit, y + 9 * unit, 8 * unit, 5 * unit);

        if (includeCape) {
            this.ctx.fillStyle = p.dark;
            this.ctx.fillRect(x + 2 * unit, y + 9 * unit, 12 * unit, 4 * unit);
        }

        // Legs
        this.ctx.fillStyle = p.dark;
        this.ctx.fillRect(x + 5 * unit, y + 14 * unit, 3 * unit, 2 * unit);
        this.ctx.fillRect(x + 8 * unit, y + 14 * unit, 3 * unit, 2 * unit);
    }

    /**
     * Draw a cute train sprite based on species and evolution stage
     */
    drawCuteTrainSprite(speciesId, level, x, y, size = 100) {
        const species = TRAIN_SPECIES[speciesId];
        if (!species) return;

        const ctx = this.ctx;
        ctx.save();

        // Determine evolution stage (baby, teen, adult)
        const evoStage = this.getEvolutionStage(species, level);

        // Scale based on evolution stage
        const scale = evoStage === 'baby' ? 0.7 : evoStage === 'teen' ? 0.85 : 1.0;
        const trainSize = size * scale;

        // Center the sprite
        const centerX = x + (size - trainSize) / 2;
        const centerY = y + (size - trainSize) / 2;

        // Draw based on type
        const type = species.types[0];

        if (type === 'STEAM') {
            this.drawSteamTrain(centerX, centerY, trainSize, evoStage);
        } else if (type === 'ELECTRIC') {
            this.drawElectricTrain(centerX, centerY, trainSize, evoStage);
        } else if (type === 'DIESEL') {
            this.drawDieselTrain(centerX, centerY, trainSize, evoStage);
        } else {
            this.drawGenericTrain(centerX, centerY, trainSize, evoStage, CONSTANTS.TYPE_COLORS[type]);
        }

        ctx.restore();
    }

    getEvolutionStage(species, level) {
        if (!species.evolution) return 'adult'; // Fully evolved
        if (level < species.evolution.level) return 'baby';

        // Check if there's a second evolution
        const nextSpecies = TRAIN_SPECIES[species.evolution.evolvesTo];
        if (nextSpecies && nextSpecies.evolution && level < nextSpecies.evolution.level) {
            return 'teen';
        }
        return 'adult';
    }

    drawSteamTrain(x, y, size, stage) {
        const ctx = this.ctx;

        // Colors
        const bodyColor = stage === 'baby' ? '#8B7355' : stage === 'teen' ? '#654321' : '#4A3020';
        const accentColor = stage === 'baby' ? '#FFD700' : '#C0C0C0';
        const smokeColor = '#888888';

        // Main body (rounded boiler)
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.ellipse(x + size * 0.5, y + size * 0.55, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cab (driver compartment)
        ctx.fillStyle = '#654321';
        ctx.fillRect(x + size * 0.65, y + size * 0.35, size * 0.25, size * 0.35);

        // Cab window (cute!)
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(x + size * 0.70, y + size * 0.40, size * 0.15, size * 0.12);

        // Smokestack
        const stackHeight = stage === 'baby' ? 0.2 : stage === 'teen' ? 0.25 : 0.3;
        ctx.fillStyle = '#2C2C2C';
        ctx.fillRect(x + size * 0.35, y + size * 0.25, size * 0.12, size * stackHeight);

        // Smoke puffs (cute!)
        if (stage === 'baby') {
            ctx.fillStyle = smokeColor;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(x + size * 0.41, y + size * 0.18, size * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        } else {
            // Bigger smoke for evolved forms
            ctx.fillStyle = smokeColor;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(x + size * 0.41, y + size * 0.15, size * 0.10, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + size * 0.38, y + size * 0.08, size * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }

        // Wheels
        const wheelCount = stage === 'baby' ? 2 : stage === 'teen' ? 3 : 4;
        const wheelRadius = size * 0.08;
        const wheelY = y + size * 0.75;

        for (let i = 0; i < wheelCount; i++) {
            const wheelX = x + size * (0.25 + i * 0.15);

            // Wheel rim
            ctx.fillStyle = '#2C2C2C';
            ctx.beginPath();
            ctx.arc(wheelX, wheelY, wheelRadius, 0, Math.PI * 2);
            ctx.fill();

            // Hub
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.arc(wheelX, wheelY, wheelRadius * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Cute face on the front!
        if (stage === 'baby') {
            // Big cute eyes
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(x + size * 0.25, y + size * 0.48, size * 0.06, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(x + size * 0.25, y + size * 0.48, size * 0.03, 0, Math.PI * 2);
            ctx.fill();

            // Smile
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x + size * 0.25, y + size * 0.55, size * 0.05, 0, Math.PI, false);
            ctx.stroke();
        }
    }

    drawElectricTrain(x, y, size, stage) {
        const ctx = this.ctx;

        // Colors - sleek and futuristic
        const bodyColor = stage === 'baby' ? '#FFE55C' : stage === 'teen' ? '#F8D030' : '#E0B020';
        const accentColor = stage === 'baby' ? '#87CEEB' : '#4169E1';
        const lightningColor = '#FFD700';

        // Main body (streamlined)
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.moveTo(x + size * 0.2, y + size * 0.5);
        ctx.lineTo(x + size * 0.85, y + size * 0.5);
        ctx.lineTo(x + size * 0.9, y + size * 0.55);
        ctx.lineTo(x + size * 0.9, y + size * 0.7);
        ctx.lineTo(x + size * 0.2, y + size * 0.7);
        ctx.closePath();
        ctx.fill();

        // Nose cone (pointed front)
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.moveTo(x + size * 0.85, y + size * 0.5);
        ctx.lineTo(x + size * 0.98, y + size * 0.6);
        ctx.lineTo(x + size * 0.9, y + size * 0.7);
        ctx.closePath();
        ctx.fill();

        // Pantograph (power collector on top)
        ctx.strokeStyle = '#2C2C2C';
        ctx.lineWidth = stage === 'baby' ? 2 : 3;
        ctx.beginPath();
        ctx.moveTo(x + size * 0.5, y + size * 0.5);
        ctx.lineTo(x + size * 0.45, y + size * 0.35);
        ctx.lineTo(x + size * 0.55, y + size * 0.35);
        ctx.stroke();

        // Lightning bolt effect
        ctx.fillStyle = lightningColor;
        ctx.beginPath();
        ctx.moveTo(x + size * 0.5, y + size * 0.3);
        ctx.lineTo(x + size * 0.48, y + size * 0.38);
        ctx.lineTo(x + size * 0.51, y + size * 0.38);
        ctx.lineTo(x + size * 0.49, y + size * 0.44);
        ctx.lineTo(x + size * 0.52, y + size * 0.35);
        ctx.lineTo(x + size * 0.50, y + size * 0.35);
        ctx.closePath();
        ctx.fill();

        // Windows
        ctx.fillStyle = '#4A4A4A';
        const windowCount = stage === 'baby' ? 2 : stage === 'teen' ? 3 : 4;
        for (let i = 0; i < windowCount; i++) {
            ctx.fillRect(x + size * (0.3 + i * 0.12), y + size * 0.54, size * 0.08, size * 0.08);
        }

        // Wheels (smaller, more aerodynamic)
        const wheelRadius = size * 0.06;
        const wheelY = y + size * 0.73;

        for (let i = 0; i < 3; i++) {
            const wheelX = x + size * (0.3 + i * 0.2);

            ctx.fillStyle = '#4169E1';
            ctx.beginPath();
            ctx.arc(wheelX, wheelY, wheelRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = lightningColor;
            ctx.beginPath();
            ctx.arc(wheelX, wheelY, wheelRadius * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Cute headlight/eyes
        if (stage === 'baby') {
            ctx.fillStyle = '#FFFF00';
            ctx.beginPath();
            ctx.arc(x + size * 0.92, y + size * 0.58, size * 0.04, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawDieselTrain(x, y, size, stage) {
        const ctx = this.ctx;

        // Colors - robust and industrial
        const bodyColor = stage === 'baby' ? '#8B7355' : stage === 'teen' ? '#5C4428' : '#3C2818';
        const stripeColor = stage === 'baby' ? '#FF6B6B' : '#DC143C';
        const exhaustColor = '#4A4A4A';

        // Main body (boxy locomotive)
        ctx.fillStyle = bodyColor;
        ctx.fillRect(x + size * 0.25, y + size * 0.4, size * 0.6, size * 0.35);

        // Racing stripe
        ctx.fillStyle = stripeColor;
        ctx.fillRect(x + size * 0.25, y + size * 0.55, size * 0.6, size * 0.08);

        // Exhaust stack
        ctx.fillStyle = exhaustColor;
        ctx.fillRect(x + size * 0.4, y + size * 0.28, size * 0.1, size * 0.12);

        // Exhaust smoke
        ctx.fillStyle = '#666666';
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(x + size * 0.45, y + size * 0.22, size * 0.06, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Cab
        ctx.fillStyle = '#2C2C2C';
        ctx.fillRect(x + size * 0.65, y + size * 0.35, size * 0.2, size * 0.25);

        // Cab windows
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(x + size * 0.68, y + size * 0.40, size * 0.14, size * 0.10);

        // Grill/front
        ctx.fillStyle = '#696969';
        ctx.fillRect(x + size * 0.23, y + size * 0.45, size * 0.05, size * 0.25);

        // Wheels (big and sturdy)
        const wheelRadius = size * 0.09;
        const wheelY = y + size * 0.78;
        const wheelCount = stage === 'baby' ? 2 : 3;

        for (let i = 0; i < wheelCount; i++) {
            const wheelX = x + size * (0.35 + i * 0.18);

            // Wheel
            ctx.fillStyle = '#2C2C2C';
            ctx.beginPath();
            ctx.arc(wheelX, wheelY, wheelRadius, 0, Math.PI * 2);
            ctx.fill();

            // Hub
            ctx.fillStyle = stripeColor;
            ctx.beginPath();
            ctx.arc(wheelX, wheelY, wheelRadius * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Spokes
            ctx.strokeStyle = stripeColor;
            ctx.lineWidth = 2;
            for (let j = 0; j < 4; j++) {
                ctx.beginPath();
                ctx.moveTo(wheelX, wheelY);
                const angle = (j * Math.PI / 2);
                ctx.lineTo(wheelX + Math.cos(angle) * wheelRadius * 0.7, wheelY + Math.sin(angle) * wheelRadius * 0.7);
                ctx.stroke();
            }
        }

        // Cute headlight (baby only)
        if (stage === 'baby') {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(x + size * 0.23, y + size * 0.58, size * 0.04, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawGenericTrain(x, y, size, stage, color) {
        const ctx = this.ctx;

        // Simple train for other types
        ctx.fillStyle = color || '#888888';
        ctx.fillRect(x + size * 0.3, y + size * 0.45, size * 0.5, size * 0.3);

        // Windows
        ctx.fillStyle = '#4A4A4A';
        ctx.fillRect(x + size * 0.4, y + size * 0.5, size * 0.1, size * 0.1);
        ctx.fillRect(x + size * 0.6, y + size * 0.5, size * 0.1, size * 0.1);

        // Wheels
        const wheelRadius = size * 0.07;
        const wheelY = y + size * 0.78;

        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = '#2C2C2C';
            ctx.beginPath();
            ctx.arc(x + size * (0.4 + i * 0.25), wheelY, wheelRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawEnhancedTrainSprite(train, x, y, isPlayer, size = 140) {
        this.drawCuteTrainSprite(train.species.id, train.level, x, y, size);
    }

    // Keep old function for backward compatibility but update it
    _drawEnhancedTrainSpriteOld(train, x, y, isPlayer) {
        const size = 150; // Larger sprites

        // Get type colors
        const primaryColor = CONSTANTS.TYPE_COLORS[train.types[0]] || '#888888';
        const secondaryColor = train.types[1] ? CONSTANTS.TYPE_COLORS[train.types[1]] : primaryColor;

        // Draw detailed train based on type
        this.ctx.save();

        // Main body
        this.ctx.fillStyle = primaryColor;
        this.ctx.fillRect(x, y + size * 0.4, size, size * 0.4);

        // Cab/Engine
        this.ctx.fillStyle = secondaryColor;
        this.ctx.fillRect(x + size * 0.2, y + size * 0.2, size * 0.6, size * 0.4);

        // Windows
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(x + size * 0.3, y + size * 0.25, size * 0.15, size * 0.15);
        this.ctx.fillRect(x + size * 0.55, y + size * 0.25, size * 0.15, size * 0.15);

        // Wheels
        this.ctx.fillStyle = '#2C3E50';
        this.ctx.beginPath();
        this.ctx.arc(x + size * 0.25, y + size * 0.85, size * 0.12, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + size * 0.5, y + size * 0.85, size * 0.12, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + size * 0.75, y + size * 0.85, size * 0.12, 0, Math.PI * 2);
        this.ctx.fill();

        // Type-specific details
        this.drawTrainTypeDetails(train.types[0], x, y, size);

        this.ctx.restore();
    }

    drawTrainTypeDetails(type, x, y, size) {
        switch (type) {
            case 'STEAM':
                // Smokestack
                this.ctx.fillStyle = '#34495E';
                this.ctx.fillRect(x + size * 0.4, y + size * 0.1, size * 0.2, size * 0.15);
                // Smoke puffs
                this.ctx.fillStyle = 'rgba(200, 200, 200, 0.6)';
                this.ctx.beginPath();
                this.ctx.arc(x + size * 0.5, y + size * 0.05, size * 0.1, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 'ELECTRIC':
                // Lightning bolt
                this.ctx.fillStyle = '#F1C40F';
                this.ctx.beginPath();
                this.ctx.moveTo(x + size * 0.45, y + size * 0.1);
                this.ctx.lineTo(x + size * 0.55, y + size * 0.15);
                this.ctx.lineTo(x + size * 0.5, y + size * 0.15);
                this.ctx.lineTo(x + size * 0.55, y + size * 0.2);
                this.ctx.lineTo(x + size * 0.45, y + size * 0.15);
                this.ctx.lineTo(x + size * 0.5, y + size * 0.15);
                this.ctx.closePath();
                this.ctx.fill();
                break;

            case 'DIESEL':
                // Exhaust pipe
                this.ctx.fillStyle = '#7F8C8D';
                this.ctx.fillRect(x + size * 0.7, y + size * 0.15, size * 0.08, size * 0.1);
                break;

            case 'MAGLEV':
                // Hover effect
                this.ctx.strokeStyle = '#9B59B6';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + size * 0.9);
                this.ctx.lineTo(x + size, y + size * 0.9);
                this.ctx.stroke();
                break;

            case 'NUCLEAR':
                // Radiation symbol
                this.ctx.fillStyle = '#27AE60';
                this.ctx.beginPath();
                this.ctx.arc(x + size * 0.5, y + size * 0.15, size * 0.08, 0, Math.PI * 2);
                this.ctx.fill();
                break;
        }
    }

    drawBattle(battle) {
        // Enhanced battle background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, CONSTANTS.CANVAS_HEIGHT);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#E8F4F8');
        gradient.addColorStop(1, '#8B4513');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

        const margin = 24;
        const platformWidth = Math.min(200, Math.floor(CONSTANTS.CANVAS_WIDTH * 0.32));
        const platformHeight = 18;

        const enemyPlatformX = CONSTANTS.CANVAS_WIDTH - platformWidth - margin;
        const enemyPlatformY = Math.floor(CONSTANTS.CANVAS_HEIGHT * 0.28);

        const playerPlatformX = margin;
        const playerPlatformY = Math.floor(CONSTANTS.CANVAS_HEIGHT * 0.68);

        // Platform shadows
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(enemyPlatformX + 4, enemyPlatformY + platformHeight, platformWidth, 8);
        this.ctx.fillRect(playerPlatformX + 4, playerPlatformY + platformHeight, platformWidth, 8);

        // Platforms
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(enemyPlatformX, enemyPlatformY, platformWidth, platformHeight);
        this.ctx.fillRect(playerPlatformX, playerPlatformY, platformWidth, platformHeight);

        // Draw enhanced train sprites
        const spriteSize = Math.min(140, platformWidth - 20);
        const enemySpriteX = enemyPlatformX + (platformWidth - spriteSize) / 2;
        const enemySpriteY = enemyPlatformY - spriteSize + platformHeight / 2;
        const playerSpriteX = playerPlatformX + (platformWidth - spriteSize) / 2;
        const playerSpriteY = playerPlatformY - spriteSize + platformHeight / 2;

        this.drawEnhancedTrainSprite(battle.enemyActive, enemySpriteX, enemySpriteY, false, spriteSize);
        this.drawEnhancedTrainSprite(battle.playerActive, playerSpriteX, playerSpriteY, true, spriteSize);

        // Draw HUD
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

    drawBattleHUD(battle) {
        const margin = 20;
        const menuHeight = 140;
        const infoWidth = Math.min(320, CONSTANTS.CANVAS_WIDTH - margin * 2);

        const enemyInfoX = CONSTANTS.CANVAS_WIDTH - infoWidth - margin;
        const enemyInfoY = margin;
        this.drawTrainInfo(battle.enemyActive, enemyInfoX, enemyInfoY, false, infoWidth);

        const playerInfoHeight = 100;
        const playerInfoX = margin;
        const playerInfoY = Math.max(margin, CONSTANTS.CANVAS_HEIGHT - menuHeight - margin * 2 - playerInfoHeight);
        this.drawTrainInfo(battle.playerActive, playerInfoX, playerInfoY, true, infoWidth);
    }

    drawTrainInfo(train, x, y, showHP, widthOverride = null) {
        const width = widthOverride || Math.min(320, CONSTANTS.CANVAS_WIDTH - 40);
        const height = showHP ? 100 : 84;

        // Background with gradient
        const gradient = this.ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(1, '#E8E8E8');
        this.ctx.fillStyle = gradient;
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
            const hpBarX = x + 90;
            const hpBarY = y + 46;
            const hpBarWidth = Math.max(150, width - 130);
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
            this.ctx.fillText(`${train.currentHP}/${train.maxHP}`, x + 10, y + 78);
        }
    }

    drawBattleMenu(battle) {
        const margin = 20;
        const height = 140;
        const width = CONSTANTS.CANVAS_WIDTH - (margin * 2);
        const x = margin;
        const y = CONSTANTS.CANVAS_HEIGHT - height - margin;

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
            this.ctx.fillText(options[i], optionX + 48, optionY + 48);
    }
    }

    drawMoveSelection(battle) {
        const margin = 20;
        const height = 140;
        const width = CONSTANTS.CANVAS_WIDTH - (margin * 2);
        const x = margin;
        const y = CONSTANTS.CANVAS_HEIGHT - height - margin;

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
            this.ctx.fillText(moves[i], optionX + 24, optionY + 36);

            // Draw move type
            const moveData = MOVES_DB[moves[i]];
            if (moveData) {
                this.ctx.font = '14px monospace';
                this.ctx.fillText(`Type: ${moveData.type}`, optionX + 24, optionY + 60);
                this.ctx.font = 'bold 20px monospace';
            }
        }
    }

    drawMessage(message) {
        const margin = 20;
        const height = 140;
        const width = CONSTANTS.CANVAS_WIDTH - (margin * 2);
        const x = margin;
        const y = CONSTANTS.CANVAS_HEIGHT - height - margin;

        // Message box
        this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, width, height);

        // Message text
        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = '20px monospace';

        const lines = Utils.wrapText(message, width - 32, this.ctx, 20);
        for (let i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], x + 16, y + 34 + i * 28);
        }

        // Blinking arrow
        if (Math.floor(Date.now() / 500) % 2 === 0) {
            this.ctx.fillText('▼', x + width - 32, y + height - 24);
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
        this.ctx.fillText('PRESS ENTER TO START', CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 80);
        }

        // Version
        this.ctx.fillStyle = '#888888';
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`v${CONSTANTS.VERSION}`, CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 40);

        this.ctx.textAlign = 'left';
    }

    drawDialogue(dialogueOrBox, menuSelection = 0) {
        let dialogueBox = null;
        let dialogue = null;

        if (dialogueOrBox && typeof dialogueOrBox.getCurrentDialogue === 'function') {
            dialogueBox = dialogueOrBox;
            dialogue = dialogueBox.getCurrentDialogue();
        } else {
            dialogue = dialogueOrBox;
        }

        if (!dialogue) return;

        const margin = 20;
        const height = 160;
        const width = CONSTANTS.CANVAS_WIDTH - (margin * 2);
        const x = margin;
        const y = CONSTANTS.CANVAS_HEIGHT - height - margin;

        // Dialogue box
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, width, height);

        // IMPORTANT: Reset text alignment to left (fixes floating text bug)
        this.ctx.textAlign = 'left';

        // Speaker name
        if (dialogue.speaker) {
            this.ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
            this.ctx.font = 'bold 18px monospace';
            this.ctx.fillText(dialogue.speaker, x + 16, y + 28);
        }

        // Message text
        this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        this.ctx.font = '18px monospace';

        const text = dialogueBox ? dialogueBox.currentText : dialogue.text;
        const lines = Utils.wrapText(text, width - 40, this.ctx, 18);
        for (let i = 0; i < Math.min(lines.length, 5); i++) {
            this.ctx.fillText(lines[i], x + 16, y + (dialogue.speaker ? 56 : 36) + i * 26);
        }

        // Continue arrow
        const finished = dialogueBox ? dialogueBox.isFinished() : true;
        if (finished && Math.floor(Date.now() / 500) % 2 === 0) {
            this.ctx.fillText('▼', x + width - 32, y + height - 24);
        }

        // Choices
        if (dialogueBox && dialogue.choices && dialogueBox.isFinished()) {
            const choiceWidth = 160;
            const choiceHeight = 44;
            const choiceX = x + width - choiceWidth - 12;
            const choiceY = y - choiceHeight - 12;

            for (let i = 0; i < dialogue.choices.length; i++) {
                const choice = dialogue.choices[i];
                const currentChoiceY = choiceY - i * (choiceHeight + 8);

                if (i === menuSelection) {
                    this.ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
                    this.ctx.fillRect(choiceX, currentChoiceY, choiceWidth, choiceHeight);
                    this.ctx.fillStyle = CONSTANTS.COLORS.WHITE;
                } else {
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                    this.ctx.fillRect(choiceX, currentChoiceY, choiceWidth, choiceHeight);
                    this.ctx.fillStyle = CONSTANTS.COLORS.BLACK;
                }

                this.ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(choiceX, currentChoiceY, choiceWidth, choiceHeight);

                this.ctx.font = '16px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(choice.text, choiceX + choiceWidth / 2, currentChoiceY + 28);
                this.ctx.textAlign = 'left';
            }
        }
    }
}

// Note: TILE_TYPES is defined in world-maps.js which loads before this file

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Graphics, TILE_TYPES };
}
