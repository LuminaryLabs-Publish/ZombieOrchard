# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-15T08-09-51-04-00`  
**Status:** `canvas-backing-store-dpr-resize-authority-audited`  
**Retained statuses:** `raf-clock-fixed-step-admission-authority-central-reconciled`, `public-runtime-capability-frame-admission-authority-central-reconciled`, `run-start-clean-reset-authority-central-reconciled`, `roster-hiring-gameplay-adoption-authority-central-reconciled`, `inventory-equipment-gameplay-adoption-authority-central-reconciled`, `construction-settlement-world-adoption-authority-central-reconciled`, `html-content-command-surface-authority-central-reconciled`, `browser-startup-readiness-failure-authority-central-reconciled`, `canvas-html-frame-coherence-authority-central-reconciled`, `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

The Canvas2D world renderer rewrites both backing-store dimensions on every frame and sizes them from logical CSS pixels without a declared DPR policy. The current audit defines one render-surface authority for change-driven physical sizing, context-generation ownership, stale-work rejection, retirement, and visible-frame proof.

## Plan ledger

**Goal:** stabilize the world canvas across unchanged frames while making viewport and DPR changes explicit, versioned, atomic, and testable.

- [x] Compare all Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority new, missing, undocumented, root-agent-missing, or runtime-ahead repository.
- [x] Select ZombieOrchard only by the oldest synchronized rule.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Preserve all 27 implemented surfaces.
- [x] Add the timestamped canvas audit family.
- [x] Refresh required root `.agent` documents and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and prove the render-surface contract.

## Read this run first

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

## Complete interaction loop

```txt
RAF callback
  -> tick runtime and obtain snapshot
  -> world.render(snapshot)
       -> sample CSS size
       -> rewrite width and height
       -> redraw world
  -> ui.render(snapshot)
  -> schedule next callback
```

## Required authority

`zombie-orchard-canvas-backing-store-dpr-resize-authority-domain`

```txt
CanvasRenderSurfaceCommand
  -> bind viewport DPR policy renderer and prior context revisions
  -> derive logical and physical size
  -> resize only when the descriptor changes
  -> preserve or replace ContextGeneration atomically
  -> publish CanvasRenderSurfaceResult
  -> render accepted state
  -> publish FirstCanvasResizeFrameAck
```

## Validation boundary

Documentation only. Runtime, Canvas2D output, gameplay, packages, tests, workflows, build, and deployment are unchanged. No DPR correctness, resize safety, backing-store reuse, visual improvement, performance improvement, artifact parity, deployed parity, or production-readiness claim is made.
