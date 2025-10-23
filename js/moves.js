/**
 * Moves Database and Battle Calculations
 */

const MOVES_DB = {
    // Normal/Generic moves
    "Tackle": { type: "PASSENGER", category: "physical", power: 40, accuracy: 100, pp: 35, effect: null },
    "Quick Attack": { type: "PASSENGER", category: "physical", power: 40, accuracy: 100, pp: 30, effect: { priority: 1 } },
    "Body Slam": { type: "PASSENGER", category: "physical", power: 85, accuracy: 100, pp: 15, effect: { paralyze_chance: 30 } },

    // Steam moves
    "Whistle": { type: "STEAM", category: "status", power: 0, accuracy: 100, pp: 40, effect: { lower_attack: 1 } },
    "Coal Throw": { type: "STEAM", category: "physical", power: 50, accuracy: 95, pp: 25, effect: { burn_chance: 10 } },
    "Steam Jet": { type: "STEAM", category: "special", power: 65, accuracy: 100, pp: 20, effect: { burn_chance: 20 } },
    "Boiler Burst": { type: "STEAM", category: "special", power: 90, accuracy: 85, pp: 15, effect: { burn_chance: 30 } },
    "Pressure Blast": { type: "STEAM", category: "special", power: 110, accuracy: 80, pp: 10, effect: null },
    "Mega Steam": { type: "STEAM", category: "special", power: 150, accuracy: 90, pp: 5, effect: { recoil: 50 } },

    // Electric moves
    "Spark": { type: "ELECTRIC", category: "physical", power: 40, accuracy: 100, pp: 30, effect: { paralyze_chance: 10 } },
    "Thunder Shock": { type: "ELECTRIC", category: "special", power: 40, accuracy: 100, pp: 30, effect: { paralyze_chance: 10 } },
    "Charge Beam": { type: "ELECTRIC", category: "special", power: 65, accuracy: 100, pp: 20, effect: { raise_special: 70 } },
    "Thunder Wave": { type: "ELECTRIC", category: "status", power: 0, accuracy: 100, pp: 20, effect: { paralyze: 100 } },
    "Rail Gun": { type: "ELECTRIC", category: "special", power: 90, accuracy: 100, pp: 15, effect: null },
    "Lightning Express": { type: "ELECTRIC", category: "special", power: 110, accuracy: 85, pp: 10, effect: null },
    "Electromagnetic Pulse": { type: "ELECTRIC", category: "special", power: 120, accuracy: 70, pp: 5, effect: { lower_special: 1 } },
    "Thunder": { type: "ELECTRIC", category: "special", power: 120, accuracy: 70, pp: 10, effect: { paralyze_chance: 30 } },

    // Diesel moves
    "Diesel Spray": { type: "DIESEL", category: "special", power: 55, accuracy: 95, pp: 25, effect: null },
    "Engine Rev": { type: "DIESEL", category: "status", power: 0, accuracy: 100, pp: 30, effect: { raise_attack: 1 } },
    "Fuel Blast": { type: "DIESEL", category: "special", power: 80, accuracy: 100, pp: 15, effect: null },
    "Turbo Charge": { type: "DIESEL", category: "physical", power: 100, accuracy: 95, pp: 10, effect: null },

    // Freight moves
    "Cargo Toss": { type: "FREIGHT", category: "physical", power: 50, accuracy: 100, pp: 25, effect: null },
    "Cargo Cannon": { type: "FREIGHT", category: "physical", power: 70, accuracy: 95, pp: 20, effect: null },
    "Container Crush": { type: "FREIGHT", category: "physical", power: 85, accuracy: 100, pp: 15, effect: null },
    "Freight Frenzy": { type: "FREIGHT", category: "physical", power: 120, accuracy: 100, pp: 10, effect: { must_recharge: true } },
    "Heavy Haul": { type: "FREIGHT", category: "physical", power: 100, accuracy: 90, pp: 10, effect: null },

    // Maglev moves
    "Maglev Rush": { type: "MAGLEV", category: "physical", power: 80, accuracy: 100, pp: 15, effect: null },
    "Magnetic Pulse": { type: "MAGLEV", category: "special", power: 90, accuracy: 95, pp: 10, effect: null },
    "Gust": { type: "MAGLEV", category: "special", power: 40, accuracy: 100, pp: 35, effect: null },
    "Wing Attack": { type: "MAGLEV", category: "physical", power: 60, accuracy: 100, pp: 35, effect: null },

    // Passenger moves
    "Passenger Rush": { type: "PASSENGER", category: "physical", power: 75, accuracy: 100, pp: 20, effect: null },
    "Express Service": { type: "PASSENGER", category: "special", power: 95, accuracy: 100, pp: 10, effect: { priority: 1 } },
    "Hyper Fang": { type: "PASSENGER", category: "physical", power: 80, accuracy: 90, pp: 15, effect: { flinch_chance: 10 } },
    "Super Fang": { type: "PASSENGER", category: "physical", power: 0, accuracy: 90, pp: 10, effect: { percentage_damage: 50 } },
    "Bite": { type: "PASSENGER", category: "physical", power: 60, accuracy: 100, pp: 25, effect: { flinch_chance: 30 } },

    // Monorail moves
    "Peck": { type: "MONORAIL", category: "physical", power: 35, accuracy: 100, pp: 35, effect: null },
    "Drill Peck": { type: "MONORAIL", category: "physical", power: 80, accuracy: 100, pp: 20, effect: null },

    // Nuclear moves
    "Radiation": { type: "NUCLEAR", category: "special", power: 65, accuracy: 100, pp: 20, effect: { poison_chance: 30 } },
    "Atomic Blast": { type: "NUCLEAR", category: "special", power: 120, accuracy: 90, pp: 5, effect: { recoil: 33 } },

    // Status moves
    "Harden": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { raise_defense: 1 } },
    "Leer": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { lower_defense: 1 } },
    "Tail Whip": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { lower_defense: 1 } },
    "Growl": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 40, effect: { lower_attack: 1 } },
    "String Shot": { type: "PASSENGER", category: "status", power: 0, accuracy: 95, pp: 40, effect: { lower_speed: 1 } },
    "Glare": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { paralyze: 100 } },
    "Confusion": { type: "MAGLEV", category: "special", power: 50, accuracy: 100, pp: 25, effect: { confuse_chance: 10 } },
    "Fury Attack": { type: "PASSENGER", category: "physical", power: 15, accuracy: 85, pp: 20, effect: { multi_hit: "2-5" } },
    "Poison Sting": { type: "DIESEL", category: "physical", power: 15, accuracy: 100, pp: 35, effect: { poison_chance: 30 } },
};

/**
 * Calculate damage using Gen 1 Pokemon formula
 */
function calculateDamage(attacker, defender, moveName) {
    const moveData = MOVES_DB[moveName];

    // Status moves don't do damage
    if (moveData.category === "status") {
        return { damage: 0, critical: false, effectiveness: 1.0, hit: true };
    }

    // Check accuracy
    const hitRoll = Utils.randomInt(1, 100);
    if (hitRoll > moveData.accuracy) {
        return { damage: 0, critical: false, effectiveness: 1.0, hit: false };
    }

    // Special damage calculations
    if (moveData.effect && moveData.effect.percentage_damage) {
        return {
            damage: Math.floor(defender.currentHP * moveData.effect.percentage_damage / 100),
            critical: false,
            effectiveness: 1.0,
            hit: true
        };
    }

    // Base damage calculation
    const level = attacker.level;
    const power = moveData.power;

    // Determine if physical or special
    let attack, defense;
    if (moveData.category === "physical") {
        attack = attacker.attack;
        defense = defender.defense;
    } else {
        attack = attacker.special;
        defense = defender.special;
    }

    // Base damage formula (Gen 1)
    let damage = Math.floor(((2 * level / 5 + 2) * power * attack / defense) / 50) + 2;

    // Type effectiveness
    const effectiveness = getTypeEffectiveness(moveData.type, defender.types);
    damage = Math.floor(damage * effectiveness);

    // Critical hit (6.25% chance in Gen 1)
    const critical = Utils.randomInt(1, 100) <= 6;
    if (critical) {
        damage *= 2;
    }

    // STAB (Same Type Attack Bonus)
    if (attacker.types.includes(moveData.type)) {
        damage = Math.floor(damage * 1.5);
    }

    // Random factor (85% to 100%)
    damage = Math.floor(damage * Utils.randomInt(85, 100) / 100);

    // Minimum damage
    damage = Math.max(1, damage);

    return { damage, critical, effectiveness, hit: true };
}

/**
 * Get type effectiveness multiplier
 */
function getTypeEffectiveness(moveType, defenderTypes) {
    let effectiveness = 1.0;

    for (const defenderType of defenderTypes) {
        if (CONSTANTS.TYPE_CHART[moveType] && CONSTANTS.TYPE_CHART[moveType][defenderType]) {
            effectiveness *= CONSTANTS.TYPE_CHART[moveType][defenderType];
        }
    }

    return effectiveness;
}

/**
 * Get effectiveness text
 */
function getEffectivenessText(effectiveness) {
    if (effectiveness > 1.0) return "It's super effective!";
    if (effectiveness < 1.0 && effectiveness > 0) return "It's not very effective...";
    if (effectiveness === 0) return "It had no effect!";
    return "";
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MOVES_DB, calculateDamage, getTypeEffectiveness, getEffectivenessText };
}
