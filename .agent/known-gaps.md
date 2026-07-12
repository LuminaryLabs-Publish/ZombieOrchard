# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

The newest documented gap is semantic economy command admission. The runtime accepts raw resource, price and catalog payloads without one authoritative schema, capability boundary, expected revision, idempotency key or conservation receipt.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Kit graph identity, manifests, compatibility and atomic installation.
- [ ] Runtime session identity, lifecycle and callback generation fencing.
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

## Economy command gaps

```txt
economy command ID: absent
command sequence and idempotency: absent
runtime/session capability binding: absent
route admission: absent
resource key registry: absent
finite amount schema: incomplete
nonnegative cost policy: absent
administrative signed-delta capability: absent
balance floor policy: absent
catalog and offer revisions: absent
expected economy revision: absent
unknown construction ID rejection: absent
unknown inventory ID rejection: absent
caller-authored roster price rejection: absent
immutable mutation plan: absent
conservation check: absent
atomic participant commit: absent
before/delta/after balance receipts: absent
stable rejection codes: absent
first visible economy-frame acknowledgement: absent
```

## Source consequences

- `resource-ledger.pay()` accepts negative values and subtracts them, increasing balances.
- An unknown negative-cost resource key can materialize as a positive balance.
- `roster-runtime.hire()` trusts `payload.cost`, so a negative cost can add both money and an actor.
- `construction-runtime.build()` falls back to `catalog[0]` for an unknown ID.
- `inventory-runtime.equip()` accepts an unknown item ID.
- `resource-ledger.add()` accepts arbitrary resource keys and signed values.
- Public `GameHost.engine.command()` makes these surfaces reachable outside authored UI actions.
- Results contain no participant revisions, balance deltas or conservation receipts.

## Retained unresolved gaps

### Runtime and composition

- Live kit installation has no manifest, dependency resolver, duplicate-owner rejection, rollback or graph revision.
- Module boot creates one ambient RAF loop with no retained session generation.
- Display cadence controls simulation speed and random trials.
- Domains tick before Play and while menus are active.

### Input and public host

- No shipped keyboard/touch movement binding exists.
- Raw engine, domains, APIs, ticks and kit registration remain publicly exposed.
- Commands lack one capability and lifecycle admission boundary.

### Transactions and publication

- Nested multi-domain operations lack prepare/commit/rollback.
- Subscriber or renderer exceptions can terminate the frame loop.
- Canvas and HTML have no shared committed frame receipt.

### Rendering

- Canvas dimensions are rewritten from CSS dimensions every frame.
- DPR, pixel budgets, world-fit revisions and canvas-frame proof are absent.
- HTML projection replaces the complete subtree every frame.

### Replay and persistence

- Apples and pests use process-global `Math.random()`.
- No run seed, stream cursor, replay journal or deterministic IDs exist.
- Save Select has no authoritative storage, migration, checksum or restore transaction.

## Proof gaps

```txt
negative-cost fixture: absent
unknown-resource-key fixture: absent
unknown-catalog-reference fixture: absent
unknown-inventory-reference fixture: absent
economy idempotency fixture: absent
economy stale-revision fixture: absent
economy rollback fixture: absent
economy visible-frame fixture: absent
kit graph fixtures: absent
runtime-session fixture: absent
fixed-step cadence fixture: absent
route-suspension fixture: absent
player-control fixture: absent
public-host fixture: absent
composite transaction fixture: absent
subscriber/renderer fault fixture: absent
canvas viewport/DPR fixture: absent
DOM/focus/encoding fixtures: absent
replay fixture: absent
save/load fixture: absent
source/dist/Pages economy parity: absent
```

## Dependency order

```txt
kit graph installation
  -> runtime session
  -> clock, route and input admission
  -> public capability gateway
  -> economy command admission
  -> composite participant transaction
  -> frame publication and render authorities
  -> replay and persistence
  -> deployment proof
```

## Do not claim

Do not claim semantic economy safety, economic conservation, catalog integrity, idempotency, atomic participant commit or economy-to-frame parity until the required fixtures pass on `main`.