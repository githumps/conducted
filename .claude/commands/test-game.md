# /test-game - Run Game in Test Mode

Run the game with fixed RNG seed for deterministic testing.

## What This Command Does

1. Boot game with deterministic random number generator
2. Skip intro animations for speed
3. Auto-select starter (Steamini)
4. Run through critical path test scenarios
5. Report any crashes or unexpected behavior

## Test Scenarios

### Scenario 1: Basic Loop
- Start game → Skip intro → Get Steamini
- Walk to tall grass
- Trigger wild encounter (seed=12345)
- Win battle → Check XP gain
- Check evolution at level 16
- Save game → Reload → Verify state

### Scenario 2: Door Transitions (Issue #52 Focus)
- Walk to Professor's Lab door (9, 10)
- Press action key → Should enter building
- Walk to exit door (5, 8) → Should exit to Piston Town
- Verify player position correct after transition

### Scenario 3: Party Full
- Add 5 more trains to party (via debug mode)
- Trigger encounter
- Try to catch train → Should fail with "Party full" message

## Usage

```bash
# In browser console after loading game:
game.testMode = true;
game.randomSeed = 12345;
game.skipIntro = true;
game.autoStarter = "steamini";
game.runTests();
```

## Expected Output

```
✅ Basic loop test passed
✅ Door transitions work
✅ Party full message displays
⚠️ Warning: Save file size is 15KB (large)

All critical path tests passed!
```
