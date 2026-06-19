// spec 0005 - SaveLoad Cedar policy (DESIGN.md §7). Default-deny.
//
// The save manager (SaveManager) attests the §7 contracts and drives the
// save/load lifecycle; the player reads their own save.

permit (
    principal in [Conducted::SaveManager],
    action in [
        Conducted::Action::"AttestSaveLoadContract"
    ],
    resource is Conducted::SaveLoad
);

permit (
    principal in [Conducted::SaveManager],
    action in [
        Conducted::Action::"Save",
        Conducted::Action::"Load",
        Conducted::Action::"Retire"
    ],
    resource is Conducted::SaveLoad
);

// The player can read their own save.
permit (
    principal is Conducted::User,
    action == Conducted::Action::"Read",
    resource is Conducted::SaveLoad
) when {
    resource.userId == principal.id
};

// Terminal-state lockout - IOA invariant RetiredIsTerminal is authoritative;
// this is defense-in-depth.
forbid (
    principal,
    action,
    resource is Conducted::SaveLoad
) when {
    resource.status == "Retired"
};
