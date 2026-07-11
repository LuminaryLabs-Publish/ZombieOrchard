# Persistence audit — Save envelope and migration contract

## Current state

```txt
storage adapter: absent
slot index: absent
save schema: absent
content identity: absent
export contract: absent
restore contract: absent
migration: absent
atomic load: absent
load epoch: absent
save/load journal: absent
fixtures: absent
```

## Contract

### Save

```txt
request save
  -> verify session state is exportable
  -> wait for committed command/tick boundary
  -> export durable state from every owner
  -> validate cross-domain invariants
  -> create canonical fingerprint
  -> wrap in versioned envelope
  -> atomically persist payload
  -> update slot index
  -> publish one terminal save result
```

### Load

```txt
request load
  -> read slot payload
  -> parse and validate outer envelope
  -> verify product/content identity
  -> migrate to current schema
  -> validate every domain payload
  -> stage complete restore
  -> commit all domains or none
  -> allocate loadEpoch
  -> publish one terminal load result
```

## Migration rules

1. Migrations are pure and version-to-version.
2. Every migration reports source version, target version, changes, warnings, and fingerprint.
3. Unknown future versions reject without mutation.
4. Missing required content IDs reject or use an explicitly versioned compatibility policy.
5. Migration never reads live mutable domain state.
6. Migration output is revalidated before staging.

## Adapter contract

```txt
list()
read(slotId)
writeAtomic(slotId, envelope)
deleteAtomic(slotId)
```

Return typed results for unavailable storage, quota, serialization, parse, permission, and conflict failures.

## Slot index

Slot metadata is derived from committed envelopes and stored transactionally:

```txt
slotId
saveId
label
schemaVersion
updatedAt
progress
stateFingerprint
status
```

## Security and integrity note

Treat stored JSON as untrusted input. Validate types, finite numeric bounds, arrays, IDs, and cross-domain references before staging any live mutation.
