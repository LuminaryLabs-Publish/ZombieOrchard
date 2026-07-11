# Accumulator, Catch-Up and Pause Contract

**Timestamp:** `2026-07-11T12-01-38-04-00`

## Summary

A fixed delta constant is not a fixed-step clock. The runtime needs an accumulator that turns admitted wall time into bounded, monotonic simulation ticks.

## Proposed defaults

```txt
fixedStepSeconds:      1 / 60
maxFrameDeltaSeconds:  0.25
maxCatchupSteps:       8
pausePolicy:           freeze accumulator and reset wall baseline
visibilityResume:      reset baseline; do not replay hidden wall time
overrunPolicy:         publish deferred/dropped time explicitly
```

These are proposed policy values, not current runtime behavior.

## Algorithm

```txt
sample now
  -> rawDelta = now - previousNow
  -> previousNow = now
  -> reject/reset when lifecycle is not RUNNING
  -> admittedDelta = min(rawDelta, maxFrameDelta)
  -> accumulator += admittedDelta
  -> steps = 0
  -> while accumulator >= fixedStep and steps < maxCatchupSteps
       commit one simulation tick
       accumulator -= fixedStep
       steps += 1
  -> classify remaining backlog
  -> render latest committed state once
```

## Pause contract

```txt
RUNNING -> PAUSED
  -> stop tick admission
  -> clear accumulator
  -> clear held gameplay inputs
  -> retain committed tick ID

PAUSED -> RUNNING
  -> reset wall-time baseline
  -> resume with zero backlog
```

## Stall contract

A long stall must never produce an unbounded update loop. The clock publishes:

```txt
rawDelta
admittedDelta
stepsCommitted
remainingAccumulator
clampedSeconds
deferredSeconds
droppedSeconds
reason
```

## Observation

```txt
clockId
sessionId
sessionEpoch
clockRevision
mode
latestTickId
accumulatorSeconds
lastRawDeltaSeconds
lastAdmittedDeltaSeconds
lastCatchupSteps
totalDroppedSeconds
totalDeferredSeconds
```

## Fixture boundary

The clock should be testable without DOM, RAF or real time by injecting timestamp sequences and lifecycle commands.
