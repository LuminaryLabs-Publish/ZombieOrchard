# Architecture Audit — Market Result Retention DSK Map

## Timestamp

```txt
2026-07-10T11-20-54-04-00
```

## Current architecture

```txt
createOrchardGame()
  -> createKitRuntime()
  -> resource/pressure/world/runtime kits
  -> scoped interface domain kits
  -> active-session-domain-kit
  -> interface-composition-kit

start.js
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> GameHost = { engine, getState, tick }
```

## Current command seam

```txt
html-interface-renderer click data-action
  -> engine.command("interface-composition", "activate", { actionId })
  -> composition resolves active domain action
  -> action.command dispatches engine.command(...)
  -> nested command result is dropped
  -> composition returns transition result or { accepted: true }
```

## DSK map

```txt
kit-runtime
  owns domain install, command dispatch, tick, snapshot, notify

scoped-interface-domain-kit
  owns generic screen state and action definitions

interface-composition-kit
  owns active screen and nested command dispatch
  missing: nested result retention and readback row

resource-ledger-kit
  owns pay/add but not transaction history rows

inventory-runtime-kit
  owns inventory state but not purchase intake rows

exchange-domain-kit
  currently generic interface screen
  missing: Market source/projection/readback

html-interface-render-kit
  owns generic screen and active-session HUD render
  missing: Market projection/readback branch

game-host-diagnostics-kit
  currently window.GameHost raw engine/getState/tick
  missing: JSON-safe Market diagnostics
```

## Required next architecture

```txt
market-source-manifest-kit
market-command-envelope-kit
market-preflight-kit
market-result-retention-kit
market-command-journal-kit
market-resource-transaction-kit
market-inventory-intake-kit
exchange-market-projection-kit
market-render-readback-kit
market-gamehost-diagnostics-kit
market-fixture-replay-kit
```
