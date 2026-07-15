# Current audit: ZombieOrchard save-slot session selection

**Timestamp:** `2026-07-15T12-39-01-04-00`  
**Status:** `save-slot-session-selection-admission-authority-audited`  
**Retained status:** `route-simulation-suspension-admission-authority-central-reconciled`  
**Branch:** `main`

## Summary

The repository registers a `session-select` interface domain and the renderer supports slot cards, but the route is unreachable, empty and disconnected from storage. Play and New Game adopt active-session without a versioned save or new-session result.

## Plan ledger

**Goal:** preserve all product domains while introducing one durable session-selection and whole-runtime adoption authority.

- [x] Complete organization, ledger, head and root-agent comparison.
- [x] Select ZombieOrchard as the oldest synchronized eligible repository.
- [x] Inspect preset, interface domains, composition, renderer and smoke proof.
- [x] Preserve all 27 implemented surfaces and services.
- [x] Define 20 save-slot/session-selection authority surfaces.
- [x] Add and route the timestamped audit family.
- [ ] Implement and prove save discovery, commit, load, migration and reload.

## Complete interaction loop

```txt
page load
  -> create state-bearing runtime domains
  -> create all interface domains including session-select
  -> start interface-composition at entry

entry Play
  -> direct move to active-session
  -> no save catalog or selected slot

entry New Game
  -> move to run-setup
  -> Start directly moves to active-session
  -> no slot allocation or initial durable commit

session-select
  -> no action routes here
  -> only Back is available
  -> renderer reads current.meta.slots
  -> current preset supplies no slot records

smoke
  -> requires Play to move directly to active-session
  -> does not test storage or reload
```

## Domains in use

```txt
browser document, RAF, DOM input and lifecycle
kit registration, commands, ticking, events, snapshots and subscriptions
interface route identity and active-screen projection
save schema, save-slot identity, discovery, validation, migration and storage
session selection, new-run allocation, atomic runtime adoption and conflict handling
resource, pressure, orchard, construction, roster, inventory and active-session state
Canvas2D world rendering and HTML route/card rendering
GameHost diagnostics, smoke validation, static build, Pages and audit governance
```

## Implemented inventory

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned save/session surfaces: 20
```

The complete kit-by-kit service list is in the current tracker and `.agent/kit-registry.json`.

## Source-backed findings

- `session-select-domain-kit` is installed.
- No action targets `session-select`.
- The route exposes only Back.
- The renderer can draw `current.meta.slots`.
- The preset supplies no slots.
- No localStorage, IndexedDB, schema, migration, serialization, load, commit or delete authority is present.
- Play routes directly to active-session.
- The smoke test requires that direct route.

## Main finding

Save Select is a presentation stub, not a session-selection system. The current route graph bypasses it, and active-session has no accepted `SaveSlotId`, `SaveRevision`, `RunGeneration`, load result or durable new-session result. Any future persistence added below individual domains would risk partial restore unless one authority prepares and adopts all state-bearing participants atomically.

## Required parent domain

`zombie-orchard-save-slot-session-selection-admission-authority-domain`

## Current file family

```txt
.agent/trackers/2026-07-15T12-39-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T12-39-01-04-00.md
.agent/architecture-audit/2026-07-15T12-39-01-04-00-save-slot-session-selection-dsk-map.md
.agent/render-audit/2026-07-15T12-39-01-04-00-unreachable-empty-save-select-gap.md
.agent/gameplay-audit/2026-07-15T12-39-01-04-00-play-new-game-session-adoption-loop.md
.agent/interaction-audit/2026-07-15T12-39-01-04-00-save-session-command-result-map.md
.agent/persistence-audit/2026-07-15T12-39-01-04-00-save-slot-schema-adoption-contract.md
.agent/deploy-audit/2026-07-15T12-39-01-04-00-save-reload-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T12-39-01-04-00-oldest-selection-save-session-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source and behavior are unchanged.
