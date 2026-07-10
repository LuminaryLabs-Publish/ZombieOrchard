# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-10T18-49-54-04-00
```

## Current best next cut

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```

## Read this first

```txt
.agent/trackers/2026-07-10T18-49-54-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T18-49-54-04-00-runtime-session-clock-authority-dsk-map.md
.agent/render-audit/2026-07-10T18-49-54-04-00-raf-refresh-rate-frame-consumption-gap.md
.agent/gameplay-audit/2026-07-10T18-49-54-04-00-pause-reset-outcome-reentry-loop.md
.agent/interaction-audit/2026-07-10T18-49-54-04-00-screen-transition-session-command-map.md
.agent/lifecycle-audit/2026-07-10T18-49-54-04-00-session-start-stop-reset-dispose-contract.md
.agent/time-authority-audit/2026-07-10T18-49-54-04-00-fixed-delta-per-raf-clock-contract.md
.agent/deploy-audit/2026-07-10T18-49-54-04-00-refresh-rate-pause-reset-fixture-gate.md
.agent/turn-ledger/2026-07-10T18-49-54-04-00.md
.agent/kit-registry.json
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`ZombieOrchard`, previously aligned at `2026-07-10T17-18-47-04-00`, was the oldest eligible documented fallback after newer repo-local passes advanced the other eight eligible repositories. Only this product repository was changed.

## Product read

`ZombieOrchard` is a dependency-free static browser orchard survival and economy shell composed from a kit runtime, scoped interface domains, gameplay domains, two render surfaces, a diagnostic host, a Node smoke fixture, and a Pages deployment gate.

## Actual interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> create every gameplay and interface domain immediately
  -> install one permanent root click listener
  -> start an uncancelled requestAnimationFrame loop
  -> engine.tick(1 / 60) once per displayed frame
  -> tick every domain regardless of active screen
  -> snapshot every domain
  -> redraw the canvas and replace the full HTML interface

[data-action]
  -> interface-composition.activate
  -> active screen returns an action descriptor
  -> optional child command runs and its result is discarded
  -> optional screen transition

[data-command]
  -> direct active-session command
  -> synchronous gameplay mutation
  -> next automatic frame projects the result
```

## Current main finding

The browser host has no authoritative session or clock boundary.

A gameplay session exists and ticks before the user selects Play. The Pause, Build, Market, Roster, Inventory, Codex, Settings, Entry, and Outcome screens do not suspend gameplay domains. The host advances a fixed `1/60` simulation step once per `requestAnimationFrame`, so simulation speed follows display refresh rate rather than elapsed wall time. `GameHost.tick()` can add unscheduled extra ticks while the automatic loop is still running.

New Game and Play only change screens; they do not create or reset a session. After failure, Outcome -> Title is immediately reversed by `interface-composition.tick()` because the same ended session remains authoritative. The animation frame and click listener cannot be stopped or disposed.

The next implementation must establish one session owner, one clock owner, explicit run states, pause semantics, reset/start/stop/dispose commands, and deterministic fixtures across 30/60/120 Hz schedules. Deterministic scenario authority remains a companion requirement beneath this lifecycle boundary.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Clock and Lifecycle Authority
+ Pause/Reset/Refresh-Rate Fixture Gate
```

Complete this boundary before Market expansion, economy tuning, new orchard content, renderer replacement, or visual polish.