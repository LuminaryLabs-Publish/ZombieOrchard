# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Updated:** `2026-07-12T06-11-18-04-00`

## Summary

`ZombieOrchard` is a dependency-free orchard survival/economy shell built from a mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates canvas render-surface authority. The world canvas is styled to fill the viewport, but every frame rewrites `canvas.width` and `canvas.height` from CSS dimensions, ignores device pixel ratio, applies no physical-pixel budget, and projects the fixed `720 x 560` world without fit or camera policy. Small viewports can hide valid gameplay positions, while high-DPI displays receive a low-resolution buffer.

## Plan ledger

**Goal:** make CSS viewport state, physical canvas resolution, world projection and the visible frame one bounded and revisioned transaction.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible synchronized repository.
- [x] Trace page/CSS ownership, browser boot, per-frame canvas sizing, world projection, HTML projection and smoke proof.
- [x] Identify the interaction loop, all domains, all 27 implemented kits and offered services.
- [x] Confirm drawing-buffer dimensions are assigned every rendered frame.
- [x] Confirm DPR, pixel-budget, resize-generation and surface-revision authority are absent.
- [x] Confirm fixed world coordinates can exceed a small viewport.
- [x] Define canvas surface, allocation, projection, commit and visible-frame contracts.
- [x] Refresh required root `.agent` documents and kit registry.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Implement and execute render-surface fixtures.

## Current interaction loop

```txt
module boot
  -> create mutable engine graph
  -> create #world canvas renderer and HTML renderer
  -> expose raw engine through window.GameHost
  -> start draw()

browser frame
  -> engine.tick(1 / 60)
  -> read canvas CSS width/height
  -> fall back to window dimensions when zero
  -> assign canvas.width and canvas.height
  -> draw raw orchard coordinates around canvas center
  -> replace HTML UI
  -> schedule next RAF

viewport/DPR change
  -> no explicit observation command or generation
  -> next frame samples ambient CSS dimensions
  -> DPR is ignored
  -> drawing buffer resets without a typed result
```

## Main findings

```txt
canvas drawing buffer resets every rendered frame
unchanged frames have no resize short-circuit
CSS pixels are treated as physical pixels
window.devicePixelRatio is not observed
no maximum pixel count or fallback tier exists
no explicit resize generation or stale-result rejection exists
world coordinates are centered but not fitted to the viewport
valid player and pest positions can be outside small canvases
surface dimensions and projection are absent from GameHost snapshots
Node smoke does not instantiate, resize or inspect a canvas
```

## Current ledge

```txt
ZombieOrchard Canvas Render Surface Authority
+ Bounded DPR and Pixel Budget
+ Resize Generation and Commit Result
+ World Fit / Membership Policy
+ Unchanged-Frame No-Resize Proof
+ Browser and Pages Viewport Matrix
```

## Domains and services

```txt
browser page shell, CSS viewport and recursive RAF
runtime registration, commands, ticks, snapshots, subscriptions and publication
12 interface-screen domains and interface composition
resources, pressure, orchard, construction, roster, inventory and active gameplay
canvas CSS rectangle and viewport observation
2D drawing-buffer allocation and context-state lifecycle
DPR, capability and physical-pixel policy
world projection, fit and viewport membership
resize generation, coalescing, commit, rollback and observation
canvas world rendering and HTML UI projection
surface/state/frame diagnostics
Node smoke, static build, Pages deployment and central tracking
```

Implemented services remain provided by 27 kits covering runtime composition, interface routing, orchard/economy/survival state, canvas/HTML rendering, diagnostics, smoke proof, static build and Pages deployment.

## Read this pass first

```txt
.agent/trackers/2026-07-12T06-11-18-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T06-11-18-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T06-11-18-04-00-canvas-render-surface-authority-dsk-map.md
.agent/render-audit/2026-07-12T06-11-18-04-00-css-dpr-drawing-buffer-parity-gap.md
.agent/gameplay-audit/2026-07-12T06-11-18-04-00-fixed-world-small-viewport-visibility-loop.md
.agent/interaction-audit/2026-07-12T06-11-18-04-00-viewport-observation-surface-result-map.md
.agent/render-surface-audit/2026-07-12T06-11-18-04-00-pixel-budget-projection-revision-contract.md
.agent/deploy-audit/2026-07-12T06-11-18-04-00-canvas-surface-fixture-gate.md
```

## Retained prerequisite audits

```txt
seeded random and replay:          2026-07-11T17-01-11-04-00
runtime session instance:          2026-07-11T18-28-40-04-00
versioned persistence:             2026-07-11T20-03-22-04-00
route-scoped simulation:           2026-07-11T21-40-49-04-00
public capability gateway:         2026-07-11T23-41-55-04-00
composite command transaction:     2026-07-11T23-48-14-04-00
player-control reachability:       2026-07-12T01-30-07-04-00
fixed-step clock authority:        2026-07-12T03-11-51-04-00
frame publication fault handling:  2026-07-12T04-38-12-04-00
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not multiply by DPR without a bounded pixel budget.
Do not mutate canvas dimensions on every unchanged frame.
Do not let world projection depend on unrecorded ambient viewport state.
Do not claim a visible surface from allocation or RAF scheduling alone.
Do not claim viewport-safe gameplay until the browser matrix passes.
```
