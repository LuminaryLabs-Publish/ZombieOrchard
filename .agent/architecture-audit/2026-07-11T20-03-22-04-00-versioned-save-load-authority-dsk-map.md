# Architecture audit — Versioned Save / Load Authority

## Plan ledger

**Goal:** define the complete DSK/domain decomposition required to persist and restore one authoritative orchard run without duplicating lifecycle, clock, transaction, random or render ownership.

- [x] Identify current persistence-adjacent surfaces.
- [x] Separate durable state from transient runtime and presentation resources.
- [x] Define save-slot, schema, compatibility and checksum ownership.
- [x] Define save and load command transactions.
- [x] Define migration, corruption and conflict results.
- [x] Define restored-frame acknowledgement and fixtures.
- [ ] Implement after prerequisite authorities exist.

## Current architecture

```txt
entry-domain-kit
  -> Play
  -> New Game
  -> Settings

session-select-domain-kit
  -> generic screen state
  -> Back only

html-interface-render-kit
  -> reads current.meta.slots

kit-runtime
  -> domain.snapshot() aggregation only

all mutable game state
  -> private closure state

Math.random()
  -> invisible global continuation
```

There is no persistence owner or restorable graph boundary.

## Parent domain

```txt
zombie-orchard-versioned-persistence-authority-domain
```

Owns:

```txt
persistence policy identity
active slot index
save and load command admission
schema and migration registry
storage adapter contract
slot revisions and conflicts
candidate envelope validation
candidate graph staging
load epoch and authority transfer
rollback and predecessor preservation
corruption quarantine
latest save/load results
first restored frame acknowledgement
bounded persistence journal
```

## DSK map

### Slot identity and discovery

```txt
save-slot-id-kit
save-slot-index-kit
slot-summary-projection-kit
slot-conflict-result-kit
```

Services:

```txt
allocate stable slot identity
list slot summaries
track slot revision
classify available, empty, incompatible, corrupt and conflicted slots
project slot actions and latest result
```

### Envelope schema and compatibility

```txt
save-envelope-schema-kit
save-schema-version-kit
save-preset-fingerprint-kit
save-policy-compatibility-kit
```

Services:

```txt
define required envelope fields
validate schema identity and version
validate preset and policy compatibility
reject unknown future versions
report typed compatibility results
```

### Durable state and continuation

```txt
durable-state-projection-kit
random-continuation-state-kit
entity-sequence-state-kit
save-state-fingerprint-kit
save-checksum-kit
```

Services:

```txt
project only continuation-critical domain state
capture committed tick and command sequence
capture named random stream states and cursors
capture deterministic entity sequences
produce canonical durable fingerprint
produce envelope checksum
```

### Save command path

```txt
save-command-kit
save-admission-kit
save-candidate-envelope-kit
save-result-kit
atomic-storage-adapter-kit
```

Services:

```txt
admit run, lifecycle, tick and expected slot revision
freeze one committed durable receipt
build and validate candidate envelope
atomically replace slot and slot index
return accepted, stale, conflict, quota, serialization,
storage or validation results
```

### Migration and corruption

```txt
save-migration-registry-kit
save-migration-result-kit
corrupt-save-quarantine-kit
```

Services:

```txt
register ordered pure migrations
migrate one version at a time
fingerprint migration output
retain original corrupt or incompatible bytes
produce recoverable diagnostics and export evidence
```

### Load command path

```txt
load-command-kit
load-admission-kit
load-candidate-graph-kit
load-validation-kit
load-transaction-kit
load-epoch-kit
load-rollback-kit
```

Services:

```txt
admit slot revision and current lifecycle
read, validate and migrate envelope
construct a fresh candidate graph
hydrate durable domains, clock and random continuation
verify candidate fingerprint
allocate load epoch
fence predecessor callbacks and commands
atomically transfer authority
roll back before visible commit on any failure
```

### Observation and proof

```txt
persistence-journal-kit
persistence-observation-kit
first-restored-frame-ack-kit
persistence-roundtrip-fixture-kit
persistence-migration-fixture-kit
persistence-corruption-fixture-kit
```

Services:

```txt
record bounded save/load/migration results
expose read-only slot and active-save observation
correlate restored fingerprint with canvas, HTML and GameHost frame
prove roundtrip, continuation, conflicts, migration,
corruption quarantine, rollback and repeated-load lifecycle safety
```

## Durable state boundary

Persist:

```txt
resource-ledger values
pressure-field channels
orchard-world trees and apples
construction-runtime catalog state and built objects
roster-runtime actors and roles
inventory-runtime items and equipped item
active-session day, phase, player, pests, score, message and ended state
explicit route/lifecycle continuation policy
committed clock and command sequence
random stream states and entity sequences
```

Never persist:

```txt
DOM nodes
canvas context or pixels
RAF request IDs
listener functions
renderer instances
raw engine references
subscriber callbacks
transient event arrays
uncommitted command candidates
```

## Authority constraints

```txt
runtime/run identity       -> owned by Gate 1
simulation tick identity   -> owned by Gate 2
public command admission   -> owned by Gate 3
transaction commit result  -> owned by Gate 4
random streams and replay  -> owned by Gate 5
save/load continuity       -> owned here at Gate 6
render frame identity      -> consumed, not recreated
```

## Save transaction

```txt
SaveRun
  -> validate command and expected slot revision
  -> acquire one committed durable-state receipt
  -> include continuation state and fingerprints
  -> validate envelope
  -> write candidate record
  -> atomically commit slot and slot index
  -> publish SaveResult
  -> journal
```

A rejected or failed save leaves slot revision and prior valid data unchanged.

## Load transaction

```txt
LoadRun
  -> validate command and slot revision
  -> read envelope
  -> checksum and schema validation
  -> ordered migration
  -> compatibility validation
  -> candidate graph construction
  -> complete hydration
  -> candidate fingerprint verification
  -> allocate load epoch
  -> fence predecessor work
  -> atomic authority transfer
  -> first restored frame acknowledgement
  -> predecessor retirement
  -> LoadResult and journal
```

A failure before first restored frame acknowledgement preserves the previous committed run and slot data.

## Required result envelope

```txt
commandId
transactionId
resultType
accepted
reason
saveId
slotId
previousSlotRevision
committedSlotRevision
schemaVersion
migrationPath
loadEpoch
restoredRunId
restoredSessionEpoch
restoredSimulationTickId
restoredStateFingerprint
firstRestoredFrameId
```

## Fixture gate

```txt
same-state roundtrip
future random continuation parity
slot compare-and-swap conflict
atomic storage failure preservation
old-version migration
unknown-version rejection
checksum corruption quarantine
candidate hydration rollback
stale predecessor rejection after load epoch
first restored canvas/HTML/GameHost parity
repeated save/load resource ownership
```
