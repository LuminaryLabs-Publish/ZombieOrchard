# Gameplay audit: silent orchard action and outcome loop

**Timestamp:** `2026-07-16T09-02-09-04-00`

## Summary

Collection, pest clearing, damage, build, hire, phase change, failure and outcome transitions all alter accepted gameplay state, score, resources or messages. None produces a stable audio event or provider result.

## Plan ledger

**Goal:** derive audio from accepted gameplay meaning rather than pointer events or visual polling.

- [x] Trace collection and clear commands.
- [x] Trace economy, phase and terminal transitions.
- [x] Confirm no audio event schema or adapter exists.
- [ ] Add semantic adapters and cue fixtures.

## Current loop

```txt
collect apple
  -> world removes/refills apple
  -> ledger grants resources
  -> score/message/pressure change
  -> visible frame updates silently

clear pest
  -> pest condition changes or pest is removed
  -> score/scrap/message change
  -> visible frame updates silently

next phase / build / hire / failure
  -> accepted state transition
  -> visible UI/world transition
  -> no owned audible result
```

## Required gameplay audio result

```txt
AudioEvent
  eventId
  eventType
  gameplayRevision
  routeRevision
  sourceEntityId?
  position?
  intensity?
  disposition: admitted | suppressed | stale | rejected
```

The audit does not prescribe assets, musical style, loudness, or balance values.