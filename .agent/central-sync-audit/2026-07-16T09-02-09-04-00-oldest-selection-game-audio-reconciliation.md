# Central sync audit: oldest selection and game audio reconciliation

**Timestamp:** `2026-07-16T09-02-09-04-00`  
**Publish repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Central repository:** `LuminaryLabs-Dev/LuminaryLabs`

## Summary

The current Publish inventory contained 11 repositories. Ten were eligible after excluding TheCavalryOfRome. All ten retained central ledger and root `.agent` coverage. ZombieOrchard had the oldest synchronized central timestamp and was the only Publish repository selected.

## Plan ledger

**Goal:** reconcile the repo-local game-audio audit into the central ledger without changing runtime code or another Publish project.

- [x] Compare the full organization inventory.
- [x] Confirm ten eligible central ledgers.
- [x] Confirm root `.agent` coverage.
- [x] Select only ZombieOrchard.
- [x] Add timestamped repo-local documentation.
- [x] Refresh required root `.agent` files.
- [x] Bind the final repo-local documentation head in the central ledger.
- [x] Add the central internal change log.
- [x] Push only to `main` and create no branch or pull request.

## Selection

```txt
selected: LuminaryLabs-Publish/ZombieOrchard
reason: oldest synchronized eligible central timestamp
selected timestamp: 2026-07-16T03-41-28-04-00
next oldest: LuminaryLabs-Publish/TheUnmappedHouse
next timestamp: 2026-07-16T04-02-40-04-00
```

## Central status

`game-audio-event-projection-authority-central-reconciled`

## Boundary

Documentation only. The recurring task remains active.