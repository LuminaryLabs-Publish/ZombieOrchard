# Audio audit: browser unlock, cue and lifecycle contract

**Timestamp:** `2026-07-16T09-02-09-04-00`

## Summary

No browser-audio provider exists. A future provider must be admitted through an accepted user gesture, remain downstream of semantic results, enforce preferences and voice budgets, and settle on pause, blur, visibility, pagehide and route retirement.

## Plan ledger

**Goal:** define a browser-safe audio lifecycle that cannot leak nodes, duplicate cues, or outlive its document and route generations.

- [x] Confirm capability and provider surfaces are absent.
- [x] Define unlock, generation and disposal ownership.
- [x] Define cue deduplication and budgets.
- [x] Define lifecycle settlement and acknowledgements.
- [ ] Implement and validate the contract.

## Contract

```txt
unlock
  -> accepted pointer/keyboard gesture
  -> create/resume AudioContext once per generation
  -> publish AudioUnlockResult

projection
  -> consume accepted AudioEvent
  -> resolve versioned cue descriptor
  -> apply preferences and budget
  -> play or explicitly suppress
  -> publish AudioProjectionResult

lifecycle
  -> pause/blur/hidden: suspend or attenuate by policy
  -> resume: re-admit provider generation
  -> pagehide/route retirement: stop loops and release nodes
  -> reject stale callbacks from retired generations
```

## Minimum buses

```txt
master
interface
effects
ambience
```

## Minimum fixtures

```txt
first-gesture unlock
repeated unlock deduplication
accepted/rejected command distinction
collection and clear cue identity
damage and failure priority
phase ambience transition
mute and category preferences
voice-budget saturation
blur/visibility/pagehide settlement
route retirement
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
```