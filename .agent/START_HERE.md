# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Aligned:** `2026-07-13T07-41-11-04-00`  
**Status:** `canvas-html-frame-coherence-authority-central-reconciled`  
**Retained statuses:** `runtime-event-lifecycle-publication-authority-audited`, `runtime-observer-publication-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current reconciliation preserves the dual-surface presentation finding. `engine.tick()` publishes one snapshot and then returns a separately captured snapshot. The browser applies the returned snapshot to the canvas first and the HTML subtree second. No shared immutable frame envelope, surface receipts, terminal dual-surface result, partial-frame recovery, visible readback, or first coherent frame acknowledgement proves all consumers adopted the same state.

## Plan ledger

**Goal:** keep the complete repository breakdown and central ledger aligned around one evidence chain from committed runtime state to both visible surfaces.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Preserve the full interaction loop, domain inventory, 27-kit census, and offered services.
- [x] Add the timestamped frame-coherence reconciliation family.
- [x] Refresh required root `.agent` documents.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and prove frame-envelope, surface-result, recovery, and visible-frame authority.

## Read this run first

```txt
.agent/trackers/2026-07-13T07-41-11-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T07-41-11-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T07-41-11-04-00-frame-coherence-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T07-41-11-04-00-dual-surface-visible-frame-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T07-41-11-04-00-runtime-dual-surface-central-reconciliation.md
.agent/interaction-audit/2026-07-13T07-41-11-04-00-frame-envelope-projection-central-reconciliation-map.md
.agent/frame-coherence-audit/2026-07-13T07-41-11-04-00-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T07-41-11-04-00-central-fixture-reconciliation-gate.md
.agent/central-sync-audit/2026-07-13T07-41-11-04-00-repo-ledger-frame-coherence-reconciliation.md
```

## Complete interaction loop

```txt
browser command
  -> engine.command(...)
  -> domain mutation
  -> publication snapshot P
  -> synchronous subscribers

RAF frame
  -> engine.tick(1 / 60)
  -> domain ticks
  -> publication snapshot T1
  -> separately captured return snapshot T2
  -> canvas projection from T2
  -> HTML projection from T2
  -> successor RAF

public diagnostics
  -> GameHost.getState() captures fresh D
  -> no result binds P, T1, T2, D, canvas, HTML, or the visible browser frame
```

## Required authority

```txt
zombie-orchard-canvas-html-frame-coherence-authority-domain
```

## Required transaction

```txt
runtime commit
  -> one immutable fingerprinted FrameEnvelope
  -> exact envelope publication
  -> canvas and HTML preparation against that envelope
  -> one FrameCommitId
  -> complete, partial, failed, stale, or superseded result
  -> last-complete-frame preservation or recovery
  -> visible diagnostics readback
  -> FirstDualSurfaceFrameAck
```

## Validation boundary

Documentation only. Runtime source, gameplay, rendering, dependencies, package scripts, and deployment were not changed. No atomicity, recovery, visible parity, or production-readiness claim is made until focused fixtures pass on `main`.