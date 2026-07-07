# Zombie Orchard Project Breakdown — Exchange Command UI Follow-up

**Run timestamp:** `2026-07-07T09:41:43-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Selected after:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded by rule:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`ZombieOrchard` remains a compact, static browser survival/economy shell with a strong kit-composed base: runtime, interface domains, composition, resources, pressure, orchard world, construction, roster, inventory, active session, canvas rendering, HTML rendering, GameHost, and smoke tests. The next highest-value boundary is now **Exchange Command UI + Transaction Ledger Contract**. The market route already exists, but it only displays a Back action, while resource mutation is still split across direct `add`/`pay` helpers and no durable transaction records exist. The next pass should make the market visibly playable first, then use that transaction contract to support worker assignment, settlement, save/replay, codex, and outcome summaries.

## Selection reason

The central repo ledger most recently documented `LuminaryLabs-Publish/HorrorCorridor`. With `LuminaryLabs-Publish/TheCavalryOfRome` excluded, `LuminaryLabs-Publish/ZombieOrchard` is the next eligible repo in the tracked Publish rotation.

## Current interaction loop

```txt
open index.html
-> src/start.js creates createOrchardGame(), world canvas renderer, and HTML interface renderer
-> createOrchardGame installs resource, pressure, orchard-world, construction, roster, inventory, scoped interface, active-session, and interface-composition kits
-> requestAnimationFrame calls engine.tick(1 / 60)
-> engine ticks every domain and snapshots all domains
-> world-canvas draws trees, apples, pests, and player from the raw snapshot
-> html-interface-renderer renders the current screen and button set
-> window.GameHost exposes engine, getState(), and tick(dt)
-> entry screen routes Play to active-session
-> active-session quick commands call collect, clear, and next-phase directly
-> collect mutates orchard-world, resource-ledger, pressure-field, score, and message
-> construction screen can call construction-runtime build through action.command metadata
-> roster screen can expose actors but has no assignment flow yet
-> inventory screen can expose items but has no market unlock flow yet
-> exchange screen exists but only offers Back
-> night ticks can randomly spawn pests
-> pests chase player and damage condition
-> condition <= 0 marks the run ended
-> interface-composition routes ended sessions to outcome
```

## Target interaction loop

```txt
entry-domain-kit starts static shell
-> run-setup/session-select eventually sets seed and save slot intent
-> seeded-random-kit creates named streams for apples, pests, market, workers, and settlements
-> orchard-command-contract-kit normalizes all gameplay mutations into typed commands
-> orchard-economy-ledger-kit owns values, capacities, prices, transaction history, and settlement deltas
-> exchange-domain-kit renders sell/buy actions with disabled reasons and quantities
-> orchard-market-exchange-kit executes SELL_APPLES, BUY_TOOL, BUY_SUPPLY, and GET_PRICE_SNAPSHOT
-> economy-command-replay-kit journals accepted/rejected market commands and replay results
-> inventory-runtime-kit receives market-purchased tools through command results
-> construction-runtime-kit and building-effects-kit apply storage capacity and defense effects
-> roster-runtime-kit and worker-assignment-kit apply hire/assign commands after transaction records exist
-> active-session harvest, clear, and phase commands route through the same command facade
-> orchard-day-night-phase-kit emits deterministic settlement events
-> orchard-pest-pressure-kit consumes seeded pest events and building/worker/tool modifiers
-> orchard-outcome-summary-kit reports economy and survival totals from transaction/event history
-> orchard-render-plan-kit projects draw records for canvas and debug overlays
-> smoke fixtures replay collect, sell, buy, build, hire, assign, night, and outcome scripts from a seed
```

## Domains in use

### Runtime and host domains

```txt
kit-runtime
engine-context
event-log
command-router
tick-dispatcher
snapshot-aggregator
subscription-bus
browser-host
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

### Economy authority domains needed next

```txt
seeded-random
orchard-command-contract
economy-command-replay
orchard-economy-ledger
orchard-market-exchange
market-action-ui
transaction-history
capacity-policy
price-snapshot
inventory-market-unlock
building-effects
worker-assignment
settlement-parity
```

### Later extraction domains

```txt
orchard-input
orchard-harvest-interaction
orchard-tool-effects
orchard-day-night-phase
orchard-pest-pressure
orchard-save-runtime
orchard-codex-progression
orchard-outcome-summary
orchard-render-plan
orchard-economy-smoke-fixtures
```

## Services surfaced by kits

| Kit | Current services | Gap / next service boundary |
| --- | --- | --- |
| `kit-runtime` | kit installation, domain registry, command routing, tick dispatch, event emission, snapshot aggregation, subscriptions | seeded reset, command journal capture, replay helper, diagnostics, dispatch metadata |
| `scoped-interface-domain-kit` | creates screen domains, keeps selected index, stores fields/meta, normalizes actions, emits selected/field/action events, snapshots screen state | market quantity fields, disabled reasons, transaction action metadata, command result surfacing |
| `interface-composition-kit` | active screen, previous screen, transition, back, active-screen activation, command dispatch from action metadata, outcome auto-routing | dispatch result return, guarded transitions, transaction result notification, save/load routing |
| `resource-ledger-kit` | resource values, affordability check, pay, add, add/pay commands, `last` marker, snapshots | transaction history, resource caps, market prices, sell/buy transaction types, settlement deltas |
| `pressure-field-kit` | pressure channels, adjust API, rowPressure tick, curse tick, adjust command, snapshots | row-local pressure, threshold events, deterministic pest spawn requests, building/worker/tool modifiers |
| `orchard-world-kit` | tree grid generation, apple seeding, nearest apple collection, apple reseeding, world bounds snapshot | deterministic apple placement, row ids, tree condition, building placement points, worker target points |
| `construction-runtime-kit` | build catalog, resource payment through ledger, built item creation, build message, snapshots | storage capacity effect, defense effect, production effect, worker slots, placement rules |
| `roster-runtime-kit` | actor list, role list, hire command, hire payment through ledger, roster messages, snapshots | assignment command, role output ticks, morale/fatigue, slot occupancy, defense/settlement contribution |
| `inventory-runtime-kit` | item list, equipped item, equip command, snapshots | market purchase command, tool stats, durability, harvest radius, clear strength, sale value modifiers |
| `active-session-domain-kit` | day/phase, movement, collect, clear, next-phase, pest spawn/chase/damage, condition, score, message, ended flag, snapshots | route collect/clear/phase through command facade after market transaction contract is stable |
| `world-canvas-render-kit` | canvas resize, tree draw, apple draw, pest draw, player draw | render-plan input, buildings, workers, pressure overlays, tool radius, market/transaction alerts |
| `html-interface-render-kit` | HUD stat strip, active-session quick commands, screen panels, cards, click-to-command routing | market buttons, transaction list, worker assignment controls, save/codex/diagnostic panels |
| `game-host-diagnostics-kit` | `window.GameHost.engine`, `getState()`, `tick(dt)` | `restart({ seed })`, `dispatch(command)`, `getDiagnostics()`, `getCommandJournal()`, `runSmoke(name)` |
| `smoke-fixture-kit` | entry screen smoke, Play transition smoke, active-session smoke, apple existence smoke | deterministic collect, market sell, market buy, capacity, worker, pest, outcome, replay parity |

## Kits identified

### Existing explicit kits

```txt
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
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
```

### Generated interface kits

```txt
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
```

### Next extraction kits

```txt
seeded-random-kit
orchard-command-contract-kit
economy-command-replay-kit
orchard-economy-ledger-kit
orchard-market-exchange-kit
market-action-ui-kit
transaction-history-kit
capacity-policy-kit
price-snapshot-kit
inventory-market-unlock-kit
market-transaction-smoke-kit
```

### Follow-on economy/gameplay kits

```txt
orchard-input-kit
orchard-harvest-interaction-kit
orchard-building-effects-kit
orchard-worker-assignment-kit
worker-assignment-smoke-kit
orchard-tool-effects-kit
orchard-day-night-phase-kit
settlement-parity-smoke-kit
orchard-pest-pressure-kit
orchard-save-runtime-kit
orchard-codex-progression-kit
orchard-outcome-summary-kit
orchard-render-plan-kit
orchard-economy-smoke-fixture-kit
```

## Key findings

- `src/start.js` is thin and should stay thin: it creates the engine, renderers, `window.GameHost`, and animation loop.
- `src/game.js` is already a clean composition point for adding the market/economy kits without disturbing the static host.
- `createKitRuntime().command(domainId, type, payload)` already gives a simple dispatch path, but results are not journaled and do not include typed economy metadata.
- `resource-ledger-kit` has the correct primitive API shape (`canPay`, `pay`, `add`) but only records a `last` string, so the market cannot show real transaction history yet.
- `orchard-world-kit` and `active-session-domain-kit` still use `Math.random`, blocking deterministic replay for apples and pests.
- `exchange` exists in the preset, but its action list only returns to active-session, making market implementation the most visible next product cut.
- The HTML renderer can already render screen action buttons through action metadata, so the first market UI can be config-driven before a custom exchange panel is needed.
- `inventory-runtime-kit` can accept `equip`, but tools are not yet bought, priced, unlocked, durable, or tied to harvest/clear modifiers.
- `construction-runtime-kit` and `roster-runtime-kit` already spend resources, making them natural consumers of the same transaction history contract after market sell/buy works.
- Smoke coverage should move from route existence to economy behavior: collect, sell, buy, capacity, assignment, night, and replay parity.

## Recommended next slice

### Zombie Orchard Exchange Command UI + Transaction Ledger Contract Cutover

```txt
1. Preserve static host, current renderer, and current active-session loop.
2. Add seeded-random-kit with named streams, but keep compatible fallbacks until replay smoke is installed.
3. Add orchard-command-contract-kit with command ids, actor/source, type, payload, accepted/rejected, reason, events, and journal entry.
4. Upgrade resource-ledger-kit toward orchard-economy-ledger-kit by adding transaction records without breaking current values snapshots.
5. Define transaction types: harvest_gain, market_sell, market_buy, build_spend, hire_spend, settlement_gain, capacity_reject.
6. Add capacity-policy-kit for apples, money, wood, scrap, tools, and supplies, initially with permissive defaults.
7. Add price-snapshot-kit with fixed starter prices before any dynamic market logic.
8. Add orchard-market-exchange-kit with SELL_APPLES, BUY_TOOL, BUY_SUPPLY, and GET_PRICE_SNAPSHOT commands.
9. Add exchange screen actions for Sell Apples, Buy Basic Tool, and Buy Row Supply through preset action.command metadata.
10. Make html-interface-renderer show recent transaction cards on the exchange screen.
11. Route market-bought tools into inventory-runtime-kit and optionally auto-equip the first purchased tool.
12. Add market-transaction-smoke-kit covering collect apple, sell apple, buy tool, insufficient funds, and transaction history.
13. Add GameHost diagnostics for command journal length, last transaction, prices, capacities, and deterministic seed.
14. Keep worker-assignment-kit as the follow-on cut after transaction history and inventory purchase behavior are visible.
```

## Acceptance target

```txt
npm test passes
GameHost.getState() still returns all current domain snapshots
GameHost exposes restart({ seed }), dispatch(command), getDiagnostics(), and getCommandJournal()
Resource snapshots include values plus transactions without breaking current HUD reads
Exchange screen has visible sell/buy actions
Selling apples mutates apples/money and records a market_sell transaction
Buying a basic tool mutates money/inventory and records a market_buy transaction
Insufficient money/apples returns accepted=false with a reason and no resource mutation
Price snapshot is deterministic for the same seed/config
Market transaction smoke runs without DOM timing assumptions
Worker assignment remains a follow-on slice, not part of the first market UI cut
```

## Product direction

Target a visible economy step before expanding the whole survival sim:

```txt
Minute 0-1: collect apples and see resource values change
Minute 1-2: open Market and sell apples for money
Minute 2-3: buy a basic tool and see it appear in inventory
Minute 3-4: use the tool to make harvest/clear feel better
Minute 4-5: build storage and introduce capacity pressure
Minute 5-6: hire one worker and prepare assignment roles
Minute 6-7: night starts and deterministic pest pressure begins
Minute 7-8: settlement uses worker/building/tool effects
Minute 8-9: codex unlocks explain the economy/survival chain
Minute 9-10: outcome summarizes transactions, upgrades, workers, pests, and days survived
```

## Files reviewed

```txt
package.json
src/start.js
src/game.js
src/kits/runtime.js
src/kits/game-domains.js
src/kits/composition.js
src/renderer/html-interface-renderer.js
src/presets/orchard-preset.js
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
```

## Run notes

```txt
Documentation-only run.
No runtime source code changed.
No local build or test was run.
Pushed tracker, registry, README, central ledger, and central change-log updates to main.
```
