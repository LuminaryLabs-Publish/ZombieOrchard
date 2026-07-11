# Render audit: simulation tick and render-frame correlation gap

## Timestamp

`2026-07-11T15-20-27-04-00`

## Current render sequence

```txt
engine.tick(1 / 60)
  -> aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request next RAF
```

Canvas and HTML receive the same aggregate snapshot object for a callback, but that snapshot carries no runtime ID, session ID, epoch, simulation tick ID, clock revision, render frame ID or state fingerprint.

## Gap

`ctx.frame` increments once for every call to `engine.tick()`. It does not prove that a browser frame was submitted, and it can also advance through `GameHost.tick(dt)` without rendering.

The runtime cannot distinguish:

```txt
simulation tick with no render
render callback with zero new fixed ticks
render callback with several catch-up ticks
manual debug tick between browser frames
stale callback from an old session
canvas success plus HTML failure
```

## Required render contract

```txt
CommittedTickReceipt
  runtimeId
  sessionId
  sessionEpoch
  simulationTickId
  clockRevision
  stateFingerprint

RenderFrameReceipt
  renderFrameId
  consumedSimulationTickId
  canvasProjectionResult
  htmlProjectionResult
  submittedAt
  presentationStatus
```

One render callback should execute zero or more fixed simulation ticks, then render once from the latest committed state. Canvas, HTML and public observation must cite the same committed tick and render frame.

## Required proof

```txt
30/60/120 Hz equal-wall-time parity
zero-tick frame acknowledgement
multi-tick catch-up frame acknowledgement
manual step without implicit render
canvas/HTML tick parity
stale-session render rejection
render-after-dispose rejection
```