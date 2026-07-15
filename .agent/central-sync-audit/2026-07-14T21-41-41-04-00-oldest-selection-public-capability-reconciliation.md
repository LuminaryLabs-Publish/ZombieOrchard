# Central sync audit: oldest selection and public capability reconciliation

**Timestamp:** `2026-07-14T21-41-41-04-00`

## Summary

The full Publish inventory contains 11 repositories. After excluding `TheCavalryOfRome`, all ten eligible repositories had central ledgers, root `.agent` state and aligned documented heads. ZombieOrchard was the oldest synchronized entry and was the only Publish repository modified.

## Plan ledger

**Goal:** preserve one-project-at-a-time selection and reconcile the repo-local public capability audit with `LuminaryLabs-Dev/LuminaryLabs`.

- [x] Enumerate 11 Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and ten root `.agent` states.
- [x] Confirm no higher-priority new, missing or runtime-ahead repository.
- [x] Select only ZombieOrchard by oldest timestamp.
- [x] Add the timestamped audit family on `main`.
- [x] Refresh root audit routing and registry.
- [x] Prepare the paired central ledger and internal change-log update.
- [x] Create no branch or pull request.

## Selected finding

The public global exposes the raw mutable engine and manual tick. Manual ticks advance all domains without rendering, while the next RAF advances again before presenting state. No capability, caller, revision, result or visible-frame authority binds this path.

## Central records

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
internal-change-log/2026-07-14T21-41-41-04-00-zombie-orchard-public-runtime-capability-frame-admission.md
```

## Validation boundary

The synchronization is documentation only. Runtime, public API, gameplay, rendering, tests, build and deployment remain unchanged.