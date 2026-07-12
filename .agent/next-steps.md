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
- [ ] Add versioned save/load authority using canonical durable state.
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
   + Slot Roundtrip / Migration / Corruption / Random Continuation / Atomic Load Fixture Gate
```

## Gate 1 remains the next safe implementation ledge

Create one runtime-session owner and convert `createOrchardGame()` into a candidate graph factory. Every later persistence action must cite the committed `runtimeId`, `runId`, `sessionEpoch`, lifecycle revision and graph revision.

```txt
createRuntime()
  -> idle owner

stageRun(preset)
  -> fresh candidate graph
  -> validated domain registry
  -> atomic authority transfer
  -> first frame acknowledgement
```

Do not clear the current closure graph in place.

## Gate 6 design — Versioned Save / Load Authority

The persistence design is now documented. Implement it only after Gates 1–5 expose canonical identities, committed ticks, command results, random stream state and durable fingerprints.

### 1. Define durable versus presentation state

Persist only state required to continue the run:

```txt
resource values
pressure channels
orchard trees and apples
construction catalog state and built objects
roster actors and roles
inventory items and equipped item
active-session day, phase, player, pests, score, message and ended state
interface route only when explicitly part of restore policy
clock continuation
command sequence
random stream states
entity sequences
```

Do not persist transient DOM nodes, canvas state, listeners, RAF handles, raw engine references or renderer objects.

### 2. Add a versioned envelope

```txt
schemaId: zombie-orchard-save
schemaVersion: integer
saveId
slotId
slotRevision
createdAt
updatedAt
presetId
presetFingerprint
runtimePolicyVersion
randomPolicyId
randomPolicyVersion
runtimeId
runId
sessionEpoch
lifecycle
simulationTickId
commandSequence
randomStreamStates
entitySequences
durableDomainState
stateFingerprint
checksum
```

The envelope must be validated before storage and after readback.

### 3. Add an atomic storage adapter

Start with a browser adapter whose public contract is independent of the backend:

```txt
listSlots()
readSlot(slotId)
writeSlot(candidate, expectedRevision)
deleteSlot(slotId, expectedRevision)
quarantineSlot(slotId, reason)
```

Use compare-and-swap slot revisions. A failed write must preserve the previous valid envelope and slot index.

### 4. Make Save Select real and reachable

Current Entry does not route to `session-select`. Add an explicit Continue or Load action only after a canonical slot index exists.

Required projection:

```txt
slotId
label
updatedAt
schemaVersion
run summary
compatibility state
corruption state
available actions
latest command result
```

The renderer must consume authoritative slot-index state rather than static preset metadata.

### 5. Add typed save commands and results

```txt
SaveRun
DeleteSave
RenameSave
ExportSave
```

Each command carries:

```txt
commandId
runtimeId
runId
sessionEpoch
expectedLifecycle
expectedSimulationTickId
slotId
expectedSlotRevision
source
```

Results distinguish accepted, stale, conflict, quota, storage failure, serialization failure and validation failure.

### 6. Add ordered migrations

```txt
v1 -> v2 -> v3 -> current
```

Each migration must be pure, deterministic, version-specific and independently fixture-tested. Unknown future versions are rejected without mutation. Failed migrations quarantine the candidate copy while retaining the original bytes for diagnostics or export.

### 7. Stage load into a fresh candidate graph

```txt
read envelope
  -> checksum validation
  -> schema migration
  -> compatibility validation
  -> candidate graph construction
  -> domain hydration
  -> clock/random/entity continuation hydration
  -> candidate fingerprint verification
```

No live domain should mutate during candidate staging.

### 8. Commit load atomically

```txt
LoadRun
  -> admit command and slot revision
  -> allocate loadEpoch
  -> fence predecessor callbacks and commands
  -> swap committed graph and continuation state
  -> bind route to loaded lifecycle
  -> render first restored canvas and HTML frame
  -> acknowledge restored frame
  -> retire predecessor graph
```

Any failure before the first restored frame keeps the previous committed run authoritative.

### 9. Add persistence observation

Expose only read-only diagnostics:

```txt
latest save result
latest load result
slot index revision
active saveId and slotId
schema version
migration path
load epoch
restored state fingerprint
first restored frame ID
bounded persistence journal
```

Do not expose raw storage mutation through `GameHost`.

### 10. Add fixtures

DOM-free:

```txt
save/load roundtrip
same durable fingerprint
same future random continuation
slot compare-and-swap conflict
old-version migration
unknown-version rejection
checksum corruption quarantine
candidate hydration failure rollback
duplicate save/load idempotency
```

Browser:

```txt
Save Select reachability
slot list projection
save result projection
load result projection
first restored canvas/HTML/GameHost parity
no predecessor frame after load epoch
no duplicate RAF or delegated listener after repeated loads
storage failure remains recoverable
```

## Cross-gate prerequisites

Gate 6 must consume, not duplicate:

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
random policy and named stream states
entity sequences
durable state fingerprint
renderFrameId
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

The persistence design is ready for later implementation, but it is unsafe to implement before the authoritative run, tick, command and randomness layers exist.