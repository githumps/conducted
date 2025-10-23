# Train Battle RPG - Testing Instructions

## Bug #2: Black Screen Fix

**Issue**: Game showed black screen instead of title screen

**Fix Applied**: Enhanced save data validation and error handling

---

## How to Test the Fix

### 1. Clear Your Browser Cache and LocalStorage

If you're seeing a black screen, you may have old save data. Clear it:

**Option A: Use Browser Console**
1. Open Developer Tools (F12 or Right-click → Inspect)
2. Go to Console tab
3. Type: `localStorage.clear()` and press Enter
4. Refresh the page (F5 or Ctrl+R)

**Option B: Clear Browser Data**
1. Open your browser settings
2. Find "Clear browsing data" or "Clear storage"
3. Select "Local Storage" or "Site Data"
4. Clear for this site
5. Refresh the page

### 2. Verify the Game Loads

After clearing, you should see:
- ✅ Blue gradient background
- ✅ Gold "TRAIN BATTLE RPG" title
- ✅ White "A Pokémon-Style Adventure!" subtitle
- ✅ Blinking "PRESS ENTER TO START" prompt
- ✅ Version number at bottom

### 3. Start a New Game

1. Press ENTER (or tap START on mobile)
2. You should see Professor Cypress's intro dialogue
3. Navigate through 7 intro dialogues by pressing ENTER/A
4. You'll see 3 starter trains to choose from
5. Use LEFT/RIGHT arrows to select
6. Press ENTER/A to confirm
7. Read through post-selection dialogue
8. Game transitions to overworld map

### 4. Test Save/Load

1. Once in the overworld, press the "💾 Save" button
2. Move your character around
3. Press the "📁 Load" button
4. Your position and progress should restore

### 5. Test Export/Import Token

1. Press "📤 Export Token"
2. Copy the token shown in the modal
3. Press "📥 Import Token"
4. Paste the token
5. Your save should import successfully

---

## What's New in This Fix

### Enhanced Load Validation
The game now validates save data before loading:
- ✓ Checks if player object exists
- ✓ Verifies map name is valid
- ✓ Ensures player has at least one train
- ✓ Shows clear console warnings for any issues

### Better Initialization
- ✓ Game stays on TITLE screen if load fails
- ✓ Console shows current game state
- ✓ Clear user feedback

### New Debug Method
You can now clear save data from the console:
```javascript
// In browser console, type:
game.clearSave()
```

---

## Expected Console Output

### On Fresh Load (No Save)
```
🚂 Train Battle RPG Starting...
🎮 Game loop starting!
💡 No valid save found - starting fresh!
✅ Train Battle RPG Ready!
📍 Current state: title
🎮 Press ENTER on the title screen to start!
```

### On Successful Load
```
🚂 Train Battle RPG Starting...
🎮 Game loop starting!
Game loaded successfully!
📁 Save game loaded!
✅ Train Battle RPG Ready!
📍 Current state: overworld
🎮 Press ENTER on the title screen to start!
```

### On Invalid Save
```
🚂 Train Battle RPG Starting...
🎮 Game loop starting!
⚠️ Invalid save data: no trains in party
💡 No valid save found - starting fresh!
✅ Train Battle RPG Ready!
📍 Current state: title
🎮 Press ENTER on the title screen to start!
```

---

## Troubleshooting

### Still Seeing Black Screen?

1. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear cache completely** in browser settings
3. **Try incognito/private browsing** mode
4. **Check console** for error messages
5. **Try a different browser**

### Console Shows Errors?

Look for red error messages in the console (F12 → Console tab). Common issues:

- **"Failed to load..."** → Check that all JS files exist
- **"... is not defined"** → Script loading order issue
- **"Invalid save data..."** → Old save exists, clear localStorage

### Game Loads But Freezes?

Check console for errors. The game should be running at 60fps.

---

## Additional Testing

### Test on Mobile

1. Open on your phone
2. Touch controls should appear at bottom
3. D-pad for movement
4. A/B buttons for actions
5. All features should work

### Test Save Token Transfer

1. Play on desktop, export token
2. Open on mobile, import token
3. Your progress should transfer
4. Verify all trains, items, badges transferred

---

## Version Info

**Current Version**: 1.0.0
**Build**: Latest (check git commit)
**Fixed Bugs**:
- ✓ Bug #1: Naming inconsistency (documentation)
- ✓ Bug #2: Black screen on load (CRITICAL - FIXED!)

---

## Need Help?

If you're still experiencing issues:
1. Open browser console (F12)
2. Copy any error messages
3. Note which browser/OS you're using
4. Report the issue with details

The game should now work perfectly! Enjoy battling with trains! 🚂✨
