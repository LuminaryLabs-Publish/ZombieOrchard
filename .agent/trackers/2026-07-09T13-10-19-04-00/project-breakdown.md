# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T13-10-19-04-00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Branch policy:** main only. No branches. No PR.

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled repo-local `.agent` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded by standing rule.

`ZombieOrchard` was selected because the central ledger was stale versus repo-local `.agent` state: central tracking still pointed at `2026-07-09T10-40-00-04-00`, while the repo-local docs had already advanced to `2026-07-09T13-03-43-04-00`. This pass refreshes both repo-local docs and central ledger parity.

## Publish repositories checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / central stale / repo-local latest 2026-07-09T13-03-43-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T12-50-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

The current route provides a first playable orchard loop: title entry, active session, apple collection, pest clearing, day/night phase advance, construction, Exchange/Market shell, roster, inventory, knowledge/codex, settings, outcome, canvas world rendering, HTML UI rendering, and a minimal smoke harness.

## Interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field.tick(dt)
  -> active-session.tick(dt)
  -> engine.snapshot()
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

Input and command routing:

```txt
[data-action] click
  -> engine.command("interface-composition", "activate", { actionId })
  -> current interface domain returns action descriptor
  -> interface-composition may dispatch nested action.command through ctx.engine.command(...)
  -> nested command result is discarded today
  -> optional transition moves active screen

[data-command] click
  -> engine.command("active-session", command)
  -> active-session mutates move/collect/clear/next-phase behavior
```

GameHost surface:

```txt
window.GameHost = {
  engine,
  getState: () => engine.snapshot(),
  tick: (dt) => engine.tick(dt)
}
```

## Domains in use

```txt
host/static-html
host/module-boot
host/browser-animation-frame-loop
host/GameHost
runtime/kit-runtime
runtime/domain-registry
runtime/command-router
runtime/tick-dispatcher
runtime/event-emitter
runtime/snapshot-aggregator
interface/entry
interface/session-select
interface/run-setup
interface/active-session
interface/interrupt
interface/construction
interface/exchange
interface/roster
interface/inventory
interface/knowledge
interface/preferences
interface/outcome
interface/interface-composition
game/resource-ledger
game/pressure-field
game/orchard-world
game/construction-runtime
game/roster-runtime
game/inventory-runtime
game/active-session
render/world-canvas
render/html-interface-renderer
validation/smoke-harness
agent/repo-local-ledger
agent/central-ledger-readback
next/market-action-source
next/market-command-envelope
next/market-preflight
next/market-command-result
next/market-journal
next/exchange-render-readback
next/market-fixture-replay
```

## Services the kits offer

```txt
kit-runtime:
  install kits, register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, notify subscribers.

scoped-interface-domain-kit:
  create each screen domain, store title/description/fields/meta, expose action descriptors, select action rows, mutate fields, activate actions.

interface-composition-kit:
  maintain active/previous screen, transition/back, activate current screen, dispatch nested action.command, auto-route outcome, expose active snapshot.

resource-ledger-kit:
  store resource balances, canPay, pay, add, expose values and last ledger event.

pressure-field-kit:
  track pressure channels, adjust channels, tick rowPressure and curse.

orchard-world-kit:
  seed tree rows, seed apples, collect nearest apple, reseed apples, expose orchard bounds.

construction-runtime-kit:
  validate build catalog, pay build cost, append built object, report message.

roster-runtime-kit:
  hire actors after money payment, append workers, report message.

inventory-runtime-kit:
  hold items and equipped item, equip by id.

active-session-domain-kit:
  move player, collect apples, clear pests, advance day/night, spawn/chase pests, end failed run, expose player/actions/message/score.

world-canvas-render-kit:
  draw trees, apples, pests, and player from snapshot state.

html-interface-render-kit:
  render active-session HUD or generic interface screen, bind data-action/data-command click routing.

smoke-fixture-kit:
  create game, assert entry route, activate Play, tick once, verify active-session and apples.
```

## Kits

```txt
implemented:
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

next-cut:
  market-action-catalog-kit
  market-action-id-catalog-kit
  market-command-source-manifest-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-command-journal-kit
  market-result-journal-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  interface-nested-result-adapter-kit
  market-result-projection-kit
  market-render-readback-kit
  market-gamehost-diagnostics-kit
  market-fixture-replay-kit
  central-ledger-readback-kit
```

## Main finding

The engine already has a usable command-result surface: `engine.command()` returns command results. The unresolved gap is that the Exchange/Market path does not consume that result surface. `interface-composition` discards nested command results, `exchange` only offers Back, the HTML renderer has no Exchange-specific projection/readback branch, and `GameHost` exposes only the raw engine snapshot.

## Next safe ledge

```txt
ZombieOrchard Market Result Ledger Parity Refresh + Exchange Fixture Gate
```

## Validation

This pass changed documentation only.

No runtime source files changed.

No local `npm test`, `npm run build`, browser smoke, Pages smoke, or DOM-free Market fixture was run.

No branch or PR was created.

All writes targeted `main`.
