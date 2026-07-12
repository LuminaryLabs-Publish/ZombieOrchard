# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

The newest documented gap is interface action identity, availability and result authority. Explicit invalid IDs can execute the selected action, nested command rejection can be reported as accepted, and disabled actions are projected as enabled controls.

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
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Canvas render-surface and world-projection authority.
- [ ] HTML interface projection, focus and encoding authority.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Interface action gaps

```txt
exact explicit action lookup: absent
unknown action rejection: absent for generic domains
missing action rejection: absent for generic domains
selected activation command: not separated
route revision: absent
action-set revision: absent
action descriptor fingerprint: absent
runtime session/run generation binding: absent
disabled availability reason: absent
disabled HTML projection: absent
nested command result propagation: absent
route policy after nested rejection: absent
command ID/idempotency: absent
stale action rejection: absent
action result journal: absent
first visible action-result acknowledgement: absent
```

## Source consequences

- `actions.find(...) || actions[selectedIndex]` converts invalid explicit IDs into selected-action activation.
- Entry defaults to selected index zero, so an invalid ID can execute Play.
- Generic interface domains and active-session use different action lookup semantics.
- Construction build rejection is discarded by interface composition.
- Composition can return accepted even though the required nested gameplay command rejected.
- Disabled descriptors are rendered as normal clickable buttons.
- A stale or public caller can submit action IDs without route or action-set revision evidence.
- Canvas and HTML frames carry no action result or rejection provenance.
- Existing smoke proof cannot detect any of these failures.

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

### Replay and persistence

- Apples and pests use process-global `Math.random()`.
- No run seed, stream cursor, replay journal or deterministic IDs exist.
- Save Select has no authoritative storage, migration, checksum or restore transaction.

## Proof gaps

```txt
invalid action ID fixture: absent
missing action ID fixture: absent
selected-action explicit-command fixture: absent
stale route/action-set fixture: absent
disabled action projection fixture: absent
nested command rejection propagation fixture: absent
action idempotency fixture: absent
visible action-result fixture: absent
source/dist/Pages action parity: absent
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
  -> interface action admission
  -> public capability and economy gateways
  -> composite transaction commit
  -> frame publication and render authorities
  -> replay and persistence
  -> deployment proof
```

## Do not claim

Do not claim exact action identity, truthful availability, nested-result propagation, stale-action fencing, idempotency or visible result correlation until the required fixtures pass on `main`.