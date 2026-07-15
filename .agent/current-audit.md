# Current audit: ZombieOrchard

**Timestamp:** `2026-07-14T21-41-41-04-00`  
**Status:** `public-runtime-capability-frame-admission-authority-central-reconciled`  
**Branch:** `main`

## Summary

ZombieOrchard exposes its complete mutable runtime through `window.GameHost`. Public callers can manually tick all domains, dispatch arbitrary commands, add kits, access mutable context and domains, invoke direct domain APIs and create unscoped subscriptions. Manual ticks do not render; the next RAF advances again before Canvas2D and HTML present state.

## Plan ledger

**Goal:** preserve the complete repository breakdown while defining public runtime access as one least-authority, revisioned and visibly acknowledged transaction family.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority repository outranks the fallback rule.
- [x] Select only ZombieOrchard as the oldest synchronized entry.
- [x] Read boot, runtime, domain and renderer surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped capability audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run public capability fixtures.

## Complete interaction loop

```txt
boot
  -> create engine and renderers
  -> publish raw GameHost
  -> start RAF

RAF
  -> tick all domains
  -> render Canvas2D and HTML

public manual tick
  -> tick all domains
  -> notify subscribers
  -> do not render

next RAF
  -> tick all domains again
  -> render later state
```

## Domains in use

```txt
browser DOM, delegated input, Canvas2D, RAF and public global publication
host readback, raw runtime mutation, manual tick, subscription and provider installation
runtime registration, commands, unconditional ticks, events, snapshots and notification
12 interface domains and interface composition
resource, pressure, orchard, construction, roster and inventory
movement, collection, phases, pests, clearing, score, damage, failure and outcome
public capability identity, caller admission, command policy, external-tick lease, typed results and retirement
HTML and Canvas2D presentation
validation, static build, Pages deployment and central tracking
```

## Implemented kits and services

```txt
27 total surfaces: 19 engine-installed and 8 host/tooling/support
runtime and scoped interface composition
12 route/interface domains
resource, pressure, orchard, construction, roster and inventory services
active-session movement, collection, phases, pests, clearing, score, damage and failure
Canvas2D and HTML projection
raw GameHost diagnostics, smoke, build and Pages deployment
```

## Source-backed findings

- `src/start.js` publishes raw `engine`, `getState` and `tick` before `draw()`.
- `GameHost.tick()` advances runtime only; neither renderer runs.
- The next RAF performs another fixed tick before rendering.
- `engine.snapshot()` omits runtime frame, elapsed time, caller, host generation and run generation.
- Raw callers can invoke arbitrary commands, `addKit`, mutable context, domains and direct APIs.
- Direct domain APIs bypass engine command publication.
- Public capabilities have no policy revision, lease, expiry or retirement.
- Existing smoke proof does not exercise the public host boundary.

## Required parent domain

```txt
zombie-orchard-public-runtime-capability-frame-admission-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-14T21-41-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T21-41-41-04-00.md
.agent/architecture-audit/2026-07-14T21-41-41-04-00-public-runtime-capability-frame-admission-dsk-map.md
.agent/render-audit/2026-07-14T21-41-41-04-00-manual-tick-visible-frame-divergence-gap.md
.agent/gameplay-audit/2026-07-14T21-41-41-04-00-external-tick-double-step-loop.md
.agent/interaction-audit/2026-07-14T21-41-41-04-00-public-capability-command-result-map.md
.agent/host-capability-audit/2026-07-14T21-41-41-04-00-gamehost-read-write-tick-contract.md
.agent/deploy-audit/2026-07-14T21-41-41-04-00-public-capability-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T21-41-41-04-00-oldest-selection-public-capability-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, public API, gameplay, renderer, dependency, package-script, test, workflow, build or deployment behavior changed.