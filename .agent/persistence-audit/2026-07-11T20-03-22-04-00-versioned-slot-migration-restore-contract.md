# Persistence audit — Versioned Slot, Migration and Restore Contract

## Plan ledger

**Goal:** define a backend-independent persistence contract that preserves exact gameplay continuation and never exposes partial, stale or corrupt state as authoritative.

- [x] Define save envelope identity and versioning.
- [x] Define durable-state and transient-state boundaries.
- [x] Define atomic slot semantics.
- [x] Define migration and corruption handling.
- [x] Define candidate restore and authority transfer.
- [x] Define observation and fixture requirements.
- [ ] Implement after Gates 1–5.

## Persistence invariants

1. A save is derived from one committed simulation tick.
2. A slot revision changes only after an atomic successful write.
3. Failed writes preserve the previous valid slot.
4. Loaded state is never applied domain-by-domain to the live graph.
5. Migration is pure, ordered, deterministic and version-specific.
6. Unknown future schemas are rejected without mutation.
7. Corrupt data is quarantined without deleting original evidence.
8. Random continuation and entity sequences are part of durable state.
9. Load allocates a new epoch and rejects predecessor work.
10. A load is not complete until the first restored frame is acknowledged.

## Save envelope

```json
{
  "schemaId": "zombie-orchard-save",
  "schemaVersion": 1,
  "saveId": "...",
  "slotId": "...",
  "slotRevision": 1,
  "createdAt": "...",
  "updatedAt": "...",
  "preset": {
    "id": "orchard-default",
    "fingerprint": "..."
  },
  "authority": {
    "runtimeId": "...",
    "runId": "...",
    "sessionEpoch": 1,
    "lifecycle": "active",
    "simulationTickId": 0,
    "commandSequence": 0
  },
  "random": {
    "policyId": "...",
    "policyVersion": 1,
    "streams": {},
    "entitySequences": {}
  },
  "state": {},
  "stateFingerprint": "...",
  "checksum": "..."
}
```

## Durable state allowlist

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
explicit lifecycle/route continuation fields
fixed-step clock continuation
command sequence
random streams and entity sequences
```

## Excluded state

```txt
DOM and canvas objects
render contexts
RAF/listener handles
subscribers
raw engine references
transient command candidates
uncommitted events
presentation caches
```

## Slot index

The slot index is authoritative metadata, not a copy of preset UI configuration.

```txt
slotIndexRevision
slots[]:
  slotId
  slotRevision
  saveId
  label
  updatedAt
  schemaVersion
  runSummary
  compatibility
  corruption
  stateFingerprint
```

## Atomic write contract

```txt
writeSlot(candidate, expectedRevision)
```

Results:

```txt
committed
stale-revision
conflict
quota
serialization-failure
storage-failure
validation-failure
```

The adapter must atomically commit the slot record and slot-index update or commit neither.

## Migration contract

```txt
migrate(envelope, fromVersion, toVersion)
  -> pure result
  -> no storage mutation
  -> no runtime mutation
  -> deterministic output fingerprint
```

Each step declares:

```txt
migrationId
fromVersion
toVersion
inputSchemaFingerprint
outputSchemaFingerprint
```

## Corruption contract

Checksum or structural failure produces:

```txt
quarantineId
slotId
observedSlotRevision
reason
originalBytesReference
observedChecksum
expectedChecksum
recoverableActions
```

Quarantine must not overwrite or silently repair the original record.

## Candidate restore contract

```txt
read and validate envelope
  -> migrate candidate copy
  -> validate preset/policy compatibility
  -> create fresh candidate graph
  -> hydrate every durable domain
  -> hydrate clock, commands, random streams and entity sequences
  -> calculate candidate state fingerprint
  -> compare with envelope fingerprint
  -> return candidate or typed failure
```

No live authority changes during this phase.

## Load commit contract

```txt
admit LoadRun
  -> allocate loadEpoch
  -> fence predecessor command/tick/frame admission
  -> atomically swap candidate graph and authority
  -> bind route to loaded lifecycle
  -> render first restored frame
  -> acknowledge canvas, HTML and GameHost parity
  -> retire predecessor graph
  -> publish committed LoadResult
```

A first-frame failure rolls back to the predecessor graph when that graph is still healthy. If rollback is impossible, transition to a typed terminal recovery state rather than exposing a mixed graph.

## Autosave policy requirements

Autosave is not implicit. Define explicit admitted checkpoints, such as:

```txt
end of committed day transition
successful construction transaction
explicit pause checkpoint
terminal outcome pre-summary checkpoint
manual save command
```

Autosave must never run from an arbitrary render callback or partially committed composite command.

## Cross-context policy

If multiple tabs are supported:

```txt
slot compare-and-swap revision
writer identity
storage event observation
conflict result
no last-writer-wins overwrite without explicit policy
```

## Required observations

```txt
active saveId and slotId
slot index revision
latest save/load result
schema version
migration path
load epoch
restored fingerprint
first restored frame ID
quarantine summaries
bounded journal
```

## Fixture matrix

| Fixture | Expected proof |
|---|---|
| roundtrip | same durable fingerprint |
| continuation | same future apple/pest sequence |
| stale write | typed conflict, no overwrite |
| storage failure | prior valid slot retained |
| migration | deterministic current envelope |
| future schema | typed incompatibility |
| corruption | quarantine, no live mutation |
| hydrate failure | predecessor run retained |
| load commit | new epoch and restored frame parity |
| repeated load | no RAF/listener/resource duplication |

## Validation status

Documentation only. No persistence backend, envelope, migration or restore transaction currently exists.