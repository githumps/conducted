/**
 * Main Entry Point
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚂 Train Battle RPG Starting...');

    // Update load status helper
    function updateLoadStatus(message, color = '#ff6b6b') {
        const loadStatus = document.getElementById('load-status');
        if (loadStatus) {
            loadStatus.style.color = color;
            loadStatus.textContent = message;
        }
    }

    // Wrap everything in try-catch for debugging
    try {
        updateLoadStatus('Initializing...', '#ffaa00');

        // Get canvas
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error('Canvas not found!');
            updateLoadStatus('ERROR: Canvas not found!', '#ff0000');
            return;
        }
        console.log('✓ Canvas found');
        updateLoadStatus('Canvas found...', '#ffaa00');

        // Create game instance
        console.log('Creating game instance...');
        updateLoadStatus('Creating game...', '#ffaa00');
        const game = new Game(canvas);
        window.DEBUG_GAME = game; // Expose for debugging/testing
        console.log('✓ Game instance created');
        updateLoadStatus('Game created...', '#ffaa00');

        // Initialize mobile controls
        console.log('Initializing mobile controls...');
        updateLoadStatus('Setting up controls...', '#ffaa00');
        const mobileControls = new MobileControls(game.input);
        console.log('✓ Mobile controls initialized');

        // Setup save/load buttons
        console.log('Setting up save/load buttons...');
        setupSaveLoadButtons(game);
        console.log('✓ Save/load buttons setup');

        // Game loop
        let lastTime = 0;

        function gameLoop(timestamp) {
            try {
                const deltaTime = (timestamp - lastTime) / 1000;
                lastTime = timestamp;

                // Update
                game.update(deltaTime);

                // Render
                game.render();

                // Continue loop
                requestAnimationFrame(gameLoop);
            } catch (error) {
                console.error('❌ Error in game loop:', error);
                updateLoadStatus(`ERROR: ${error.message}`, '#ff0000');
            }
        }

        // Start game loop
        console.log('🎮 Game loop starting!');
        updateLoadStatus('Starting game loop...', '#ffaa00');
        requestAnimationFrame(gameLoop);
        console.log('✓ Game loop started');

        // Auto-save every 30 seconds
        setInterval(() => {
            if (game.player && game.state === CONSTANTS.STATES.OVERWORLD) {
                game.save();
            }
        }, 30000);

        // Try to load save on start (but stay on title screen if it fails)
        console.log('Checking for save data...');
        updateLoadStatus('Loading save...', '#ffaa00');
        const loadSuccess = game.load();
        if (loadSuccess) {
            console.log('📁 Save game loaded!');
        } else {
            console.log('💡 No valid save found - starting fresh!');
            // Ensure we're on the title screen
            game.state = CONSTANTS.STATES.TITLE;
        }

        console.log('✅ Train Battle RPG Ready!');
        console.log(`📍 Current state: ${game.state}`);
        console.log('🎮 Press ENTER on the title screen to start!');

        // Update load status indicator - SUCCESS!
        updateLoadStatus(`Ready! State: ${game.state}`, '#10b010');

    } catch (error) {
        console.error('❌ FATAL ERROR during initialization:', error);
        console.error('Stack trace:', error.stack);
        updateLoadStatus(`FATAL ERROR: ${error.message}`, '#ff0000');

        // Display error on page for user
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'position: absolute; top: 100px; left: 20px; right: 20px; background: rgba(255,0,0,0.9); color: white; padding: 20px; border-radius: 10px; font-family: monospace;';
            errorDiv.innerHTML = `
                <h2>🚨 Game Failed to Load</h2>
                <p><strong>Error:</strong> ${error.message}</p>
                <p><strong>Location:</strong> ${error.stack ? error.stack.split('\n')[1] : 'Unknown'}</p>
                <h3>Troubleshooting:</h3>
                <ol>
                    <li>Press F12 to open Developer Console and check for errors</li>
                    <li>Try clearing your browser cache (Ctrl+Shift+R)</li>
                    <li>Try clearing localStorage: <button onclick="localStorage.clear(); location.reload();" style="padding: 5px 10px;">Clear & Reload</button></li>
                    <li>Try a different browser or incognito mode</li>
                </ol>
            `;
            gameContainer.appendChild(errorDiv);
        }
    }
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
