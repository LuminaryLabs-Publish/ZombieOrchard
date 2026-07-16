# Interaction audit: audio projection command/result map

**Timestamp:** `2026-07-16T09-02-09-04-00`

## Summary

Delegated click handlers dispatch route and active-session commands directly. Command acceptance is available, but there is no stable event identity, unlock result, cue-admission result, or audible acknowledgement.

## Plan ledger

**Goal:** make audio causally traceable to accepted domain results without playing sounds directly from DOM handlers.

- [x] Map delegated click dispatch.
- [x] Map accepted/rejected command results.
- [x] Define audio admission, projection and acknowledgement results.
- [ ] Implement and prove the chain.

## Required map

```txt
GameplayCommand
  -> GameplayCommandResult
       accepted
       domainRevision
       semanticEvents[]

AudioUnlockCommand
  -> AudioUnlockResult
       contextGeneration
       disposition

AudioProjectionAdmissionCommand
  -> AudioProjectionResult
       audioEventId
       cueId
       providerGeneration
       disposition

AudioVisualConvergenceCommand
  -> FirstAudibleCueAck
  -> FirstAudioVisualConvergenceAck
```

## Rejection classes

```txt
unsupported browser capability
unlock not accepted
stale route or gameplay revision
duplicate AudioEventId
muted category
suspended or closed context
voice budget exhausted
retired provider generation
unknown cue descriptor
provider failure
```