# Central sync audit: oldest-selection save-session reconciliation

**Timestamp:** `2026-07-15T12-39-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

## Summary

The full Publish inventory contains 11 accessible repositories. TheCavalryOfRome is excluded. All ten eligible repositories have central-ledger and root `.agent` coverage, and all current heads match their documented repo-local heads. ZombieOrchard had the oldest synchronized central timestamp.

## Plan ledger

**Goal:** preserve the selection proof and central reconciliation requirements for this one-repository audit.

- [x] Enumerate the organization inventory.
- [x] Verify ten eligible ledger entries.
- [x] Verify ten root `.agent` states.
- [x] Compare all eligible current heads with documented heads.
- [x] Select only ZombieOrchard by the oldest synchronized timestamp.
- [x] Add the `2026-07-15T12-39-01-04-00` repo-local audit family.
- [x] Prepare one central ledger update and one internal change-log entry.
- [x] Create no branch or pull request.

## Selection evidence

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/ZombieOrchard
selection reason: oldest synchronized central-ledger timestamp
prior central timestamp: 2026-07-15T08-26-01-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Central records

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
internal-change-log/2026-07-15T12-39-01-04-00-zombie-orchard-save-slot-session-selection.md
```

## Central finding

The Save Select route is registered but unreachable and has no catalog or persistence backing. Play and New Game enter the active session without an accepted save/load/new-session result.

## Validation boundary

Central reconciliation records documentation findings only.
