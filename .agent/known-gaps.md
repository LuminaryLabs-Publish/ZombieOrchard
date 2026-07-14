# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-14T10-59-56-04-00`

## Summary

The current documented boundary is roster hiring gameplay adoption. The repository stores actor records, but browser admission, authored offers, safe cost settlement, actor identity, role policy, capacity, worker effects, matching projection, rollback and visible proof remain incomplete.

## Plan ledger

**Goal:** keep roster-hiring risks dependency ordered and tied to executable proof.

- [ ] Hire command identity, expected revisions, idempotency and stale rejection.
- [ ] Authored hire offers and positive finite cost policy.
- [ ] Resource reservation, promotion and release.
- [ ] Unique actor identity and normalized display names.
- [ ] Safe HTML projection for caller-visible identity.
- [ ] Role catalog, roster capacity and duplicate policy.
- [ ] Immutable worker capability, cadence, upkeep and presentation descriptors.
- [ ] Browser-authored Hire action.
- [ ] Typed hire result propagation.
- [ ] Atomic resource, roster and gameplay-effect adoption.
- [ ] Roster, HUD and Canvas2D projection on one revision.
- [ ] Rollback and partial-consumer cleanup.
- [ ] First visible roster-frame acknowledgement.
- [ ] Headless, browser, dist and Pages fixtures.
- [ ] Retained inventory, construction, content-safety, startup, frame-coherence, event, observer, clock, persistence, replay, reset and transaction work.

## Roster hiring gaps

```txt
HireCommandId: absent
RunGeneration binding: absent
RosterRevision: absent
WorkerCatalogRevision: absent
ResourceRevision expectation: absent
WorkerEffectRevision: absent
authored HireOffer: absent
positive-cost admission: absent
resource reservation: absent
unique actor ID policy: absent
worker name normalization: absent
safe name projection: absent
role catalog: absent
roster capacity: absent
duplicate hire policy: absent
browser Hire action: absent
typed terminal results: absent
active-session roster reads: absent
worker gameplay descriptor: absent
HUD worker state: absent
Canvas2D worker projection: absent
rollback result: absent
first visible roster-frame acknowledgement: absent
roster-hiring fixtures: absent
```

## Source consequences

- A negative caller cost can increase money while appending an actor.
- A truthy non-numeric cost can normalize to zero and create a free actor.
- Caller-provided names can reach `innerHTML` without escaping.
- Browser players cannot hire through the authored roster route.
- Every actor receives the hardcoded `harvest` role without catalog validation.
- Hired actors have no effect on collection, pressure, clearing, construction or survival.
- The active HUD and Canvas2D cannot prove worker adoption.
- Smoke proof can pass while hiring remains unsafe and workers remain inert.

## Retained unresolved gaps

### Lifecycle and publication

- Ambient browser startup has no accepted generation, fallback or retry.
- Display cadence controls simulation.
- Runtime publication lacks immutable observer isolation.
- Canvas and HTML lack one atomic frame result.
- New Game and Start do not build a clean run.
- Raw GameHost access bypasses intended boundaries.

### Gameplay and transactions

- Inventory equipment admission and gameplay coupling remain unimplemented.
- Construction does not atomically settle resources and world adoption.
- Negative payments and unknown references remain unsafe outside focused paths.
- Multi-domain operations lack general prepare, commit, rollback and idempotency.
- Terminal mutation, pause fidelity and pest capacity remain unresolved in runtime.

### Rendering, content and persistence

- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML content is not safely constructed.
- `Math.random()` prevents replay continuation.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim safe hiring, exact positive-cost settlement, actor identity safety, worker gameplay effects, visible worker projection, rollback, frame convergence, artifact parity or production readiness until required fixtures pass on `main`.