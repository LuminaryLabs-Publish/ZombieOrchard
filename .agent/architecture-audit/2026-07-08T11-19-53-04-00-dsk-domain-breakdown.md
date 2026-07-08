# ZombieOrchard DSK / Domain Breakdown

**Timestamp:** `2026-07-08T11-19-53-04-00`

## Goal

Document the current domain/service/kit map and isolate the next implementation seam without changing runtime code.

## Current runtime loop

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
-> engine.snapshot()
-> world.render(snapshot)
-> ui.render(snapshot)
-> window.GameHost.getState()
```

## Domains in use

### Runtime host domains

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
window-gamehost
smoke-harness
```

### Interface domains

```txt
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
```

### Game domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
active-session
world-canvas
```

### Next Market authority domains

```txt
market-action-id-catalog
market-command-envelope
market-source-snapshot
market-price-source
market-capacity-policy
market-preflight
market-command-result
market-rejection-reason-catalog
market-result-journal
resource-transaction-history
inventory-purchase-intake
nested-command-result-propagation
market-result-projection
market-render-readback
market-fixture-replay
```

## Services offered by current kits

```txt
kit-runtime:
  install kits, register domains, route commands, tick domains, emit events, aggregate snapshots, notify subscribers

scoped-interface-domain-kit:
  create per-screen domains, hold screen fields/meta/actions, handle select/set-field/activate, emit actionRequested

interface-composition-kit:
  hold active and previous screen, transition/back, call active screen activation, dispatch nested action.command, expose activeSnapshot

resource-ledger-kit:
  hold resource values, canPay, pay, add, command add/pay, expose values snapshot

pressure-field-kit:
  hold pressure channels, adjust channels, tick row pressure and curse, expose channels snapshot

orchard-world-kit:
  build tree grid, seed apples, collect nearest apple, reseed apples, expose trees/apples/bounds

construction-runtime-kit:
  read construction catalog, pay resources, append built structures, expose build message

roster-runtime-kit:
  hire actors with resource payment, expose actors/roles/message

inventory-runtime-kit:
  hold items/equipped, equip items, expose inventory snapshot

active-session-domain-kit:
  own day/phase/player/pests/score/message, move, collect, clear, next-phase, night pest spawning, session ending

world-canvas-render-kit:
  render tree/apple/pest/player rectangles from snapshot data

html-interface-render-kit:
  route data-action/data-command clicks, render active-session HUD, render generic screen panels/cards

smoke-fixture-kit:
  instantiate game, assert entry, activate Play, tick, assert active-session and apples
```

## Kits in use

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

## Next-cut kit list

```txt
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
market-render-readback-kit
market-fixture-replay-kit
```

## Main seam

`src/kits/runtime.js` already lets a domain return command results, but `src/kits/composition.js` does not keep the result from nested `action.command` dispatch.

That means Market can be implemented as a small additive source-authority layer instead of rewriting the engine.

## Required implementation invariant

```txt
HTML renderer may display Market rows.
HTML renderer must not own Market prices, affordability, capacity, transaction records, or result acceptance.
```
