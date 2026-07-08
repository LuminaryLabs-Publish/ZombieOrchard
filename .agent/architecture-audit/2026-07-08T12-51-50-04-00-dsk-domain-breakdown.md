# ZombieOrchard DSK / Domain Breakdown

**Timestamp:** `2026-07-08T12-51-50-04-00`

## Selection

`LuminaryLabs-Publish/ZombieOrchard` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

All checked non-Cavalry repos were ledgered and had sampled root `.agent` state, so this run used the oldest observed eligible fallback rule.

## Runtime route

```txt
index.html
-> src/boot.js
-> src/start.js
-> createOrchardGame()
-> createKitRuntime({ kits })
-> requestAnimationFrame(draw)
-> engine.tick(1 / 60)
-> engine.snapshot()
-> world.render(snapshot)
-> ui.render(snapshot)
```

## Interaction loop

```txt
Entry screen
-> Play
-> active-session interface domain
-> active-session HUD and canvas world
-> data-command buttons route directly to active-session for collect/clear/next-phase
-> data-action buttons route through interface-composition.activate
-> Build/Market/Roster/Inventory/Codex/Settings screens
-> exchange screen exists but currently only routes Back
-> outcome appears when active-session ends
```

## Domains in use

```txt
runtime domains:
  static browser host
  boot module
  runtime entrypoint
  kit runtime
  engine context
  command router
  tick dispatcher
  event emitter
  snapshot aggregator
  subscription bus
  GameHost diagnostics

interface domains:
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

game domains:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas

market authority domains needed next:
  market-action-id-catalog
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
  nested-command-result-propagation
  market-result-projection
  market-render-readback
  market-fixture-replay
```

## Services offered by current kits

```txt
kit-runtime:
  install kits
  register domains
  route commands
  tick domains
  emit events
  aggregate snapshots
  notify subscribers

scoped-interface-domain-kit:
  create interface screen state
  expose action rows
  select action rows
  set fields
  activate actions
  snapshot current screen state and action list

interface-composition-kit:
  track active screen
  transition screens
  go back
  invoke active screen actions
  dispatch nested action.command calls
  expose active screen snapshot

resource-ledger-kit:
  track resource values
  check affordability
  pay costs
  add resources
  snapshot values and last message

pressure-field-kit:
  track pressure channels
  adjust pressure channels
  tick row pressure and curse

orchard-world-kit:
  create tree grid
  seed apples
  collect nearest apple
  expose trees/apples/bounds snapshot

construction-runtime-kit:
  hold construction catalog
  pay build cost
  append built item record
  emit build message

roster-runtime-kit:
  hold actors and roles
  hire actor with resource payment
  emit roster message

inventory-runtime-kit:
  hold inventory item list
  equip an item
  expose equipped item snapshot

active-session-domain-kit:
  track day/phase/player/pests/score/message
  move player
  collect apples
  clear pests
  advance day/night phase
  tick night pests and ending

world-canvas-render-kit:
  render orchard world from snapshots

html-interface-render-kit:
  render active-session HUD
  render generic interface screens
  route data-action and data-command clicks

smoke-fixture-kit:
  prove createOrchardGame entry/play/apple baseline
```

## Kits identified

```txt
implemented explicit kits:
  kit-runtime
  scoped-interface-domain-kit
  interface-composition-kit
  resource-ledger-kit
  pressure-field-kit
  orchard-world-kit
  construction-runtime-kit
  roster-runtime-kit
  inventory-runtime-kit
  active-session-domain-kit

implemented/generated interface kits:
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

host/render kits:
  static-browser-shell-kit
  boot-module-kit
  orchard-game-factory-kit
  world-canvas-render-kit
  html-interface-render-kit
  GameHost-baseline-kit
  smoke-fixture-kit

next-cut kits:
  market-action-id-catalog-kit
  market-source-snapshot-kit
  market-command-envelope-kit
  market-preflight-kit
  market-command-result-kit
  market-command-journal-kit
  market-transaction-record-kit
  market-result-projection-kit
  market-render-readback-kit
  nested-command-result-propagation-kit
  market-dom-free-fixture-kit
```

## Main boundary

The next runtime implementation should not start in the renderer. It should start by creating pure Market source and command/result helpers, then wire those helpers into exchange actions and interface-composition result propagation.

## Next safe ledge

```txt
ZombieOrchard Market Command Journal + Exchange Projection Fixture Boundary
```
