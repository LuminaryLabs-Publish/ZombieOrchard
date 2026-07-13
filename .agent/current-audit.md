# Current audit: ZombieOrchard

**Timestamp:** `2026-07-13T03-59-28-04-00`  
**Status:** `canvas-html-frame-coherence-authority-audited`  
**Branch:** `main`

## Summary

ZombieOrchard projects one logical runtime state through two visible surfaces, but it has no authority proving that the canvas and HTML committed the same frame. `engine.tick()` first publishes a snapshot through `notify()` and then returns a separately captured snapshot. The browser host renders the canvas and HTML sequentially from the returned snapshot, with no frame identity, surface revision, terminal projection results, atomic commit, or visible-frame acknowledgement.

## Plan ledger

**Goal:** define one immutable frame envelope and one typed dual-surface result from committed runtime state to the visible browser frame.

- [x] Compare the current Publish inventory and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard as the oldest eligible documented repository.
- [x] Read `runtime.js`, `start.js`, `world-canvas.js`, `html-interface-renderer.js`, `styles.css`, and current audit state.
- [x] Confirm publication and browser rendering use separately captured snapshots.
- [x] Confirm the canvas and HTML are committed sequentially.
- [x] Confirm neither renderer returns a typed stage result.
- [x] Confirm the canvas always projects the world regardless of active interface route.
- [x] Confirm `GameHost.getState()` cannot identify the visibly presented frame.
- [x] Preserve 27 implemented kits and offered services.
- [x] Add and route this audit family.
- [ ] Implement and execute frame-coherence fixtures.

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
boot
  -> create one runtime with 19 installed kits
  -> create canvas renderer
  -> create HTML renderer and delegated click listener
  -> expose raw engine through GameHost
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
  -> world.render(T2) resets and paints the canvas
  -> ui.render(T2) replaces the HUD or route subtree
  -> request successor RAF

diagnostics
  -> GameHost.getState() captures current snapshot D
  -> no public result correlates D with T1, T2, canvas, HTML, or the browser-presented frame
```

## Source-backed findings

- `src/kits/runtime.js` builds snapshots only from domain snapshots and omits `ctx.frame`, `ctx.elapsed`, publication identity, and a fingerprint.
- `notify()` captures one snapshot and sends the same object to subscribers.
- `engine.tick()` calls `notify()` and then calls `engine.snapshot()` again for its return value.
- A reentrant subscriber can mutate state between the published snapshot and the snapshot returned to the browser host.
- `src/start.js` calls the canvas renderer first and the HTML renderer second, then schedules the successor RAF.
- Neither renderer returns a result, revision, fingerprint, or rollback handle.
- `src/renderer/world-canvas.js` resets the canvas dimensions and paints the orchard and active session on every frame, without checking the active interface route.
- `src/renderer/html-interface-renderer.js` replaces `#ui-root` on every frame based on the interface-composition snapshot.
- A canvas success followed by an HTML failure produces an unclassified partial frame.
- `GameHost.getState()` captures a fresh snapshot rather than returning the envelope that produced the visible surfaces.
- Existing smoke proof does not inspect either visible surface or correlate them to one state revision.

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
dual-surface frame identity, admission, commit, recovery, and acknowledgement
Node smoke, static build, Pages deployment, and central tracking
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `kit-runtime` | Kit registration, domain creation, command dispatch, delta clamp, ticks, event emission, mutable event buffering, snapshots, subscriptions, and synchronous publication |
| `scoped-interface-domain-kit` | Screen state, field mutation, selection, action activation, event emission, and interface snapshots |
| `entry-domain-kit` | Play, New Game, and Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Movement, collection, phase changes, pest lifecycle, score, damage, and failure |
| `interrupt-domain-kit` | Pause, Resume, and Title |
| `construction-domain-kit` | Construction screen, build routing, and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Route transitions, Back, nested dispatch, and Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants, and snapshots |
| `pressure-field-kit` | Pressure adjustment, ticking, and snapshots |
| `orchard-world-kit` | Tree/apple generation, collection, refill, and snapshots |
| `construction-runtime-kit` | Catalog, payment, placement, and snapshots |
| `roster-runtime-kit` | Payment, hiring, and snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas sizing and projection of trees, apples, player, and pests |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards, and Outcome projection |
| `game-host-diagnostics-kit` | Raw engine exposure, fresh snapshot readback, and manual tick |
| `smoke-fixture-kit` | Entry, Play, and apple assertions |
| `static-build-copy-kit` | Static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

## Required composed domain

`zombie-orchard-canvas-html-frame-coherence-authority-domain`

## Required transaction

```txt
committed runtime transition
  -> allocate StateRevision and PublicationId
  -> capture one immutable fingerprinted FrameEnvelope
  -> admit one CanvasProjectionCommand and one HtmlProjectionCommand
  -> prepare both surface candidates against the same FrameEnvelope
  -> reject stale surface, route, viewport, or projection revisions
  -> apply canvas and HTML under one FrameCommitId
  -> classify complete, partial, failed, or superseded result
  -> preserve recovery and successor scheduling independently from renderer faults
  -> expose the last committed visible FrameEnvelope through diagnostics
  -> publish FirstDualSurfaceFrameAck
```

## Runtime non-claims

No runtime source, gameplay behavior, renderer, package script, dependency, or deployment configuration changed. No canvas/HTML atomicity, snapshot identity, route/world policy, partial-frame recovery, visible diagnostics parity, or first-visible-frame acknowledgement is claimed.
