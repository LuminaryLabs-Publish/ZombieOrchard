# ZombieOrchard Architecture Audit: Market Nested Result Readback DSK Map

**Timestamp:** `2026-07-09T07-30-48-04-00`

## Goal

Freeze the current domain/service/kit map and define the next Market authority cut without changing runtime source.

## Current architecture loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> kit.create(ctx) for each kit
  -> domains registered by id
  -> engine.command(domainId, type, payload)
  -> engine.tick(delta)
  -> engine.snapshot()
  -> world-canvas + html-interface-renderer consume snapshots
  -> window.GameHost exposes engine/getState/tick
```

## Installed domain kits

```txt
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
active-session-domain-kit
interface-composition-kit
```

## Current domains

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
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
```

## Current service map

```txt
kit-runtime:
  - owns ctx, domain registry, command routing, ticking, events, snapshots, subscriptions

scoped-interface-domain-kit:
  - owns screen descriptor state, selectedIndex, fields, meta, actions, activate/select/set-field

interface-composition-kit:
  - owns active screen, previous screen, transition/back/activate routing
  - can dispatch nested action.command
  - currently drops nested result
  - currently snapshots active/previous/activeSnapshot only

resource-ledger-kit:
  - owns resource values and last movement tag
  - offers canPay, pay, add, add command, pay command

pressure-field-kit:
  - owns pressure channels
  - offers adjust API and adjust command
  - ticks rowPressure and curse upward

orchard-world-kit:
  - owns tree descriptors and apple descriptors
  - offers collectNear(point, radius)
  - reseeds apples randomly

construction-runtime-kit:
  - owns build catalog, built records, message
  - consumes resource-ledger.pay

roster-runtime-kit:
  - owns actors, roles, message
  - consumes resource-ledger.pay

inventory-runtime-kit:
  - owns items and equipped id
  - offers equip command

active-session-domain-kit:
  - owns day, phase, player, pests, score, message, ended
  - owns move, collect, clear, next-phase
  - consumes orchard-world.collectNear, resource-ledger.add, pressure-field.adjust
```

## Next-cut Market authority kits

```txt
market-action-catalog-kit:
  source of sell/buy/back rows and labels

market-action-id-catalog-kit:
  stable ids: sell-apples, buy-basic-tool, buy-row-supply, back

market-command-source-manifest-kit:
  source-owned price, output, capacity, and reason metadata

market-command-envelope-kit:
  normalizes UI action into typed command envelope

market-source-snapshot-kit:
  captures resources, inventory, prices, capacity, and active interface before/after

market-preflight-kit:
  accepts or rejects Market command before mutation

market-command-result-kit:
  stable accepted/rejected result shape with reason, before, after, transaction id

market-rejection-reason-catalog-kit:
  stable reasons for missing-apples, missing-money, capacity-full, unknown-action

market-command-journal-kit:
  append-only command attempts

market-result-journal-kit:
  append-only result rows

resource-transaction-history-kit:
  accepted resource deltas for Market commands

inventory-purchase-intake-kit:
  accepted inventory rows for Market buys

interface-nested-result-adapter-kit:
  preserves nested engine.command result from interface-composition.activate

market-result-projection-kit:
  render-ready result summary for Exchange screen

market-render-readback-kit:
  proves html-interface-renderer consumed Market projection

market-gamehost-diagnostics-kit:
  additive GameHost diagnostics for Market fixture rows

market-fixture-replay-kit:
  DOM-free fixture proving accepted, rejected, unchanged, nested, projection, readback rows
```

## Architectural blocker

The core runtime already has command return values, but composition loses the most important one. `interface-composition.activate` delegates to the active interface, optionally executes `action.command`, and then discards the nested result.

The first implementation must therefore be a consumer-safe adapter path, not an engine replacement.

## Stop condition for next source cut

```txt
DOM-free fixture proves:
  - exchange has stable actions
  - accepted sell/buy commands mutate expected state
  - rejected commands do not mutate state
  - nested result is retained in interface-composition snapshot
  - Market projection is produced
  - renderer readback consumes projection
  - GameHost exposes additive diagnostics
```
