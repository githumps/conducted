/**
 * Input Handler - manages keyboard input
 */

class InputHandler {
    constructor() {
        this.keys = {};
        this.keyJustPressed = {};
        this.virtualKeys = {}; // For mobile touch controls
        this.virtualKeysJustPressed = {};

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

    getMovementAction() {
        // Check for virtual keys (mobile) first
        if (this.isVirtualKeyDown('up')) return 'up';
        if (this.isVirtualKeyDown('down')) return 'down';
        if (this.isVirtualKeyDown('left')) return 'left';
        if (this.isVirtualKeyDown('right')) return 'right';

        // Check for physical keyboard keys
        if (this.isKeyDown('ArrowUp') || this.isKeyDown('w')) return 'up';
        if (this.isKeyDown('ArrowDown') || this.isKeyDown('s')) return 'down';
        if (this.isKeyDown('ArrowLeft') || this.isKeyDown('a')) return 'left';
        if (this.isKeyDown('ArrowRight') || this.isKeyDown('d')) return 'right';

        return null;
    }

    getAction() {
        // Check for virtual keys (mobile) first
        if (this.isVirtualKeyJustPressed('up')) return 'up';
        if (this.isVirtualKeyJustPressed('down')) return 'down';
        if (this.isVirtualKeyJustPressed('left')) return 'left';
        if (this.isVirtualKeyJustPressed('right')) return 'right';
        if (this.isVirtualKeyJustPressed('a')) return 'a';
        if (this.isVirtualKeyJustPressed('b')) return 'b';

        // Check for physical keyboard keys
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

    // Mobile touch control simulation
    simulateKeyPress(key) {
        if (!this.virtualKeys[key]) {
            this.virtualKeysJustPressed[key] = true;
        }
        this.virtualKeys[key] = true;
    }

    simulateKeyRelease(key) {
        this.virtualKeys[key] = false;
        this.virtualKeysJustPressed[key] = false;
    }

    isVirtualKeyJustPressed(key) {
        const pressed = this.virtualKeysJustPressed[key] || false;
        if (pressed) {
            this.virtualKeysJustPressed[key] = false;
        }
        return pressed;
    }

    isVirtualKeyDown(key) {
        return this.virtualKeys[key] || false;
    }

    reset() {
        this.keyJustPressed = {};
        this.virtualKeysJustPressed = {};
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InputHandler;
}
