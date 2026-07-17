# Interaction audit: phase transition command/result map

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Current command path

```txt
<button data-command="next-phase">
  -> root click delegate
  -> engine.command("active-session", "next-phase")
  -> unconditional state mutation
  -> { accepted: true }
```

The control supplies no transition identity or expected state. The result does not report previous/new phase, day change, participant settlement, duplicate detection, or presentation acknowledgement.

## Required interaction path

```txt
Next Phase gesture
  -> PhaseTransitionAdmissionCommand
     TransitionId
     IdempotencyKey
     expectedSessionRevision
     expectedPhaseGeneration
     expectedPhase
     expectedDay
     inputEvidence

  -> PhaseTransitionAdmissionResult
     accepted | rejected | duplicate
     reason
     settlementPlan

  -> PhaseTransitionSettlementResult
     previousPhase
     newPhase
     previousDay
     newDay
     participantRevisions
     transitionGeneration

  -> FirstPhaseBoundFrameAck
```

## Rejection reasons

```txt
stale-session
stale-phase
stale-day
minimum-duration-not-met
transition-pending
route-not-active
session-ended
paused
suspended
duplicate
invalid-request
```

## Control requirements

- Disable or mark pending only from an authoritative transition result.
- Preserve the current phase control identity across frames.
- Deduplicate pointer, keyboard, and programmatic duplicate delivery.
- Do not infer success solely from the next snapshot.
- Present a rejected reason without changing phase truth.

This audit defines the command boundary only; no interaction code changed.