#!/bin/bash
cd /Users/evan/Documents/GitHub/conducted

echo "🎮 Generating REAL pixel art trains with fesba RPG Maker model!"

# Steamini - baby steam locomotive
curl -s -X POST "http://100.68.225.122:7860/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "pixel art baby steam locomotive train, rpg sprite, game asset, centered",
    "negative_prompt": "realistic, 3d, blurry, photo",
    "width": 512,
    "height": 512,
    "steps": 20,
    "cfg_scale": 7,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 8,
    "seed": -1,
    "override_settings": {
      "sd_model_checkpoint": "fesba.safetensors"
    }
  }' > /tmp/steamini_fesba.json

for i in 0 1 2 3 4 5 6 7; do
  cat /tmp/steamini_fesba.json | jq -r ".images[$i]" | base64 -d > "assets/out/steamini-fesba-$i.png"
done
echo "✅ Steamini (8 variations)"

# Sparkart - electric train
curl -s -X POST "http://100.68.225.122:7860/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "pixel art electric train, rpg sprite, game asset, centered",
    "negative_prompt": "realistic, 3d, blurry, photo",
    "width": 512,
    "height": 512,
    "steps": 20,
    "cfg_scale": 7,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 8,
    "seed": -1,
    "override_settings": {
      "sd_model_checkpoint": "fesba.safetensors"
    }
  }' > /tmp/sparkart_fesba.json

for i in 0 1 2 3 4 5 6 7; do
  cat /tmp/sparkart_fesba.json | jq -r ".images[$i]" | base64 -d > "assets/out/sparkart-fesba-$i.png"
done
echo "✅ Sparkart (8 variations)"

# Diesling - diesel locomotive
curl -s -X POST "http://100.68.225.122:7860/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "pixel art diesel locomotive train, rpg sprite, game asset, centered",
    "negative_prompt": "realistic, 3d, blurry, photo",
    "width": 512,
    "height": 512,
    "steps": 20,
    "cfg_scale": 7,
    "sampler_name": "Euler a",
    "batch_size": 1,
    "n_iter": 8,
    "seed": -1,
    "override_settings": {
      "sd_model_checkpoint": "fesba.safetensors"
    }
  }' > /tmp/diesling_fesba.json

for i in 0 1 2 3 4 5 6 7; do
  cat /tmp/diesling_fesba.json | jq -r ".images[$i]" | base64 -d > "assets/out/diesling-fesba-$i.png"
done
echo "✅ Diesling (8 variations)"

echo ""
echo "🎉 24 PIXEL ART TRAINS GENERATED!"
ls -lh assets/out/*-fesba-*.png | tail -10
