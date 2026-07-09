# ZombieOrchard Market Adapter Consumer DSK Map

**Timestamp:** `2026-07-08T23-29-18-04-00`

## Scope

This audit maps the current DSK/runtime shape and the next source-safe Market adapter boundary.

No runtime source changed in this pass.

## Current runtime composition

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> createWorldCanvas(canvas)
  -> createHtmlInterfaceRenderer({ root, engine })
  -> requestAnimationFrame(draw)
```

## Current installed kit chain

```txt
createResourceLedgerKit(preset.resources)
createPressureFieldKit(preset.pressures)
createOrchardWorldKit(preset.world)
createConstructionRuntimeKit(preset.construction)
createRosterRuntimeKit(preset.roster)
createInventoryRuntimeKit(preset.inventory)
createScopedInterfaceDomainKit(entry)
createScopedInterfaceDomainKit(session-select)
createScopedInterfaceDomainKit(run-setup)
createScopedInterfaceDomainKit(interrupt)
createScopedInterfaceDomainKit(construction)
createScopedInterfaceDomainKit(exchange)
createScopedInterfaceDomainKit(roster)
createScopedInterfaceDomainKit(inventory)
createScopedInterfaceDomainKit(knowledge)
createScopedInterfaceDomainKit(preferences)
createScopedInterfaceDomainKit(outcome)
createActiveSessionDomainKit(preset.interface["active-session"])
createInterfaceCompositionKit({ initial: "entry" })
```

## Current domains

```txt
runtime:
  kit-runtime
  engine-context
  domain-registry
  command-router
  event-emitter
  tick-dispatcher
  snapshot-aggregator
  subscription-bus
  GameHost

interface:
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

game:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas
```

## Current services

```txt
kit-runtime:
  addKit
  command(domainId, type, payload)
  tick(delta)
  snapshot()
  subscribe(listener)

resource-ledger:
  canPay(cost)
  pay(cost)
  add(values)
  command add/pay
  snapshot values/last

pressure-field:
  adjust(id, amount)
  tick rowPressure/curse
  snapshot channels

orchard-world:
  generate trees
  seed random apples
  collect nearest apple
  reseed apples
  snapshot trees/apples/bounds

construction-runtime:
  build catalog item
  pay resources
  append built record
  snapshot catalog/built/message

roster-runtime:
  hire actor
  pay money
  snapshot actors/roles/message

inventory-runtime:
  equip item
  snapshot items/equipped

active-session:
  activate UI actions
  move player
  collect apple
  clear pest
  next phase
  tick pests/health/end state
  snapshot session/actions

interface-composition:
  transition
  back
  activate active screen action
  dispatch nested action.command
  snapshot active/previous/activeSnapshot
```

## Current adapter gap

`interface-composition` calls `ctx.engine.command(action.command.domain || state.active, action.command.type, action.command.payload || {})` for nested actions, but the returned nested command result is not retained, returned, journaled, or exposed in snapshots.

That is the Market seam.

## Target DSK/domain cut

```txt
market-action-id-catalog-kit:
  owns action ids, command types, and projection ids.

market-command-source-manifest-kit:
  owns Market command rows, price rows, capacity rows, reason rows, and route/action metadata.

market-command-envelope-kit:
  normalizes UI/preset action rows into command envelopes.

market-source-snapshot-kit:
  captures resources, inventory, price, capacity, and command-source fingerprints before/after.

market-preflight-kit:
  evaluates quantity, funds, apples, inventory capacity, unknown command, and source availability.

market-command-result-kit:
  returns accepted/rejected result records with stable reason, mutation summary, and before/after snapshots.

market-command-journal-kit:
  appends command input rows.

market-result-journal-kit:
  appends result output rows.

resource-transaction-history-kit:
  appends accepted resource/inventory mutation records without breaking resource-ledger values.

inventory-purchase-intake-kit:
  accepts purchased tools/supplies with capacity checks.

interface-nested-result-adapter-kit:
  converts nested ctx.engine.command output into snapshot.lastResult and a stable consumer payload.

market-result-projection-kit:
  converts source-owned result/journal rows into renderer-ready projection rows.

market-render-readback-kit:
  reports whether the exchange renderer consumed projection rows and avoided source authority.

market-fixture-replay-kit:
  runs DOM-free fixture rows for accepted, rejected, no-mutation, projection, readback, and GameHost compatibility.
```

## Target authority chain

```txt
exchange action row
  -> MarketCommandSourceManifest
  -> MarketCommandEnvelope
  -> MarketSourceSnapshot before
  -> MarketPreflight
  -> MarketCommandResult
  -> accepted mutation only or rejected no-mutation
  -> TransactionRecord if accepted
  -> MarketCommandJournal row
  -> MarketResultJournal row
  -> MarketSourceSnapshot after
  -> InterfaceNestedResultAdapter
  -> interface-composition snapshot.lastResult
  -> MarketResultProjection
  -> MarketRenderReadback
  -> GameHost.market
  -> tests/market-transaction-fixture.mjs
```

## Required preservation rules

```txt
- Preserve createOrchardGame().
- Preserve current kit runtime addKit/command/tick/snapshot/subscribe signatures.
- Preserve resource-ledger values/canPay/pay/add.
- Preserve inventory-runtime items/equipped shape.
- Preserve active-session Collect/Clear/Next Phase data-command behavior.
- Preserve world-canvas renderer behavior.
- Preserve GameHost.engine/getState/tick.
- Add Market diagnostics and fixture helpers additively.
```

## Stop line

Stop after the fixture proves Market source manifest rows, command envelopes, accepted/rejected results, no-mutation, transaction history, nested result adapter, projection, renderer readback, and GameHost compatibility.
