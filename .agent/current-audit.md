# ZombieOrchard Current Audit

**Timestamp:** `2026-07-09T10-40-00-04-00`

## Summary

`ZombieOrchard` is a standalone static browser orchard survival/economy shell with a compact kit runtime, generated interface domains, game-domain kits, a canvas renderer, an HTML renderer, and a minimal smoke harness.

The repo is not missing a route, game factory, static build command, command router, first playable loop, or smoke script. The current blocker remains narrower: the Market/Exchange path needs source-owned command/result records, nested command-result retention, exchange-specific projection, renderer readback, GameHost diagnostics, and a DOM-free fixture.

This pass keeps runtime code unchanged and refreshes repo-local docs plus central tracking from `2026-07-09T07-41-29-04-00` to `2026-07-09T10-40-00-04-00`.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> draw()
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)
```

Input routing:

```txt
[data-action] click
  -> engine.command("interface-composition", "activate", { actionId })
  -> active screen domain returns action descriptor
  -> optional nested action.command runs through ctx.engine.command(...)
  -> nested result is discarded
  -> optional transition moves active screen

[data-command] click
  -> engine.command("active-session", command)
  -> active-session command mutates session/world/resource state
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
subscription-bus
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
html-interface-renderer
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas
smoke-harness
```

## Services kits offer today

```txt
kit-runtime:
  install kits
  register domains
  route commands
  return command results
  tick domains
  emit events
  aggregate snapshots
  notify subscribers

scoped-interface-domain-kit family:
  expose screen title/description/actions
  accept activate(actionId)
  return action descriptors
  support screen transitions

interface-composition-kit:
  track active/previous screen
  dispatch active screen actions
  optionally dispatch nested action.command
  transition screens
  expose activeSnapshot

resource-ledger-kit:
  store resource values
  add resources
  pay resources
  answer affordability checks

pressure-field-kit:
  track pressure channels
  tick pressure changes

orchard-world-kit:
  generate orchard trees/apples/pests
  move player
  collect apples
  clear pests
  expose world snapshot

construction-runtime-kit:
  expose build catalog
  pay for builds
  append built objects

roster-runtime-kit:
  expose actors
  hire actors through resource payment

inventory-runtime-kit:
  expose items
  equip/own inventory rows

active-session-domain-kit:
  process collect/clear/next-phase commands
  mutate day/phase/player/message/score
  project session actions

world-canvas-render-kit:
  consume orchard snapshot
  render trees/apples/pests/buildings/player

html-interface-render-kit:
  consume interface/resource/session snapshots
  render active-session HUD or generic screen panel
```

## Current kits

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

## Next-cut kits

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

Do not replace the runtime next. `engine.command()` already returns command results, but `interface-composition.activate` still discards nested command results and the Exchange screen still has no Market-specific projection/readback branch.

## Next safe ledge

```txt
ZombieOrchard Market Readback Central Refresh + Exchange Result Fixture Gate
```
