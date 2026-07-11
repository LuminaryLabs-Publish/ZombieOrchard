# Known gaps — ZombieOrchard

## Primary architecture gap

There is no authoritative runtime-session instance joining screen intent, state ownership, session identity, reset, pause, outcome, title return, stop, disposal, and proof readback.

```txt
lifecycle intent
  -> admission policy
  -> session transaction
  -> session epoch
  -> fresh or retained domain graph
  -> committed state fingerprint
  -> render projection
  -> lifecycle result journal
```

## Specific gaps

### Session identity and reset fidelity

1. `createOrchardGame()` constructs the full mutable game graph once.
2. The browser starts ticking that graph immediately, before Play or New Game.
3. No session identifier or epoch distinguishes one run from another.
4. Play changes the active interface screen but does not start or admit a run.
5. New Game changes Entry -> Run Setup -> Gameplay but does not reconstruct or reset any domain.
6. Resources can survive a nominal New Game.
7. Pressure can survive a nominal New Game and continues rising outside gameplay.
8. Apple population and random state survive a nominal New Game.
9. Built objects and roster actors survive a nominal New Game.
10. Equipment selection survives a nominal New Game.
11. Player condition, position, pests, phase, day, score, message, and ended state survive a nominal New Game.
12. Title changes the screen but does not retire, stop, or reset the current run.
13. Outcome is derived from `active-session.ended`, which remains true after leaving Outcome.
14. Outcome -> Title can therefore return to Outcome on the next composition tick.
15. There is no preset-backed reset factory, before/after fingerprint, or reset result.
16. There is no stop or dispose contract.
17. RAF and delegated click-listener ownership cannot be released.
18. Future commands remain accepted after any screen-level exit.

### Timing and lifecycle eligibility

19. `engine.tick(1 / 60)` runs once per RAF callback rather than from measured elapsed time.
20. Simulation speed changes with refresh rate and background throttling.
21. No accumulator, catch-up limit, dropped-time policy, or committed simulation tick exists.
22. Every domain ticks regardless of session or screen state.
23. Pressure increases on Entry, Settings, Pause, Build, Market, Roster, Inventory, Codex, and Outcome.
24. Pest spawning, pursuit, damage, failure, and automatic Outcome routing continue while Pause is displayed.
25. `GameHost.tick()` can inject manual ticks beside the automatic loop.

### Interaction capability reachability

26. `active-session.move` exists but no browser input path invokes it.
27. No keyboard, pointer, gamepad, or accessible movement controls exist.
28. The player starts at a fixed position with a 42-unit collection radius.
29. Random apple seeding does not guarantee a nearby collectible apple.
30. The core collection loop can therefore begin in an unrecoverable state for a browser user.
31. `roster-runtime.hire` is implemented but has no route or rendered control.
32. `inventory-runtime.equip` is implemented but inventory cards are not interactive.
33. Scoped interface `select` and `set-field` commands are unbound.
34. Session Select has no incoming route.
35. Run Setup and Settings expose no real field descriptors.
36. Market, Codex, Roster, Inventory, and Session Select overstate the operational product surface.
37. Disabled action metadata is not emitted as disabled HTML controls.

### Command, determinism, render, and proof

38. Global `Math.random()` prevents deterministic apple and pest replay.
39. Commands have no stable sequence or durable result journal.
40. Interface composition discards nested child command results.
41. Nested commands can notify subscribers before the parent transaction completes.
42. Runtime events are cleared each tick and are not durably observable.
43. No canonical state fingerprint or committed-frame row exists.
44. Renderers record no source session epoch, simulation tick, or state fingerprint.
45. Resource payment is boolean-only and lacks transaction attribution.
46. Inventory accepts arbitrary equipment IDs.
47. Construction falls back to the first catalog item when an unknown ID is supplied.
48. The smoke test proves only Entry -> Play and non-empty apples.
49. The Pages gate cannot detect stale-state New Game behavior, Outcome bounce-back, pause drift, refresh-rate divergence, leaked RAF/listener ownership, or unreachable services.

## Explicit non-gaps for the next pass

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
session instance authority
  -> start/reset/title/outcome fidelity proof
  -> stop/dispose ownership proof
  -> fixed-step clock and pause eligibility
  -> 30/60/120 Hz parity proof
  -> capability registry and movement admission
  -> deterministic scenario authority
  -> command/frame/render observation
  -> Market transaction causality
  -> broader gameplay and content work
```