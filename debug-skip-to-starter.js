// DEBUG HELPER: Skip to starter selection
// Run this in browser console to skip intro

(function() {
  // Find the game canvas element
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) {
    console.error('Canvas not found!');
    return;
  }

  // Try to find game instance via canvas or any attached properties
  let gameInstance = null;

  // Check if there's a __game property attached to canvas
  if (canvas.__game) {
    gameInstance = canvas.__game;
  }

  // Otherwise try to find it in various places
  if (!gameInstance) {
    // Search through all global variables
    for (let key in window) {
      if (window[key] && typeof window[key] === 'object' && window[key].state) {
        gameInstance = window[key];
        break;
      }
    }
  }

  if (gameInstance) {
    console.log('✅ Found game instance!');
    console.log('Current state:', gameInstance.state);

    // Skip to starter selection
    gameInstance.state = 'starter_selection';
    if (!gameInstance.starterSelection) {
      gameInstance.starterSelection = new StarterSelection(gameInstance);
    }
    console.log('🚀 Skipped to STARTER_SELECTION');
  } else {
    console.error('❌ Could not find game instance');
    console.log('Try adding this to main.js after game creation: window.DEBUG_GAME = game;');
  }
})();
