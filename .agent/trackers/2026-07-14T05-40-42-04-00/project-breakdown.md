# Project breakdown: ZombieOrchard inventory equipment adoption

**Timestamp:** `2026-07-14T05-40-42-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Scope:** documentation only

## Summary

ZombieOrchard exposes an inventory route and an `equipped` field, but equipment is not an admitted gameplay capability. The browser inventory screen only lists items and Back, the raw runtime accepts any equipment ID, the `clear` action always applies one point of damage without consulting inventory, and neither HTML nor Canvas2D proves which item is equipped.

## Plan ledger

**Goal:** define one authoritative equipment transaction so owned item admission, equip state, gameplay effects, HTML projection, Canvas2D projection, rollback, and visible proof reference the same accepted revision.

- [x] Compare the full current `LuminaryLabs-Publish` repository inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no new, ledger-missing, root-agent-missing, or runtime-ahead repository outranks the fallback rule.
- [x] Select and modify only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible entry.
- [x] Read boot, runtime, interface, composition, gameplay, preset, renderer, smoke, and package surfaces.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Preserve all 27 implemented kit surfaces and their offered services.
- [x] Trace inventory item ownership, equip admission, clear-action consumption, HTML projection, Canvas2D projection, and proof gaps.
- [x] Add a timestamped tracker, turn ledger, architecture audit, render audit, gameplay audit, interaction audit, inventory audit, deployment audit, and central-sync audit.
- [x] Refresh all required root `.agent` files and `kit-registry.json`.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable source, browser, dist, and Pages fixtures.

## Organization comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central-ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected repository: ZombieOrchard
selection basis: oldest eligible central documentation timestamp
```

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheLongHaul
TheOpenAbove
TheUnmappedHouse
ZombieOrchard          selected
TheCavalryOfRome       excluded
```

## Complete interaction loop

```txt
browser boot
  -> create one mutable kit runtime
  -> install resource, pressure, orchard, construction, roster, inventory,
     interface, active-session, and composition kits
  -> create Canvas2D and HTML renderers
  -> expose raw GameHost command and manual tick access
  -> begin fixed 1/60 RAF ticking

entry and play
  -> delegated action click
  -> interface-composition activate
  -> route to active-session
  -> collect, clear, next-phase, or open a secondary route

inventory browser path
  -> click Inventory
  -> route to inventory interface domain
  -> HTML renderer lists inventory-runtime.items as cards
  -> inventory route exposes Back only
  -> no browser-authored Equip action exists
  -> no equipped marker or effect description is shown

raw equipment path
  -> GameHost.engine.command("inventory-runtime", "equip", { id })
  -> inventory-runtime writes payload.id directly to state.equipped
  -> no owned-item, catalog, type, route, run, duplicate, or stale validation
  -> no equipment result identity or revision is published

combat path
  -> clear command finds a pest within 58 units
  -> target.condition decreases by exactly 1
  -> inventory-runtime.items and equipped are never read
  -> accepted equipment has no combat, stamina, range, cadence, durability,
     score, resource, animation, or presentation effect

projection
  -> HTML inventory route lists item cards only
  -> active-session HUD omits equipped state
  -> Canvas2D draws trees, apples, pests, and player only
  -> no matching equipment revision or first visible equipment frame exists
```

## Domains in use

```txt
browser document, DOM, delegated clicks, Canvas2D, RAF, error panel, and public GameHost
kit registration, mutable domain graph, command dispatch, ticks, events, snapshots, subscriptions, and publication
entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, and outcome
interface composition, action routing, nested commands, Back, and Outcome routing
resource ledger, pressure field, orchard world, construction, roster, and inventory
movement, collection, phase changes, pest simulation, clearing, scoring, damage, failure, and outcome
inventory item ownership, equipment admission, effect resolution, durability, revisioning, rollback, and visible proof
HTML screens, HUD, cards, messages, delegated controls, and subtree replacement
Canvas2D trees, apples, pests, player, and missing equipment projection
smoke validation, static build, Pages deployment, and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | kit registration, domain creation, arbitrary command dispatch, ticks, events, snapshots, subscriptions, publication |
| `scoped-interface-domain-kit` | screen state, fields, selection, action activation, action descriptors, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | save-select projection, Back |
| `run-setup-domain-kit` | run setup, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest lifecycle, clearing, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction screen, Storage Shed action, Back |
| `exchange-domain-kit` | market projection, Back |
| `roster-domain-kit` | roster projection, Back |
| `inventory-domain-kit` | inventory projection, Back |
| `knowledge-domain-kit` | codex projection, Back |
| `preferences-domain-kit` | settings projection, Back |
| `outcome-domain-kit` | run summary, Title |
| `interface-composition-kit` | route transitions, nested commands, Back, Outcome routing |
| `resource-ledger-kit` | balance checks, payment, grants, snapshots |
| `pressure-field-kit` | pressure adjustment, ticking, snapshots |
| `orchard-world-kit` | tree generation, apple generation, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment request, built-record append, message, snapshots |
| `roster-runtime-kit` | payment, hiring, caller-provided names, snapshots |
| `inventory-runtime-kit` | unvalidated equipment mutation, item snapshots, equipped snapshot |
| `world-canvas-render-kit` | canvas sizing, tree projection, apple projection, pest projection, player projection |
| `html-interface-render-kit` | delegated actions and commands, HUD, screens, cards, messages, titles, descriptions, innerHTML projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, unrestricted manual tick |
| `smoke-fixture-kit` | Entry assertion, Play assertion, apple assertion |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
```

## Source-backed findings

- `orchardPreset.inventory` defines one owned item, `branch`, and initializes `equipped` to `branch`.
- The inventory interface route exposes only Back; there is no browser equip command.
- `inventory-runtime` accepts `equip` and assigns `payload.id` without checking ownership or item existence.
- An empty, unknown, stale, or arbitrary equipment ID can become the stored equipped value.
- The `clear` action does not read `inventory-runtime`; it always subtracts one target condition.
- Equipment has no effect descriptor, durability, range, cadence, stamina cost, or combat receipt.
- The inventory screen lists items but does not identify the equipped item.
- The active-session HUD and Canvas2D renderer do not project equipped state.
- The smoke test exercises Entry, Play, and apple presence only.
- No equipment command ID, inventory revision, item fingerprint, effect revision, rollback result, or visible-frame acknowledgement exists.

## Required parent authority

```txt
zombie-orchard-inventory-equipment-gameplay-adoption-authority-domain
```

## Required transaction

```txt
EquipmentChangeCommand
  -> bind RunGeneration, EquipmentCommandId, InventoryRevision,
     ItemCatalogRevision, ActiveSessionRevision, and route revision
  -> validate exact item identity, ownership, equippable type, and policy
  -> reject unknown, unowned, duplicate, stale, retired, or invalid requests
  -> resolve immutable EquipmentEffectDescriptor
  -> prepare inventory, gameplay, HTML, and Canvas2D candidates
  -> atomically commit one EquipmentRevision
  -> publish EquipmentChangeResult and participant receipts
  -> make ClearActionCommand cite the accepted EquipmentRevision
  -> project the same revision in inventory, HUD, and Canvas2D
  -> publish FirstVisibleEquipmentFrameAck
  -> otherwise restore the predecessor and dispose partial candidates
```

## Planned coordinating surfaces

```txt
zombie-orchard-inventory-equipment-gameplay-adoption-authority-domain
equipment-command-id-kit
inventory-revision-kit
item-catalog-revision-kit
owned-item-admission-kit
equippable-policy-kit
equipment-effect-descriptor-kit
equipment-candidate-kit
equipment-gameplay-adoption-kit
equipment-clear-action-resolution-kit
equipment-durability-kit
equipment-ui-projection-kit
equipment-canvas-projection-kit
equipment-change-result-kit
equipment-rollback-kit
first-visible-equipment-frame-ack-kit
inventory-equipment-fixture-matrix-kit
source-dist-pages-equipment-parity-kit
```

## Validation boundary

Documentation only. Runtime source, gameplay, inventory behavior, HTML, CSS, Canvas2D, dependencies, package scripts, tests, workflows, build, and deployment were not changed. No valid equipment admission, gameplay effect, durability, visible equipment state, rollback, frame convergence, or production-readiness claim is made.