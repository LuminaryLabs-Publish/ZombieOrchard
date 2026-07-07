# ZombieOrchard Agent Breakdown

**Run timestamp:** 2026-07-07T01:05:34-04:00
**Repo:** `LuminaryLabs-Publish/ZombieOrchard`
**Branch:** `main`
**Tracker folder:** `.agent/breakdowns/2026-07-07T01-05-34-04-00/`
**Scope:** One-repo breakdown and next-step ideation.

## Selection Notes

- Chosen repo: `LuminaryLabs-Publish/ZombieOrchard`.
- Excluded repo rule honored: did not inspect or modify Cavalry of Rome.
- This run only updates repo-local internal docs under the root `.agent` folder.

## Current Project Read

`ZombieOrchard` is a standalone kit-composed orchard survival/economy game shell. The repository already presents itself as a composition of kits, presets, and host renderers. The app is intentionally lightweight: a static HTML entrypoint, canvas world renderer, HTML interface renderer, kit runtime, scoped interface domains, game-domain kits, and a smoke test.

The current game is best understood as an orchard survival/economy prototype where the player collects apples, clears pests, builds structures, navigates management screens, and survives escalating row pressure/curse pressure.

## Interaction Loop

### Boot Loop

1. `index.html` loads the canvas, UI root, error panel, stylesheet, and `src/boot.js`.
2. `src/boot.js` imports `src/start.js`.
3. `src/start.js` creates:
   - `createOrchardGame()` engine.
   - `createWorldCanvas()` canvas renderer.
   - `createHtmlInterfaceRenderer()` UI renderer.
4. The host starts a `requestAnimationFrame` draw loop.
5. Each frame:
   - `engine.tick(1 / 60)` updates every domain.
   - `world.render(snapshot)` draws orchard state.
   - `ui.render(snapshot)` draws active interface state.

### Player Loop

1. Player starts at the `entry` interface domain.
2. Player activates `Play` to transition into `active-session`.
3. In active session, the player can:
   - Collect nearby apples.
   - Clear nearby pests.
   - Advance phase between day and night.
   - Open pause/build/market/roster/inventory/codex screens.
4. Economy state updates through `resource-ledger`.
5. Pressure state increases over time through `pressure-field`.
6. Night phase can spawn pests.
7. Pests move toward the player and reduce player condition on contact.
8. If player condition reaches zero, the session ends and the interface composition kit routes to `outcome`.

### Management Loop

1. Player enters a management screen from active session.
2. UI actions route through `interface-composition`.
3. Action commands invoke game runtime domains where configured.
4. Current implemented management action:
   - Build `storage-shed` through `construction-runtime`.
5. Player backs out to `active-session`.

## Domains In Use

### Interface Domains

These are scoped interface domains generated from `INTERFACE_DOMAIN_IDS` and configured by the orchard preset:

| Domain | Purpose | Current State |
| --- | --- | --- |
| `entry` | Title/menu entry. | Play/New Game/Settings actions. |
| `session-select` | Save slot selection. | Placeholder back action. |
| `run-setup` | New run setup. | Start/back actions. |
| `active-session` | Live gameplay interface. | Pause/build/market/roster/inventory/codex actions. |
| `interrupt` | Pause menu. | Resume/title actions. |
| `construction` | Build screen. | Storage shed build action. |
| `exchange` | Market/shop screen. | Placeholder back action. |
| `roster` | Worker/actor screen. | Placeholder back action; displays actors. |
| `inventory` | Inventory/equipment screen. | Placeholder back action; displays items. |
| `knowledge` | Codex/help screen. | Placeholder back action. |
| `preferences` | Settings screen. | Placeholder back action. |
| `outcome` | Run summary/game over. | Title action; shows score/day. |

### Game Runtime Domains

| Domain | Purpose | Current Behavior |
| --- | --- | --- |
| `resource-ledger` | Economy ledger. | Tracks money, apples, wood, scrap. Offers add/pay/canPay. |
| `pressure-field` | Survival pressure channels. | Tracks row pressure and curse; rises over time. |
| `orchard-world` | Orchard simulation source. | Generates tree grid and apples; offers nearby apple collection. |
| `construction-runtime` | Build economy. | Pays costs and appends built structures. |
| `roster-runtime` | Workers/actors. | Hires field hands if money is available. |
| `inventory-runtime` | Equipment/items. | Tracks items and equipped item. |
| `active-session` | Live run simulation. | Player movement, apple collection, pest clearing, day/night, pest damage, end state. |
| `interface-composition` | UI flow controller. | Tracks active screen, handles transitions, forwards configured commands, routes ended runs to outcome. |

## Kits Identified

### Core Runtime Kit

| Kit | Creates Domain | Service Offered |
| --- | --- | --- |
| `createKitRuntime` | Runtime host, not a domain kit itself. | Registers kits, stores domains, routes commands, ticks domains, emits snapshots, supports subscriptions. |

### Interface Kits

| Kit | Creates Domain | Service Offered |
| --- | --- | --- |
| `createScopedInterfaceDomainKit(domainId, config)` | One scoped interface domain per ID. | Select action, set field, activate action, snapshot actions/meta. |
| `createInterfaceDomainKits(config)` | All scoped interface domains. | Generates the full interface domain set from preset config. |
| `createInterfaceCompositionKit(config)` | `interface-composition` | Active screen routing, back navigation, action activation, command forwarding, automatic outcome transition. |

### Game-Domain Kits

| Kit | Creates Domain | Service Offered |
| --- | --- | --- |
| `createResourceLedgerKit` | `resource-ledger` | Resource payment, resource gain, affordability checks. |
| `createPressureFieldKit` | `pressure-field` | Pressure channel adjustment and time-based pressure increase. |
| `createOrchardWorldKit` | `orchard-world` | Tree/apple world state, seeded apples, nearby apple collection. |
| `createConstructionRuntimeKit` | `construction-runtime` | Build catalog, cost payment, built structure list, feedback message. |
| `createRosterRuntimeKit` | `roster-runtime` | Actor roster, role catalog, hire command, feedback message. |
| `createInventoryRuntimeKit` | `inventory-runtime` | Item list, equipped item, equip command. |
| `createActiveSessionDomainKit` | `active-session` | Run state, player movement, collect/clear/phase commands, pest spawn/chase/damage, end state. |

### Host Renderer Services

| Service | File | Purpose |
| --- | --- | --- |
| HTML interface renderer | `src/renderer/html-interface-renderer.js` | Renders HUD/screens and converts clicks into engine commands. |
| Canvas world renderer | `src/renderer/world-canvas.js` | Draws trees, apples, pests, and player from snapshot state. |

## Services The Kits Offer

### Runtime Services

- Domain registry.
- Domain command routing.
- Fixed-delta tick clamp.
- Snapshot generation.
- Event emission.
- Listener subscription.

### Interface Services

- Screen/action declaration from presets.
- Active screen composition.
- UI action activation.
- Back/transition handling.
- Command forwarding from interface actions into game domains.
- Ended-session routing to outcome.

### Economy Services

- Resource value storage.
- Resource affordability checks.
- Resource payment.
- Resource gain.
- Build cost consumption.
- Hire cost consumption.

### World/Session Services

- Orchard tree grid generation.
- Apple spawning and respawning.
- Nearby apple collection.
- Player movement clamp.
- Day/night phase toggling.
- Pest spawning during night.
- Pest chase behavior.
- Player damage and game-over state.

### Management Services

- Construction catalog and built-instance tracking.
- Roster actor storage and hiring.
- Inventory item storage and equipment selection.
- Placeholder market/codex/settings/save domains ready for expansion.

## Current Gaps

### Economy Depth

- Market screen exists, but no buy/sell/trade command is implemented.
- Apples convert directly into money on collect, which short-circuits a deeper economy loop.
- No price fluctuation, demand, spoilage, storage cap, contracts, debt, upkeep, or supply chain.

### Worker/Roster Depth

- Roster runtime can hire, but the preset exposes no hire action.
- Workers do not perform jobs over time.
- No assignments, wages, morale economy, productivity, fatigue, or injuries.

### Construction Depth

- Only one structure exists: `storage-shed`.
- Built structures do not alter caps, production, defense, routes, or economy modifiers yet.
- No placement selection or structure collision/footprint logic.

### Inventory Depth

- Inventory can equip, but no UI actions invoke equip.
- Items do not modify collect radius, clear damage, stamina, pest defense, or worker productivity.

### Persistence

- `session-select` is present, but no save/load service exists.
- No local storage, run seed, checkpoint, export/import, or profile ledger.

### Simulation Determinism

- World generation and pest spawning use `Math.random()` directly.
- This makes replay, testing, saves, and deterministic economy balancing harder.

### Rendering/UX

- Canvas renderer is intentionally simple rectangles.
- No camera smoothing, tile/row affordances, selection highlights, building placement previews, pest telegraphs, or economy feedback animation.

### Tests

- Smoke test validates entry, play transition, and apples.
- No tests yet for collect, build, pressure, phase, pest, game over, roster, inventory, or interface command forwarding.

## Recommended Next Direction

### Target Product Shape

Turn `ZombieOrchard` into a compact orchard economy survival game with a day/night management rhythm:

```txt
Morning planning -> worker assignment -> harvest/defense loop -> market/build decisions -> night pressure -> settlement report -> next day
```

### Core Loop V2

1. **Morning:** Review weather/curse/market demand.
2. **Assign:** Place workers on harvest, repair, defense, scouting, market hauling.
3. **Day:** Move around orchard, collect apples, clear pests, trigger worker assists.
4. **Market:** Sell apples/crates, buy supplies, accept contracts.
5. **Build:** Add sheds, fences, scarecrow wards, compost pits, watch posts.
6. **Night:** Zombies/pests pressure rows and damage trees/structures.
7. **Report:** Apply wages, spoilage, repairs, debt, score, unlocks.

## Implementation Roadmap

### Phase 1 — Economy Domain Upgrade

- Add `market-runtime-kit`.
- Add explicit sell/buy commands.
- Stop instantly converting all apples into money on collection.
- Add price table and daily demand.
- Add `storage` resource caps.
- Add smoke tests for collect -> inventory/resource -> sell -> money.

### Phase 2 — Worker Assignment Loop

- Add `assignment-runtime-kit` or extend `roster-runtime` with assignments.
- Add preset actions for hiring and assigning workers.
- Add jobs: harvest, repair, patrol, haul, compost.
- Tick worker jobs once per phase or per day, not every frame.
- Add wage/upkeep pressure.

### Phase 3 — Structures That Matter

- Expand construction catalog:
  - `storage-shed`: increases apple/storage cap.
  - `fence-row`: slows pests in a row.
  - `watch-post`: increases pest visibility/clear range.
  - `market-stall`: improves sale price or reduces transaction loss.
  - `compost-pit`: turns rotten apples into soil/wood bonus.
- Let structures publish modifiers into economy/session domains.

### Phase 4 — Deterministic Run Foundation

- Add seeded RNG service kit.
- Store run seed in active session.
- Route apple generation and pest spawning through seeded RNG.
- Add replay-friendly smoke tests.

### Phase 5 — Save/Load Shell

- Add `persistence-runtime-kit`.
- Wire `session-select` to local storage slots.
- Save resources, world, roster, inventory, construction, day/phase, and seed.
- Add import/export JSON action for debugging.

### Phase 6 — Renderer/Feedback Upgrade

- Add row overlays and row status.
- Add selected action affordance.
- Add building placement preview.
- Add pest warning pulses during night.
- Add market transaction and harvest feedback.
- Keep renderer snapshot-driven and avoid baking gameplay logic into DOM/canvas code.

## Proposed New/Updated Kits

| Kit | Type | Purpose |
| --- | --- | --- |
| `market-runtime-kit` | New game-domain kit | Buy/sell pricing, demand, contracts, daily price movement. |
| `assignment-runtime-kit` | New game-domain kit | Worker assignments and job resolution. |
| `persistence-runtime-kit` | New utility/domain kit | Save/load slots and run export/import. |
| `seeded-rng-kit` | New utility kit | Deterministic random streams for world/session systems. |
| `daily-report-domain-kit` | New interface/game bridge | End-of-day report state and next-day transition. |
| `row-state-runtime-kit` | New game-domain kit | Per-row tree condition, infestation, defense modifiers. |
| `construction-runtime-kit` | Update | Structure modifiers, placement, footprint, repair state. |
| `roster-runtime-kit` | Update | Hiring UI, wages, morale, job assignment hooks. |
| `inventory-runtime-kit` | Update | Equip effects and item commands exposed in preset. |
| `active-session-domain-kit` | Update | Integrate row pressure, worker assists, item modifiers, deterministic pests. |

## Immediate Next PR/Commit Candidate

A focused next implementation should avoid overbuilding and add one complete vertical slice:

```txt
MarketRuntimeKit + UI actions + smoke tests
```

Minimum useful slice:

- Keep apples as a resource.
- Add `market-runtime` with `sell` command.
- Add `exchange` action: `Sell 5 Apples`.
- Convert 5 apples into money based on a preset price.
- Add market message feedback.
- Add smoke test proving collect/add apples -> sell -> money increases.

This gives the game its first real economy surface without changing renderer architecture.

## Risks / Notes

- The repo is currently small and easy to keep clean; avoid adding large frameworks.
- Keep all gameplay mutations inside kits/domains.
- Keep renderers dumb and snapshot-driven.
- Avoid one-off ZombieOrchard-only UI widgets until generic scoped domains cannot express the need.
- Make deterministic RNG a priority before balancing economy systems.

## Done In This Run

- Inspected the repo structure and runtime files.
- Identified the interaction loop.
- Identified all current domains in use.
- Identified all current kits and their services.
- Added this timestamped `.agent` tracker entry for internal project continuation.
