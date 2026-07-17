# Central sync audit: oldest-selection stamina reconciliation

**Timestamp:** `2026-07-17T09-43-24-04-00`

## Selection

The full accessible `LuminaryLabs-Publish` inventory contains 11 repositories. `LuminaryLabs-Publish/TheCavalryOfRome` was excluded. The latest completed organization comparison reported all ten eligible repositories centrally tracked, root-agent-covered, documented and synchronized. ZombieOrchard was the next oldest eligible ledger at `2026-07-17T04-41-15-04-00` and was the only repository selected.

## Reconciliation scope

```txt
selected repository: LuminaryLabs-Publish/ZombieOrchard
repo-local audit: player stamina effort, recovery and projection
central repository: LuminaryLabs-Dev/LuminaryLabs
central ledger path: repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
change-log path: internal-change-log/2026-07-17T09-43-24-04-00-zombie-orchard-player-stamina-adoption.md
```

## Findings to bind centrally

- `player.stamina` is initialized and snapshotted.
- Move, collect, clear, next-phase and tick do not consume or restore it.
- No exhaustion or recovery policy exists.
- HUD and outcome projections omit stamina.
- No typed stamina result or matching visible-frame acknowledgement exists.
- No stamina-specific fixture exists.

## Boundary

This run changes documentation only and preserves all previous ZombieOrchard audit statuses. Runtime and deployment work remain proposed.