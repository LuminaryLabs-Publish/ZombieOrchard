# Current audit: ZombieOrchard

**Timestamp:** `2026-07-13T07-41-11-04-00`  
**Status:** `canvas-html-frame-coherence-authority-central-reconciled`  
**Branch:** `main`

## Summary

ZombieOrchard projects one logical runtime state through two visible surfaces, but no authority proves that the canvas and HTML committed the same frame. `engine.tick()` first publishes a snapshot through `notify()` and then returns a separately captured snapshot. The browser host renders the canvas and HTML sequentially from the returned snapshot, with no frame identity, surface revision, terminal projection results, atomic commit, recovery result, or visible-frame acknowledgement.

## Plan ledger

**Goal:** reconcile the complete repository breakdown and preserve one explicit frame-coherence authority boundary.

- [x] Compare the current Publish inventory and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no higher-priority new, missing, or unsynchronized eligible repository exists.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read runtime, host, composition, gameplay, renderer, diagnostic, and package surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped reconciliation family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and execute frame-coherence fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0

ZombieOrchard      2026-07-13T03-59-28-04-00 selected
MyCozyIsland       2026-07-13T04-21-10-04-00
TheUnmappedHouse   2026-07-13T04-47-00-04-00
AetherVale         2026-07-13T05-00-02-04-00
TheOpenAbove       2026-07-13T05-19-21-04-00
IntoTheMeadow      2026-07-13T05-40-11-04-00
PhantomCommand     2026-07-13T05-59-03-04-00
PrehistoricRush    2026-07-13T06-39-10-04-00
HorrorCorridor     2026-07-13T07-00-29-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` is modified in the Publish organization.

## Complete interaction loop

```txt
boot
  -> create runtime with 19 installed kits
  -> create canvas renderer
  -> create HTML renderer and delegated click listener
  -> expose raw engine and manual tick through GameHost
  -> start recursive RAF

command
  -> mutate one domain
  -> notify captures snapshot P
  -> deliver P synchronously to subscribers
  -> return command result

frame
  -> engine.tick(1 / 60)
  -> mutate frame, elapsed, pressure, pests, damage, route outcome, and events
  -> notify captures snapshot T1
  -> deliver T1 synchronously
  -> tick captures second snapshot T2
  -> world.render(T2) resets and paints canvas
  -> ui.render(T2) replaces HUD or route subtree
  -> request successor RAF

diagnostics
  -> GameHost.getState() captures current snapshot D
  -> GameHost.tick(dt) may advance the same runtime outside RAF ownership
  -> no public result correlates D with P, T1, T2, canvas, HTML, or the visible frame
```

## Domains in use

```txt
browser document, canvas, DOM, CSS stacking, RAF, and public GameHost
runtime registration, commands, ticks, snapshots, subscriptions, events, and publication
11 generic scoped interface domains plus custom active-session
interface composition, nested dispatch, routing, and automatic Outcome routing
resource ledger and pressure field
orchard generation, apple collection, and refill
construction, roster, and inventory
movement, phases, pest lifecycle, score, damage, and failure
canvas drawing-buffer allocation and world projection
HTML route, HUD, cards, controls, and delegated interaction projection
dual-surface frame identity, admission, commit, recovery, diagnostics, and acknowledgement
Node smoke, static build, Pages deployment, and central tracking
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `kit-runtime` | Kit registration, domain creation, command dispatch, delta clamp, ticks, event emission, mutable event buffering, snapshots, subscriptions, synchronous publication |
| `scoped-interface-domain-kit` | Screen state, field mutation, selection, action activation, event emission, interface snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Movement, collection, phase changes, pest lifecycle, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | Construction screen, build routing, Back |
| `exchange-domain-kit` | Market projection, Back |
| `roster-domain-kit` | Roster projection, Back |
| `inventory-domain-kit` | Inventory projection, Back |
| `knowledge-domain-kit` | Codex projection, Back |
| `preferences-domain-kit` | Settings projection, Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Route transitions, Back, nested dispatch, automatic Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants, snapshots |
| `pressure-field-kit` | Pressure adjustment, passive ticking, snapshots |
| `orchard-world-kit` | Tree/apple generation, nearby collection, refill, snapshots |
| `construction-runtime-kit` | Catalog, payment, placement, snapshots |
| `roster-runtime-kit` | Payment, hiring, snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas sizing and projection of trees, apples, player, pests |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards, Outcome projection |
| `game-host-diagnostics-kit` | Raw engine exposure, fresh snapshot readback, manual tick |
| `smoke-fixture-kit` | Entry, Play, apple assertions |
| `static-build-copy-kit` | Static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

## Source-backed findings

- `src/kits/runtime.js` snapshots only domain snapshots and omits `ctx.frame`, `ctx.elapsed`, publication identity, and fingerprints.
- `notify()` captures one snapshot and sends it synchronously to listeners.
- `engine.tick()` calls `notify()` and then captures another snapshot for its return value.
- A reentrant subscriber can mutate state between the published snapshot and the browser snapshot.
- `src/start.js` calls the canvas renderer first and the HTML renderer second.
- Neither renderer returns a result, revision, fingerprint, or rollback handle.
- The canvas projects orchard and active-session state regardless of the active interface route.
- The HTML renderer replaces `#ui-root` each frame.
- A canvas success followed by an HTML failure produces an unclassified partial frame.
- `GameHost.getState()` captures fresh current state rather than the last complete visible frame.
- Existing smoke proof does not inspect or correlate either visible surface.

## Required parent domain

```txt
zombie-orchard-canvas-html-frame-coherence-authority-domain
```

## Required transaction

```txt
committed runtime transition
  -> allocate StateRevision and PublicationId
  -> capture one immutable fingerprinted FrameEnvelope
  -> publish the exact envelope to observers and presentation
  -> prepare canvas and HTML candidates against the same envelope
  -> reject stale route, viewport, surface, or projection revisions
  -> commit both surfaces under one FrameCommitId
  -> classify complete, partial, failed, stale, or superseded
  -> preserve or recover the last complete frame
  -> expose visible-frame receipts through diagnostics
  -> publish FirstDualSurfaceFrameAck
```

## Current file family

```txt
.agent/trackers/2026-07-13T07-41-11-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T07-41-11-04-00.md
.agent/architecture-audit/2026-07-13T07-41-11-04-00-frame-coherence-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T07-41-11-04-00-dual-surface-visible-frame-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T07-41-11-04-00-runtime-dual-surface-central-reconciliation.md
.agent/interaction-audit/2026-07-13T07-41-11-04-00-frame-envelope-projection-central-reconciliation-map.md
.agent/frame-coherence-audit/2026-07-13T07-41-11-04-00-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T07-41-11-04-00-central-fixture-reconciliation-gate.md
.agent/central-sync-audit/2026-07-13T07-41-11-04-00-repo-ledger-frame-coherence-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, gameplay, renderer, dependency, package-script, test, build, or deployment behavior changed.