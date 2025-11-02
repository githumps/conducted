#!/bin/bash
# Generate all art assets using AUTOMATIC1111 API
# Uses curl and jq (built-in on macOS)

A1111_URL="http://100.68.225.122:7860"
QUEUE_DIR="assets/prompts/queue"
OUTPUT_DIR="assets/out"

mkdir -p "$OUTPUT_DIR"

echo "🎨 Art Generation Starting"
echo "======================================"

for prompt_file in "$QUEUE_DIR"/*.json; do
    name=$(basename "$prompt_file" .json)
    echo ""
    echo "Processing: $name"
    echo "--------------------------------------"

    # Extract values from JSON
    prompt=$(jq -r '.prompt' "$prompt_file")
    negative_prompt=$(jq -r '.negative_prompt' "$prompt_file")
    width=$(jq -r '.width' "$prompt_file")
    height=$(jq -r '.height' "$prompt_file")
    steps=$(jq -r '.steps' "$prompt_file")
    cfg_scale=$(jq -r '.cfg_scale' "$prompt_file")
    sampler_name=$(jq -r '.sampler_name' "$prompt_file")
    n_iter=$(jq -r '.n_iter' "$prompt_file")

    echo "Size: ${width}x${height}, Steps: $steps"
    echo "Generating $n_iter image(s)..."

    # Build JSON payload
    payload=$(cat <<EOF
{
  "prompt": "$prompt",
  "negative_prompt": "$negative_prompt",
  "width": $width,
  "height": $height,
  "steps": $steps,
  "cfg_scale": $cfg_scale,
  "sampler_name": "$sampler_name",
  "batch_size": 1,
  "n_iter": $n_iter,
  "seed": -1
}
EOF
)

    # Call API and save response
    response=$(curl -s -X POST "$A1111_URL/sdapi/v1/txt2img" \
        -H "Content-Type: application/json" \
        -d "$payload")

    # Check if successful
    if echo "$response" | jq -e '.images' > /dev/null 2>&1; then
        # Extract and save images
        image_count=$(echo "$response" | jq -r '.images | length')
        echo "✅ Generated $image_count image(s)"

        for i in $(seq 0 $((image_count - 1))); do
            img_data=$(echo "$response" | jq -r ".images[$i]")
            out_path="$OUTPUT_DIR/${name}_$(printf '%03d' $((i + 1))).png"
            echo "$img_data" | base64 -d > "$out_path"
            echo "   💾 Saved: $out_path"
        done
    else
        echo "❌ Error generating image"
        echo "$response" | head -5
    fi
done

echo ""
echo "======================================"
echo "✅ Art generation complete!"
echo "Check $OUTPUT_DIR/ for results"
echo "======================================"
