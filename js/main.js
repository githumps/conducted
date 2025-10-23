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

    // Initialize mobile controls
    const mobileControls = new MobileControls(game.input);

    // Setup save/load buttons
    setupSaveLoadButtons(game);

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

/**
 * Setup save/load button handlers
 */
function setupSaveLoadButtons(game) {
    const saveBtn = document.getElementById('btn-save');
    const loadBtn = document.getElementById('btn-load');
    const exportBtn = document.getElementById('btn-export');
    const importBtn = document.getElementById('btn-import');
    const statusEl = document.getElementById('save-status');

    function showStatus(message, duration = 2000) {
        if (statusEl) {
            statusEl.textContent = message;
            setTimeout(() => {
                statusEl.textContent = '';
            }, duration);
        }
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (game.save()) {
                showStatus('✅ Game Saved!');
                console.log('💾 Manual save successful');
            } else {
                showStatus('❌ Save Failed!');
                console.error('Failed to save game');
            }
        });
    }

    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            if (game.load()) {
                showStatus('✅ Game Loaded!');
                console.log('📁 Manual load successful');
            } else {
                showStatus('❌ No Save Found!');
                console.log('No save data found');
            }
        });
    }

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const token = game.exportSaveToken();
            if (token) {
                showExportModal(token);
                showStatus('📤 Token Generated!');
            } else {
                showStatus('❌ No save to export!');
            }
        });
    }

    if (importBtn) {
        importBtn.addEventListener('click', () => {
            showImportModal(game);
        });
    }
}

/**
 * Show export token modal
 */
function showExportModal(token) {
    const modal = document.getElementById('token-modal');
    const textarea = document.getElementById('token-textarea');
    const copyBtn = document.getElementById('btn-copy-token');
    const closeBtn = document.getElementById('btn-close-modal');

    if (modal && textarea) {
        textarea.value = token;
        modal.classList.remove('hidden');

        copyBtn.onclick = () => {
            textarea.select();
            navigator.clipboard.writeText(token).then(() => {
                alert('✅ Token copied to clipboard!');
            }).catch(() => {
                alert('Please manually copy the token');
            });
        };

        closeBtn.onclick = () => {
            modal.classList.add('hidden');
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        };
    }
}

/**
 * Show import token modal
 */
function showImportModal(game) {
    const modal = document.getElementById('import-modal');
    const textarea = document.getElementById('import-textarea');
    const importBtn = document.getElementById('btn-import-confirm');
    const closeBtn = document.getElementById('btn-close-import-modal');
    const statusEl = document.getElementById('save-status');

    if (modal && textarea) {
        textarea.value = '';
        modal.classList.remove('hidden');

        importBtn.onclick = () => {
            const token = textarea.value.trim();
            if (token) {
                if (game.importSaveToken(token)) {
                    alert('✅ Save imported successfully!');
                    modal.classList.add('hidden');
                    if (statusEl) statusEl.textContent = '✅ Save Imported!';
                } else {
                    alert('❌ Invalid save token!');
                }
            }
        };

        closeBtn.onclick = () => {
            modal.classList.add('hidden');
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        };
    }
}

// Add window resize handler
window.addEventListener('resize', () => {
    // Could add responsive canvas scaling here
});

// Prevent context menu on canvas
document.getElementById('gameCanvas')?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent pull-to-refresh on mobile
document.body.addEventListener('touchmove', (e) => {
    if (e.target === document.getElementById('gameCanvas')) {
        e.preventDefault();
    }
}, { passive: false });

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);
