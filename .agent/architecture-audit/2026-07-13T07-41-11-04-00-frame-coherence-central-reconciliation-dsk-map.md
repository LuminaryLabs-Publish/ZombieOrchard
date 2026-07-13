# Architecture audit: frame-coherence central reconciliation DSK map

**Timestamp:** `2026-07-13T07-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

Runtime state, interface routing, canvas projection, and HTML projection remain valid bounded owners. The missing layer is a composed authority that binds one immutable committed runtime envelope to both visible surfaces and diagnostics.

## Plan ledger

**Goal:** preserve domain ownership while defining the minimum coordination contract needed for coherent presentation.

- [x] Keep simulation and gameplay state in runtime/game domains.
- [x] Keep route ownership in interface composition.
- [x] Keep rasterization in the canvas renderer.
- [x] Keep DOM semantics in the HTML renderer.
- [x] Keep diagnostics readback separate from mutable engine control.
- [x] Define one parent authority for identities, preparation, commit, recovery, and acknowledgement.
- [ ] Implement the authority or its fixtures.

## Current bounded owners

```txt
kit-runtime
  owns domain mutation, ticks, snapshots, subscriptions, and publication

interface-composition-kit
  owns active route and nested command routing

world-canvas-render-kit
  owns canvas sizing and world rasterization

html-interface-render-kit
  owns DOM projection and delegated controls

game-host-diagnostics-kit
  exposes raw engine, fresh snapshots, and manual tick
```

## Required parent domain

```txt
zombie-orchard-canvas-html-frame-coherence-authority-domain
```

The parent coordinates frame evidence only. It must not absorb orchard simulation, economy, route content, canvas drawing rules, or HTML component meaning.

## Required identities

```txt
RuntimeSessionId
RunGeneration
StateRevision
PublicationId
FrameEnvelopeId
FrameFingerprint
CanvasSurfaceId
CanvasSurfaceRevision
CanvasProjectionRevision
HtmlSurfaceId
HtmlSurfaceRevision
HtmlProjectionRevision
RouteRevision
ViewportRevision
FrameCommitId
VisibleFrameAckId
```

## Required commands and results

```txt
BuildFrameEnvelopeCommand -> FrameEnvelopeResult
PrepareCanvasProjectionCommand -> CanvasProjectionResult
PrepareHtmlProjectionCommand -> HtmlProjectionResult
CommitDualSurfaceFrameCommand -> DualSurfaceFrameCommitResult
RecoverLastCompleteFrameCommand -> FrameRecoveryResult
ReadVisibleFrameCommand -> VisibleFrameReadbackResult
AcknowledgeVisibleFrameCommand -> FirstDualSurfaceFrameAck
```

## Candidate kit family

```txt
state-revision-kit
publication-id-kit
frame-envelope-id-kit
frame-fingerprint-kit
immutable-frame-envelope-kit
canvas-surface-id-kit
canvas-surface-revision-kit
canvas-projection-command-kit
canvas-projection-result-kit
html-surface-id-kit
html-surface-revision-kit
html-projection-command-kit
html-projection-result-kit
route-world-visibility-policy-kit
dual-surface-frame-commit-id-kit
dual-surface-frame-commit-result-kit
partial-frame-classification-kit
last-complete-frame-kit
frame-recovery-policy-kit
visible-frame-readback-kit
first-dual-surface-frame-ack-kit
frame-coherence-observation-kit
dual-surface-parity-fixture-kit
partial-frame-recovery-fixture-kit
frame-source-dist-pages-parity-fixture-kit
```

## Transaction

```txt
runtime commit
  -> allocate StateRevision and PublicationId
  -> capture one detached immutable FrameEnvelope
  -> publish that exact envelope
  -> prepare canvas and HTML candidates
  -> validate route, viewport, and surface revisions
  -> commit both candidates under one FrameCommitId
  -> return complete, partial, failed, stale, or superseded
  -> preserve or recover the last complete frame
  -> expose committed receipts through diagnostics
  -> acknowledge the first matching visible frame
```

## Failure policy

```txt
stale envelope -> reject both with zero mutation
canvas prepare failure -> follow declared HTML degradation policy
HTML prepare failure -> retain last complete HTML or restore it
one surface applies before failure -> classify partial, never complete
renderer fault -> record evidence and keep scheduler recovery explicit
```

## Non-claims

This audit does not implement any candidate kit, atomic DOM/canvas commit, rollback, or visible-frame proof.