# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Summary

The newest documented gap is pest-population lifecycle and budget ownership. Night simulation can grow the active pest array without capacity or despawn policy, and the same array directly controls movement cost, contact damage, snapshot size and canvas draw count.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Kit graph identity, manifests, compatibility and atomic installation.
- [ ] Runtime session identity, lifecycle and callback generation fencing.
- [ ] Run reset identity, participant reset and atomic generation commit.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Public capability gateway and owner quarantine.
- [ ] Interface action identity, availability and nested-result authority.
- [ ] Economy command semantic admission and conservation.
- [ ] Composite multi-domain transaction authority.
- [ ] Terminal outcome seal and immutable result authority.
- [ ] Pest population lifecycle, capacity, damage and render budgets.
- [ ] Frame-publication fault containment and loop liveness.
- [ ] Canvas/HTML shared frame authority.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Pest population gaps

```txt
population ID and revision: absent
maximum active count: absent
spawn budget: absent
deterministic unique pest ID: absent
age and lifecycle state: absent
despawn and retirement policy: absent
simulation work budget: absent
render work budget: absent
contact-set result: absent
damage ceiling/aggregation policy: absent
stale clear rejection: absent
exactly-once retirement receipt: absent
population fingerprint: absent
visible population-frame acknowledgement: absent
```

## Source consequences

- Night ticks can append pests indefinitely while the run survives.
- Day phase does not retire or age the existing population.
- Movement and distance work are O(N) in active pests.
- Contact damage is additive across all contacting pests.
- Deep snapshot cloning and canvas drawing are also O(N).
- Only a successful nearby clear operation removes a pest.
- Random string IDs have no uniqueness or run-generation guarantee.
- Current smoke proof cannot detect capacity, lifecycle, damage or frame-budget failures.

## Retained unresolved gaps

### Lifecycle and command authority

- Boot creates one ambient RAF with no stop authority.
- Display cadence controls real-time simulation speed.
- Menus do not suspend all gameplay domains.
- New Game and Start do not build a clean run.
- Raw GameHost access bypasses intended route boundaries.
- Terminal state does not revoke all mutation.

### Economy and transactions

- Negative payment values can mint resources.
- Unknown catalog or inventory references are not consistently rejected.
- Multi-domain operations lack prepare/commit/rollback and idempotency.

### Rendering and persistence

- Canvas dimensions are rewritten every frame.
- Canvas and HTML have no shared committed frame receipt.
- HTML projection replaces the subtree every frame.
- Math.random prevents replay continuation.
- Save Select has no versioned storage or migration authority.

## Required fixtures

```txt
capacity boundary
long-night bounded population
deterministic unique IDs
day-transition retention/retirement
clear exactly-once reward
duplicate and stale clear rejection
age/TTL retirement
bounded contact damage
simulation and render budget
population snapshot fingerprint
source/dist/Pages parity
```

## Dependency order

```txt
runtime session and run generation
  -> deterministic random and clock
  -> pest population identity and spawn admission
  -> simulation/contact/damage budget
  -> retirement and reward transaction
  -> snapshot/render frame correlation
  -> deployment proof
```

## Do not claim

Do not claim bounded pest populations, stable difficulty, predictable frame cost, exact retirement, replay-safe IDs or visible population parity until required fixtures pass on `main`.
