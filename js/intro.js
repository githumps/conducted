/**
 * Intro and Story System
 */

class IntroScene {
    constructor() {
        this.step = 0;
        this.dialogue = [
            {
                speaker: 'Professor Cypress',
                text: 'Welcome to the world of trains!',
                avatar: 'professor'
            },
            {
                speaker: 'Professor Cypress',
                text: 'This world is inhabited by creatures called TRAINS!',
                avatar: 'professor'
            },
            {
                speaker: 'Professor Cypress',
                text: 'For some people, trains are companions. Others use them for battles.',
                avatar: 'professor'
            },
            {
                speaker: 'Professor Cypress',
                text: 'As for myself... I study trains as a profession.',
                avatar: 'professor'
            },
            {
                speaker: 'Professor Cypress',
                text: 'Your grandfather was a legendary train conductor. His partner, Old Iron, saved Locomotia from the Great Derailment.',
                avatar: 'professor'
            },
            {
                speaker: 'Professor Cypress',
                text: 'Now! Your very own train legend is about to unfold!',
                avatar: 'professor'
            },
            {
                speaker: 'Professor Cypress',
                text: 'But first, tell me... Are you a boy or a girl?',
                avatar: 'professor'
            }
        ];

        this.currentDialogue = 0;
        this.playerName = 'Alex';
        this.playerGender = 'boy';
        this.completed = false;
    }

    getCurrentDialogue() {
        if (this.currentDialogue < this.dialogue.length) {
            return this.dialogue[this.currentDialogue];
        }
        return null;
    }

    advance() {
        this.currentDialogue++;
        if (this.currentDialogue >= this.dialogue.length) {
            this.step++;
        }
    }

    isComplete() {
        return this.completed;
    }
}

class StarterSelection {
    constructor() {
        this.selection = 0;
        this.confirmed = false;
        this.selectedTrain = null;

        this.starters = [
            {
                id: 1,
                name: 'Chuglet',
                types: ['STEAM'],
                description: 'A small copper steam engine. Reliable and strong.',
                sprite: 'chuglet'
            },
            {
                id: 4,
                name: 'Voltrail',
                types: ['ELECTRIC'],
                description: 'A sleek electric bullet train. Fast and powerful.',
                sprite: 'voltrail'
            },
            {
                id: 7,
                name: 'Oilpup',
                types: ['DIESEL'],
                description: 'A sturdy diesel freight engine. Tough and dependable.',
                sprite: 'oilpup'
            }
        ];
    }

    moveSelection(direction) {
        if (direction === 'left') {
            this.selection = (this.selection - 1 + 3) % 3;
        } else if (direction === 'right') {
            this.selection = (this.selection + 1) % 3;
        }
    }

    confirm() {
        this.selectedTrain = this.starters[this.selection];
        this.confirmed = true;
        return new Train(this.selectedTrain.id, 5);
    }

    getCurrentStarter() {
        return this.starters[this.selection];
    }
}

class DialogueBox {
    constructor() {
        this.queue = [];
        this.currentIndex = 0;
        this.active = false;
        this.callback = null;
    }

    show(dialogues, callback = null) {
        this.queue = Array.isArray(dialogues) ? dialogues : [dialogues];
        this.currentIndex = 0;
        this.active = true;
        this.callback = callback;
    }

    advance() {
        this.currentIndex++;
        if (this.currentIndex >= this.queue.length) {
            this.active = false;
            if (this.callback) {
                this.callback();
                this.callback = null;
            }
        }
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
    module.exports = { IntroScene, StarterSelection, DialogueBox };
}
