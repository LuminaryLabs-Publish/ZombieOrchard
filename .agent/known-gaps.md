# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-14T00-38-19-04-00`

## Summary

The current documented boundary is construction settlement and world adoption. Resource debit and the built-record append occur, but item admission, spatial validity, downstream adoption, gameplay effect, result propagation, rollback, and visible proof remain incomplete.

## Plan ledger

**Goal:** keep construction risks dependency ordered and tied to executable proof.

- [ ] Exact item admission and catalog revision.
- [ ] Command identity, expected revisions, idempotency, and stale rejection.
- [ ] Cost quote and reversible resource reservation.
- [ ] Placement intent, bounds, occupancy, and overlap admission.
- [ ] Geometry, collision, capacity, and effect descriptors.
- [ ] Atomic resource, construction, render, collision, and effect adoption.
- [ ] Nested command result propagation to the interface boundary.
- [ ] Shared HTML/Canvas construction revision.
- [ ] Rollback and partial-consumer cleanup.
- [ ] First visible construction-frame acknowledgement.
- [ ] Headless, browser, dist, and Pages fixtures.
- [ ] Retained content-safety, startup, frame-coherence, event, observer, clock, persistence, and transaction work.

## Construction gaps

```txt
ConstructionCommandId: absent
RunGeneration binding: absent
CatalogRevision: absent
exact unknown-item rejection: absent
cost quote result: absent
resource reservation: absent
placement intent: absent
orchard bounds admission: absent
occupancy/overlap admission: absent
geometry descriptor: absent
collision descriptor: absent
capacity/effect descriptor: absent
multi-consumer prepare result: absent
atomic adoption: absent
nested result propagation: absent
rollback result: absent
ConstructionRevision: absent
Canvas2D structure projection: absent
first visible construction-frame acknowledgement: absent
construction fixtures: absent
```

## Source consequences

- Invalid construction IDs silently resolve to the first catalog entry.
- Payment mutates before a durable construction result exists.
- Fixed generated coordinates can overlap orchard content or leave the intended play area.
- The construction screen can say a structure exists while the world surface shows none.
- The Storage Shed consumes resources without increasing storage or changing gameplay.
- The outer interface command cannot distinguish a successful build from an insufficient-resource rejection.
- Smoke proof can pass while every construction consumer remains broken.

## Retained unresolved gaps

### Lifecycle and publication

- Ambient browser startup has no accepted generation, fallback, or retry.
- Display cadence controls simulation.
- Runtime publication lacks immutable observer isolation.
- Canvas and HTML lack one atomic frame result.

### Gameplay and transactions

- New Game and Start do not build a clean run.
- Raw GameHost access bypasses intended boundaries.
- Negative payments and unknown references remain unsafe outside this focused path.
- Multi-domain operations lack general prepare, commit, rollback, and idempotency.
- Terminal mutation and pest capacity remain unresolved.

### Rendering, content, and persistence

- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML content is not yet safely constructed.
- `Math.random()` prevents replay continuation.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim valid construction placement, atomic resource settlement, world adoption, collision, gameplay effect, rollback, visible-frame convergence, or production readiness until required fixtures pass on `main`.
