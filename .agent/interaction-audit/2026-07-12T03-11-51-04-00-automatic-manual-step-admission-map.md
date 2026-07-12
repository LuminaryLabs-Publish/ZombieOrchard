# Interaction audit: automatic and manual step admission

## Current ingress paths

```txt
automatic
  requestAnimationFrame(draw)
    -> engine.tick(1 / 60)

manual/public
  window.GameHost.tick(dt)
    -> engine.tick(dt)
```

Both paths mutate the same runtime context. Neither produces an immutable command envelope or checks whether another writer owns the step boundary.

## Current result behavior

`engine.tick()` returns a snapshot after it has already:

```txt
clamped delta
incremented elapsed
incremented frame
cleared events
ticked every domain
notified every subscriber
```

The returned snapshot does not distinguish automatic from manual origin and contains no step identity, expected revision, writer lease, rejection reason, publication count, or target frame.

## Required command model

```txt
SimulationStepCommand
  commandId
  source: automatic | manual
  runtimeSessionId
  simulationEpoch
  expectedNextStepId
  requestedStepCount
  fixedDeltaSeconds
  writerLeaseId
  visibilityGeneration
```

## Admission result

```txt
accepted
rejected-runtime-inactive
rejected-stale-epoch
rejected-stale-sequence
rejected-writer-busy
rejected-hidden
rejected-manual-capability
rejected-invalid-step-count
rejected-invalid-delta
```

## Writer rules

```txt
one automatic writer lease per active runtime
manual stepping requires an explicit capability
manual stepping is rejected while automatic ownership is active
an approved manual mode suspends automatic admission first
writer release is guaranteed on success, rejection, exception, stop and reset
stale callbacks cannot reacquire a predecessor lease
```

## Publication rule

A batch of fixed steps must publish one committed result after the complete batch. Intermediate domain snapshots must not appear as separate public commits.

## Required parity proof

```txt
one automatic step == one equivalent admitted manual step
same epoch and initial state -> same successor state
manual request during automatic ownership -> explicit rejection
stale manual request after reset -> explicit rejection
one accepted batch -> one public snapshot publication
accepted result -> one visible-frame receipt
```

This authority must be implemented before `GameHost.tick` is treated as a safe diagnostic capability.