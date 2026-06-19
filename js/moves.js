/**
 * Moves Database and Battle Calculations
 */

const MOVES_DB = {
    // Normal/Generic moves (PASSENGER type)
    "Ram": { type: "PASSENGER", category: "physical", power: 40, accuracy: 100, pp: 35, effect: null },
    "Express Shunt": { type: "PASSENGER", category: "physical", power: 40, accuracy: 100, pp: 30, effect: { priority: 1 } },
    "Full Throttle": { type: "PASSENGER", category: "physical", power: 85, accuracy: 100, pp: 15, effect: { paralyze_chance: 30 } },
    "Emergency Brake": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { raise_defense: 1 } },
    "Whistle Blast": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { lower_defense: 1 } },
    "Wheel Grind": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { lower_defense: 1 } },
    "Horn Honk": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 40, effect: { lower_attack: 1 } },
    "Track Grease": { type: "PASSENGER", category: "status", power: 0, accuracy: 95, pp: 40, effect: { lower_speed: 1 } },
    "High Beams": { type: "PASSENGER", category: "status", power: 0, accuracy: 100, pp: 30, effect: { paralyze: 100 } },
    "Multi-Track Drift": { type: "PASSENGER", category: "physical", power: 15, accuracy: 85, pp: 20, effect: { multi_hit: "2-5" } },
    "Coupler Crush": { type: "PASSENGER", category: "physical", power: 80, accuracy: 90, pp: 15, effect: { flinch_chance: 10 } },
    "Derailment": { type: "PASSENGER", category: "physical", power: 0, accuracy: 90, pp: 10, effect: { percentage_damage: 50 } },
    "Iron Bumper": { type: "PASSENGER", category: "physical", power: 60, accuracy: 100, pp: 25, effect: { flinch_chance: 30 } },

    // Steam moves
    "Coal Throw": { type: "STEAM", category: "physical", power: 50, accuracy: 95, pp: 25, effect: { burn_chance: 10 } },
    "Steam Jet": { type: "STEAM", category: "special", power: 65, accuracy: 100, pp: 20, effect: { burn_chance: 20 } },
    "Boiler Burst": { type: "STEAM", category: "special", power: 90, accuracy: 85, pp: 15, effect: { burn_chance: 30 } },
    "Pressure Blast": { type: "STEAM", category: "special", power: 110, accuracy: 80, pp: 10, effect: null },
    "Mega Steam": { type: "STEAM", category: "special", power: 150, accuracy: 90, pp: 5, effect: { recoil: 50 } },
    "Smoke Screen": { type: "STEAM", category: "status", power: 0, accuracy: 100, pp: 20, effect: { lower_accuracy: 1 } },

    // Electric moves
    "Spark": { type: "ELECTRIC", category: "physical", power: 40, accuracy: 100, pp: 30, effect: { paralyze_chance: 10 } },
    "Pantograph Spark": { type: "ELECTRIC", category: "special", power: 40, accuracy: 100, pp: 30, effect: { paralyze_chance: 10 } },
    "Charge Beam": { type: "ELECTRIC", category: "special", power: 65, accuracy: 100, pp: 20, effect: { raise_special: 70 } },
    "Third Rail": { type: "ELECTRIC", category: "status", power: 0, accuracy: 100, pp: 20, effect: { paralyze: 100 } },
    "Rail Gun": { type: "ELECTRIC", category: "special", power: 90, accuracy: 100, pp: 15, effect: null },
    "Lightning Express": { type: "ELECTRIC", category: "special", power: 110, accuracy: 85, pp: 10, effect: null },
    "EMP Blast": { type: "ELECTRIC", category: "special", power: 120, accuracy: 70, pp: 5, effect: { lower_special: 1 } },
    "Overload": { type: "ELECTRIC", category: "special", power: 120, accuracy: 70, pp: 10, effect: { paralyze_chance: 30 } },

    // Diesel moves
    "Diesel Spray": { type: "DIESEL", category: "special", power: 55, accuracy: 95, pp: 25, effect: null },
    "Engine Rev": { type: "DIESEL", category: "status", power: 0, accuracy: 100, pp: 30, effect: { raise_attack: 1 } },
    "Fuel Blast": { type: "DIESEL", category: "special", power: 80, accuracy: 100, pp: 15, effect: null },
    "Turbo Charge": { type: "DIESEL", category: "physical", power: 100, accuracy: 95, pp: 10, effect: null },
    "Exhaust Fumes": { type: "DIESEL", category: "physical", power: 15, accuracy: 100, pp: 35, effect: { poison_chance: 30 } },

    // Freight moves
    "Cargo Toss": { type: "FREIGHT", category: "physical", power: 50, accuracy: 100, pp: 25, effect: null },
    "Boxcar Bash": { type: "FREIGHT", category: "physical", power: 70, accuracy: 95, pp: 20, effect: null },
    "Container Crush": { type: "FREIGHT", category: "physical", power: 85, accuracy: 100, pp: 15, effect: null },
    "Freight Frenzy": { type: "FREIGHT", category: "physical", power: 120, accuracy: 100, pp: 10, effect: { must_recharge: true } },
    "Heavy Haul": { type: "FREIGHT", category: "physical", power: 100, accuracy: 90, pp: 10, effect: null },

    // Maglev moves
    "Maglev Rush": { type: "MAGLEV", category: "physical", power: 80, accuracy: 100, pp: 15, effect: null },
    "Magnetic Pulse": { type: "MAGLEV", category: "special", power: 90, accuracy: 95, pp: 10, effect: null },
    "Levitation": { type: "MAGLEV", category: "special", power: 40, accuracy: 100, pp: 35, effect: null },
    "Sonic Boom": { type: "MAGLEV", category: "physical", power: 60, accuracy: 100, pp: 35, effect: null },
    "Signal Jam": { type: "MAGLEV", category: "special", power: 50, accuracy: 100, pp: 25, effect: { confuse_chance: 10 } },

    // Passenger moves
    "Passenger Rush": { type: "PASSENGER", category: "physical", power: 75, accuracy: 100, pp: 20, effect: null },
    "Express Service": { type: "PASSENGER", category: "special", power: 95, accuracy: 100, pp: 10, effect: { priority: 1 } },

    // Monorail moves
    "Mono-Strike": { type: "MONORAIL", category: "physical", power: 35, accuracy: 100, pp: 35, effect: null },
    "Beam Balance": { type: "MONORAIL", category: "physical", power: 80, accuracy: 100, pp: 20, effect: null },

    // Nuclear moves
    "Radiation Leak": { type: "NUCLEAR", category: "special", power: 65, accuracy: 100, pp: 20, effect: { poison_chance: 30 } },
    "Reactor Meltdown": { type: "NUCLEAR", category: "special", power: 120, accuracy: 90, pp: 5, effect: { recoil: 33 } },
};

/**
 * Calculate damage using Gen 1 Pokemon formula
 */
// opts.attackStat / opts.defenseStat let the caller pass stage-adjusted stats
// (Gen-1 stat stages live in the Battle, not on the Train instance).
function calculateDamage(attacker, defender, moveName, opts = {}) {
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

    // Fixed/percentage damage still respects type immunity (0x) - a move that
    // "can't touch" a type should not chip a fixed 50% off it.
    if (moveData.effect && moveData.effect.percentage_damage) {
        const eff = getTypeEffectiveness(moveData.type, defender.types);
        return {
            damage: eff === 0 ? 0 : Math.floor(defender.currentHP * moveData.effect.percentage_damage / 100),
            critical: false,
            effectiveness: eff,
            hit: true
        };
    }

    // Base damage calculation
    const level = attacker.level;
    const power = moveData.power;

    // Determine if physical or special (caller may override with staged stats)
    let attack, defense;
    if (moveData.category === "physical") {
        attack = opts.attackStat != null ? opts.attackStat : attacker.attack;
        defense = opts.defenseStat != null ? opts.defenseStat : defender.defense;
    } else {
        attack = opts.attackStat != null ? opts.attackStat : attacker.special;
        defense = opts.defenseStat != null ? opts.defenseStat : defender.special;
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
