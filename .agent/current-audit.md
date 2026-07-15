# Current audit: ZombieOrchard route-bound simulation suspension

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Status:** `route-simulation-suspension-admission-authority-audited`  
**Retained status:** `canvas-backing-store-dpr-resize-authority-central-reconciled`  
**Branch:** `main`

## Summary

The runtime ticks all domains without consulting `interface-composition.active`. Route actions change only the selected HTML screen. Pressure growth, pest spawning, pest movement and damage can therefore continue while gameplay controls are replaced by Pause or management screens.

## Plan ledger

**Goal:** preserve current product domains while making route selection and simulation admission one transaction.

- [x] Complete organization, ledger, head and root-agent comparison.
- [x] Select ZombieOrchard as the only runtime-ahead eligible repository.
- [x] Inspect runtime tick order, route composition, product preset and both renderers.
- [x] Preserve all 27 implemented surfaces and services.
- [x] Define 20 route-suspension authority surfaces.
- [x] Add and route the timestamped audit family.
- [ ] Implement and prove route-bound suspension and resumption.

## Complete interaction loop

```txt
page load
  -> create all gameplay, interface and composition domains
  -> interface-composition starts at entry
  -> create Canvas2D and HTML renderers
  -> start RAF loop

every runtime tick
  -> pressure-field ticks regardless active route
  -> active-session ticks unless its run has ended
  -> pests may spawn, move and damage the player
  -> interface-composition checks ended state and may route to outcome
  -> Canvas2D renders orchard and active-session state
  -> HTML renders only the selected interface route

Pause, Build, Market, Roster, Inventory, Codex, Settings or Title
  -> interface-composition changes active route
  -> no simulation lease or suspension result changes
  -> pressure and active-session continue ticking behind the selected screen
  -> a paused or management-screen player can still be damaged
  -> terminal state can route to outcome without an admitted resume
```

## Domains in use

```txt
browser RAF, DOM input and page lifecycle
kit runtime registration, command dispatch, tick scheduling, events, snapshots and subscriptions
interface route identity, transition and active-screen projection
route-bound simulation admission, suspension, resumption and conflict handling
resource ledger, pressure field, orchard world, construction, roster and inventory
active-session movement, collection, phase, pest, damage, score and outcome
Canvas2D world rendering and HTML interface rendering
public GameHost diagnostics
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented inventory

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned route-suspension surfaces: 20
```

The complete kit-by-kit service list is in the current tracker and `.agent/kit-registry.json`.

## Source-backed findings

- Runtime ticks every domain.
- Pressure has no route predicate.
- Active-session ticks until `ended`, not until the route stops admitting gameplay.
- Pause and management transitions change interface state only.
- Active-session advances before composition checks defeat.
- Canvas2D continues rendering active-session state behind the selected HTML screen.
- No route revision, simulation lease, suspension result, resume result or matching frame acknowledgement exists.

## Main finding

`kit-runtime.tick()` iterates over every registered domain and calls every available `tick()` without consulting the active interface route. `pressure-field.tick()` always grows pressure, while `active-session.tick()` continues pest spawning, movement and player damage whenever the run has not ended. `interface-composition` changes only `state.active`; its route transitions do not publish or consume a simulation suspension lease.

Because the active-session kit is registered before interface composition, gameplay advances first on each tick and composition checks for defeat afterward. A player can therefore open Pause, Build, Market, Roster, Inventory or Codex, continue receiving damage behind that screen, and be routed to Outcome without an admitted Resume. Pressure also grows on Entry, Run Setup, Settings and Title.

## Required parent domain

`zombie-orchard-interface-route-simulation-suspension-authority-domain`

## Current file family

```txt
.agent/trackers/2026-07-15T08-26-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T08-26-01-04-00.md
.agent/architecture-audit/2026-07-15T08-26-01-04-00-route-simulation-suspension-dsk-map.md
.agent/render-audit/2026-07-15T08-26-01-04-00-hidden-gameplay-route-frame-gap.md
.agent/gameplay-audit/2026-07-15T08-26-01-04-00-paused-and-management-screen-damage-loop.md
.agent/interaction-audit/2026-07-15T08-26-01-04-00-route-simulation-command-result-map.md
.agent/route-suspension-audit/2026-07-15T08-26-01-04-00-active-route-tick-lease-contract.md
.agent/deploy-audit/2026-07-15T08-26-01-04-00-route-suspension-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T08-26-01-04-00-runtime-ahead-route-suspension-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source and behavior are unchanged.
