# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-11T03-48-31-04-00
```

## Summary

`ZombieOrchard` remains the oldest eligible documented Publish repository. This pass found that its visible Save Select surface is only a renderer shell: the project has no save envelope, slot owner, persistence adapter, restore service, load transaction, migration policy, or roundtrip proof.

## Plan ledger

**Goal:** Document the dormant save/select surface and define the persistence boundary required after session, clock, capability, command, and replay authority are established.

- [x] Compare all 10 accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` under the oldest documented-selection rule.
- [x] Re-read runtime, interface, gameplay, render, preset, smoke, build, and deploy files.
- [x] Reconfirm the interaction loop, domains, implemented kits, and kit services.
- [x] Trace the Session Select route, slot projection, snapshot graph, and absent save/load paths.
- [x] Add timestamped persistence, architecture, render, gameplay, interaction, and deploy audits.
- [x] Change no runtime source.
- [x] Create no branch or pull request.
- [ ] Persistence implementation and fixtures remain future work.

## Current implementation queue

```txt
1. Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. Composite Command Transaction Authority
   + Parent/Child Result and Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate

6. Versioned Save/Load Authority
   + Slot Roundtrip and Atomic Load Fixture Gate
```

Persistence is sixth because a trustworthy save must capture one committed session state with stable ticks, truthful command results, deterministic random cursors, and a reproducible state fingerprint.

## Read this first

```txt
.agent/trackers/2026-07-11T03-48-31-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T03-48-31-04-00-versioned-save-load-authority-dsk-map.md
.agent/render-audit/2026-07-11T03-48-31-04-00-session-select-slot-projection-gap.md
.agent/gameplay-audit/2026-07-11T03-48-31-04-00-committed-state-save-load-loop.md
.agent/interaction-audit/2026-07-11T03-48-31-04-00-save-select-load-command-map.md
.agent/persistence-audit/2026-07-11T03-48-31-04-00-save-envelope-migration-contract.md
.agent/deploy-audit/2026-07-11T03-48-31-04-00-save-roundtrip-atomic-load-fixture-gate.md
.agent/turn-ledger/2026-07-11T03-48-31-04-00.md
.agent/kit-registry.json
```

## Selection result

```txt
ZombieOrchard        selected / 2026-07-11T01-31-15-04-00
TheUnmappedHouse     tracked  / 2026-07-11T01-38-28-04-00
MyCozyIsland         tracked  / 2026-07-11T02-02-59-04-00
AetherVale           tracked  / 2026-07-11T02-10-13-04-00
IntoTheMeadow        tracked  / 2026-07-11T02-28-12-04-00
PrehistoricRush      tracked  / 2026-07-11T02-48-17-04-00
TheOpenAbove         tracked  / 2026-07-11T03-01-38-04-00
HorrorCorridor       tracked  / 2026-07-11T03-18-44-04-00
PhantomCommand       tracked  / 2026-07-11T03-31-26-04-00
TheCavalryOfRome     excluded by rule
```

All nine eligible repositories were tracked and had root `.agent` state. `ZombieOrchard` had the oldest central timestamp and was the only product repository changed.

## Product read

`ZombieOrchard` is a dependency-free static browser orchard survival and economy shell. It composes a small kit runtime, 12 interface domains, gameplay services, canvas and HTML renderers, a diagnostic host, a Node smoke, static build copy, and Pages deployment.

## Actual interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> construct all mutable domains once
  -> attach delegated click listener
  -> begin uncancelled requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> tick every domain
  -> aggregate snapshots
  -> render world canvas and replace interface HTML

browser action
  -> interface-composition.activate
  -> active screen resolves action
  -> optional child command and route change
  -> aggregate snapshot publication

dormant persistence surface
  -> session-select domain exists
  -> renderer can display current.meta.slots
  -> no incoming route, slot owner, save command, load command, delete command,
     persistence adapter, restore transaction, or migration policy exists
```

## Main finding

The project exposes a Save Select screen in its domain catalog and renderer, but no persistence system exists behind it. `engine.snapshot()` is a presentation aggregate, not a restorable save: domain closures expose no import/reset methods, random generator state is absent, session and tick identity are absent, command results are not journaled, and load cannot be committed atomically.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start/Reset/Title/Outcome Fidelity Fixture Gate
```

The new persistence boundary is intentionally sixth in the queue. Do not wire localStorage directly to the current aggregate snapshot or claim save/resume support before the five prerequisite authority gates exist.
