# Architecture audit: day/phase transition admission DSK map

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Current ownership

```txt
html-interface-render-kit
  -> direct active-session next-phase command

active-session-domain-kit
  -> toggles day/night
  -> increments day on every transition into day
  -> owns night pest simulation and player damage

pressure-field-kit
  -> advances pressure independently every tick

kit-runtime
  -> dispatches command immediately
  -> ticks domains on the next RAF
```

The phase mutation, day counter, pressure evolution, pest behavior, and visible frame are related but not bound by one transition identity or settlement result.

## Required parent DSK

`zombie-orchard-day-phase-transition-admission-settlement-authority-domain`

## Child surfaces

```txt
admission
  phase-transition-command-envelope-kit
  phase-generation-identity-kit
  expected-phase-precondition-kit
  phase-duration-policy-kit
  transition-eligibility-policy-kit
  transition-cooldown-kit
  pending-transition-lock-kit

settlement
  night-entry-settlement-kit
  day-entry-settlement-kit
  pressure-settlement-adapter-kit
  pest-settlement-adapter-kit
  session-day-counter-adapter-kit
  phase-transition-idempotency-kit
  phase-transition-result-kit

presentation and proof
  first-phase-bound-frame-ack-kit
  rapid-double-activation-fixture-kit
  zero-night-tick-fixture-kit
  source-dist-pages-phase-parity-kit
```

## Command/result contract

```txt
PhaseTransitionAdmissionCommand
  TransitionId
  IdempotencyKey
  expectedSessionRevision
  expectedPhaseGeneration
  expectedPhase
  expectedDay
  requestedPhase or advance intent
  input evidence

PhaseTransitionAdmissionResult
  accepted | rejected | duplicate
  reason
  admitted settlement plan

PhaseTransitionSettlementResult
  previous phase/day
  new phase/day
  applied participant revisions
  terminal transition generation
  exact duplicate replay metadata

FirstPhaseBoundFrameAck
  transition generation
  engine snapshot revision
  HTML frame revision
  Canvas frame revision
```

## Invariants

1. A transition is accepted only from the expected phase generation.
2. A phase cannot be entered and exited before its minimum settlement policy is satisfied.
3. One idempotency key changes the phase at most once.
4. Day increments only as part of one accepted day-entry settlement.
5. Pressure and pest settlement use the same transition generation.
6. HTML and Canvas acknowledge the same accepted phase generation.

## Boundary

This is proposed architecture. No DSK or runtime implementation was added.