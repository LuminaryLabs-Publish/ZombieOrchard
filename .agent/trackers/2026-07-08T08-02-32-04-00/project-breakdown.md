# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T08-02-32-04-00`

## Selection

**Selected repo:** `LuminaryLabs-Publish/ZombieOrchard`

The accessible `LuminaryLabs-Publish` repo list was checked against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

No checked non-Cavalry repo was fully new, central-ledger absent, or missing root `.agent/START_HERE.md` state.

`TheUnmappedHouse` has the oldest visible local alignment, but its own start file records that the closed central rollup gap should no longer drive repeat selection. `ZombieOrchard` was therefore selected as the oldest eligible fallback follow-up with unresolved implementation planning.

`LuminaryLabs-Publish/TheCavalryOfRome` was not inspected for implementation work and remains excluded by rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/TheCavalryOfRome    excluded
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/ZombieOrchard       selected
```

## Product read

`ZombieOrchard` is a compact standalone kit-composed orchard survival/economy browser game shell.

The repo has a runtime/domain structure already. The next work is not to invent a new architecture. The next work is to add durable Market command/result authority and fixture coverage to the existing structure.

## Interaction loop

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createWorldCanvas(document.querySelector("#world"))
-> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
-> draw()
-> engine.tick(1 / 60)
-> pressure-field and active-session tick
-> engine.snapshot()
-> world.render(snapshot)
-> ui.render(snapshot)
-> click[data-action] routes to interface-composition.activate
-> click[data-command] routes directly to active-session command
-> window.GameHost exposes engine/getState/tick
```

## Gameplay loop

```txt
entry screen
-> Play
-> active-session
-> collect apples
-> clear pests
-> next phase day/night
-> build storage shed
-> open Market, Roster, Inventory, Codex, Settings, Pause
-> Market opens exchange shell
-> exchange currently only goes Back
-> night pressure can spawn pests
-> condition reaches zero
-> outcome screen
```

## Domains in use

```txt
runtime:
  static-browser-host, boot-module, runtime-entrypoint, game-factory, kit-runtime, engine-context, domain-registry, command-router, event-emitter, tick-dispatcher, snapshot-aggregator, subscription-bus, browser-animation-loop, GameHost, smoke-harness

interface:
  entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, outcome, interface-composition, html-interface-renderer

game:
  resource-ledger, pressure-field, orchard-world, construction-runtime, roster-runtime, inventory-runtime, active-session, world-canvas

market-authority-next:
  market-action-id-catalog, market-command-envelope, market-source-snapshot, market-price-source, market-capacity-policy, market-preflight, market-command-result, market-rejection-reason-catalog, market-result-journal, resource-transaction-history, inventory-purchase-intake, nested-command-result-propagation, market-result-projection, market-fixture-replay

render:
  world-canvas-render-kit, html-interface-render-kit, future exchange-projection-render branch
```

## Services the kits offer

```txt
current services:
  install kits
  register domains
  route commands
  tick domains
  emit events
  aggregate snapshots
  render orchard canvas from snapshots
  render active-session HUD and generic screens from snapshots
  transition interface screens
  dispatch nested screen actions
  store resource values and affordability helpers
  add/pay resources
  track pressure channels
  generate trees and random apples
  collect nearby apple
  build catalog items with resource payment
  hire roster actors with resource payment
  equip inventory items
  move player
  collect apples
  clear rows
  advance day/night phase
  expose engine/getState/tick through GameHost
  run minimal DOM-free entry/play/apple smoke

needed next services:
  define stable Market action ids
  normalize Market actions into envelopes
  create source snapshots for resources/inventory/prices/capacity
  preflight accepted/rejected commands
  produce stable command results and rejection reasons
  mutate resources/inventory only for accepted results
  append transaction history
  retain nested command results through interface-composition
  project Market state for HTML renderer
  expose fixture-readable Market diagnostics
  prove DOM-free Market fixture replay
```

## Kits identified

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

target next-cut:
  market-action-id-catalog-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-result-journal-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  nested-command-result-propagation-kit
  market-result-projection-kit
  market-fixture-replay-kit
```

## Source-backed findings

```txt
README.md:
  app is a standalone kit-composed orchard survival/economy game shell

src/start.js:
  engine tick/render loop is already concise and exposes GameHost

src/game.js:
  all major runtime/interface/game kits are installed through createKitRuntime

src/kits/runtime.js:
  command routing exists and returns result records, but no journal/replay surface exists

src/kits/composition.js:
  nested action.command dispatch exists, but nested result is dropped

src/presets/orchard-preset.js:
  exchange currently exposes only Back

src/kits/game-domains.js:
  resource ledger has no transaction history
  inventory runtime has no purchase intake
  active-session still owns many concerns but can stay stable during Market cutover

src/renderer/html-interface-renderer.js:
  no exchange-specific projection branch yet

tests/smoke.mjs:
  no Market fixture coverage yet
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/dsk-domain-breakdown.md
.agent/render-audit/canvas-render-audit.md
.agent/gameplay-audit/economy-market-audit.md
.agent/market-authority-audit/fixture-implementation-map.md
.agent/trackers/2026-07-08T08-02-32-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-02-32-04-00.md
```

## Central files changed

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T08-02-32-04-00-zombie-orchard-market-fixture-implementation-map.md
```

## Next safe ledge

```txt
ZombieOrchard Market Fixture Implementation Map
```

## Validation

```txt
connector repo search/read: performed
connector source readback: performed
connector doc writes to main: performed
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
GitHub Pages check: not run
```
