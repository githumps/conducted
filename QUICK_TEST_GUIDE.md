# Quick Test Guide - Starter Selection System

## How to Test

### 1. Launch the Game
```bash
cd /home/user/conducted
python3 -m http.server 8080
```
Open browser: http://localhost:8080

### 2. Title Screen
- Press **Enter** or **A button** to start

### 3. Intro Sequence (7 dialogue boxes)
Expected dialogue in order:
1. "Welcome to the world of Locomotia!..."
2. "Trains aren't mere machines here..."
3. "People who bond with these trains are called Conductors..."
4. "Your grandfather... he was the greatest Conductor..."
5. "Old Iron was a magnificent steam locomotive..."
6. "Your grandfather always believed that trains and humans..."
7. "Now, your very own train legend is about to unfold!..."

**Action:** Press **A** to advance through each dialogue

### 4. Pre-Selection Dialogue (3 dialogue boxes)
1. "Look here! I've discovered three rare train eggs..."
2. "As my late friend—your grandfather—used to say..."
3. "Now, take your time and choose the partner who calls to you..."

**Action:** Press **A** to advance

### 5. Starter Selection Screen
You should see:
- Title: "Choose Your Partner!"
- Three colored eggs in a row:
  - **Left (brown):** Steamini - STEAM type
  - **Middle (yellow):** Sparkart - ELECTRIC type
  - **Right (brown):** Diesling - DIESEL type
- Description box showing selected starter's description
- Instructions: "Use ← → to select, press A to confirm"

**Actions to Test:**
- Press **Left Arrow** - Selection moves left
- Press **Right Arrow** - Selection moves right
- Watch description box update
- Selected egg has golden highlight
- Press **A** to confirm selection

### 6. Post-Selection Dialogue (10 dialogue boxes)
Dialogue 1 - **Choice-based** (depends on which starter you picked):
- Steamini: "Ah, Steamini! An excellent choice! This little steam train has a heart as warm as its boiler. Your grandfather's Old Iron was a steam type too—it seems the rails have a way of connecting families!"
- Sparkart: "Ah, Sparkart! A splendid choice! This electric speedster has lightning in its wheels and fire in its spirit. You two are going to have quite the electrifying adventure together!"
- Diesling: "Ah, Diesling! A wonderful choice! This diesel engine has the strength of mountains and the loyalty of a lifelong friend. Together, you'll overcome any obstacle on the tracks ahead!"

Dialogue 2-10:
2. "Now then! Your [TRAIN] is officially registered..."
3. "Before you set off, let me give you some essential supplies..."
4. **"Professor Cypress handed you 5 TRAINBALLS and 2 POTIONS!"**
5. "Trainballs are used to catch wild trains..."
6. "Potions will heal your trains when they're injured..."
7. "Your grandfather used to tell me: 'The rails will take you anywhere...'"
8. "Now, head out to Coal Harbor!..."
9. "But take your time! Explore Route 1..."
10. "Good luck, young Conductor! May your rails always run true..."

**Action:** Press **A** to advance through each dialogue

### 7. Transition to Overworld
After final dialogue, game should:
- Transition to overworld map (Piston Town)
- Player sprite appears
- Game is playable

### 8. Verify Your Starter
**Desktop Console Check (F12):**
Look for console logs:
```
Selected [Steamini/Sparkart/Diesling]!
Starting overworld!
```

**Visual Check:**
- Top-left corner should show your starter's HP bar
- Party should have 1 train

### 9. Test Each Starter
Repeat steps 1-8 for:
- ✅ Steamini (STEAM)
- ✅ Sparkart (ELECTRIC)
- ✅ Diesling (DIESEL)

### 10. Mobile Testing
If testing on mobile:
- Use **D-Pad Left/Right** to navigate starters
- Use **A Button** to advance dialogue
- Verify touch targets are responsive
- No scrolling/zooming issues

### 11. Save/Load Testing
After selecting starter:
1. Press **Save** button (top of page)
2. Refresh page (F5)
3. Press **Load** button
4. Verify:
   - Starter is still in party
   - Items preserved (5 Trainballs, 2 Potions)
   - Player position preserved

---

## Expected Stats (Verify in Console)

### Steamini at Level 5
```javascript
HP: ~24-26
Attack: ~13-15
Defense: ~13-15
Speed: ~12-14
Special: ~16-18
Moves: ["Whistle"]
```

### Sparkart at Level 5
```javascript
HP: ~21-23
Attack: ~14-16
Defense: ~12-14
Speed: ~16-18
Special: ~15-17
Moves: ["Spark"]
```

### Diesling at Level 5
```javascript
HP: ~23-25
Attack: ~13-15
Defense: ~16-18
Speed: ~12-14
Special: ~14-16
Moves: ["Tackle"]
```

Stats will vary slightly due to random IVs (0-15).

---

## Common Issues & Solutions

### Issue: Dialogue not advancing
**Solution:** Make sure you're pressing **Z** or **Enter** (mapped to 'a' action)

### Issue: Can't see selection highlight
**Solution:** Golden border should appear around selected egg. Try left/right to see it move.

### Issue: Game stuck on black screen
**Solution:** Check browser console (F12) for errors. All files should load without errors.

### Issue: Mobile controls not working
**Solution:** Make sure you're tapping the **A button** (not the egg directly)

### Issue: Stats don't match
**Solution:** Stats are random within a range due to IVs. Base stats are correct.

---

## Success Checklist

- [ ] Intro displays 7 dialogue boxes
- [ ] Pre-selection displays 3 dialogue boxes
- [ ] Three starters displayed as colored eggs
- [ ] Left/Right navigation works
- [ ] Description updates when navigating
- [ ] Selection highlight is visible (golden border)
- [ ] A button confirms selection
- [ ] Choice-based dialogue matches selected starter
- [ ] Post-selection displays 10 dialogue boxes
- [ ] Item notification appears (5 TRAINBALLS, 2 POTIONS)
- [ ] Game transitions to overworld
- [ ] Starter appears in party (top-left HP bar)
- [ ] All 3 starters work (Steamini, Sparkart, Diesling)
- [ ] Mobile touch controls work
- [ ] Save/load preserves starter

If all checkboxes pass: **✅ IMPLEMENTATION SUCCESSFUL**

---

## Quick Commands

### Start Test Server
```bash
cd /home/user/conducted && python3 -m http.server 8080
```

### Check for Errors
```bash
node -c js/intro.js && node -c js/game.js && node -c js/constants.js
```

### View Console Logs
Open browser DevTools: **F12** → **Console** tab

---

## Contact

Issues found? Report to **Integration Agent** with:
1. Which starter was selected
2. What happened (expected vs actual)
3. Browser console errors (if any)
4. Desktop or mobile

---

**Quick Test Time: 5-10 minutes per starter**

**Total Test Time: 15-30 minutes for all 3 starters**
