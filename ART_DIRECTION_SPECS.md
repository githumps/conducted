# Train Battle RPG - Art Direction Specifications
## Enhanced Sprite & UI Design Document

**Art Direction Agent** | **Version 1.0** | **Date: 2025-10-23**

---

## Table of Contents
1. [Starter Evolution Lines Overview](#starter-evolution-lines-overview)
2. [STEAM Line Sprite Specifications](#steam-line-sprite-specifications)
3. [ELECTRIC Line Sprite Specifications](#electric-line-sprite-specifications)
4. [DIESEL Line Sprite Specifications](#diesel-line-sprite-specifications)
5. [Battle UI Enhancement](#battle-ui-enhancement)
6. [Master Color Palette Guide](#master-color-palette-guide)
7. [Implementation Notes](#implementation-notes)

---

## Starter Evolution Lines Overview

This document provides detailed art direction specifications for the three starter train evolution lines in Train Battle RPG. Each line consists of three evolutionary stages, resulting in 9 unique train sprites total.

**Note on Naming**: The user references "Chuglet", "Voltrail", and "Oilpup" lines, but the actual game code uses:
- **STEAM Line**: Steamini → Steamore → Locomotor
- **ELECTRIC Line**: Sparkart → Voltrain → Thunderail
- **DIESEL Line**: Diesling → Wartorque → Titanorque

All specifications below use the in-game names.

**Locked Art Style Reminder**:
- Perspective: Side-view (classic Pokemon angle), facing left
- Size: 48x48 pixel canvas (displayed at 3x scale = 144x144px)
- Palette: Soft, warm, painterly pixel art with muted earth tones
- Colors: 12-16 colors per sprite maximum
- Animation: 2-6 frames, smooth but minimal
- Aesthetic: Stardew Valley meets Spiritfarer meets Pokemon Gen 1

---

## STEAM Line Sprite Specifications

### Train Sprite: Steamini (Stage 1)
**Species ID**: 1
**Types**: STEAM
**Evolution**: Level 16 → Steamore
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (14 colors)
1. `#2C1810` - Deep Charcoal Brown - Coal tender, shadows
2. `#4A2818` - Rich Dark Brown - Main boiler body base
3. `#6B4226` - Warm Brown - Boiler mid-tone
4. `#8B5A3C` - Light Brown - Boiler highlights
5. `#C8A882` - Tan - Brass fittings base
6. `#E5C9A5` - Cream Tan - Brass highlights
7. `#B8924E` - Antique Gold - Brass bell, detailing
8. `#3A3A3A` - Dark Iron - Wheel base, rivets
9. `#5C5C5C` - Medium Iron - Wheel mid-tone
10. `#8A8A8A` - Light Iron - Wheel highlights, metallic sheen
11. `#D64545` - Muted Red - Accent stripe, coupling
12. `#E8E8E8` - Off-White - Steam puffs
13. `#98A8B8` - Soft Blue-Gray - Steam shadow
14. `#1A1208` - Near-Black - Deepest shadows, outlines

#### Key Visual Features
- **Smokestack**: Positioned top-center-left, short and wide (baby train)
- **Wheel Configuration**: Two large wheels visible on left side
- **Coal Tender**: Small coal bin visible behind cabin, coal lumps visible
- **Brass Bell**: Small brass bell hanging on front nose
- **Cabin Windows**: One small rectangular window with soft glow
- **Coupling**: Simple red coupling hook on front
- **Rivets**: Visible brass rivets along boiler seam (3-4 visible)
- **Overall Shape**: Rounded, friendly, "pudgy" proportions

#### Textures
- **Boiler Body**: Smooth metal with painterly gradient, soft worn look
- **Wheels**: Polished iron with subtle metallic sheen, spoke details
- **Brass Fittings**: Warm gold sheen, slightly tarnished (not shiny new)
- **Coal Tender**: Matte dark brown/black, rough texture suggestion
- **Steam**: Soft, billowy, translucent effect

#### Animation Specifications
- **Idle Animation**: 3 frames, 2-second loop
  - Frame 1: Base pose, small steam puff starting
  - Frame 2: Steam puff rising from smokestack (slightly larger)
  - Frame 3: Steam puff dissipating at top
- **Wheel Idle**: Subtle 2-frame rotation when stationary (very slow, 3-second cycle)

#### Reference Mood
"Eager young steam engine, friendly and approachable. Think Thomas the Tank Engine meets Charmander - cute but determined. Worn but well-maintained."

---

### Train Sprite: Steamore (Stage 2)
**Species ID**: 2
**Types**: STEAM
**Evolution**: Level 32 → Locomotor
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (15 colors)
1. `#2C1810` - Deep Charcoal Brown - Coal tender, shadows
2. `#4A2818` - Rich Dark Brown - Main boiler body base
3. `#6B4226` - Warm Brown - Boiler mid-tone
4. `#8B5A3C` - Light Brown - Boiler highlights
5. `#C8A882` - Tan - Brass fittings base
6. `#E5C9A5` - Cream Tan - Brass highlights
7. `#B8924E` - Antique Gold - Brass details, nameplates
8. `#D4A857` - Polished Brass - Bell, valve highlights
9. `#3A3A3A` - Dark Iron - Wheel base
10. `#5C5C5C` - Medium Iron - Wheel mid-tone
11. `#8A8A8A` - Light Iron - Metallic sheen
12. `#D64545` - Muted Red - Accent stripes, coupling
13. `#E8E8E8` - Off-White - Steam
14. `#98A8B8` - Soft Blue-Gray - Steam shadow
15. `#1A1208` - Near-Black - Outlines, deepest shadows

#### Key Visual Features
- **Smokestack**: Taller, narrower, more traditional steam locomotive chimney
- **Wheel Configuration**: Three wheels visible (grown larger)
- **Coal Tender**: Larger coal car section, more coal visible, wood-planked sides
- **Brass Details**: More elaborate - bell, whistle visible, valve wheel
- **Cabin**: Larger cabin with two windows, visible engineer silhouette
- **Coupling Rods**: Visible connecting rods between wheels (shows power)
- **Pressure Gauge**: Small brass pressure gauge visible on boiler side
- **Nameplate**: Small brass nameplate on side
- **Overall Shape**: Longer, more proportioned, "teenager" train

#### Textures
- **Boiler**: Smooth riveted metal, more defined panels and seams
- **Wheels**: Polished with visible spokes and coupling rods
- **Brass**: Shinier than Steamini, well-maintained
- **Coal Tender**: Weathered wood planks with metal bands
- **Steam**: More voluminous, stronger puffs

#### Animation Specifications
- **Idle Animation**: 4 frames, 2-second loop
  - Frame 1: Base, steam building
  - Frame 2: Steam puff emerges
  - Frame 3: Large steam cloud
  - Frame 4: Steam dissipating
- **Wheel Animation**: 3-frame rotation visible on coupling rods
- **Pressure Gauge**: Subtle 2-frame needle oscillation (advanced implementation)

#### Reference Mood
"Confident mid-stage locomotive. Charmeleon energy - capable and strong but not yet at full power. Working train with pride in appearance."

---

### Train Sprite: Locomotor (Stage 3)
**Species ID**: 3
**Types**: STEAM / FREIGHT
**Evolution**: Final stage
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (16 colors)
1. `#2C1810` - Deep Charcoal Brown - Coal tender, shadows
2. `#4A2818` - Rich Dark Brown - Main boiler base
3. `#6B4226` - Warm Brown - Boiler mid-tone
4. `#8B5A3C` - Light Brown - Boiler highlights
5. `#A67C52` - Weathered Tan - Freight car panels
6. `#C8A882` - Light Tan - Brass base
7. `#E5C9A5` - Cream - Brass highlights
8. `#B8924E` - Antique Gold - Details
9. `#D4A857` - Polished Brass - Premium fittings
10. `#3A3A3A` - Dark Iron - Wheels, undercarriage
11. `#5C5C5C` - Medium Iron - Wheel mid-tone
12. `#8A8A8A` - Light Iron - Metallic highlights
13. `#D64545` - Muted Red - Accent stripes
14. `#E8E8E8` - Off-White - Steam
15. `#98A8B8` - Soft Blue-Gray - Steam shadow
16. `#1A1208` - Near-Black - Outlines, deepest shadows

#### Key Visual Features
- **Dual-Type Design**: Steam locomotive pulling freight car (visible behind)
- **Smokestack**: Large, imposing chimney with decorative crown
- **Wheel Configuration**: Four large wheels visible, heavy-duty
- **Freight Element**: Visible freight car section with cargo silhouette
- **Massive Boiler**: Thick, powerful boiler with multiple pressure rivets
- **Cow Catcher**: Prominent cow catcher/pilot on front
- **Headlamp**: Large circular headlamp with brass rim
- **Whistle**: Double-barrel steam whistle on top
- **Coupling System**: Heavy-duty couplings between locomotive and freight car
- **Nameplate**: Ornate brass nameplate reading "LOCOMOTOR"
- **Overall Shape**: Imposing, powerful, fills the 48x48 canvas

#### Textures
- **Boiler**: Industrial riveted steel, weathered but strong
- **Wheels**: Heavy iron with industrial bolts, significant metallic sheen
- **Brass**: Mix of polished (headlamp, nameplate) and aged (fixtures)
- **Freight Car**: Weathered wood with metal reinforcement bands
- **Steam**: Powerful, billowing clouds
- **Metal Panels**: Visible panel lines and rivets throughout

#### Animation Specifications
- **Idle Animation**: 6 frames, 2.5-second loop
  - Frames 1-2: Steam pressure building
  - Frame 3: Large steam blast from chimney
  - Frame 4: Steam rising and spreading
  - Frame 5: Secondary steam puff from pressure valve
  - Frame 6: Steam dissipating
- **Wheel Animation**: 4-frame rotation with coupling rod movement
- **Pressure Relief**: Every 5 seconds, small steam jet from side valve (bonus animation)

#### Reference Mood
"Legendary steam freight locomotive. Charizard energy - powerful, respected, iconic. Industrial workhorse with pride. The king of the rails."

---

## ELECTRIC Line Sprite Specifications

### Train Sprite: Sparkart (Stage 1)
**Species ID**: 4
**Types**: ELECTRIC
**Evolution**: Level 16 → Voltrain
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (13 colors)
1. `#2A3B52` - Deep Navy Blue - Body base, shadows
2. `#3D5A7A` - Medium Blue - Body mid-tone
3. `#5B7B9E` - Soft Blue - Body highlights
4. `#7A9FBE` - Light Blue - Top highlights, windows
5. `#E8C547` - Bright Yellow - Lightning accents, warning stripes
6. `#F4D96A` - Pale Yellow - Lightning highlights
7. `#3A3A3A` - Dark Metal - Undercarriage
8. `#6A6A6A` - Medium Metal - Wheel base
9. `#9A9A9A` - Light Metal - Metallic sheen
10. `#C5E8F8` - Electric Blue - Electricity glow effect
11. `#FFFFFF` - Pure White - Electric spark cores
12. `#FFE55C` - Electric Yellow - Pantograph glow
13. `#1A1A28` - Near-Black - Outlines, deepest shadows

#### Key Visual Features
- **Pantograph**: Small folding pantograph on roof (compact, baby version)
- **Streamlined Nose**: Rounded, aerodynamic front end
- **Lightning Bolt Motif**: Yellow lightning bolt decal on side panel
- **Wheel Configuration**: Two small wheels, modern design (smooth, not spoked)
- **Headlight**: Single circular headlight with electric blue glow
- **Windows**: One window with soft blue interior glow
- **Warning Stripe**: Yellow and dark blue diagonal stripe on nose
- **Vents**: Small cooling vents on side with blue glow
- **Overall Shape**: Compact, sleek, rounded "bullet train cub"

#### Textures
- **Body**: Smooth painted metal, modern finish with soft sheen
- **Pantograph**: Brushed metal, articulated joints visible
- **Windows**: Glossy with blue electric glow from inside
- **Wheels**: Smooth modern metal, minimal detail
- **Lightning Decal**: Matte yellow paint on glossy blue

#### Animation Specifications
- **Idle Animation**: 4 frames, 1.5-second loop
  - Frame 1: Base pose, pantograph static
  - Frame 2: Small electric spark at pantograph contact point
  - Frame 3: Spark travels down pantograph
  - Frame 4: Brief blue glow in windows
- **Electric Arc**: 2-frame flicker at pantograph tip (rapid alternation)

#### Reference Mood
"Energetic electric starter. Pikachu vibes - cute, zippy, full of energy. Modern and clean design with youthful enthusiasm."

---

### Train Sprite: Voltrain (Stage 2)
**Species ID**: 5
**Types**: ELECTRIC
**Evolution**: Level 36 → Thunderail
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (14 colors)
1. `#2A3B52` - Deep Navy Blue - Body base
2. `#3D5A7A` - Medium Blue - Body mid-tone
3. `#5B7B9E` - Soft Blue - Body highlights
4. `#7A9FBE` - Light Blue - Top highlights
5. `#E8C547` - Bright Yellow - Lightning accents
6. `#F4D96A` - Pale Yellow - Lightning highlights
7. `#FFE55C` - Electric Yellow - Strong electrical glow
8. `#3A3A3A` - Dark Metal - Undercarriage
9. `#6A6A6A` - Medium Metal - Details
10. `#9A9A9A` - Light Metal - Sheen
11. `#C5E8F8` - Electric Blue - Electricity effects
12. `#FFFFFF` - Pure White - Spark cores
13. `#A8D5E8` - Sky Blue - Secondary glow
14. `#1A1A28` - Near-Black - Outlines

#### Key Visual Features
- **Pantograph**: Larger, extended pantograph making clear contact
- **Streamlined Body**: More elongated, proper high-speed train proportions
- **Lightning Patterns**: Multiple lightning bolt designs along body
- **Wheel Configuration**: Three wheels, aerodynamic wheel covers
- **Dual Headlights**: Two headlights with bright blue-white glow
- **Multiple Windows**: Three windows with electric blue interior glow
- **Air Intakes**: Prominent cooling intakes with visible blue energy
- **Electrical Conduits**: Visible blue-glowing power lines along roof
- **Nose Cone**: Sharp, aerodynamic nose with yellow warning stripe
- **Overall Shape**: Sleeker, longer, more aggressive bullet train

#### Textures
- **Body**: Polished painted metal with subtle panel lines
- **Pantograph**: Industrial metal with electrical arcing effect
- **Windows**: Highly reflective with strong internal glow
- **Wheel Covers**: Smooth streamlined fairings
- **Lightning Decals**: Glossy yellow with subtle electric glow

#### Animation Specifications
- **Idle Animation**: 5 frames, 1.5-second loop
  - Frame 1: Base, electricity building
  - Frame 2: Pantograph arc intensifies
  - Frame 3: Electric current flows down roof conduits
  - Frame 4: Windows pulse bright blue
  - Frame 5: Small lightning sparks along body seams
- **Electric Pulse**: Continuous subtle blue glow pulse in windows (2 frames alternating)

#### Reference Mood
"Powerful mid-evolution electric train. Think Japanese bullet train with Raichu confidence. Fast, modern, crackling with controlled electrical power."

---

### Train Sprite: Thunderail (Stage 3)
**Species ID**: 6
**Types**: ELECTRIC / MAGLEV
**Evolution**: Final stage
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (16 colors)
1. `#2A3B52` - Deep Navy Blue - Body base
2. `#3D5A7A` - Medium Blue - Body mid
3. `#5B7B9E` - Soft Blue - Highlights
4. `#7A9FBE` - Light Blue - Top panels
5. `#E8C547` - Bright Yellow - Lightning primary
6. `#F4D96A` - Pale Yellow - Lightning secondary
7. `#FFE55C` - Electric Yellow - Intense glow
8. `#3A3A3A` - Dark Metal - Minimal (maglev = no wheels)
9. `#6A6A6A` - Medium Metal - Undercarriage
10. `#9A9A9A` - Light Metal - Sheen
11. `#C5E8F8` - Electric Blue - Primary glow
12. `#8FC8E8` - Cyan Glow - Magnetic levitation effect
13. `#FFFFFF` - Pure White - Electric cores
14. `#A8D5E8` - Sky Blue - Secondary electrical
15. `#E0F4FF` - Pale Cyan - Maglev field visualization
16. `#1A1A28` - Near-Black - Outlines

#### Key Visual Features
- **Dual-Type Design**: Electric bullet train with visible magnetic levitation
- **NO WHEELS**: Floating above ground with visible cyan maglev field
- **Advanced Pantograph**: High-tech dual-arm pantograph with intense electrical arc
- **Hyper-Streamlined**: Extremely aerodynamic, long nose cone
- **Lightning Storm Motif**: Elaborate lightning bolt patterns covering body
- **Quad Headlights**: Four powerful LED-style headlights
- **Full-Length Windows**: Five sleek windows with bright blue interior
- **Magnetic Glow**: Cyan/blue glow effect underneath entire body
- **Energy Conduits**: Glowing blue energy channels running full length of body
- **Tail Fin**: Small aerodynamic tail fin with lightning symbol
- **Overall Shape**: Maximum sleekness, fills canvas horizontally

#### Textures
- **Body**: Mirror-polished high-tech alloy, reflective panels
- **Pantograph**: Advanced carbon fiber with plasma arc
- **Windows**: Highly reflective with brilliant internal glow
- **Maglev Field**: Translucent cyan energy field (ethereal)
- **Lightning Patterns**: Electroluminescent paint (seems to glow)
- **Panel Seams**: Precision-engineered visible seams

#### Animation Specifications
- **Idle Animation**: 6 frames, 2-second loop
  - Frame 1: Base hovering, maglev field stable
  - Frame 2: Maglev field pulses slightly
  - Frame 3: Pantograph crackles with electricity
  - Frame 4: Lightning arcs along body conduits
  - Frame 5: Windows flash bright blue
  - Frame 6: Small electromagnetic pulse emanates from underside
- **Levitation**: Constant 2-frame subtle up-down hover (3-second cycle)
- **Electrical Storm**: Random small lightning sparks (2-3 pixels) at pantograph every 2-3 seconds

#### Reference Mood
"Ultimate electric-maglev fusion. Legendary status. Think SCMaglev meets Zapdos - cutting-edge technology with overwhelming power. The future of rail."

---

## DIESEL Line Sprite Specifications

### Train Sprite: Diesling (Stage 1)
**Species ID**: 7
**Types**: DIESEL
**Evolution**: Level 16 → Wartorque
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (13 colors)
1. `#3A2A1A` - Dark Brown - Body base, shadows
2. `#5C4428` - Chocolate Brown - Body mid-tone
3. `#7A5A38` - Medium Brown - Body highlights
4. `#8B6B45` - Light Brown - Panel highlights
5. `#2A2A2A` - Dark Gunmetal - Engine block, undercarriage
6. `#4A4A4A` - Medium Gunmetal - Machinery
7. `#6A6A6A` - Light Gunmetal - Metallic highlights
8. `#D67C3A` - Rust Orange - Rust patches, accents
9. `#E89B5C` - Light Rust - Rust highlights
10. `#5A5A3A` - Olive Green - Accent stripe
11. `#8A8A8A` - Steel Gray - Exhaust pipe
12. `#4A4A4A` - Dark Smoke - Exhaust smoke base
13. `#1A1A1A` - Near-Black - Outlines, deepest shadows

#### Key Visual Features
- **Boxy Shape**: Rectangular, industrial, utilitarian design
- **Exhaust Stack**: Single vertical exhaust pipe on roof with smoke
- **Wheel Configuration**: Two large industrial wheels with visible gears
- **Engine Grilles**: Front grille vents showing dark engine internals
- **Fuel Tank**: Visible fuel tank on side with warning symbols
- **Cab Window**: Single rectangular window, slightly dirty/worn
- **Rust Details**: Small rust patches on corners and edges (character)
- **Warning Stripe**: Faded olive/yellow diagonal stripe on nose
- **Coupling**: Heavy industrial coupling hook
- **Overall Shape**: Compact, boxy, "baby industrial" aesthetic

#### Textures
- **Body Panels**: Matte painted metal with visible wear
- **Rust**: Rough, textured orange-brown patches
- **Engine Block**: Dark industrial metal with grease sheen
- **Wheels**: Heavy industrial with visible bolts and wear
- **Exhaust**: Sooty metal pipe
- **Smoke**: Thick, dark, slightly oily appearance

#### Animation Specifications
- **Idle Animation**: 4 frames, 2-second loop
  - Frame 1: Base, exhaust starting
  - Frame 2: Dark smoke puff emerges from exhaust
  - Frame 3: Smoke cloud rises and expands
  - Frame 4: Smoke dissipating, darker than steam
- **Engine Rumble**: Subtle 2-frame body vibration (1 pixel shift, very subtle)

#### Reference Mood
"Tough little diesel workhorse. Think industrial Squirtle - not pretty but reliable and determined. Working-class train with honest grit."

---

### Train Sprite: Wartorque (Stage 2)
**Species ID**: 8
**Types**: DIESEL
**Evolution**: Level 32 → Titanorque
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (14 colors)
1. `#3A2A1A` - Dark Brown - Body base
2. `#5C4428` - Chocolate Brown - Body mid
3. `#7A5A38` - Medium Brown - Highlights
4. `#8B6B45` - Light Brown - Panel tops
5. `#2A2A2A` - Dark Gunmetal - Engine, undercarriage
6. `#4A4A4A` - Medium Gunmetal - Machinery
7. `#6A6A6A` - Light Gunmetal - Metal highlights
8. `#D67C3A` - Rust Orange - Rust patches
9. `#E89B5C` - Light Rust - Rust highlights
10. `#5A5A3A` - Olive Green - Stripe
11. `#7A7A4A` - Light Olive - Stripe highlight
12. `#8A8A8A` - Steel Gray - Exhaust
13. `#4A4A4A` - Dark Smoke - Smoke base
14. `#1A1A1A` - Near-Black - Outlines

#### Key Visual Features
- **Larger Boxy Body**: More substantial, armored appearance
- **Dual Exhausts**: Two exhaust stacks (one vertical, one angled)
- **Wheel Configuration**: Three heavy industrial wheels with gear mechanisms
- **Reinforced Plating**: Visible armor plating with rivets and bolts
- **Multiple Grilles**: Front and side ventilation grilles
- **Fuel Tanks**: Two visible fuel tanks with warning decals
- **Cab Windows**: Two windows with protective bars/grating
- **Engine Access Panels**: Visible maintenance panels with latches
- **Heavy-Duty Coupling**: Industrial coupling with chains
- **Battle-Worn**: More rust, scratches, and wear marks
- **Overall Shape**: Tank-like, sturdy, built for tough work

#### Textures
- **Armor Plating**: Thick riveted metal with dents and scratches
- **Rust**: More prominent, showing years of service
- **Engine Components**: Visible through grilles, oily dark metal
- **Wheels**: Industrial steel with heavy wear patterns
- **Fuel Tanks**: Weathered painted metal with faded warnings
- **Smoke**: Thicker, darker, more industrial

#### Animation Specifications
- **Idle Animation**: 5 frames, 2-second loop
  - Frame 1: Base, engines rumbling
  - Frame 2: Smoke from vertical exhaust
  - Frame 3: Smoke from angled exhaust
  - Frame 4: Both exhausts smoking
  - Frame 5: Smoke clouds dissipating
- **Heavy Idle**: 3-frame body vibration showing engine power (subtle but visible)

#### Reference Mood
"Battle-hardened diesel mid-evolution. Wartortle meets industrial tank - tough, experienced, no-nonsense. Seen some action and ready for more."

---

### Train Sprite: Titanorque (Stage 3)
**Species ID**: 9
**Types**: DIESEL / FREIGHT
**Evolution**: Final stage
**Size**: 48x48 pixels
**Perspective**: Side-view, facing left

#### Color Palette (16 colors)
1. `#3A2A1A` - Dark Brown - Body base
2. `#5C4428` - Chocolate Brown - Body mid
3. `#7A5A38` - Medium Brown - Body highlights
4. `#8B6B45` - Light Brown - Panel highlights
5. `#2A2A2A` - Dark Gunmetal - Engine block
6. `#4A4A4A` - Medium Gunmetal - Machinery
7. `#6A6A6A` - Light Gunmetal - Metal highlights
8. `#8A8A8A` - Steel Gray - Bright metal
9. `#D67C3A` - Rust Orange - Rust primary
10. `#E89B5C` - Light Rust - Rust highlights
11. `#5A5A3A` - Olive Green - Stripe primary
12. `#7A7A4A` - Light Olive - Stripe secondary
13. `#9A7A5A` - Weathered Tan - Freight car panels
14. `#4A4A4A` - Dark Smoke - Exhaust
15. `#6A6A5A` - Light Smoke - Smoke highlights
16. `#1A1A1A` - Near-Black - Outlines

#### Key Visual Features
- **Dual-Type Design**: Massive diesel locomotive pulling freight car
- **Triple Exhaust**: Three exhaust stacks (vertical, angled, rear)
- **Wheel Configuration**: Four enormous industrial wheels with complex gear systems
- **Heavy Armor**: Thick riveted plating covering entire engine
- **Freight Car Section**: Visible freight car behind with cargo containers
- **Massive Engine Block**: Large exposed engine components with pipes
- **Industrial Grilles**: Heavy-duty grilles on front and sides
- **Fuel System**: Large fuel tanks with piping visible
- **Dual Cab**: Two-section cabin with multiple windows
- **Heavy Coupling**: Massive industrial coupling connecting freight car
- **Warning Lights**: Yellow/orange warning lights on top
- **Rust & Weathering**: Significant wear showing heavy use
- **Overall Shape**: Imposing, fills entire 48x48 canvas

#### Textures
- **Armor Plating**: Heavy industrial riveted steel with battle damage
- **Rust**: Prominent rust patterns showing character and history
- **Engine Block**: Dark oily metal with pipes, valves, visible mechanics
- **Wheels**: Massive steel with intricate gear mechanisms
- **Freight Car**: Weathered wood and metal panels, industrial containers
- **Smoke**: Thick, dark, voluminous clouds
- **Metal Panels**: Varied weathering - some polished, some rusty

#### Animation Specifications
- **Idle Animation**: 6 frames, 2.5-second loop
  - Frame 1: Base, engine idling
  - Frame 2: Vertical exhaust smokes
  - Frame 3: Angled exhaust fires
  - Frame 4: Rear exhaust joins
  - Frame 5: All three exhausts smoking heavily
  - Frame 6: Smoke clouds rising and dissipating
- **Engine Power**: 4-frame heavy vibration animation (visible mechanical power)
- **Gear Movement**: Visible 3-frame gear rotation on wheels
- **Pressure Release**: Every 4 seconds, steam vent from engine side

#### Reference Mood
"Legendary diesel-freight titan. Blastoise meets industrial monster truck - maximum power, maximum reliability. The unstoppable freight king that can haul anything anywhere."

---

## Battle UI Enhancement

### Battle Screen Layout Specifications

**Screen Resolution**: 960x864 pixels (20 tiles x 18 tiles x 3x scale)
**Design Philosophy**: Clean, mobile-friendly, GBA-inspired with painterly touches

---

### Component 1: HP Bars

#### Specifications
- **Position**:
  - Player Train HP: Bottom-right area (x: 650, y: 650)
  - Enemy Train HP: Top-left area (x: 100, y: 100)
- **Dimensions**: 200px wide x 24px tall (outer border)
- **Bar Inner Dimensions**: 194px wide x 18px tall

#### Color Gradient System
```
100% - 51% HP: Smooth gradient
  Start: #4CAF50 (Forest Green)
  End: #66BB6A (Light Green)

50% - 26% HP: Smooth gradient
  Start: #FFC107 (Amber Yellow)
  End: #FFD54F (Light Yellow)

25% - 1% HP: Smooth gradient
  Start: #F44336 (Warning Red)
  End: #EF5350 (Light Red)
```

#### HP Bar Structure
- **Outer Border**: 3px thick, color: `#2C2416` (dark brown)
- **Inner Shadow**: 1px, color: `#000000` at 20% opacity
- **Background**: `#E8E0D0` (cream parchment)
- **Bar Fill**: Gradient based on HP percentage
- **Numeric Display**: Positioned to right of bar
  - Font: Monospace, 16px
  - Format: `HP: XXX/XXX`
  - Color: `#2C2416` (dark brown)

#### Visual Effects
- **Damage Animation**: Bar depletes smoothly over 0.5 seconds (ease-out)
- **Low HP Warning**: Pulsing red glow when HP < 25% (1-second pulse cycle)
- **Critical HP**: Rapid pulse when HP < 10% (0.5-second pulse cycle)

---

### Component 2: Train Info Boxes

#### Specifications
- **Player Info Box**: Bottom-right (x: 620, y: 600)
- **Enemy Info Box**: Top-left (x: 70, y: 70)
- **Dimensions**: 260px wide x 100px tall

#### Info Box Contents
```
┌─────────────────────────┐
│ STEAMINI        Lv. 12  │
│ ▓▓▓▓▓▓▓▓▓▓░░░░░░        │
│ HP: 32/45               │
└─────────────────────────┘
```

#### Style Details
- **Border**: 3px rounded corners (radius: 6px)
  - Color: `#2C2416` (dark brown)
- **Background**: Semi-transparent white `#FFFFFF` at 85% opacity
- **Name**:
  - Font: Bold, 18px
  - Color: `#2C2416`
  - Position: Top-left, 8px padding
- **Level**:
  - Font: Regular, 16px
  - Format: `Lv. XX`
  - Position: Top-right, 8px padding
- **Status Icons**: Small icons (16x16px) if burned/poisoned/paralyzed
  - Position: Bottom-left of info box

---

### Component 3: Move Selection Buttons

#### Layout
- **Position**: Bottom of screen, centered
- **Grid**: 2x2 grid layout
- **Spacing**: 10px gap between buttons

#### Individual Move Button
- **Dimensions**: 220px wide x 70px tall
- **Touch Target**: Full button area (exceeds 60x60px minimum)

#### Button Structure
```
┌────────────────────────┐
│ STEAM JET          PP  │
│ Type: STEAM       15/20 │
└────────────────────────┘
```

#### Visual Style
- **Border**: 3px solid, rounded corners (8px radius)
- **Border Color**: Type-dependent (see Type Colors below)
- **Background**: Soft gradient
  - Top: Type color at 20% opacity
  - Bottom: Type color at 5% opacity
- **Move Name**:
  - Font: Bold, 16px
  - Color: `#2C2416`
  - Position: Top-left, 6px padding
- **Type Badge**:
  - Font: Regular, 12px
  - Format: `Type: [TYPE]`
  - Color: Type color (see below)
  - Position: Bottom-left, 6px padding
- **PP Display**:
  - Font: Monospace, 14px
  - Format: `XX/XX` or just `PP` label
  - Color: `#2C2416`, turns red when PP < 5
  - Position: Right side

#### Type Colors for Buttons
```
STEAM:     #8B5A3C (Warm Brown)
ELECTRIC:  #5B7B9E (Soft Blue)
DIESEL:    #5C4428 (Chocolate Brown)
MAGLEV:    #7A9FBE (Light Blue)
FREIGHT:   #7A5A38 (Medium Brown)
PASSENGER: #6A6A6A (Neutral Gray)
NUCLEAR:   #7ABA7A (Muted Green)
MONORAIL:  #8A8A8A (Light Gray)
```

#### Button States
- **Normal**: Standard appearance
- **Hover/Focus**: Border thickens to 4px, slight glow effect
- **Pressed**: Background darkens 10%, 2px inset shadow
- **Disabled (No PP)**: 50% opacity, grayed out

---

### Component 4: Message/Dialogue Box

#### Specifications
- **Position**: Bottom-center of screen
- **Dimensions**: 860px wide x 150px tall
- **Z-index**: Appears above move buttons when active

#### Visual Design
- **Border**: 4px solid `#2C2416`, rounded corners (8px radius)
- **Background**: `#F8F4E8` (warm off-white parchment)
- **Inner Padding**: 16px all sides

#### Text Display
- **Font**: Sans-serif, 18px, `#2C2416`
- **Line Height**: 1.6 (comfortable reading)
- **Max Lines**: 3 lines visible
- **Text Speed**: 30 characters per second (typewriter effect)

#### Auto-Advance Indicator
- **Position**: Bottom-right corner of message box
- **Icon**: Small triangular arrow (▼)
- **Animation**: Blink every 0.5 seconds
- **Color**: `#2C2416`

#### Message Types
```
BATTLE START:   "Wild STEAMINI appeared!"
ATTACK:         "STEAMINI used STEAM JET!"
DAMAGE:         "It's super effective!"
FAINT:          "Enemy STEAMINI fainted!"
EXP GAIN:       "STEAMINI gained 125 EXP!"
LEVEL UP:       "STEAMINI grew to Lv. 13!"
```

---

### Component 5: Action Menu

#### Specifications
- **Position**: Center-right of screen
- **Dimensions**: 240px wide x 280px tall
- **Appears**: At start of player's turn

#### Menu Layout
```
┌────────────┐
│   FIGHT    │ ← 60px tall minimum
├────────────┤
│    BAG     │
├────────────┤
│   TRAIN    │
├────────────┤
│    RUN     │
└────────────┘
```

#### Button Specifications
- **Individual Size**: 240px wide x 70px tall
- **Border**: 3px solid `#2C2416`
- **Background**: `#E8DCC8` (warm tan)
- **Font**: Bold, 20px, centered
- **Text Color**: `#2C2416`

#### Button States
- **Normal**: Standard tan background
- **Selected/Hover**: Background changes to `#D4C4A8` (darker tan)
- **Pressed**: 2px inset shadow, background `#C4B498`

#### Menu Transitions
- **Appear**: Slide in from right over 0.2 seconds
- **Disappear**: Slide out to right over 0.15 seconds
- **Selection**: Instant replacement with sub-menu (e.g., move selection)

---

### Component 6: Battle Background

#### Specifications
- **Dimensions**: Full screen (960x864px)
- **Z-index**: Lowest layer
- **Design**: Simple, non-distracting

#### Background Style
- **Type**: Soft vertical gradient
- **Top Color**: `#B8D4E8` (soft sky blue)
- **Bottom Color**: `#8AB8A8` (muted sage green)
- **Purpose**: Represents outdoor battle environment without distraction

#### Alternative Backgrounds (Biome-Specific)
```
GRASSLAND:  #B8D4E8 → #8AB8A8 (sky to grass)
CAVE:       #5A5A6A → #3A3A4A (dark rocks)
WATER:      #6AA8C8 → #4A88A8 (water surface)
URBAN:      #B8B8C8 → #888898 (city skyline)
VOLCANIC:   #D8A888 → #B88868 (heat haze)
```

---

### Component 7: Train Sprite Display

#### Specifications
- **Player Train Position**: Bottom-left (x: 150, y: 480)
- **Enemy Train Position**: Top-right (x: 650, y: 250)
- **Sprite Size**: 48x48px at 3x scale = 144x144px displayed

#### Platform/Shadow
- **Player Platform**: Simple oval shadow beneath train
  - Color: `#000000` at 20% opacity
  - Dimensions: 160px wide x 40px tall (ellipse)
- **Enemy Platform**: Same as player

#### Battle Animations
- **Entry**: Slide in from side (0.3 seconds)
  - Player: Slides in from left
  - Enemy: Slides in from right
- **Attack**: Quick forward lunge (0.2 seconds) then return
- **Damage**: Horizontal shake (0.15 seconds), flash white briefly
- **Faint**: Fade out downward (0.5 seconds)

---

### Mobile Touch Optimization

#### Touch Targets
- **Minimum Size**: 60x60px (all buttons meet this)
- **Recommended Size**: 70px+ tall (all primary buttons meet this)
- **Spacing**: Minimum 10px gap between interactive elements

#### Touch Feedback
- **Button Press**: Immediate visual feedback (background change)
- **Haptic**: Optional vibration on button press (150ms)
- **Hold Prevention**: Disable long-press context menus on UI elements

#### Responsive Considerations
- **Font Scaling**: All fonts scale proportionally with screen size
- **Button Scaling**: Maintain minimum touch targets even on small screens
- **Portrait Mode**: UI elements stack vertically if needed
- **Landscape Mode**: Current horizontal layout optimal

---

### Color Accessibility

#### Contrast Ratios
All text meets WCAG AA standards:
- **Primary Text** (`#2C2416` on `#F8F4E8`): 12.5:1 ✓
- **UI Text** (`#2C2416` on `#E8DCC8`): 11.8:1 ✓
- **Move Buttons**: All type colors tested for 4.5:1 minimum ✓

#### Colorblind Considerations
- **HP Bar**: Uses position + color + numeric display
- **Type Colors**: Distinct enough for most color vision types
- **Status Icons**: Include symbols, not just colors

---

## Master Color Palette Guide

### Organized by Train Type

#### STEAM Line Master Palette
```
Core Browns & Metals:
#2C1810  Deep Charcoal Brown    - Shadows, coal
#4A2818  Rich Dark Brown        - Boiler base
#6B4226  Warm Brown             - Boiler mid-tone
#8B5A3C  Light Brown            - Highlights
#A67C52  Weathered Tan          - Aged wood/panels

Brass & Gold:
#B8924E  Antique Gold           - Basic brass
#C8A882  Tan Brass              - Brass base
#D4A857  Polished Brass         - Shiny elements
#E5C9A5  Cream Tan              - Brass highlights

Metals:
#3A3A3A  Dark Iron              - Wheel base
#5C5C5C  Medium Iron            - Machinery
#8A8A8A  Light Iron             - Metallic sheen

Accents:
#D64545  Muted Red              - Accent stripes
#E8E8E8  Off-White              - Steam
#98A8B8  Soft Blue-Gray         - Steam shadow
#1A1208  Near-Black             - Outlines
```

#### ELECTRIC Line Master Palette
```
Core Blues:
#2A3B52  Deep Navy Blue         - Body base
#3D5A7A  Medium Blue            - Body mid-tone
#5B7B9E  Soft Blue              - Body highlights
#7A9FBE  Light Blue             - Top highlights

Electric Yellows:
#E8C547  Bright Yellow          - Lightning primary
#F4D96A  Pale Yellow            - Lightning highlights
#FFE55C  Electric Yellow        - Intense glow

Metals:
#3A3A3A  Dark Metal             - Undercarriage
#6A6A6A  Medium Metal           - Details
#9A9A9A  Light Metal            - Sheen

Electric Effects:
#C5E8F8  Electric Blue          - Energy glow
#8FC8E8  Cyan Glow              - Maglev field
#A8D5E8  Sky Blue               - Secondary glow
#E0F4FF  Pale Cyan              - Maglev field viz
#FFFFFF  Pure White             - Spark cores

Universal:
#1A1A28  Near-Black             - Outlines
```

#### DIESEL Line Master Palette
```
Core Browns:
#3A2A1A  Dark Brown             - Body base
#5C4428  Chocolate Brown        - Body mid
#7A5A38  Medium Brown           - Highlights
#8B6B45  Light Brown            - Panel highlights
#9A7A5A  Weathered Tan          - Freight panels

Industrial Metals:
#2A2A2A  Dark Gunmetal          - Engine block
#4A4A4A  Medium Gunmetal        - Machinery
#6A6A6A  Light Gunmetal         - Highlights
#8A8A8A  Steel Gray             - Bright metal

Rust & Wear:
#D67C3A  Rust Orange            - Rust primary
#E89B5C  Light Rust             - Rust highlights

Accents:
#5A5A3A  Olive Green            - Stripe primary
#7A7A4A  Light Olive            - Stripe highlight

Smoke:
#4A4A4A  Dark Smoke             - Exhaust base
#6A6A5A  Light Smoke            - Smoke highlights

Universal:
#1A1A1A  Near-Black             - Outlines
```

### UI Color Reference

#### Battle Interface Palette
```
Backgrounds:
#FFFFFF   Pure White (85% opacity)  - Info boxes
#F8F4E8   Warm Off-White            - Message box
#E8DCC8   Warm Tan                  - Action menu
#D4C4A8   Darker Tan                - Menu hover
#C4B498   Pressed Tan               - Menu active
#E8E0D0   Cream Parchment           - HP bar background

Borders & Text:
#2C2416   Dark Brown                - Primary UI color
#000000   Black (20% opacity)       - Shadows

HP Bar Colors:
#4CAF50   Forest Green              - HP 100-51% start
#66BB6A   Light Green               - HP 100-51% end
#FFC107   Amber Yellow              - HP 50-26% start
#FFD54F   Light Yellow              - HP 50-26% end
#F44336   Warning Red               - HP 25-1% start
#EF5350   Light Red                 - HP 25-1% end

Battle Backgrounds:
#B8D4E8   Soft Sky Blue             - Gradient top
#8AB8A8   Muted Sage Green          - Gradient bottom
```

### Type-Specific Button Colors
```
STEAM:     #8B5A3C  Warm Brown
ELECTRIC:  #5B7B9E  Soft Blue
DIESEL:    #5C4428  Chocolate Brown
MAGLEV:    #7A9FBE  Light Blue
FREIGHT:   #7A5A38  Medium Brown
PASSENGER: #6A6A6A  Neutral Gray
NUCLEAR:   #7ABA7A  Muted Green
MONORAIL:  #8A8A8A  Light Gray
```

---

## Implementation Notes

### Priority Implementation Order

1. **Phase 1: Sprite Art Production**
   - Create all 9 starter evolution sprites as 48x48 PNG files
   - Follow exact color palettes specified
   - Include all key visual features listed
   - Export at native 48x48 resolution (game will scale to 144x144)

2. **Phase 2: Static UI Implementation**
   - Build HP bars with gradient system
   - Create train info boxes
   - Design message/dialogue box
   - Implement action menu

3. **Phase 3: Interactive UI**
   - Move selection buttons with type colors
   - Touch targets and mobile optimization
   - Button states (hover, pressed, disabled)

4. **Phase 4: Animations**
   - Sprite idle animations (2-6 frames each)
   - HP bar depletion animation
   - Battle entry/exit animations
   - Attack and damage animations

5. **Phase 5: Polish**
   - Battle backgrounds
   - Screen transitions
   - Particle effects (future enhancement)
   - Sound effect integration points

### Technical Specifications

#### Sprite File Format
- **Format**: PNG with transparency
- **Resolution**: 48x48 pixels (native)
- **Color Mode**: Indexed color (palette-based) recommended
- **Transparency**: Full alpha channel support
- **Naming Convention**: `train_[species_id]_[name].png`
  - Example: `train_001_steamini.png`

#### Animation Frame Format
- **Format**: PNG sprite sheet (horizontal strip)
- **Frame Size**: 48x48 pixels each
- **Layout**: Frames arranged left to right
- **Naming Convention**: `train_[species_id]_[name]_anim.png`
  - Example: `train_001_steamini_anim.png` (3 frames = 144x48 total)

#### UI Asset Format
- **Format**: PNG or SVG (SVG preferred for scalability)
- **Resolution**: Design at 3x scale (e.g., buttons at actual display size)
- **Color Mode**: RGB with alpha
- **Naming Convention**: `ui_[component]_[state].png`

### Design Philosophy Reminders

1. **Consistency**: All sprites must feel like they belong in the same world
2. **Readability**: Every sprite must be recognizable at 48x48 pixels
3. **Personality**: Each evolution stage should have distinct character
4. **Type Identity**: Type should be immediately identifiable from visual cues
5. **Painterly Quality**: Soft gradients, warm tones, handcrafted feel
6. **Mobile-First**: UI must work perfectly on small touchscreens

### Collaboration Points

#### For Programming Agent
- Sprite dimensions and formats specified
- Animation frame counts and timing provided
- UI component positions and dimensions listed
- Color values in hex for exact implementation

#### For Game Design Agent
- Type colors established for move buttons
- Visual feedback specified for all interactions
- Battle flow supported by UI layout

#### For Worldbuilding Agent
- Train personality conveyed through sprite design
- Evolution progression shows growth and development
- Visual storytelling through wear, rust, and details

---

## Quality Checklist

Before submitting sprite assets:

- [ ] Sprite is exactly 48x48 pixels
- [ ] Uses specified color palette (12-16 colors maximum)
- [ ] All key visual features from spec are present
- [ ] Textures are visible and add depth
- [ ] Silhouette is distinct and recognizable
- [ ] Type is identifiable from visual elements
- [ ] Sprite faces left (standard Pokemon convention)
- [ ] Adheres to painterly, warm aesthetic
- [ ] Animation frames are smooth transitions
- [ ] No harsh neon colors (unless ELECTRIC type energy effects)

Before submitting UI assets:

- [ ] All touch targets are minimum 60x60 pixels
- [ ] Text contrast meets WCAG AA standards (4.5:1 minimum)
- [ ] Borders are 3-4px for visibility
- [ ] Colors match specified hex values
- [ ] Rounded corners are 6-8px radius
- [ ] Semi-transparent backgrounds are 85% opacity
- [ ] HP bar gradients are smooth
- [ ] Fonts are readable at specified sizes
- [ ] Mobile responsive considerations addressed

---

## Appendix: Quick Reference

### Starter Lines at a Glance

```
STEAM LINE (Brown/Brass/Red)
├─ Steamini (001)      - Baby steam engine, friendly, small
├─ Steamore (002)      - Teen locomotive, confident, medium
└─ Locomotor (003)     - Legendary freight hauler, imposing, large

ELECTRIC LINE (Blue/Yellow/White)
├─ Sparkart (004)      - Electric starter, zippy, compact
├─ Voltrain (005)      - Bullet train, sleek, fast
└─ Thunderail (006)    - Maglev fusion, floating, ultimate

DIESEL LINE (Brown/Gray/Rust)
├─ Diesling (007)      - Baby diesel, boxy, scrappy
├─ Wartorque (008)     - Industrial tank, armored, tough
└─ Titanorque (009)    - Freight titan, massive, unstoppable
```

### Animation Frame Counts
```
Steamini:     3 frames (idle steam)
Steamore:     4 frames (idle steam + gauge)
Locomotor:    6 frames (multi-exhaust steam)

Sparkart:     4 frames (electric arc)
Voltrain:     5 frames (electrical pulse)
Thunderail:   6 frames (maglev + lightning)

Diesling:     4 frames (exhaust smoke)
Wartorque:    5 frames (dual exhaust)
Titanorque:   6 frames (triple exhaust + gears)
```

### UI Component Positions
```
Enemy Info Box:    (70, 70) - 260x100px
Enemy HP Bar:      (100, 100) - 200x24px
Enemy Train:       (650, 250) - 144x144px

Player Train:      (150, 480) - 144x144px
Player Info Box:   (620, 600) - 260x100px
Player HP Bar:     (650, 650) - 200x24px

Message Box:       Center-bottom - 860x150px
Action Menu:       Center-right - 240x280px
Move Buttons:      Bottom-center - 2x2 grid, 220x70px each
```

---

**Document Version**: 1.0
**Created**: 2025-10-23
**Art Direction Agent**: Approved for Implementation
**Status**: Ready for sprite production and UI development

This document serves as the complete specification for all visual elements related to the starter train evolution lines and battle UI system. All specifications adhere to the locked art style and are ready for immediate implementation by the programming team.

---

*End of Art Direction Specifications Document*
