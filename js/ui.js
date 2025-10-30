/**
 * UI Helper Functions
 */

class UI {
    static drawTextBox(ctx, x, y, width, height, text) {
        // Draw box
        ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw text
        if (text) {
            ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            ctx.font = '18px monospace';

            const lines = Utils.wrapText(text, width - 40, ctx, 18);
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], x + 20, y + 30 + i * 25);
            }
        }
    }

    static drawMenu(ctx, x, y, width, height, options, selectedIndex) {
        // Draw box
        ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw options
        ctx.font = '20px monospace';
        const lineHeight = 35;

        for (let i = 0; i < options.length; i++) {
            const optionY = y + 30 + i * lineHeight;

            // Highlight selected
            if (i === selectedIndex) {
                ctx.fillStyle = CONSTANTS.COLORS.UI_HIGHLIGHT;
                ctx.fillRect(x + 5, optionY - 20, width - 10, lineHeight - 5);
                ctx.fillStyle = CONSTANTS.COLORS.WHITE;
            } else {
                ctx.fillStyle = CONSTANTS.COLORS.BLACK;
            }

            ctx.fillText(options[i], x + 20, optionY);
        }
    }

    static drawProgressBar(ctx, x, y, width, height, percentage, color) {
        // Background
        ctx.fillStyle = CONSTANTS.COLORS.LIGHT_GRAY;
        ctx.fillRect(x, y, width, height);

        // Fill
        const fillWidth = (width * percentage) / 100;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, fillWidth, height);

        // Border
        ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
    }

    static drawTrainSummary(ctx, train, x, y) {
        // Background panel
        const width = 400;
        const height = 200;

        ctx.fillStyle = CONSTANTS.COLORS.WHITE;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = CONSTANTS.COLORS.BLACK;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Train name and level
        ctx.fillStyle = CONSTANTS.COLORS.BLACK;
        ctx.font = 'bold 24px monospace';
        ctx.fillText(train.species.name, x + 20, y + 35);
        ctx.font = '18px monospace';
        ctx.fillText(`Lv. ${train.level}`, x + 280, y + 35);

        // HP
        ctx.fillText(`HP: ${train.currentHP}/${train.maxHP}`, x + 20, y + 70);
        this.drawProgressBar(ctx, x + 20, y + 80, 360, 15, train.getHPPercentage(), train.getHPColor());

        // Stats
        ctx.font = '16px monospace';
        ctx.fillText(`ATK: ${train.attack}`, x + 20, y + 120);
        ctx.fillText(`DEF: ${train.defense}`, x + 120, y + 120);
        ctx.fillText(`SPD: ${train.speed}`, x + 220, y + 120);
        ctx.fillText(`SPC: ${train.special}`, x + 320, y + 120);

        // Types
        ctx.font = 'bold 14px monospace';
        for (let i = 0; i < train.types.length; i++) {
            const type = train.types[i];
            const typeX = x + 20 + i * 100;
            const typeY = y + 150;

            ctx.fillStyle = CONSTANTS.TYPE_COLORS[type] || '#888888';
            ctx.fillRect(typeX, typeY, 90, 30);

            ctx.fillStyle = CONSTANTS.COLORS.WHITE;
            ctx.fillText(type, typeX + 10, typeY + 20);
        }
    }
}

class DialogueBox {
    constructor() {
        this.queue = [];
        this.currentIndex = 0;
        this.active = false;
        this.callback = null;
        this.charIndex = 0;
        this.textSpeed = 30; // Characters per second
        this.currentText = '';
    }

    show(dialogues, onComplete = null) {
        this.queue = Array.isArray(dialogues) ? dialogues : [dialogues];
        this.currentIndex = 0;
        this.active = true;
        this.onComplete = onComplete;
        this.charIndex = 0;
        this.currentText = '';
        this.startDialogue(this.queue[this.currentIndex]);
    }

    startDialogue(dialogue) {
        this.charIndex = 0;
        this.currentText = '';
        this.textSpeed = dialogue.speed || 30;
    }

    update(deltaTime) {
        if (!this.active || this.isFinished()) return;

        const dialogue = this.getCurrentDialogue();
        if (dialogue && this.currentText.length < dialogue.text.length) {
            this.charIndex += this.textSpeed * deltaTime;
            this.currentText = dialogue.text.substring(0, Math.floor(this.charIndex));
        }
    }

    advance() {
        if (this.isFinished()) {
            this.currentIndex++;
            if (this.currentIndex >= this.queue.length) {
                this.active = false;
                if (this.onComplete) {
                    this.onComplete();
                    this.onComplete = null;
                }
            } else {
                this.startDialogue(this.queue[this.currentIndex]);
            }
        } else {
            this.currentText = this.getCurrentDialogue().text;
        }
    }

    handleChoice(choiceIndex) {
        const dialogue = this.getCurrentDialogue();
        if (dialogue && dialogue.choices && dialogue.choices[choiceIndex]) {
            const choice = dialogue.choices[choiceIndex];
            if (choice.callback) {
                choice.callback();
            }
        }
    }

    isFinished() {
        const dialogue = this.getCurrentDialogue();
        return !dialogue || this.currentText.length === dialogue.text.length;
    }

    getCurrentDialogue() {
        if (this.active && this.currentIndex < this.queue.length) {
            return this.queue[this.currentIndex];
        }
        return null;
    }

    isActive() {
        return this.active;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UI, DialogueBox };
}
