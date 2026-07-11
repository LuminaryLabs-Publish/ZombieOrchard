# START HERE — ZombieOrchard

## Last aligned

```txt
2026-07-11T01-31-15-04-00
```

## Plan ledger

**Goal:** Establish an atomic command boundary so every browser intent returns one truthful composite result, publishes state once, and can be correlated with the next rendered snapshot.

- [x] Compare the complete Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible documented fallback.
- [x] Re-read the current runtime, interface, gameplay, renderer, preset, smoke, build, and deploy surfaces.
- [x] Reconfirm the interaction loop, domains, kits, and services.
- [x] Trace parent action activation, nested child dispatch, route changes, resource effects, notifications, snapshots, and rendering.
- [x] Add a timestamped command-transaction audit set.
- [x] Change no runtime source and create no branch or pull request.

## Current implementation queue

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. ZombieOrchard Composite Command Transaction Authority
   + Parent/Child Result and Single-Publication Fixture Gate

5. ZombieOrchard Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate
```

Command transaction authority precedes replay because replay needs stable command IDs, complete results, and one committed publication per intent.

## Read this first

```txt
.agent/trackers/2026-07-11T01-31-15-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T01-31-15-04-00-command-transaction-authority-dsk-map.md
.agent/render-audit/2026-07-11T01-31-15-04-00-command-commit-render-correlation-gap.md
.agent/gameplay-audit/2026-07-11T01-31-15-04-00-build-hire-equip-transaction-loop.md
.agent/interaction-audit/2026-07-11T01-31-15-04-00-parent-child-command-result-map.md
.agent/command-transaction-audit/2026-07-11T01-31-15-04-00-nested-command-atomicity-contract.md
.agent/deploy-audit/2026-07-11T01-31-15-04-00-command-transaction-fixture-gate.md
.agent/turn-ledger/2026-07-11T01-31-15-04-00.md
.agent/kit-registry.json
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `ZombieOrchard` had the oldest current ledger timestamp and was the only product repository changed.

```txt
ZombieOrchard        selected / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
IntoTheMeadow        tracked  / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
HorrorCorridor       tracked  / 2026-07-11T01-10-28-04-00
PhantomCommand       tracked  / 2026-07-11T01-20-51-04-00
TheCavalryOfRome     excluded by rule
```

## Product read

`ZombieOrchard` is a dependency-free static browser orchard survival and economy shell. It composes a small kit runtime, 12 interface domains, gameplay services, canvas and HTML renderers, a diagnostic host, a Node smoke test, static build copy, and Pages deployment.

## Actual interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> construct all domains
  -> attach delegated click listener
  -> start uncancelled RAF
  -> engine.tick(1 / 60)
  -> tick all domains
  -> aggregate snapshot
  -> render canvas and HTML

browser data-action
  -> parent interface-composition command
  -> active screen resolves action
  -> optional nested child engine.command
  -> child mutates and notifies immediately
  -> child result is discarded
  -> optional route mutation
  -> parent notifies again
  -> browser receives only parent result
```

## Main finding

The runtime has no atomic parent/child command transaction. A nested child command can publish an intermediate snapshot before the parent resolves its route, while the child result is discarded. A failed construction can therefore return parent `{ accepted: true }`, and the system has no transaction ID, commit barrier, rollback result, command journal, or render correlation.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start/Reset/Title/Outcome Fidelity Fixture Gate
```

After session, clock, and capability ownership are established, implement the composite command transaction gate before deterministic replay.

Do not begin with Market expansion, economy balancing, new pests, renderer replacement, or visual polish.
