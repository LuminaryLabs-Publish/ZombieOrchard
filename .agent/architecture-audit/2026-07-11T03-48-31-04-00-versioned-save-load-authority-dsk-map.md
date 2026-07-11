# Architecture audit — Versioned save/load authority DSK map

## Summary

The current architecture can produce aggregate presentation snapshots but cannot create or restore authoritative saves.

## Current graph

```txt
orchardPreset
  -> createOrchardGame
  -> independent mutable domain closures
  -> engine.snapshot aggregates domain snapshots
  -> HTML and canvas consume aggregate snapshot
```

## Missing graph

```txt
committed session state
  -> durable-state exporters
  -> schema/content/session/tick/seed envelope
  -> state fingerprint
  -> slot-index transaction
  -> persistence adapter
  -> typed save result

stored envelope
  -> parse and schema admission
  -> product/content validation
  -> migration
  -> domain validation
  -> staged restore
  -> atomic commit or rollback
  -> new loadEpoch
  -> one publication
  -> typed load result and first committed render observation
```

## Proposed parent DSK

```txt
zombie-orchard-persistence-authority
```

## Proposed kits

```txt
save-envelope-kit
save-schema-version-kit
content-identity-kit
save-slot-index-kit
committed-snapshot-export-kit
state-restore-kit
save-admission-validation-kit
save-migration-registry-kit
atomic-load-transaction-kit
browser-persistence-adapter-kit
load-epoch-authority-kit
save-load-result-journal-kit
save-roundtrip-fixture-kit
```

## Ownership rules

1. The session owner chooses when a committed state may be exported.
2. The clock owner supplies the committed simulation tick.
3. The command owner supplies the terminal command range.
4. The random owner supplies seed and stream cursors.
5. Each gameplay domain owns durable export, validation, staged restore, commit, and rollback.
6. The persistence owner owns schema, slot indexing, adapters, migration, and save/load results.
7. The renderer consumes slot and load observations but never mutates persistence state.
8. `GameHost` exposes detached JSON-safe observations, not live adapters or domain closures.

## Save envelope minimum

```txt
schemaVersion
productId
contentRevision
saveId
slotId
createdAt
updatedAt
sessionEpoch
committedTick
seed
randomCursors
commandRange
durableState
stateFingerprint
```

## Atomic load admission

```txt
read
  -> parse
  -> validate envelope
  -> migrate
  -> validate every domain payload
  -> stage every domain restore
  -> commit all domains
  -> allocate loadEpoch
  -> publish once
  -> render committed state
```

Any failure before commit must preserve the exact before fingerprint.

## Dependency rule

Do not implement this parent DSK before session, fixed clock, command transaction, and seeded replay owners exist. Otherwise the save envelope would serialize ambiguous or non-reproducible state.
