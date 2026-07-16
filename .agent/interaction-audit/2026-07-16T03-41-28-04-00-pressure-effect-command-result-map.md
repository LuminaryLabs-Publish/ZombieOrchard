# Interaction audit: pressure effect command/result map

**Timestamp:** `2026-07-16T03-41-28-04-00`

## Summary

Pressure adjustment commands return only acceptance, and automatic tick growth returns no command result. No caller can identify the pressure revision, threshold crossing, affected consumer or first matching frame.

## Plan ledger

**Goal:** make pressure changes and their gameplay consequences causally traceable without routing them through UI handlers.

- [x] Map adjustment and tick producers.
- [x] Map missing evaluation/adoption results.
- [x] Define command and acknowledgement chain.
- [ ] Implement and prove the chain.

## Required map

```txt
PressureAdjustmentCommand
  -> PressureAdjustmentResult
       previousRevision
       nextRevision
       changedChannels

PressureEffectEvaluationCommand
  -> PressureEffectEvaluationResult
       policyVersion
       entered/exited bands
       proposed effects

PressureEffectAdoptionCommand
  -> PressureEffectAdoptionResult
       applied consumer revisions
       unchanged/rejected reasons

PressureFeedbackProjectionCommand
  -> FirstPressureEffectFrameAck
```

## Rejection classes

```txt
stale pressure revision
stale session or phase revision
unknown channel
unknown consumer
incompatible policy version
duplicate threshold crossing
retired run generation
invalid numeric effect
```
