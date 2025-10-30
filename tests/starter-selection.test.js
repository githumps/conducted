const assert = require('assert');

// Stub Train class so StarterSelection can instantiate trains without pulling in the full dataset
global.Train = class {
    constructor(id, level) {
        this.id = id;
        this.level = level;
        this.species = { name: `MockTrain-${id}` };
        this.types = ['STEAM'];
    }

    static fromJSON(data) {
        return new this(data.speciesId, data.level);
    }
};

const { StarterSelection } = require('../js/intro.js');

function createGameStub() {
    return {
        player: {
            party: [],
            items: {},
            addTrain(train) {
                this.party.push(train);
            },
            addItem() {}
        }
    };
}

function testIntroProgression() {
    const selection = new StarterSelection(createGameStub());
    assert.strictEqual(selection.phase, 'intro');
    const steps = selection.introDialogue.length;
    for (let i = 0; i < steps; i++) {
        selection.advanceIntro();
    }
    assert.strictEqual(selection.phase, 'selection');
}

function testSelectionNavigation() {
    const selection = new StarterSelection(createGameStub());
    selection.phase = 'selection';
    selection.moveSelection('right');
    assert.strictEqual(selection.selection, 1);
    selection.moveSelection('right');
    assert.strictEqual(selection.selection, 2);
    selection.moveSelection('right');
    assert.strictEqual(selection.selection, 0);
    selection.moveSelection('left');
    assert.strictEqual(selection.selection, 2);
}

function testConfirmationFlow() {
    const gameStub = createGameStub();
    const selection = new StarterSelection(gameStub);
    selection.phase = 'selection';
    selection.selection = 1;

    selection.confirmSelection();
    assert.strictEqual(selection.phase, 'confirmation');

    selection.confirm();
    assert.strictEqual(selection.phase, 'post-selection');
    assert.strictEqual(gameStub.player.party.length, 1);
    assert.strictEqual(gameStub.player.items.pokeball, 5);
    assert.strictEqual(gameStub.player.items.potion, 2);
}

testIntroProgression();
testSelectionNavigation();
testConfirmationFlow();

console.log('StarterSelection tests passed');
