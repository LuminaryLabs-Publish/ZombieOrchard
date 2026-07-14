# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-14T05-40-42-04-00`

## Summary

The current documented boundary is inventory equipment gameplay adoption. The repository stores items and an equipped ID, but browser admission, ownership checks, effect resolution, combat coupling, durability, matching projection, rollback, and visible proof remain incomplete.

## Plan ledger

**Goal:** keep equipment risks dependency ordered and tied to executable proof.

- [ ] Exact item and ownership admission.
- [ ] Equipment command identity, expected revisions, idempotency, and stale rejection.
- [ ] Equippable slots and item-type policy.
- [ ] Immutable range, power, stamina, cadence, durability, and presentation descriptors.
- [ ] Browser-authored Equip action.
- [ ] Typed equipment result propagation.
- [ ] Atomic inventory and gameplay-effect adoption.
- [ ] Clear-action equipment revision binding.
- [ ] Inventory, HUD, and Canvas2D projection on one revision.
- [ ] Rollback and partial-consumer cleanup.
- [ ] First visible equipment-frame acknowledgement.
- [ ] Headless, browser, dist, and Pages fixtures.
- [ ] Retained construction, content-safety, startup, frame-coherence, event, observer, clock, persistence, replay, reset, and transaction work.

## Equipment gaps

```txt
EquipmentCommandId: absent
RunGeneration binding: absent
InventoryRevision: absent
ItemCatalogRevision: absent
EquipmentRevision: absent
owned-item admission: absent
equippable policy: absent
effect descriptor: absent
durability: absent
browser Equip action: absent
typed terminal results: absent
clear-action inventory read: absent
clear-action equipment receipt: absent
inventory equipped marker: absent
HUD equipment state: absent
Canvas2D equipment projection: absent
rollback result: absent
first visible equipment-frame acknowledgement: absent
equipment fixtures: absent
```

## Source consequences

- Raw commands can store unknown or arbitrary equipped IDs.
- Browser users cannot choose equipment from the inventory route.
- The authored branch and an invalid ID have identical gameplay behavior.
- Clear actions cannot be explained by an item or effect revision.
- The inventory screen cannot tell the player what is equipped.
- HUD and Canvas2D cannot prove equipment adoption.
- Smoke proof can pass while equipment remains entirely inert.

## Retained unresolved gaps

### Lifecycle and publication

- Ambient browser startup has no accepted generation, fallback, or retry.
- Display cadence controls simulation.
- Runtime publication lacks immutable observer isolation.
- Canvas and HTML lack one atomic frame result.
- New Game and Start do not build a clean run.
- Raw GameHost access bypasses intended boundaries.

### Gameplay and transactions

- Construction does not atomically settle resources and world adoption.
- Negative payments and unknown references remain unsafe outside focused paths.
- Multi-domain operations lack general prepare, commit, rollback, and idempotency.
- Terminal mutation, pause fidelity, and pest capacity remain unresolved in runtime.

### Rendering, content, and persistence

- Canvas dimensions are rewritten every frame.
- HTML replacement loses focus and selection continuity.
- Dynamic HTML content is not yet safely constructed.
- `Math.random()` prevents replay continuation.
- Save Select has no versioned persistence authority.

## Do not claim

Do not claim owned-item admission, equipment-aware gameplay, durability, visible equipment projection, rollback, frame convergence, artifact parity, or production readiness until required fixtures pass on `main`.