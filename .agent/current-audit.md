# Current audit: ZombieOrchard

**Timestamp:** `2026-07-13T13-01-03-04-00`  
**Status:** `browser-startup-readiness-failure-authority-central-reconciled`  
**Branch:** `main`

## Summary

ZombieOrchard browser startup is ambient module evaluation rather than a typed lifecycle transaction. `index.html` provides a world canvas, UI root, and hidden error panel. `boot.js` only imports `start.js`, which immediately constructs the engine, installs kits, acquires DOM and Canvas2D resources, installs a delegated listener, exposes `GameHost`, advances simulation, renders canvas then HTML, and schedules RAF. No startup identity, phase, manifest, participant receipt, probe, atomic adoption, rollback, cleanup, fallback, retry, readiness result, or first-visible-frame acknowledgement exists.

## Plan ledger

**Goal:** preserve the full repository breakdown while making the missing startup authority explicit and testable.

- [x] Compare the current Publish organization inventory and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, ledger-missing, or root-`.agent`-missing eligible repository outranks the fallback rule.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read browser shell, boot, host, runtime, domains, renderers, test, and package surfaces.
- [x] Preserve all 27 implemented kits and offered services.
- [x] Add and route the timestamped startup audit family.
- [x] Keep writes on `main`; create no branch or pull request.
- [ ] Implement and run startup-readiness fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

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
  -> #world, #ui-root, and hidden #error-panel
  -> module import

browser startup
  -> boot side-effect import
  -> create engine and install 19 domains
  -> acquire canvas node/context and UI root
  -> install click listener
  -> expose GameHost
  -> call draw immediately

first draw
  -> tick runtime and gameplay
  -> render canvas
  -> render HTML
  -> schedule successor RAF

failure
  -> exception escapes
  -> no typed result, cleanup, fallback, retry, or readiness proof
```

## Domains in use

```txt
browser document, module evaluation, DOM nodes, Canvas2D, hidden error panel, RAF, and GameHost
runtime kit registration, commands, ticks, events, snapshots, subscribers, and publication
11 generic interface domains plus custom active-session
interface composition, routing, nested commands, Back, and Outcome routing
resource ledger, pressure field, orchard world, construction, roster, and inventory
movement, collection, phases, pests, damage, score, failure, and outcome
canvas world projection and HTML route/HUD projection
startup dependency admission, candidate preparation, probe, adoption, failure, disposal, retry, and readiness
Node smoke, static build, Pages deployment, and central tracking
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `kit-runtime` | Kit registration, domain creation, commands, ticks, events, snapshots, subscriptions, publication |
| `scoped-interface-domain-kit` | Interface state, fields, selection, activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Movement, collection, phases, pests, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | Build route and Back |
| `exchange-domain-kit` | Market route and Back |
| `roster-domain-kit` | Roster route and Back |
| `inventory-domain-kit` | Inventory route and Back |
| `knowledge-domain-kit` | Codex route and Back |
| `preferences-domain-kit` | Settings route and Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Transitions, nested dispatch, Back, Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants, snapshots |
| `pressure-field-kit` | Pressure adjustment, ticking, snapshots |
| `orchard-world-kit` | Tree/apple generation, collection, refill, snapshots |
| `construction-runtime-kit` | Catalog, payment, placement, snapshots |
| `roster-runtime-kit` | Payment, hiring, snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas sizing and orchard/player/pest projection |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards, Outcome projection |
| `game-host-diagnostics-kit` | Raw engine exposure, fresh-state readback, manual tick |
| `smoke-fixture-kit` | Entry, Play, and apple assertions |
| `static-build-copy-kit` | Static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

## Source-backed findings

- `index.html` declares a hidden `#error-panel`; current JavaScript never references it.
- `src/boot.js` contains only `import "./start.js";`.
- `src/start.js` performs all live construction and starts drawing during module evaluation.
- Canvas and UI nodes are not validated before use.
- Canvas2D context acquisition returns no capability result and can retain `null`.
- Kit installation is sequential and has no aggregate manifest or rollback result.
- `GameHost` is published before a successful first frame.
- The first live tick occurs before render readiness.
- Canvas failure prevents HTML projection and successor RAF scheduling.
- Node smoke proof does not execute browser startup or failure paths.

## Required parent domain

```txt
zombie-orchard-browser-startup-readiness-failure-authority-domain
```

## Required transaction

```txt
BrowserStartupCommand
  -> allocate StartupAttemptId and StartupGeneration
  -> validate document, lifecycle, DOM nodes, Canvas2D, and kit manifest
  -> prepare detached engine, renderer, diagnostics, and scheduler candidates
  -> collect preparation receipts
  -> run non-committing startup and projection probes
  -> atomically adopt all participants or dispose all candidates
  -> publish StartupReadyResult or StartupFailureResult
  -> publish GameHost only from the accepted generation
  -> project a DOM-only error fallback and bounded retry
  -> publish FirstStartupFrameAck
```

## Current file family

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

Documentation only. No runtime, gameplay, renderer, HTML, CSS, dependency, package-script, test, workflow, build, or deployment behavior changed.