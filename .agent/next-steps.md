# Next steps: ZombieOrchard day/phase transition admission

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Summary

The next implementation slice is a revision-bound phase transition command that enforces minimum settlement policy, rejects rapid or stale requests, increments day exactly once, and publishes one matching HTML/Canvas frame acknowledgement.

## Plan ledger

**Goal:** prevent phase and day progression from bypassing required simulation settlement.

- [ ] Add `TransitionId`, `IdempotencyKey`, expected session revision, expected phase generation, expected phase, and expected day.
- [ ] Define minimum day/night duration or completion criteria.
- [ ] Reject a second transition while one settlement is pending.
- [ ] Require at least one admitted night settlement tick before night exit under the minimal policy.
- [ ] Move day increment into accepted day-entry settlement.
- [ ] Bind pressure and pest settlement to the same transition generation.
- [ ] Publish `PhaseTransitionResult` and `FirstPhaseBoundFrameAck`.
- [ ] Add rapid-double-click, duplicate-delivery, stale-phase, zero-night-tick, source, dist, and Pages fixtures.

## Ordering

```txt
phase identity and expected revisions
  -> admission and duration policy
  -> pending transition lock
  -> outgoing phase settlement
  -> participant adapters
  -> terminal transition result
  -> HTML/Canvas projection acknowledgement
  -> source/dist/Pages parity
```

Preserve the existing active-session domain. This is targeted command and settlement wiring, not a domain-wide rewrite.