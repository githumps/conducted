// spec 0004 - Progression Cedar policy (DESIGN.md §6). Default-deny.
//
// The progression engine (ProgressionEngine) attests the §6 contracts and drives
// the lifecycle; the player reads their own train's progression.

permit (
    principal in [Conducted::ProgressionEngine],
    action in [
        Conducted::Action::"AttestProgressionContract"
    ],
    resource is Conducted::Progression
);

permit (
    principal in [Conducted::ProgressionEngine],
    action in [
        Conducted::Action::"LevelUp",
        Conducted::Action::"Evolve",
        Conducted::Action::"Retire"
    ],
    resource is Conducted::Progression
);

// The player can read their own train's progression.
permit (
    principal is Conducted::User,
    action == Conducted::Action::"Read",
    resource is Conducted::Progression
) when {
    resource.userId == principal.id
};

// Terminal-state lockout - IOA invariant RetiredIsTerminal is authoritative;
// this is defense-in-depth.
forbid (
    principal,
    action,
    resource is Conducted::Progression
) when {
    resource.status == "Retired"
};
