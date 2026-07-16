# Known gaps: ZombieOrchard game audio event projection

**Timestamp:** `2026-07-16T09-02-09-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

The game has no owned audio projection surface. Visual gameplay remains functional, but audible feedback, unlock, lifecycle, preferences, budgets, and browser proof are absent.

## Plan ledger

**Goal:** keep the missing audio work explicit and prevent unsupported readiness claims.

- [x] Record source-backed gaps.
- [x] Separate gameplay meaning from provider effects.
- [x] Define required fixtures and acknowledgements.
- [ ] Close the gaps in runtime code.

## Gaps

```txt
browser audio capability observer
accepted user-gesture unlock transaction
AudioContext/provider generation ownership
stable semantic AudioEventId
versioned cue descriptor registry
interface, collection, combat, economy, phase and outcome adapters
day/night ambience lifecycle
listener and optional spatial-source projection
master/category preferences
cue deduplication
priority, pooling and voice budgets
pause/blur/visibility/pagehide/route settlement
stale provider-generation rejection
AudioProjectionResult
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
source/dist/Pages browser parity fixtures
```

## Retained gaps

Previously documented pressure, determinism, persistence, lifecycle, rendering, command, and gameplay-adoption gaps remain retained unless separately implemented and validated.