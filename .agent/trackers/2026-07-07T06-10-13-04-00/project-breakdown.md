# Zombie Orchard Project Breakdown

**Run timestamp:** `2026-07-07T06:10:13-04:00`

**Repo:** `LuminaryLabs-Publish/ZombieOrchard`

**Selected because:** The central rotation last documented `LuminaryLabs-Publish/HorrorCorridor` at `2026-07-07T06:01:21-04:00`. With `LuminaryLabs-Publish/TheCavalryOfRome` excluded, `ZombieOrchard` is the next eligible Publish repo in the tracked follow-up cycle.

## Summary

`ZombieOrchard` is a standalone kit-composed orchard survival/economy shell. The app already has the correct architectural shape: a kit runtime, reusable scoped interface domains, project preset, game-domain kits, HTML renderer, 2D canvas renderer, GameHost surface, and a smoke test.

The current product loop is playable as a prototype, but the economy loop is not yet deep enough. Apple collection, money gain, building, hiring, inventory, day/night phase changes, pest pressure, and failure all exist as thin services. The next useful cut is to create an economy command contract that makes harvest, build, hire, sell, buy, assign, equip, phase, pest, and outcome behavior deterministic and smoke-testable.

## Current interaction loop

```txt
open static app
-> src/start.js creates the orchard game engine
-> createOrchardGame installs resource, pressure, orchard-world, construction, roster, inventory, interface, active-session, and composition kits
-> world canvas renderer draws trees, apples, pests, and player
-> HTML interface renderer draws screens, HUD, commands, stat strip, cards, and outcome summary
-> window.GameHost exposes engine, getState, and tick
-> entry screen is active
-> player chooses Play
-> interface-composition transitions to active-session
-> player uses buttons to collect apples, clear pests, advance phase, or open build/market/roster/inventory/codex/pause screens
-> collect adds apples and money through resource-ledger
-> pressure-field rises over time and from valuable apples
-> construction spends resources and creates built records
-> roster spends money and creates worker records
-> inventory equips one item
-> night phase spawns pests
-> pests chase the player and damage condition
-> condition reaches zero
-> active-session ends
-> interface-composition routes to outcome
```

## Target interaction loop

```txt
entry-domain-kit starts the shell
-> session-select or run-setup picks save/new-game parameters
-> seeded-random-kit creates deterministic orchard/world/run streams
-> orchard-command-contract-kit becomes the only public gameplay mutation surface
-> orchard-input-kit emits move/collect/clear/phase/menu intents
-> harvest-interaction-kit resolves nearby apples and tool/radius modifiers
-> economy-ledger-kit records resources, transactions, prices, capacity, and settlement deltas
-> exchange-runtime-kit sells apples and buys supplies/tools
-> construction-runtime-kit creates buildings
-> building-effects-kit applies capacity, defense, production, and worker-slot modifiers
-> roster-runtime-kit hires actors
-> worker-assignment-kit runs harvest/defense/repair/output ticks
-> inventory-runtime-kit stores equipment
-> tool-effects-kit applies harvest radius, clear strength, durability, and value modifiers
-> day-night-phase-kit advances day/night and emits settlement/pest-pressure events
-> pest-pressure-kit handles spawn, chase, damage, clear, and row pressure
-> codex-progression-kit unlocks first-action notes
-> save-runtime-kit persists and loads snapshots
-> outcome-summary-kit produces a full run summary
-> smoke-fixture-kit replays deterministic economy scenarios
```

## Domains in use

### Runtime and host domains

```txt
kit-runtime
interface-composition
GameHost
world-canvas
html-interface-renderer
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
```

### Target extraction domains

```txt
seeded-random
orchard-command-contract
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
orchard-smoke-fixtures
```

## Services surfaced by current kits

| Kit | Current services |
| --- | --- |
| `kit-runtime` | kit installation, domain registry, command routing, tick dispatch, event emission, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen/domain state, action normalization, selection, field mutation, action activation, action-request events, snapshots |
| `interface-composition-kit` | active screen state, transition, back navigation, action activation, action command dispatch, auto-route to outcome when the session ends |
| `resource-ledger-kit` | resource values, affordability checks, pay, add, transaction marker, pay/add commands, snapshots |
| `pressure-field-kit` | pressure channels, pressure adjustment, rowPressure tick, curse tick, adjust command, snapshots |
| `orchard-world-kit` | tree grid generation, apple list, apple seeding, nearest apple collection, apple reseeding, bounds snapshot |
| `construction-runtime-kit` | build catalog, resource payment, built item creation, build message, snapshots |
| `roster-runtime-kit` | actor list, role list, hire command, money payment, roster message, snapshots |
| `inventory-runtime-kit` | item list, equipped item, equip command, snapshots |
| `active-session-domain-kit` | day/phase state, player movement, collect command, clear command, next-phase command, pest spawn/chase, player condition damage, score, message, failure state, snapshots |
| `world-canvas-render-kit` | canvas resize, background fill, tree draw, apple draw, pest draw, player draw |
| `html-interface-render-kit` | stat strip, quick commands, screen panels, action buttons, built/roster/inventory/outcome cards, click-to-command routing |
| `game-host-diagnostics-kit` | window engine reference, getState, tick |
| `smoke-fixture-kit` | Node smoke for entry screen, Play transition, active session, and orchard apples |

## Kits identified

### Current explicit kits

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

### Target kits for the next cutover

```txt
seeded-random-kit
orchard-command-contract-kit
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

- `Math.random` is still used for apple placement and pest spawning, so replay and smoke fixtures cannot be deterministic yet.
- `active-session-domain-kit` still owns movement, collect, clear, phase, pest spawn/chase, damage, score, messages, and failure.
- `exchange` exists as an interface screen, but no market buy/sell runtime exists.
- `roster-runtime-kit` can hire workers, but workers do not perform assigned output.
- `construction-runtime-kit` can build a storage shed, but buildings do not modify capacity, defense, production, worker slots, or render plans.
- `inventory-runtime-kit` can equip an item, but tools do not change harvest radius, pest clear strength, durability, or value.
- `session-select`, `knowledge`, and `outcome` exist, but save slots, codex unlocks, and full outcome summaries are shallow.
- `world-canvas` is a direct renderer, not a render-plan consumer.
- `tests/smoke.mjs` only validates the first transition and apple existence.

## Recommended next slice

### Zombie Orchard Economy Command Contract Cutover

```txt
preserve static host and GameHost
-> add seeded-random-kit and inject it into orchard-world and active-session
-> add orchard-command-contract-kit as the only gameplay mutation facade
-> split active-session into movement/session-state/phase/pest/outcome services
-> add harvest-interaction-kit with tool-aware collection radius
-> add economy-ledger transaction history and capacity support
-> add exchange-runtime-kit for sell apples / buy tools / buy supplies
-> add building-effects-kit for storage, defense, production, and worker slots
-> add worker-assignment-kit for harvest, defend, repair, and rest roles
-> add tool-effects-kit for equipped item modifiers and durability
-> add day-night-phase-kit with deterministic settlement events
-> add pest-pressure-kit with deterministic spawn/chase/damage/clear behavior
-> add codex-progression-kit for first collect/build/hire/night/survive notes
-> add save-runtime-kit for localStorage slots
-> upgrade world-canvas to consume a render plan
-> expand smoke tests into deterministic economy scenarios
```

## Suggested 10-minute product slice

```txt
Minute 0-1: start run, collect visible apples, learn collect radius.
Minute 1-2: sell apples at market, buy basic tool.
Minute 2-3: build storage shed, raise apple capacity.
Minute 3-4: hire first worker and assign them to harvest.
Minute 4-5: night starts, pests attack rows.
Minute 5-6: clear pests manually while worker contributes passive defense.
Minute 6-7: morning settlement pays worker outputs and applies building effects.
Minute 7-8: buy lantern/fence/tool upgrade and unlock codex notes.
Minute 8-9: second night escalates rowPressure and curse.
Minute 9-10: outcome summarizes days survived, rows protected, apples sold, money, workers, buildings, tools, and codex unlocks.
```

## Acceptance checks for the next implementation pass

```txt
npm test passes
GameHost.getState() still exists
GameHost.tick(dt) still works
seeded runs replay the same apple/pest sequence
entry -> active-session transition still works
collect changes resources through the command contract
sell apples changes money and apple count
build applies a building effect
hire plus assignment creates worker output
night pest behavior is deterministic
outcome includes score, day, resources, workers, buildings, tools, and codex unlocks
```

## Files reviewed

```txt
README.md
package.json
src/start.js
src/game.js
src/kits/runtime.js
src/kits/scoped-interface-domains.js
src/kits/composition.js
src/kits/game-domains.js
src/presets/orchard-preset.js
src/renderer/html-interface-renderer.js
src/renderer/world-canvas.js
tests/smoke.mjs
.agent/README.md
.agent/kit-registry.json
```
