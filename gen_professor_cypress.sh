#!/bin/bash
# Generate Professor Cypress character sprite
# Style: Chibi pixel art professor/conductor character

API_URL="http://100.68.225.122:7860/sdapi/v1/txt2img"
OUTPUT_DIR="assets/sprites/characters"
mkdir -p "$OUTPUT_DIR"

echo "🎨 Generating Professor Cypress character sprite..."
echo "Model: pixelArtDiffusionXL_spriteShaper"
echo "LoRAs: fesba (0.8), chibi (0.7), | | (0.5)"
echo ""

# Generate batch of Professor Cypress sprites
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "cute chibi elderly professor conductor character, white hair, lab coat, friendly smile, wise expression, centered sprite, <lora:fesba:0.8>, <lora:chibi:0.7>, <lora:| |:0.5>",
    "negative_prompt": "text, watermark, blurry, deformed, depth of field, realistic, 3d render, outline, train tracks, scenery, background, landscape, grass, sky, rails, multiple objects, train vehicle, locomotive",
    "width": 512,
    "height": 512,
    "steps": 25,
    "cfg_scale": 7,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 12,
    "seed": -1,
    "override_settings": {
      "sd_model_checkpoint": "pixelArtDiffusionXL_spriteShaper.safetensors"
    }
  }' | \
python3 -c "
import sys, json, base64, os

data = json.load(sys.stdin)
if 'images' in data:
    for i, img_data in enumerate(data['images']):
        filename = f'$OUTPUT_DIR/professor-cypress-{i+1}.png'
        with open(filename, 'wb') as f:
            f.write(base64.b64decode(img_data))
        print(f'✅ Saved: {filename}')
    print(f'\n🎉 Generated {len(data[\"images\"])} Professor Cypress sprites!')
    print(f'📂 Check $OUTPUT_DIR/professor-cypress-*.png')
else:
    print('❌ Error: No images generated')
    print(json.dumps(data, indent=2))
"

echo ""
echo "🔍 Review sprites and pick the best one to use as professor-cypress.png"
