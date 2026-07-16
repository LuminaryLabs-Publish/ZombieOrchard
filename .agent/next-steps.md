# Next steps: ZombieOrchard cross-domain gameplay transaction settlement

**Timestamp:** `2026-07-16T16-40-45-04-00`  
**Status:** `cross-domain-gameplay-transaction-settlement-authority-audited`

## Summary

The next implementation slice is a transaction coordinator that preflights all required participants, prepares immutable effects, commits them exactly once, and publishes an exact terminal result consumed by interface composition and both render surfaces.

## Plan ledger

**Goal:** eliminate partial gameplay settlement without moving domain truth into the coordinator.

- [ ] Add stable transaction IDs, idempotency keys, canonical payload digests, and expected participant revisions.
- [ ] Add preflight for participants, targets, funds, item identity, route, and policy.
- [ ] Add prepared intents for orchard, resources, pressure, session, pests, construction, roster, and inventory.
- [ ] Add atomic commit ordering plus rollback or explicit compensation.
- [ ] Add a terminal transaction journal and exact duplicate-result replay.
- [ ] Propagate nested command results through `interface-composition`.
- [ ] Add `GameplayTransactionResult` and `FirstTransactionBoundFrameAck`.
- [ ] Add source, dist, and Pages failure/retry/parity fixtures.

## Ordering

```txt
transaction envelope
  -> participant revisions
  -> preflight
  -> prepare
  -> commit or rollback/compensate
  -> terminal journal
  -> exact nested result
  -> HTML/Canvas acknowledgement
  -> parity fixtures
```

Do not implement settlement by duplicating gameplay state inside the transaction coordinator.