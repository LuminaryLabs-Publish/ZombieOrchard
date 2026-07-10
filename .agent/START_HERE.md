# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-10T17-18-47-04-00
```

## Current best next cut

```txt
ZombieOrchard Deterministic Scenario Authority
+ Command/Frame Observation Fixture Gate
```

## Read this first

```txt
.agent/trackers/2026-07-10T17-18-47-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T17-18-47-04-00-deterministic-scenario-observation-dsk-map.md
.agent/render-audit/2026-07-10T17-18-47-04-00-frame-observation-consumption-gap.md
.agent/gameplay-audit/2026-07-10T17-18-47-04-00-seed-command-tick-replay-loop.md
.agent/interaction-audit/2026-07-10T17-18-47-04-00-command-result-observation-chain.md
.agent/determinism-audit/2026-07-10T17-18-47-04-00-math-random-state-fingerprint-contract.md
.agent/host-proof-audit/2026-07-10T17-18-47-04-00-bounded-scenario-observation-readback.md
.agent/deploy-audit/2026-07-10T17-18-47-04-00-deterministic-scenario-fixture-build-gate.md
.agent/turn-ledger/2026-07-10T17-18-47-04-00.md
.agent/kit-registry.json
```

## Selection result

The full accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

Recent repo-local audits made `HorrorCorridor` and `PhantomCommand` newer than their central ledger rows. `ZombieOrchard`, previously aligned at `2026-07-10T15-48-18-04-00`, was the oldest eligible documented fallback. Only this repository was changed.

## Product read

`ZombieOrchard` is a static browser orchard survival/economy shell composed from scoped interface, runtime gameplay, rendering, diagnostics, fixture, and deploy kits.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> createKitRuntime(...kits)
  -> fixed requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> domain ticks
  -> aggregate snapshot
  -> world canvas + HTML interface render

[data-action]
  -> interface-composition.activate
  -> scoped interface action
  -> optional child command
  -> child result discarded
  -> optional transition

[data-command]
  -> direct active-session command
  -> synchronous gameplay mutation
```

## Current main finding

The runtime cannot reproduce or explain one scenario from inputs to visible frame.

`orchard-world-kit` and `active-session-domain-kit` use global `Math.random()` for apple and pest state. Runtime commands and events are not retained as durable frame observations, nested child results are dropped, renderers record no consumed frame, and GameHost exposes raw mutable authority instead of bounded JSON-safe scenario readback.

The correct next step is deterministic scenario authority: seed ownership, named random streams, command sequencing, committed-frame snapshots, render-consumption rows, replay fingerprints, and a DOM-free fixture. Market transaction causality remains a downstream scenario on that proof surface.

## Next safe ledge

```txt
ZombieOrchard Deterministic Scenario Authority
+ Command/Frame Observation Fixture Gate
```

Complete that proof boundary before Market expansion, economy tuning, world-content growth, renderer replacement, new pest types, or unrelated runtime refactors.