# Current audit: ZombieOrchard

**Timestamp:** `2026-07-15T02-38-45-04-00`  
**Status:** `raf-clock-fixed-step-admission-authority-audited`  
**Branch:** `main`

## Summary

`src/start.js` ignores the RAF timestamp and calls `engine.tick(1 / 60)` once per animation callback. `kit-runtime` advances elapsed time and all domains from that submitted delta. Pressure growth, pest spawning, pest movement and damage are therefore coupled to callback frequency.

## Plan ledger

**Goal:** preserve deterministic fixed-step gameplay while admitting steps from measured wall time and rendering one coherent frame per browser callback.

- [x] Complete organization and ledger comparison.
- [x] Apply the oldest synchronized fallback to ZombieOrchard only.
- [x] Read host, runtime, gameplay-rate consumers and smoke coverage.
- [x] Preserve all 27 implemented kits and services.
- [x] Add and route the timestamped clock audit family.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Implement and execute the clock fixture matrix.

## Complete interaction loop

```txt
page load
  -> create runtime and renderers
  -> publish GameHost
  -> start draw loop

each RAF callback
  -> submit fixed 1 / 60
  -> runtime elapsed and frame advance
  -> every ticking domain advances
  -> Canvas2D and HTML render

callback frequency changes
  -> simulated time per wall second changes
  -> no accumulator, catch-up budget or visibility policy settles the difference
```

## Domains in use

```txt
browser RAF, visibility and monotonic time
host clock sampling, fixed-step admission and frame publication
runtime registration, commands, elapsed/frame state, ticks, snapshots and subscriptions
12 interface domains plus interface composition
resource, pressure, orchard, construction, roster and inventory
movement, collection, phases, pests, damage, score, failure and outcome
Canvas2D and HTML presentation
public diagnostics, smoke, build, Pages and central tracking
```

## Implemented inventory

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
```

The complete kit-by-kit service list remains in the current tracker and `.agent/kit-registry.json`.

## Source-backed findings

- `draw()` takes no RAF timestamp and always submits `1 / 60`.
- The runtime clamps submitted deltas but cannot infer omitted wall time.
- Pressure, spawn probability, movement and damage consume `dt` directly.
- Both renderers execute once after every submitted simulation step.
- There is no clock revision, accumulator, catch-up budget, dropped-time result, visibility settlement or renderer timing receipt.
- The smoke test exercises one explicit fixed tick, not real browser cadence.

## Required parent domain

`zombie-orchard-raf-clock-fixed-step-admission-authority-domain`

## Current file family

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

Documentation only. Runtime source and behavior are unchanged.