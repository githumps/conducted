#!/bin/bash
# Generate Railyard Workers - INDUSTRIAL look
# NO CHIBI - Normal proportions like passengers

API_URL="http://100.68.225.122:7860/sdapi/v1/txt2img"
OUTPUT_DIR="assets/sprites/trainers"
mkdir -p "$OUTPUT_DIR"

echo "🎨 Generating Railyard Workers (Industrial)..."
echo "Model: pixelArtDiffusionXL_spriteShaper"
echo "NO CHIBI - Passenger-like proportions!"
echo ""

curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "pixel art character sprite, railyard worker, hard hat, tool belt, work boots, overalls, safety vest, industrial worker, grease stains, wrench, 3-4 heads tall proportions, full body, standing, <lora:fesba:0.9>",
    "negative_prompt": "text, watermark, blurry, deformed, realistic, 3d render, chibi, big head, oversized head, 2 heads tall, cartoon proportions, lab coat, scientist, clean clothes, formal wear, train tracks, scenery, background, train vehicle",
    "width": 512,
    "height": 512,
    "steps": 30,
    "cfg_scale": 7.5,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 15,
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
        filename = f'$OUTPUT_DIR/railyard-worker-v2-{i+1}.png'
        with open(filename, 'wb') as f:
            f.write(base64.b64decode(img_data))
        print(f'✅ Saved: {filename}')
    print(f'\n🎉 Generated {len(data[\"images\"])} Railyard Worker sprites!')
else:
    print('❌ Error: No images generated')
    print(json.dumps(data, indent=2))
"
