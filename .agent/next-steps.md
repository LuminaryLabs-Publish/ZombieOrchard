# Next steps — ZombieOrchard

## Plan ledger

**Goal:** turn each orchard run into one identified, fresh, cadence-independent, capability-declared, atomic, reproducible, persistable and disposable session.

- [ ] Implement runtime-session instance authority first.
- [ ] Add fresh graph staging, commit, rollback and predecessor retirement.
- [ ] Bind routes and render frames to the committed run identity.
- [ ] Implement fixed-step clock authority using the session owner.
- [ ] Add a public capability gateway and quarantine raw diagnostics.
- [ ] Add composite command transaction authority.
- [ ] Inject isolated seeded random streams and replay receipts.
- [ ] Add versioned save/load authority that restores random authority state.
- [ ] Gate deployment on lifecycle, cadence, transaction, replay and persistence fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
   + Start / New Game / Outcome / Title / Reset / Dispose Fixture Gate

2. Fixed-Step Clock Authority
   + Pause / 30-60-120 Hz / Stall / Visibility / Manual-Step Fixture Gate

3. Public Capability Gateway and Reachability
   + Registry / Binding / Result / Diagnostics-Quarantine Fixture Gate

4. Composite Command Transaction Authority
   + Parent / Child / Resource / Rollback / Single-Publication Fixture Gate

5. Seeded Random and Replay Authority
   + Apple / Pest / Stream Isolation / Replay Parity Fixture Gate

6. Versioned Save / Load Authority
   + Slot Roundtrip / Random Continuation / Atomic Load Fixture Gate
```

## Gate 1 — Runtime Session Instance Authority

### 1. Add the parent owner

Create:

```txt
zombie-orchard-runtime-session-authority-domain
```

It owns:

```txt
runtimeId
runtimeGeneration
runId
sessionEpoch
lifecycle
lifecycleRevision
graphRevision
presetId
presetFingerprint
latestLifecycleCommandId
latestLifecycleResult
firstCommittedFrameId
bounded lifecycle journal
```

### 2. Convert game construction into a fresh-run factory

Current:

```txt
module boot
  -> createOrchardGame()
  -> one graph for page lifetime
```

Required:

```txt
createRuntime()
  -> idle runtime owner

stageRun(preset)
  -> fresh resource ledger
  -> fresh pressure field
  -> fresh orchard world
  -> fresh construction state
  -> fresh roster state
  -> fresh inventory state
  -> fresh active session
  -> fresh interface composition
  -> validated candidate graph
```

Do not clear the ended graph in place.

### 3. Add typed lifecycle commands

```txt
StartRun
RequestNewRun
CommitNewRun
PauseRun
ResumeRun
EndRun
ExitRunToTitle
DisposeRuntime
```

Each carries:

```txt
commandId
runtimeId
expectedRunId
expectedSessionEpoch
expectedLifecycle
expectedLifecycleRevision
source
```

### 4. Define lifecycle state transitions

```txt
idle -> starting -> active
active -> pausing -> paused
paused -> resuming -> active
active -> ended
active|paused|ended -> resetting -> active
active|paused|ended -> exiting -> idle
any live state -> disposing -> disposed
```

Reject illegal and stale transitions with typed results.

### 5. Stage and commit atomically

```txt
preflight command and lifecycle
  -> allocate candidate runId and next epoch
  -> create candidate graph
  -> validate domain/service registry
  -> stage route and presentation
  -> fence predecessor generation
  -> atomically swap committed graph and identity
  -> acknowledge first canvas and HTML frame
  -> retire predecessor resources
  -> publish result and journal row
```

A candidate failure must leave the prior committed run unchanged.

### 6. Bind routes to lifecycle

```txt
Entry
  -> idle runtime projection

Run Setup
  -> candidate configuration projection

Active Session
  -> active committed run projection

Pause
  -> paused committed run projection

Outcome
  -> ended committed run summary projection
```

`interface-composition` must consume lifecycle results rather than create lifecycle truth.

### 7. Fence stale work

RAF callbacks, delegated events, GameHost commands, manual ticks, render callbacks and later asynchronous work must carry runtime generation and session epoch. Predecessor work performs no mutation after authority transfer.

### 8. Add snapshot and frame provenance

Every authoritative snapshot and committed presentation frame should cite:

```txt
runtimeId
runtimeGeneration
runId
sessionEpoch
lifecycle
lifecycleRevision
graphRevision
simulationTickId
renderFrameId
stateFingerprint
```

### 9. Add DOM-free fixtures

```txt
initial Play fresh state
New Game from Entry
Outcome -> Title -> Play
Outcome -> Title -> New Game -> Start
full state reset across all domains
candidate graph failure rollback
stale command rejection
stale callback rejection
repeated reset
idempotent disposal
```

### 10. Add browser fixtures

```txt
first run frame identity
Outcome and Title frame identity
first fresh restart frame identity
canvas / HTML / GameHost parity
one RAF chain after repeated restart
one delegated listener after repeated restart
no predecessor frame after epoch advance
```

## Gates 2–6 prerequisites

Later gates must consume, not duplicate:

```txt
runtimeId
runtimeGeneration
runId
sessionEpoch
lifecycle and revision
graphRevision
committed simulationTickId
commandId
transactionId
commit or rollback result
state fingerprint hook
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fresh Graph Factory
+ Lifecycle Command and Transaction Results
+ Route/Run Binding
+ Stale Work Fence
+ First Fresh Frame and Disposal Fixture Gate
```