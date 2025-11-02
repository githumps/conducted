/**
 * DEBUG TOOL: Skip directly to overworld for testing
 *
 * Open browser console and run:
 * const script = document.createElement('script');
 * script.src = 'debug-skip-to-overworld.js';
 * document.head.appendChild(script);
 */

(function() {
    console.log('🔧 DEBUG: Skipping to overworld...');

    if (!window.game) {
        console.error('Game not initialized!');
        return;
    }

    // Create a starter train
    const starterSpecies = TRAIN_DATA.find(t => t.id === 1); // Steamini
    const starterTrain = new Train(starterSpecies, 5);

    // Add to player party
    window.game.player.party = [starterTrain];
    window.game.player.hasStarterTrain = true;
    window.game.player.metProfessor = true;

    // Give starting items
    window.game.player.items.boxcar = 5;
    window.game.player.items.potion = 3;
    window.game.player.money = 3000;

    // Jump to overworld
    window.game.state = 'overworld';
    console.log('✅ DEBUG: Now in overworld state');
    console.log('   Party:', window.game.player.party);
    console.log('   Money:', window.game.player.money);
    console.log('   Press ESC to test menu!');
})();
