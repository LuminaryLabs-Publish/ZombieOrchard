# Architecture Audit — Market Result Readback DSK Map

**Timestamp:** `2026-07-09T02-05-52-04-00`

## Architecture read

`ZombieOrchard` is already kit-composed at the runtime/domain level. The useful next change is a Market-result proof layer that connects source-owned Market actions to nested command result retention, renderer projection, readback, and GameHost diagnostics.

## Current runtime shape

```txt
src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> window.GameHost = { engine, getState, tick }
```

## Current DSK/domain composition

```txt
createOrchardGame()
  -> createKitRuntime({ kits })
  -> resource-ledger-kit
  -> pressure-field-kit
  -> orchard-world-kit
  -> construction-runtime-kit
  -> roster-runtime-kit
  -> inventory-runtime-kit
  -> scoped interface domain kits
  -> active-session-domain-kit
  -> interface-composition-kit
```

## Current domains

```txt
resource-ledger         domain: game
pressure-field          domain: game
orchard-world           domain: game
construction-runtime    domain: game
roster-runtime          domain: game
inventory-runtime       domain: game
active-session          domain: interface
entry                   domain: interface
session-select          domain: interface
run-setup               domain: interface
interrupt               domain: interface
construction            domain: interface
exchange                domain: interface
roster                  domain: interface
inventory               domain: interface
knowledge               domain: interface
preferences             domain: interface
outcome                 domain: interface
interface-composition   domain: interface-composition
```

## Current service boundaries

```txt
kit-runtime:
  - addKit
  - command
  - tick
  - snapshot
  - subscribe
  - emit events

interface-composition-kit:
  - transition
  - back
  - activate current interface action
  - dispatch nested action.command
  - switch active screen
  - expose active / previous / activeSnapshot

scoped-interface-domain-kit:
  - select action index
  - set fields
  - activate configured action
  - expose configured action list

game-domain kits:
  - resource add/pay/canPay
  - pressure adjustment
  - orchard tree/apple generation
  - nearby apple collection
  - construction build/payment
  - roster hire/payment
  - inventory equip
  - active-session move/collect/clear/next-phase
```

## Architecture gap

The router can return command results, but the nested result from `ctx.engine.command(...)` inside `interface-composition.activate` is ignored. That blocks deterministic Market fixture rows because a click on the exchange screen cannot prove the actual command result, mutation, rejection, or renderer projection.

## Next DSK cut

```txt
market-action-id-catalog-kit
  -> owns stable IDs like sell-apples, buy-basic-tool, buy-row-supply, back

market-command-source-manifest-kit
  -> owns source rows for labels, command type, price, capacity, and reasons

market-command-envelope-kit
  -> normalizes UI action rows into command envelopes

market-source-snapshot-kit
  -> snapshots resources, inventory, prices, and capacity before/after

market-preflight-kit
  -> classifies accepted/rejected commands before mutation

market-command-result-kit
  -> emits accepted/rejected/skipped result rows

market-command-journal-kit
  -> records requested command rows

market-result-journal-kit
  -> records result rows

resource-transaction-history-kit
  -> records accepted resource mutations

interface-nested-result-adapter-kit
  -> retains nested results in interface-composition

market-result-projection-kit
  -> projects result and market state for HTML renderer

market-render-readback-kit
  -> proves exchange renderer consumed the projection

market-gamehost-diagnostics-kit
  -> exposes fixture-readable market diagnostics

market-fixture-replay-kit
  -> runs accepted/rejected Market command rows without DOM/canvas/browser state
```

## Stop condition

Do not extract the whole runtime. Stop when the fixture proves:

```txt
stable action ID -> command envelope -> before snapshot -> preflight -> result -> mutation/no-mutation -> journals -> nested result retention -> exchange projection -> render readback -> GameHost diagnostics
```
