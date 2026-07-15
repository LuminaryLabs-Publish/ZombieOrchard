# Project breakdown: ZombieOrchard

**Timestamp:** `2026-07-15T08-09-51-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `canvas-backing-store-dpr-resize-authority-audited`

## Summary

ZombieOrchard was selected as the oldest synchronized eligible Publish repository after the full 11-repository organization list was compared with ten central ledger entries and ten root `.agent` states. `TheCavalryOfRome` was excluded. No eligible repository was new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead.

The active Canvas2D renderer reads CSS dimensions and rewrites `canvas.width` and `canvas.height` on every rendered frame. The backing store therefore has no stable generation, uses logical CSS-pixel dimensions instead of a declared device-pixel-ratio policy, and is reinitialized even when the viewport did not change.

## Plan ledger

**Goal:** give the Canvas2D world surface one versioned physical-size descriptor, resize only when that descriptor changes, preserve a stable context generation between resizes, and prove the first matching source, build, and Pages frame.

- [x] Compare all 11 Publish repositories with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledger entries and ten root `.agent` states.
- [x] Confirm zero new, missing, undocumented, root-agent-missing, or runtime-ahead repositories.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` by oldest synchronized timestamp.
- [x] Read the browser host, Canvas2D renderer, stylesheet, HTML renderer, runtime, package scripts, smoke test, and existing audit state.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Preserve all 27 implemented kit surfaces.
- [x] Define a focused canvas backing-store and DPR authority family.
- [x] Add timestamped architecture, render, gameplay, interaction, canvas-system, deploy, and central-sync audits.
- [x] Refresh required root `.agent` files and the kit registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute render-surface fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 0
selected: LuminaryLabs-Publish/ZombieOrchard
selection reason: oldest synchronized eligible repository
prior central timestamp: 2026-07-15T02-38-45-04-00
next oldest: TheUnmappedHouse at 2026-07-15T02-59-31-04-00
```

## Complete interaction loop

```txt
page load
  -> create one kit runtime
  -> create Canvas2D and HTML renderers
  -> publish GameHost
  -> start recursive RAF

host frame
  -> tick every installed domain
  -> snapshot accepted runtime state
  -> world.render(snapshot)
       -> read canvas.clientWidth/clientHeight
       -> assign canvas.width and canvas.height unconditionally
       -> clear and draw trees apples pests and player
  -> ui.render(snapshot)
       -> replace the UI root HTML
  -> request the next RAF callback

viewport or DPR change
  -> no explicit render-surface command or observer
  -> next frame samples CSS dimensions again
  -> backing store remains CSS-pixel-sized
  -> no resize result or matching visible-frame acknowledgement
```

## Domains in use

```txt
browser document lifecycle RAF viewport CSS sizing and device pixel ratio
Canvas2D backing-store allocation context lifecycle clear and world projection
HTML interface projection delegated commands and screen routing
runtime registration commands ticks elapsed/frame state snapshots and subscriptions
12 interface domains and interface composition
resource ledger pressure orchard construction roster and inventory
movement collection phases pests damage score failure and outcome
public GameHost diagnostics smoke build Pages and central tracking
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `kit-runtime` | kit registration, domain construction, command dispatch, delta clamping, frame/elapsed tracking, ticks, events, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | save-select projection, Back |
| `run-setup-domain-kit` | run setup projection, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest spawn/movement, damage, clearing, score, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction projection, Storage Shed action, Back |
| `exchange-domain-kit` | market projection, Back |
| `roster-domain-kit` | roster projection, Back |
| `inventory-domain-kit` | inventory projection, Back |
| `knowledge-domain-kit` | codex projection, Back |
| `preferences-domain-kit` | settings projection, Back |
| `outcome-domain-kit` | outcome projection, Title |
| `interface-composition-kit` | route transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payment, grants, snapshots |
| `pressure-field-kit` | pressure adjustment, time-based pressure growth, snapshots |
| `orchard-world-kit` | tree/apple generation, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages, snapshots |
| `roster-runtime-kit` | hiring payment, actor append, messages, snapshots |
| `inventory-runtime-kit` | item snapshots, equipment mutation |
| `world-canvas-render-kit` | CSS-size sampling, backing-store assignment, clear, tree/apple/pest/player projection |
| `html-interface-render-kit` | delegated actions/commands and HTML projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual tick |
| `smoke-fixture-kit` | entry, first Play, and apple assertions |
| `static-build-copy-kit` | static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned canvas authority surfaces: 18
```

## Source-backed finding

`src/renderer/world-canvas.js` performs this work for every `render(snapshot)` call:

```txt
w = canvas.clientWidth || window.innerWidth
h = canvas.clientHeight || window.innerHeight
canvas.width = w
canvas.height = h
clear and draw the complete world
```

The source contains no equality guard, `ResizeObserver`, DPR policy, physical-size descriptor, context generation, resize result, stale-resize rejection, or first matching Canvas2D frame acknowledgement.

Deterministic observations:

```txt
canvas width assignments per rendered frame: 1
canvas height assignments per rendered frame: 1
backing-store resets per rendered frame permitted by source: 1
CSS-to-backing-store scale: 1 logical pixel to 1 backing-store pixel
explicit devicePixelRatio use: 0
conditional resize checks: 0
ResizeObserver owners: 0
render-surface revisions: 0
canvas resize results: 0
Canvas2D browser fixtures: 0
```

This is a source-backed ownership, sizing, and evidence gap. It is not a claim that blur, allocation churn, dropped frames, context loss, or visual corruption was reproduced.

## Required authority

`zombie-orchard-canvas-backing-store-dpr-resize-authority-domain`

```txt
CanvasRenderSurfaceCommand
  -> bind RenderSurfaceId, viewport revision, CSS size, DPR policy and renderer revision
  -> derive one immutable logical and physical size descriptor
  -> prepare a successor backing store only when the descriptor changes
  -> set the Canvas2D transform for logical world coordinates
  -> preserve one context generation across unchanged frames
  -> reject stale resize work
  -> publish CanvasRenderSurfaceResult and retirement receipts
  -> render the accepted snapshot once
  -> publish FirstCanvasResizeFrameAck
```

## Planned authority surfaces

```txt
render-surface-id-kit
viewport-css-size-sample-kit
device-pixel-ratio-policy-kit
backing-store-size-descriptor-kit
resize-change-detection-kit
resize-observer-adapter-kit
dpr-change-observer-kit
canvas-context-generation-kit
context-transform-scale-kit
world-projection-transform-kit
canvas-clear-policy-kit
render-surface-admission-kit
render-surface-resize-result-kit
renderer-revision-kit
first-canvas-resize-frame-ack-kit
context-retirement-kit
canvas-browser-fixture-kit
pages-canvas-parity-kit
```

## Output family

```txt
.agent/trackers/2026-07-15T08-09-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T08-09-51-04-00.md
.agent/architecture-audit/2026-07-15T08-09-51-04-00-canvas-backing-store-dpr-dsk-map.md
.agent/render-audit/2026-07-15T08-09-51-04-00-per-frame-backing-store-reset-gap.md
.agent/gameplay-audit/2026-07-15T08-09-51-04-00-simulation-to-canvas-frame-loop.md
.agent/interaction-audit/2026-07-15T08-09-51-04-00-canvas-render-surface-command-result-map.md
.agent/canvas-system-audit/2026-07-15T08-09-51-04-00-backing-store-resize-contract.md
.agent/deploy-audit/2026-07-15T08-09-51-04-00-canvas-dpr-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T08-09-51-04-00-oldest-selection-canvas-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source, Canvas2D behavior, gameplay, public APIs, packages, tests, workflows, build, and deployment are unchanged. No DPR correctness, allocation reduction, resize safety, visual equivalence, frame-time improvement, source/build/Pages parity, or production-readiness claim is made.
