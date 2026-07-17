# Known gaps: ZombieOrchard day/phase transition admission

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Summary

The current phase command does not prove that a day/night transition was eligible, settled exactly once, exposed to required simulation, or projected as a matching frame.

## Plan ledger

**Goal:** keep phase progression and proof gaps explicit until implemented and executed.

- [x] Record source-backed rapid-transition and zero-night-tick gaps.
- [x] Preserve active-session, pressure, pest, interface, and renderer ownership boundaries.
- [x] Define required results and fixtures.
- [ ] Close the gaps in runtime code.

## Gaps

```txt
TransitionId and IdempotencyKey
expected session, phase and day revisions
PhaseGeneration
minimum phase duration or completion criteria
pending transition lock
night-entry settlement
night-exit eligibility
pressure and pest participant settlement
exactly-once day increment
stale and duplicate rejection
PhaseTransitionResult
FirstPhaseBoundFrameAck
rapid-double-activation fixture
zero-night-tick fixture
stale-phase fixture
source/dist/Pages phase parity
```

## Retained gaps

The interactive-control stability audit and all earlier transaction, audio, pressure, determinism, persistence, lifecycle, rendering, command, accessibility, and gameplay-adoption gaps remain retained unless separately implemented and validated.