// spec 0006 - MapWarp Cedar policy (DESIGN.md §8). Default-deny.
//
// The warp controller (WarpController) attests the §8 contracts and drives the
// warp lifecycle; the player reads their own warp transition.

permit (
    principal in [Conducted::WarpController],
    action in [
        Conducted::Action::"AttestMapWarpContract"
    ],
    resource is Conducted::MapWarp
);

permit (
    principal in [Conducted::WarpController],
    action in [
        Conducted::Action::"Enter",
        Conducted::Action::"Arrive",
        Conducted::Action::"Retire"
    ],
    resource is Conducted::MapWarp
);

// The player can read their own warp transition.
permit (
    principal is Conducted::User,
    action == Conducted::Action::"Read",
    resource is Conducted::MapWarp
) when {
    resource.userId == principal.id
};

// Terminal-state lockout - IOA invariant RetiredIsTerminal is authoritative;
// this is defense-in-depth.
forbid (
    principal,
    action,
    resource is Conducted::MapWarp
) when {
    resource.status == "Retired"
};
