# ZombieOrchard project breakdown

**Timestamp:** `2026-07-12T16-51-47-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `interface-action-admission-authority-audited`

## Summary

This run selected ZombieOrchard as the oldest eligible documented Publish repository. It preserves the complete 27-kit inventory and isolates a new interface authority gap: explicit invalid action IDs fall back to selection, nested gameplay rejections are discarded, and disabled actions are rendered as enabled.

## Plan ledger

**Goal:** document one exact, revision-bound interface action transaction from visible affordance or public command through gameplay effect, route transition and first visible result frame.

- [x] List all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Compare all eligible repositories with `LuminaryLabs-Dev/LuminaryLabs` ledgers.
- [x] Confirm no new, ledger-missing or root-`.agent`-missing eligible repository.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard as the oldest eligible ledger entry.
- [x] Trace the complete interaction loop.
- [x] Inventory all domains, kits and offered services.
- [x] Identify fail-open explicit action lookup.
- [x] Identify inconsistent generic/custom activation semantics.
- [x] Identify discarded nested command results.
- [x] Identify untruthful disabled-action projection.
- [x] Define the parent DSK/domain and fixture gate.
- [x] Update root `.agent` state, central ledger and internal change log.
- [ ] Implement runtime fixes and executable fixtures.

## Organization comparison

```txt
ZombieOrchard      2026-07-12T14-38-35-04-00 selected
MyCozyIsland       2026-07-12T14-59-01-04-00
TheUnmappedHouse   2026-07-12T15-08-07-04-00
AetherVale         2026-07-12T15-18-50-04-00
TheOpenAbove       2026-07-12T15-40-04-00
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
HTML button or GameHost caller
  -> engine.command(interface-composition, activate, actionId)
  -> current route domain activate
  -> exact lookup OR selected-index fallback
  -> actionRequested event
  -> optional nested gameplay command
  -> nested result discarded
  -> optional route move
  -> composition result and synchronous publication
  -> RAF canvas/HTML projection without result revision
```

## Domains in use

```txt
browser document/canvas/DOM/RAF/public GameHost
runtime registration/commands/ticks/events/snapshots/subscriptions/publication
11 generic scoped interface domains plus custom active-session
interface action identity/selection/availability/activation
interface composition/nested dispatch/routing/Outcome routing
runtime session/run generation/route and action-set admission
resource ledger/pressure/orchard/construction/roster/inventory
movement/phases/pests/damage/score/failure
canvas and HTML projection
Node smoke/static build/Pages/central tracking
```

## Kit census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

Exact kit and service mapping is recorded in `.agent/kit-registry.json`.

## Main source findings

1. `scoped-interface-domains.js` uses `find(actionId) || selectedIndex` for explicit activation.
2. `active-session` uses exact matching, so the contract differs by route.
3. `composition.js` discards the result of nested `engine.command` calls.
4. Construction can reject a build while composition reports accepted.
5. `html-interface-renderer.js` ignores `disabled` and result feedback.
6. Raw `GameHost.engine` commands have no route/action-set revision evidence.

## Required parent domain

```txt
zombie-orchard-interface-action-admission-authority-domain
```

## Required proof

```txt
invalid and missing IDs reject
selected activation is a separate command
stale route/action-set commands reject
disabled state matches visible control state
nested rejection propagates
successful action commits exactly once
duplicate command replays stable result
canvas and HTML cite one action result revision
source/dist/Pages results match
```

## Validation boundary

Documentation changed only. Runtime source, behavior, dependencies, scripts and deployment were not modified or executed.