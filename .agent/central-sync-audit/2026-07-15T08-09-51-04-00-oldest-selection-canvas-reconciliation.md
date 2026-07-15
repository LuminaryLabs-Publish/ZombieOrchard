# Central sync audit: Oldest-selection canvas reconciliation

**Timestamp:** `2026-07-15T08-09-51-04-00`

## Summary

ZombieOrchard is the selected repository because all higher-priority selection classes were empty and its central documentation timestamp was the oldest among the ten eligible synchronized repositories.

## Plan ledger

**Goal:** preserve a reproducible selection record and define the exact central ledger update required after repo-local documentation lands.

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten central ledger entries.
- [x] Confirm ten root `.agent` states.
- [x] Compare repo heads with recorded repo-local documentation heads.
- [x] Confirm zero new, missing, undocumented, root-agent-missing, or runtime-ahead repositories.
- [x] Select ZombieOrchard only.
- [x] Add repo-local timestamped audit state.
- [ ] Reconcile `LuminaryLabs-Dev/LuminaryLabs` after the final repo-local head is known.

## Timestamp order at selection

```txt
ZombieOrchard:   2026-07-15T02-38-45-04-00 selected
TheUnmappedHouse: 2026-07-15T02-59-31-04-00
PhantomCommand:  2026-07-15T03-24-35-04-00
AetherVale:      2026-07-15T03-41-50-04-00
TheLongHaul:     2026-07-15T04-40-29-04-00
MyCozyIsland:    2026-07-15T05-00-28-04-00
IntoTheMeadow:   2026-07-15T06-01-26-04-00
PrehistoricRush: 2026-07-15T06-39-22-04-00
HorrorCorridor:  2026-07-15T07-00-28-04-00
TheOpenAbove:    2026-07-15T07-39-52-04-00
```

## Central update contract

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
  -> update timestamp, status, finding, inventory, authority, output and final repo head

internal-change-log/2026-07-15T08-09-51-04-00-zombie-orchard-canvas-backing-store-dpr.md
  -> record selection, writes, findings, validation boundary and final heads
```
