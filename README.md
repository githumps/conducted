# Train Battle RPG

A pixel-perfect replica of Pokémon Red/Blue, but with trains instead of Pokémon!

**Play in your browser now! No installation required!**

## 🎮 Play Now

Simply open `index.html` in your web browser or visit the GitHub Pages deployment!

The game runs entirely in your browser using HTML5 Canvas and JavaScript.

## Features

- 151 unique train species to collect and battle
- Classic turn-based battle system with Gen 1 damage calculations
- Type advantages: Steam, Electric, Diesel, Maglev, Freight, Passenger, Nuclear, Monorail
- Wild train encounters in tall grass
- Pokémon-style menu system and UI
- Auto-save/load system using localStorage
- Full evolution system
- Move learning and leveling up
- Beautiful pixel art style graphics

## 🚀 Quick Start

### Play Locally

1. Clone this repository
2. Open `index.html` in your web browser
3. Start playing!

### Deploy to GitHub Pages

This repository includes automatic GitHub Pages deployment. To enable:

1. Go to your repository Settings
2. Navigate to Pages
3. Set Source to "GitHub Actions"
4. The game will auto-deploy on every push!

### Python Version (Legacy)

There's also a Python/Pygame version in the `game/` directory:

```bash
pip install -r requirements.txt
python main.py
```

## 🎯 Controls

- **Arrow Keys**: Move your character
- **Z / Enter**: Confirm / Interact / Advance text
- **X / Backspace**: Cancel / Go back
- **ESC**: Return to title screen

## 🎲 How to Play

1. **Start the Game**: Press Enter on the title screen
2. **Explore**: Use arrow keys to walk around the map
3. **Wild Encounters**: Walk through tall grass to encounter wild trains
4. **Battle**: Choose moves to battle wild trains
5. **Win Battles**: Defeat wild trains to gain experience
6. **Level Up**: Your trains will grow stronger and learn new moves
7. **Evolve**: Some trains evolve when they reach certain levels!

## 🚂 Starter Trains

You begin with one of these three starter trains:

- **Steamini** (Steam Type) - Evolves into Steamore, then Locomotor
- **Sparkart** (Electric Type) - Evolves into Voltrain, then Thunderail
- **Diesling** (Diesel Type) - Evolves into Wartorque, then Titanorque

## Train Types

- **Steam**: Strong but slow, weak to Electric
- **Electric**: Fast and powerful, weak to Diesel
- **Diesel**: Reliable and sturdy, weak to Steam
- **Maglev**: Super fast, weak to Freight
- **Freight**: Heavy hitting, weak to Maglev
- **Passenger**: Balanced stats, weak to Nuclear
- **Nuclear**: High power, weak to Monorail
- **Monorail**: Specialized, weak to Passenger

## 🎨 Technical Details

### Game Engine
- **Language**: JavaScript (ES6+)
- **Graphics**: HTML5 Canvas
- **Architecture**: Object-oriented game loop
- **Storage**: localStorage for save games

### Battle System
- Gen 1 Pokémon damage formula
- Type effectiveness chart (8 types)
- Critical hits (6.25% chance)
- STAB bonus (1.5x)
- Individual Values (IVs) for stat variation
- Move PP (Power Points) system

### Code Structure
```
js/
├── constants.js    - Game constants and configuration
├── utils.js        - Helper functions
├── train-data.js   - All 151 train species definitions
├── moves.js        - Move database and damage calculations
├── train.js        - Train class (stats, leveling, evolution)
├── battle.js       - Battle system and AI
├── player.js       - Player state and party management
├── map.js          - World map and tile system
├── graphics.js     - Rendering engine
├── input.js        - Keyboard input handling
├── ui.js           - UI components
├── game.js         - Main game manager
└── main.js         - Entry point and game loop
```

## 🙏 Credits

Game inspired by **Pokémon Red/Blue** by Game Freak

## 📝 License

This is a fan project created for educational purposes. All Pokémon-related trademarks are property of Nintendo/Game Freak/Creatures Inc.

## 🤖 Development

This game was created with assistance from Claude Code by Anthropic.
