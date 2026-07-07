# Zombie Orchard Project Breakdown

**Run timestamp:** `2026-07-07T07:21:19-04:00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Selected repo:** `LuminaryLabs-Publish/ZombieOrchard`

## Selection reason

The central ledger most recently documented `LuminaryLabs-Publish/HorrorCorridor` at `2026-07-07T07:10:27-04:00`. With `LuminaryLabs-Publish/TheCavalryOfRome` excluded by rule, `ZombieOrchard` is the oldest eligible tracked Publish repo in the current follow-up rotation.

## Current read

`ZombieOrchard` is a static browser orchard survival/economy shell. It is already kit-composed, using a small runtime, scoped interface domains, a preset, game-domain kits, a canvas world renderer, an HTML interface renderer, a minimal GameHost surface, and a Node smoke test.

The playable loop exists, but the economy is still mostly a shell. Apples, money, pressure, construction, roster, inventory, day/night, pests, failure, screen routing, and outcome routing all exist in some form. The next gap is not more screen scaffolding. The next gap is deterministic command authority, replayable economy mutations, a real market surface, worker assignment, building/tool effects, and stronger smoke fixtures.

## Current interaction loop

```txt
open index.html
-> src/start.js creates createOrchardGame()
-> src/game.js installs runtime, resource, pressure, world, construction, roster, inventory, interface, active-session, and composition kits
-> createWorldCanvas() draws trees, apples, pests, and player
-> createHtmlInterfaceRenderer() renders screen panels and active-session HUD
-> window.GameHost exposes engine, getState, and tick
-> app starts on entry domain
-> player activates Play
-> interface-composition routes to active-session
-> player uses active-session quick commands: collect, clear, next-phase
-> player can route to build, market, roster, inventory, codex, pause, or outcome screens
-> collect removes nearest apple, adds apples and money, raises pressure, updates score and message
-> construction can spend resources and create a built record
-> roster can spend money and hire an actor
-> inventory can equip an item
-> pressure-field ticks rowPressure and curse
-> next-phase toggles day/night and increments day on morning
-> night phase randomly spawns pests
-> pests chase the player and damage condition
-> condition reaches 0
-> active-session marks ended
-> interface-composition routes to outcome
```

## Target interaction loop

```txt
entry-domain-kit starts static shell
-> session-select-domain-kit or run-setup-domain-kit chooses save/new-run settings
-> seeded-random-kit creates named deterministic streams for apples, pests, market offers, and worker output
-> orchard-command-contract-kit normalizes every gameplay mutation into a typed command
-> economy-command-replay-kit records accepted/rejected commands and replays them into the same snapshot
-> orchard-input-kit emits movement, collect, clear, phase, build, market, roster, inventory, save, and codex intents
-> orchard-harvest-interaction-kit resolves apple targeting, tool radius, value, and pressure side effects
-> orchard-economy-ledger-kit records resources, capacity, prices, transactions, daily settlement, and market value history
-> orchard-market-exchange-kit supports sell apples, buy tools, buy supplies, and price modifiers
-> construction-runtime-kit creates buildings
-> orchard-building-effects-kit applies capacity, defense, production, worker slot, and render-plan effects
-> roster-runtime-kit hires workers
-> orchard-worker-assignment-kit assigns harvest, defend, repair, and rest roles
-> inventory-runtime-kit stores tools and consumables
-> orchard-tool-effects-kit applies harvest radius, clear strength, durability, value, and unlock modifiers
-> orchard-day-night-phase-kit emits settlement and night-start events
-> orchard-pest-pressure-kit handles deterministic spawn, chase, damage, clear, defense, and escalation
-> orchard-codex-progression-kit unlocks notes from first collect, first sale, first build, first hire, first night, and first pest clear
-> orchard-save-runtime-kit serializes snapshots and replay journals
-> orchard-outcome-summary-kit summarizes days survived, rows protected, money earned, apples sold, workers, buildings, tools, and codex unlocks
-> orchard-render-plan-kit projects trees, apples, pests, player, buildings, workers, pressure, tool radius, and alerts into renderer-friendly draw records
-> orchard-economy-smoke-fixture-kit verifies deterministic 10-minute economy slices
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
GameHost
browser-host
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

### Target extraction domains

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

## Services surfaced by current kits

| Kit | Current services | Next service gap |
| --- | --- | --- |
| `kit-runtime` | kit install, domain registry, command routing, tick dispatch, event emission, snapshot aggregation, subscribe | reset, deterministic replay, command journal, typed diagnostics |
| `scoped-interface-domain-kit` | screen state, action list, select, set-field, activate, action-request event, snapshot | route guards, disabled reasons, save slot fields, command intent metadata |
| `interface-composition-kit` | active screen state, transition, back, current-screen activate, action command dispatch, outcome auto-route | transition hooks, save/load routing, guarded active-session exit |
| `resource-ledger-kit` | values, canPay, pay, add, pay/add commands, last transaction marker, snapshot | transaction history, capacities, market price effects, settlement deltas |
| `pressure-field-kit` | pressure channels, adjust, rowPressure tick, curse tick, snapshots | deterministic thresholds, row-local pressure, building/worker/tool modifiers |
| `orchard-world-kit` | tree grid, apple array, random apple seeding, nearest apple collection, reseeding, bounds | seeded streams, row ids, tree condition, building slots, worker target points |
| `construction-runtime-kit` | catalog, resource payment, built records, build messages, snapshots | placement rules, effects, occupancy, repair state, render plan projection |
| `roster-runtime-kit` | actor list, role list, hire command, payment, messages, snapshots | assignment commands, role output ticks, fatigue, morale, slot occupancy |
| `inventory-runtime-kit` | items, equipped item, equip command, snapshots | tool stats, durability, market unlocks, effect application |
| `active-session-domain-kit` | day/phase, player state, move, collect, clear, next-phase, pest spawn, pest chase, damage, failure, score, messages | split into movement, harvest, pest, phase, outcome, and command-authority services |
| `world-canvas-render-kit` | draw trees, apples, pests, player from snapshots | render-plan consumption, building/worker layers, pressure overlays, readable high-fidelity pass |
| `html-interface-render-kit` | HUD stats, quick commands, screen cards, action buttons, outcome cards, click routing | market controls, assignment controls, save controls, codex rendering, diagnostic panels |
| `game-host-diagnostics-kit` | engine reference, getState, tick | restart, seed, dispatch, getDiagnostics, getReplayJournal, smoke snapshots |
| `smoke-fixture-kit` | entry screen, play transition, active-session, apple existence | deterministic collect, build, market, hire, worker, pest, outcome, replay parity |

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

### Target kits for next cutover

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
```

## Current blockers

```txt
Math.random still owns apple and pest generation.
active-session-domain-kit owns too many gameplay services.
resource-ledger-kit has no transaction history, capacity, or settlement model.
exchange domain exists, but the market has no buy/sell runtime.
roster can hire, but workers cannot be assigned or simulated.
construction can build, but buildings do not apply gameplay effects.
inventory can equip, but tools do not affect harvest, clearing, durability, or value.
save select exists, but there is no save runtime.
knowledge/codex exists, but no unlock service feeds it.
outcome screen exists, but summary is still thin.
world renderer draws snapshots directly, not a render plan.
smoke coverage does not validate economy behavior or replay parity.
GameHost does not expose restart, command journal, diagnostics, scenario load, or smoke helpers.
```

## Recommended next slice

### Zombie Orchard Economy Replay + Market Service Cutover

```txt
preserve static host and current playable loop
-> add seeded-random-kit with named streams: world, apples, pests, market, workers
-> add orchard-command-contract-kit as the only gameplay mutation facade
-> add economy-command-replay-kit with command journal, rejection records, replayFromSeed, and replay parity smoke
-> make resource-ledger transaction history and capacity explicit
-> add market-exchange-kit with sell-apples, buy-tool, buy-supply, and price snapshot commands
-> split active-session collect into harvest-interaction-kit
-> split active-session next-phase into day-night-phase-kit
-> split active-session pest spawn/chase/damage/clear into pest-pressure-kit
-> add building-effects-kit for storage, defense, production, and worker slots
-> add worker-assignment-kit for harvest, defend, repair, and rest
-> add tool-effects-kit for harvest radius, pest clear strength, value, and durability
-> add codex-progression-kit and outcome-summary-kit after first economy actions exist
-> add render-plan-kit so canvas consumes draw records instead of raw snapshots
-> expand tests/smoke.mjs into deterministic economy smoke fixtures
```

## Acceptance target

```txt
npm test passes
GameHost.getState() still returns all current domain snapshots
GameHost exposes getDiagnostics(), restart({ seed }), dispatch(command), and getCommandJournal()
The same seed and command journal replay to the same snapshot
Collecting an apple can be asserted deterministically in Node smoke
Selling apples at market mutates resources and transaction history
Buying a tool changes inventory and future harvest/clear behavior
Building storage changes apple capacity
Hiring and assigning one worker affects morning settlement or night defense
Night pest spawn is deterministic under seeded replay
Outcome summary includes days, score, money, apples, workers, buildings, tools, pests cleared, and codex unlocks
```

## Product ideation

Target the next product pass as a compact, replayable, ten-minute survival economy loop:

```txt
minute 0-1: collect visible apples and learn harvest radius
minute 1-2: sell apples and buy a cheap tool
minute 2-3: build storage to raise capacity
minute 3-4: hire one worker and choose harvest or defend
minute 4-5: first night starts and pests attack rows
minute 5-6: clear pests while worker role modifies pressure
minute 6-7: morning settlement applies worker/building/tool outputs
minute 7-8: buy lantern, fence, or tool upgrade
minute 8-9: second night escalates rowPressure and curse
minute 9-10: outcome summarizes economic and survival performance
```

## Non-goals for next slice

```txt
Do not replace the static browser host.
Do not rewrite the renderer before render-plan projection exists.
Do not add new screen domains before existing exchange, roster, inventory, knowledge, and outcome domains have real services.
Do not add networked multiplayer.
Do not work on Cavalry of Rome.
```
