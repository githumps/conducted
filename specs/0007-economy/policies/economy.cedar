// spec 0007 - Economy Cedar policy (DESIGN.md §9). Default-deny.
//
// The shop manager (ShopManager) attests the §9 contracts and drives the
// purchase lifecycle; the player reads their own transaction.

permit (
    principal in [Conducted::ShopManager],
    action in [
        Conducted::Action::"AttestEconomyContract"
    ],
    resource is Conducted::Economy
);

permit (
    principal in [Conducted::ShopManager],
    action in [
        Conducted::Action::"Price",
        Conducted::Action::"Settle",
        Conducted::Action::"Retire"
    ],
    resource is Conducted::Economy
);

// The player can read their own transaction.
permit (
    principal is Conducted::User,
    action == Conducted::Action::"Read",
    resource is Conducted::Economy
) when {
    resource.userId == principal.id
};

// Terminal-state lockout - IOA invariant RetiredIsTerminal is authoritative;
// this is defense-in-depth.
forbid (
    principal,
    action,
    resource is Conducted::Economy
) when {
    resource.status == "Retired"
};
