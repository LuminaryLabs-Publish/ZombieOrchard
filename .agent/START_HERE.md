# ZombieOrchard Agent Start

**Repo:** `LuminaryLabs-Publish/ZombieOrchard`

**Last aligned:** `2026-07-08T06-39-20-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `ZombieOrchard`.

Read this folder before changing implementation code.

## Current selection result

The full checked `LuminaryLabs-Publish` repo set was compared against `LuminaryLabs-Dev/LuminaryLabs` ledger state. No checked non-Cavalry Publish repo was found that was both central-ledger absent and missing root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as a fallback follow-up because its root `.agent` state exists, but the Market acceptance fixture is still the narrowest high-value unresolved proof.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current state

`ZombieOrchard` is a compact static browser orchard survival/economy shell with a kit runtime, scoped interface domains, game-domain kits, a canvas world renderer, and an HTML interface renderer.

The current route is:

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> world.render(snapshot)
-> ui.render(snapshot)
-> window.GameHost
```

## Start every future pass here

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/canvas-html-render-audit.md
.agent/gameplay-audit/market-command-replay-fixture.md
.agent/interaction-audit/screen-command-routing.md
.agent/market-authority-audit/transaction-result-projection-gate.md
.agent/market-authority-audit/acceptance-ledger.md
.agent/trackers/2026-07-08T06-39-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-39-20-04-00.md
.agent/kit-registry.json
```

## Source anchors

```txt
README.md
index.html
package.json
src/boot.js
src/start.js
src/game.js
src/kits/runtime.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/world-canvas.js
src/renderer/html-interface-renderer.js
tests/smoke.mjs
```

## Main rule

Do not expand worker assignment, saves, codex progression, or advanced economy loops before Market command/result authority is fixture-readable.

Do not let Market business logic live in the HTML renderer.

## Current priority

```txt
ZombieOrchard Market Acceptance Fixture Implementation
```

The next implementation pass should keep the current static route, canvas renderer, active-session HUD, and `snapshot["resource-ledger"].values` shape stable while adding Market action IDs, command envelopes, deterministic price/capacity snapshots, accepted/rejected result records, transaction history, nested result propagation, exchange projection, and DOM-free fixtures.
