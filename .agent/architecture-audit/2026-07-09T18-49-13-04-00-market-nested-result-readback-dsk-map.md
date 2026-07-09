# ZombieOrchard Market Nested Result Readback DSK Map

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Current architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> generated interface domain kits
  -> active-session + resource/world/pressure/construction/roster/inventory kits
  -> interface-composition-kit
  -> requestAnimationFrame(draw)
  -> engine.tick()
  -> engine.snapshot()
  -> world-canvas.render(snapshot)
  -> html-interface-renderer.render(snapshot)
  -> window.GameHost
```

## DSK boundary read

The kit runtime is already useful. It routes commands and returns command results.

The missing DSK boundary is Market consumer readback:

```txt
[data-action] -> interface-composition.activate
  -> active screen command returns action descriptor
  -> optional action.command dispatches nested ctx.engine.command(...)
  -> nested result is discarded
  -> no lastResult in interface-composition snapshot
  -> no Exchange-specific render projection
  -> no Market GameHost diagnostics
```

## Current domains

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
```

## Target Market DSK sequence

```txt
market-action-catalog-kit
  -> market-command-source-manifest-kit
  -> market-command-envelope-kit
  -> market-source-snapshot-kit
  -> market-preflight-kit
  -> market-command-result-kit
  -> market-command-journal-kit
  -> market-result-journal-kit
  -> resource-transaction-history-kit
  -> inventory-purchase-intake-kit
  -> interface-nested-result-adapter-kit
  -> market-result-projection-kit
  -> market-render-readback-kit
  -> market-gamehost-diagnostics-kit
  -> market-fixture-replay-kit
  -> central-ledger-readback-kit
```
