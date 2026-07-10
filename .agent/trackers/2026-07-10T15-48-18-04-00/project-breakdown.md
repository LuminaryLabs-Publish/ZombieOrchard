# Project breakdown — ZombieOrchard

Timestamp: `2026-07-10T15-48-18-04-00`

## Goal

Map the current ZombieOrchard interaction, domain, service, and kit boundaries, then define the smallest implementation-safe Market proof cut without changing runtime behavior.

## Completion ledger

- [x] Compared the complete accessible `LuminaryLabs-Publish` inventory against central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Selected only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible fallback.
- [x] Read the active browser route, game factory, kit runtime, interface composition, domain kits, renderers, preset, and smoke test.
- [x] Identified the interaction loop.
- [x] Identified all domains in use.
- [x] Identified all kit services.
- [x] Identified all implemented and next-cut kits.
- [x] Added timestamped architecture, render, gameplay, interaction, Market-authority, transaction, deploy, and turn-ledger audits.
- [x] Refreshed the required root `.agent` files.
- [x] Changed documentation only.
- [x] Created no branch and no pull request.

## Selection comparison

```txt
ZombieOrchard       selected / prior 2026-07-10T14-21-28-04-00
TheUnmappedHouse    tracked / 2026-07-10T14-28-47-04-00
MyCozyIsland        tracked / 2026-07-10T14-42-01-04-00
TheOpenAbove        tracked / 2026-07-10T14-50-38-04-00
PrehistoricRush     tracked / 2026-07-10T14-59-00-04-00
AetherVale          tracked / 2026-07-10T15-09-26-04-00
IntoTheMeadow       tracked / 2026-07-10T15-18-29-04-00
HorrorCorridor      tracked / 2026-07-10T15-31-03-04-00
PhantomCommand      tracked / 2026-07-10T15-38-40-04-00
TheCavalryOfRome    excluded by rule
```

No eligible repository was new, ledger-missing, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> createKitRuntime(...kits)
  -> createWorldCanvas(...) + createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> every domain tick
  -> aggregate engine.snapshot()
  -> world canvas consumes orchard/session state
  -> HTML renderer consumes interface/session/resource/pressure/runtime state

pointer data-action
  -> engine.command(interface-composition, activate)
  -> active interface domain returns an action descriptor
  -> optional child action.command dispatches through engine.command(...)
  -> child result is discarded
  -> parent returns transition result or generic accepted result

pointer data-command
  -> engine.command(active-session, command)
  -> synchronous collect/clear/phase mutation
  -> raw aggregate snapshot becomes visible on the next render
```

## Domains in use

```txt
static browser shell
boot module
runtime entrypoint
game factory
kit runtime
engine context
domain registry
command router
tick dispatcher
event emitter
snapshot aggregator
subscription notifier
browser animation loop
GameHost diagnostics
interface screen state
interface composition
data-action routing
data-command routing
entry
session select
run setup
active session
interrupt
construction
exchange
roster
inventory
knowledge
preferences
outcome
resource ledger
pressure field
orchard world
construction runtime
roster runtime
inventory runtime
world canvas rendering
HTML interface rendering
smoke fixture
static build copy
central ledger synchronization
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
static-build-copy-kit
```

## Services offered by the kits

- `kit-runtime`: kit registration, domain creation, domain lookup, command routing, bounded delta tick routing, event emission, snapshot aggregation, and subscriber notification.
- Scoped interface kits: screen title, description, fields, metadata, selected action index, action lookup, action activation, and field mutation.
- `interface-composition-kit`: active-screen ownership, previous-screen history, transition, back navigation, action activation, and child command dispatch.
- `resource-ledger-kit`: affordability check, boolean payment, resource addition, command access, and aggregate resource snapshot.
- `pressure-field-kit`: bounded pressure-channel adjustment, passive pressure tick, command access, and channel snapshot.
- `orchard-world-kit`: orchard generation, apple replenishment, nearby collection, and world snapshot.
- `construction-runtime-kit`: build catalog, affordability payment, built-object creation, and status message.
- `roster-runtime-kit`: actor/role state, hire payment, actor creation, and status message.
- `inventory-runtime-kit`: item/equipment state and equip command.
- `active-session-domain-kit`: movement, collection, pest clearing, day/night phase change, pest simulation, damage, failure, score, and session projection.
- Render kits: 2D orchard canvas drawing, active-session HUD projection, generic screen projection, and DOM action binding.
- `game-host-diagnostics-kit`: raw engine handle, aggregate snapshot readback, and manual tick hook.
- Proof/deploy kits: entry-to-play smoke and static `dist` copy.

## Command-causality findings

1. `engine.command()` returns a result but does not assign a command ID or retain request/result rows.
2. `interface-composition.activate` discards the child command result and overwrites causality with a transition or generic `{ accepted: true }`.
3. Runtime events are cleared at the start of each tick and are not included in snapshots, so emitted action events are not durable readback.
4. `resource-ledger.pay()` returns only a boolean. It has no transaction ID, reason code, source action, before/after values, or delta row.
5. `inventory-runtime` can equip but has no purchase-intake service, capacity policy, or intake result.
6. The Exchange domain is Back-only. There is no Market source catalog, price row, capacity row, or buy/sell command.
7. The HTML renderer has no Exchange-specific projection and no render-consumption row.
8. `window.GameHost` exposes mutable runtime handles rather than a bounded JSON-safe command/transaction proof journal.
9. The existing smoke test proves entry, transition, and apple presence only.

## Main finding

The next blocker is not visual presentation or economy breadth. It is command causality across the parent interface action, child Market command, resource transaction, inventory intake, Exchange projection, renderer consumption, and GameHost readback.

## Next safe ledge

```txt
ZombieOrchard Market Command Causality Ledger
+ Resource/Inventory Transaction Fixture Gate
```

The implementation should establish one stable correlation chain:

```txt
market action source
  -> parent activation id
  -> child command id
  -> preflight result
  -> resource transaction id
  -> inventory intake id
  -> Market result row
  -> Exchange projection row
  -> renderer consumption row
  -> GameHost bounded journal row
```

## Validation boundary

Documentation only. Runtime source, dependencies, package scripts, renderer behavior, deployment configuration, and workflows were not changed. Runtime tests were not run because no runtime implementation changed and the required Market causality fixture does not yet exist.