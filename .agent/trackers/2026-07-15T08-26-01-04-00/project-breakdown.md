# Project breakdown: ZombieOrchard route-bound simulation suspension

**Timestamp:** `2026-07-15T08-26-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `route-simulation-suspension-admission-authority-audited`

## Summary

ZombieOrchard separates interface routing from gameplay ticking. The runtime ticks every domain on every host step, while interface composition only changes which HTML screen is visible. Pressure growth, pest spawning, pest movement and player damage therefore continue during Pause and every management or title-facing route.

## Plan ledger

**Goal:** make every interface transition atomically adopt an explicit simulation policy so only admitted gameplay routes may advance pressure and active-session state.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible central ledgers, current heads and root `.agent` entrypoints.
- [x] Detect ZombieOrchard's completed canvas audit as the sole runtime-ahead eligible state.
- [x] Confirm no new, ledger-missing, root-agent-missing or wholly undocumented eligible repository.
- [x] Select only ZombieOrchard because its completed canvas audit advanced beyond the central ledger.
- [x] Identify the complete interaction loop, domains, all 27 implemented kits and their services.
- [x] Trace route transitions, runtime tick order, pressure growth, active-session hazards, outcome routing and both render surfaces.
- [x] Define one route-bound simulation suspension authority with 20 planned surfaces.
- [x] Add the `2026-07-15T08-26-01-04-00` tracker and audit family.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Implement and execute route suspension, resume, terminal, browser, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 1
selected: LuminaryLabs-Publish/ZombieOrchard
selection reason: completed repo-local canvas audit ahead of central ledger
prior central timestamp: 2026-07-15T02-38-45-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

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

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | kit registration, domain creation, command dispatch, delta clamping, frame/elapsed tracking, unconditional domain ticking, events, snapshots and subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events and snapshots |
| `entry-domain-kit` | Play, New Game and Settings |
| `session-select-domain-kit` | save-select projection and Back |
| `run-setup-domain-kit` | run setup projection, Start and Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest spawning/movement, damage, clearing, score and failure |
| `interrupt-domain-kit` | Pause, Resume and Title |
| `construction-domain-kit` | construction projection, Storage Shed action and Back |
| `exchange-domain-kit` | market projection and Back |
| `roster-domain-kit` | roster projection and Back |
| `inventory-domain-kit` | inventory projection and Back |
| `knowledge-domain-kit` | codex projection and Back |
| `preferences-domain-kit` | settings projection and Back |
| `outcome-domain-kit` | outcome projection and Title |
| `interface-composition-kit` | route transitions, nested commands, Back and outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants and snapshots |
| `pressure-field-kit` | pressure adjustment, unconditional time-based growth and snapshots |
| `orchard-world-kit` | tree/apple generation, collection, refill, bounds and snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages and snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages and snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and world projection |
| `html-interface-render-kit` | delegated actions/commands and active-route HTML projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback and manual tick |
| `smoke-fixture-kit` | entry, first Play and apple assertions |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned route-suspension surfaces including parent: 20
new runtime kit IDs added by this audit: 0
```

## Source-backed findings

- `src/kits/runtime.js` calls `domain.tick?.(ctx.delta)` for every registered domain.
- `src/kits/game-domains.js` grows `rowPressure` and `curse` on every pressure tick.
- `active-session.tick()` checks only `state.ended`, not the active interface route.
- Night pests can spawn, move and damage the player while another interface route is visible.
- `src/kits/composition.js` changes `state.active` but owns no simulation lease or tick gate.
- The active-session domain is registered before interface composition, so gameplay advances before defeat routing on each tick.
- Pause, Build, Market, Roster, Inventory and Codex all transition away from `active-session` without suspending it.
- Entry, Run Setup, Settings and Title do not suspend pressure growth.
- Canvas2D continues projecting active-session state while HTML replaces the HUD with the selected route.
- Existing smoke coverage does not assert pause or management-screen immutability.

## Main authority gap

`kit-runtime.tick()` iterates over every registered domain and calls every available `tick()` without consulting the active interface route. `pressure-field.tick()` always grows pressure, while `active-session.tick()` continues pest spawning, movement and player damage whenever the run has not ended. `interface-composition` changes only `state.active`; its route transitions do not publish or consume a simulation suspension lease.

Because the active-session kit is registered before interface composition, gameplay advances first on each tick and composition checks for defeat afterward. A player can therefore open Pause, Build, Market, Roster, Inventory or Codex, continue receiving damage behind that screen, and be routed to Outcome without an admitted Resume. Pressure also grows on Entry, Run Setup, Settings and Title.

## Required authority

`zombie-orchard-interface-route-simulation-suspension-authority-domain`

```txt
RouteSimulationAdmissionCommand
  -> bind RunGeneration RouteRevision TransitionCommandId and expected SimulationRevision
  -> resolve the destination route and its SimulationPolicyDescriptor
  -> classify running suspended background-safe terminal or retired
  -> prepare pressure and active-session tick leases
  -> atomically adopt the route and simulation policy
  -> reject stale duplicate conflicting or retired transitions
  -> publish RouteSimulationAdmissionResult
  -> render Canvas2D and HTML from the accepted SimulationRevision
  -> publish FirstRouteBoundVisibleFrameAck

ResumeSimulationCommand
  -> require the matching suspended run and route revision
  -> settle stale input and elapsed-time debt
  -> reactivate pressure and active-session ticks exactly once
  -> publish ResumeSimulationResult
```

## Planned authority surfaces

- `zombie-orchard-interface-route-simulation-suspension-authority-domain`
- `route-identity-kit`
- `run-generation-kit`
- `route-transition-command-kit`
- `simulation-policy-descriptor-kit`
- `simulation-lease-kit`
- `tick-eligibility-kit`
- `pressure-tick-admission-kit`
- `active-session-tick-admission-kit`
- `interrupt-suspension-kit`
- `management-screen-suspension-kit`
- `background-simulation-policy-kit`
- `resume-settlement-kit`
- `route-transition-conflict-kit`
- `simulation-suspension-result-kit`
- `route-transition-result-kit`
- `simulation-revision-kit`
- `route-bound-presentation-receipt-kit`
- `first-route-bound-visible-frame-ack-kit`
- `route-suspension-fixture-kit`

## Required output

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

Documentation only. Runtime JavaScript, gameplay, timing, rendering, public APIs, dependencies, scripts, tests, workflows and deployment are unchanged. No pause safety, route-bound simulation, resume correctness, terminal settlement, visible-frame convergence, artifact parity or production readiness is claimed.
