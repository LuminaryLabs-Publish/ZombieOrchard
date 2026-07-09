# Market Authority Audit: Nested Result Consumer Contract

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Current blocker

`interface-composition.activate` can execute nested action commands but does not preserve their return value.

Current shape:

```txt
activate action
  -> result = activeScreen.command("activate", payload)
  -> action = result.action
  -> if action.command: ctx.engine.command(...)
  -> nested result discarded
  -> maybe move(next)
```

## Required consumer behavior

```txt
activate action
  -> parent action result
  -> optional nested command envelope
  -> nested command result
  -> optional transition result
  -> retained lastResult
  -> snapshot includes lastResult
  -> renderer consumes lastResult/projection
  -> GameHost consumes diagnostics
```

## Contract

```txt
NestedCommandResult
  source: interface-composition
  activeBefore
  activeAfter
  actionId
  parentAccepted
  nestedDomain
  nestedType
  nestedPayload
  nestedAccepted
  nestedReason
  nestedResult
  transitionAccepted
  transitionTarget
```

## Market result contract

```txt
MarketCommandResult
  commandId
  actionId
  status
  reason
  before
  after
  resourceDelta
  inventoryDelta
  transaction
  journalIndex
  message
```

## Rejection reasons

```txt
unknown-market-action
unknown-market-command
no-apples
insufficient-money
capacity-full
missing-resource-ledger
missing-inventory-runtime
no-mutation
```

## Source files to touch next

```txt
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/start.js
src/market/*.js
scripts/zombie-orchard-market-result-fixture.mjs
```

## Safety rules

```txt
Do not remove existing return shapes.
Do not remove active/previous/activeSnapshot from interface-composition snapshot.
Do not turn Market into a large economy system yet.
Do not require DOM/canvas for fixture proof.
Do not break existing smoke test.
```

## Main finding

The next pass should be a result-consumer splice, not a content expansion.

Once nested results survive `interface-composition.activate`, the Exchange renderer and GameHost can be made source-readable with minimal runtime disruption.
