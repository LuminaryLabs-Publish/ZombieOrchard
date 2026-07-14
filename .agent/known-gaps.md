# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

The current documented boundary is clean run creation and reset. The repository has screen labels for Play, New Game, Start, Pause, Title, and outcome, but no run identity, deterministic seed, suspension policy, candidate graph, atomic adoption, predecessor retirement, or first successor-frame proof.

## Plan ledger

**Goal:** keep clean-run risks dependency ordered and tied to executable proof.

- [ ] Start command identity, expected revisions, idempotency, and stale rejection.
- [ ] Run ID, generation, preset fingerprint, and deterministic seed.
- [ ] Explicit new, retry, and resume policy.
- [ ] Predecessor outcome retention and retry lineage.
- [ ] Candidate graph construction without predecessor mutation.
- [ ] Reset candidates for every mutable gameplay and interface participant.
- [ ] Atomic all-participant adoption and rollback.
- [ ] Route gating so gameplay and pressure suspend outside active play.
- [ ] Predecessor tick, event, command, callback, and frame rejection.
- [ ] Run generation in snapshots, GameHost, HTML, and Canvas2D.
- [ ] First visible successor-frame acknowledgement.
- [ ] Headless, browser, dist, and Pages fixtures.
- [ ] Retained roster, inventory, construction, content-safety, startup, frame-coherence, event, observer, persistence, and transaction work.

## Clean run gaps

```txt
StartCommandId: absent
HostGeneration: absent
RunId: absent
RunGeneration: absent
PresetFingerprint: absent
SeedPolicyRevision: absent
deterministic seed: absent
start mode policy: absent
predecessor outcome artifact: absent
retry lineage: absent
candidate domain graph: absent
resource reset protocol: absent
pressure reset protocol: absent
orchard reset protocol: absent
construction reset protocol: absent
roster reset protocol: absent
inventory reset protocol: absent
active-session reset protocol: absent
interface reset protocol: absent
atomic adoption: absent
rollback result: absent
stale predecessor work rejection: absent
route-based tick suspension: absent
RunGeneration render projection: absent
FirstVisibleRunFrameAck: absent
clean-run fixtures: absent
```

## Source consequences

- Play and Start can only move the interface route.
- New Game can reuse all predecessor state.
- Pause, title, setup, menus, settings, and outcome do not suspend pressure or active gameplay.
- A defeated run remains ended after returning to title.
- Starting again can route immediately back to the predecessor outcome.
- Resources, construction, roster, inventory, score, damage, player position, day, pests, and pressure persist unintentionally.
- Orchard state is generated with unseeded `Math.random()` and cannot be reproduced or intentionally refreshed.
- Canvas2D can keep showing predecessor world state behind new route screens.
- Smoke proof can pass while reset and run lifecycle remain broken.

## Retained unresolved gaps

### Gameplay and transactions

- Roster hiring is not safely admitted or adopted by gameplay.
- Inventory equipment is not validated or coupled to clearing.
- Construction does not atomically settle resources and world adoption.
- Negative payments and unknown references remain unsafe outside focused paths.
- Multi-domain operations lack general prepare, commit, rollback, and idempotency.
- Terminal mutation and pest capacity remain unresolved.

### Lifecycle and publication

- Ambient browser startup has no accepted generation, fallback, or retry.
- Runtime publication lacks immutable observer isolation.
- Canvas and HTML lack one atomic frame result.
- Raw GameHost access bypasses intended boundaries.

### Rendering, content, and persistence

- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML content is not safely constructed.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim clean reset, deterministic run identity, route suspension, atomic adoption, predecessor isolation, visible successor convergence, artifact parity, or production readiness until required fixtures pass on `main`.