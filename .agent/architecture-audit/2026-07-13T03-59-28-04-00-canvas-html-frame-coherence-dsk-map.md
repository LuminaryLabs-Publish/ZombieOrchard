# Architecture audit: canvas/HTML frame coherence DSK map

**Timestamp:** `2026-07-13T03-59-28-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

The runtime, canvas renderer, and HTML renderer are valid separate bounded owners, but the product lacks a composed authority that binds one committed state revision to both visible surfaces and diagnostics.

## Plan ledger

**Goal:** define the ownership boundary, identities, commands, results, and proof required for one coherent browser frame.

- [x] Preserve runtime ownership of state transitions and snapshots.
- [x] Preserve canvas ownership of world rasterization.
- [x] Preserve HTML ownership of route/HUD DOM projection.
- [x] Preserve interface-composition ownership of active route.
- [x] Define one coordinating frame-coherence domain.
- [x] Define candidate kits without moving gameplay meaning into rendering.
- [ ] Implement and validate the authority.

## Current ownership

```txt
kit-runtime
  owns domain mutation, ticks, snapshots, subscriptions, and publication

interface-composition-kit
  owns active route and nested action routing

world-canvas-render-kit
  owns canvas sizing and world rasterization

html-interface-render-kit
  owns DOM projection and delegated controls

game-host-diagnostics-kit
  exposes raw engine and fresh state snapshots
```

## Missing composed owner

```txt
zombie-orchard-canvas-html-frame-coherence-authority-domain
```

This domain coordinates presentation identity and commit results. It must not own orchard simulation, interface content, canvas drawing rules, or DOM component semantics.

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

## Required commands

```txt
BuildFrameEnvelopeCommand
PrepareCanvasProjectionCommand
PrepareHtmlProjectionCommand
CommitDualSurfaceFrameCommand
RecoverLastCompleteFrameCommand
ReadVisibleFrameCommand
AcknowledgeVisibleFrameCommand
```

## Required results

```txt
FrameEnvelopeResult
CanvasProjectionResult
HtmlProjectionResult
DualSurfaceFrameCommitResult
PartialFrameResult
FrameRecoveryResult
VisibleFrameReadbackResult
FirstDualSurfaceFrameAck
```

## Candidate kits

| Kit | Responsibility |
|---|---|
| `state-revision-kit` | Monotonic committed runtime revision |
| `publication-id-kit` | Publication identity and predecessor |
| `frame-envelope-id-kit` | Stable envelope identity |
| `frame-fingerprint-kit` | Canonical state and projection fingerprint |
| `immutable-frame-envelope-kit` | Detached immutable state used by observers and renderers |
| `canvas-surface-id-kit` | Canvas ownership identity |
| `canvas-surface-revision-kit` | Canvas lifecycle and viewport generation |
| `canvas-projection-command-kit` | Typed canvas preparation request |
| `canvas-projection-result-kit` | Applied, rejected, failed, or stale canvas result |
| `html-surface-id-kit` | HTML root ownership identity |
| `html-surface-revision-kit` | DOM root and route generation |
| `html-projection-command-kit` | Typed HTML preparation request |
| `html-projection-result-kit` | Applied, rejected, failed, or stale HTML result |
| `route-world-visibility-policy-kit` | Explicit world visibility by interface route |
| `dual-surface-frame-commit-id-kit` | One commit identity for both surfaces |
| `dual-surface-frame-commit-result-kit` | Complete, partial, failed, stale, or superseded result |
| `partial-frame-classification-kit` | Identifies which surface committed and why |
| `last-complete-frame-kit` | Stores recoverable visible frame and receipts |
| `frame-recovery-policy-kit` | Retain, retry, restore, or degrade policy |
| `visible-frame-readback-kit` | Diagnostics for the actually committed visible frame |
| `first-dual-surface-frame-ack-kit` | First browser-visible acknowledgement |
| `frame-coherence-observation-kit` | Bounded diagnostic journal |
| `dual-surface-parity-fixture-kit` | Same-envelope canvas/HTML proof |
| `partial-frame-recovery-fixture-kit` | Failure and recovery proof |
| `frame-source-dist-pages-parity-fixture-kit` | Deployment parity proof |

## Required transaction

```txt
runtime commit
  -> StateRevision
  -> BuildFrameEnvelopeCommand
  -> immutable FrameEnvelopeResult
  -> observer publication using the exact envelope
  -> prepare canvas candidate
  -> prepare HTML candidate
  -> route/world visibility admission
  -> CommitDualSurfaceFrameCommand
  -> CanvasProjectionResult
  -> HtmlProjectionResult
  -> DualSurfaceFrameCommitResult
  -> update last complete visible frame
  -> VisibleFrameReadbackResult
  -> FirstDualSurfaceFrameAck
```

## Failure policy

```txt
stale envelope
  -> reject both projections with zero mutation

canvas prepare failure
  -> apply declared HTML degradation policy
  -> record failed or partial result

HTML prepare failure
  -> retain last complete HTML subtree or restore it
  -> do not label canvas-only state as a complete frame

apply failure after one surface commits
  -> classify partial
  -> preserve fault evidence
  -> keep successor scheduling alive
  -> recover or supersede under explicit policy
```

## Integration order

```txt
runtime session identity
  -> immutable publication envelope
  -> route and viewport revisions
  -> per-surface preparation results
  -> dual-surface commit result
  -> visible diagnostics
  -> first visible acknowledgement
  -> browser and Pages fixtures
```

## Non-claims

No frame-envelope, surface-result, commit, rollback, recovery, visible readback, or acknowledgement kit is implemented by this documentation pass.
