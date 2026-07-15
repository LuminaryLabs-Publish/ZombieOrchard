# Central sync audit: oldest-selection player-control reconciliation

**Timestamp:** `2026-07-15T17-38-05-04-00`

## Summary

The full Publish comparison found no new, missing, undocumented, root-agent-missing, or runtime-ahead eligible repository. ZombieOrchard was selected as the oldest synchronized ledger entry and audited for player movement control coverage.

## Plan ledger

**Goal:** keep repo-local evidence and the central LuminaryLabs ledger aligned to the same selection, finding, inventory, and validation boundary.

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Compare every eligible current head with its documented repo-local head.
- [x] Select ZombieOrchard at `2026-07-15T12-39-01-04-00`.
- [x] Preserve the 27-kit inventory.
- [x] Add the player-control audit family.
- [ ] Update the central ledger and internal change log after repo-local publication.

## Selection result

```txt
selected: LuminaryLabs-Publish/ZombieOrchard
reason: oldest synchronized eligible timestamp
next oldest: LuminaryLabs-Publish/TheUnmappedHouse at 2026-07-15T12-59-24-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Reconciliation payload

```txt
status: player-movement-action-coverage-authority-audited
implemented surfaces: 27
planned player-control surfaces: 19
main finding: movement consumer exists but no shipped movement producer exists
runtime changed: no
branch created: no
pull request created: no
```

## Validation boundary

Central reconciliation records documentation evidence only and does not prove runtime movement, device support, artifact parity, Pages parity, or production readiness.
