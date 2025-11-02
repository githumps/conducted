#!/bin/bash
cd /Users/evan/Documents/GitHub/conducted

echo "🚂 GENERATING WITH PROPER SETUP!"
echo "Base: pixelArtDiffusionXL_spriteShaper"
echo "LoRAs: fesba, chibi, | |"
echo ""

# Steamini - cute baby steam locomotive
echo "🎨 Generating Steamini (steam train)..."
curl -s -X POST "http://100.68.225.122:7860/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "cute steam train, <lora:fesba:0.8>, <lora:chibi:0.6>, <lora:| |:0.5>",
    "negative_prompt": "text, watermark, blurry, deformed, depth of field, realistic, 3d render, outline",
    "width": 512,
    "height": 512,
    "steps": 25,
    "cfg_scale": 7,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 10,
    "seed": -1,
    "override_settings": {
      "sd_model_checkpoint": "pixelArtDiffusionXL_spriteShaper.safetensors"
    }
  }' > /tmp/steamini_proper.json

for i in 0 1 2 3 4 5 6 7 8 9; do
  cat /tmp/steamini_proper.json | jq -r ".images[$i]" | base64 -d > "assets/out/steamini-proper-$i.png"
done
echo "✅ Steamini (10 variations)"

# Sparkart - cute electric train
echo "🎨 Generating Sparkart (electric train)..."
curl -s -X POST "http://100.68.225.122:7860/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "cute electric train, <lora:fesba:0.8>, <lora:chibi:0.6>, <lora:| |:0.5>",
    "negative_prompt": "text, watermark, blurry, deformed, depth of field, realistic, 3d render, outline",
    "width": 512,
    "height": 512,
    "steps": 25,
    "cfg_scale": 7,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 10,
    "seed": -1,
    "override_settings": {
      "sd_model_checkpoint": "pixelArtDiffusionXL_spriteShaper.safetensors"
    }
  }' > /tmp/sparkart_proper.json

for i in 0 1 2 3 4 5 6 7 8 9; do
  cat /tmp/sparkart_proper.json | jq -r ".images[$i]" | base64 -d > "assets/out/sparkart-proper-$i.png"
done
echo "✅ Sparkart (10 variations)"

# Diesling - cute diesel locomotive
echo "🎨 Generating Diesling (diesel train)..."
curl -s -X POST "http://100.68.225.122:7860/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "cute diesel locomotive train, <lora:fesba:0.8>, <lora:chibi:0.6>, <lora:| |:0.5>",
    "negative_prompt": "text, watermark, blurry, deformed, depth of field, realistic, 3d render, outline",
    "width": 512,
    "height": 512,
    "steps": 25,
    "cfg_scale": 7,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 10,
    "seed": -1,
    "override_settings": {
      "sd_model_checkpoint": "pixelArtDiffusionXL_spriteShaper.safetensors"
    }
  }' > /tmp/diesling_proper.json

for i in 0 1 2 3 4 5 6 7 8 9; do
  cat /tmp/diesling_proper.json | jq -r ".images[$i]" | base64 -d > "assets/out/diesling-proper-$i.png"
done
echo "✅ Diesling (10 variations)"

echo ""
echo "🎉 30 TRAINS GENERATED WITH PROPER SETUP!"
echo "Checkpoint: pixelArtDiffusionXL_spriteShaper"
echo "LoRAs: fesba + chibi + | |"
ls -lh assets/out/*-proper-*.png | tail -10
