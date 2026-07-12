# ZombieOrchard Simulation, Publication, and Render Liveness Gap

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

The visible frame is not an atomic projection of committed state. Simulation can advance and observers can receive a snapshot before one renderer fails. A failure can leave the world canvas, HTML surface, public observation, and simulation at different revisions, then stop all future frames because successor scheduling has not yet occurred.

## Plan ledger

**Goal:** define the render evidence required to distinguish a committed simulation revision from a complete visible frame and to preserve explicit loop liveness after surface faults.

- [x] Trace the frame ordering in `src/start.js`.
- [x] Trace canvas mutation in `world-canvas.js`.
- [x] Trace DOM replacement in `html-interface-renderer.js`.
- [x] Confirm renderers return no typed results.
- [x] Confirm the next RAF is scheduled after both renderers.
- [x] Define stage results, partial-frame policy, scheduling result, recovery generation, and visible-frame receipt.
- [ ] Implement and test source/browser/Pages parity.

## Current order

```txt
engine.tick
  -> state mutation
  -> subscriber publication
  -> return snapshot
world.render
  -> canvas pixels mutate
ui.render
  -> HTML root is replaced
requestAnimationFrame(draw)
```

## Divergence cases

### World renderer fails

```txt
simulation: advanced
public subscribers: may have received new snapshot
world canvas: predecessor or partially changed pixels
HTML: not updated
next RAF: not scheduled
```

### HTML renderer fails

```txt
simulation: advanced
public subscribers: new snapshot delivered
world canvas: successor pixels may be visible
HTML: predecessor or partially replaced DOM
next RAF: not scheduled
```

### Subscriber fails before rendering

```txt
simulation: advanced
some subscribers: new snapshot delivered
later subscribers: skipped
world canvas: predecessor frame
HTML: predecessor frame
next RAF: not scheduled
```

## Missing evidence

```txt
stateRevision
publicationCycleId
worldSurfaceRevision
htmlSurfaceRevision
worldRenderResult
htmlRenderResult
frameCycleId
frameCycleStatus
successorScheduleResult
recoveryGeneration
visibleFrameReceipt
```

## Required surface policy

```txt
required surfaces:
  world canvas
  active route HTML

COMPLETE
  both required surfaces commit the same stateRevision

PARTIAL
  policy permits one surface to commit while another fails
  no complete visible-frame receipt is issued

FAILED
  required surface policy is not satisfied

RECOVERING
  successor cycle is explicitly scheduled under a new recovery generation

STOPPED
  runtime lifecycle records a terminal frame-loop stop
```

## Required receipt

```txt
VisibleFrameReceipt {
  receiptId
  runtimeSessionId
  frameCycleId
  frameCycleGeneration
  stateRevision
  publicationCycleId
  worldSurfaceRevision
  htmlSurfaceRevision
  completedAtSequence
}
```

## Invariants

```txt
public snapshot delivery is not a visible-frame acknowledgement
canvas completion alone is not a complete frame when HTML is required
HTML completion alone is not a complete frame when world canvas is required
failed required surfaces do not advance visibleFrameRevision
successor scheduling has an explicit result even after recoverable faults
stale recovery generations cannot claim visible completion
```

## Proof gate

Do not claim frame coherence or loop liveness until forced world-render, HTML-render, subscriber, partial-frame, successor-schedule, and recovery-generation fixtures pass against source, built artifact, and Pages.
