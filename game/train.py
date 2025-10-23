"""Train class - equivalent to Pokemon"""

import json
import random
from game.constants import MAX_LEVEL, MAX_MOVES, TRAIN_TYPES

class Train:
    """Represents a single train creature."""

    def __init__(self, species_id, level=5, moves=None):
        self.species_id = species_id
        self.species = TRAIN_SPECIES[species_id]
        self.nickname = self.species["name"]
        self.level = level
        self.exp = self.calculate_exp_for_level(level)

        # Stats
        self.base_hp = self.species["base_stats"]["hp"]
        self.base_attack = self.species["base_stats"]["attack"]
        self.base_defense = self.species["base_stats"]["defense"]
        self.base_speed = self.species["base_stats"]["speed"]
        self.base_special = self.species["base_stats"]["special"]

        # Individual Values (IVs) - like Pokemon
        self.iv_hp = random.randint(0, 15)
        self.iv_attack = random.randint(0, 15)
        self.iv_defense = random.randint(0, 15)
        self.iv_speed = random.randint(0, 15)
        self.iv_special = random.randint(0, 15)

        # Calculate actual stats
        self.max_hp = self.calculate_stat("hp")
        self.current_hp = self.max_hp
        self.attack = self.calculate_stat("attack")
        self.defense = self.calculate_stat("defense")
        self.speed = self.calculate_stat("speed")
        self.special = self.calculate_stat("special")

        # Moves
        self.moves = moves if moves else self.get_starting_moves()

        # Status
        self.status = None  # None, "BURN", "FREEZE", "PARALYZE", etc.
        self.fainted = False

        # Types
        self.types = self.species["types"]

    def calculate_stat(self, stat_name):
        """Calculate actual stat based on base stat, IV, and level (Gen 1 formula)."""
        if stat_name == "hp":
            base = self.base_hp
            iv = self.iv_hp
            stat_value = int(((base + iv) * 2 * self.level) / 100) + self.level + 10
        else:
            if stat_name == "attack":
                base, iv = self.base_attack, self.iv_attack
            elif stat_name == "defense":
                base, iv = self.base_defense, self.iv_defense
            elif stat_name == "speed":
                base, iv = self.base_speed, self.iv_speed
            else:  # special
                base, iv = self.base_special, self.iv_special

            stat_value = int(((base + iv) * 2 * self.level) / 100) + 5

        return stat_value

    def calculate_exp_for_level(self, level):
        """Calculate EXP needed for level (Medium Fast growth rate like Pikachu)."""
        return level ** 3

    def gain_exp(self, amount):
        """Gain experience points."""
        self.exp += amount

        # Check for level up
        while self.exp >= self.calculate_exp_for_level(self.level + 1) and self.level < MAX_LEVEL:
            self.level_up()

    def level_up(self):
        """Level up the train."""
        self.level += 1

        # Recalculate stats
        old_max_hp = self.max_hp
        self.max_hp = self.calculate_stat("hp")
        self.current_hp += (self.max_hp - old_max_hp)  # Heal the HP gained
        self.attack = self.calculate_stat("attack")
        self.defense = self.calculate_stat("defense")
        self.speed = self.calculate_stat("speed")
        self.special = self.calculate_stat("special")

        # Learn new moves
        self.check_for_new_moves()

    def check_for_new_moves(self):
        """Check if train learns new moves at this level."""
        for move_data in self.species["learnset"]:
            if move_data["level"] == self.level:
                if len(self.moves) < MAX_MOVES:
                    self.moves.append(move_data["move"])
                else:
                    # Would trigger move learning dialog in full implementation
                    pass

    def get_starting_moves(self):
        """Get the starting moves for this train."""
        moves = []
        for move_data in self.species["learnset"]:
            if move_data["level"] <= self.level and len(moves) < MAX_MOVES:
                moves.append(move_data["move"])
        return moves if moves else ["Tackle"]  # Default move

    def take_damage(self, damage):
        """Take damage."""
        self.current_hp = max(0, self.current_hp - damage)
        if self.current_hp == 0:
            self.fainted = True

    def heal(self, amount):
        """Heal HP."""
        self.current_hp = min(self.max_hp, self.current_hp + amount)
        if self.current_hp > 0:
            self.fainted = False

    def can_evolve(self):
        """Check if train can evolve."""
        evolution = self.species.get("evolution")
        if evolution:
            if evolution["method"] == "level" and self.level >= evolution["level"]:
                return True
        return False

    def evolve(self):
        """Evolve the train."""
        evolution = self.species.get("evolution")
        if evolution and self.can_evolve():
            self.species_id = evolution["evolves_to"]
            self.species = TRAIN_SPECIES[self.species_id]
            self.nickname = self.species["name"]
            self.types = self.species["types"]

            # Update base stats
            self.base_hp = self.species["base_stats"]["hp"]
            self.base_attack = self.species["base_stats"]["attack"]
            self.base_defense = self.species["base_stats"]["defense"]
            self.base_speed = self.species["base_stats"]["speed"]
            self.base_special = self.species["base_stats"]["special"]

            # Recalculate actual stats
            old_max_hp = self.max_hp
            self.max_hp = self.calculate_stat("hp")
            self.current_hp += (self.max_hp - old_max_hp)
            self.attack = self.calculate_stat("attack")
            self.defense = self.calculate_stat("defense")
            self.speed = self.calculate_stat("speed")
            self.special = self.calculate_stat("special")

    def to_dict(self):
        """Serialize train to dictionary for saving."""
        return {
            "species_id": self.species_id,
            "nickname": self.nickname,
            "level": self.level,
            "exp": self.exp,
            "current_hp": self.current_hp,
            "moves": self.moves,
            "iv_hp": self.iv_hp,
            "iv_attack": self.iv_attack,
            "iv_defense": self.iv_defense,
            "iv_speed": self.iv_speed,
            "iv_special": self.iv_special,
            "status": self.status,
            "fainted": self.fainted
        }

    @staticmethod
    def from_dict(data):
        """Deserialize train from dictionary."""
        train = Train(data["species_id"], data["level"], data["moves"])
        train.nickname = data["nickname"]
        train.exp = data["exp"]
        train.current_hp = data["current_hp"]
        train.iv_hp = data["iv_hp"]
        train.iv_attack = data["iv_attack"]
        train.iv_defense = data["iv_defense"]
        train.iv_speed = data["iv_speed"]
        train.iv_special = data["iv_special"]
        train.status = data["status"]
        train.fainted = data["fainted"]

        # Recalculate stats
        train.max_hp = train.calculate_stat("hp")
        train.attack = train.calculate_stat("attack")
        train.defense = train.calculate_stat("defense")
        train.speed = train.calculate_stat("speed")
        train.special = train.calculate_stat("special")

        return train


# Train Species Database (First 20 of 151)
TRAIN_SPECIES = {
    1: {
        "name": "Steamini",
        "types": ["STEAM"],
        "base_stats": {"hp": 45, "attack": 49, "defense": 49, "speed": 45, "special": 65},
        "learnset": [
            {"level": 1, "move": "Whistle"},
            {"level": 7, "move": "Coal Throw"},
            {"level": 13, "move": "Steam Jet"},
            {"level": 20, "move": "Boiler Burst"}
        ],
        "evolution": {"method": "level", "level": 16, "evolves_to": 2}
    },
    2: {
        "name": "Steamore",
        "types": ["STEAM"],
        "base_stats": {"hp": 60, "attack": 62, "defense": 63, "speed": 60, "special": 80},
        "learnset": [
            {"level": 1, "move": "Whistle"},
            {"level": 7, "move": "Coal Throw"},
            {"level": 13, "move": "Steam Jet"},
            {"level": 20, "move": "Boiler Burst"},
            {"level": 32, "move": "Pressure Blast"}
        ],
        "evolution": {"method": "level", "level": 32, "evolves_to": 3}
    },
    3: {
        "name": "Locomotor",
        "types": ["STEAM", "FREIGHT"],
        "base_stats": {"hp": 80, "attack": 82, "defense": 83, "speed": 80, "special": 100},
        "learnset": [
            {"level": 1, "move": "Whistle"},
            {"level": 7, "move": "Coal Throw"},
            {"level": 13, "move": "Steam Jet"},
            {"level": 20, "move": "Boiler Burst"},
            {"level": 32, "move": "Pressure Blast"},
            {"level": 45, "move": "Mega Steam"}
        ],
        "evolution": None
    },
    4: {
        "name": "Sparkart",
        "types": ["ELECTRIC"],
        "base_stats": {"hp": 39, "attack": 52, "defense": 43, "speed": 65, "special": 60},
        "learnset": [
            {"level": 1, "move": "Spark"},
            {"level": 9, "move": "Charge Beam"},
            {"level": 15, "move": "Thunder Wave"},
            {"level": 22, "move": "Rail Gun"}
        ],
        "evolution": {"method": "level", "level": 16, "evolves_to": 5}
    },
    5: {
        "name": "Voltrain",
        "types": ["ELECTRIC"],
        "base_stats": {"hp": 58, "attack": 64, "defense": 58, "speed": 80, "special": 80},
        "learnset": [
            {"level": 1, "move": "Spark"},
            {"level": 9, "move": "Charge Beam"},
            {"level": 15, "move": "Thunder Wave"},
            {"level": 22, "move": "Rail Gun"},
            {"level": 36, "move": "Lightning Express"}
        ],
        "evolution": {"method": "level", "level": 36, "evolves_to": 6}
    },
    6: {
        "name": "Thunderail",
        "types": ["ELECTRIC", "MAGLEV"],
        "base_stats": {"hp": 78, "attack": 84, "defense": 78, "speed": 100, "special": 109},
        "learnset": [
            {"level": 1, "move": "Spark"},
            {"level": 9, "move": "Charge Beam"},
            {"level": 15, "move": "Thunder Wave"},
            {"level": 22, "move": "Rail Gun"},
            {"level": 36, "move": "Lightning Express"},
            {"level": 52, "move": "Electromagnetic Pulse"}
        ],
        "evolution": None
    },
    7: {
        "name": "Diesling",
        "types": ["DIESEL"],
        "base_stats": {"hp": 44, "attack": 48, "defense": 65, "speed": 43, "special": 50},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 8, "move": "Diesel Spray"},
            {"level": 15, "move": "Engine Rev"},
            {"level": 22, "move": "Fuel Blast"}
        ],
        "evolution": {"method": "level", "level": 16, "evolves_to": 8}
    },
    8: {
        "name": "Wartorque",
        "types": ["DIESEL"],
        "base_stats": {"hp": 59, "attack": 63, "defense": 80, "speed": 58, "special": 65},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 8, "move": "Diesel Spray"},
            {"level": 15, "move": "Engine Rev"},
            {"level": 22, "move": "Fuel Blast"},
            {"level": 32, "move": "Turbo Charge"}
        ],
        "evolution": {"method": "level", "level": 32, "evolves_to": 9}
    },
    9: {
        "name": "Titanorque",
        "types": ["DIESEL", "FREIGHT"],
        "base_stats": {"hp": 79, "attack": 83, "defense": 100, "speed": 78, "special": 85},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 8, "move": "Diesel Spray"},
            {"level": 15, "move": "Engine Rev"},
            {"level": 22, "move": "Fuel Blast"},
            {"level": 32, "move": "Turbo Charge"},
            {"level": 48, "move": "Heavy Haul"}
        ],
        "evolution": None
    },
    10: {
        "name": "Trackie",
        "types": ["PASSENGER"],
        "base_stats": {"hp": 45, "attack": 30, "defense": 35, "speed": 45, "special": 20},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 9, "move": "String Shot"}
        ],
        "evolution": {"method": "level", "level": 7, "evolves_to": 11}
    },
    11: {
        "name": "Coachoon",
        "types": ["PASSENGER"],
        "base_stats": {"hp": 50, "attack": 20, "defense": 55, "speed": 30, "special": 25},
        "learnset": [
            {"level": 1, "move": "Harden"}
        ],
        "evolution": {"method": "level", "level": 10, "evolves_to": 12}
    },
    12: {
        "name": "Majesticab",
        "types": ["PASSENGER", "MAGLEV"],
        "base_stats": {"hp": 60, "attack": 45, "defense": 50, "speed": 70, "special": 90},
        "learnset": [
            {"level": 10, "move": "Confusion"},
            {"level": 13, "move": "Gust"},
            {"level": 17, "move": "Passenger Rush"},
            {"level": 25, "move": "Express Service"}
        ],
        "evolution": None
    },
    13: {
        "name": "Cartle",
        "types": ["FREIGHT"],
        "base_stats": {"hp": 40, "attack": 35, "defense": 30, "speed": 50, "special": 20},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 10, "move": "Cargo Toss"}
        ],
        "evolution": {"method": "level", "level": 7, "evolves_to": 14}
    },
    14: {
        "name": "Haulkoon",
        "types": ["FREIGHT"],
        "base_stats": {"hp": 45, "attack": 25, "defense": 50, "speed": 35, "special": 25},
        "learnset": [
            {"level": 1, "move": "Harden"}
        ],
        "evolution": {"method": "level", "level": 10, "evolves_to": 15}
    },
    15: {
        "name": "Cargodrill",
        "types": ["FREIGHT", "DIESEL"],
        "base_stats": {"hp": 65, "attack": 90, "defense": 40, "speed": 75, "special": 45},
        "learnset": [
            {"level": 10, "move": "Fury Attack"},
            {"level": 15, "move": "Cargo Cannon"},
            {"level": 20, "move": "Container Crush"},
            {"level": 30, "move": "Freight Frenzy"}
        ],
        "evolution": None
    },
    16: {
        "name": "Railoo",
        "types": ["PASSENGER"],
        "base_stats": {"hp": 40, "attack": 45, "defense": 40, "speed": 56, "special": 35},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 5, "move": "Gust"},
            {"level": 9, "move": "Quick Attack"}
        ],
        "evolution": {"method": "level", "level": 18, "evolves_to": 17}
    },
    17: {
        "name": "Raileon",
        "types": ["PASSENGER"],
        "base_stats": {"hp": 63, "attack": 60, "defense": 55, "speed": 71, "special": 50},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 5, "move": "Gust"},
            {"level": 9, "move": "Quick Attack"},
            {"level": 21, "move": "Wing Attack"}
        ],
        "evolution": {"method": "level", "level": 36, "evolves_to": 18}
    },
    18: {
        "name": "Railgeot",
        "types": ["PASSENGER", "MAGLEV"],
        "base_stats": {"hp": 83, "attack": 80, "defense": 75, "speed": 101, "special": 70},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 5, "move": "Gust"},
            {"level": 9, "move": "Quick Attack"},
            {"level": 21, "move": "Wing Attack"},
            {"level": 44, "move": "Sky Attack"}
        ],
        "evolution": None
    },
    19: {
        "name": "Trackat",
        "types": ["PASSENGER"],
        "base_stats": {"hp": 30, "attack": 56, "defense": 35, "speed": 72, "special": 25},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 7, "move": "Quick Attack"},
            {"level": 14, "move": "Hyper Fang"}
        ],
        "evolution": {"method": "level", "level": 20, "evolves_to": 20}
    },
    20: {
        "name": "Railcate",
        "types": ["PASSENGER"],
        "base_stats": {"hp": 55, "attack": 81, "defense": 60, "speed": 97, "special": 50},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 7, "move": "Quick Attack"},
            {"level": 14, "move": "Hyper Fang"},
            {"level": 27, "move": "Super Fang"}
        ],
        "evolution": None
    },
    # Continuing with more trains...
    21: {
        "name": "Monowl",
        "types": ["MONORAIL", "PASSENGER"],
        "base_stats": {"hp": 40, "attack": 60, "defense": 30, "speed": 70, "special": 31},
        "learnset": [
            {"level": 1, "move": "Peck"},
            {"level": 9, "move": "Leer"},
            {"level": 15, "move": "Fury Attack"}
        ],
        "evolution": {"method": "level", "level": 20, "evolves_to": 22}
    },
    22: {
        "name": "Monoking",
        "types": ["MONORAIL", "PASSENGER"],
        "base_stats": {"hp": 65, "attack": 90, "defense": 65, "speed": 100, "special": 61},
        "learnset": [
            {"level": 1, "move": "Peck"},
            {"level": 9, "move": "Leer"},
            {"level": 15, "move": "Fury Attack"},
            {"level": 25, "move": "Drill Peck"}
        ],
        "evolution": None
    },
    23: {
        "name": "Tunnela",
        "types": ["DIESEL"],
        "base_stats": {"hp": 35, "attack": 60, "defense": 44, "speed": 55, "special": 40},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 10, "move": "Poison Sting"},
            {"level": 17, "move": "Bite"}
        ],
        "evolution": {"method": "level", "level": 22, "evolves_to": 24}
    },
    24: {
        "name": "Cobraloco",
        "types": ["DIESEL"],
        "base_stats": {"hp": 60, "attack": 95, "defense": 69, "speed": 80, "special": 65},
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 10, "move": "Poison Sting"},
            {"level": 17, "move": "Bite"},
            {"level": 27, "move": "Glare"}
        ],
        "evolution": None
    },
    25: {
        "name": "Zaptram",
        "types": ["ELECTRIC"],
        "base_stats": {"hp": 35, "attack": 55, "defense": 40, "speed": 90, "special": 50},
        "learnset": [
            {"level": 1, "move": "Thunder Shock"},
            {"level": 6, "move": "Tail Whip"},
            {"level": 8, "move": "Thunder Wave"},
            {"level": 11, "move": "Quick Attack"}
        ],
        "evolution": {"method": "item", "item": "thunder_stone", "evolves_to": 26}
    },
    26: {
        "name": "Raitram",
        "types": ["ELECTRIC"],
        "base_stats": {"hp": 60, "attack": 90, "defense": 55, "speed": 110, "special": 90},
        "learnset": [
            {"level": 1, "move": "Thunder Shock"},
            {"level": 1, "move": "Growl"},
            {"level": 1, "move": "Thunder Wave"}
        ],
        "evolution": None
    },
}

# Add more trains to reach 151 - these are simplified entries
for i in range(27, 152):
    train_types = [random.choice(TRAIN_TYPES)]
    if random.random() > 0.7:  # 30% chance of dual type
        train_types.append(random.choice([t for t in TRAIN_TYPES if t != train_types[0]]))

    TRAIN_SPECIES[i] = {
        "name": f"Train{i:03d}",
        "types": train_types,
        "base_stats": {
            "hp": random.randint(30, 120),
            "attack": random.randint(30, 120),
            "defense": random.randint(30, 120),
            "speed": random.randint(30, 120),
            "special": random.randint(30, 120)
        },
        "learnset": [
            {"level": 1, "move": "Tackle"},
            {"level": 10, "move": "Basic Attack"},
            {"level": 20, "move": "Power Move"},
            {"level": 30, "move": "Ultimate Move"}
        ],
        "evolution": None
    }
