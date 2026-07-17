# Central sync audit: oldest selection interactive-control reconciliation

**Timestamp:** `2026-07-16T22-40-53-04-00`

## Selection

The full accessible Publish inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger and root `.agent` coverage, and all ten current heads matched their documented heads before this audit.

ZombieOrchard had the oldest synchronized central timestamp and was the only selected repository.

```txt
selected prior timestamp: 2026-07-16T16-40-45-04-00
next oldest: LuminaryLabs-Publish/TheUnmappedHouse
next timestamp: 2026-07-16T16-58-39-04-00
```

## Central update required

- Replace `repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md`.
- Add the matching internal change-log entry.
- Bind the final repo-local documentation head after all `.agent` writes.
- Preserve all earlier statuses and validation boundaries.

## Boundary

Documentation only. Runtime and deployment remain unchanged.
