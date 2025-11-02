# Asset Pipeline (Local GPU)

Goal: generate retro pixel assets locally (RTX 3080) to save Claude tokens.

## Setup
- Install ComfyUI with a pixel-art model.
- Outputs: PNG with transparency.
- Folder targets:
  - Tiles → /assets/tiles/<biome>.png
  - Train sprites → /assets/sprites/<train>/<front|back>.png
  - UI → /assets/ui/

## Tileset Prompts
“16×16 pixel-art tileset for a cozy starter town (Piston Town): houses, rails, trees, roads, warm muted palette.”

Generate ~128 tiles; curate; keep index order stable.

## Train Sprites
“Pixel-art 64×64 front sprite of a cute steam locomotive (Steamini), 16-color palette.”

Generate front/back for each train. Store under /assets/sprites/<train>/.

## Integration
- Place PNGs under /assets/
- Reference in world-maps.js & battle.js
- Optionally export atlas JSON

## Audio
- Create chiptune loops (town, route, battle)
- Store under /assets/audio/

## Naming
Use version tags (piston-town.v1.png, etc.). Don’t delete old until merged.
