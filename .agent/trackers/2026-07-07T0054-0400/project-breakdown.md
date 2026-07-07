# Zombie Orchard Project Breakdown

Repo: `LuminaryLabs-Publish/ZombieOrchard`
Run timestamp: `2026-07-07T00:54:25-04:00`
Run type: internal docs breakdown and ideation
Branch target: `main`

## Executive summary

Zombie Orchard is currently a static, kit-composed orchard survival/economy shell. The project already has a clean runtime boundary: a deterministic-ish kit runtime owns domains, commands, ticking, snapshots, and subscriptions; a canvas renderer draws the orchard world; an HTML renderer exposes screens and actions; and a preset maps generic scoped interface domains into the Zombie Orchard theme.

The next best direction is to turn the shell into a complete compact economy-survival loop: harvest apples, clear row pests, spend resources on buildings/workers/tools, survive night pressure, and convert each day into meaningful strategy decisions.

## Current architecture observed

```txt
index.html
  -> src/boot.js
    -> src/start.js
      -> createOrchardGame()
      -> createWorldCanvas(canvas)
      -> createHtmlInterfaceRenderer(root, engine)
      -> requestAnimationFrame(draw)
```

Runtime composition:

```txt
createOrchardGame(preset)
  -> createKitRuntime({ kits })
    -> resource-ledger-kit
    -> pressure-field-kit
    -> orchard-world-kit
    -> construction-runtime-kit
    -> roster-runtime-kit
    -> inventory-runtime-kit
    -> scoped interface domain kits
    -> active-session-domain-kit
    -> interface-composition-kit
```

## Interaction loop

### Current player loop

```txt
Entry screen
  -> Play
  -> Active session
  -> Move / Collect / Clear / Next Phase
  -> Open Build / Market / Roster / Inventory / Codex / Pause
  -> Return to active session
  -> Night phase spawns pests
  -> Pests chase player and damage condition
  -> Condition reaches 0
  -> Outcome screen
```

### Current economy loop

```txt
Collect apple
  -> add apples
  -> add money
  -> sometimes increase row pressure
  -> use money/wood in construction
  -> built items appear in construction runtime state
```

### Current survival loop

```txt
Next Phase toggles day/night
  -> night can spawn pests
  -> pests move toward player
  -> clear action damages nearby pest
  -> defeated pest grants scrap
  -> player condition failure ends run
```

### Missing loop depth

- Buildings do not yet affect production, storage, defense, pressure, or day settlement.
- Roster workers can be hired by runtime service, but the current UI does not expose a hire action in the preset.
- Inventory supports equip, but active-session actions do not yet read equipped item stats.
- Market exists as an interface domain, but no exchange runtime service exists yet.
- Knowledge/codex exists as a screen domain, but no unlock/progression content is attached yet.

## Domains in use

### Runtime / engine domains

| Domain id | Domain type | Current responsibility |
| --- | --- | --- |
| `resource-ledger` | `game` | Tracks resource balances and exposes payment/gain services. |
| `pressure-field` | `game` | Tracks row pressure and curse channels, increases them over time. |
| `orchard-world` | `game` | Owns tree grid, apple placement, apple collection proximity, and bounds. |
| `construction-runtime` | `game` | Owns build catalog, built structures, build cost payment, and build messages. |
| `roster-runtime` | `game` | Owns workers/actors, roles, hiring cost payment, and roster messages. |
| `inventory-runtime` | `game` | Owns items and equipped item state. |
| `active-session` | `interface` | Owns day/phase/player/pests/score/session commands and session failure. |
| `interface-composition` | `interface-composition` | Owns active screen, previous screen, action activation, command forwarding, and outcome transition. |

### Scoped interface domains

| Domain id | Current screen/purpose |
| --- | --- |
| `entry` | Title / entry menu. |
| `session-select` | Save slot shell. |
| `run-setup` | New run setup shell. |
| `active-session` | Gameplay HUD/action surface. |
| `interrupt` | Pause screen. |
| `construction` | Build screen. |
| `exchange` | Market screen. |
| `roster` | Worker roster screen. |
| `inventory` | Inventory screen. |
| `knowledge` | Codex screen. |
| `preferences` | Settings screen. |
| `outcome` | Run summary screen. |

## Services that the kits offer

### `createKitRuntime`

- `addKit(kit)` registers a kit-created domain by id.
- `command(domainId, type, payload)` routes commands to a domain.
- `tick(delta)` advances runtime time, ticks all domains, and returns a snapshot.
- `snapshot()` returns all domain snapshots keyed by domain id.
- `subscribe(listener)` notifies listeners after commands/ticks.
- `ctx.emit(type, payload)` records frame events for domain coordination.

### `resource-ledger-kit`

- `api.canPay(cost)` checks affordability.
- `api.pay(cost)` subtracts resources if affordable.
- `api.add(values)` increments resource balances.
- Commands: `add`, `pay`.
- Snapshot: resource values and last ledger status.

### `pressure-field-kit`

- `api.adjust(id, amount)` changes pressure channels with clamping.
- Tick service: increases `rowPressure` and `curse` over time.
- Command: `adjust`.
- Snapshot: pressure channel values.

### `orchard-world-kit`

- Initializes a 7x9 tree grid.
- Seeds apples around trees.
- `api.collectNear(point, radius)` finds and removes the nearest apple within radius, then reseeds.
- Snapshot: trees, apples, world bounds.

### `construction-runtime-kit`

- Maintains build catalog and built structures.
- Command: `build`.
- Service behavior: finds catalog item, asks `resource-ledger` to pay cost, appends built structure, reports success/failure message.
- Snapshot: catalog, built structures, message.

### `roster-runtime-kit`

- Maintains worker actors and roles.
- Command: `hire`.
- Service behavior: pays money through `resource-ledger`, adds a field hand, reports success/failure message.
- Snapshot: actors, roles, message.

### `inventory-runtime-kit`

- Maintains item list and equipped item id.
- Command: `equip`.
- Snapshot: items and equipped id.

### `active-session-domain-kit`

- Maintains run state: day, phase, player, pests, score, messages, ended flag.
- Commands: `activate`, `move`, `collect`, `clear`, `next-phase`.
- Tick service: during night, spawns pests; moves pests toward player; damages player on contact; ends run on condition depletion.
- Snapshot: run state plus active-session actions.

### `scoped-interface-domain-kit`

- Maintains screen title, description, selected action index, fields, and metadata.
- Commands: `select`, `set-field`, `activate`.
- Emits selection/action/field-change events.
- Snapshot: screen state and available actions.

### `interface-composition-kit`

- Maintains active screen and previous screen.
- Commands: `transition`, `back`, `activate`.
- Service behavior: activates current screen action, forwards embedded commands, then transitions to action target.
- Tick service: moves to `outcome` when active session has ended.
- Snapshot: active screen, previous screen, and current active screen snapshot.

### `html-interface-renderer`

- Listens for button clicks.
- Routes screen actions to `interface-composition.activate`.
- Routes quick gameplay commands to `active-session`.
- Renders active HUD, stats, action buttons, screen panels, cards, and outcome summary.

### `world-canvas-renderer`

- Renders orchard background, trees, apples, pests, and player using canvas 2D.
- Reads `orchard-world` and `active-session` snapshots.

## Kits identified

### Engine/runtime kits

- `kit-runtime`
- `interface-composition-kit`

### Interface kits

- `entry-domain-kit`
- `session-select-domain-kit`
- `run-setup-domain-kit`
- `active-session-domain-kit`
- `interrupt-domain-kit`
- `construction-domain-kit`
- `exchange-domain-kit`
- `roster-domain-kit`
- `inventory-domain-kit`
- `knowledge-domain-kit`
- `preferences-domain-kit`
- `outcome-domain-kit`

### Game/runtime kits

- `resource-ledger-kit`
- `pressure-field-kit`
- `orchard-world-kit`
- `construction-runtime-kit`
- `roster-runtime-kit`
- `inventory-runtime-kit`
- `active-session-domain-kit`

### Renderer/service surfaces

These are not currently declared as kits, but they behave like host services:

- `html-interface-renderer`
- `world-canvas-renderer`

## What is next

### Priority 1 — make the economy real

Add an `exchange-runtime-kit` so the market domain can buy/sell using deterministic recipes.

Required services:

- `quote(tradeId)`
- `canTrade(tradeId)`
- `executeTrade(tradeId)`
- `snapshot()` with active offers and last transaction

Initial offers:

- Sell apples for money.
- Buy wood with money.
- Buy medicine/repair supply with money + scrap.
- Convert gold apples into curse reduction or rare currency.

### Priority 2 — make construction modify the run

Built structures should affect active systems.

Initial structure effects:

- `storage-shed`: raises apple cap / storage cap.
- `watch-post`: slows pest spawn rate at night.
- `fence-line`: reduces pest speed near rows.
- `worker-hut`: unlocks more roster slots.
- `press`: converts apples into higher value goods.

Implementation direction:

- Add effect descriptors to construction catalog.
- Add a shared `modifier-registry-kit` or local construction API: `getModifiers(scope)`.
- Let `active-session`, `pressure-field`, and future exchange services read modifiers.

### Priority 3 — expose roster actions

The roster runtime already supports `hire`, but the preset does not expose it.

Next actions:

- Add roster screen actions for `hire-field-hand`, `hire-guard`, `hire-trader`.
- Give workers passive modifiers.
- Add morale and fatigue hooks later.

### Priority 4 — connect inventory to active-session

Inventory currently equips items, but gameplay commands do not read equipment.

Next actions:

- Add item descriptors: `clearPower`, `collectRadius`, `staminaCost`, `pressureEffect`.
- Let `collect` and `clear` use equipped item stats.
- Add basic inventory actions for equipping tools.

### Priority 5 — turn day/night into a settlement cycle

`next-phase` should become more strategic than a toggle.

Settlement pass should:

- Resolve production.
- Apply building upkeep.
- Apply worker actions.
- Advance curse/pressure.
- Spawn or reduce threats.
- Present a day report.

Possible new kit:

- `settlement-phase-runtime-kit`

### Priority 6 — improve world readability

The canvas renderer is intentionally simple. It should stay simple for now, but get clearer semantics.

Next renderer updates:

- Draw rows as lanes.
- Show collection radius hint.
- Show pest aggro radius/night danger.
- Draw built structures in-world.
- Show tree condition states.

### Priority 7 — strengthen tests

Current smoke only verifies entry, play transition, and apple presence.

Add tests for:

- `collect` increases apples/money.
- `build` pays cost and adds structure.
- insufficient resources reject build.
- roster hire adds actor and spends money.
- inventory equip changes equipped item.
- night tick can spawn pests.
- player failure routes to outcome.

## Recommended implementation order

1. Add `exchange-runtime-kit` and market preset actions.
2. Add roster hire actions to preset and smoke tests.
3. Add inventory equip actions and item stat descriptors.
4. Add construction effects and one active-session modifier read.
5. Add day settlement report and structured phase resolver.
6. Improve renderer semantics after the loop is mechanically complete.

## Notes for future agents

- Do not split work across multiple publish projects in one run.
- Keep this repo's current advantage: small static app, no npm dependencies, direct smoke test.
- Prefer adding reusable runtime kits over hardcoding Zombie Orchard-specific logic into renderers.
- Keep `orchardPreset` as the theme/content layer.
- Use `active-session` only for run state and immediate player commands; push economy systems into separate runtime kits.
