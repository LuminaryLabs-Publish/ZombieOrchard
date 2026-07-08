# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T11-19-53-04-00`

## Summary

This pass selected `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible non-Cavalry follow-up after comparing the accessible Publish repo list against the central ledger.

No runtime/source files were changed. The repo-local `.agent` docs were updated to identify the next implementation seam: **Market Result Propagation + Exchange Projection Fixture Gate**.

## Plan ledger

**Goal:** Refresh root `.agent` docs for one eligible Publish repo, identify the interaction loop, domains, services, kits, and log the central ledger update.

**Checklist**

- [x] Compared accessible `LuminaryLabs-Publish` repos against central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read root `.agent` state.
- [x] Read README, package scripts, runtime, composition, game-domain, preset, renderer, and smoke-test files.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture audit.
- [x] Added timestamped render audit.
- [x] Added timestamped gameplay audit.
- [x] Added timestamped Market authority audit.
- [x] Added timestamped tracker and turn-ledger entries.
- [ ] Did not change runtime source.
- [ ] Did not run local npm validation.

## Repo selection reason

```txt
No checked non-Cavalry Publish repo was fully new, missing from the central ledger, undocumented, or missing root .agent/START_HERE.md state.

ZombieOrchard was selected as the oldest eligible fallback follow-up because Market authority is planned but the result-propagation seam still needs to be implemented before sell/buy behavior or renderer expansion.
```

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        ledgered with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent
LuminaryLabs-Publish/ZombieOrchard       selected
```

## Interaction loop

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createKitRuntime({ kits })
-> createWorldCanvas(canvas)
-> createHtmlInterfaceRenderer({ root, engine })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> runtime ticks pressure-field and active-session
-> engine.snapshot()
-> world-canvas renders orchard state
-> html-interface-renderer renders active HUD or screen panel
-> data-action clicks route through interface-composition.activate
-> data-command clicks route directly to active-session
-> window.GameHost exposes engine/getState/tick
```

## Domains in use

```txt
runtime:
  static-browser-host, boot-module, runtime-entrypoint, game-factory, kit-runtime, engine-context, domain-registry, command-router, event-emitter, tick-dispatcher, snapshot-aggregator, subscription-bus, browser-animation-loop, GameHost, smoke-harness

interface:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome, interface-composition, html-interface-renderer

game:
  resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session, world-canvas

market-next:
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-render-readback, market-fixture-replay
```

## Services the kits offer

```txt
kit-runtime:
  install/register kits, command routing, ticking, events, snapshots, subscriptions

scoped-interface-domain-kit:
  screen actions, selection, fields, metadata, activation, snapshots

interface-composition-kit:
  active screen transitions, back, activation, nested command dispatch, activeSnapshot

resource-ledger-kit:
  values, canPay, pay, add

pressure-field-kit:
  pressure channels, rowPressure/curse ticking

orchard-world-kit:
  tree grid, random apple seed/reseed, nearest apple collection

construction-runtime-kit:
  catalog, payment, built structure records

roster-runtime-kit:
  actor list, hire payment, roster messages

inventory-runtime-kit:
  items, equipped item, equip command

active-session-domain-kit:
  day/phase/player/pests/score/message, movement, collection, pest clearing, phase advance, ending

world-canvas-render-kit:
  snapshot-based canvas drawing

html-interface-render-kit:
  HUD and screen rendering, DOM click routing

smoke-fixture-kit:
  entry/play/apple fixture
```

## Implemented kits

```txt
kit-runtime
scoped-interface-domain-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
active-session-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
interface-composition-kit
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
```

## Main finding

The runtime can already return command results from `engine.command()`, but the composition layer drops nested action-command results.

The exchange screen currently only exposes Back, so Market needs a source-owned command/result layer, not renderer-owned economy logic.

## Next safe ledge

```txt
ZombieOrchard Market Result Propagation + Exchange Projection Fixture Gate
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T11-19-53-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T11-19-53-04-00-exchange-render-projection-readback.md
.agent/gameplay-audit/2026-07-08T11-19-53-04-00-market-command-result-loop.md
.agent/market-authority-audit/2026-07-08T11-19-53-04-00-result-propagation-fixture-gate.md
.agent/trackers/2026-07-08T11-19-53-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-19-53-04-00.md
```

## Validation

Performed:

```txt
GitHub repo-list read
central ledger readback
repo-local source readback
repo-local .agent read/write
```

Not performed:

```txt
local checkout
npm test
npm run build
browser smoke
GitHub Pages smoke
runtime source edit
```
