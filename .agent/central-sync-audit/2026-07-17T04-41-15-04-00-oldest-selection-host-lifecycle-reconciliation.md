# Central sync audit: oldest-selection host lifecycle reconciliation

**Timestamp:** `2026-07-17T04-41-15-04-00`

## Selection

The current Publish organization contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten had central ledgers, root `.agent` state, and `main` heads matching their documented repo-local heads.

ZombieOrchard was the oldest synchronized eligible repository:

```txt
ZombieOrchard      2026-07-16T22-59-23-04-00 selected
TheUnmappedHouse   2026-07-16T23-40-57-04-00
PhantomCommand     2026-07-16T23-59-01-04-00
AetherVale         2026-07-17T00-39-47-04-00
TheLongHaul        2026-07-17T01-01-09-04-00
TheOpenAbove       2026-07-17T02-32-08-04-00
PrehistoricRush    2026-07-17T02-50-44-04-00
MyCozyIsland       2026-07-17T03-06-12-04-00
IntoTheMeadow      2026-07-17T03-44-31-04-00
HorrorCorridor     2026-07-17T03-58-09-04-00
```

## Reconciliation target

Central tracking must record:

- the browser host lifecycle audit status;
- the unchanged 27-surface implemented census;
- the 18 proposed host-lifecycle surfaces;
- the boot/RAF/listener/GameHost retirement finding;
- the repo-local output family;
- the documentation-only validation boundary;
- the final repo-local documentation head produced by this run.

## Boundary

Only ZombieOrchard is selected. No other Publish repository is modified.