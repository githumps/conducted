// spec 0003 - Party Cedar policy (DESIGN.md §5). Default-deny.
//
// The party manager (PartyManager) attests the §5 contracts and drives the
// lifecycle; the player reads their own party.

permit (
    principal in [Conducted::PartyManager],
    action in [
        Conducted::Action::"AttestPartyContract"
    ],
    resource is Conducted::Party
);

permit (
    principal in [Conducted::PartyManager],
    action in [
        Conducted::Action::"Activate",
        Conducted::Action::"Settle",
        Conducted::Action::"Retire"
    ],
    resource is Conducted::Party
);

// The player can read their own party.
permit (
    principal is Conducted::User,
    action == Conducted::Action::"Read",
    resource is Conducted::Party
) when {
    resource.userId == principal.id
};

// Terminal-state lockout - IOA invariant RetiredIsTerminal is authoritative;
// this is defense-in-depth.
forbid (
    principal,
    action,
    resource is Conducted::Party
) when {
    resource.status == "Retired"
};
