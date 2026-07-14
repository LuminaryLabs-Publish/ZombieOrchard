# Central sync audit: inventory equipment reconciliation

**Timestamp:** `2026-07-14T05-40-42-04-00`  
**Publish repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Central repository:** `LuminaryLabs-Dev/LuminaryLabs`

## Summary

This run selected ZombieOrchard after comparing all current Publish repositories with central tracking. The repo-local update adds a focused inventory-equipment gameplay-adoption audit while preserving the existing interaction, domain, kit, and service census.

## Plan ledger

**Goal:** keep the repo-local audit family and central ledger mutually attributable.

- [x] Confirm 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledger entries and root `.agent` states.
- [x] Confirm no higher-priority selection class is populated.
- [x] Select only ZombieOrchard under the oldest eligible rule.
- [x] Add the `2026-07-14T05-40-42-04-00` audit family.
- [x] Refresh required root `.agent` documents and registry.
- [x] Prepare the central ledger and internal change-log update.
- [x] Keep all writes on `main` with no branch or pull request.

## Reconciled finding

```txt
inventory stores items and equipped ID
browser inventory exposes no Equip action
raw equip accepts arbitrary IDs
clear action ignores equipped state
HTML does not mark equipped item
HUD and Canvas2D omit equipment
no equipment revision, effect receipt, rollback, or visible-frame proof exists
```

## Central records

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
internal-change-log/2026-07-14T05-40-42-04-00-zombie-orchard-inventory-equipment-adoption.md
```

## Required authority

```txt
zombie-orchard-inventory-equipment-gameplay-adoption-authority-domain
```

## Validation boundary

Documentation only. Runtime, gameplay, rendering, testing, build, and deployment behavior remain unchanged.