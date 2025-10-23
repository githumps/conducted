"""Game constants - matching Pokemon Red/Blue style"""

# Display settings
TILE_SIZE = 16
SCALE = 3  # Scale up for modern displays
SCREEN_TILES_X = 20  # Original Game Boy was 160px / 8 = 20 tiles
SCREEN_TILES_Y = 18  # Original Game Boy was 144px / 8 = 18 tiles
SCREEN_WIDTH = TILE_SIZE * SCREEN_TILES_X * SCALE
SCREEN_HEIGHT = TILE_SIZE * SCREEN_TILES_Y * SCALE
FPS = 60

# Game info
GAME_TITLE = "Train Battle RPG"
VERSION = "1.0.0"

# Colors (Game Boy style palette)
COLOR_WHITE = (248, 248, 248)
COLOR_LIGHT_GRAY = (168, 168, 168)
COLOR_DARK_GRAY = (88, 88, 88)
COLOR_BLACK = (8, 8, 8)
COLOR_TRANSPARENT = (255, 0, 255)

# UI Colors (Pokemon style)
UI_BG = COLOR_WHITE
UI_BORDER = COLOR_BLACK
UI_TEXT = COLOR_BLACK
UI_HIGHLIGHT = (0, 112, 192)

# Controls
KEY_UP = pygame.K_UP
KEY_DOWN = pygame.K_DOWN
KEY_LEFT = pygame.K_LEFT
KEY_RIGHT = pygame.K_RIGHT
KEY_A = pygame.K_z  # Confirm
KEY_B = pygame.K_x  # Cancel
KEY_START = pygame.K_RETURN
KEY_SELECT = pygame.K_BACKSPACE

# Game states
STATE_TITLE = "title"
STATE_OVERWORLD = "overworld"
STATE_BATTLE = "battle"
STATE_MENU = "menu"
STATE_DIALOGUE = "dialogue"

# Directions
DIR_UP = 0
DIR_DOWN = 1
DIR_LEFT = 2
DIR_RIGHT = 3

# Train types
TRAIN_TYPES = [
    "STEAM",
    "ELECTRIC",
    "DIESEL",
    "MAGLEV",
    "FREIGHT",
    "PASSENGER",
    "NUCLEAR",
    "MONORAIL"
]

# Type effectiveness chart (attacker -> defender)
TYPE_CHART = {
    "STEAM": {"ELECTRIC": 0.5, "DIESEL": 2.0, "NUCLEAR": 0.5},
    "ELECTRIC": {"STEAM": 2.0, "DIESEL": 0.5, "MAGLEV": 2.0},
    "DIESEL": {"ELECTRIC": 2.0, "STEAM": 0.5, "FREIGHT": 0.5},
    "MAGLEV": {"FREIGHT": 2.0, "ELECTRIC": 0.5, "MONORAIL": 0.5},
    "FREIGHT": {"MAGLEV": 0.5, "PASSENGER": 2.0, "DIESEL": 2.0},
    "PASSENGER": {"NUCLEAR": 2.0, "FREIGHT": 0.5, "MONORAIL": 0.5},
    "NUCLEAR": {"PASSENGER": 0.5, "MONORAIL": 2.0, "STEAM": 2.0},
    "MONORAIL": {"NUCLEAR": 0.5, "MAGLEV": 2.0, "PASSENGER": 2.0}
}

# Max values
MAX_LEVEL = 100
MAX_PARTY_SIZE = 6
MAX_MOVES = 4
TOTAL_TRAINS = 151

import pygame
