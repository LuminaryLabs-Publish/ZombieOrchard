# Phase-system audit: day/night admission and settlement contract

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Authority

`zombie-orchard-day-phase-transition-admission-settlement-authority-domain`

## State model

```txt
PhaseGeneration
  sessionRevision
  phaseRevision
  phase: day | night
  day
  enteredAtSimulationTime
  elapsedSimulationTime
  settlementStatus: stable | pending | retired
```

## Admission invariants

1. The request binds the exact expected phase generation.
2. The request is rejected after session end, route retirement, pause, or suspension unless policy explicitly permits it.
3. Minimum phase duration or completion criteria are evaluated before mutation.
4. Only one transition may be pending for one phase generation.
5. Duplicate idempotency keys replay the original terminal result.

## Settlement invariants

1. Outgoing phase settlement completes before the new phase becomes authoritative.
2. Night exit applies required pressure and pest policy exactly once.
3. Day increments only during accepted night-to-day settlement.
4. Participant revisions are captured in the terminal result.
5. A failed participant produces an explicit rejected, rolled-back, compensated, or indeterminate result.
6. HTML and Canvas projection consume the same accepted generation.

## Proposed policy decision

The minimal safe rule is:

```txt
enter night
  -> require at least one admitted simulation settlement tick
  -> then permit night-to-day transition
```

A richer game can later replace this with duration, objective, resource, or encounter-completion criteria without changing the command/result boundary.

## Proof matrix

| Fixture | Expected result |
|---|---|
| one valid day-to-night request | accepted once |
| second request before settlement | rejected `transition-pending` or `minimum-duration-not-met` |
| duplicate idempotency key | exact replay, no mutation |
| stale expected phase | rejected, no mutation |
| one admitted night tick then day request | accepted according to policy |
| source/dist/Pages | same result and frame acknowledgement |

No runtime phase policy was implemented in this audit.