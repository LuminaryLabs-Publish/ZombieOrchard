# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-11T06-02-00-04-00
```

## Summary

`ZombieOrchard` has screen routes that look like a run lifecycle, but it has no runtime session instance. The entire mutable game graph is created before Play, every domain ticks on every screen, and Play, New Game, Start, Pause, Resume, Title, and Outcome only change the active interface route.

## Plan ledger

**Goal:** Establish one identified orchard run owner so lifecycle commands create, pause, resume, finalize, reset, retire, render, and dispose exactly one session graph.

- [x] Compare all ten accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `ZombieOrchard` under the oldest documented-selection rule.
- [x] Re-read runtime, interface, gameplay, renderer, preset, test, build, and deploy files.
- [x] Reconfirm the interaction loop, domains, kits, and offered services.
- [x] Trace Play, New Game, Start, Pause, Resume, Title, Outcome, and post-outcome re-entry.
- [x] Add timestamped session-authority audits.
- [x] Change no runtime source.
- [x] Create no branch or pull request.
- [ ] Runtime session implementation and executable fixtures remain future work.

## Selection result

```txt
ZombieOrchard        selected / 2026-07-11T03-48-31-04-00
TheUnmappedHouse     tracked  / 2026-07-11T04-00-07-04-00
AetherVale           tracked  / 2026-07-11T04-28-33-04-00
IntoTheMeadow        tracked  / 2026-07-11T04-49-30-04-00
MyCozyIsland         tracked  / 2026-07-11T05-10-36-04-00
TheOpenAbove         tracked  / 2026-07-11T05-25-29-04-00
HorrorCorridor       tracked  / 2026-07-11T05-28-29-04-00
PrehistoricRush      tracked  / 2026-07-11T05-39-11-04-00
PhantomCommand       tracked  / 2026-07-11T05-50-43-04-00
TheCavalryOfRome     excluded by rule
```

## Read this first

```txt
.agent/trackers/2026-07-11T06-02-00-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T06-02-00-04-00-runtime-session-instance-authority-dsk-map.md
.agent/render-audit/2026-07-11T06-02-00-04-00-session-frame-projection-lifecycle-gap.md
.agent/gameplay-audit/2026-07-11T06-02-00-04-00-play-new-game-title-outcome-state-loop.md
.agent/interaction-audit/2026-07-11T06-02-00-04-00-lifecycle-command-route-admission-map.md
.agent/session-authority-audit/2026-07-11T06-02-00-04-00-runtime-session-epoch-lifecycle-contract.md
.agent/deploy-audit/2026-07-11T06-02-00-04-00-session-lifecycle-fixture-gate.md
.agent/turn-ledger/2026-07-11T06-02-00-04-00.md
.agent/kit-registry.json
```

## Product read

`ZombieOrchard` is a dependency-free static browser orchard survival/economy shell. It contains a small kit runtime, 12 interface domains, gameplay services, canvas and HTML rendering, GameHost diagnostics, a Node smoke test, a static build, and Pages deployment.

## Actual interaction loop

```txt
module boot
  -> createOrchardGame()
  -> construct all mutable domains once
  -> install delegated click listener
  -> expose raw engine and manual tick on GameHost
  -> begin unretained recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> tick every domain regardless of current screen
  -> aggregate snapshots
  -> render orchard canvas
  -> replace interface HTML

Play / New Game / Start
  -> route to active-session
  -> reuse the same mutable graph

Pause / Resume / Title / Outcome
  -> route only
  -> simulation and world mutation continue unless active-session.ended stops only that domain
```

## Main finding

The visible lifecycle is not authoritative.

```txt
New Game does not create a new graph
Start does not reset state
Pause does not freeze simulation
Title does not retire the session
Outcome does not create an immutable terminal result
Title after Outcome is pulled back to Outcome on the next tick
Play after Outcome reuses ended state
RAF, listeners, globals, and renderer handles have no lifecycle owner
```

The most concrete defect is the Outcome bounce-back: `interface-composition.tick()` routes any ended session to Outcome. Choosing Title changes the route to Entry, but the next tick sees the same ended session and routes back to Outcome.

## Current implementation queue

```txt
1. Runtime Session Instance Authority
   + Start / Reset / Title / Outcome Fidelity Fixture Gate

2. Fixed-Step Clock Authority
   + Pause / 30-60-120 Hz Parity Fixture Gate

3. Interaction Capability Reachability
   + Movement / Service-Binding Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest Determinism Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```

Do not add persistence, extra gameplay, or new UI routes before the run owner can prove fresh start, pause freeze, terminal finalization, stable return to title, reset, stale-work rejection, and idempotent disposal.
