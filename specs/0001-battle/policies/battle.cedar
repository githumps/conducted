// spec 0001 - Battle Cedar policy (DESIGN.md §3). Default-deny.
//
// The battle engine (BattleEngine) attests the §3 contracts and drives the
// lifecycle; the player reads their own battle.

permit (
    principal in [Conducted::BattleEngine],
    action in [
        Conducted::Action::"AttestBattleContract"
    ],
    resource is Conducted::Battle
);

permit (
    principal in [Conducted::BattleEngine],
    action in [
        Conducted::Action::"Engage",
        Conducted::Action::"Resolve",
        Conducted::Action::"Retire"
    ],
    resource is Conducted::Battle
);

// The player can read their own battle.
permit (
    principal is Conducted::User,
    action == Conducted::Action::"Read",
    resource is Conducted::Battle
) when {
    resource.userId == principal.id
};

// Terminal-state lockout - IOA invariant RetiredIsTerminal is authoritative;
// this is defense-in-depth.
forbid (
    principal,
    action,
    resource is Conducted::Battle
) when {
    resource.status == "Retired"
};
