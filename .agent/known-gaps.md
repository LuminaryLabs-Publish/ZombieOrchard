# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

The newest documented gap is terminal outcome sealing. Failure stops active-session ticking but does not revoke commands, seal participant state or create an immutable result. Outcome displays live score and day, so the final summary can change after the run has ended.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Kit graph identity, manifests, compatibility and atomic installation.
- [ ] Runtime session identity, lifecycle and callback generation fencing.
- [ ] Run reset identity, participant reset and atomic generation commit.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Player-control reachability and input retirement.
- [ ] Public capability gateway and owner quarantine.
- [ ] Interface action identity, availability and nested-result authority.
- [ ] Economy command semantic admission and conservation.
- [ ] Composite multi-domain transaction authority.
- [ ] Terminal outcome seal, command revocation and immutable result authority.
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Canvas render-surface and world-projection authority.
- [ ] HTML interface projection, focus and encoding authority.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Terminal outcome gaps

```txt
terminal phase enum: absent
terminal outcome ID: absent
terminal cause contract: absent
terminal result revision: absent
terminal predicate evidence: absent
immutable terminal snapshot: absent
participant freeze receipt: absent
post-terminal command rejection: absent
gameplay capability revocation: absent
economy capability revocation: absent
terminal/route atomic commit: absent
duplicate terminal admission: absent
Outcome bound to terminal result: no
first visible terminal frame acknowledgement: absent
```

## Source consequences

- `active-session.tick()` returns after `ended`, but `active-session.command()` has no terminal guard.
- `move` can alter the final player position.
- `collect` can change orchard membership, resources, pressure, score and message.
- `clear` can change pests, scrap, score and message.
- `next-phase` can change final phase and day.
- `interface-composition.tick()` routes Outcome separately from failure commit.
- `window.GameHost.engine` permits direct commands regardless of visible route.
- Outcome cards read live `session.score` and `session.day`.
- Existing smoke proof cannot detect terminal mutation or summary drift.

## Retained unresolved gaps

### Runtime and run lifecycle

- Live kit installation has no manifest, dependency resolver, duplicate-owner rejection, rollback or graph revision.
- Module boot creates one ambient RAF loop with no retained session generation.
- Display cadence controls simulation speed and random trials.
- Domains tick before Play and while menus are active.
- Play, New Game, Start and Title do not construct or retire run generations.
- Terminal and partial predecessor state survives supposed restart flows.

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
- Outcome has no immutable result-backed read model.

### Replay and persistence

- Apples and pests use process-global `Math.random()`.
- No run seed, stream cursor, replay journal or deterministic IDs exist.
- Save Select has no authoritative storage, migration, checksum or restore transaction.

## Proof gaps

```txt
terminal threshold fixture: absent
multiple-pest single-terminal fixture: absent
post-terminal movement fixture: absent
post-terminal collection fixture: absent
post-terminal clearing fixture: absent
post-terminal phase fixture: absent
Outcome summary immutability fixture: absent
terminal duplicate fixture: absent
terminal route atomicity fixture: absent
source/dist/Pages terminal parity: absent
invalid action ID fixture: absent
disabled action projection fixture: absent
nested command rejection propagation fixture: absent
action idempotency fixture: absent
new-game clean-state fixture: absent
failed-run restart fixture: absent
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
  -> interface action and public capability admission
  -> economy and composite transaction commit
  -> terminal outcome sealing and command revocation
  -> frame publication and render authorities
  -> replay and persistence
  -> deployment proof
```

## Do not claim

Do not claim immutable terminal results, post-terminal isolation, stable final score/day, atomic Outcome routing, idempotency or visible terminal-frame correlation until the required fixtures pass on `main`.
