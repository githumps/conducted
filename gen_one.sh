#!/bin/bash
cd /Users/evan/Documents/GitHub/conducted
curl -s -X POST "http://100.68.225.122:7860/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d @assets/prompts/queue/steamini-v4.json > /tmp/response.json

cat /tmp/response.json | jq -r '.images[0]' | base64 -d > assets/out/steamini-v4_001.png
echo "✅ Generated steamini-v4_001.png"
ls -lh assets/out/steamini-v4_001.png
