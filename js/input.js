/**
 * Input Handler - manages keyboard input
 */

class InputHandler {
    constructor() {
        this.keys = {};
        this.keyJustPressed = {};

        this.setupListeners();
    }

    setupListeners() {
        window.addEventListener('keydown', (e) => {
            if (!this.keys[e.key]) {
                this.keyJustPressed[e.key] = true;
            }
            this.keys[e.key] = true;

            // Prevent default for arrow keys and space
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
            this.keyJustPressed[e.key] = false;
        });
    }

    isKeyDown(key) {
        return this.keys[key] || false;
    }

    isKeyJustPressed(key) {
        const pressed = this.keyJustPressed[key] || false;
        if (pressed) {
            this.keyJustPressed[key] = false;
        }
        return pressed;
    }

    getAction() {
        // Check for just pressed keys to avoid repeating
        if (this.isKeyJustPressed('ArrowUp')) return 'up';
        if (this.isKeyJustPressed('ArrowDown')) return 'down';
        if (this.isKeyJustPressed('ArrowLeft')) return 'left';
        if (this.isKeyJustPressed('ArrowRight')) return 'right';
        if (this.isKeyJustPressed('z') || this.isKeyJustPressed('Enter')) return 'a';
        if (this.isKeyJustPressed('x') || this.isKeyJustPressed('Backspace')) return 'b';
        if (this.isKeyJustPressed('Escape')) return 'start';
        if (this.isKeyJustPressed(' ')) return 'select';

        return null;
    }

    reset() {
        this.keyJustPressed = {};
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InputHandler;
}
