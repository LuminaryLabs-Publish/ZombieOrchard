# Next steps: ZombieOrchard game audio event projection

**Timestamp:** `2026-07-16T09-02-09-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

The next implementation slice is a result-driven browser-audio authority with explicit unlock, cue, preference, budget, lifecycle, and acknowledgement results.

## Plan ledger

**Goal:** add audible feedback without coupling gameplay truth to DOM events, RAF cadence, or provider state.

- [ ] Add stable semantic events to accepted route/gameplay/economy/phase/outcome results.
- [ ] Add capability observation and user-gesture audio unlock.
- [ ] Add a versioned cue registry and procedural or bundled cue provider.
- [ ] Add master, interface, effects, and ambience preferences.
- [ ] Add cue deduplication, priority, pooling, and voice budgets.
- [ ] Add pause, blur, visibility, pagehide, and route-retirement settlement.
- [ ] Add `AudioProjectionResult`, `FirstAudibleCueAck`, and `FirstAudioVisualConvergenceAck`.
- [ ] Add source, dist, and Pages browser fixtures.

## Ordering

```txt
semantic results
  -> unlock/capability
  -> cue registry/provider
  -> preferences and budgets
  -> lifecycle settlement
  -> audiovisual acknowledgements
  -> parity fixtures
```

Do not play sounds directly from delegated click handlers.