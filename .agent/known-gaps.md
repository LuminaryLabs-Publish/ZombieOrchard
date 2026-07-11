# Known gaps — ZombieOrchard

## Primary architecture gap

There is still no authoritative runtime-session or simulation-clock contract joining screen intent, gameplay ticking, host timing, reset, pause, stop, disposal, and proof readback.

```txt
screen intent
  -> lifecycle command
  -> session transition
  -> fixed simulation steps
  -> gameplay-domain eligibility
  -> committed state
  -> render projection
  -> lifecycle/clock observation
```

## Newly confirmed interaction gap

There is also no capability exposure contract joining implemented services to routes, affordances, bindings, results, and fixtures.

```txt
domain service
  -> capability classification
  -> interface route
  -> rendered affordance
  -> command binding
  -> typed result
  -> observable effect
  -> fixture proof
```

## Specific gaps

### Lifecycle and timing

1. `active-session` is constructed before Play or New Game.
2. The browser begins ticking immediately on page load.
3. `engine.tick(1 / 60)` runs once per RAF callback instead of from measured elapsed time.
4. Simulation speed changes with display refresh rate and background throttling.
5. No clock accumulator, catch-up policy, maximum-step policy, or dropped-time result exists.
6. No committed simulation tick ID is exposed separately from render frames.
7. Every domain ticks regardless of active interface screen.
8. Pressure increases on Entry, Settings, Pause, Build, Market, Roster, Inventory, Codex, and Outcome.
9. Pest spawn, pursuit, damage, score, and failure continue while Pause is displayed.
10. Play is a screen transition, not a start/resume transaction.
11. New Game is a screen transition, not a reset/start transaction.
12. Outcome -> Title re-enters Outcome on the next tick because the ended session remains active.
13. No coordinated `start`, `pause`, `resume`, `reset`, `stop`, or `dispose` contract exists.
14. RAF and delegated click-listener ownership cannot be released.
15. `GameHost.tick()` can inject live ticks beside the automatic loop.

### Capability reachability

16. `active-session.move` is implemented but no human input binding invokes it.
17. No keyboard, pointer, gamepad, or accessible on-screen movement adapter exists.
18. The player starts with a fixed position and a 42-unit collection radius.
19. Apple seeding is random and does not guarantee an apple inside collection range.
20. The core collection loop can therefore start in an unrecoverable state for a browser user.
21. `roster-runtime.hire` is implemented but has no action descriptor or control.
22. `inventory-runtime.equip` is implemented but inventory cards are not interactive.
23. Scoped interface `select` is implemented but never bound.
24. Scoped interface `set-field` is implemented but no field controls are rendered.
25. `session-select` is instantiated but has no incoming route from Entry.
26. Run Setup and Preferences are shells with no rendered or editable fields.
27. Exchange is labeled Market but has no market source, command, result, inventory intake, or transaction service.
28. Codex is a Back-only shell with no knowledge source or projection rows.
29. Disabled action metadata is ignored by the HTML renderer.
30. No canonical registry distinguishes public, indirect, internal, dormant, and unsupported services.
31. No fixture proves that declared public capabilities are reachable.

### Command, determinism, and proof

32. Global `Math.random()` prevents deterministic apple and pest replay.
33. Commands have no stable sequence or durable result journal.
34. Interface composition discards nested child command results.
35. Reentrant nested commands can notify subscribers before the parent command completes.
36. Runtime events are ephemeral and cleared before durable observation.
37. No canonical state fingerprint or immutable committed-frame row exists.
38. Renderers record no consumed simulation tick or state fingerprint.
39. Resource payment remains boolean-only without transaction attribution.
40. Inventory lacks purchase intake and capacity policy.
41. Market source/result/projection/transaction causality remains unimplemented.
42. The smoke test proves only Entry -> Play and non-empty apples.
43. The Pages gate therefore cannot detect lifecycle drift, unreachable capabilities, movement failure, or service-binding regressions.

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
  -> capability registry and movement admission
  -> public service reachability proof
  -> deterministic scenario authority
  -> command/frame/render observation
  -> Market transaction causality
  -> broader gameplay and content work
```