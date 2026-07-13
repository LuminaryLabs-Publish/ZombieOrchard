# ZombieOrchard project breakdown

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Timestamp:** `2026-07-13T07-41-11-04-00`  
**Status:** `canvas-html-frame-coherence-authority-central-reconciled`

## Summary

ZombieOrchard is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface definitions, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current reconciliation preserves the source-backed frame-coherence finding: one runtime tick can produce a subscriber snapshot and a separately captured browser snapshot, after which the canvas and HTML are mutated sequentially without one shared frame identity, terminal surface results, partial-frame classification, or visible-frame acknowledgement.

## Plan ledger

**Goal:** reconcile the complete repository breakdown while keeping one explicit authority boundary from committed runtime state to the canvas, HTML, diagnostics, and first coherent visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing, or repo-local-newer-than-central.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible central entry.
- [x] Re-read runtime ticking, publication, browser rendering, composition, gameplay timing, diagnostics, and package proof surfaces.
- [x] Preserve all 27 implemented kit surfaces and their offered services.
- [x] Preserve the canvas/HTML frame-coherence authority boundary and dependency order.
- [x] Add a new timestamped tracker, turn ledger, architecture, render, gameplay, interaction, frame-coherence, deployment, and central-sync audit family.
- [x] Refresh required root `.agent` routing and status documents.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Runtime frame-envelope implementation and executable browser fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0

ZombieOrchard      2026-07-13T03-59-28-04-00 selected oldest
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
browser boot
  -> create one runtime with 19 installed kits
  -> create canvas and HTML renderers
  -> expose raw engine and manual tick through GameHost
  -> begin recursive requestAnimationFrame

browser command
  -> engine.command(domainId, type, payload)
  -> domain mutation
  -> notify captures publication snapshot P
  -> synchronous subscribers receive P
  -> command result returns

RAF frame
  -> engine.tick(1 / 60)
  -> clamp delta, advance elapsed and frame
  -> clear events
  -> tick every installed domain once
  -> notify captures snapshot T1
  -> subscribers receive T1
  -> tick captures second snapshot T2
  -> world.render(T2) mutates the canvas
  -> ui.render(T2) replaces the HTML subtree
  -> request successor RAF

public diagnostics
  -> GameHost.getState() captures fresh snapshot D
  -> GameHost.tick(dt) can mutate the same graph outside RAF ownership
  -> no result identifies P, T1, T2, D, both surfaces, or the browser-presented frame
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

| Kit | Offered services |
|---|---|
| `kit-runtime` | Kit registration, domain creation, command dispatch, delta clamp, ticks, event emission, mutable event buffering, snapshots, subscriptions, synchronous publication |
| `scoped-interface-domain-kit` | Screen state, field mutation, selection, action activation, event emission, interface snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save-select projection, Back |
| `run-setup-domain-kit` | Start, Back |
| `active-session-domain-kit` | Movement, collection, phase changes, pest lifecycle, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | Construction screen, build routing, Back |
| `exchange-domain-kit` | Market projection, Back |
| `roster-domain-kit` | Roster projection, Back |
| `inventory-domain-kit` | Inventory projection, Back |
| `knowledge-domain-kit` | Codex projection, Back |
| `preferences-domain-kit` | Settings projection, Back |
| `outcome-domain-kit` | Run summary, Title |
| `interface-composition-kit` | Route transitions, Back, nested dispatch, automatic Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants, snapshots |
| `pressure-field-kit` | Pressure adjustment, passive ticking, snapshots |
| `orchard-world-kit` | Tree/apple generation, nearby collection, refill, snapshots |
| `construction-runtime-kit` | Catalog, payment, placement, snapshots |
| `roster-runtime-kit` | Payment, hiring, snapshots |
| `inventory-runtime-kit` | Equipment mutation, snapshots |
| `world-canvas-render-kit` | Canvas sizing and world projection of trees, apples, player, pests |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards, Outcome projection |
| `game-host-diagnostics-kit` | Raw engine exposure, fresh snapshot readback, manual tick |
| `smoke-fixture-kit` | Entry, Play, apple assertions |
| `static-build-copy-kit` | Static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

## Source-backed findings

```txt
one immutable snapshot shared by publication and browser rendering: no
runtime frame/elapsed metadata in snapshots: no
state revision, publication ID, or frame envelope ID: absent
canvas projection result: absent
HTML projection result: absent
atomic dual-surface commit result: absent
partial-frame classification and recovery: absent
route-to-world-canvas policy: implicit
visible-frame readback through GameHost: absent
first coherent visible-frame acknowledgement: absent
```

## Required authority

```txt
zombie-orchard-canvas-html-frame-coherence-authority-domain
```

Required transaction:

```txt
committed runtime transition
  -> allocate StateRevision and PublicationId
  -> capture one immutable fingerprinted FrameEnvelope
  -> publish that exact envelope to observers and presentation
  -> prepare canvas and HTML candidates against the same envelope
  -> validate route, viewport, surface, and projection revisions
  -> commit both surfaces under one FrameCommitId
  -> classify complete, partial, failed, stale, or superseded
  -> preserve or recover the last complete frame
  -> expose visible-frame receipts through diagnostics
  -> publish FirstDualSurfaceFrameAck
```

## Validation boundary

Documentation only. Runtime source, dependencies, package scripts, gameplay, rendering, and deployment configuration are unchanged. No frame atomicity, partial-frame recovery, visible diagnostics parity, or production-readiness claim is made.