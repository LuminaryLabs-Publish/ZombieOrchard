# Architecture audit: Market nested result retention DSK map

Timestamp: 2026-07-10T14-21-28-04-00

## Current route

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime(...kits)
  -> world canvas renderer + HTML interface renderer
  -> GameHost raw diagnostics
```

## DSK/domain map

| Domain | Current owner | Service | Missing proof |
| --- | --- | --- | --- |
| Runtime | `src/kits/runtime.js` | register kits, command, tick, snapshot, events | command journal projection |
| Interface | `scoped-interface-domains.js` | generic screen actions and commands | stable action/source manifest |
| Composition | `composition.js` | active screen, transition, back, nested command dispatch | retained nested command result |
| Resources | `game-domains.js` | pay/add/canPay | transaction history tied to Market result |
| Inventory | `game-domains.js` | equip/items | purchase intake rows |
| Exchange | scoped interface domain | generic screen and Back action | Market projection/readback rows |
| HTML renderer | `html-interface-renderer.js` | HUD and generic screens | Market-specific render readback |
| World canvas | `world-canvas.js` | orchard world drawing | not the current blocker |
| GameHost | `start.js` | raw engine/getState/tick | JSON-safe `market` diagnostics |

## Architecture blocker

The engine command boundary is result-first enough to build on. The problem is the parent interface activation path drops nested results:

```txt
if (action.command) ctx.engine.command(...)
return next ? move(next) : { accepted: true }
```

The returned parent result loses whether the nested Market command was accepted, rejected, skipped, or mutated resources/inventory.

## Next architecture ledge

Add a retained nested result adapter and Market result ledger before new economy, renderer, or content work.
