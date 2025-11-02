#!/bin/bash
# Master Art Generation Script
# Generates ALL art assets for Train Battle RPG using automatic1111

echo "🚂 TRAIN BATTLE RPG - COMPLETE ART GENERATION PIPELINE"
echo "======================================================="
echo ""
echo "This will generate:"
echo "  • Rival character sprites"
echo "  • NPC townspeople (6 types)"
echo "  • Trainer class sprites (6 types)"
echo "  • Starter train battle sprites (3 trains × 2 views)"
echo "  • World tilesets (7 biomes)"
echo "  • Interior tilesets (6 types)"
echo ""
echo "⚠️  WARNING: This will make ~200+ API calls to automatic1111"
echo "⚠️  Estimated time: 30-60 minutes (depending on GPU)"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 1
fi

echo ""
echo "🎯 Starting generation pipeline..."
echo ""

# 1. Characters
echo "════════════════════════════════════════"
echo "1/6: RIVAL CHARACTER"
echo "════════════════════════════════════════"
bash gen_rival_character.sh
echo ""

# 2. NPCs
echo "════════════════════════════════════════"
echo "2/6: NPC TOWNSPEOPLE"
echo "════════════════════════════════════════"
bash gen_npc_townspeople.sh
echo ""

# 3. Trainers
echo "════════════════════════════════════════"
echo "3/6: TRAINER CLASSES"
echo "════════════════════════════════════════"
bash gen_trainer_classes.sh
echo ""

# 4. Train sprites
echo "════════════════════════════════════════"
echo "4/6: STARTER TRAIN BATTLE SPRITES"
echo "════════════════════════════════════════"
bash gen_starter_train_sprites.sh
echo ""

# 5. World tilesets
echo "════════════════════════════════════════"
echo "5/6: WORLD TILESETS"
echo "════════════════════════════════════════"
bash gen_world_tilesets.sh
echo ""

# 6. Interior tilesets
echo "════════════════════════════════════════"
echo "6/6: INTERIOR TILESETS"
echo "════════════════════════════════════════"
bash gen_interior_tilesets.sh
echo ""

echo "════════════════════════════════════════"
echo "🎉 COMPLETE! All art assets generated!"
echo "════════════════════════════════════════"
echo ""
echo "📂 Assets saved to:"
echo "   • assets/sprites/characters/"
echo "   • assets/sprites/npcs/"
echo "   • assets/sprites/trainers/"
echo "   • assets/sprites/trains/"
echo "   • assets/tiles/generated/"
echo "   • assets/tiles/interiors-generated/"
echo ""
echo "🔍 Next steps:"
echo "   1. Review all generated sprites"
echo "   2. Pick the best variants"
echo "   3. Rename to proper filenames"
echo "   4. Integrate into game code"
echo ""
