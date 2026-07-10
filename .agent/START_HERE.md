# START HERE — ZombieOrchard

## Current best next cut

```txt
ZombieOrchard Market Nested Result Projection Refresh + GameHost Fixture Gate
```

## Read this first

Start with the latest tracker:

```txt
.agent/trackers/2026-07-10T10-00-37-04-00/project-breakdown.md
```

Then read:

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T10-00-37-04-00-market-nested-result-projection-dsk-map.md
.agent/interaction-audit/2026-07-10T10-00-37-04-00-nested-command-result-retention-map.md
.agent/market-authority-audit/2026-07-10T10-00-37-04-00-market-source-result-contract.md
.agent/render-audit/2026-07-10T10-00-37-04-00-exchange-market-render-readback-gap.md
.agent/deploy-audit/2026-07-10T10-00-37-04-00-market-fixture-build-gate.md
```

## Short version

`ZombieOrchard` should not start next with runtime rewrite, renderer rewrite, economy expansion, or visual polish.

The useful next ledge is narrow: preserve nested Market command results from `interface-composition`, project them into Exchange/Market readback, expose JSON-safe `GameHost.market` diagnostics, and prove accepted/rejected rows with a DOM-free fixture.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> engine.snapshot()
  -> world canvas renders orchard state
  -> HTML renderer renders active-session HUD or generic interface screen
  -> data-action routes through interface-composition.activate
  -> optional nested action.command dispatches through engine.command(...)
  -> engine.command returns command result
  -> nested result is dropped by interface-composition
  -> Exchange/Market remains generic Back-only screen
  -> GameHost exposes raw engine/getState/tick only
```

## Main blocker

```txt
engine.command() already returns command results
interface-composition dispatches nested action.command but drops the result
Exchange is still Back-only
HTML renderer has no Market projection/readback branch
GameHost exposes raw engine/getState/tick only
smoke only proves entry -> play -> apple presence
```
