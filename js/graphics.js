// js/graphics.js
// Lightweight image/atlas loader + tile/sprite draw helpers for Canvas 2D.

export const TILE_SIZE = 16;

// --- image cache ---
const IMG_CACHE = new Map();
export function loadImage(src) {
  if (IMG_CACHE.has(src)) return IMG_CACHE.get(src);
  const p = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
  IMG_CACHE.set(src, p);
  return p;
}

// --- tileset loader ---
// If atlasJson is omitted, we assume a uniform grid with tileSize.
export async function loadTileset({ src, tileSize = TILE_SIZE, atlasJson = null }) {
  const image = await loadImage(src);
  const cols = Math.floor(image.width / tileSize);
  const rows = Math.floor(image.height / tileSize);
  return {
    src,
    image,
    tileSize,
    cols,
    rows,
    atlas: atlasJson, // optional { [name]: index } mapping
  };
}

// Draw a single tileIndex from tileset to (dx, dy) in pixels
export function drawTile(ctx, tileset, tileIndex, dx, dy) {
  if (tileIndex < 0) return; // -1 = empty/no-op
  const { image, tileSize, cols } = tileset;
  const sx = (tileIndex % cols) * tileSize;
  const sy = Math.floor(tileIndex / cols) * tileSize;
  ctx.drawImage(image, sx, sy, tileSize, tileSize, dx, dy, tileSize, tileSize);
}

// Draw a whole map layer of tile indices (2D array: [y][x])
export function drawMap(ctx, tileset, map, camera = { x: 0, y: 0 }, viewTilesW = 20, viewTilesH = 15) {
  const { tileSize } = tileset;
  const startX = Math.max(0, Math.floor(camera.x / tileSize));
  const startY = Math.max(0, Math.floor(camera.y / tileSize));
  const endX = Math.min(map.width, startX + viewTilesW + 1);
  const endY = Math.min(map.height, startY + viewTilesH + 1);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const idx = map.tiles[y][x];
      const dx = (x * tileSize) - camera.x;
      const dy = (y * tileSize) - camera.y;
      drawTile(ctx, map.tilesetRef, idx, dx, dy);
    }
  }
}

// Sprite helpers (battle/front/back or overworld objects)
export async function loadSprite(src) {
  const image = await loadImage(src);
  return { src, image, w: image.width, h: image.height };
}

export function drawSprite(ctx, sprite, dx, dy) {
  ctx.drawImage(sprite.image, dx, dy);
}
