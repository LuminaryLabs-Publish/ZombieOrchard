# Architecture audit: save-slot session selection DSK map

**Timestamp:** `2026-07-15T12-39-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

The product already separates interface, gameplay and rendering domains, but it has no owner for durable session identity or whole-runtime restore. Save Select is only a scoped interface domain.

## Plan ledger

**Goal:** add one semantic authority above storage and existing runtime domains without moving product logic into persistence.

- [x] Map current route, runtime and renderer owners.
- [x] Preserve all existing kit responsibilities.
- [x] Define the missing parent domain and child services.
- [ ] Implement only after a save-schema and atomic-adoption fixture is fixed.

## Current ownership

```txt
entry-domain-kit
  -> Play and New Game actions

session-select-domain-kit
  -> title, metadata and Back action only

interface-composition-kit
  -> direct route movement

runtime domains
  -> mutable resource, pressure, world, construction, roster,
     inventory and active-session state

html-interface-render-kit
  -> renders slot cards from current.meta.slots

kit-runtime
  -> snapshots domains independently
```

## Missing parent domain

`zombie-orchard-save-slot-session-selection-admission-authority-domain`

## Planned DSK family

```txt
save-slot-session-selection-admission-authority-domain
  identity
    save-schema-kit
    save-slot-identity-kit
    save-catalog-kit

  storage
    save-discovery-kit
    save-record-validation-kit
    state-serialization-kit
    state-migration-kit
    save-commit-command-kit
    save-load-command-kit
    save-delete-command-kit

  session
    session-selection-command-kit
    new-run-command-kit
    atomic-runtime-adoption-kit
    storage-failure-rollback-kit
    stale-save-conflict-kit
    session-route-result-kit

  presentation and proof
    persistence-presentation-receipt-kit
    first-loaded-session-frame-ack-kit
    save-slot-fixture-kit
```

## Command boundary

```txt
DiscoverSaveSlotsCommand
  -> publish validated immutable slot summaries

SelectSessionCommand
  -> validate or migrate one record
  -> prepare every participating runtime domain
  -> atomically adopt all state or preserve the predecessor
  -> publish SessionSelectionResult
  -> route only after acceptance

CreateNewSessionCommand
  -> allocate RunGeneration and SaveSlotId
  -> reset every participant
  -> commit the initial durable document
  -> publish NewSessionResult
```

## Non-goals

Do not move orchard generation, pest behavior, resource rules, construction, roster, inventory, Canvas2D drawing, HTML layout or deployment into the persistence authority.

## Validation boundary

Documentation only. No DSK implementation exists.
