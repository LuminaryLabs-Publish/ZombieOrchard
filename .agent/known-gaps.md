# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-12T23-00-53-04-00`

## Summary

The newest documented gap remains runtime observer publication authority. Synchronous subscribers can mutate shared projections, re-enter runtime mutation, reorder observed snapshots, throw after commit, skip later subscribers and stop the visible frame loop. Central tracking now reflects the repo-local technical audit.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Kit graph identity, manifests, compatibility and atomic installation.
- [ ] Runtime session identity, lifecycle and callback generation fencing.
- [ ] Run reset identity, participant reset and atomic generation commit.
- [ ] Fixed-step clock and single-writer admission.
- [ ] Route-scoped simulation admission.
- [ ] Public capability gateway and owner quarantine.
- [ ] Runtime observer publication order, immutability and fault isolation.
- [ ] Interface action identity, availability and nested-result authority.
- [ ] Economy command semantic admission and conservation.
- [ ] Composite multi-domain transaction authority.
- [ ] Terminal outcome seal and immutable result authority.
- [ ] Pest population lifecycle, capacity, damage and render budgets.
- [ ] Canvas/HTML shared frame authority.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Observer publication gaps

```txt
publication identity and sequence: absent
predecessor and state revision: absent
observer identity and generation: absent
per-observer cursor: absent
immutable snapshot envelope: absent
shared-object mutation protection: absent
delivery queue: absent
reentrancy guard: absent
fault isolation: absent
typed delivery result: absent
duration and backpressure budget: absent
idempotent observer retirement: absent
publication journal: absent
visible publication-frame acknowledgement: absent
```

## Source consequences

- A subscriber can mutate the snapshot object seen by later subscribers.
- Reentrant mutation can make a later subscriber see successor S2 before predecessor S1.
- A throwing subscriber prevents all later subscribers from receiving the publication.
- State remains committed even though `command()` or `tick()` throws.
- Caller retry can duplicate an already committed effect.
- A slow subscriber blocks commands and animation frames.
- A throwing subscriber can stop canvas/HTML rendering and future RAF scheduling.
- Existing smoke proof cannot detect any observer failure mode.

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
- `Math.random()` prevents replay continuation.
- Save Select has no versioned storage or migration authority.

## Required fixtures

```txt
shared snapshot mutation isolation
monotonic publication sequence
two-observer normal order
reentrant command order
reentrant tick order
throwing first observer with successful second delivery
committed command result despite observer failure
retry duplicate prevention
observer duration/backpressure budget
unsubscribe and retirement policy
visible frame publication correlation
source/dist/Pages parity
```

## Dependency order

```txt
runtime session and command generation
  -> committed mutation result
  -> immutable sequenced publication
  -> non-reentrant observer delivery
  -> fault isolation and backpressure
  -> canvas/HTML frame correlation
  -> deployment proof
```

## Do not claim

Do not claim monotonic observation, immutable publication, subscriber isolation, retry safety or frame-loop liveness until required fixtures pass on `main`.