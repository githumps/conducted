"""Move database and battle move mechanics"""

from game.constants import TYPE_CHART
import random

class Move:
    """Represents a battle move."""

    def __init__(self, name):
        self.data = MOVES_DB[name]
        self.name = name
        self.type = self.data["type"]
        self.category = self.data["category"]  # "physical", "special", or "status"
        self.power = self.data["power"]
        self.accuracy = self.data["accuracy"]
        self.pp = self.data["pp"]
        self.max_pp = self.data["pp"]
        self.effect = self.data.get("effect")

    def use(self):
        """Use the move, decreasing PP."""
        if self.pp > 0:
            self.pp -= 1
            return True
        return False

    def restore_pp(self, amount=None):
        """Restore PP."""
        if amount is None:
            self.pp = self.max_pp
        else:
            self.pp = min(self.max_pp, self.pp + amount)


# Moves Database
MOVES_DB = {
    # Normal/Generic moves
    "Tackle": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 40,
        "accuracy": 100,
        "pp": 35,
        "effect": None
    },
    "Quick Attack": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 40,
        "accuracy": 100,
        "pp": 30,
        "effect": {"priority": 1}
    },
    "Body Slam": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 85,
        "accuracy": 100,
        "pp": 15,
        "effect": {"paralyze_chance": 30}
    },

    # Steam moves
    "Whistle": {
        "type": "STEAM",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 40,
        "effect": {"lower_attack": 1}
    },
    "Coal Throw": {
        "type": "STEAM",
        "category": "physical",
        "power": 50,
        "accuracy": 95,
        "pp": 25,
        "effect": {"burn_chance": 10}
    },
    "Steam Jet": {
        "type": "STEAM",
        "category": "special",
        "power": 65,
        "accuracy": 100,
        "pp": 20,
        "effect": {"burn_chance": 20}
    },
    "Boiler Burst": {
        "type": "STEAM",
        "category": "special",
        "power": 90,
        "accuracy": 85,
        "pp": 15,
        "effect": {"burn_chance": 30}
    },
    "Pressure Blast": {
        "type": "STEAM",
        "category": "special",
        "power": 110,
        "accuracy": 80,
        "pp": 10,
        "effect": None
    },
    "Mega Steam": {
        "type": "STEAM",
        "category": "special",
        "power": 150,
        "accuracy": 90,
        "pp": 5,
        "effect": {"recoil": 50}
    },

    # Electric moves
    "Spark": {
        "type": "ELECTRIC",
        "category": "physical",
        "power": 40,
        "accuracy": 100,
        "pp": 30,
        "effect": {"paralyze_chance": 10}
    },
    "Thunder Shock": {
        "type": "ELECTRIC",
        "category": "special",
        "power": 40,
        "accuracy": 100,
        "pp": 30,
        "effect": {"paralyze_chance": 10}
    },
    "Charge Beam": {
        "type": "ELECTRIC",
        "category": "special",
        "power": 65,
        "accuracy": 100,
        "pp": 20,
        "effect": {"raise_special": 70}
    },
    "Thunder Wave": {
        "type": "ELECTRIC",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 20,
        "effect": {"paralyze": 100}
    },
    "Rail Gun": {
        "type": "ELECTRIC",
        "category": "special",
        "power": 90,
        "accuracy": 100,
        "pp": 15,
        "effect": None
    },
    "Lightning Express": {
        "type": "ELECTRIC",
        "category": "special",
        "power": 110,
        "accuracy": 85,
        "pp": 10,
        "effect": None
    },
    "Electromagnetic Pulse": {
        "type": "ELECTRIC",
        "category": "special",
        "power": 120,
        "accuracy": 70,
        "pp": 5,
        "effect": {"lower_special": 1}
    },
    "Thunder": {
        "type": "ELECTRIC",
        "category": "special",
        "power": 120,
        "accuracy": 70,
        "pp": 10,
        "effect": {"paralyze_chance": 30}
    },

    # Diesel moves
    "Diesel Spray": {
        "type": "DIESEL",
        "category": "special",
        "power": 55,
        "accuracy": 95,
        "pp": 25,
        "effect": None
    },
    "Engine Rev": {
        "type": "DIESEL",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 30,
        "effect": {"raise_attack": 1}
    },
    "Fuel Blast": {
        "type": "DIESEL",
        "category": "special",
        "power": 80,
        "accuracy": 100,
        "pp": 15,
        "effect": None
    },
    "Turbo Charge": {
        "type": "DIESEL",
        "category": "physical",
        "power": 100,
        "accuracy": 95,
        "pp": 10,
        "effect": None
    },

    # Freight moves
    "Cargo Toss": {
        "type": "FREIGHT",
        "category": "physical",
        "power": 50,
        "accuracy": 100,
        "pp": 25,
        "effect": None
    },
    "Cargo Cannon": {
        "type": "FREIGHT",
        "category": "physical",
        "power": 70,
        "accuracy": 95,
        "pp": 20,
        "effect": None
    },
    "Container Crush": {
        "type": "FREIGHT",
        "category": "physical",
        "power": 85,
        "accuracy": 100,
        "pp": 15,
        "effect": None
    },
    "Freight Frenzy": {
        "type": "FREIGHT",
        "category": "physical",
        "power": 120,
        "accuracy": 100,
        "pp": 10,
        "effect": {"must_recharge": True}
    },
    "Heavy Haul": {
        "type": "FREIGHT",
        "category": "physical",
        "power": 100,
        "accuracy": 90,
        "pp": 10,
        "effect": None
    },

    # Maglev moves
    "Maglev Rush": {
        "type": "MAGLEV",
        "category": "physical",
        "power": 80,
        "accuracy": 100,
        "pp": 15,
        "effect": None
    },
    "Magnetic Pulse": {
        "type": "MAGLEV",
        "category": "special",
        "power": 90,
        "accuracy": 95,
        "pp": 10,
        "effect": None
    },

    # Passenger moves
    "Passenger Rush": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 75,
        "accuracy": 100,
        "pp": 20,
        "effect": None
    },
    "Express Service": {
        "type": "PASSENGER",
        "category": "special",
        "power": 95,
        "accuracy": 100,
        "pp": 10,
        "effect": {"priority": 1}
    },

    # Monorail moves
    "Peck": {
        "type": "MONORAIL",
        "category": "physical",
        "power": 35,
        "accuracy": 100,
        "pp": 35,
        "effect": None
    },
    "Drill Peck": {
        "type": "MONORAIL",
        "category": "physical",
        "power": 80,
        "accuracy": 100,
        "pp": 20,
        "effect": None
    },

    # Nuclear moves
    "Radiation": {
        "type": "NUCLEAR",
        "category": "special",
        "power": 65,
        "accuracy": 100,
        "pp": 20,
        "effect": {"poison_chance": 30}
    },
    "Atomic Blast": {
        "type": "NUCLEAR",
        "category": "special",
        "power": 120,
        "accuracy": 90,
        "pp": 5,
        "effect": {"recoil": 33}
    },

    # Status moves
    "Harden": {
        "type": "PASSENGER",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 30,
        "effect": {"raise_defense": 1}
    },
    "Leer": {
        "type": "PASSENGER",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 30,
        "effect": {"lower_defense": 1}
    },
    "Tail Whip": {
        "type": "PASSENGER",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 30,
        "effect": {"lower_defense": 1}
    },
    "Growl": {
        "type": "PASSENGER",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 40,
        "effect": {"lower_attack": 1}
    },

    # Multi-hit moves
    "Fury Attack": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 15,
        "accuracy": 85,
        "pp": 20,
        "effect": {"multi_hit": "2-5"}
    },

    # Special attacks
    "Gust": {
        "type": "MAGLEV",
        "category": "special",
        "power": 40,
        "accuracy": 100,
        "pp": 35,
        "effect": None
    },
    "Wing Attack": {
        "type": "MAGLEV",
        "category": "physical",
        "power": 60,
        "accuracy": 100,
        "pp": 35,
        "effect": None
    },
    "Sky Attack": {
        "type": "MAGLEV",
        "category": "physical",
        "power": 140,
        "accuracy": 90,
        "pp": 5,
        "effect": {"charge_turn": True, "flinch_chance": 30}
    },
    "Hyper Fang": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 80,
        "accuracy": 90,
        "pp": 15,
        "effect": {"flinch_chance": 10}
    },
    "Super Fang": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 0,  # Does 50% of target's current HP
        "accuracy": 90,
        "pp": 10,
        "effect": {"percentage_damage": 50}
    },
    "Bite": {
        "type": "PASSENGER",
        "category": "physical",
        "power": 60,
        "accuracy": 100,
        "pp": 25,
        "effect": {"flinch_chance": 30}
    },
    "Poison Sting": {
        "type": "DIESEL",
        "category": "physical",
        "power": 15,
        "accuracy": 100,
        "pp": 35,
        "effect": {"poison_chance": 30}
    },
    "Glare": {
        "type": "PASSENGER",
        "category": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 30,
        "effect": {"paralyze": 100}
    },
    "Confusion": {
        "type": "MAGLEV",
        "category": "special",
        "power": 50,
        "accuracy": 100,
        "pp": 25,
        "effect": {"confuse_chance": 10}
    },
    "String Shot": {
        "type": "PASSENGER",
        "category": "status",
        "power": 0,
        "accuracy": 95,
        "pp": 40,
        "effect": {"lower_speed": 1}
    },
}


def calculate_damage(attacker, defender, move):
    """
    Calculate damage using Gen 1 Pokemon formula.

    Damage = ((2 * Level / 5 + 2) * Power * A/D / 50 + 2) * Modifiers
    """
    move_data = MOVES_DB[move]

    # Status moves don't do damage
    if move_data["category"] == "status":
        return 0

    # Check accuracy
    if random.randint(1, 100) > move_data["accuracy"]:
        return -1  # Miss

    # Special damage calculations
    if move_data.get("effect", {}).get("percentage_damage"):
        return int(defender.current_hp * move_data["effect"]["percentage_damage"] / 100)

    # Base damage calculation
    level = attacker.level
    power = move_data["power"]

    # Determine if physical or special
    if move_data["category"] == "physical":
        attack = attacker.attack
        defense = defender.defense
    else:  # special
        attack = attacker.special
        defense = defender.special

    # Base damage formula (Gen 1)
    damage = int(((2 * level / 5 + 2) * power * attack / defense) / 50) + 2

    # Apply type effectiveness
    effectiveness = 1.0
    move_type = move_data["type"]

    for defender_type in defender.types:
        if move_type in TYPE_CHART and defender_type in TYPE_CHART[move_type]:
            effectiveness *= TYPE_CHART[move_type][defender_type]

    damage = int(damage * effectiveness)

    # Critical hit (6.25% chance in Gen 1)
    critical = False
    if random.randint(1, 100) <= 6:
        damage *= 2
        critical = True

    # Random factor (85% to 100%)
    damage = int(damage * random.randint(85, 100) / 100)

    # STAB (Same Type Attack Bonus) - 1.5x if move type matches attacker type
    if move_type in attacker.types:
        damage = int(damage * 1.5)

    # Minimum damage
    damage = max(1, damage)

    return damage


def get_type_effectiveness(move_type, defender_types):
    """Get the type effectiveness multiplier."""
    effectiveness = 1.0
    for defender_type in defender_types:
        if move_type in TYPE_CHART and defender_type in TYPE_CHART[move_type]:
            effectiveness *= TYPE_CHART[move_type][defender_type]
    return effectiveness
