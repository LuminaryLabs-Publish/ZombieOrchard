# Persistence audit: save-slot schema and adoption contract

**Timestamp:** `2026-07-15T12-39-01-04-00`

## Summary

ZombieOrchard has independently mutable runtime domains but no durable document that binds them into one restorable session.

## Plan ledger

**Goal:** define one versioned save document and an all-or-nothing adoption transaction.

- [x] Inventory state-bearing domains.
- [x] Identify missing schema, migration and storage ownership.
- [x] Define preparation, commit and rollback boundaries.
- [ ] Implement after deterministic reset and route-suspension contracts are compatible.

## State participants

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
interface-composition route/session metadata
runtime frame and elapsed policy where intentionally persisted
```

## Required save envelope

```txt
SaveDocument
  schemaVersion
  saveSlotId
  saveRevision
  createdAt
  committedAt
  runGeneration
  productVersion
  checksum
  state
    resources
    pressure
    orchard
    construction
    roster
    inventory
    activeSession
    route
```

## Adoption contract

```txt
read immutable bytes
  -> parse and validate envelope
  -> verify schema and checksum
  -> migrate into current schema when supported
  -> prepare every domain without publishing
  -> verify cross-domain invariants
  -> atomically adopt all prepared state
  -> retire predecessor generation
  -> publish SessionSelectionResult
```

Failure at any step preserves the previous runtime and publishes a typed rejection. No domain may adopt before all required participants are prepared.

## Required persistence policies

```txt
atomic write or predecessor preservation
stale saveRevision rejection
single-writer or explicit conflict policy
corrupt/incompatible classification
migration provenance
slot deletion receipt
storage unavailable/quota failure classification
reload recovery
session retirement
```

## Validation boundary

No storage API, schema, migration, checksum, transaction or fixture exists in the current source.
