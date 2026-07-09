# ZombieOrchard Architecture Audit: Market Result Consumer Ledger Refresh

**Timestamp:** `2026-07-09T13-03-43-04-00`

## Scope

Documentation-only architecture pass for `LuminaryLabs-Publish/ZombieOrchard`.

No runtime source was changed.

## Selection result

The accessible `LuminaryLabs-Publish` org repo list was compared against central ledger state and sampled root `.agent` state.

No checked non-Cavalry repo was new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`ZombieOrchard` was selected as the oldest eligible central-ledger fallback with central tracking still at `2026-07-09T10-40-00-04-00` before this pass.

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
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders orchard state
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> data-action routes through interface-composition.activate
  -> data-command routes directly to active-session
  -> scoped interface domain activate returns action descriptors
  -> nested action.command can dispatch through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> exchange screen has no Market-specific projection/readback branch
  -> window.GameHost exposes engine/getState/tick
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
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas-renderer
html-interface-renderer
smoke-harness
repo-local-agent-ledger
central-ledger-readback
```

## Current kit service map

```txt
kit-runtime:
  - addKit(kit)
  - command(domainId, type, payload)
  - tick(delta)
  - snapshot()
  - subscribe(listener)
  - ctx.emit(type, payload)

scoped-interface-domain-kit:
  - screen snapshot
  - selected action state
  - action activation
  - field mutation
  - actionRequested events

interface-composition-kit:
  - transition
  - back
  - activate current screen
  - dispatch optional nested action.command
  - route active-session ended state to outcome
  - expose active screen snapshot

resource-ledger-kit:
  - canPay(cost)
  - pay(cost)
  - add(values)
  - add/pay commands
  - resource snapshot

pressure-field-kit:
  - adjust(id, amount)
  - row pressure tick
  - curse tick
  - pressure snapshot

orchard-world-kit:
  - tree grid generation
  - apple seeding
  - collectNear(point, radius)
  - orchard snapshot

construction-runtime-kit:
  - build command
  - catalog lookup
  - resource payment
  - built-object append
  - construction snapshot

roster-runtime-kit:
  - hire command
  - money payment
  - actor append
  - roster snapshot

inventory-runtime-kit:
  - equip command
  - inventory snapshot

active-session-domain-kit:
  - move
  - collect
  - clear
  - next-phase
  - pest spawn/chase/damage
  - end condition
  - active-session snapshot

world-canvas-render-kit:
  - draw trees
  - draw apples
  - draw pests
  - draw built objects
  - draw player

html-interface-render-kit:
  - listen for action/command clicks
  - render active-session HUD
  - render generic interface screen
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

## Main architecture finding

The runtime command surface is already result-capable. The architectural gap is not `createKitRuntime`; it is the missing Market result consumer seam between nested screen actions, source-owned Market commands, renderer projection/readback, and GameHost diagnostics.

## Next ledge

```txt
ZombieOrchard Market Result Consumer Ledger Refresh + Exchange Fixture Gate
```

Keep this ledge additive and source-first.
