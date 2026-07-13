# Project breakdown: ZombieOrchard canvas/HTML frame coherence

**Timestamp:** `2026-07-13T03-59-28-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Change type:** documentation only

## Summary

ZombieOrchard was selected as the oldest eligible documented repository after the complete `LuminaryLabs-Publish` inventory was compared with `LuminaryLabs-Dev/LuminaryLabs`. All nine eligible non-Cavalry repositories already had central-ledger and root `.agent` coverage.

The audit identifies a missing frame-coherence boundary. The runtime publishes one snapshot to subscribers and returns a separately captured snapshot to the browser host. The host then mutates the canvas and HTML sequentially. No shared frame envelope, state revision, surface result, partial-frame classification, visible diagnostics receipt, or first-visible-frame acknowledgement proves that all observers and surfaces adopted the same committed state.

## Plan ledger

**Goal:** document the complete repository and define the DSK boundary required for one coherent canvas/HTML browser frame.

- [x] Inventory all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with central ledgers.
- [x] Confirm every eligible repository has root `.agent` state.
- [x] Select only ZombieOrchard as the oldest eligible entry.
- [x] Read source-backed runtime, host, renderers, CSS, gameplay, diagnostics, proof, and current audit surfaces.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 27 implemented kits.
- [x] Identify every offered service.
- [x] Add required timestamped audits.
- [x] Refresh required root `.agent` documents and machine registry.
- [x] Update central tracking on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-13T01-18-20-04-00 selected
MyCozyIsland       2026-07-13T01-40-00-04-00
TheUnmappedHouse   2026-07-13T01-49-49-04-00
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
IntoTheMeadow      2026-07-13T02-39-44-04-00
PhantomCommand     2026-07-13T02-49-07-04-00
PrehistoricRush    2026-07-13T03-20-58-04-00
HorrorCorridor     2026-07-13T03-38-31-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` is modified in the Publish organization.

## Complete interaction loop

```txt
module boot
  -> create runtime and install 19 kits
  -> create world canvas renderer
  -> create HTML interface renderer
  -> install delegated click listener
  -> expose raw engine and fresh snapshot readback
  -> begin recursive RAF

browser command
  -> engine.command(domainId, type, payload)
  -> domain mutates state
  -> notify captures publication snapshot P
  -> subscribers synchronously receive P
  -> command result returns after subscriber delivery

RAF tick
  -> engine.tick(1 / 60)
  -> mutate ctx.delta, ctx.elapsed, and ctx.frame
  -> clear ambient events
  -> tick domains in installation order
  -> notify captures tick publication snapshot T1
  -> subscribers synchronously receive T1
  -> tick captures second snapshot T2
  -> return T2 to start.js

browser projection
  -> world.render(T2)
  -> sample CSS dimensions
  -> reset canvas drawing buffer
  -> draw trees, apples, pests, and player
  -> ui.render(T2)
  -> derive active interface route
  -> replace #ui-root with HUD or screen HTML
  -> request successor RAF

public diagnostics
  -> GameHost.getState() captures current snapshot D
  -> no result correlates D with P, T1, T2, canvas state, HTML state, or a browser-presented frame
```

## Domains in use

| Domain | Current responsibility |
|---|---|
| Browser host | Document, canvas, DOM, CSS stacking, RAF, and public `GameHost` |
| Runtime | Kit registration, commands, ticks, events, snapshots, subscriptions, and synchronous publication |
| Interface | Twelve screen definitions, fields, selection, and actions |
| Composition | Route transitions, Back, nested dispatch, and Outcome routing |
| Resource | Balance checks, payment, and grants |
| Pressure | Pressure adjustment and ticking |
| Orchard | Trees, apples, collection, and refill |
| Construction | Catalog, payment, and built placements |
| Roster | Hiring and actor projection |
| Inventory | Equipment mutation and projection |
| Active session | Movement, collection, phases, pests, damage, score, and failure |
| Canvas projection | Drawing-buffer sizing and orchard/session world projection |
| HTML projection | HUD, route screens, cards, controls, and delegated interaction |
| Frame coherence | Currently absent identity, commit, recovery, and visible acknowledgement between both surfaces |
| Proof/deploy | Node smoke, static build, Pages publication, and central tracking |

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `kit-runtime` | Registration, domain creation, commands, delta clamp, ticks, event emission, mutable event buffering, snapshots, subscriptions, and synchronous publication |
| `scoped-interface-domain-kit` | Screen state, field mutation, selection, action activation, event emission, and snapshots |
| `entry-domain-kit` | Play, New Game, and Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Movement, collection, phases, pests, damage, score, and failure |
| `interrupt-domain-kit` | Pause, Resume, and Title |
| `construction-domain-kit` | Construction screen, build routing, and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Transitions, Back, nested dispatch, and automatic Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants, and snapshots |
| `pressure-field-kit` | Pressure adjustment, ticking, and snapshots |
| `orchard-world-kit` | Tree/apple generation, collection, refill, and snapshots |
| `construction-runtime-kit` | Catalog, payment, placement, and snapshots |
| `roster-runtime-kit` | Payment, hiring, and snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas sizing and tree, apple, pest, and player projection |
| `html-interface-render-kit` | Delegated actions, HUD, route screens, cards, and Outcome projection |
| `game-host-diagnostics-kit` | Raw engine exposure, fresh snapshot readback, and manual tick |
| `smoke-fixture-kit` | Entry, Play, and apple assertions |
| `static-build-copy-kit` | Static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

## Main findings

```txt
publication and browser rendering do not share one identified envelope
runtime frame and elapsed values are omitted from snapshots
canvas and HTML commits are sequential and non-atomic
renderer terminal result types are absent
partial canvas/HTML success is unclassified
canvas always projects gameplay world regardless of active interface route
canvas buffer reset and DOM replacement have no shared projection revision
GameHost exposes current state, not visibly committed state
first visible dual-surface frame acknowledgement is absent
```

### Snapshot split

`notify()` captures snapshot T1. `engine.tick()` then captures snapshot T2 for its return value. A subscriber can synchronously re-enter the engine and mutate state between those captures. Subscribers can therefore receive T1 while the canvas and HTML receive T2 from the same outer tick.

### Sequential surface commit

`start.js` calls `world.render(snapshot)` and then `ui.render(snapshot)`. If canvas mutation succeeds and HTML mutation fails, the browser displays a partial frame with no typed result, rollback, last-complete-frame policy, or visible-frame journal.

### Implicit route/world policy

The canvas renderer reads only `orchard-world` and `active-session`. It never reads `interface-composition.active`. Menu, setup, interrupt, and outcome screens therefore overlay a continuously projected gameplay world without an explicit route ownership or visibility contract.

### Diagnostics mismatch

`GameHost.getState()` executes a new `engine.snapshot()` call. It cannot prove which state produced the current canvas pixels or DOM subtree.

## Required parent DSK

`zombie-orchard-canvas-html-frame-coherence-authority-domain`

## Required transaction

```txt
committed state transition
  -> allocate StateRevision and PublicationId
  -> capture one immutable FrameEnvelope
  -> publish that envelope to observers
  -> prepare canvas and HTML projections from that exact envelope
  -> validate surface, viewport, route, and projection revisions
  -> apply one FrameCommitId across both surfaces
  -> collect CanvasProjectionResult and HtmlProjectionResult
  -> classify complete, partial, failed, stale, or superseded
  -> preserve last complete frame and successor scheduling under fault policy
  -> expose visible frame envelope and receipts through diagnostics
  -> publish FirstDualSurfaceFrameAck
```

## Candidate kit family

```txt
state-revision-kit
publication-id-kit
frame-envelope-id-kit
frame-fingerprint-kit
immutable-frame-envelope-kit
canvas-surface-id-kit
canvas-surface-revision-kit
canvas-projection-command-kit
canvas-projection-result-kit
html-surface-id-kit
html-surface-revision-kit
html-projection-command-kit
html-projection-result-kit
route-world-visibility-policy-kit
dual-surface-frame-commit-id-kit
dual-surface-frame-commit-result-kit
partial-frame-classification-kit
last-complete-frame-kit
frame-recovery-policy-kit
visible-frame-readback-kit
first-dual-surface-frame-ack-kit
frame-coherence-observation-kit
dual-surface-parity-fixture-kit
partial-frame-recovery-fixture-kit
frame-source-dist-pages-parity-fixture-kit
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-13T03-59-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T03-59-28-04-00.md
.agent/architecture-audit/2026-07-13T03-59-28-04-00-canvas-html-frame-coherence-dsk-map.md
.agent/render-audit/2026-07-13T03-59-28-04-00-canvas-html-visible-frame-coherence-gap.md
.agent/gameplay-audit/2026-07-13T03-59-28-04-00-runtime-state-dual-surface-loop.md
.agent/interaction-audit/2026-07-13T03-59-28-04-00-command-frame-surface-result-map.md
.agent/frame-coherence-audit/2026-07-13T03-59-28-04-00-publication-canvas-html-commit-contract.md
.agent/deploy-audit/2026-07-13T03-59-28-04-00-dual-surface-frame-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, dependencies, package scripts, gameplay, rendering, and deployment are unchanged. No branch or pull request is created. Existing smoke proof does not validate browser surfaces. No dual-surface atomicity, route/world coherence, partial-frame recovery, visible diagnostics parity, or first-visible-frame claim is made.
