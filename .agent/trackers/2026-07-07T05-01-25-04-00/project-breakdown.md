# Zombie Orchard Project Breakdown

Timestamp: 2026-07-07T05:01:25-04:00
Repo: `LuminaryLabs-Publish/ZombieOrchard`
Scope: documentation and internal agent planning only

## Selection note

`ZombieOrchard` was selected as the next eligible repo because the central ledger showed its last canonical update at `2026-07-07T03:49:46-04:00`, making it the oldest eligible tracked Publish repo at the start of this pass. `TheCavalryOfRome` remained excluded by rule.

## Current status

`ZombieOrchard` is a standalone kit-composed orchard survival/economy shell. The repo already demonstrates the intended bottom-up scoped-domain strategy: reusable interface domains, game-domain kits, a runtime kit host, project preset data, and separate host renderers.

The current implementation is playable as a proof loop but still shallow as an economy game. It supports entry-to-session transition, apple collection, money/apples/resource updates, pressure ticking, phase switching, pest spawning/chasing/damage, building purchase, roster hire, item equipment, canvas rendering, HTML HUD rendering, and GameHost diagnostics. The next step is to split the active-session monolith and make economy systems modify the survival loop.

## Interaction loop

```txt
open static page
→ src/start.js creates createOrchardGame()
→ createOrchardGame() installs runtime kits from orchardPreset
→ createWorldCanvas() mounts the 2D orchard renderer
→ createHtmlInterfaceRenderer() mounts the HUD and screen renderer
→ requestAnimationFrame ticks the engine at 1/60
→ player starts on entry screen
→ player chooses Play
→ interface-composition transitions to active-session
→ player collects apples near current player position
→ resource-ledger adds apples and money
→ pressure-field rises over time and rises more from gold apples
→ player can open Build / Market / Roster / Inventory / Codex / Pause screens
→ player can build the configured storage shed if affordable
→ player can hire roster actors if affordable
→ player can equip inventory items
→ player manually advances day/night phase
→ night phase spawns pests
→ pests chase player and damage condition on contact
→ player clears pests in reach
→ at zero condition, active-session ends
→ interface-composition auto-routes to outcome
```

## Domains in use

### Runtime/composition domains

```txt
kit-runtime
interface-composition
GameHost
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

### Host-renderer domains

```txt
world-canvas
html-interface-renderer
```

### Target extraction domains

```txt
orchard-input
orchard-economy-loop
orchard-harvest-interaction
orchard-market-exchange
orchard-building-effects
orchard-worker-assignment
orchard-tool-effects
orchard-pest-pressure
orchard-day-night-phase
orchard-save-runtime
orchard-codex-progression
orchard-render-plan
orchard-smoke-fixtures
```

## Services surfaced by kits

| Kit | Current services | Next service seam |
| --- | --- | --- |
| `kit-runtime` | installs kits, registers domains, routes commands, ticks domains, emits events, snapshots state, subscriptions | add deterministic seed, event replay, run reset, smoke harness helpers |
| `scoped-interface-domain-kit` | creates reusable screen/domain state, selection, field mutation, action activation, snapshots | add validation, disabled reason mapping, keyboard/pointer intent mapping |
| `interface-composition-kit` | active screen state, transitions, back routing, action dispatch, auto-route to outcome | add transition hooks, route guards, state preservation per screen |
| `resource-ledger-kit` | affordability checks, pay, add resources, transaction marker, snapshots | add transaction history, capacity limits, pricing modifiers, daily settlement |
| `pressure-field-kit` | row pressure tick, curse tick, pressure adjustment, snapshots | add pressure thresholds, row-local pressure, pest spawn requests, building/tool modifiers |
| `orchard-world-kit` | tree grid generation, random apple seeding, collect nearest apple, apple reseeding, bounds snapshot | add seeded random, tree condition, row ownership, harvest quality, storage routing |
| `construction-runtime-kit` | build catalog, pay cost, create built item, build messages, snapshots | add building effect registry, capacity/defense/production modifiers, placement rules |
| `roster-runtime-kit` | actor state, role catalog, hire payment, add field hand, messages, snapshots | add worker assignment, morale tick, work output, fatigue, building slots |
| `inventory-runtime-kit` | item state, equipped item, equip command, snapshots | add tool stat effects, durability, unlock source, active-use modifiers |
| `active-session-domain-kit` | player movement, collect, clear, next phase, pest spawn/chase/damage, failure, score, messages | split into input, harvest, phase, pest, condition, economy, and outcome services |
| `world-canvas` | resize canvas and render trees/apples/pests/player as simple rectangles | add render plan, layered orchard rows, building sprites, worker markers, pressure overlays |
| `html-interface-renderer` | HUD stat strip, active-session command buttons, cards for build/roster/inventory/outcome, click routing | add command palette, market controls, worker assignment UI, save/codex panels |
| `GameHost` | exposes engine, getState, and tick for diagnostics | add deterministic run reset, scenario load, smoke fixture snapshots |

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

### Host/runtime kits to formalize

```txt
html-interface-render-kit
world-canvas-render-kit
game-host-diagnostics-kit
orchard-input-kit
```

### Gameplay/economy kits to build next

```txt
orchard-economy-loop-kit
orchard-harvest-interaction-kit
orchard-market-exchange-kit
orchard-building-effects-kit
orchard-worker-assignment-kit
orchard-tool-effects-kit
orchard-pest-pressure-kit
orchard-day-night-phase-kit
orchard-save-runtime-kit
orchard-codex-progression-kit
orchard-render-plan-kit
orchard-smoke-fixture-kit
```

## Current gaps

- `Math.random` is still used for apple and pest generation, so runs are not deterministic.
- Movement exists as a command but no keyboard, pointer, or virtual joystick mapper sends continuous movement into `active-session.move`.
- `active-session` owns movement, collection, phase changes, pest spawning, pest chase, damage, scoring, and failure in one service.
- The market/exchange screen exists but has no buy/sell economy runtime.
- Workers can be hired but do not work, occupy buildings, affect harvest, or defend rows.
- The storage shed can be built but does not modify storage, defense, production, or placement.
- Inventory equipment does not affect harvest radius, clear strength, stamina, value, or durability.
- Save select and codex screens exist but do not persist or unlock data.
- Canvas rendering is serviceable for a shell but too placeholder for the target survival/economy fantasy.
- Smoke coverage only checks entry-to-active-session transition and apple generation.

## Recommended next slice

### Zombie Orchard Economy Service Cutover

```txt
preserve src/start.js and GameHost shape
add .agent/kit-registry.json and keep it current
add seeded-random-kit used by orchard-world and pest spawning
extract active-session into phase, player, harvest, pest, condition, score, and outcome services
add orchard-input-kit for WASD/arrow/pointer movement commands
implement exchange-runtime-kit for sell apples, buy tools, and buy supplies
make storage-shed modify resource capacity and row safety
make workers perform assigned harvest/clear/repair roles per tick
make branch/tool equipment affect harvest radius and pest clear strength
add codex unlocks for first collect, first build, first hire, first night survived
add save-runtime-kit with localStorage profile slots
upgrade world-canvas into a render-plan service with rows, buildings, workers, pests, apples, and pressure overlays
expand tests to cover collect, build, hire, night pest damage, clear pest, exchange sale, and outcome route
```

## Ideation for the product direction

Target the first complete 10-minute loop as a small systemic economy/survival game:

```txt
Day 1
- collect apples manually
- sell apples at the market
- build storage shed
- hire first field hand

Night 1
- pests spawn from row pressure
- player clears close pests
- worker slows damage in assigned row

Day 2
- buy better tool
- build lantern or fence
- unlock codex note about cursed rows

Night 2
- higher pressure tests whether buildings, workers, and tools matter
- success routes to outcome summary with score, money, apples, buildings, workers, and rows saved
```

## Implementation order

1. Add deterministic seed service.
2. Add input mapper.
3. Split active-session into smaller services without changing behavior.
4. Add exchange runtime and market actions.
5. Add building effects.
6. Add worker assignments.
7. Add tool effects.
8. Add codex/save runtimes.
9. Upgrade renderer.
10. Expand smoke tests around the whole economy loop.

## Validation plan

```txt
npm test
manual browser check:
  entry → active-session
  move → collect → resources update
  build → storage appears and effect applies
  roster → hire worker
  exchange → sell apples / buy tool
  next-phase → night pest spawn
  clear pest → scrap increases
  condition reaches zero → outcome
GameHost check:
  window.GameHost.getState()
```
