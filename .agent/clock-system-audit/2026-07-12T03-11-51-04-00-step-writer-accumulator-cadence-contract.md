# Clock-system audit: step writer, accumulator, and cadence contract

## Authority objective

Create one simulation clock that advances game state independently of render refresh rate while remaining testable, bounded, observable, and safe under manual stepping, long frames, hidden tabs, reset, and runtime replacement.

## Canonical policy

```txt
fixedStepSeconds: 1 / 60
maxFrameDeltaSeconds: 0.25
maxCatchUpStepsPerFrame: explicit product policy
hiddenBehavior: suspend automatic accumulation
resumeBehavior: begin from a new visibility generation
publication: once after the admitted batch
rendering: at most once per browser callback
```

The exact catch-up limit must be selected during implementation and exposed through the policy descriptor rather than hidden in the browser host.

## State model

```txt
ClockState
  runtimeSessionId
  simulationEpoch
  nextStepId
  clockRevision
  writerLease
  accumulatorSeconds
  lastObservedTimestampMs
  visibilityGeneration
  suspended
  droppedLagSeconds
  lastCommittedBatch
```

## Automatic path

```txt
RAF(timestamp)
  -> normalize timestamp observation
  -> reject stale session/visibility callback
  -> calculate bounded wall delta
  -> update accumulator
  -> calculate admitted fixed-step count
  -> acquire automatic writer lease
  -> execute ordered exact steps
  -> commit step range and clock revision
  -> classify retained or dropped lag
  -> publish once
  -> release lease
  -> render and acknowledge frame
```

## Manual path

```txt
ManualStepCommand
  -> validate diagnostic capability
  -> validate paused/manual mode policy
  -> acquire same writer lease
  -> execute exact requested fixed steps
  -> commit through same result path
  -> publish once
  -> release lease
```

Manual callers must not submit arbitrary deltas to domain code. They request a count of canonical fixed steps.

## Suspension and resume

```txt
document hidden
  -> retire automatic writer lease
  -> clear or freeze accumulator per policy
  -> advance visibility generation
  -> reject predecessor RAF observations

document visible
  -> establish new timestamp baseline
  -> do not treat hidden duration as catch-up debt
```

## Typed result

```txt
SimulationBatchResult
  accepted
  reason
  source
  runtimeSessionId
  simulationEpoch
  clockRevision
  firstStepId
  lastStepId
  stepCount
  fixedStepSeconds
  observedWallDeltaSeconds
  retainedAccumulatorSeconds
  droppedLagSeconds
  stateRevision
  publicationRevision
```

## Invariants

```txt
step IDs are monotonic within an epoch
one step writer exists at a time
automatic and manual batches never interleave
domain dt always equals the fixed-step policy
no hidden duration becomes an unbounded resume burst
one committed batch produces one publication
render receipts cite committed step ranges
reset/restart advances epoch and rejects stale callbacks
```

## Required fixtures

```txt
30hz-60hz-120hz-parity
variable-frame-sequence-parity
long-frame-catch-up-limit
lag-drop-result
hidden-tab-suspension
resume-new-baseline
manual-auto-writer-exclusion
manual-step-equivalence
stale-epoch-rejection
single-publication-per-batch
step-range-visible-frame-receipt
```

## Non-goals

This audit does not define route-specific domain admission, browser movement bindings, deterministic random streams, or save/load continuation. Those authorities consume the clock after its transaction and identities are established.