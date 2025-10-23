/**
 * Main Entry Point
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚂 Train Battle RPG Starting...');

    // Get canvas
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }

    // Create game instance
    const game = new Game(canvas);

    // Game loop
    let lastTime = 0;

    function gameLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        // Update
        game.update(deltaTime);

        // Render
        game.render();

        // Continue loop
        requestAnimationFrame(gameLoop);
    }

    // Start game loop
    console.log('🎮 Game loop starting!');
    requestAnimationFrame(gameLoop);

    // Auto-save every 30 seconds
    setInterval(() => {
        if (game.player && game.state === CONSTANTS.STATES.OVERWORLD) {
            game.save();
        }
    }, 30000);

    // Try to load save on start
    if (game.load()) {
        console.log('📁 Save game loaded!');
    }

    console.log('✅ Train Battle RPG Ready!');
    console.log('Press ENTER on the title screen to start!');
});

// Add window resize handler
window.addEventListener('resize', () => {
    // Could add responsive canvas scaling here
});

// Prevent context menu on canvas
document.getElementById('gameCanvas')?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
