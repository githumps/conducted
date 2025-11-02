# CONDUCTED — M1 Implementation Plan (Rebuild)

Use this as the canonical plan for Milestone 1. One issue/PR per step, ≤150 LOC per PR.

## Step 1 — World Maps & Doors (Fixes #52)
Goal: Seamless town/interior/route transitions matching Gen 1 structure.
- Define 16×16 tile convention; centralize tile atlas reference under /assets/tiles
- Rebuild js/world-maps.js: explicit door/warp/link metadata
- Implement interior maps for Lab, Depot, Mart, House
- Add fade/snap transitions
- Tests: Enter/exit Lab, Depot, Mart; Route 1 works; touch D-pad intact

## Step 2 — Items & Catching (Fixes #51, #27)
Goal: Potions usable; Trainballs catch wild trains.
- player.js: Bag schema {key, qty}
- battle.js: Bag action → Potion (heal), Trainball (catch flow)
- Add catch flow logic (HP-based chance, messages)
- Tests: Potion restores HP; Trainball count decrements; catches added to party

## Step 3 — Money & Rail Mart (Fixes #53, #24)
Goal: Currency loop.
- player.js: money int; persist save/load
- Rewards from trainer wins; Mart NPC opens shop
- Shop: list items, prices, buy if enough
- Tests: Earn/spend money correctly

## Step 4 — Trainer Battles (Fixes #49)
Goal: Trainers that battle & pay out.
- world-maps.js: trainer placements, LoS triggers
- trainer roster data (JSON)
- battle.js: trainer intro, disable catching
- Tests: Aggro works; lose → respawn at Depot; win → payout

## Step 5 — Heal & Save Points (Fixes #23)
Goal: Train Depot heals & respawns.
- Depot interaction heals party, sets respawn
- Tests: Lose battle → respawn healed at last Depot

## Step 6 — UI/UX Polish (Fixes #57)
Goal: Retro menus & battle HUD.
- ui.js: Pause menu (Trains/Bag/Save/Options)
- Battle HUD: name/LV/HP bar
- Tests: Menu navigable via Start/touch

## Step 7 — Asset Pipeline (Fixes #65)
Goal: Local GPU asset generation.
- ComfyUI pixel-art pipeline (see ASSET_PIPELINE.md)
- Integrate atlas, train sprites
- Tests: Tiles load; no collisions broken

## QA
- Play intro → Route 1 → trainer → Mart → Depot
- XP, money, save/load, mobile OK
