#!/usr/bin/env python3
"""
Generate all art assets using AUTOMATIC1111 API
Reads prompts from assets/prompts/queue/*.json
Outputs PNGs to assets/out/
"""

import json
import base64
import requests
from pathlib import Path

A1111_URL = "http://100.68.225.122:7860"
QUEUE_DIR = Path("assets/prompts/queue")
OUTPUT_DIR = Path("assets/out")

def generate_image(prompt_file):
    """Generate images from a prompt JSON file"""
    print(f"\n{'='*60}")
    print(f"Processing: {prompt_file.name}")
    print(f"{'='*60}")

    with open(prompt_file, 'r') as f:
        spec = json.load(f)

    # Build API payload
    payload = {
        "prompt": spec["prompt"],
        "negative_prompt": spec["negative_prompt"],
        "width": spec["width"],
        "height": spec["height"],
        "steps": spec["steps"],
        "cfg_scale": spec["cfg_scale"],
        "sampler_name": spec["sampler_name"],
        "batch_size": spec["batch_size"],
        "n_iter": spec["n_iter"],
        "seed": spec["seed"]
    }

    print(f"Prompt: {spec['prompt'][:80]}...")
    print(f"Size: {spec['width']}x{spec['height']}, Steps: {spec['steps']}")
    print(f"Generating {spec['n_iter']} image(s)...")

    # Call API
    response = requests.post(f"{A1111_URL}/sdapi/v1/txt2img", json=payload, timeout=300)

    if response.status_code == 200:
        result = response.json()
        images = result.get("images", [])

        print(f"✅ Generated {len(images)} image(s)")

        # Save images
        for i, img_data in enumerate(images):
            img_bytes = base64.b64decode(img_data)
            out_path = OUTPUT_DIR / f"{spec['name']}_{i+1:03d}.png"
            with open(out_path, 'wb') as f:
                f.write(img_bytes)
            print(f"   💾 Saved: {out_path}")

        return True
    else:
        print(f"❌ Error {response.status_code}: {response.text[:200]}")
        return False

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    prompt_files = sorted(QUEUE_DIR.glob("*.json"))

    print(f"\n🎨 Art Generation Starting")
    print(f"Found {len(prompt_files)} prompt files")
    print(f"Output directory: {OUTPUT_DIR}")

    success_count = 0
    for prompt_file in prompt_files:
        if generate_image(prompt_file):
            success_count += 1

    print(f"\n{'='*60}")
    print(f"✅ Complete: {success_count}/{len(prompt_files)} successful")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
