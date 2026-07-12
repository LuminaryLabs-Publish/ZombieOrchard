# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

The newest documented gap is run reset generation authority. Play, New Game, Start, Resume and Title are route operations only. They do not create, reset, replace, retire or visibly prove a run generation.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Kit graph identity, manifests, compatibility and atomic installation.
- [ ] Runtime session identity, lifecycle and callback generation fencing.
- [ ] Run reset identity, participant reset and atomic generation commit.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Player-control reachability and input retirement.
- [ ] Public capability gateway and owner quarantine.
- [ ] Economy command semantic admission and conservation.
- [ ] Composite multi-domain transaction authority.
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Canvas render-surface and world-projection authority.
- [ ] HTML interface projection, focus and encoding authority.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Run reset gaps

```txt
run ID: absent
run generation: absent
run revision: absent
start/reset command IDs: absent
Play resume/start policy: implicit
terminal-run restart policy: absent
participant reset registry: absent
participant initial-state contract: absent
candidate run construction: absent
cross-domain initial validation: absent
atomic reset commit: absent
reset rollback: absent
predecessor retirement: absent
stale predecessor command rejection: absent
reset idempotency: absent
participant reset receipts: absent
run state fingerprint: absent
first canvas/HTML reset-frame acknowledgement: absent
```

## Source consequences

- Entry Play moves directly to the existing active-session.
- Entry New Game only moves to run-setup.
- Run Setup Start only moves to the existing active-session.
- Pause Title and Outcome Title only move to Entry.
- Resources, pressure, apples, builds, actors, inventory, score, player condition, phase and terminal state survive route changes.
- `active-session.ended` is set on failure and never reset.
- Composition automatically returns any ended active-session to Outcome.
- Existing smoke proof cannot detect restart failure.

## Retained unresolved gaps

### Runtime and composition

- Live kit installation has no manifest, dependency resolver, duplicate-owner rejection, rollback or graph revision.
- Module boot creates one ambient RAF loop with no retained session generation.
- Display cadence controls simulation speed and random trials.
- Domains tick before Play and while menus are active.

### Input, public host and transactions

- No shipped keyboard/touch movement binding exists.
- Raw engine, domains, APIs, ticks and kit registration remain publicly exposed.
- Commands lack one capability and lifecycle admission boundary.
- Nested multi-domain operations lack prepare/commit/rollback.
- Subscriber or renderer exceptions can terminate the frame loop.

### Economy

- Negative payment values mint resources.
- Resource keys and prices are not governed by a versioned authority.
- Unknown construction and inventory references can be accepted incorrectly.
- Economy operations lack idempotency, conservation and atomic participant receipts.

### Rendering

- Canvas dimensions are rewritten from CSS dimensions every frame.
- DPR, pixel budgets, world-fit revisions and canvas-frame proof are absent.
- HTML projection replaces the complete subtree every frame.
- Canvas and HTML have no shared committed frame receipt.

### Replay and persistence

- Apples and pests use process-global `Math.random()`.
- No run seed, stream cursor, replay journal or deterministic IDs exist.
- Save Select has no authoritative storage, migration, checksum or restore transaction.

## Proof gaps

```txt
new-game clean-state fixture: absent
failed-run restart fixture: absent
terminal-run no-implicit-resume fixture: absent
run reset idempotency fixture: absent
stale reset revision fixture: absent
participant reset rollback fixture: absent
run seed reinitialization fixture: absent
visible reset-generation fixture: absent
source/dist/Pages reset parity: absent
kit graph fixtures: absent
runtime-session fixture: absent
fixed-step cadence fixture: absent
route-suspension fixture: absent
player-control fixture: absent
public-host fixture: absent
economy fixtures: absent
composite transaction fixture: absent
subscriber/renderer fault fixture: absent
canvas viewport/DPR fixture: absent
DOM/focus/encoding fixtures: absent
replay fixture: absent
save/load fixture: absent
```

## Dependency order

```txt
kit graph installation
  -> runtime session
  -> run reset generation
  -> clock, route and input admission
  -> public capability and economy gateways
  -> composite transaction commit
  -> frame publication and render authorities
  -> replay and persistence
  -> deployment proof
```

## Do not claim

Do not claim that New Game is clean, failed runs are restartable, reset is atomic, predecessor work is fenced or reset state is visibly correlated until the required fixtures pass on `main`.