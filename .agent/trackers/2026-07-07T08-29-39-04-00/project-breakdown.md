# Zombie Orchard Project Breakdown — Market Transaction Authority Follow-up

**Run timestamp:** `2026-07-07T08:29:39-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Selected after:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded by rule:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`ZombieOrchard` is a static browser orchard survival/economy shell built from small runtime, interface, game-domain, renderer, diagnostics, and smoke-test kits. The project already has an orchard loop: enter the app, start an active session, move the player, collect apples, mutate resources and pressure, build a storage shed, hire roster actors, equip inventory, advance day/night, spawn pests, clear pests, take damage, and route to outcome. The next useful cut is **Market Transaction Authority + Worker Assignment Prep**: make the economy command path explicit, add transaction/capacity history, turn the market from a navigation screen into a gameplay service, and prepare workers/buildings/tools to affect deterministic settlement and pest pressure.

## Selection reason

The central repo ledger most recently documented `LuminaryLabs-Publish/HorrorCorridor` at `2026-07-07T08:20:44-04:00`. With `LuminaryLabs-Publish/TheCavalryOfRome` excluded, `LuminaryLabs-Publish/ZombieOrchard` is the next eligible repo in the tracked Publish rotation.

## Current interaction loop

```txt
open index.html
-> src/start.js imports createOrchardGame, HTML interface renderer, and world canvas renderer
-> createOrchardGame installs resource, pressure, orchard-world, construction, roster, inventory, scoped interface, active-session, and interface-composition kits
-> requestAnimationFrame calls engine.tick(1 / 60)
-> world-canvas renders the current snapshot
-> html-interface-renderer renders the current screen and command buttons
-> window.GameHost exposes engine, getState, and tick
-> entry screen starts as the active interface domain
-> Play routes to active-session
-> active-session supports quick commands: move, collect, clear, next-phase
-> interface screens route to construction, exchange, roster, inventory, knowledge, preferences, interrupt, and outcome
-> collect removes nearest apple, reseeds apples, adds apples/money, raises row pressure, updates score and message
-> construction build spends resources and creates a built record
-> roster hire spends money and creates an actor
-> inventory equip changes equipped item
-> next-phase toggles day/night and increments day on morning
-> night tick uses random pest spawn
-> pests chase player and damage condition
-> condition <= 0 marks the run ended
-> interface-composition auto-routes ended sessions to outcome
```

## Target interaction loop

```txt
entry-domain-kit starts static shell
-> session-select / run-setup sets seed and save slot intent
-> seeded-random-kit creates named streams for world, apples, pests, market, workers, and settlements
-> orchard-command-contract-kit accepts typed gameplay commands only
-> economy-command-replay-kit records accepted/rejected commands and replays them from seed
-> orchard-input-kit emits movement, collect, clear, phase, build, sell, buy, hire, assign, equip, save, codex intents
-> orchard-harvest-interaction-kit resolves apple targeting, tool radius, value, reseed, pressure side effects, and harvest messages
-> orchard-economy-ledger-kit records resources, capacities, transaction history, price snapshots, and settlement deltas
-> orchard-market-exchange-kit handles sell apples, buy tools, buy supplies, and price modifiers
-> orchard-building-effects-kit applies storage, defense, production, worker slots, and render-plan records
-> orchard-worker-assignment-kit assigns workers to harvest, defend, repair, or rest
-> orchard-tool-effects-kit applies harvest radius, clear strength, value, durability, and unlock modifiers
-> orchard-day-night-phase-kit emits day-start, night-start, and settlement events
-> orchard-pest-pressure-kit performs deterministic pest spawn, chase, damage, clear, defense, and escalation
-> orchard-codex-progression-kit unlocks notes from first harvest, sale, build, hire, assignment, night, clear, and outcome
-> orchard-save-runtime-kit serializes snapshot plus journal
-> orchard-outcome-summary-kit computes days, apples, money, workers, buildings, tools, pests, rows, and codex summary
-> orchard-render-plan-kit projects trees, apples, pests, buildings, workers, player, pressure overlays, tool radius, and alerts
-> orchard-economy-smoke-fixture-kit validates deterministic 10-minute economy slices
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

### Economy and simulation domains needed next

```txt
seeded-random
orchard-command-contract
economy-command-replay
orchard-input
orchard-harvest-interaction
orchard-economy-ledger
orchard-market-exchange
orchard-building-effects
orchard-worker-assignment
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
| `kit-runtime` | kit installation, domain registry, command routing, tick dispatch, event emission, snapshot aggregation, subscription callbacks | seeded reset, command journal capture, replay helper, diagnostics, dispatch metadata |
| `scoped-interface-domain-kit` | creates screen domains, keeps selected index, stores fields/meta, normalizes actions, emits selected/field/action events, snapshots screen state | route guards, disabled reasons, save slot fields, command intent metadata, market form fields |
| `interface-composition-kit` | active screen, previous screen, transition, back, active-screen activation, command dispatch from action metadata, outcome auto-routing | transition hooks, guarded active-session exit, command result surfacing, save/load routing |
| `resource-ledger-kit` | resource values, affordability check, pay, add, add/pay commands, last transaction marker, snapshots | transaction history, resource caps, price snapshots, sell/buy transaction types, daily settlement deltas |
| `pressure-field-kit` | pressure channels, adjust API, rowPressure tick, curse tick, adjust command, snapshots | row-local pressure, threshold events, pest spawn requests, building/worker/tool modifiers |
| `orchard-world-kit` | tree grid generation, apple seeding, nearest apple collection, apple reseeding, world bounds snapshot | deterministic apple placement, row ids, tree condition, building placement points, worker target points |
| `construction-runtime-kit` | build catalog, resource payment through ledger, built item creation, build message, snapshots | building effect registry, storage capacity modifier, defense modifier, production modifier, worker slots, placement rules |
| `roster-runtime-kit` | actor list, role list, hire command, hire payment through ledger, roster messages, snapshots | assign command, role output tick, morale/fatigue, building slot occupancy, defense contribution, settlement contribution |
| `inventory-runtime-kit` | item list, equipped item, equip command, snapshots | tool stats, durability, market unlocks, harvest radius, clear strength, sale value modifiers |
| `active-session-domain-kit` | day/phase, player movement, collect, clear, next-phase, pest spawn/chase/damage, condition, score, message, ended flag, snapshots | split movement, harvest, pest, phase, outcome, and command authority services |
| `world-canvas-render-kit` | canvas resize, tree draw, apple draw, pest draw, player draw | render-plan input, building draw, worker draw, row overlays, alerts, tool radius, pressure layers |
| `html-interface-render-kit` | HUD stat strip, quick active-session commands, screen panels, cards, click-to-command routing | market controls, worker assignment controls, save controls, codex rendering, diagnostics panels |
| `game-host-diagnostics-kit` | `window.GameHost.engine`, `getState()`, `tick(dt)` | `restart({ seed })`, `dispatch(command)`, `getDiagnostics()`, `getCommandJournal()`, scripted smoke helpers |
| `smoke-fixture-kit` | entry screen smoke, Play transition smoke, active-session smoke, apple existence smoke | deterministic collect/build/hire/market/assign/pest/outcome/replay tests |

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
orchard-input-kit
orchard-harvest-interaction-kit
orchard-economy-ledger-kit
orchard-market-exchange-kit
orchard-building-effects-kit
orchard-worker-assignment-kit
orchard-tool-effects-kit
orchard-day-night-phase-kit
orchard-pest-pressure-kit
orchard-save-runtime-kit
orchard-codex-progression-kit
orchard-outcome-summary-kit
orchard-render-plan-kit
orchard-economy-smoke-fixture-kit
market-transaction-smoke-kit
worker-assignment-smoke-kit
settlement-parity-smoke-kit
```

## Key findings

- The app composition is already clean: `src/game.js` installs the primary kits through `createKitRuntime`, and `src/start.js` keeps the browser host thin.
- Runtime mutation is still direct and domain-specific. `engine.command(domainId, type, payload)` calls whichever domain owns the command, then snapshots all domains.
- `resource-ledger-kit` has useful primitives, but only records `last`; it needs durable transaction history and capacity semantics before the market can become meaningful.
- `orchard-world-kit` and `active-session-domain-kit` still use `Math.random`, so apple reseeding and pest spawn cannot be replayed deterministically.
- `active-session-domain-kit` is the broadest gameplay owner: movement, harvest, combat/clear, phase, pest simulation, health, score, messages, and failure live together.
- The `exchange` screen exists in the preset but currently only routes back to active-session, so market runtime is the highest-value product-visible extraction.
- Construction, roster, and inventory already mutate state, but their effects do not yet feed active gameplay.
- Smoke coverage is still minimal; it validates entry, play transition, active-session, and apple existence only.

## Recommended next slice

### Zombie Orchard Market Transaction Authority + Worker Assignment Prep Cutover

```txt
1. Preserve the static host, current renderer, and existing active-session play loop.
2. Add seeded-random-kit with named streams: world, apples, pests, market, workers, settlements.
3. Replace direct Math.random calls in orchard-world and active-session with seeded streams behind compatible fallback APIs.
4. Add orchard-command-contract-kit as the gameplay mutation facade.
5. Add economy-command-replay-kit with accepted/rejected command records and replayFromSeed.
6. Extend resource-ledger-kit into orchard-economy-ledger-kit with transaction history and capacity.
7. Add orchard-market-exchange-kit with SELL_APPLES, BUY_TOOL, BUY_SUPPLY, and GET_PRICE_SNAPSHOT.
8. Add exchange screen actions for selling apples and buying the first tool/supply.
9. Split active-session collect into orchard-harvest-interaction-kit.
10. Split active-session next-phase into orchard-day-night-phase-kit.
11. Split active-session pest spawn/chase/damage/clear into orchard-pest-pressure-kit.
12. Add orchard-building-effects-kit so storage shed increases apple capacity.
13. Add orchard-worker-assignment-kit command schema, even before full worker AI.
14. Add orchard-tool-effects-kit so bought/equipped tools affect harvest radius or clear strength.
15. Add orchard-codex-progression-kit after first sale, first tool, first build, and first worker assignment events exist.
16. Add orchard-outcome-summary-kit with economy and survival totals.
17. Add orchard-render-plan-kit so canvas can eventually stop reading raw snapshots.
18. Expand tests/smoke.mjs with deterministic collect, market, storage, hire, assignment, night pest, and replay parity fixtures.
```

## Acceptance target

```txt
npm test passes
GameHost.getState() still returns all current domain snapshots
GameHost exposes restart({ seed }), dispatch(command), getDiagnostics(), and getCommandJournal()
Same seed plus same command journal replays to the same snapshot
Apple collection smoke is deterministic
Selling apples records a transaction and mutates money/apples
Buying the first tool records a transaction and changes inventory/equipped tool state
Storage shed changes apple capacity or capacity diagnostics
Hiring one worker and assigning one role changes roster assignment state
Night pest spawn is deterministic under seeded replay
Outcome summary includes days, score, money, apples harvested, apples sold, workers, buildings, tools, pests cleared, and codex unlocks
```

## Product direction

Target a compact survival/economy slice rather than a larger screen taxonomy expansion:

```txt
Minute 0-1: collect visible apples and understand radius/value
Minute 1-2: sell apples in market and see transaction history
Minute 2-3: buy a tool and feel harvest/clear improvement
Minute 3-4: build storage and raise apple capacity
Minute 4-5: hire one worker and assign harvest/defend
Minute 5-6: night begins and deterministic pests pressure rows
Minute 6-7: worker/building/tool effects reduce pest or resource pressure
Minute 7-8: morning settlement explains what happened
Minute 8-9: codex unlocks summarize the economy lesson
Minute 9-10: outcome screen summarizes survival and economy performance
```

## Files to touch in implementation slice

```txt
src/kits/runtime.js
src/kits/game-domains.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
src/start.js
tests/smoke.mjs
```

## Documentation updates in this pass

```txt
.agent/trackers/2026-07-07T08-29-39-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger entry
LuminaryLabs-Dev/LuminaryLabs internal change-log entry
```

No runtime source was changed in this pass.
