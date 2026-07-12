# ZombieOrchard Observer, Render, and Schedule Failure Contract

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

This contract defines how post-commit observer delivery, render surfaces, successor scheduling, recovery, and stopping must behave. It prevents untrusted observers and recoverable render faults from owning browser-loop liveness while preserving explicit stop behavior for critical simulation faults.

## Plan ledger

**Goal:** specify one deterministic frame-cycle contract with complete stage results and no silent callback-chain termination.

- [x] Define cycle identity and generation.
- [x] Define observer leases and delivery results.
- [x] Define render surface results.
- [x] Define successor scheduling and recovery results.
- [x] Define critical versus recoverable fault classes.
- [x] Define bounded observations and fixtures.
- [ ] Implement and execute the contract.

## Frame-cycle command

```txt
FrameCycleCommand {
  runtimeSessionId
  runtimeGeneration
  frameCycleId
  frameCycleGeneration
  source: RAF | MANUAL | RECOVERY
  observedStateRevision
  observedVisibilityGeneration
}
```

## Observer delivery

```txt
for each active observer lease:
  validate session and generation
  invoke with one detached snapshot
  catch observer-local errors
  return ObserverDeliveryResult
  update failure count
  apply quarantine/revocation policy
continue with remaining observers
```

Observer code never executes with direct ownership of:

```txt
command commit meaning
simulation rollback
successor scheduling
runtime lifecycle transition
other observer leases
```

## Render stages

```txt
WORLD_RENDER
  input: detached snapshot + stateRevision
  output: WorldRenderStageResult

HTML_RENDER
  input: same detached snapshot + stateRevision
  output: HtmlRenderStageResult
```

Each result includes:

```txt
surfaceId
surfaceRevision
stateRevision
status
errorCode?
recoveryRequired
```

## Successor scheduling

Successor scheduling is a required finalization stage:

```txt
try
  publication and rendering
finally
  classify current cycle
  schedule next cycle under active generation
  or commit explicit STOPPED/FAULTED result
```

The finalizer cannot silently schedule after a disposed or stale runtime generation.

## Fault classes

```txt
OBSERVER_LOCAL
  recoverable
  isolate and continue

OPTIONAL_SURFACE
  recoverable under policy
  classify partial frame

REQUIRED_SURFACE
  recovery or explicit stop required
  no complete frame receipt

SIMULATION_CRITICAL
  do not continue as normal
  transition lifecycle to FAULTED or STOPPED

STALE_GENERATION
  reject callback/result
  no owner mutation or scheduling
```

## Recovery

```txt
RecoveryCommand
  -> validate runtime session and failed cycle
  -> increment recovery generation
  -> retire predecessor callbacks and leases as required
  -> rebuild or reset failed surface adapter
  -> render committed state revision
  -> acknowledge first recovered visible frame
  -> resume normal frame generation
```

## Journal

```txt
FrameFaultJournalEntry {
  journalSequence
  frameCycleId
  frameCycleGeneration
  stage
  faultClass
  errorCode
  observerLeaseId?
  surfaceId?
  stateRevision
  action
  recoveryGeneration?
}
```

The journal is bounded and detached from live owners.

## Invariants

```txt
observer-local faults do not escape into frame ownership
one committed command keeps one stable result meaning
later observers are attempted after predecessor observer failure
one frame cycle has one final scheduling/stop result
failed required surfaces do not produce complete visible receipts
critical simulation faults do not silently resume
stale generations cannot deliver, render, schedule, or acknowledge
```

## Required proof

```txt
observer isolation and ordering
quarantine threshold determinism
command result preservation
partial/failed surface classification
successor finalization after recoverable fault
explicit stop after critical fault
recovery-generation stale rejection
first recovered frame acknowledgement
```
