# Known gaps - ZombieOrchard

**Timestamp:** `2026-07-13T01-18-20-04-00`

## Summary

The newest documented gap is runtime event lifecycle authority. Emitted events are stored in a mutable ambient array, omitted from snapshots and subscriber publication, mixed across commands, and silently cleared at the next tick before browser rendering.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Runtime event identity, causal provenance, retention and consumer acknowledgement.
- [ ] Runtime observer publication order, immutability and fault isolation.
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
- [ ] Canvas/HTML shared frame authority.
- [ ] Seeded random and replay continuation.
- [ ] Versioned save/load authority.

## Event lifecycle gaps

```txt
event ID and monotonic sequence: absent
runtime/run/command/tick correlation: absent
immutable payload copy: absent
event range in published snapshots: absent
bounded journal: absent
retention and overflow policy: absent
consumer identity, generation and cursor: absent
delivery acknowledgement: absent
expiry and dead-letter result: absent
read-only public event gateway: absent
first visible event-frame acknowledgement: absent
```

## Source consequences

- Selection, field-change and action-request events are not present in normal snapshots.
- Multiple commands before the next tick share the same frame/elapsed values and one mutable array.
- The next tick erases all command-originated events before rendering.
- Subscribers receive state snapshots with no event range, so they cannot prove which events caused a state.
- `GameHost.getState()` omits events.
- Raw `GameHost.engine.ctx.events` can be mutated or cleared by external code.
- Array position is the only local ordering signal.
- Existing smoke proof cannot detect event loss, mutation, overflow or consumer divergence.

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
command event identity and causal correlation
two-command pre-tick retention
tick clear does not silently delete required events
event payload mutation isolation
journal bounds and overflow result
consumer cursor and acknowledgement
consumer retirement
public readback isolation
event range to snapshot correlation
event-driven visible frame correlation
source/dist/Pages parity
```

## Dependency order

```txt
runtime session and command identity
  -> event identity and immutable payload
  -> bounded journal and retention
  -> snapshot event-range publication
  -> consumer cursor and acknowledgement
  -> event-aware presentation
  -> deployment proof
```

## Do not claim

Do not claim event delivery, causal order, retention, consumer convergence or visible-frame parity until required fixtures pass on `main`.
