# Known gaps: ZombieOrchard route-bound simulation suspension

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Status:** `route-simulation-suspension-admission-authority-audited`

## Summary

The current priority gap is that interface routes do not own simulation eligibility. Every runtime step advances pressure and active-session hazards even when HTML presents Pause, management, setup, settings or title routes.

## Plan ledger

**Goal:** keep suspension, resume, timing, presentation and proof gaps dependency ordered.

- [ ] Route, run and transition identity.
- [ ] Simulation policy descriptors.
- [ ] Pressure and active-session tick leases.
- [ ] Atomic route/policy adoption.
- [ ] Pause and management suspension.
- [ ] Title/outcome retirement.
- [ ] Resume input and clock settlement.
- [ ] Stale transition and tick rejection.
- [ ] Route/simulation presentation receipts.
- [ ] First route-bound visible-frame acknowledgement.
- [ ] Headless, browser, dist and Pages fixtures.

## Route-simulation gaps

```txt
route revision: absent
run generation bound to route: absent
simulation policy descriptor: absent
pressure tick lease: absent
active-session tick lease: absent
pause suspension result: absent
management-screen suspension result: absent
resume result: absent
terminal lease retirement: absent
stale tick rejection: absent
Canvas route receipt: absent
HTML route receipt: absent
FirstRouteBoundVisibleFrameAck: absent
```

## Source consequences

- Pressure grows on every route.
- Active-session hazards continue while Pause or management screens are visible.
- A hidden player can lose condition and reach Outcome without Resume.
- UI route state and gameplay tick state can disagree.
- Canvas2D and HTML do not expose a shared route/simulation revision.
- Existing smoke tests cannot detect hidden gameplay mutation.

## Retained unresolved gaps

### Host clock and lifecycle

- RAF callback count still controls simulation rate.
- Hidden-tab and resume clock policy remain undefined.
- New Game and retry still lack clean deterministic run generations.
- Public `GameHost` exposes raw runtime and manual tick.

### Transactions and persistence

- Roster, inventory and construction transactions remain incomplete.
- Save Select has no versioned persistence authority.
- Pest capacity and terminal settlement remain unresolved.

### Presentation

- Canvas2D and HTML lack one atomic frame result.
- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML construction remains unsafe.

## Do not claim

Do not claim suspension safety, hidden-hazard prevention, resume correctness, route/frame coherence, artifact parity or production readiness until fixtures pass.
