# Render audit: refresh-rate simulation/frame gap

## Current render path

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

The render callback is also the simulation clock. One visible frame always implies one simulation step, independent of the actual elapsed browser time.

## Visible divergence

```txt
30 Hz display
  -> 30 fixed literals per wall second
  -> 0.5 simulated seconds per wall second
  -> slower pressure, pests, damage and phase consequences

60 Hz display
  -> intended 1.0 simulated second per wall second

120 Hz display
  -> 120 fixed literals per wall second
  -> 2.0 simulated seconds per wall second
  -> faster pressure, pests, damage and phase consequences
```

The canvas and HTML renderer receive snapshots but no:

```txt
simulation epoch
first/last committed step ID
step count for this frame
wall-time interval
lag-drop reason
visibility generation
state revision
render frame ID
```

## Manual-step gap

`window.GameHost.tick(dt)` can advance the engine between browser frames. A later canvas frame may therefore include an unknown number of automatic and manual steps, while no receipt identifies which committed step range produced the pixels.

## Required frame contract

```txt
SimulationBatchResult
  -> simulationEpoch
  -> firstStepId
  -> lastStepId
  -> stepCount
  -> retainedAccumulatorSeconds
  -> droppedLagSeconds
  -> stateRevision

VisibleFrameReceipt
  -> frameId
  -> simulationEpoch
  -> firstStepId
  -> lastStepId
  -> stateRevision
  -> canvasWidth/height
  -> htmlProjectionRevision
```

## Required proof

```txt
same initial seed + equal wall time + 30/60/120 Hz
  -> equal committed simulation step count
  -> equal pressure and active-session state
  -> equivalent canvas/HTML snapshot

manual step
  -> explicit result
  -> exact successor frame receipt

hidden tab
  -> no unbounded catch-up burst
  -> explicit suspension/resume receipt
```

Until these fixtures exist, a screenshot or ordinary playthrough cannot prove that the visible orchard represents the same amount of simulation across displays.