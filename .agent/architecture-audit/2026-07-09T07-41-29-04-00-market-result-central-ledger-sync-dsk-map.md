# ZombieOrchard Architecture Audit: Market Result Central Ledger Sync DSK Map

**Timestamp:** `2026-07-09T07-41-29-04-00`

## Selection

`ZombieOrchard` was selected because no checked non-Cavalry Publish repo was new, absent from central tracking, missing sampled root `.agent` state, or otherwise undocumented, and the central `LuminaryLabs-Dev/LuminaryLabs` ledger for this repo was behind repo-local `.agent` state.

## Current runtime architecture

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime({ kits })
  -> domain registry
  -> command router
  -> tick dispatcher
  -> snapshot aggregator
  -> world-canvas renderer
  -> html-interface-renderer
  -> window.GameHost
```

## Domains in use

### Runtime domains

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

### Next-cut Market authority domains

```txt
market-action-catalog
market-action-id-catalog
market-command-source-manifest
market-command-envelope
market-source-snapshot
market-price-source
market-capacity-policy
market-preflight
market-command-result
market-rejection-reason-catalog
market-command-journal
market-result-journal
resource-transaction-history
inventory-purchase-intake
interface-nested-result-adapter
market-result-projection
market-render-readback
market-gamehost-diagnostics
market-fixture-replay
central-ledger-readback
```

## Current kit services

```txt
createKitRuntime:
  install kits
  register domains
  route commands
  return command results
  tick domains
  emit events
  aggregate snapshots
  notify subscribers

createInterfaceDomainKits:
  create scoped interface screens
  normalize screen actions
  support select/set-field/activate
  return selected action descriptors

createInterfaceCompositionKit:
  track active/previous screen
  move between screens
  activate current screen action
  optionally dispatch nested action.command
  snapshot active screen state

createGameDomainKits:
  track resources
  adjust pressures
  seed orchard trees/apples
  collect apples near player
  build catalog items
  hire roster actors
  equip inventory
  move/collect/clear/phase active session

renderers:
  render orchard world from snapshots
  render active-session HUD
  render generic screen panels
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

The kit runtime is already good enough to support typed command results because `engine.command()` returns a result for every command route.

The blocker is not the runtime core. The blocker is that `interface-composition.activate` drops nested command results and the Exchange screen has no Market-specific source/projection/readback path.

## Next safe ledge

```txt
ZombieOrchard Market Result Ledger Central Sync + Exchange Transaction Fixture Gate
```
