# Clock authority audit: wall-time accumulator and catch-up contract

## Timestamp

`2026-07-11T15-20-27-04-00`

## Authority objective

One session-owned clock must be the only production mutation source. It must convert monotonic wall-time samples into deterministic fixed ticks while bounding work and publishing explicit overrun results.

## Recommended descriptor

```txt
fixedStep: 1 / 60 seconds
maxFrameDelta: explicit product value
maxCatchupSteps: explicit product value
overflowPolicy: defer or drop with result
renderPolicy: once per callback after zero or more ticks
```

Values must be versioned configuration, not hidden literals.

## Transaction

```txt
ClockFrameRequest
  runtime/session/epoch
  callback generation
  monotonic timestamp
  observed clock revision

preflight
  validate lifecycle and ownership
  validate monotonic timestamp
  derive accepted frame delta

stage
  add delta to accumulator
  plan fixed steps up to budget
  plan deferred/dropped remainder

commit
  execute ordered domain ticks
  assign simulationTickId per tick
  advance clockRevision once
  retain accumulator remainder
  publish ClockFrameResult

presentation
  render latest committed tick once
  publish RenderFrameClockAck
```

## Pause and visibility policy

```txt
pause commit
  -> automatic mutation disabled
  -> wall-time baseline retired
  -> accumulator handled by declared policy

resume or visibility return
  -> new baseline established
  -> first callback contributes zero hidden elapsed time
```

## Manual stepping

Manual stepping is a debug capability, not a second clock. It requires an exclusive lease, an explicit step count and the current session/clock revision. The automatic owner must be suspended or absent.

## Result shape

```txt
ClockFrameResult
  status
  clockRevision
  acceptedWallDelta
  executedStepCount
  firstSimulationTickId
  lastSimulationTickId
  accumulatorRemainder
  deferredTime
  droppedTime
  overrunReason
```

## Invariants

```txt
one production clock owner
monotonic simulationTickId
renderFrameId independent from simulationTickId
no mutation while paused or disposed
bounded catch-up work
no silent time loss
no stale-session callbacks
no automatic/manual overlap
```