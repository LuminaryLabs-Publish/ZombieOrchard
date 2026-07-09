# Architecture Audit: Market Nested Result DSK Map

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Current architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> src/game.js
  -> createKitRuntime({ kits })
  -> runtime domains
  -> renderers
  -> GameHost
```

## DSK/domain breakdown

```txt
zombie-orchard-domain
├─ browser-host-domain
│  ├─ static-route-kit
│  ├─ boot-module-kit
│  ├─ frame-loop-kit
│  └─ gamehost-diagnostics-kit
├─ runtime-domain
│  ├─ kit-runtime-kit
│  ├─ domain-registry-kit
│  ├─ command-router-kit
│  ├─ tick-dispatcher-kit
│  ├─ event-emitter-kit
│  └─ snapshot-aggregator-kit
├─ interface-domain
│  ├─ scoped-interface-domain-kit
│  ├─ entry-domain-kit
│  ├─ session-select-domain-kit
│  ├─ run-setup-domain-kit
│  ├─ active-session-domain-kit
│  ├─ interrupt-domain-kit
│  ├─ construction-domain-kit
│  ├─ exchange-domain-kit
│  ├─ roster-domain-kit
│  ├─ inventory-domain-kit
│  ├─ knowledge-domain-kit
│  ├─ preferences-domain-kit
│  ├─ outcome-domain-kit
│  └─ interface-composition-kit
├─ orchard-game-domain
│  ├─ resource-ledger-kit
│  ├─ pressure-field-kit
│  ├─ orchard-world-kit
│  ├─ construction-runtime-kit
│  ├─ roster-runtime-kit
│  ├─ inventory-runtime-kit
│  └─ active-session-runtime-kit
├─ render-domain
│  ├─ world-canvas-render-kit
│  └─ html-interface-render-kit
└─ market-authority-domain-next
   ├─ market-action-catalog-kit
   ├─ market-command-source-manifest-kit
   ├─ market-command-envelope-kit
   ├─ market-source-snapshot-kit
   ├─ market-price-source-kit
   ├─ market-capacity-policy-kit
   ├─ market-preflight-kit
   ├─ market-command-result-kit
   ├─ market-command-journal-kit
   ├─ market-result-journal-kit
   ├─ resource-transaction-history-kit
   ├─ inventory-purchase-intake-kit
   ├─ interface-nested-result-adapter-kit
   ├─ market-result-projection-kit
   ├─ market-render-readback-kit
   ├─ market-gamehost-diagnostics-kit
   └─ market-fixture-replay-kit
```

## Current command seams

`createKitRuntime.command(domainId, type, payload)` already returns an accepted/rejected result.

`interface-composition.activate` already resolves the active screen action and can call `ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})`.

The missing seam is retaining that nested result.

## Required result contract

```txt
MarketCommandResult
  id
  commandId
  source
  status: accepted | rejected
  reason
  before
  after
  mutation
  transaction
  inventoryIntake
  messages
```

## Required nested result contract

```txt
InterfaceNestedResultAdapter
  parentDomain: interface-composition
  activeScreen: exchange
  actionId
  nestedDomain
  nestedType
  nestedPayload
  nestedResult
  transitionResult
```

## Main finding

The current architecture is already kit-composed enough to support a narrow vertical source pass.

Do not replace the runtime. Add the Market authority layer and consume it through `interface-composition`, `html-interface-renderer`, and `GameHost` additively.

## Next source files

```txt
src/market/market-actions.js
src/market/market-source-manifest.js
src/market/market-command-envelope.js
src/market/market-source-snapshot.js
src/market/market-preflight.js
src/market/market-command-result.js
src/market/market-journal.js
src/market/market-projection.js
src/market/market-render-readback.js
src/market/market-gamehost-diagnostics.js
src/kits/game-domains.js
src/kits/composition.js
src/renderer/html-interface-renderer.js
src/start.js
scripts/zombie-orchard-market-result-fixture.mjs
```
