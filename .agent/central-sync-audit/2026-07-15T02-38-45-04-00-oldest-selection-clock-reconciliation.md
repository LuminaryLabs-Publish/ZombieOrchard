# Central sync audit: ZombieOrchard clock reconciliation

## Selection

The current Publish organization inventory contains 11 repositories. `TheCavalryOfRome` was excluded. All ten eligible repositories had a central ledger and root `.agent` state, and no eligible repository was new, missing, undocumented or runtime-ahead. ZombieOrchard remained the oldest synchronized eligible ledger entry.

## Repo-local change

Added the `2026-07-15T02-38-45-04-00` tracker, turn ledger and RAF clock audit family. Refreshed `START_HERE.md`, `current-audit.md`, `next-steps.md`, `known-gaps.md`, `validation.md` and `kit-registry.json`.

## Finding

The browser host ignores the RAF timestamp and submits one fixed `1/60` step per callback. Time-based gameplay and runtime elapsed therefore follow callback frequency. No accumulator, catch-up budget, visibility policy, dropped-time diagnostic or clock-bound visible-frame receipt exists.

## Central records required

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
internal-change-log/2026-07-15T02-38-45-04-00-zombie-orchard-raf-clock-admission.md
```

## Validation boundary

Documentation only. The central ledger must record the final repo-local documentation head after all root files and the registry are updated.