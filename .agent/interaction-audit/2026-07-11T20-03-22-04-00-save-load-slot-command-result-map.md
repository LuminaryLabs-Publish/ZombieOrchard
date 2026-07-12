# Interaction audit — Save / Load Slot Command and Result Map

## Plan ledger

**Goal:** replace direct route-only persistence affordances with explicit slot-targeted commands, typed results and frame acknowledgement.

- [x] Trace delegated DOM action handling.
- [x] Trace interface composition activation.
- [x] Trace Save Select action data.
- [x] Identify missing target, revision and result fields.
- [x] Define command/result contracts.
- [ ] Implement through the public capability gateway.

## Current input path

```txt
button[data-action]
  -> engine.command(interface-composition, activate, actionId)
  -> current interface domain returns static action descriptor
  -> optional child command
  -> optional route move
  -> DOM caller discards result
```

There is no save/load-specific path. The Save Select domain has no slot actions and no authoritative data source.

## Required public capabilities

```txt
OpenSaveSelect
SaveRun
LoadRun
DeleteSave
RenameSave
ExportSave
ImportSave
BackFromSaveSelect
```

Capabilities must be lifecycle- and route-admitted. Raw storage mutation must not be exposed through `GameHost`.

## Required SaveRun command

```txt
commandId
transactionId
runtimeId
runId
sessionEpoch
expectedLifecycle
expectedLifecycleRevision
expectedSimulationTickId
slotId
expectedSlotRevision
label
source
```

## Required LoadRun command

```txt
commandId
transactionId
runtimeId
expectedRunId
expectedSessionEpoch
expectedLifecycle
slotId
expectedSlotRevision
expectedSchemaVersion or compatibility policy
source
```

## Required result types

```txt
accepted
rejected-stale-runtime
rejected-stale-run
rejected-lifecycle
rejected-stale-slot
rejected-slot-conflict
rejected-incompatible-schema
rejected-incompatible-preset
rejected-corrupt
rejected-quarantined
failed-serialization
failed-storage
failed-quota
failed-migration
failed-candidate-validation
failed-first-frame
committed
```

## Result envelope

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
runId
sessionEpoch
simulationTickId
stateFingerprint
firstFrameId
```

## Interaction transaction

```txt
user chooses exact slot
  -> browser sends slotId and expected revision
  -> public capability gateway admits action
  -> persistence authority preflights without mutation
  -> save or load transaction commits or rolls back
  -> typed result retained
  -> authoritative slot index updates
  -> renderer projects result
  -> load result waits for first restored frame acknowledgement
```

## Conflict rule

Never silently retarget a stale save or load request to another slot or revision.

```txt
observed slot revision 4
current slot revision 5
  -> reject stale/conflict
  -> no overwrite
  -> no load from unexpected revision
```

## Idempotency rule

Duplicate command IDs return the original result. They do not create another slot revision, migration, graph swap or first-frame sequence.

## Required fixtures

```txt
exact slot targeting
stale slot conflict
concurrent save conflict
duplicate save command
duplicate load command
result retained by DOM caller
result projected on Save Select
result correlated with slot index revision
load result correlated with first restored frame
```

## Validation status

Documentation only. The current DOM input still calls the raw engine and discards command results.