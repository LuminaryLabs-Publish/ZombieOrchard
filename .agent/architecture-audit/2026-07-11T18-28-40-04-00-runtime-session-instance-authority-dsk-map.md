# Architecture audit — Runtime Session Instance Authority

## Summary

The product currently treats interface navigation as run lifecycle. One graph is created before Play and remains authoritative until page unload. The missing boundary is a parent runtime-session authority that owns graph identity, run identity, lifecycle state, reset transactions and disposal.

## Current ownership map

```txt
src/start.js
  -> creates one engine
  -> creates renderers
  -> starts one recursive RAF
  -> exposes raw GameHost

src/game.js
  -> constructs all mutable domains once

kit-runtime
  -> owns one ctx, frame, elapsed, events and domains table

interface-composition-kit
  -> owns active route and previous route only

active-session-domain-kit
  -> owns day, phase, player, pests, score, message and ended

resource / pressure / orchard / construction / roster / inventory
  -> own durable mutable state in closures
```

## Missing DSK boundary

```txt
zombie-orchard-runtime-session-authority-domain
  -> runtime-instance-id-kit
  -> run-instance-id-kit
  -> session-epoch-kit
  -> lifecycle-state-machine-kit
  -> fresh-run-state-factory-kit
  -> run-start-command-kit
  -> run-start-admission-kit
  -> run-reset-plan-kit
  -> run-reset-transaction-kit
  -> run-state-commit-kit
  -> route-session-binding-kit
  -> run-end-latch-kit
  -> title-exit-transaction-kit
  -> stale-run-command-rejection-kit
  -> run-snapshot-provenance-kit
  -> first-run-frame-ack-kit
  -> runtime-session-journal-kit
  -> fresh-run-fixture-kit
  -> restart-disposal-fixture-kit
```

## Ownership rules

1. The parent domain owns `runtimeId`, `runId`, `sessionEpoch`, lifecycle state and lifecycle revision.
2. Game-domain factories remain authoritative for their local state but are instantiated through one fresh-run factory.
3. Interface composition consumes lifecycle results; it does not create lifecycle truth.
4. RAF, delegated DOM input and GameHost calls must carry the active runtime/run/epoch generation.
5. Reset stages a complete candidate graph before authority transfer.
6. Candidate failure leaves the prior committed graph and route unchanged.
7. Successful commit retires predecessor callbacks, listeners, capabilities and snapshots.
8. First-frame acknowledgement is required before Start/New Game reports ready.

## Required state machine

```txt
idle
  -> starting
  -> active
  -> paused
  -> ended
  -> resetting
  -> active
  -> exiting
  -> idle
  -> disposed
```

Illegal transitions return typed rejections. `ended` is monotonic within one `runId`. A new run requires a new `runId` and advanced `sessionEpoch`; it must never clear the ended flag in place.

## Atomic start/reset transaction

```txt
StartRun(commandId, expectedRuntimeId, expectedEpoch, presetFingerprint)
  -> preflight lifecycle and command identity
  -> allocate candidate runId and next epoch
  -> create fresh domain graph from canonical preset
  -> validate required domain and service registry
  -> bind candidate route to active-session
  -> stage renderer and observer projections
  -> commit graph, route, runId and epoch atomically
  -> retire predecessor generation
  -> acknowledge first committed frame
  -> publish typed result and journal row
```

## Required result

```txt
RunLifecycleResult
  accepted
  reason
  commandId
  runtimeId
  previousRunId
  runId
  previousEpoch
  sessionEpoch
  previousLifecycle
  lifecycle
  graphRevision
  presetFingerprint
  firstFrameId
  stateFingerprint
```

## Dependency order

```txt
Runtime Session Instance Authority
  -> Fixed-Step Clock Authority
  -> Public Capability Gateway
  -> Composite Command Transaction Authority
  -> Seeded Random and Replay Authority
  -> Versioned Save / Load Authority
```

Clock, command, random and persistence identities must consume the committed run/session boundary rather than invent parallel epochs.