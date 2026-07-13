# Project breakdown: ZombieOrchard browser startup readiness and failure authority

**Timestamp:** `2026-07-13T13-01-03-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `browser-startup-readiness-failure-authority-central-reconciled`

## Summary

ZombieOrchard has a complete engine, interface, gameplay, canvas, HTML, smoke, build, and Pages surface, but browser startup has no application-owned readiness or failure transaction. The page declares a hidden `#error-panel`, yet `src/boot.js` only imports `src/start.js`; startup immediately installs kits, acquires DOM and canvas resources, exposes `GameHost`, ticks simulation, renders canvas then HTML, and schedules RAF. Any module, kit, DOM, context, first-tick, or first-render failure can leave a blank or partially initialized page with no typed failure, cleanup, fallback, or first-visible-frame proof.

## Plan ledger

**Goal:** document one browser startup transaction that prepares all runtime and presentation participants, adopts them only after a successful probe frame, and projects a durable failure surface when startup cannot complete.

- [x] Compare the ten current `LuminaryLabs-Publish` repositories with the nine eligible central-ledger entries.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm no new, ledger-missing, or root-`.agent`-missing eligible repository outranks the fallback rule.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard`, the oldest eligible central entry.
- [x] Read the page shell, boot module, browser host, runtime, composition, gameplay, canvas, HTML, test, and build surfaces.
- [x] Identify the complete interaction loop, domains, all 27 implemented kit surfaces, and offered services.
- [x] Define the missing startup readiness and failure authority.
- [x] Add a new timestamped tracker and audit family under root `.agent`.
- [x] Keep all GitHub writes on `main`; create no branch or pull request.
- [ ] Implement startup preparation, probe, adoption, cleanup, fallback, and browser fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
central ledger entries: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

ZombieOrchard      2026-07-13T07-41-11-04-00 selected
PrehistoricRush    2026-07-13T08-39-12-04-00
TheUnmappedHouse   2026-07-13T09-03-20-04-00
TheOpenAbove       2026-07-13T09-40-27-04-00
AetherVale         2026-07-13T10-05-15-04-00
IntoTheMeadow      2026-07-13T10-59-22-04-00
PhantomCommand     2026-07-13T11-41-10-04-00
HorrorCorridor     2026-07-13T11-58-45-04-00
MyCozyIsland       2026-07-13T12-38-45-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` is modified in the Publish organization.

## Complete interaction loop

```txt
HTML parse
  -> create #app, #world, #ui-root, and hidden #error-panel
  -> import src/boot.js

boot module
  -> import src/start.js
  -> no startup command, generation, phase, or catch boundary

start module evaluation
  -> createOrchardGame()
  -> install 19 runtime domains in sequence
  -> query #world and #ui-root
  -> acquire Canvas2D context
  -> attach delegated UI click listener
  -> expose raw engine through window.GameHost
  -> call draw() immediately

first draw
  -> engine.tick(1 / 60)
  -> mutate frame, elapsed, pressure, pests, route outcome, and events
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> request successor RAF

startup failure
  -> exception escapes module evaluation or first draw
  -> no typed StartupResult
  -> no participant cleanup or listener retirement
  -> no error-panel projection
  -> no retry or degraded mode
  -> no first-visible-frame acknowledgement
```

## Domains in use

```txt
browser document, module evaluation, DOM nodes, Canvas2D context, hidden error panel, RAF, and GameHost
runtime kit registration, domain installation, commands, ticks, events, snapshots, subscribers, and publication
11 generic interface domains plus custom active-session
interface composition, route transitions, nested commands, Back, and Outcome routing
resource ledger, pressure field, orchard world, construction, roster, and inventory
movement, collection, phase changes, pests, damage, score, failure, and outcome
canvas world projection and HTML route/HUD projection
startup phase, dependency admission, participant preparation, probe, adoption, rollback, failure projection, retry, and readiness
Node smoke, static-copy build, GitHub Pages deployment, and central tracking
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `kit-runtime` | Kit registration, domain creation, command dispatch, clamped ticks, events, snapshots, subscriptions, synchronous publication |
| `scoped-interface-domain-kit` | Interface state, fields, selection, activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Movement, collection, phase changes, pests, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | Build route and Back |
| `exchange-domain-kit` | Market route and Back |
| `roster-domain-kit` | Roster route and Back |
| `inventory-domain-kit` | Inventory route and Back |
| `knowledge-domain-kit` | Codex route and Back |
| `preferences-domain-kit` | Settings route and Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Route transitions, nested dispatch, Back, automatic Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants, snapshots |
| `pressure-field-kit` | Pressure adjustment, passive ticking, snapshots |
| `orchard-world-kit` | Tree/apple generation, nearby collection, refill, snapshots |
| `construction-runtime-kit` | Catalog, payment, placement, snapshots |
| `roster-runtime-kit` | Payment, hiring, snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas sizing and orchard/player/pest projection |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards, Outcome projection |
| `game-host-diagnostics-kit` | Raw engine exposure, fresh-state readback, manual tick |
| `smoke-fixture-kit` | Entry, Play, and apple assertions |
| `static-build-copy-kit` | Static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

## Source-backed findings

- `index.html` declares `#error-panel` as hidden, but no source references or activates it.
- `src/boot.js` is a bare side-effect import and provides no `try/catch`, startup phase, retry, or fallback projection.
- `src/start.js` performs engine construction, DOM lookup, renderer construction, public-host exposure, and first draw during module evaluation.
- `createWorldCanvas()` does not validate the canvas node or `getContext("2d")` result.
- `createHtmlInterfaceRenderer()` immediately calls `root.addEventListener()` without validating the root.
- `createKitRuntime()` installs kits sequentially and throws on an invalid domain, with no manifest receipt, rollback, or partial-install cleanup.
- `draw()` advances simulation before any successful visible frame is proven.
- A first canvas failure prevents HTML projection and successor RAF scheduling.
- `GameHost` is published before first-frame readiness and exposes an engine that may not yet have a successful presentation.
- The Node smoke constructs only the engine and never evaluates browser boot, DOM acquisition, context failure, first-frame failure, or error-panel behavior.
- The build is a static copy and adds no startup verification.

## Required parent domain

```txt
zombie-orchard-browser-startup-readiness-failure-authority-domain
```

## Required transaction

```txt
BrowserStartupCommand
  -> allocate StartupAttemptId and StartupGeneration
  -> validate document, route, and lifecycle generation
  -> resolve required DOM nodes and capabilities
  -> prepare detached engine, kit graph, canvas, HTML, diagnostics, and scheduler participants
  -> collect participant preparation receipts
  -> reject missing, invalid, stale, duplicate, or superseded work with zero live adoption
  -> run one non-committing startup probe and projection probe
  -> atomically adopt all participants or dispose all candidates
  -> publish StartupReadyResult or StartupFailureResult
  -> expose GameHost only from the accepted generation
  -> render a WebGL/Canvas-independent failure panel when rejected
  -> publish FirstStartupFrameAck after the first accepted visible frame
```

## Planned coordinating kits

```txt
zombie-orchard-browser-startup-readiness-failure-authority-domain
startup-attempt-id-kit
startup-generation-kit
startup-phase-kit
startup-command-kit
startup-dependency-manifest-kit
document-lifecycle-admission-kit
dom-node-requirement-kit
canvas-context-capability-kit
kit-graph-preparation-receipt-kit
engine-candidate-kit
canvas-renderer-candidate-kit
html-renderer-candidate-kit
diagnostics-candidate-kit
scheduler-candidate-kit
startup-probe-kit
startup-adoption-result-kit
startup-failure-result-kit
startup-candidate-disposal-kit
startup-error-panel-projection-kit
startup-retry-policy-kit
public-host-readiness-gate-kit
first-startup-frame-ack-kit
startup-source-dist-pages-fixture-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-13T13-01-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T13-01-03-04-00.md
.agent/architecture-audit/2026-07-13T13-01-03-04-00-browser-startup-readiness-failure-dsk-map.md
.agent/render-audit/2026-07-13T13-01-03-04-00-first-visible-frame-readiness-gap.md
.agent/gameplay-audit/2026-07-13T13-01-03-04-00-first-tick-before-readiness-loop.md
.agent/interaction-audit/2026-07-13T13-01-03-04-00-startup-participant-result-map.md
.agent/startup-audit/2026-07-13T13-01-03-04-00-preparation-probe-adoption-failure-contract.md
.agent/deploy-audit/2026-07-13T13-01-03-04-00-browser-startup-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, dependencies, package scripts, tests, workflows, and deployment configuration are unchanged. No startup atomicity, readiness, fallback, cleanup, retry, first-visible-frame, or production-readiness claim is made until focused browser/build/Pages fixtures pass on `main`.