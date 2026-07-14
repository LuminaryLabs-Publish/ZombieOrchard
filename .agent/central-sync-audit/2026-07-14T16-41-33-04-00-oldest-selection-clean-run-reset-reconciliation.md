# Central sync audit: oldest-selection clean-run reset reconciliation

**Timestamp:** `2026-07-14T16-41-33-04-00`

## Summary

All ten eligible Publish repositories were present in the central ledger, had root `.agent` state, and matched their recorded documentation heads. ZombieOrchard had the oldest eligible central timestamp and was selected alone.

## Plan ledger

**Goal:** preserve selection evidence and the exact central records required for this run.

- [x] Enumerate 11 Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledger entries.
- [x] Confirm ten root `.agent` states.
- [x] Confirm no eligible repository is runtime-ahead.
- [x] Select only ZombieOrchard by oldest central timestamp.
- [x] Add the timestamped repo-local audit family.
- [ ] Update `LuminaryLabs-Dev/LuminaryLabs` ledger and internal change log after the final repo-local head is known.

## Selection evidence

```txt
new eligible: 0
ledger missing: 0
root .agent missing: 0
runtime ahead: 0
selected: LuminaryLabs-Publish/ZombieOrchard
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Central outputs

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
internal-change-log/2026-07-14T16-41-33-04-00-zombie-orchard-clean-run-reset.md
```

Only ZombieOrchard is modified in the Publish organization for this run.