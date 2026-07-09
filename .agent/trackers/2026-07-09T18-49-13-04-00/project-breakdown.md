# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/ZombieOrchard`

The current public `LuminaryLabs-Publish` repository list was checked against central tracking and sampled root `.agent` state. No checked public non-Cavalry repo was new, central-ledger absent, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`ZombieOrchard` was selected as the oldest eligible public documented fallback after the latest PhantomCommand and HorrorCorridor refreshes. Its central ledger was at `2026-07-09T16-38-14-04-00` before this pass.

## Public Publish repositories checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        selected / oldest eligible documented fallback / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T18-41-55-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T18-30-30-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T18-20-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

## Product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

The repo has a compact kit runtime, generated interface domains, active-session gameplay, resource/pressure/world/construction/roster/inventory kits, a canvas renderer, an HTML renderer, `window.GameHost`, static build, and smoke test.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard trees, apples, pests, and player
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> click[data-action] routes through interface-composition.activate
  -> scoped interface domain returns action descriptor
  -> optional action.command dispatches through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> next action.to or transition table moves active screen
  -> click[data-command] routes directly to active-session
  -> Exchange/Market remains a generic screen with Back only
  -> window.GameHost exposes engine, getState, and tick
```

## Domains in use

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
kit-runtime
engine-context
domain-registry
command-router
event-emitter
tick-dispatcher
snapshot-aggregator
browser-animation-loop
GameHost
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
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas-renderer
html-interface-renderer
market-action-catalog-next
market-command-source-manifest-next
market-command-envelope-next
market-source-snapshot-next
market-preflight-next
market-command-result-next
market-command-journal-next
market-result-journal-next
resource-transaction-history-next
inventory-purchase-intake-next
interface-nested-result-adapter-next
market-result-projection-next
market-render-readback-next
market-gamehost-diagnostics-next
market-fixture-replay-next
central-ledger-readback
```

## Services in use

```txt
createKitRuntime:
  register domains, route commands, return command results, tick domains, emit events, aggregate snapshots, notify subscribers

interface-composition:
  transition/back, activate active screen, dispatch nested action.command, route next screen, auto-route outcome, expose activeSnapshot

resource-ledger:
  hold resources, affordability helpers, add/pay commands, snapshots

pressure-field:
  track rowPressure and curse drift

orchard-world:
  generate orchard apples/pests/player world and collect apple rows

construction-runtime:
  build catalog items by paying resources

roster-runtime and inventory-runtime:
  expose actors/items/equipped snapshots

active-session:
  movement, collect, clear, phase advance, pests, session end, HUD actions

world-canvas:
  render orchard state from snapshots

html-interface-renderer:
  render active-session HUD or generic screen panels and route data-action/data-command clicks
```

## Kits identified

Current kits:

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

Next-cut kits:

```txt
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

Do not replace the runtime, rebuild the renderer, expand economy categories, or add save/load next.

The durable blocker is nested Market result readback. `engine.command()` already returns result records, but `interface-composition` dispatches nested `action.command` calls and discards the nested result. Exchange is still Back-only in `orchard-preset.js`, the HTML renderer has no Exchange-specific Market projection/readback branch, and `GameHost` exposes no Market diagnostics beyond raw engine state.

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Readback Refresh + Exchange Fixture Gate
```

## Validation

Documentation-only pass. Runtime source was not changed. No `npm test`, `npm run build`, browser smoke, branch, or pull request was created.
