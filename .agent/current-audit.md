# Current audit: ZombieOrchard

**Timestamp:** `2026-07-14T16-41-33-04-00`  
**Status:** `run-start-clean-reset-authority-central-reconciled`  
**Branch:** `main`

## Summary

ZombieOrchard has route transitions but no run lifecycle. One engine is constructed at browser boot; Play, New Game, Start, Pause, Title, and outcome navigation do not create, suspend, archive, reset, or replace mutable gameplay state.

## Plan ledger

**Goal:** preserve the complete repository breakdown while defining clean run start as one deterministic, all-participant adoption transaction.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority repository outranks the fallback rule.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read runtime, composition, interface, gameplay, render, proof, build, and deployment surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped clean-run reset audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run clean-run fixtures.

## Complete interaction loop

```txt
one browser boot
  -> one engine and one mutable domain graph
  -> one random orchard seed event
  -> perpetual RAF

Play or New Game -> Start
  -> interface route change only

entry, setup, pause, menus, settings, outcome
  -> runtime still ticks every domain
  -> pressure continues
  -> active-session continues until ended

outcome -> Title -> Play or Start
  -> same ended session and all predecessor mutations remain
  -> composition can return directly to outcome
```

## Domains in use

```txt
browser DOM, delegated input, Canvas2D, RAF, error panel, and public GameHost
runtime registration, commands, unconditional ticks, events, snapshots, subscriptions, and publication
12 interface domains and interface composition
resource ledger, pressure, orchard, construction, roster, and inventory
movement, collection, phases, pests, clearing, score, damage, failure, and outcome
run identity, deterministic seed, preset binding, predecessor settlement, candidate preparation, atomic adoption, rollback, and stale-work rejection
HTML and Canvas2D presentation
validation, static build, Pages deployment, and central tracking
```

## Implemented kits and services

```txt
27 total surfaces: 19 engine-installed and 8 host/tooling/support
runtime and scoped interface composition
12 route/interface domains
resource, pressure, orchard, construction, roster, and inventory services
active-session movement, collection, phases, pests, clearing, score, damage, and failure
Canvas2D and HTML projection
raw GameHost diagnostics
smoke, build, and Pages deployment
```

## Source-backed findings

- `createOrchardGame()` constructs all domain state once.
- `Play` and `Start` specify only `to: "active-session"`.
- Interface composition changes only `active` and `previous`.
- Runtime ticks every domain independent of the visible route.
- Pressure advances on title, setup, pause, menus, and outcome.
- Active gameplay advances on those routes until the session ends.
- Title and New Game do not reset any gameplay participant.
- An ended predecessor remains ended and can force the next start back to outcome.
- World generation uses unseeded `Math.random()` and exposes no reset or replay identity.
- Canvas2D always renders the retained world/session behind non-game screens.
- The smoke test covers only the first Play transition.

## Required parent domain

```txt
zombie-orchard-run-start-clean-reset-authority-domain
```

## Required transaction

```txt
RunStartCommand
  -> bind request, host, predecessor, preset, seed, and route identity
  -> allocate one successor RunId and RunGeneration
  -> privately prepare all gameplay and presentation candidates
  -> atomically adopt the complete candidate graph
  -> reject stale predecessor work
  -> publish typed results and participant receipts
  -> acknowledge the first matching HTML and Canvas2D frame
```

## Current file family

```txt
.agent/trackers/2026-07-14T16-41-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T16-41-33-04-00.md
.agent/architecture-audit/2026-07-14T16-41-33-04-00-run-start-clean-reset-dsk-map.md
.agent/render-audit/2026-07-14T16-41-33-04-00-stale-predecessor-world-frame-gap.md
.agent/gameplay-audit/2026-07-14T16-41-33-04-00-new-game-reuses-ended-session-loop.md
.agent/interaction-audit/2026-07-14T16-41-33-04-00-run-start-command-reset-result-map.md
.agent/run-reset-audit/2026-07-14T16-41-33-04-00-clean-run-generation-contract.md
.agent/deploy-audit/2026-07-14T16-41-33-04-00-clean-run-reset-fixture-gate.md
.agent/central-sync-audit/2026-07-14T16-41-33-04-00-oldest-selection-clean-run-reset-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, gameplay, route, renderer, random generation, dependency, package-script, test, workflow, build, or deployment behavior changed.