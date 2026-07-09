# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T23-40-55-04-00`

## Goal

Compare the current `LuminaryLabs-Publish` repo set against central tracking, select one eligible repo, and refresh repo-local `.agent` documentation without changing runtime source.

## Selection checklist

- [x] Checked accessible `LuminaryLabs-Publish` repositories.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared against central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Sampled repo-local root `.agent/START_HERE.md` state.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read current repo-local `.agent` state.
- [x] Read `package.json`, `src/start.js`, `src/game.js`, `src/kits/runtime.js`, `src/kits/composition.js`, `src/kits/scoped-interface-domains.js`, `src/kits/game-domains.js`, `src/presets/orchard-preset.js`, and `src/renderer/html-interface-renderer.js`.
- [x] Identified the interaction loop.
- [x] Identified all domains in use.
- [x] Identified services offered by current and planned kits.
- [x] Identified implemented and next-cut kits.
- [x] Added tracker, turn ledger, architecture audit, render audit, gameplay audit, market-authority audit, and deploy audit.
- [x] Refreshed root `.agent` docs and kit registry.
- [x] Logged the change in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Pushed to `main` only.

## Publish organization comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/ZombieOrchard       selected / repo-local newer than stale central ledger / latest repo-local 2026-07-08T23-29-18-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T23-19-33-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-08T21-50-56-04-00
```

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`ZombieOrchard` was selected because its repo-local `.agent` state had advanced to `2026-07-08T23-29-18-04-00`, while the central ledger still pointed at `2026-07-08T21-18-39-04-00`. This pass updates the repo-local handoff and central ledger together around the same Market adapter/consumer fixture gate.

## Current interaction loop

```txt
open index.html
  -> src/boot.js imports src/start.js
  -> src/start.js creates createOrchardGame(), createWorldCanvas(), createHtmlInterfaceRenderer(), and draw loop
  -> src/game.js installs kit-runtime domains from orchardPreset
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> runtime clamps dt, advances frame/elapsed, clears events, and ticks tickable domains
  -> pressure-field and active-session mutate over time
  -> engine.snapshot() aggregates every domain snapshot
  -> world-canvas renders trees, apples, pests, player, and world state from snapshot
  -> html-interface-renderer renders either active-session HUD or generic active screen
  -> active-session data-command buttons call engine.command("active-session", command)
  -> interface data-action buttons call engine.command("interface-composition", "activate", { actionId })
  -> interface-composition may dispatch nested action.command through ctx.engine.command(...)
  -> nested result is currently discarded
  -> interface-composition snapshot only exposes active, previous, and activeSnapshot
  -> window.GameHost exposes engine, getState, and tick
```

## Domains in use

```txt
runtime:
  static-browser-host
  boot-module
  runtime-entrypoint
  kit-runtime
  engine-context
  domain-registry
  command-router
  event-emitter
  tick-dispatcher
  snapshot-aggregator
  subscription-bus
  browser-animation-loop
  GameHost compatibility
  smoke-harness

interface:
  entry
  session-select
  run-setup
  active-session
  interrupt
  construction
  exchange
  roster
  inventory
  knowledge
  preferences
  outcome
  interface-composition
  html-interface-renderer

simulation/game:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas renderer

market-authority-next:
  market-action-id-catalog
  market-command-source-manifest
  market-command-envelope
  market-source-snapshot
  market-price-source
  market-capacity-policy
  market-preflight
  market-command-result
  market-rejection-reason-catalog
  market-command-journal
  market-result-journal
  resource-transaction-history
  inventory-purchase-intake
  interface-nested-result-adapter
  market-result-projection
  market-render-readback
  market-gamehost-diagnostics
  market-fixture-replay
```

## Services offered by current kits

```txt
kit-runtime:
  install kits
  register domains
  route commands
  return command results
  tick domains
  emit frame-scoped events
  aggregate snapshots
  notify subscribers

interface domain kits:
  expose screen metadata
  select action rows
  set simple field values
  return action descriptors from activate
  snapshot screen state and action rows

interface-composition-kit:
  transition active screen
  back to previous or initial screen
  activate current screen action
  dispatch nested action.command through ctx.engine.command
  auto-route ended active-session to outcome
  snapshot active/previous/activeSnapshot

resource-ledger-kit:
  store resource values
  canPay(cost)
  pay(cost)
  add(values)
  command add/pay
  snapshot values and last mutation label

pressure-field-kit:
  adjust pressure channels
  tick rowPressure and curse
  snapshot channels

orchard-world-kit:
  generate trees
  seed apples with Math.random
  collect nearest apple
  reseed apples
  snapshot trees/apples/bounds

construction-runtime-kit:
  read build catalog
  pay resource cost
  append built item
  set message
  snapshot catalog/built/message

roster-runtime-kit:
  pay hire cost
  append actor
  set message
  snapshot actors/roles/message

inventory-runtime-kit:
  equip item
  snapshot items/equipped

active-session-domain-kit:
  expose active-session navigation actions
  move player
  collect apples
  clear pests
  advance day/night phase
  spawn/advance pests at night
  end run when condition reaches zero
  snapshot player, pests, score, message, phase, and actions

renderers:
  world-canvas renders orchard state from snapshots
  html-interface-renderer renders HUD and generic screen panels from snapshots
```

## Kits identified

```txt
implemented/source-backed:
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
```

## Main finding

The runtime already has the right baseline command router: `engine.command()` returns command results. The unresolved gap is consumer retention and projection. `interface-composition` dispatches nested commands but drops the nested result, `exchange` only exposes Back, the HTML renderer has no exchange projection branch, and `window.GameHost` exposes only the baseline engine/getState/tick surface.

Do not expand the economy first. Add a Market source manifest, result contract, nested result adapter, projection/readback, GameHost diagnostics, and fixture rows before adding broader exchange content.

## Next safe ledge

```txt
ZombieOrchard Market Consumer Fixture Readback + Central Ledger Sync Gate
```

## Validation state

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
DOM-free market fixture: not run because source files do not exist yet
pushed to main: yes
```
