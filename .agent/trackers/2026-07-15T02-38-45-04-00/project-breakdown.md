# Project breakdown: ZombieOrchard RAF clock admission

**Timestamp:** `2026-07-15T02-38-45-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `raf-clock-fixed-step-admission-authority-audited`

## Summary

ZombieOrchard advances one fixed `1/60` simulation step for every browser animation callback. The host ignores the RAF timestamp, so simulation speed follows callback frequency rather than elapsed wall time. Pressure, pest spawning, pest movement, damage and runtime elapsed time can therefore run faster on high-refresh displays, slower on low-refresh or overloaded displays, and resume after tab throttling without an explicit catch-up or suspension policy.

## Plan ledger

**Goal:** bind browser time, bounded fixed simulation steps and one visible frame into a deterministic host-frame transaction.

- [x] Compare all 11 Publish repositories with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible repositories have central ledger and root `.agent` coverage.
- [x] Confirm no new, missing, root-agent-missing or runtime-ahead repository outranks fallback selection.
- [x] Select only ZombieOrchard as the oldest synchronized eligible repository.
- [x] Identify the full interaction loop, domains, kits and offered services.
- [x] Preserve all 27 implemented kit surfaces.
- [x] Audit RAF timing, runtime stepping, gameplay-rate consumers, rendering and smoke coverage.
- [x] Add timestamped architecture, render, gameplay, interaction, clock, deploy and central-sync audits.
- [x] Update required root `.agent` files and registry.
- [ ] Implement the host clock authority and executable timing fixtures.

## Selection result

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected repository: ZombieOrchard
reason: oldest synchronized central documentation timestamp
```

## Complete interaction loop

```txt
page load
  -> create one runtime and domain graph
  -> create Canvas2D and HTML renderers
  -> publish GameHost
  -> call draw()

each browser animation callback
  -> ignore callback timestamp
  -> engine.tick(1 / 60)
  -> runtime elapsed += 1 / 60
  -> pressure tick uses 1 / 60
  -> active-session pest spawn, movement and damage use 1 / 60
  -> snapshot every domain
  -> render Canvas2D once
  -> render HTML once
  -> request next animation callback

actual callback rate differs
  -> 120 callbacks/second advances about 2 simulated seconds/second
  -> 30 callbacks/second advances about 0.5 simulated seconds/second
  -> hidden or throttled tabs advance according to delivered callbacks
  -> no explicit accumulation, catch-up, dropped-time or visibility result exists
```

## Domains in use

```txt
browser RAF scheduling, visibility and monotonic time
host clock sampling, fixed-step accumulation, catch-up admission and frame publication
runtime registration, commands, ticks, elapsed time, snapshots and subscriptions
12 interface domains and interface composition
resources, pressure, orchard, construction, roster and inventory
movement, collection, phases, pest spawning, movement, damage, clearing, score and outcome
Canvas2D world presentation and HTML interface presentation
public GameHost diagnostics
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | kit registration, domain construction, commands, clamped delta stepping, elapsed/frame tracking, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, fields, selection, action descriptors, activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | save-select projection, Back |
| `run-setup-domain-kit` | setup projection, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest spawning/movement/damage, clearing, score, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction projection, Storage Shed action, Back |
| `exchange-domain-kit` | market projection, Back |
| `roster-domain-kit` | roster projection, Back |
| `inventory-domain-kit` | inventory projection, Back |
| `knowledge-domain-kit` | codex projection, Back |
| `preferences-domain-kit` | settings projection, Back |
| `outcome-domain-kit` | outcome projection, Title |
| `interface-composition-kit` | route transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants, snapshots |
| `pressure-field-kit` | pressure adjustment and time-based pressure growth |
| `orchard-world-kit` | tree/apple generation, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages, snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages, snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and world projection |
| `html-interface-render-kit` | delegated actions/commands and HTML projection |
| `game-host-diagnostics-kit` | raw engine, state readback and manual tick publication |
| `smoke-fixture-kit` | entry, first Play and apple assertions |
| `static-build-copy-kit` | static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned host-clock subkits: 18
planned authority family including parent: 19
```

## Source-backed findings

- `src/start.js` defines `draw()` without a timestamp parameter and always calls `engine.tick(1 / 60)`.
- `requestAnimationFrame(draw)` schedules one simulation step per delivered animation callback.
- `src/kits/runtime.js` advances `ctx.elapsed` and `ctx.frame` from the submitted delta.
- Runtime delta clamping protects against large submitted values but cannot correct a constant fixed delta submitted at variable callback rates.
- `pressure-field-kit` grows pressure from `dt`.
- `active-session-domain-kit` uses `dt` for pest spawn probability, movement and player damage.
- Canvas2D and HTML rendering occur once after each submitted simulation step.
- There is no monotonic timestamp sample, accumulator, bounded catch-up count, dropped-time metric, visibility transition policy, clock revision or matching timing receipt.
- The smoke test submits one explicit `1 / 60` tick and does not exercise real RAF cadence.

## Required authority

```txt
zombie-orchard-raf-clock-fixed-step-admission-authority-domain
```

```txt
HostFrameCommand
  -> bind HostFrameId, ClockRevision and RAF timestamp
  -> derive and clamp wall delta
  -> accumulate elapsed wall time
  -> admit zero or a bounded number of fixed simulation steps
  -> publish one result for every accepted SimulationStepId
  -> report dropped or deferred time
  -> render Canvas2D and HTML once from the latest accepted snapshot
  -> publish HostFrameResult
  -> acknowledge FirstClockBoundVisibleFrameAck

VisibilityTransitionCommand
  -> bind hidden, visible and resume transitions
  -> settle accumulator and stale timestamp policy
  -> choose suspend, bounded catch-up or explicit time discard
  -> publish VisibilityClockResult
```

## Required output

```txt
.agent/trackers/2026-07-15T02-38-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T02-38-45-04-00.md
.agent/architecture-audit/2026-07-15T02-38-45-04-00-raf-clock-fixed-step-dsk-map.md
.agent/render-audit/2026-07-15T02-38-45-04-00-render-rate-simulation-rate-coupling-gap.md
.agent/gameplay-audit/2026-07-15T02-38-45-04-00-refresh-rate-gameplay-speed-loop.md
.agent/interaction-audit/2026-07-15T02-38-45-04-00-host-frame-command-result-map.md
.agent/clock-audit/2026-07-15T02-38-45-04-00-raf-accumulator-visibility-contract.md
.agent/deploy-audit/2026-07-15T02-38-45-04-00-refresh-rate-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T02-38-45-04-00-oldest-selection-clock-reconciliation.md
```

## Validation boundary

Documentation only. Runtime timing, gameplay rate, render scheduling, public API, dependencies, scripts, tests, workflows and deployment are unchanged. No refresh-rate independence, fixed-step correctness, hidden-tab policy, catch-up correctness, visible-frame convergence, artifact parity or production-readiness claim is made.