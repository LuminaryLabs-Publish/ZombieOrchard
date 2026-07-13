# Interaction audit: frame-envelope projection reconciliation map

**Timestamp:** `2026-07-13T07-41-11-04-00`

## Summary

Commands return before their visible effect is correlated, RAF ticks publish and return separate snapshots, and diagnostics expose current mutable state rather than the last complete visible frame.

## Plan ledger

**Goal:** define the command-to-visible-result chain without merging input, gameplay, rendering, or diagnostics ownership.

- [x] Trace delegated browser actions to `engine.command`.
- [x] Trace RAF callbacks to `engine.tick`.
- [x] Trace publication and returned snapshot captures.
- [x] Trace canvas and HTML projections.
- [x] Trace public diagnostics and manual ticking.
- [ ] Add stable identities, terminal results, and visible acknowledgement.

## Current map

```txt
DOM action
  -> engine.command(...)
  -> domain result
  -> notify(snapshot P)
  -> caller receives command result
  -> no visible-frame promise

RAF
  -> engine.tick(1 / 60)
  -> notify(snapshot T1)
  -> return snapshot T2
  -> canvas(T2)
  -> HTML(T2)
  -> next RAF

GameHost
  -> getState() returns fresh D
  -> tick(dt) performs an unscheduled mutation
  -> neither result identifies a complete visible frame
```

## Required admitted map

```txt
RuntimeTransitionResult
  -> BuildFrameEnvelopeCommand
  -> FrameEnvelopeResult
  -> PrepareCanvasProjectionCommand
  -> CanvasProjectionResult
  -> PrepareHtmlProjectionCommand
  -> HtmlProjectionResult
  -> CommitDualSurfaceFrameCommand
  -> DualSurfaceFrameCommitResult
  -> VisibleFrameReadbackResult
  -> FirstDualSurfaceFrameAck
```

## Rejection conditions

```txt
stale runtime session
stale run generation
stale state revision
stale route revision
stale viewport revision
retired canvas or HTML surface
superseded frame envelope
projection preparation failure
partial apply requiring recovery
```

## Diagnostics rule

`GameHost` should expose detached observations of the last complete visible frame and bounded failure evidence. It should not infer visible state from a new runtime snapshot.

## Non-claims

No command admission, result retention, projection acknowledgement, or diagnostics quarantine changed.