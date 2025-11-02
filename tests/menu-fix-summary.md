# Menu Navigation Fix Summary - 2025-11-02

## Bugs Fixed

### Root Cause
Menu submenus (BAG/SHOP) were displaying based ONLY on which menu item was highlighted (`menuSelection`), not whether they were actually opened with Enter.

### Changes Made

1. **Added submenu state tracking:**
   - `bagMode`: null | 'list' | 'use_on_train' (was always 'list')
   - `shopMode`: null | 'active' (new)

2. **Fixed updateMenu() logic (js/game.js):**
   - Line 945: SHOP submenu check now requires `shopMode === 'active'`
   - Line 1011: BAG submenu check now requires `bagMode` to be set
   - Line 1061-1063: Added SHOP Enter handler to set shopMode
   - Line 1059-1060: BAG Enter handler already sets bagMode
   - Line 967-968: SHOP exit clears shopMode
   - Line 1037-1038: BAG exit clears bagMode

3. **Fixed renderMenu() logic (js/game.js):**
   - Line 1097: SHOP rendering requires `shopMode === 'active'`
   - Line 1099: BAG rendering requires `bagMode` to be truthy

## Testing Status
- ✅ Code changes complete
- ⚠️  Playwright testing shows inconsistent behavior (may be input timing issue)
- 📋 Need manual browser testing to confirm

## Files Modified
- `/js/game.js` - Lines 45, 51, 945, 967-968, 1011, 1037-1038, 1061-1063, 1097, 1099

## Next Steps
- Manual testing in actual browser (not automated)
- If issues persist, investigate input event timing
