# Art Prompts for Train Battle Sprites

Generated: 2025-11-02

## Purpose
Stable Diffusion prompts for generating 64x64 pixel art battle sprites for CONDUCTED starter trains. Each train needs:
- **Front view** (enemy perspective)
- **Back view** (player perspective)

## Style Guidelines
- Pixel art aesthetic (Game Boy Color era)
- 64x64 resolution
- 4-5 color palette per sprite
- Clear, readable silhouette
- Cute but slightly realistic train proportions
- Clean white/transparent background
- Simple, iconic design

---

## Steamini (Front)

**Positive prompt:**
```
pixel art, steam locomotive, cute, small, round boiler, smokestack puffing smoke, large wheels, cowcatcher, front view, game boy color palette, 64x64, white background, simple shapes, clean lines, iconic, train face visible, warm colors, red and black
```

**Negative prompt:**
```
blurry, photograph, photorealistic, 3d render, complex details, intricate, text, logo, watermark, multiple trains, side view, realistic proportions, gradient shading, modern train
```

---

## Steamini (Back)

**Positive prompt:**
```
pixel art, steam locomotive, cute, coal tender, rear view, back of train, game boy color palette, 64x64, white background, simple shapes, clean lines, iconic, warm colors, red and black, small details
```

**Negative prompt:**
```
blurry, photograph, photorealistic, 3d render, complex details, intricate, text, logo, watermark, multiple trains, front view, side view, realistic proportions, gradient shading, modern train
```

---

## Sparkart (Front)

**Positive prompt:**
```
pixel art, electric train, sleek, modern, yellow and blue color scheme, lightning bolt design, pantograph on top, streamlined nose, front view, game boy color palette, 64x64, white background, simple shapes, clean lines, iconic, bright colors, electric aesthetic
```

**Negative prompt:**
```
blurry, photograph, photorealistic, 3d render, complex details, intricate, text, logo, watermark, multiple trains, side view, steam train, diesel train, realistic proportions, gradient shading
```

---

## Sparkart (Back)

**Positive prompt:**
```
pixel art, electric train, sleek, modern, yellow and blue, rear view, back of train, electric pickup visible, pantograph, game boy color palette, 64x64, white background, simple shapes, clean lines, iconic, bright colors
```

**Negative prompt:**
```
blurry, photograph, photorealistic, 3d render, complex details, intricate, text, logo, watermark, multiple trains, front view, side view, steam train, diesel train, realistic proportions, gradient shading
```

---

## Diesling (Front)

**Positive prompt:**
```
pixel art, diesel locomotive, boxy, tough, industrial, exhaust stack, rectangular cab, front view, green and gray color scheme, game boy color palette, 64x64, white background, simple shapes, clean lines, iconic, solid construction
```

**Negative prompt:**
```
blurry, photograph, photorealistic, 3d render, complex details, intricate, text, logo, watermark, multiple trains, side view, steam train, electric train, realistic proportions, gradient shading, modern streamlined
```

---

## Diesling (Back)

**Positive prompt:**
```
pixel art, diesel locomotive, boxy, tough, rear diesel engine, back view, exhaust vents, green and gray, game boy color palette, 64x64, white background, simple shapes, clean lines, iconic, industrial aesthetic
```

**Negative prompt:**
```
blurry, photograph, photorealistic, 3d render, complex details, intricate, text, logo, watermark, multiple trains, front view, side view, steam train, electric train, realistic proportions, gradient shading
```

---

## Generation Notes

### Recommended Settings
- **Model:** SD 1.5 or SDXL with pixel art LoRA
- **Steps:** 20-30
- **CFG Scale:** 7-9
- **Sampler:** Euler A or DPM++ 2M
- **Resolution:** 512x512 (downscale to 64x64 after generation)

### Post-Processing
1. Generate at higher resolution (512x512)
2. Downscale to 64x64 using nearest-neighbor to preserve pixel art look
3. Reduce colors to 4-5 per sprite (posterize/index colors)
4. Remove background (make transparent)
5. Save as PNG with transparency

### ComfyUI Workflow
Reference `/DOCS/ART_WORKFLOW_SIMPLE.md` for the complete pipeline using local RTX 3080.

---

## Evolution Sprites (Future)

Once starters are complete, follow the same format for evolutions:
- Steamini → Locomotor → Railmaster
- Sparkart → Voltrain → Thunderail
- Diesling → Freightron → Cargodon

Each evolution should maintain visual continuity while increasing size/complexity slightly.
