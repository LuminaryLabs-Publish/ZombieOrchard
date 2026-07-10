# Known gaps — ZombieOrchard

Last aligned: `2026-07-10T07-08-10-04-00`

## Critical blocker

`ZombieOrchard` needs Market/Exchange result-ledger proof before economy expansion, renderer work, or visual polish.

## Market source gaps

```txt
No Market source manifest.
No stable Market action IDs.
No Market action catalog.
No Market source snapshot.
No price source rows.
No capacity policy rows.
No resource/inventory preflight rows.
```

## Command/result gaps

```txt
engine.command() returns command results, but Market-specific result rows are not source-owned.
No stable accepted/rejected/no_mutation Market status rows.
No stable Market reason-code catalog.
No before/after resource snapshots.
No resource transaction history.
No inventory purchase intake rows.
No ordered Market command/result journal.
```

## Interaction gaps

```txt
interface-composition can dispatch nested action.command values.
Nested engine.command results are dropped by the interface adapter.
The UI cannot explain which nested action succeeded or failed.
Rejected/no-op Market actions have no projected reason row.
```

## Render/readback gaps

```txt
Exchange remains a generic Back-only screen.
HTML renderer has no Market-specific projection/readback branch.
No Market rows are rendered for accepted/rejected transactions.
GameHost exposes raw engine/getState/tick only.
No GameHost.market diagnostics block exists.
```

## Validation gaps

```txt
Existing smoke proves entry -> play -> apples exist.
No DOM-free Market fixture exists.
No package script runs Market result fixtures.
No browser smoke verifies Exchange projection.
No build gate asserts Market fixture output.
```

## Safe next gap closure

```txt
Market source manifest
  -> Market command envelope
  -> Market preflight/result rows
  -> nested-result retention adapter
  -> resource transaction and inventory intake rows
  -> Exchange projection/readback
  -> GameHost.market diagnostics
  -> DOM-free fixture
```
