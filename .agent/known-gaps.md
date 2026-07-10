# Known gaps — ZombieOrchard

## Primary gap

There is no authoritative runtime-session or simulation-clock contract joining screen intent, gameplay ticking, host timing, reset, pause, stop, disposal, and proof readback.

```txt
screen intent
  -> lifecycle command
  -> session state transition
  -> wall-time accumulation
  -> fixed simulation steps
  -> gameplay-domain eligibility
  -> committed state
  -> render projection
  -> lifecycle/clock observation
```

## Specific gaps

1. `active-session` is constructed before Play or New Game.
2. The browser begins ticking immediately on page load.
3. `engine.tick(1 / 60)` runs once per RAF callback instead of from measured elapsed time.
4. Simulation speed changes with display refresh rate.
5. Background throttling changes simulation speed and can produce different outcomes.
6. No clock accumulator, catch-up policy, maximum-step policy, or dropped-time result exists.
7. No committed simulation tick ID is exposed separately from render frames.
8. Every domain ticks regardless of active interface screen.
9. Pressure continues increasing on non-gameplay screens.
10. Pest spawn, pursuit, and player damage continue while the Pause screen is active.
11. Build, Market, Roster, Inventory, Codex, Settings, Entry, and Outcome are not lifecycle states and do not suspend gameplay.
12. Play is a screen transition, not a start/resume transaction.
13. New Game is a screen transition, not a reset/start transaction.
14. No preset-driven reset service exists across all session-owned domains.
15. Outcome -> Title re-enters Outcome on the next tick because `ended` remains true.
16. No `start`, `pause`, `resume`, `reset`, `stop`, or `dispose` command contract exists.
17. No accepted/rejected/no-op lifecycle result reasons exist.
18. The RAF request ID is not retained or cancellable.
19. The root click listener cannot be removed.
20. Renderers have no disposal or no-op-after-dispose policy.
21. The engine has no coordinated domain disposal order.
22. `GameHost.tick()` can inject extra ticks during automatic ticking.
23. `GameHost` exposes mutable engine authority with no clock-mode guard.
24. Repeated creation can accumulate loops and listeners.
25. The smoke test cannot detect refresh-rate drift, pause leakage, reset failure, outcome bounce, duplicate loops, or duplicate listeners.
26. The Pages gate runs only the reachability smoke.
27. Global `Math.random()` still prevents deterministic apple and pest replay.
28. Commands still have no stable sequence or durable result journal.
29. Interface composition still discards nested child command results.
30. Runtime events are still ephemeral and cleared before durable observation.
31. No canonical state fingerprint or immutable committed-frame row exists.
32. Renderers record no consumed simulation tick or state fingerprint.
33. Resource payment remains boolean-only without transaction attribution.
34. Inventory lacks purchase intake and capacity policy.
35. Market source/result/projection/transaction causality remains unimplemented.

## Explicit non-gaps for the next pass

These are not the immediate blocker:

```txt
world canvas fidelity
orchard content volume
additional Market items
new pest types
economy balance
Market artwork
renderer replacement
full architectural rewrite
```

## Dependency order

```txt
runtime session and clock authority
  -> pause/reset/stop/dispose proof
  -> deterministic scenario authority
  -> command/frame/render observation
  -> Market transaction causality
  -> broader gameplay and content work
```