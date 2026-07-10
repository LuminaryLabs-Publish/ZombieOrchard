# Known gaps — ZombieOrchard

## Primary gap

Market result retention and readback are missing.

```txt
engine.command() returns command results
interface-composition dispatches nested action.command
nested command result is not retained
Exchange remains Back-only
HTML renderer has no Market projection/readback
GameHost has no Market diagnostics beyond raw engine state
```

## Specific gaps

1. No stable Market action/source manifest.
2. No Market price and capacity source rows.
3. No Market preflight rows for accepted/rejected paths.
4. Nested `action.command` results are dropped by `interface-composition`.
5. No Market command/result journal.
6. No resource transaction history tied to Market actions.
7. No inventory purchase intake rows tied to Market actions.
8. Exchange has no Market-specific projection.
9. HTML renderer has no Market readback branch.
10. `GameHost` exposes raw `engine/getState/tick` only.
11. Existing smoke coverage proves reachability, not Market accepted/rejected behavior.
12. No DOM-free Market fixture exists yet.

## Explicit non-gaps for next pass

These are not the next blocker:

```txt
runtime rewrite
renderer rewrite
visual polish
economy expansion
new Market art
new orchard content
```
