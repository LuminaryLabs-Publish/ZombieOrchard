# Next steps — ZombieOrchard

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```

## Goal

Make one explicit runtime session own simulation time, lifecycle state, automatic ticking, pause/resume behavior, reset/start/stop/dispose behavior, and proof readback. The same command/tick scenario must produce equivalent gameplay state under 30, 60, and 120 Hz render schedules.

## Implementation order

1. Add a JSON-safe runtime-session state model: `idle`, `starting`, `running`, `paused`, `ended`, `stopping`, `stopped`, `disposed`, and `failed`.
2. Update `createOrchardGame()` so gameplay session construction or reset is explicit rather than implied by screen creation.
3. Add one host-owned clock with wall-time accumulation, a fixed simulation delta, a maximum catch-up step count, and a committed simulation tick index.
4. Replace one-fixed-step-per-RAF behavior with zero or more fixed simulation steps derived from elapsed wall time.
5. Keep render cadence separate from simulation cadence.
6. Gate `pressure-field.tick()` and `active-session.tick()` on authoritative session state.
7. Define exact Pause semantics: no pressure growth, pest spawn, pursuit, damage, phase mutation, or score mutation while paused.
8. Define New Game as an atomic reset/start transaction that recreates or resets all gameplay domains from the preset.
9. Define Play as either start/resume according to explicit session state, never as a screen-only transition.
10. Fix Outcome -> Title by stopping or resetting the ended session before returning to Entry.
11. Add `start`, `pause`, `resume`, `reset`, `stop`, and `dispose` commands with accepted/rejected/no-op results.
12. Retain the RAF request ID and cancel it during stop/dispose.
13. Return a disposer from `createHtmlInterfaceRenderer()` that removes the root click listener.
14. Add renderer disposal/no-op-after-dispose behavior.
15. Restrict `GameHost.tick()` to an explicit manual-clock/test mode, or make it reject while automatic clock ownership is active.
16. Add bounded lifecycle, clock-step, and session-result journals to `GameHost`.
17. Add a DOM-free session fixture that drives the runtime without RAF.
18. Prove equivalent committed gameplay fingerprints for 30/60/120 Hz render schedules over equal wall time.
19. Prove pause freezes all gameplay fingerprints while render frames may continue.
20. Prove New Game resets resources, pressure, orchard, session, interface, and result journals according to policy.
21. Prove Outcome -> Title remains at Entry and does not bounce back to Outcome.
22. Prove repeated start/stop cycles create one clock loop and one click listener only.
23. Gate `npm test` on lifecycle/clock fixtures before build and Pages deployment.
24. Compose the existing deterministic scenario authority work beneath session IDs and simulation tick IDs.
25. Implement Market transaction causality after lifecycle and deterministic scenario proof can observe it reliably.

## Domain-update-first map

```txt
src/start.js host
  -> wall-time clock, RAF ownership, lifecycle orchestration, stop/dispose

kit-runtime
  -> lifecycle state, tick mode, committed simulation tick, reset/dispose routing

interface-composition-kit
  -> lifecycle-aware Play/New/Pause/Resume/Title/Outcome transitions

pressure-field-kit
  -> running-state tick guard

active-session-domain-kit
  -> running-state tick guard, explicit reset/start/end semantics

resource/orchard/construction/roster/inventory kits
  -> reset-from-preset behavior

html-interface-render-kit
  -> removable listener and disposed-state behavior

world-canvas-render-kit
  -> disposed-state behavior and render-frame observation

game-host-diagnostics-kit
  -> bounded lifecycle/clock readback and manual-mode enforcement

smoke-fixture-kit
  -> session clock, pause, reset, re-entry, and refresh-rate parity gates
```

Only add new kits where no existing owner can reasonably hold the capability:

```txt
runtime-session-authority-kit
fixed-step-clock-kit
runtime-lifecycle-fixture-adapter-kit
```

The existing proposed deterministic kits remain companion capabilities:

```txt
deterministic-random-source-kit
state-fingerprint-kit
scenario-fixture-adapter-kit
```

## Acceptance checklist

```txt
[ ] Session states and transition reasons are versioned and JSON-safe.
[ ] Gameplay domains do not tick before a session starts.
[ ] Pause freezes pressure, pest, player-condition, score, resource, and phase state.
[ ] Equal wall time at 30/60/120 Hz yields equivalent simulation tick counts and gameplay fingerprints.
[ ] Render frames may vary without changing committed gameplay results.
[ ] Catch-up steps are bounded and report dropped/limited time explicitly.
[ ] New Game atomically resets all declared session-owned domains.
[ ] Play never silently reuses an ended session.
[ ] Outcome -> Title remains on Entry until an explicit start action.
[ ] Only one RAF loop exists after repeated start/stop/restart cycles.
[ ] Only one root click listener exists after repeated renderer creation/disposal.
[ ] Stop cancels RAF and prevents future automatic ticks.
[ ] Dispose removes listeners and rejects future mutation commands.
[ ] Manual GameHost ticking cannot race with the automatic clock.
[ ] Lifecycle and clock journals are bounded, immutable to consumers, and JSON-safe.
[ ] DOM-free session fixture passes.
[ ] npm test gates build and deployment on lifecycle/clock proof.
[ ] Deterministic scenario IDs are scoped beneath session IDs.
```

## Avoid until proof exists

- Market catalog expansion
- economy balancing
- new orchard content
- new pest types
- renderer replacement
- visual polish
- save/resume claims
- automation claims based on raw `GameHost.tick()`
- broad runtime refactors without lifecycle fixtures