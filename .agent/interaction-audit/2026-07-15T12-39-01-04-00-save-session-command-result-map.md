# Interaction audit: save-session command/result map

**Timestamp:** `2026-07-15T12-39-01-04-00`

## Summary

Current actions are route changes. None carries save identity, expected revision, storage result or whole-runtime adoption evidence.

## Plan ledger

**Goal:** replace ambiguous route-only entry with typed commands and results that settle exactly once.

- [x] Map current actions.
- [x] Identify missing identities and results.
- [x] Define command/result boundaries.
- [ ] Implement idempotency, stale rejection and visible acknowledgements.

## Current interaction map

```txt
Play button
  -> interface-composition.activate(play)
  -> move(active-session)

New Game button
  -> move(run-setup)

Start button
  -> move(active-session)

Save Select
  -> no inbound action
  -> Back only
```

## Required command/result map

| Command | Required result |
|---|---|
| `DiscoverSaveSlotsCommand` | `SaveCatalogResult` |
| `SelectSessionCommand` | `SessionSelectionResult` |
| `CreateNewSessionCommand` | `NewSessionResult` |
| `CommitSaveCommand` | `SaveCommitResult` |
| `DeleteSaveCommand` | `SaveDeleteResult` |
| `MigrateSaveCommand` | `SaveMigrationResult` |
| `RetireSessionCommand` | `SessionRetirementResult` |

Every command must bind `CommandId`, `StorageGeneration`, `SaveSlotId` where applicable, expected save/session revisions and caller capability. Duplicate, stale, incompatible, corrupt and retired work must return typed rejection without changing runtime state.

## Presentation acknowledgement

```txt
accepted catalog
  -> HTML Save Select receipt
  -> FirstSaveCatalogFrameAck

accepted session
  -> Canvas2D receipt
  -> HTML active-session receipt
  -> FirstLoadedSessionFrameAck
```

## Validation boundary

Documentation only. No command or result surface is implemented.
