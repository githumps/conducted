#!/usr/bin/env python3
"""
Train Battle RPG - A Pokemon Red/Blue inspired game with trains!
"""

import pygame
import sys
from game.game_manager import GameManager
from game.constants import SCREEN_WIDTH, SCREEN_HEIGHT, FPS, GAME_TITLE

def main():
    """Main entry point for the game."""
    pygame.init()

    # Set up the display
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption(GAME_TITLE)

    # Create game manager
    game = GameManager(screen)

    # Main game loop
    clock = pygame.time.Clock()
    running = True

    while running:
        dt = clock.tick(FPS) / 1000.0  # Delta time in seconds

        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            game.handle_event(event)

        # Update game state
        game.update(dt)

        # Render
        game.render(screen)
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
