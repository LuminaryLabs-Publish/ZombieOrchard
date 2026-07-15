# Interaction audit: host-frame command/result map

## Required command

```txt
HostFrameCommand {
  hostFrameId
  clockRevision
  rafTimestampMs
  priorTimestampMs
  accumulatorSeconds
  visibilityRevision
}
```

## Required result chain

```txt
ClockSampleResult
  valid | rejected
  wallDeltaSeconds

FixedStepAdmissionResult
  fixedStepSeconds
  admittedStepCount
  deferredSeconds
  droppedSeconds

SimulationStepResult[]
  simulationStepId
  runtimeFrame
  runtimeElapsed
  stateRevision

RenderFrameResult
  hostFrameId
  stateRevision
  canvasReceipt
  htmlReceipt

HostFrameResult
  accepted | reduced | suspended | rejected
  firstSimulationStepId
  lastSimulationStepId
  renderedStateRevision
  timingDiagnostics
```

## Rejection and reduction cases

```txt
non-monotonic timestamp
stale HostFrameId
wrong ClockRevision
hidden-tab suspension
catch-up budget exceeded
retired host generation
mixed Canvas2D and HTML state revisions
```

## Visibility transition

A separate `VisibilityTransitionCommand` must bind the active clock and host generations, settle accumulator debt, clear stale timestamps according to policy and publish a result before further simulation admission.

## Current gap

The existing host has no host-frame command, command identity, clock revision, accumulator, step receipts, visibility result or matching renderer acknowledgement.