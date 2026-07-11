# Session lifecycle audit — Run Instance Reset Transaction Contract

## Summary

A run must become an explicit authority object rather than an emergent set of closures. This contract defines the minimum identity, lifecycle, transaction, rollback, observation and disposal semantics required for fresh-run correctness.

## Canonical identity

```txt
runtimeId
runtimeGeneration
runId
sessionEpoch
lifecycleRevision
graphRevision
presetId
presetFingerprint
```

## Lifecycle states

```txt
idle
starting
active
pausing
paused
resuming
ended
resetting
exiting
disposing
disposed
```

## Invariants

1. Exactly one run is committed for an active runtime generation.
2. `runId` never changes without an atomic graph/state authority transfer.
3. `sessionEpoch` advances before predecessor callbacks and commands can commit.
4. `ended` is monotonic inside one run.
5. A fresh run receives fresh resource, pressure, orchard, construction, roster, inventory and active-session state.
6. Route state cannot independently create, resume or retire a run.
7. Failed staging publishes no partial graph, route, listener, timer, frame or capability state.
8. Disposal is ordered, idempotent and fences late callbacks.

## Start transaction

```txt
preflight
  -> validate command id and expected lifecycle revision
  -> validate preset identity
  -> allocate candidate runId and next epoch

stage
  -> construct candidate graph
  -> seed candidate orchard under future random authority
  -> validate required domains and services
  -> stage route and render projections

commit
  -> fence predecessor generation
  -> swap committed graph
  -> publish runtime/run/epoch identity
  -> bind active-session route
  -> submit first candidate frame
  -> commit first-frame acknowledgement
  -> publish RunLifecycleResult

rollback
  -> dispose candidate graph and resources
  -> preserve previous committed authority
  -> publish typed failure
```

## Exit transaction

```txt
ExitRunToTitle
  -> validate active or ended run
  -> freeze final summary
  -> revoke run-scoped commands
  -> retire run-scoped callbacks
  -> dispose run-scoped render and domain resources
  -> advance lifecycle revision
  -> bind Entry to idle runtime state
  -> publish result
```

## Stale-work policy

Any tick, command, render callback, listener callback, GameHost call or asynchronous continuation carrying a predecessor runtime generation or session epoch must return or record `stale-generation` and perform no mutation.

## Snapshot provenance

Every authoritative snapshot should include:

```txt
runtimeId
runtimeGeneration
runId
sessionEpoch
lifecycle
lifecycleRevision
graphRevision
simulationTickId
stateFingerprint
```

Presentation-only snapshots may omit internal data but may not omit identity.

## Fixture matrix

```txt
initial Play
New Game from Entry
New Game during active run
Outcome -> Title
Title -> Play after failure
Title -> New Game -> Start after failure
candidate graph validation failure
first-frame failure
stale RAF callback after epoch advance
stale GameHost command after reset
repeated reset cycles
repeated dispose
```

## Acceptance boundary

Do not claim new-game correctness, restart, pause, replay, save/load continuation or lifecycle safety until the runtime-session fixtures pass on `main`.