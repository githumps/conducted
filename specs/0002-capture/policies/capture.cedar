// spec 0002 - Capture Cedar policy (DESIGN.md §4). Default-deny.
//
// The capture engine (CaptureEngine) attests the §4 contracts and drives the
// lifecycle; the player reads their own capture attempt.

permit (
    principal in [Conducted::CaptureEngine],
    action in [
        Conducted::Action::"AttestCaptureContract"
    ],
    resource is Conducted::Capture
);

permit (
    principal in [Conducted::CaptureEngine],
    action in [
        Conducted::Action::"Throw",
        Conducted::Action::"Resolve",
        Conducted::Action::"Retire"
    ],
    resource is Conducted::Capture
);

// The player can read their own capture attempt.
permit (
    principal is Conducted::User,
    action == Conducted::Action::"Read",
    resource is Conducted::Capture
) when {
    resource.userId == principal.id
};

// Terminal-state lockout - IOA invariant RetiredIsTerminal is authoritative;
// this is defense-in-depth.
forbid (
    principal,
    action,
    resource is Conducted::Capture
) when {
    resource.status == "Retired"
};
