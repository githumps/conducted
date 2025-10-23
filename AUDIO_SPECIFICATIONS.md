# Train Battle RPG - Audio Specifications
## Complete Sound & Music Design Document

**Sound & Music Agent** | **Version 1.0** | **Date: 2025-10-23**

---

## Table of Contents
1. [Town Music Themes (First 3 Towns)](#town-music-themes)
2. [Battle Music Specifications](#battle-music-specifications)
3. [Sound Effect Library](#sound-effect-library)
4. [Train Vocalizations (Cries)](#train-vocalizations)
5. [Audio Technical Specifications](#audio-technical-specifications)
6. [Adaptive Music System](#adaptive-music-system)
7. [Implementation Guidelines](#implementation-guidelines)

---

## Introduction

This document provides complete audio specifications for Train Battle RPG in **specification-only mode**. All specifications are designed to match the game's warm, cozy, painterly aesthetic with muted earth tones. Audio is inspired by Pokemon Gen 1/2 era chiptune but with a warmer, more melodic approach to complement the visual style.

**Design Philosophy**:
- **Warm & Inviting**: Soft chiptune sounds, not harsh 8-bit
- **Melodic & Memorable**: Each theme is hummable and distinct
- **Nostalgic**: Game Boy Advance era inspiration
- **Mobile-Friendly**: Small file sizes, optional audio
- **Painterly**: Audio matches the soft, handcrafted visual aesthetic

---

## Town Music Themes

### Town 1: Piston Town
**Location**: Starting town, player's home
**Type**: Overworld Music Track
**Trigger**: When player enters Piston Town

#### Basic Info
- **Duration**: 75 seconds (loop)
- **Purpose**: Home theme, safe and welcoming

#### Audio Characteristics
- **Mood**: Cozy, nostalgic, peaceful, hopeful, home
- **Tempo**: 102 BPM (relaxed walking pace)
- **Key**: C Major (bright and optimistic)
- **Time Signature**: 4/4

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Melody Lead:
  Square Wave (12.5% duty cycle)
  Soft attack, gentle sustain
  Plays main nostalgic melody

CHANNEL 2 - Harmony/Counter-melody:
  Square Wave (25% duty cycle)
  Follows melody with gentle thirds and fifths
  Occasional melodic flourishes

CHANNEL 3 - Bass:
  Triangle Wave
  Simple root notes and fifths
  Walking bass pattern in verses

CHANNEL 4 - Percussion:
  Noise Channel
  Soft kick drum (filtered noise burst)
  Gentle hi-hat (short noise)
  Light snare on beats 2 and 4
  Very subtle, not intrusive
```

#### Musical Structure
```
INTRO: 0:00-0:08 (8 seconds)
  Gentle arpeggiated opening
  Square wave melody establishes C major tonality
  Sets peaceful mood

SECTION A: 0:08-0:30 (22 seconds)
  Main nostalgic melody
  Think "Pallet Town" from Pokemon Red/Blue
  Warm, simple chord progression: C - Am - F - G
  Bass provides gentle forward motion

SECTION B: 0:30-0:52 (22 seconds)
  Counter-melody section
  Slightly more hopeful, looking forward to adventure
  Chord progression: F - G - Em - Am - F - G - C
  Harmony adds depth

SECTION C (BRIDGE): 0:52-1:05 (13 seconds)
  Quieter interlude
  Bass becomes more prominent
  Melody echoes from Section A
  Prepares for loop

OUTRO/LOOP POINT: 1:05-1:15 (10 seconds)
  Gentle return to intro arpeggios
  Seamless loop back to Section A
  Loop Point: 1:15 → 0:08
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 44.1 kHz
- **Bit Depth**: 16-bit
- **Target File Size**: < 800 KB compressed
- **Channels**: Stereo (subtle panning on counter-melody)

#### Implementation Notes
- **Loop Point**: Seamless loop at 1:15 back to 0:08 (after intro)
- **Volume**: 60% of master (default music volume)
- **Priority**: Low (can be interrupted by battle music)
- **Loading**: Lazy load when player first enters Piston Town
- **Fade In**: 1 second fade when entering town
- **Fade Out**: 0.5 seconds when exiting or entering battle

#### Reference Tracks
- Pokemon Red/Blue - "Pallet Town Theme" (nostalgic simplicity)
- Pokemon Gold/Silver - "New Bark Town" (warm and hopeful)
- Stardew Valley - "Spring (The Valley Comes Alive)" (cozy and peaceful)
- Undertale - "Home" (warm, safe feeling)

#### Emotional Goals
When players hear this theme they should feel:
- **Safe**: This is home, a place to return to
- **Nostalgic**: Reminds them of classic RPG starting towns
- **Hopeful**: Adventure awaits, but there's no rush
- **Warm**: Like grandfather's memory wrapping around them

---

### Town 2: Coal Harbor
**Location**: Bustling port town, first gym
**Type**: Overworld Music Track
**Trigger**: When player enters Coal Harbor

#### Basic Info
- **Duration**: 80 seconds (loop)
- **Purpose**: Port town theme, nautical and adventurous

#### Audio Characteristics
- **Mood**: Nautical, busy, adventurous, salty, lively
- **Tempo**: 126 BPM (upbeat walking/working pace)
- **Key**: D Minor → D Major (mysterious to optimistic shift)
- **Time Signature**: 6/8 (sailing/rocking rhythm)

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Melody Lead:
  Square Wave (25% duty cycle)
  Accordion-like timbre simulation
  Plays jaunty sea shanty-inspired melody

CHANNEL 2 - Bell/Harmony:
  Square Wave (12.5% duty cycle)
  Bell-like high register (ship bells)
  Plays harmonic support and occasional high flourishes

CHANNEL 3 - Bass:
  Triangle Wave
  Swaying bass pattern suggesting ocean waves
  Alternating pattern: LOW-high-mid, LOW-high-mid

CHANNEL 4 - Percussion:
  Noise Channel
  Stronger than Piston Town
  Kick emphasizes 1 and 4 in 6/8 time
  Hi-hat on all eighth notes (constant motion)
  Occasional cymbal crash (wave splash)
```

#### Musical Structure
```
INTRO: 0:00-0:06 (6 seconds)
  Ship bell tolling (square wave bell tones)
  Ocean wave sounds (filtered noise swell)
  Establishes nautical atmosphere

SECTION A: 0:06-0:30 (24 seconds)
  Main sea shanty melody in D minor
  Accordion-like lead creates working port atmosphere
  Bass provides swaying motion
  Busy, bustling feel
  Chord progression: Dm - F - C - Gm

SECTION B: 0:30-0:54 (24 seconds)
  Shift to D Major (optimistic)
  More adventurous melody
  Bell channel plays counterpoint
  Suggests ships arriving and departing
  Chord progression: D - G - A - Bm - G - A - D

SECTION C (BRIDGE): 0:54-1:10 (16 seconds)
  Return to D minor
  Quieter, more mysterious section
  Bass becomes more prominent (deep ocean)
  Distant bell melody (fog horn inspired)

OUTRO/LOOP POINT: 1:10-1:20 (10 seconds)
  Builds back to main theme
  Percussion intensifies
  Loop Point: 1:20 → 0:06
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 44.1 kHz
- **Bit Depth**: 16-bit
- **Target File Size**: < 850 KB compressed
- **Channels**: Stereo (bell panned left/right for spatial effect)

#### Implementation Notes
- **Loop Point**: Seamless loop at 1:20 back to 0:06
- **Volume**: 60% of master (default music volume)
- **Priority**: Low (interrupted by battle/gym music)
- **Loading**: Lazy load when approaching Coal Harbor
- **Fade In**: 1 second fade when entering town
- **Fade Out**: 0.5 seconds when exiting
- **Special**: When standing near water, add subtle wave SFX layer

#### Reference Tracks
- Pokemon Red/Blue - "Vermilion City" (port town energy)
- Pokemon Ruby/Sapphire - "Slateport City" (nautical bustling)
- Zelda: Wind Waker - "Outset Island" (ocean adventure)
- Chrono Trigger - "Wind Scene" (hopeful sailing)

#### Emotional Goals
- **Adventurous**: The sea calls, new journeys await
- **Busy**: Port life is active and full of activity
- **Nautical**: Strong sense of place (harbor atmosphere)
- **Optimistic**: Trade, travel, and opportunity
- **Slightly Salty**: Grounded, working-class authenticity

---

### Town 3: Voltage City
**Location**: Modern electric metropolis, second gym
**Type**: Overworld Music Track
**Trigger**: When player enters Voltage City

#### Basic Info
- **Duration**: 70 seconds (loop)
- **Purpose**: Electric city theme, energetic and modern

#### Audio Characteristics
- **Mood**: Energetic, modern, fast-paced, electric, exciting
- **Tempo**: 144 BPM (fast, city never sleeps)
- **Key**: A Minor (energetic but not overly cheerful)
- **Time Signature**: 4/4

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Melody Lead:
  Pulse Wave (50% duty cycle)
  Synth-like timbre with rapid pitch vibrato
  Plays fast, electric melody
  Occasional glissando effects

CHANNEL 2 - Arpeggio/Harmony:
  Pulse Wave (25% duty cycle)
  Rapid 16th-note arpeggios (electric energy)
  Creates buzzing, active atmosphere
  Supports melody harmonically

CHANNEL 3 - Bass:
  Triangle Wave
  Syncopated electronic bass line
  Punchy attack, short decay
  Walking/running bass pattern

CHANNEL 4 - Percussion:
  Noise Channel
  Electronic drum kit simulation
  Tight kick, sharp snare
  Closed hi-hat on every 8th note
  Open hi-hat on offbeats (energy)
  Occasional electric zap sounds
```

#### Musical Structure
```
INTRO: 0:00-0:04 (4 seconds)
  Electric power-up sound
  Arpeggio sweeps upward (powering on)
  Establishes electric energy immediately

SECTION A: 0:04-0:22 (18 seconds)
  Main high-energy melody
  Fast-paced, suggests constant motion
  Arpeggios create electric buzz atmosphere
  Chord progression: Am - F - C - G

SECTION B: 0:22-0:40 (18 seconds)
  Secondary melody (more hopeful)
  Still maintains fast pace
  Bass becomes more prominent
  Suggests city lights and progress
  Chord progression: F - G - Am - Em - F - G - Am

SECTION C (BREAKDOWN): 0:40-0:52 (12 seconds)
  Brief quieter section
  Arpeggio continues but melody drops out
  Creates moment of breathing before climax
  Only bass and arpeggios

SECTION D (CLIMAX): 0:52-1:06 (14 seconds)
  Most energetic section
  Both channels play melody in harmony
  Percussion at full intensity
  Celebrates city's electric power

OUTRO/LOOP POINT: 1:06-1:10 (4 seconds)
  Quick transition back to intro power-up
  Loop Point: 1:10 → 0:04
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 44.1 kHz
- **Bit Depth**: 16-bit
- **Target File Size**: < 800 KB compressed
- **Channels**: Stereo (arpeggios panned slightly for width)

#### Implementation Notes
- **Loop Point**: Seamless loop at 1:10 back to 0:04
- **Volume**: 60% of master (default music volume)
- **Priority**: Low (interrupted by battle/gym music)
- **Loading**: Lazy load when approaching Voltage City
- **Fade In**: 0.5 seconds (quick entrance, matches energy)
- **Fade Out**: 0.5 seconds when exiting
- **Special**: Add subtle electric hum ambient layer (very quiet)

#### Reference Tracks
- Pokemon Gold/Silver - "Goldenrod City" (big city energy)
- Pokemon Black/White - "Castelia City" (modern metropolis)
- Mega Man 2 - "Dr. Wily Stage 1" (electronic energy)
- Final Fantasy VI - "Kids Run Through the City Corner" (fast-paced city)

#### Emotional Goals
- **Energetic**: City pulses with electric life
- **Modern**: Cutting-edge, future-focused
- **Exciting**: So much to do, never boring
- **Fast-Paced**: Keep moving, keep exploring
- **Electric**: Strong type identity, voltage everywhere

---

## Battle Music Specifications

### Wild Battle Theme
**Type**: Battle Music
**Trigger**: Random wild train encounter

#### Basic Info
- **Duration**: 60 seconds (loop after 5-second intro)
- **Purpose**: Standard wild encounter battle music

#### Audio Characteristics
- **Mood**: Exciting, action-packed, adventurous, not-too-intense
- **Tempo**: 136 BPM (fast but not frantic)
- **Key**: C Minor (tension but not dark)
- **Time Signature**: 4/4

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Lead Melody:
  Pulse Wave (25% duty cycle)
  Aggressive but not harsh
  Energetic battle melody

CHANNEL 2 - Harmony/Counter:
  Pulse Wave (12.5% duty cycle)
  Provides harmonic support
  Occasional answering phrases

CHANNEL 3 - Bass:
  Triangle Wave
  Driving eighth-note bass pattern
  Root notes with rhythmic emphasis

CHANNEL 4 - Percussion:
  Noise Channel
  Steady four-on-floor kick
  Snare on 2 and 4
  Rapid hi-hat pattern
  Energetic but not overwhelming
```

#### Musical Structure
```
INTRO: 0:00-0:05 (5 seconds) [NON-LOOPING]
  Dramatic build-up
  Rising arpeggio pattern
  Drum roll crescendo
  Crash into main theme

SECTION A (LOOP START): 0:05-0:25 (20 seconds)
  Main battle melody
  Driving rhythm propels action
  Chord progression: Cm - Ab - Bb - Cm

SECTION B: 0:25-0:45 (20 seconds)
  Secondary melody
  Slightly more hopeful
  Suggests strategic thinking
  Chord progression: Ab - Bb - Gm - Cm - Ab - Bb - Cm

SECTION C: 0:45-1:05 (20 seconds)
  Return to A theme variation
  Higher energy
  Builds tension before loop

LOOP POINT: 1:05 → 0:05 (loops A-B-C continuously)
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 44.1 kHz
- **Bit Depth**: 16-bit
- **Target File Size**: < 750 KB
- **Channels**: Stereo

#### Implementation Notes
- **Preload**: YES (battle music must be ready instantly)
- **Intro Plays Once**: First 5 seconds play only on battle start
- **Loop Point**: 1:05 → 0:05 (seamless loop)
- **Volume**: 65% of master (slightly louder than town music)
- **Priority**: High (interrupts all other music)
- **Transition**: Town music fades out over 0.5 seconds, then intro plays

#### Reference Tracks
- Pokemon Red/Blue - "Wild Pokemon Battle"
- Pokemon Gold/Silver - "Wild Pokemon Battle (Johto)"
- Mother 3 - "Bothersome Guys"

---

### Trainer Battle Theme
**Type**: Battle Music
**Trigger**: Trainer battle encounter

#### Basic Info
- **Duration**: 75 seconds (loop after 6-second intro)
- **Purpose**: Human trainer battle music

#### Audio Characteristics
- **Mood**: Competitive, strategic, focused, intense
- **Tempo**: 140 BPM (faster than wild battle)
- **Key**: G Minor (serious but exciting)
- **Time Signature**: 4/4

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Lead Melody:
  Pulse Wave (50% duty cycle)
  Strong, confident melody
  More complex than wild battle

CHANNEL 2 - Harmony/Counter:
  Pulse Wave (25% duty cycle)
  Active counter-melody
  Suggests opponent's strategy

CHANNEL 3 - Bass:
  Triangle Wave
  Syncopated bass pattern
  More intricate than wild battle

CHANNEL 4 - Percussion:
  Noise Channel
  More complex drum pattern
  Snare rolls and fills
  Cymbal crashes on section changes
```

#### Musical Structure
```
INTRO: 0:00-0:06 (6 seconds) [NON-LOOPING]
  Dramatic trainer entrance fanfare
  Both channels in harmony
  Cymbal crash
  "You vs. Them" feeling

SECTION A (LOOP START): 0:06-0:31 (25 seconds)
  Competitive main melody
  Call-and-response between channels
  Suggests back-and-forth battle
  Chord progression: Gm - Eb - Bb - F

SECTION B: 0:31-0:56 (25 seconds)
  More melodic section
  Suggests human opponent (not just wild creature)
  Strategic feel
  Chord progression: Eb - F - Dm - Gm - Eb - F - Gm

SECTION C: 0:56-1:21 (25 seconds)
  Intensifies before loop
  Both melodies combine
  Maximum tension

LOOP POINT: 1:21 → 0:06
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 44.1 kHz
- **Bit Depth**: 16-bit
- **Target File Size**: < 850 KB
- **Channels**: Stereo

#### Implementation Notes
- **Preload**: YES
- **Intro Plays Once**: First 6 seconds only on battle start
- **Loop Point**: 1:21 → 0:06
- **Volume**: 65% of master
- **Priority**: High
- **Transition**: 0.5 second fade from overworld music

#### Reference Tracks
- Pokemon Red/Blue - "Trainer Battle"
- Pokemon Gold/Silver - "Trainer Battle (Johto)"
- Pokemon Ruby/Sapphire - "Trainer Battle (Hoenn)"

---

### Gym Leader Battle Theme
**Type**: Battle Music
**Trigger**: Gym Leader (Station Master) battle

#### Basic Info
- **Duration**: 90 seconds (loop after 8-second intro)
- **Purpose**: Boss battle music for gym leaders

#### Audio Characteristics
- **Mood**: Epic, challenging, intense, triumphant
- **Tempo**: 145 BPM (fastest battle theme)
- **Key**: A Minor → C Major (struggle to triumph)
- **Time Signature**: 4/4

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Lead Melody:
  Pulse Wave (50% duty cycle)
  Heroic, powerful melody
  Wide melodic range

CHANNEL 2 - Brass/Harmony:
  Pulse Wave (25% duty cycle)
  Brass-like stabs and sustains
  Epic harmonic support

CHANNEL 3 - Bass:
  Triangle Wave
  Heavy, driving bass
  Emphasizes power and drama

CHANNEL 4 - Percussion:
  Noise Channel
  Full drum kit simulation
  Complex patterns
  Timpani-like hits (filtered noise)
  Cymbal crashes
```

#### Musical Structure
```
INTRO: 0:00-0:08 (8 seconds) [NON-LOOPING]
  Epic fanfare
  Brass-like stabs
  Builds anticipation
  Crash into main theme

SECTION A (LOOP START): 0:08-0:38 (30 seconds)
  Powerful main theme in A minor
  Epic melody suggesting major challenge
  Driving rhythm
  Chord progression: Am - F - C - G - Am - Dm - E7 - Am

SECTION B: 0:38-1:08 (30 seconds)
  Shift to C Major (triumph within struggle)
  More hopeful but still intense
  Suggests you can win
  Chord progression: C - Am - F - G - C - F - G - C

SECTION C: 1:08-1:38 (30 seconds)
  Return to A minor
  Combines elements of A and B
  Maximum intensity before loop
  Both channels play powerful harmonies

LOOP POINT: 1:38 → 0:08
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 44.1 kHz
- **Bit Depth**: 16-bit
- **Target File Size**: < 950 KB
- **Channels**: Stereo

#### Implementation Notes
- **Preload**: YES (critical battle music)
- **Intro Plays Once**: First 8 seconds only
- **Loop Point**: 1:38 → 0:08 (seamless)
- **Volume**: 68% of master (slightly louder than normal battles)
- **Priority**: Highest
- **Special**: When player's train HP < 25%, add subtle drum layer
- **Transition**: Immediate cut from gym music, no fade

#### Reference Tracks
- Pokemon Gold/Silver - "Gym Leader Battle"
- Pokemon Ruby/Sapphire - "Gym Leader Battle"
- Final Fantasy VII - "Those Who Fight Further"
- Mega Man 3 - "Snake Man Stage"

---

### Victory Jingle
**Type**: Jingle (Non-Looping)
**Trigger**: Player wins a battle

#### Basic Info
- **Duration**: 6 seconds (short celebratory jingle)
- **Purpose**: Battle victory fanfare

#### Audio Characteristics
- **Mood**: Triumphant, satisfying, celebratory
- **Tempo**: 120 BPM (moderate, clear)
- **Key**: C Major (pure triumph)
- **Structure**: Ascending melodic phrase to resolution

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Melody:
  Pulse Wave (50% duty cycle)
  Bright, celebratory ascending melody

CHANNEL 2 - Harmony:
  Pulse Wave (25% duty cycle)
  Harmonic support in thirds

CHANNEL 3 - Bass:
  Triangle Wave
  Simple root-fifth pattern

CHANNEL 4 - Percussion:
  Noise Channel
  Cymbal crash at start
  Snare hits on beats
  Cymbal crash on final note
```

#### Musical Phrase
```
MEASURE 1 (0:00-0:02):
  C - E - G (ascending)
  "Da da da"

MEASURE 2 (0:02-0:04):
  C' - G - E - C (descending from high)
  "Da da da daaaa"

MEASURE 3 (0:04-0:06):
  Final resolution: C - C' (octave jump)
  "Da DAAA!"
  Hold final note with cymbal crash
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 22.05 kHz (short file, lower rate acceptable)
- **Bit Depth**: 16-bit
- **Target File Size**: < 100 KB
- **Channels**: Stereo

#### Implementation Notes
- **Preload**: YES (must be instant)
- **Volume**: 70% of master (noticeable celebration)
- **Priority**: Highest (interrupts battle music immediately)
- **Does Not Loop**: Plays once, then silence or transition
- **Transition**: After jingle, fade in overworld music (1 second fade)

#### Reference Tracks
- Pokemon Red/Blue - "Victory! (Wild Pokemon)"
- Pokemon Gold/Silver - "Victory! (Wild Pokemon)"
- Final Fantasy - "Victory Fanfare"

---

### Defeat Jingle
**Type**: Jingle (Non-Looping)
**Trigger**: Player loses a battle (all trains faint)

#### Basic Info
- **Duration**: 4 seconds (brief disappointment)
- **Purpose**: Battle defeat acknowledgment

#### Audio Characteristics
- **Mood**: Disappointed, regretful, but-not-devastating
- **Tempo**: 80 BPM (slower, deflated)
- **Key**: A Minor (sad but gentle)
- **Structure**: Descending melodic phrase

#### Instrumentation (Chiptune-Style)
```
CHANNEL 1 - Melody:
  Pulse Wave (12.5% duty cycle)
  Softer, sadder tone
  Descending melody

CHANNEL 2 - Harmony:
  Pulse Wave (12.5% duty cycle)
  Gentle harmonic support

CHANNEL 3 - Bass:
  Triangle Wave
  Simple descending bass

CHANNEL 4 - Percussion:
  Noise Channel (minimal)
  Soft cymbal decay
  No drums (suggests loss of energy)
```

#### Musical Phrase
```
MEASURE 1 (0:00-0:02):
  A - F - D (descending)
  "Aww..."

MEASURE 2 (0:02-0:04):
  C - A (final descent to resolution)
  "...man."
  Soft fade on final note
```

#### Technical Specs
- **Format**: OGG Vorbis (primary), MP3 (fallback)
- **Sample Rate**: 22.05 kHz
- **Bit Depth**: 16-bit
- **Target File Size**: < 80 KB
- **Channels**: Stereo

#### Implementation Notes
- **Preload**: YES
- **Volume**: 65% of master (softer than victory)
- **Priority**: Highest
- **Does Not Loop**: Plays once
- **Transition**: Fades to black screen, then "returned to Pokemon Center" sequence

#### Reference Tracks
- Pokemon Red/Blue - Defeat theme (simple and brief)
- Earthbound - "You Lost" (gentle disappointment)

---

## Sound Effect Library

### UI Sound Effects

#### Button Press
**Type**: UI Sound Effect
**Trigger**: Player presses any button/menu item

- **Duration**: 50ms
- **Sound Description**: Short, soft "beep" - mid-range frequency (800Hz)
- **Waveform**: Pulse wave (25% duty), quick decay
- **Volume**: 70% (relative to SFX master)
- **Priority**: Medium (can overlap)
- **Format**: OGG/MP3
- **Target File Size**: < 10 KB

**Implementation Notes**:
- Should feel tactile but not annoying
- Slightly muted tone to match warm aesthetic
- Can play multiple instances simultaneously (menu navigation)

---

#### Menu Navigate (Cursor Move)
**Type**: UI Sound Effect
**Trigger**: Player moves cursor in menu

- **Duration**: 30ms
- **Sound Description**: Quick "tick" - high frequency (1200Hz)
- **Waveform**: Pulse wave (12.5% duty), very sharp attack/decay
- **Volume**: 60% (quieter than button press)
- **Priority**: Medium
- **Format**: OGG/MP3
- **Target File Size**: < 8 KB

**Implementation Notes**:
- Very short to avoid annoying when navigating quickly
- Should be distinct from button press
- High priority to prevent lag

---

#### Menu Open
**Type**: UI Sound Effect
**Trigger**: Player opens menu/bag/party screen

- **Duration**: 150ms
- **Sound Description**: Rising "whoosh" with soft beep at end
- **Waveform**: Filtered noise sweep (low to mid frequency) + pulse accent
- **Volume**: 75%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 20 KB

**Implementation Notes**:
- Suggests something appearing/opening
- Warm, inviting sound
- Slightly longer to mark important action

---

#### Menu Close
**Type**: UI Sound Effect
**Trigger**: Player closes menu/backs out

- **Duration**: 120ms
- **Sound Description**: Falling "whoosh" with soft beep at start
- **Waveform**: Filtered noise sweep (mid to low frequency) + pulse accent
- **Volume**: 70%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 18 KB

**Implementation Notes**:
- Mirror of Menu Open but descending
- Suggests closing/putting away

---

#### Select Confirm
**Type**: UI Sound Effect
**Trigger**: Player confirms selection (A button)

- **Duration**: 100ms
- **Sound Description**: Positive "ding" - bright, ascending two-note chirp
- **Waveform**: Pulse wave, C to E note progression (261Hz to 330Hz)
- **Volume**: 75%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 15 KB

**Implementation Notes**:
- Should feel satisfying and positive
- Slightly longer than button press to mark importance
- Cannot be interrupted

---

#### Select Cancel/Back
**Type**: UI Sound Effect
**Trigger**: Player cancels/backs out (B button)

- **Duration**: 100ms
- **Sound Description**: Neutral "buzz" - descending two-note
- **Waveform**: Pulse wave, E to C note progression (330Hz to 261Hz)
- **Volume**: 70%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 15 KB

**Implementation Notes**:
- Mirror of Confirm but descending
- Not harsh, just neutral
- Distinct from Confirm

---

#### Error/Invalid Action
**Type**: UI Sound Effect
**Trigger**: Player tries invalid action

- **Duration**: 200ms
- **Sound Description**: Dissonant "buzz" - two clashing frequencies
- **Waveform**: Pulse wave, simultaneous B and C (247Hz + 261Hz = dissonance)
- **Volume**: 65%
- **Priority**: High (cannot be interrupted)
- **Format**: OGG/MP3
- **Target File Size**: < 20 KB

**Implementation Notes**:
- Should be clearly negative but not harsh
- Slightly longer to ensure player notices
- Not too annoying (they might trigger it repeatedly)

---

#### Dialogue Text Blip (Per Character)
**Type**: UI Sound Effect
**Trigger**: Each character appears in text box (typewriter effect)

- **Duration**: 30ms
- **Sound Description**: Soft "blip" - varies pitch based on character
- **Waveform**: Pulse wave (25% duty), pitch varies: vowels=low, consonants=high
- **Volume**: 50% (very subtle, part of ambience)
- **Priority**: Low (can be interrupted/skipped)
- **Format**: OGG/MP3
- **Target File Size**: < 8 KB

**Implementation Notes**:
- Very gentle, not annoying during long dialogue
- Pitch variation adds character
- Can be disabled in settings
- Should feel like "pencil on paper" warmth

---

### Overworld Sound Effects

#### Footstep (Grass)
**Type**: Overworld SFX
**Trigger**: Player walks on grass tiles

- **Duration**: 80ms
- **Sound Description**: Soft "crunch" - filtered noise
- **Waveform**: Noise channel, low-pass filtered (suggests grass rustling)
- **Volume**: 40% (ambient, not intrusive)
- **Priority**: Low
- **Format**: OGG/MP3
- **Target File Size**: < 12 KB

**Implementation Notes**:
- Plays every 3rd step (not every step = too much)
- Pitch varies slightly randomly (natural variation)
- Creates ambient walking atmosphere

---

#### Footstep (Path/Road)
**Type**: Overworld SFX
**Trigger**: Player walks on path tiles

- **Duration**: 60ms
- **Sound Description**: Light "tap" - higher pitch than grass
- **Waveform**: Short pulse wave with quick decay
- **Volume**: 45%
- **Priority**: Low
- **Format**: OGG/MP3
- **Target File Size**: < 10 KB

**Implementation Notes**:
- Slightly louder/sharper than grass
- Plays every 3rd step
- Suggests harder surface

---

#### Footstep (Indoor)
**Type**: Overworld SFX
**Trigger**: Player walks indoors

- **Duration**: 50ms
- **Sound Description**: Subtle "tap" - muted
- **Waveform**: Very short pulse with immediate decay
- **Volume**: 35% (quieter indoors)
- **Priority**: Low
- **Format**: OGG/MP3
- **Target File Size**: < 10 KB

---

#### Door Open
**Type**: Overworld SFX
**Trigger**: Player enters building

- **Duration**: 300ms
- **Sound Description**: Gentle "creak" with bell jingle
- **Waveform**: Filtered noise (wood creak) + high pulse wave (bell)
- **Volume**: 65%
- **Priority**: Medium
- **Format**: OGG/MP3
- **Target File Size**: < 30 KB

**Implementation Notes**:
- Warm, welcoming sound
- Bell suggests friendly shop/home
- Matches cozy aesthetic

---

#### Door Close
**Type**: Overworld SFX
**Trigger**: Player exits building

- **Duration**: 200ms
- **Sound Description**: Soft "thud" with brief creak
- **Waveform**: Low pulse + short noise burst
- **Volume**: 60%
- **Priority**: Medium
- **Format**: OGG/MP3
- **Target File Size**: < 25 KB

---

#### NPC Talk Blip
**Type**: Overworld SFX
**Trigger**: NPC speaks (text appears)

- **Duration**: 50ms
- **Sound Description**: Friendly "beep" - mid-range, warm
- **Waveform**: Pulse wave (50% duty), single note
- **Volume**: 55%
- **Priority**: Medium
- **Format**: OGG/MP3
- **Target File Size**: < 10 KB

**Implementation Notes**:
- Different pitch than player text blip
- Friendly, inviting tone
- Can be character-specific pitch variations

---

#### Save Game Success
**Type**: Overworld SFX
**Trigger**: Game saved successfully

- **Duration**: 500ms
- **Sound Description**: Ascending chime - four bright notes
- **Waveform**: Pulse wave, notes: C-E-G-C' (major chord arpeggio)
- **Volume**: 70%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 40 KB

**Implementation Notes**:
- Must feel satisfying and complete
- Cannot be interrupted
- Final note holds for 200ms

---

#### Item Get (Common)
**Type**: Overworld SFX
**Trigger**: Player receives common item

- **Duration**: 800ms
- **Sound Description**: Pleasant jingle - ascending melody
- **Waveform**: Two pulse channels in harmony
- **Volume**: 75%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 60 KB

**Implementation Notes**:
- Based on Zelda "item get" concept
- Happy but not overly dramatic
- Music pauses while this plays

---

#### Item Get (Rare/Badge)
**Type**: Overworld SFX
**Trigger**: Player receives badge or rare item

- **Duration**: 2000ms (2 seconds)
- **Sound Description**: Epic fanfare - triumphant melody
- **Waveform**: Full chiptune "orchestra" - all 4 channels
- **Volume**: 80%
- **Priority**: Highest (cannot be interrupted)
- **Format**: OGG/MP3
- **Target File Size**: < 120 KB

**Implementation Notes**:
- Similar to Victory Jingle but longer and more elaborate
- All game action pauses during playback
- Player holds item sprite above head during jingle

**Musical Structure**:
```
0:00-0:50: Ascending fanfare (builds anticipation)
0:50-1:50: Main triumphant melody
1:50-2:00: Resolution and final chord
```

---

### Battle Sound Effects

#### Train Entry (Battle Start)
**Type**: Battle SFX
**Trigger**: Train enters battle

- **Duration**: 300ms
- **Sound Description**: "Whoosh" with train-specific accent
- **Waveform**: Noise sweep + type-specific tone
- **Volume**: 70%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 30 KB

**Implementation Notes**:
- STEAM: Add steam whistle at end
- ELECTRIC: Add electric zap
- DIESEL: Add engine rumble

---

#### Move Select (Battle Menu)
**Type**: Battle SFX
**Trigger**: Player selects a move

- **Duration**: 50ms
- **Sound Description**: Soft "click" - confirms selection
- **Waveform**: Short pulse wave
- **Volume**: 65%
- **Priority**: Medium
- **Format**: OGG/MP3
- **Target File Size**: < 10 KB

---

#### Attack Hit (Normal)
**Type**: Battle SFX
**Trigger**: Attack connects with target

- **Duration**: 150ms
- **Sound Description**: Impact "thud" with punch
- **Waveform**: Low pulse + noise burst
- **Volume**: 75%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 20 KB

**Implementation Notes**:
- Should feel satisfying
- Syncs with screen shake effect

---

#### Attack Hit (Super Effective)
**Type**: Battle SFX
**Trigger**: Super effective hit

- **Duration**: 200ms
- **Sound Description**: Sharp "CRACK" - higher pitch than normal
- **Waveform**: High pulse + sharp noise burst + descending sweep
- **Volume**: 85% (louder to emphasize)
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 25 KB

**Implementation Notes**:
- Distinctly more powerful than normal hit
- Syncs with larger screen shake
- Should feel extra satisfying

---

#### Attack Hit (Not Very Effective)
**Type**: Battle SFX
**Trigger**: Not very effective hit

- **Duration**: 200ms
- **Sound Description**: Dull "thud" - lower, muffled
- **Waveform**: Low pulse + filtered noise (dampened)
- **Volume**: 65% (quieter than normal)
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 20 KB

**Implementation Notes**:
- Should feel weaker than normal hit
- Dampened, muffled quality

---

#### Critical Hit
**Type**: Battle SFX
**Trigger**: Critical hit lands

- **Duration**: 250ms
- **Sound Description**: Sharp "CRACK" + glass shatter effect
- **Waveform**: Very high pulse + noise burst + high-frequency shatter
- **Volume**: 90% (loudest hit sound)
- **Priority**: Highest
- **Format**: OGG/MP3
- **Target File Size**: < 30 KB

**Implementation Notes**:
- Most dramatic hit sound
- Plays BEFORE damage calculation display
- Should make player feel powerful

---

#### Miss
**Type**: Battle SFX
**Trigger**: Attack misses target

- **Duration**: 100ms
- **Sound Description**: "Whoosh" - passing by
- **Waveform**: Noise sweep (high to low, quick)
- **Volume**: 60%
- **Priority**: Medium
- **Format**: OGG/MP3
- **Target File Size**: < 15 KB

**Implementation Notes**:
- Should clearly indicate failure
- Not too disappointing (happens often)

---

#### HP Bar Decrease (Tick)
**Type**: Battle SFX
**Trigger**: HP bar drains after damage

- **Duration**: 40ms per tick
- **Sound Description**: Rapid "tick tick tick" - mechanical counter
- **Waveform**: Very short pulse wave (1200Hz)
- **Volume**: 55%
- **Priority**: High (many instances)
- **Format**: OGG/MP3
- **Target File Size**: < 8 KB

**Implementation Notes**:
- Plays repeatedly as HP drains
- Speed varies by damage amount:
  - Low damage: 15 ticks/second
  - Medium damage: 30 ticks/second
  - High damage: 50 ticks/second
- Stops when HP bar reaches final value

---

#### Train Faint
**Type**: Battle SFX
**Trigger**: Train's HP reaches 0

- **Duration**: 800ms
- **Sound Description**: Sad descending melody - train powering down
- **Waveform**: Pulse wave, descending chromatic scale, fading volume
- **Volume**: 70%
- **Priority**: High (cannot be interrupted)
- **Format**: OGG/MP3
- **Target File Size**: < 60 KB

**Implementation Notes**:
- Plays as sprite fades out
- Sad but not devastating
- Type-specific variations:
  - STEAM: Ends with steam hiss
  - ELECTRIC: Ends with power-down whine
  - DIESEL: Ends with engine sputter

---

#### Potion Use
**Type**: Battle SFX
**Trigger**: Player uses Potion item

- **Duration**: 400ms
- **Sound Description**: Healing "sparkle" - ascending chime
- **Waveform**: Pulse waves, ascending arpeggio with vibrato
- **Volume**: 70%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 35 KB

**Implementation Notes**:
- Should feel restorative and positive
- Syncs with HP bar increasing
- Healing sparkle visual effect accompanies

---

#### Trainball Throw
**Type**: Battle SFX
**Trigger**: Player throws Trainball

- **Duration**: 600ms
- **Sound Description**: "Whoosh" throw + impact "plink"
- **Waveform**: Noise sweep + pulse accent
- **Volume**: 75%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 50 KB

**Musical Structure**:
- 0:00-0:15: Throw whoosh
- 0:15: Impact sound
- 0:15-0:60: Ball opening sound

---

#### Trainball Wobble
**Type**: Battle SFX
**Trigger**: Trainball wobbles during capture

- **Duration**: 300ms per wobble
- **Sound Description**: Mechanical "wobble" - tense oscillation
- **Waveform**: Pulse wave, oscillating between two close pitches
- **Volume**: 70%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 30 KB

**Implementation Notes**:
- Plays 1-3 times (random)
- Each wobble increases tension
- Based on Pokemon capture wobble

---

#### Capture Success
**Type**: Battle SFX
**Trigger**: Train successfully captured

- **Duration**: 1000ms
- **Sound Description**: Triumphant chime - success melody
- **Waveform**: Multi-channel ascending melody with resolution
- **Volume**: 80%
- **Priority**: Highest
- **Format**: OGG/MP3
- **Target File Size**: < 70 KB

**Implementation Notes**:
- Similar to Victory Jingle but distinct
- Very satisfying, marks major accomplishment
- Final note holds with vibrato

---

#### Capture Fail
**Type**: Battle SFX
**Trigger**: Train breaks free from Trainball

- **Duration**: 500ms
- **Sound Description**: Breaking sound - train escapes
- **Waveform**: Pulse + noise burst (explosion-like)
- **Volume**: 75%
- **Priority**: High
- **Format**: OGG/MP3
- **Target File Size**: < 40 KB

**Implementation Notes**:
- Disappointing but not discouraging
- Suggests train broke free with force
- Syncs with ball breaking animation

---

## Train Vocalizations (Cries)

### System Overview

Each train species has a unique "cry" - a vocalization that plays when:
- Train enters battle
- Train is selected in party menu
- Train levels up
- Train evolves

**General Specifications**:
- **Duration**: 500-1000ms
- **Style**: Chiptune/synthesized, NOT realistic recordings
- **Channels**: 2-3 pulse/triangle/noise channels
- **Format**: OGG/MP3
- **Target File Size**: < 50 KB each
- **Volume**: 75% (relative to SFX master)
- **Priority**: High

---

### STEAM Type Cries

#### Philosophy
Steam train cries should evoke train whistles, steam releases, and industrial warmth. Think classic locomotive sounds but synthesized.

#### Steamini (Starter STEAM - #001)
- **Duration**: 600ms
- **Sound Description**: Young, high-pitched whistle - friendly and eager
- **Waveform Structure**:
  - Channel 1: Pulse wave (25%), starts at 800Hz, quick vibrato
  - Channel 2: Triangle wave, harmony at 1000Hz
  - Channel 3: Noise (soft), brief steam hiss at end (100ms)
- **Pitch Contour**: Rises slightly then falls (cheerful toot)
- **Personality**: Friendly, eager, young

**Musical Notation**: "Toot!" (G5 → A5 → G5, quick)

---

#### Steamore (Mid STEAM - #002)
- **Duration**: 750ms
- **Sound Description**: Deeper whistle - confident and strong
- **Waveform Structure**:
  - Channel 1: Pulse wave (50%), starts at 600Hz, moderate vibrato
  - Channel 2: Triangle wave, harmony at 800Hz
  - Channel 3: Noise, stronger steam release at end (150ms)
- **Pitch Contour**: Steady then slight rise (assertive call)
- **Personality**: Confident, reliable, strong

**Musical Notation**: "TOOOOT!" (E5 → F5, held)

---

#### Locomotor (Final STEAM - #003)
- **Duration**: 900ms
- **Sound Description**: Deep, powerful steam horn - legendary
- **Waveform Structure**:
  - Channel 1: Pulse wave (50%), starts at 400Hz, slow vibrato
  - Channel 2: Pulse wave (25%), harmony at 600Hz (brass-like)
  - Channel 3: Triangle wave, low bass at 200Hz
  - Channel 4: Noise, prolonged steam release (300ms)
- **Pitch Contour**: Rises slowly to powerful climax
- **Personality**: Majestic, powerful, legendary

**Musical Notation**: "TOOOOOOOOOT!" (C4 → E4 → G4, powerful crescendo)

---

### ELECTRIC Type Cries

#### Philosophy
Electric train cries should sound like electronic zaps, beeps, and synthesizer effects. Think sci-fi computer sounds but musical.

#### Sparkart (Starter ELECTRIC - #004)
- **Duration**: 500ms
- **Sound Description**: Quick electronic zap - zippy and energetic
- **Waveform Structure**:
  - Channel 1: Pulse wave (12.5%), rapid arpeggio (C6-E6-G6-C7)
  - Channel 2: Pulse wave (25%), electric buzz at 2000Hz with rapid vibrato
  - Channel 3: Noise (filtered), electric crackle throughout
- **Pitch Contour**: Rising arpeggio, fast
- **Personality**: Energetic, quick, zippy

**Musical Notation**: "Bzzt-bzzt-BZZT!" (rapid ascending)

---

#### Voltrain (Mid ELECTRIC - #005)
- **Duration**: 650ms
- **Sound Description**: Synthesizer sweep - sleek and fast
- **Waveform Structure**:
  - Channel 1: Pulse wave (25%), pitch sweep 1500Hz → 3000Hz
  - Channel 2: Pulse wave (12.5%), harmony sweep 2000Hz → 4000Hz
  - Channel 3: Noise, electric arc sound (filtered high freq)
- **Pitch Contour**: Upward sweep, suggests speed
- **Personality**: Fast, sleek, modern

**Musical Notation**: "ZZZZzzziiiing!" (rising glissando)

---

#### Thunderail (Final ELECTRIC - #006)
- **Duration**: 850ms
- **Sound Description**: Powerful electromagnetic pulse - epic electric
- **Waveform Structure**:
  - Channel 1: Pulse wave (50%), deep oscillation 800Hz ± 200Hz
  - Channel 2: Pulse wave (25%), high frequency shimmer 3000Hz
  - Channel 3: Triangle wave, pulsing bass 150Hz
  - Channel 4: Noise, electric storm crackle throughout
- **Pitch Contour**: Oscillating power surge, culminates in release
- **Personality**: Powerful, electric, majestic

**Musical Notation**: "BWWWWW-ZZZZZ-KRAKOW!" (electromagnetic surge)

---

### DIESEL Type Cries

#### Philosophy
Diesel train cries should sound like engine rumbles, horns, and industrial machinery. Think mechanical power but synthesized.

#### Diesling (Starter DIESEL - #007)
- **Duration**: 550ms
- **Sound Description**: Small engine putter - scrappy and determined
- **Waveform Structure**:
  - Channel 1: Triangle wave (low), rumble oscillation 150Hz ± 30Hz
  - Channel 2: Pulse wave (50%), short horn beep at 500Hz
  - Channel 3: Noise, engine chug rhythm (da-da-da-da)
- **Pitch Contour**: Rumble with short horn accent
- **Personality**: Scrappy, working-class, determined

**Musical Notation**: "Chug-chug-chug-HONK!" (rhythmic with accent)

---

#### Wartorque (Mid DIESEL - #008)
- **Duration**: 700ms
- **Sound Description**: Powerful engine roar - industrial and tough
- **Waveform Structure**:
  - Channel 1: Triangle wave, deep rumble 100Hz with strong oscillation
  - Channel 2: Pulse wave (50%), longer horn 400Hz
  - Channel 3: Noise, heavy engine grind throughout
- **Pitch Contour**: Low rumble building to horn blast
- **Personality**: Tough, powerful, industrial

**Musical Notation**: "RRRRRR-HOOOOONK!" (rumble to horn)

---

#### Titanorque (Final DIESEL - #009)
- **Duration**: 950ms
- **Sound Description**: Massive diesel roar - unstoppable freight power
- **Waveform Structure**:
  - Channel 1: Triangle wave, very deep rumble 80Hz ± 20Hz
  - Channel 2: Pulse wave (50%), powerful foghorn 300Hz
  - Channel 3: Pulse wave (25%), harmonic overtone 600Hz
  - Channel 4: Noise, continuous heavy engine roar
- **Pitch Contour**: Deep rumble → powerful horn → rumble continues
- **Personality**: Unstoppable, massive, legendary freight

**Musical Notation**: "RRRRRRRR-HOOOOOOOOOONK-RRRRRR!" (continuous power)

---

### Specialized Type Cries (Guidelines)

#### MAGLEV Type
- **Sound Profile**: Futuristic whoosh, smooth glide, electromagnetic hum
- **Key Elements**: Swept frequencies, ethereal tones, minimal noise
- **Example**: Rising pitch sweep with sci-fi shimmer

#### FREIGHT Type
- **Sound Profile**: Heavy, low, cargo emphasis
- **Key Elements**: Deep bass, mechanical clanks, weight suggestions
- **Example**: Low horn with metallic accent

#### PASSENGER Type
- **Sound Profile**: Friendly, approachable, bell-like
- **Key Elements**: Pleasant tones, inviting sounds, melodic
- **Example**: Gentle chime or friendly whistle

#### NUCLEAR Type
- **Sound Profile**: Sci-fi power, energy hum, futuristic
- **Key Elements**: Synthesizer tones, power surge effects, mysterious
- **Example**: Pulsing energy sound with crescendo

#### MONORAIL Type
- **Sound Profile**: Smooth, modern, efficient
- **Key Elements**: Clean tones, minimal noise, streamlined
- **Example**: Smooth ascending pitch

---

### Implementation Notes for All Cries

**Variation System**:
- Each cry has 2-3 slight variations (pitch, duration) for variety
- Randomly select variation when played
- Prevents audio fatigue during long play sessions

**Pitch Shifting**:
- Evolution increases pitch depth (baby → teen → adult)
- Stronger trains have deeper, more resonant cries
- Legendary trains have longest, most complex cries

**Context Variations**:
- **Battle Entry**: Full cry plays
- **Menu Selection**: First 50% of cry plays (shortened)
- **Level Up**: Cry plays at 110% speed (excited)
- **Faint**: Cry plays at 70% speed, reversed (sad)

**File Naming Convention**:
```
train_cry_[species_id]_[name].ogg
Example: train_cry_001_steamini.ogg
Example: train_cry_001_steamini_var2.ogg (variation)
```

---

## Audio Technical Specifications

### File Formats

#### Music Tracks
- **Primary Format**: OGG Vorbis
  - Excellent quality-to-size ratio
  - Native browser support (modern browsers)
  - Better compression than MP3 for music
- **Fallback Format**: MP3
  - Universal compatibility
  - Use if OGG not supported
- **Bitrate**: 128 kbps (music), 96 kbps acceptable for ambient

#### Sound Effects
- **Primary Format**: OGG Vorbis
- **Fallback Format**: MP3
- **Bitrate**: 96 kbps (sufficient for short SFX)

#### Implementation Strategy
```javascript
// Example detection code (for Programming Agent)
const audioFormat = canPlayOGG() ? '.ogg' : '.mp3';
const musicTrack = new Audio(`music/piston_town${audioFormat}`);
```

---

### Sample Rates & Bit Depths

#### Music Tracks
- **Sample Rate**: 44.1 kHz (CD quality)
- **Bit Depth**: 16-bit
- **Channels**: Stereo (2.0)
- **Reasoning**: High quality for musical nuance, acceptable file size

#### Sound Effects (Long)
- **Sample Rate**: 22.05 kHz (half CD quality)
- **Bit Depth**: 16-bit
- **Channels**: Mono (converted to stereo for panning)
- **Reasoning**: Sufficient quality, smaller files
- **Applies To**: SFX > 500ms duration

#### Sound Effects (Short)
- **Sample Rate**: 22.05 kHz
- **Bit Depth**: 16-bit
- **Channels**: Mono
- **Reasoning**: Maximizes file size savings
- **Applies To**: SFX < 500ms duration (most UI sounds)

---

### File Size Targets

#### Total Audio Budget
- **Initial Load**: < 5 MB (preloaded essential audio)
- **Total Game Audio**: < 25 MB (all music + SFX)
- **Reasoning**: Mobile-friendly, fast loading

#### Per-File Targets
```
MUSIC (Town Themes):        < 1 MB each
MUSIC (Battle):             < 850 KB each
JINGLES (Victory/Defeat):   < 100 KB each
SFX (Long):                 < 50 KB each
SFX (Short):                < 15 KB each
TRAIN CRIES:                < 50 KB each
```

#### Compression Settings (OGG Vorbis)
```
Music: -q 5 (quality level 5, ~160 kbps VBR)
SFX:   -q 3 (quality level 3, ~112 kbps VBR)
Short: -q 1 (quality level 1, ~80 kbps VBR)
```

---

### Loading Strategy

#### Preload (Load at Game Start)
**Total Size**: ~3 MB
```
ESSENTIAL UI SOUNDS:
- button_press.ogg
- menu_navigate.ogg
- select_confirm.ogg
- select_cancel.ogg
- error.ogg

ESSENTIAL BATTLE:
- wild_battle_music.ogg
- victory_jingle.ogg
- defeat_jingle.ogg
- attack_hit.ogg
- hp_bar_tick.ogg

STARTER CRIES:
- train_cry_001_steamini.ogg
- train_cry_004_sparkart.ogg
- train_cry_007_diesling.ogg
```

#### Lazy Load (Load on Demand)
```
TOWN MUSIC:
- Load when player approaches town (100 tiles away)
- Unload previous town music after 30 seconds
- Keep current town music in cache

BATTLE MUSIC (Specialized):
- trainer_battle_music.ogg (load on trainer sight)
- gym_battle_music.ogg (load when gym entered)

TRAIN CRIES:
- Load when train first encountered or caught
- Keep in cache (small files)
- Maximum 20 cries cached at once
```

#### Background Loading
- Load next expected music during gameplay
- Example: Load Coal Harbor music while on Route 1 heading north
- Prevents interruptions

---

### Volume Levels (Relative, 0-100)

#### Master Volumes (User Adjustable)
```
MASTER VOLUME:  80 (default)
├─ MUSIC:       60 (default, relative to master)
├─ SFX:         80 (default, relative to master)
└─ UI SOUNDS:   70 (default, relative to master)
```

#### Music Volume Levels (Relative to Music Master)
```
Town Music:              100% (full volume)
Battle Music (Wild):     108% (slightly louder)
Battle Music (Trainer):  108%
Battle Music (Gym):      113% (louder for boss)
Victory Jingle:          117% (celebrate!)
Defeat Jingle:           108% (noticeable but not harsh)
```

#### SFX Volume Levels (Relative to SFX Master)
```
UI Sounds:               70-90%
Overworld Ambient:       40-60%
Footsteps:               35-45%
Doors:                   60-70%
Battle Effects:          75-90%
Critical Hit:            95% (loudest SFX)
Train Cries:             85-90%
```

---

### Mixing Priorities (What Plays When)

**Priority Levels** (1 = Highest, 5 = Lowest):

#### Priority 1: Critical Game Events (Cannot be interrupted)
- Victory Jingle
- Defeat Jingle
- Badge Get Fanfare
- Capture Success
- Train Faint
- Error/Invalid Action

#### Priority 2: Important Feedback (Can interrupt Priority 3+)
- UI Confirm/Cancel
- Battle Hit Sounds
- Critical Hit
- Super Effective
- HP Bar Ticks

#### Priority 3: Standard Interaction (Can interrupt Priority 4+)
- Button Press
- Menu Navigate
- Train Cries (battle context)
- Item Use Sounds

#### Priority 4: Ambient/Background (Can be interrupted by any)
- Footsteps
- Dialogue Text Blips
- Background Music (Music Channel)

#### Priority 5: Optional Layers
- Wind/Weather Ambient
- Crowd Noise (in cities)

**Simultaneous Sound Limits**:
- **Max Priority 1**: 1 sound at a time (queue if multiple)
- **Max Priority 2**: 4 sounds simultaneously
- **Max Priority 3**: 8 sounds simultaneously
- **Music**: 1 track at a time (cross-fade transitions)

---

### Fade Timing Specifications

#### Music Fades
```
FADE OUT (Exiting Area):
  Duration: 500ms
  Curve: Linear

FADE IN (Entering Area):
  Duration: 1000ms
  Curve: Ease-in (slow start, normal end)

CROSS-FADE (Area to Area):
  Duration: 1000ms
  Old track: Fade out (linear)
  New track: Fade in (ease-in)
  Overlap: 500ms (both playing at 50% midpoint)

BATTLE TRANSITION:
  Overworld Music: Fade out 300ms (quick)
  Battle Intro: Starts immediately after fadeout
  No cross-fade (clean transition)

RETURN FROM BATTLE:
  Battle Music: Stops immediately (no fade)
  Victory/Defeat Jingle: Plays
  Overworld Music: Fade in 1000ms after jingle
```

#### SFX Fades (Rare)
```
TRAIN FAINT:
  Volume: Fade out over 800ms (matches animation)
  Pitch: Descend 20% during fade (powering down)

HP BAR DECREASE:
  No fade (discrete ticks)
  Final tick: Hold 100ms then hard stop
```

---

### Mobile Considerations

#### Autoplay Restrictions
- **Issue**: Mobile browsers block audio autoplay
- **Solution**: Require user interaction before audio plays
- **Implementation**:
  ```
  On Game Load:
  1. Show "Tap to Start" splash screen
  2. User tap triggers audio context initialization
  3. Play short UI sound to test (silent if muted)
  4. Enable all audio playback
  ```

#### Battery Conservation
- **Audio Processing**: Use Web Audio API (hardware accelerated)
- **Inactive Tab**: Pause all audio if tab loses focus
- **Low Power Mode**: Detect and reduce SFX layering
- **Volume Ducking**: Respect system volume controls

#### File Size Optimization
- **Mobile Priority**: Smallest possible files without quality loss
- **Progressive Loading**: Load only what's needed now
- **Streaming**: Consider streaming long music tracks (future)

#### Touch Audio Feedback
- **Haptic Integration**: Optional vibration on button press (150ms)
- **Visual Feedback**: Always show button press visually (audio optional)
- **Delay Tolerance**: <50ms latency acceptable for SFX

---

### Browser Compatibility

#### Supported Formats by Browser
```
CHROME/EDGE:    OGG (yes), MP3 (yes) ✓
FIREFOX:        OGG (yes), MP3 (yes) ✓
SAFARI:         OGG (no*), MP3 (yes) → Use MP3 fallback
MOBILE CHROME:  OGG (yes), MP3 (yes) ✓
MOBILE SAFARI:  OGG (no*), MP3 (yes) → Use MP3 fallback

*Safari 14.1+ supports OGG, earlier versions need MP3
```

#### Detection & Fallback Strategy
```javascript
// For Programming Agent
function canPlayOgg() {
  const audio = document.createElement('audio');
  return audio.canPlayType('audio/ogg; codecs="vorbis"') !== '';
}

function getAudioFormat() {
  return canPlayOgg() ? 'ogg' : 'mp3';
}
```

#### Web Audio API Usage
- **Primary Method**: Use Web Audio API for precise control
- **Fallback**: HTML5 <audio> elements for older browsers
- **Features Needed**:
  - Volume control per sound
  - Pitch shifting (train cries on level up)
  - Playback speed control
  - Precise timing (HP bar ticks)

---

### Audio Context Management

#### Single Audio Context
- Create ONE AudioContext for entire game
- Reuse for all sounds
- Benefits: Performance, synchronization, mixing control

#### Audio Sprite Sheets (Optional Future Enhancement)
- Combine multiple short SFX into single file
- Reduce HTTP requests
- Use Web Audio API to play specific time ranges
- Example: All UI sounds in one file

**Example Sprite Sheet**:
```
ui_sounds_sprite.ogg (total: 2 seconds)
├─ 0.00-0.05s: button_press
├─ 0.05-0.10s: menu_navigate
├─ 0.10-0.20s: select_confirm
├─ 0.20-0.30s: select_cancel
└─ 0.30-0.50s: error
```

---

## Adaptive Music System

### Low HP Warning

**Trigger**: When player's active train HP < 25%

**Effect Options** (Choose one for implementation):

#### Option A: Tempo Increase
- Increase battle music playback speed to 110%
- Pitch shifts up slightly (more urgent)
- Returns to 100% when HP > 25% or train switches

#### Option B: Percussion Layer
- Add urgent hi-hat pattern (16th notes)
- Add tom-tom accents on beats 1 and 3
- Layer on top of existing battle music
- Remove layer when HP > 25%

#### Option C: Danger Variant (Recommended)
- Every 4 beats, swap to "danger" variant of battle music
- Danger variant: Same melody, minor key shift, added dissonance
- Alternates: 4 beats normal → 4 beats danger → repeat
- More noticeable than tempo change

**Implementation Note**: Option C is recommended for clear player feedback without changing familiar music too much.

---

### Wild Encounter Transition

**Sequence**:
```
1. OVERWORLD MUSIC PLAYING
   ↓
2. Wild train encounter triggered (random or forced)
   ↓
3. Screen flash effect starts (white flash)
   ↓
4. Overworld music FADE OUT (500ms)
   ↓
5. Battle intro music STARTS (5-second intro, plays once)
   ↓
6. Battle sprites appear
   ↓
7. Battle intro ENDS
   ↓
8. Battle music LOOPS (main section, seamless)
   ↓
9. Battle ends (player wins/loses/flees)
   ↓
10. IF WIN:
    - Battle music STOPS immediately
    - Victory Jingle PLAYS (6 seconds, cannot interrupt)
    - Overworld music FADE IN (1000ms, starts during last 2s of jingle)

    IF LOSE:
    - Battle music STOPS immediately
    - Defeat Jingle PLAYS (4 seconds)
    - Fade to black (return to Pokemon Center)
    - Pokemon Center music starts

    IF FLEE:
    - Battle music FADE OUT (300ms, quick)
    - Overworld music FADE IN (800ms)
```

**Timing Diagram**:
```
Time:    0s    0.5s   5.5s   [battle]   +0s    +6s    +8s
         |      |      |         |        |      |      |
Overworld: ████▓▓▓░░░                           ░░▓▓████
Battle:              ████████████████████
Victory:                                  ██████
                                          ↑ instant start
```

---

### Trainer Encounter Transition

**Sequence**:
```
1. Player walks into trainer's line of sight
   ↓
2. Overworld music continues (no immediate change)
   ↓
3. Exclamation mark appears above trainer
   ↓
4. Trainer "spots you" sound effect (short beep)
   ↓
5. Trainer walks toward player (overworld music still playing)
   ↓
6. Trainer reaches player
   ↓
7. Dialogue box appears ("Trainer spotted you!")
   ↓
8. Overworld music FADES OUT (500ms)
   ↓
9. Trainer Battle Intro STARTS (6-second dramatic intro)
   ↓
10. Battle sprites appear
    ↓
11. Intro ends, Trainer Battle music LOOPS
```

**Special**: Trainer battles cannot be fled, only won or lost.

---

### Gym Leader Approach

**Sequence**:
```
1. Player exploring gym (gym ambient music playing)
   ↓
2. Player steps onto tile directly in front of Gym Leader
   ↓
3. Gym music DUCKS to 30% volume (immediately)
   ↓
4. "Anticipation" sound effect plays (rising tension)
   ↓
5. Player can still move away:
   - If moves away: Gym music returns to 100% (500ms fade)
   - If initiates dialogue: Continue to step 6
   ↓
6. Player presses A to talk to Gym Leader
   ↓
7. Gym music STOPS (hard cut)
   ↓
8. Gym Leader dialogue plays (silent or soft dialogue music)
   ↓
9. "I accept your challenge!" (last dialogue line)
   ↓
10. Gym Leader Battle Intro STARTS (8-second epic intro)
    ↓
11. Battle sprites appear
    ↓
12. Intro ends, Gym Leader Battle music LOOPS
```

**Anticipation Sound Effect**:
- Duration: 2000ms
- Sound: Rising synthesizer tone (200Hz → 800Hz)
- Suggests something important is about to happen

---

### Legendary Encounter

**Sequence**:
```
1. Player approaches legendary train location (special area)
   ↓
2. Overworld music STOPS (hard cut, sudden silence)
   ↓
3. SILENCE (2 seconds, dramatic pause)
   ↓
4. Legendary Intro Sequence STARTS (10-15 seconds)
   - Mysterious sounds
   - Building tension
   - Unique to each legendary
   ↓
5. Legendary train appears (sprite fades in)
   ↓
6. Train cry plays (legendary cry, longer than normal)
   ↓
7. 1 second pause
   ↓
8. Legendary Battle Music STARTS (no intro, directly to loop)
   ↓
9. Battle begins
```

**Legendary Intro Sequence** (Music Specs):
- **Duration**: 12 seconds
- **Style**: Ambient, mysterious, powerful
- **Structure**:
  - 0-4s: Eerie ambient sounds (wind, echoes)
  - 4-8s: Legendary train's energy signature (rumble/hum)
  - 8-12s: Rising tension, builds to battle music
- **Does Not Loop**: Plays once, then battle music starts

---

### Victory Road

**Special Music Zone**: Victory Road is the final challenge before Elite Four

**Music Characteristics**:
- **Mood**: Intense, challenging, epic
- **Tempo**: 150 BPM (faster than any town)
- **Key**: E Minor (serious and dramatic)
- **Style**: Most intense overworld music in game
- **Purpose**: Build anticipation for final challenges

**Implementation**:
- Replaces normal route music
- Plays continuously throughout Victory Road area
- Does not fade when encountering wild trains (too many encounters)
- Only replaced by battle music during actual battles

---

### Elite Four & Champion

**Special Battle Music**: Each Elite Four member has unique variant

**Implementation Strategy**:

#### Base Elite Four Battle Music
- Similar intensity to Gym Leader theme
- Tempo: 155 BPM (fastest in game)
- Epic, final-challenge feel

#### Elite Four Variations (Same Track, Different Layers)
```
MEMBER 1 (Marshal Diesel):
  Base track + Heavy industrial percussion layer

MEMBER 2 (Conductor Luna):
  Base track + Ethereal synthesizer layer

MEMBER 3 (Engineer Blaze):
  Base track + Aggressive lead melody layer

MEMBER 4 (Admiral Surge):
  Base track + Watery ambient + electric crackle layer
```

**Benefits**:
- Reuses base music (saves file size)
- Each feels unique
- Progressive intensity

#### Champion Battle Music
- **Completely Unique Track**: Most epic music in game
- **Duration**: 120 seconds (longest loop)
- **Tempo**: 160 BPM (absolute fastest)
- **Key**: C Minor → C Major (struggle to triumph)
- **Instrumentation**: Full chiptune orchestra
- **Mood**: Legendary, once-in-a-lifetime, ultimate challenge

**Musical Structure**:
- Section A: Intense C minor battle theme (40s)
- Section B: Brief C major hopeful section (20s)
- Section C: Return to C minor with maximum intensity (40s)
- Section D: Climactic buildup before loop (20s)

---

## Implementation Guidelines

### For Programming Agent

#### Audio File Structure (Recommended)
```
/assets/audio/
├── music/
│   ├── towns/
│   │   ├── piston_town.ogg
│   │   ├── piston_town.mp3
│   │   ├── coal_harbor.ogg
│   │   ├── coal_harbor.mp3
│   │   ├── voltage_city.ogg
│   │   └── voltage_city.mp3
│   ├── battle/
│   │   ├── wild_battle.ogg
│   │   ├── wild_battle.mp3
│   │   ├── trainer_battle.ogg
│   │   ├── trainer_battle.mp3
│   │   ├── gym_battle.ogg
│   │   └── gym_battle.mp3
│   └── jingles/
│       ├── victory.ogg
│       ├── victory.mp3
│       ├── defeat.ogg
│       └── defeat.mp3
├── sfx/
│   ├── ui/
│   │   ├── button_press.ogg
│   │   ├── menu_navigate.ogg
│   │   └── [other UI sounds]
│   ├── overworld/
│   │   ├── footstep_grass.ogg
│   │   ├── door_open.ogg
│   │   └── [other overworld sounds]
│   └── battle/
│       ├── attack_hit.ogg
│       ├── super_effective.ogg
│       └── [other battle sounds]
└── cries/
    ├── train_cry_001_steamini.ogg
    ├── train_cry_002_steamore.ogg
    └── [all train cries]
```

#### Audio Manager Class (Pseudocode)
```javascript
class AudioManager {
  constructor() {
    this.audioContext = new AudioContext();
    this.sounds = {}; // Loaded audio buffers
    this.music = null; // Currently playing music
    this.volumes = {
      master: 0.8,
      music: 0.6,
      sfx: 0.8,
      ui: 0.7
    };
  }

  // Preload essential audio
  async preload() {
    const essentialFiles = [
      'sfx/ui/button_press',
      'music/battle/wild_battle',
      'music/jingles/victory',
      // ... more
    ];

    for (let file of essentialFiles) {
      await this.loadSound(file);
    }
  }

  // Load audio file
  async loadSound(path) {
    const format = this.detectFormat(); // .ogg or .mp3
    const response = await fetch(`${path}${format}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.sounds[path] = audioBuffer;
  }

  // Play music with loop
  playMusic(name, fadeInDuration = 1000) {
    if (this.music) {
      this.stopMusic(500); // Fade out current
    }

    const buffer = this.sounds[`music/${name}`];
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.loopStart = this.getLoopPoint(name); // e.g., 0:08 for Piston Town

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0;
    source.connect(gainNode).connect(this.audioContext.destination);

    source.start(0);
    this.fadeIn(gainNode, fadeInDuration, this.volumes.music * this.volumes.master);

    this.music = { source, gainNode };
  }

  // Play sound effect
  playSFX(name, volume = 1.0, priority = 3) {
    const buffer = this.sounds[`sfx/${name}`];
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = volume * this.volumes.sfx * this.volumes.master;
    source.connect(gainNode).connect(this.audioContext.destination);

    source.start(0);
    return source; // Return for potential stopping
  }

  // Fade in audio
  fadeIn(gainNode, duration, targetVolume) {
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      targetVolume,
      this.audioContext.currentTime + duration / 1000
    );
  }

  // Fade out and stop music
  stopMusic(fadeOutDuration = 500) {
    if (!this.music) return;

    this.music.gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + fadeOutDuration / 1000
    );

    setTimeout(() => {
      this.music.source.stop();
      this.music = null;
    }, fadeOutDuration);
  }
}
```

#### Loop Point Definition (For Each Track)
```javascript
const LOOP_POINTS = {
  'towns/piston_town': 8.0,      // Loop starts at 8 seconds
  'towns/coal_harbor': 6.0,      // Loop starts at 6 seconds
  'towns/voltage_city': 4.0,     // Loop starts at 4 seconds
  'battle/wild_battle': 5.0,     // Loop starts at 5 seconds
  'battle/trainer_battle': 6.0,  // Loop starts at 6 seconds
  'battle/gym_battle': 8.0,      // Loop starts at 8 seconds
  // Jingles don't loop (loopStart = 0, loop = false)
};
```

---

### Audio Production Guidelines (For Future Audio Creators)

#### Tools Recommended
- **Chiptune Creation**: FamiTracker, BeepBox, 1BitDragon
- **General Music**: LMMS, FL Studio, Ableton Live
- **SFX Creation**: Bfxr, ChipTone, Audacity
- **Conversion**: Audacity (export to OGG/MP3)

#### Production Workflow
```
1. COMPOSITION (Chiptune Tracker)
   - Create music using 4-channel limitation
   - Follow tempo and key specifications
   - Export as WAV (uncompressed)

2. EDITING (Audio Editor)
   - Trim silence from start/end
   - Normalize volume to -3dB peak
   - Apply gentle EQ (warm low-end boost)
   - Ensure seamless loop point

3. COMPRESSION (Encoder)
   - Export to OGG Vorbis (quality 5)
   - Export to MP3 (192 kbps)
   - Verify file sizes meet targets

4. TESTING (In-Game)
   - Test loop seamlessness
   - Check volume relative to other tracks
   - Verify fade in/out smoothness
   - Test on mobile devices
```

#### Quality Checklist
- [ ] Track follows specified tempo (BPM)
- [ ] Track is in correct key signature
- [ ] Instrumentation matches chiptune aesthetic
- [ ] Mood matches specification
- [ ] Loop point is seamless (no click/pop)
- [ ] File size is under target
- [ ] Volume is normalized
- [ ] No clipping/distortion
- [ ] Tested in both OGG and MP3
- [ ] Sounds warm and inviting (not harsh)

---

### Testing Protocol

#### Music Testing
```
FOR EACH MUSIC TRACK:
1. Load track in-game
2. Let it loop 5+ times (test seamless loop)
3. Test fade in from silence
4. Test fade out to silence
5. Test cross-fade to another track
6. Test on desktop browser
7. Test on mobile browser (iOS + Android)
8. Verify file size < target
9. Check for audio glitches/artifacts
10. Ensure warm, cozy aesthetic maintained
```

#### SFX Testing
```
FOR EACH SOUND EFFECT:
1. Play in isolation
2. Play with music (check mixing)
3. Play rapidly 10 times (check no lag)
4. Test at various volume levels
5. Verify duration matches spec
6. Check for clipping
7. Test simultaneous playback (multiple instances)
8. Mobile device testing
```

#### Performance Testing
```
STRESS TESTS:
- Play 10 SFX simultaneously (check performance)
- Rapid music transitions (town to town to town)
- Battle start/end loop 20 times (check memory leaks)
- Low HP condition during long battle (adaptive music works)
- Mobile browser with low power mode enabled
```

---

## Appendix: Quick Reference Tables

### Music Tracks Summary
| Track Name | BPM | Key | Duration | Loop Point | File Size |
|------------|-----|-----|----------|------------|-----------|
| Piston Town | 102 | C Major | 75s | 0:08 | <800 KB |
| Coal Harbor | 126 | D Minor/Major | 80s | 0:06 | <850 KB |
| Voltage City | 144 | A Minor | 70s | 0:04 | <800 KB |
| Wild Battle | 136 | C Minor | 60s | 0:05 | <750 KB |
| Trainer Battle | 140 | G Minor | 75s | 0:06 | <850 KB |
| Gym Battle | 145 | A Minor/C Major | 90s | 0:08 | <950 KB |
| Victory Jingle | 120 | C Major | 6s | No Loop | <100 KB |
| Defeat Jingle | 80 | A Minor | 4s | No Loop | <80 KB |

### SFX Summary (Essential)
| SFX Name | Duration | Volume | Priority | Size |
|----------|----------|--------|----------|------|
| Button Press | 50ms | 70% | Med | <10 KB |
| Menu Navigate | 30ms | 60% | Med | <8 KB |
| Select Confirm | 100ms | 75% | High | <15 KB |
| Select Cancel | 100ms | 70% | High | <15 KB |
| Error | 200ms | 65% | High | <20 KB |
| Attack Hit | 150ms | 75% | High | <20 KB |
| Super Effective | 200ms | 85% | High | <25 KB |
| Critical Hit | 250ms | 90% | Highest | <30 KB |
| HP Bar Tick | 40ms | 55% | High | <8 KB |
| Train Faint | 800ms | 70% | High | <60 KB |
| Victory Jingle | 6000ms | 70% | Highest | <100 KB |

### Train Cry Summary (Starters)
| Train | Type | Duration | Character |
|-------|------|----------|-----------|
| Steamini | STEAM | 600ms | Young whistle, cheerful |
| Steamore | STEAM | 750ms | Confident horn, strong |
| Locomotor | STEAM | 900ms | Deep power horn, legendary |
| Sparkart | ELECTRIC | 500ms | Quick zap, energetic |
| Voltrain | ELECTRIC | 650ms | Synth sweep, sleek |
| Thunderail | ELECTRIC | 850ms | EM pulse, powerful |
| Diesling | DIESEL | 550ms | Engine putter, scrappy |
| Wartorque | DIESEL | 700ms | Engine roar, tough |
| Titanorque | DIESEL | 950ms | Massive roar, unstoppable |

### Volume Hierarchy
```
LOUDEST (90-100%):
- Critical Hit SFX
- Badge Get Fanfare
- Champion Battle Music

LOUD (80-90%):
- Victory Jingle
- Capture Success
- Super Effective Hit
- Train Cries

NORMAL (70-80%):
- Most Battle SFX
- Gym Battle Music
- UI Confirm/Cancel

QUIET (60-70%):
- Standard Battle Music
- Town Music
- UI Button Press

VERY QUIET (40-60%):
- Menu Navigate
- HP Bar Ticks
- Footsteps
- Dialogue Blips

AMBIENT (20-40%):
- Background Layers
- Wind/Weather
```

---

## Document Status

**Completion**: 100% (All specified deliverables completed)
**Ready for Implementation**: YES
**Requires Actual Audio Files**: NO (Specification-only mode)

### Deliverables Checklist
- [x] Town Music Themes (First 3 Towns: Piston, Coal Harbor, Voltage)
- [x] Battle Music Specifications (Wild, Trainer, Gym, Victory, Defeat)
- [x] Sound Effect Library (UI, Overworld, Battle - 30+ SFX specified)
- [x] Train Vocalizations System (Starter cries + guidelines)
- [x] Audio Technical Specifications (Formats, rates, file sizes, loading)
- [x] Adaptive Music System (Low HP, transitions, special encounters)
- [x] Implementation Guidelines (File structure, code examples, testing)

### Next Steps (For Development Team)
1. **Programming Agent**: Implement Audio Manager system using specs
2. **Art Direction Agent**: Review audio specs match visual aesthetic
3. **Game Design Agent**: Confirm battle audio integration points
4. **Future Audio Production**: Use specs to create actual audio files
5. **Playtesting**: Test all adaptive music systems work as specified

---

**End of Audio Specifications Document**

*This comprehensive specification is ready for implementation and provides all necessary details for audio integration into Train Battle RPG. All specifications honor the game's warm, cozy, painterly aesthetic and Pokemon Gen 1/2 inspiration while maintaining mobile-friendly constraints.*

---

**Sound & Music Agent**
**Date**: 2025-10-23
**Version**: 1.0 Final
