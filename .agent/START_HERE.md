# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-10T23-50-53-04-00
```

## Current implementation queue

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. ZombieOrchard Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate
```

The newest audit adds the fourth gate without changing the first three priorities. Apple placement, apple identity and kind, pest identity and spawn direction, and night spawn admission all call global `Math.random()`. No seed, random-stream state, decision journal, or replay receipt reaches the runtime snapshot or `GameHost`.

## Read this first

```txt
.agent/trackers/2026-07-10T23-50-53-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T23-50-53-04-00-random-source-replay-authority-dsk-map.md
.agent/render-audit/2026-07-10T23-50-53-04-00-random-state-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-10T23-50-53-04-00-apple-pest-seed-replay-loop.md
.agent/interaction-audit/2026-07-10T23-50-53-04-00-command-random-outcome-correlation-map.md
.agent/randomness-audit/2026-07-10T23-50-53-04-00-seeded-rng-deterministic-replay-contract.md
.agent/deploy-audit/2026-07-10T23-50-53-04-00-seed-replay-parity-fixture-gate.md
.agent/turn-ledger/2026-07-10T23-50-53-04-00.md
.agent/kit-registry.json
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

```txt
ZombieOrchard        selected / 2026-07-10T22-11-24-04-00
TheUnmappedHouse     tracked  / 2026-07-10T22-21-17-04-00
MyCozyIsland         tracked  / 2026-07-10T22-29-21-04-00
AetherVale           tracked  / 2026-07-10T22-50-02-04-00
IntoTheMeadow        tracked  / 2026-07-10T22-58-36-04-00
PrehistoricRush      tracked  / 2026-07-10T23-08-11-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
HorrorCorridor       tracked  / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
TheCavalryOfRome     excluded by rule
```

`ZombieOrchard` was the oldest eligible documented fallback and the only product repository changed in this run.

## Product read

`ZombieOrchard` is a dependency-free static browser orchard survival and economy shell. It composes a small kit runtime, 12 scoped interface domains, six gameplay service domains, two render surfaces, a diagnostic host, one Node smoke test, and a Pages deployment workflow.

## Actual interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> construct all interface and gameplay domains
  -> orchard-world seeds 26 apples through global Math.random()
  -> attach one delegated root click listener
  -> begin one uncancelled requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> pressure tick
  -> active-session night spawn decision through global Math.random()
  -> pest pursuit and damage
  -> interface outcome projection
  -> aggregate snapshot
  -> render canvas and replace interface HTML
  -> request next frame

browser commands
  -> interface-composition or active-session command
  -> synchronous state mutation
  -> no command sequence, random-decision row, replay receipt, or committed fingerprint
```

## Main finding

The game has no authoritative random source. Two domains consume global `Math.random()` directly, random IDs are generated from random strings, and neither the seed nor generator state is captured. Equal inputs cannot reproduce the same orchard, pest sequence, score path, or failure time.

Randomness is also coupled to tick cadence. Night spawn admission occurs once per simulation tick, so refresh-rate and catch-up behavior change both the number and order of random draws. A future fixed-step clock will improve cadence consistency, but deterministic replay still requires session-scoped seeded streams and durable random-decision rows.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start/Reset/Title/Outcome Fidelity Fixture Gate
```

After session, clock, and capability ownership are established, implement:

```txt
ZombieOrchard Seeded Random and Replay Authority
+ Apple/Pest Determinism Fixture Gate
```

Do not begin with Market expansion, economy balancing, renderer replacement, new pests, or visual polish.
