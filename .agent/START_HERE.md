# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-10T22-11-24-04-00
```

## Current implementation queue

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate
```

The first gate is now narrower and more explicit. The browser constructs one mutable game instance before the player starts, and Play, New Game, Title, and Outcome controls only change interface screens. No lifecycle transaction creates, resets, retires, or identifies a session instance.

## Read this first

```txt
.agent/trackers/2026-07-10T22-11-24-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T22-11-24-04-00-runtime-session-instance-reset-dsk-map.md
.agent/render-audit/2026-07-10T22-11-24-04-00-screen-session-state-divergence-gap.md
.agent/gameplay-audit/2026-07-10T22-11-24-04-00-play-new-title-outcome-reset-loop.md
.agent/interaction-audit/2026-07-10T22-11-24-04-00-lifecycle-control-admission-result-map.md
.agent/session-authority-audit/2026-07-10T22-11-24-04-00-session-epoch-reset-dispose-contract.md
.agent/deploy-audit/2026-07-10T22-11-24-04-00-session-reset-fidelity-fixture-gate.md
.agent/turn-ledger/2026-07-10T22-11-24-04-00.md
.agent/kit-registry.json
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

```txt
ZombieOrchard        selected / 2026-07-10T20-30-23-04-00
TheUnmappedHouse     tracked  / 2026-07-10T20-38-24-04-00
MyCozyIsland         tracked  / 2026-07-10T20-48-55-04-00
PrehistoricRush      tracked  / 2026-07-10T21-00-16-04-00
AetherVale           tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow        tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove         tracked  / 2026-07-10T21-31-01-04-00
HorrorCorridor       tracked  / 2026-07-10T21-39-22-04-00
PhantomCommand       tracked  / 2026-07-10T21-49-26-04-00
TheCavalryOfRome     excluded by rule
```

`ZombieOrchard` was the oldest eligible documented fallback and the only product repository changed in this run.

## Product read

`ZombieOrchard` is a dependency-free static browser orchard survival and economy shell. It composes a small kit runtime, 12 scoped interface domains, gameplay service domains, two render surfaces, a diagnostic host, one Node smoke test, and a Pages deployment workflow.

## Actual interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> construct every gameplay and interface domain immediately
  -> attach one delegated root click listener
  -> begin one uncancelled requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> tick all domains
  -> aggregate snapshot
  -> render canvas and replace interface HTML

Play / New Game / Pause / Resume / Title / Outcome
  -> interface-composition.activate
  -> screen transition only
  -> no session create, reset, epoch, stop, or disposal transaction
```

## Main finding

The runtime has screen navigation but no authoritative session instance. Because the same engine and mutable domains survive every route transition, `New Game` does not create a new run, `Title` does not retire the old run, and an ended session can force the interface back to Outcome on the next tick.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start/Reset/Title/Outcome Fidelity Fixture Gate
```

Do not begin with Market content, economy balancing, renderer replacement, new pests, or visual polish. Establish session ownership and reset fidelity first.