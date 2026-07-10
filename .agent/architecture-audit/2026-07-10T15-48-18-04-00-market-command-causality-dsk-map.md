# Architecture audit: Market command causality DSK map

Timestamp: `2026-07-10T15-48-18-04-00`

## Active composition

```txt
index.html
  -> boot.js
  -> start.js
  -> game.js
  -> createKitRuntime(kits)
  -> world canvas + HTML renderer
  -> GameHost raw diagnostics
```

## DSK/domain map

| Domain | Current owner | Current service | Missing causality proof |
| --- | --- | --- | --- |
| Runtime | `src/kits/runtime.js` | kit registration, command, tick, events, snapshot, notify | command sequence, request/result journal, durable events |
| Interface source | `src/presets/orchard-preset.js` | action descriptors and transitions | Market catalog, stable source rows, price/capacity policy |
| Scoped interface | `src/kits/scoped-interface-domains.js` | selection, fields, action lookup/activation | activation ID and source fingerprint |
| Composition | `src/kits/composition.js` | transition, back, parent activation, child dispatch | retained child result and parent-child correlation |
| Resources | `src/kits/game-domains.js` | canPay, pay, add | transaction ID, before/after/delta, reason, source command |
| Inventory | `src/kits/game-domains.js` | equip and item snapshot | purchase intake, capacity preflight, intake result |
| Exchange | generic scoped domain | Back-only screen | Market commands, result projection, latest transaction state |
| HTML renderer | `src/renderer/html-interface-renderer.js` | HUD and generic screens | Exchange projection consumption/readback |
| World renderer | `src/renderer/world-canvas.js` | orchard/session drawing | not the current Market blocker |
| GameHost | `src/start.js` | engine, getState, tick | bounded JSON-safe command/transaction journal |
| Fixture | `tests/smoke.mjs` | entry/play/apple reachability | accepted/rejected Market causality replay |

## Current parent-child result loss

```js
const result = activeDomain.command("activate", payload);
const action = result?.action;
if (action.command) ctx.engine.command(...);
return next ? move(next) : { accepted: true };
```

The parent result cannot answer:

```txt
which activation requested the child command
which child command ran
whether it was accepted or rejected
whether resources changed
whether inventory accepted the purchase
which projection and render frame consumed the result
```

## Required contract chain

```txt
MarketSourceRow
  -> InterfaceActivationRequest
  -> InterfaceActivationResult
  -> ChildCommandEnvelope
  -> MarketPreflightResult
  -> ResourceTransactionResult
  -> InventoryIntakeResult
  -> MarketCommandResult
  -> ExchangeProjectionRow
  -> RenderConsumptionRow
  -> GameHostJournalRow
```

Every row should carry stable IDs or correlation fields:

```txt
sourceId
actionId
activationId
commandId
transactionId
intakeId
frame
accepted
reason
mutation
```

## Domain-update-first recommendation

Update the existing boundaries first:

1. `kit-runtime` for command sequence and result journal.
2. `interface-composition-kit` for retained child results.
3. `resource-ledger-kit` for transaction rows.
4. `inventory-runtime-kit` for purchase intake.
5. `exchange-domain-kit` for Market projection.
6. `html-interface-render-kit` for consumption readback.
7. `game-host-diagnostics-kit` for bounded JSON-safe proof.

Create a new kit only where the capability is outside an existing owner, such as a shared Market source catalog or deterministic fixture adapter.

## Architecture conclusion

The existing kit split is adequate. The missing feature is a cross-domain causality contract, not a new engine architecture.