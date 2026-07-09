# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-09T05-11-22-04-00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Chosen from:** `LuminaryLabs-Publish`

**Central ledger:** `LuminaryLabs-Dev/LuminaryLabs`

## Selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the ledger, missing a sampled root `.agent` folder, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`ZombieOrchard` was selected because central tracking still pointed to `2026-07-09T02-05-52-04-00` while repo-local `.agent` state had advanced to `2026-07-09T05-01-51-04-00`. This pass closes that central catch-up gap and refines the next implementation ledge.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / not selected
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / not selected
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / not selected
LuminaryLabs-Publish/ZombieOrchard        selected / central ledger behind repo-local .agent
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / not selected
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / not selected
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / not selected
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / not selected
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / not selected
```

## Product read

`ZombieOrchard` is a standalone static browser orchard survival/economy shell.

It has a compact kit runtime, generated screen/interface domains, game-domain kits, a canvas world renderer, an HTML interface renderer, and a minimal smoke harness.

It is not missing a playable route. The gap is proofability and Market command authority.

## Interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> ctx.delta / ctx.elapsed / ctx.frame advance
  -> pressure-field tick adjusts rowPressure and curse
  -> active-session tick moves pests and resolves player damage/end state
  -> engine.snapshot() aggregates every registered domain snapshot
  -> world-canvas renders orchard trees, apples, pests, built objects, and player
  -> html-interface-renderer renders active-session HUD or generic screen panel
  -> click[data-action] calls engine.command("interface-composition", "activate", { actionId })
  -> interface-composition asks the active screen domain for an action
  -> action.command can call ctx.engine.command(...)
  -> nested command result is currently discarded
  -> click[data-command] calls engine.command("active-session", command)
  -> window.GameHost exposes engine/getState/tick
```

## Domains in use

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
kit-runtime
engine-context
domain-registry
command-router
event-emitter
tick-dispatcher
snapshot-aggregator
subscription-bus
browser-animation-loop
GameHost
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
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
world-canvas
smoke-harness
```

## Services the kits offer

```txt
install kits
register domains
route domain commands
return command results
tick domain state
emit runtime events
aggregate snapshots
render orchard world canvas
render active-session HUD
render generic screen panels
transition interface screens
activate selected interface actions
dispatch nested interface commands
add resources
pay resources
check affordability
adjust pressure channels
create trees and random apples
collect nearby apple
build catalog items
hire roster actors
equip inventory items
move player
collect apples
clear pests
advance day/night phase
expose GameHost engine/getState/tick
run minimal smoke fixture
```

## Kits identified

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
```

## Main finding

The runtime already has the right seam for command authority because `engine.command()` returns a command result. The failure point is downstream: `interface-composition.activate` calls nested `ctx.engine.command(...)` but does not preserve the nested result for snapshots, renderer projection, GameHost diagnostics, or fixture replay.

The Exchange/Market screen also falls through the generic screen renderer, so even accepted Market actions will not yet have source-owned renderer readback.

## Next safe ledge

```txt
ZombieOrchard Market Nested Result Consumer Central Catch-up + Exchange Projection Fixture Gate
```

## Implementation boundary

Do not begin with a visual pass, save/load, worker AI, new pests, more orchard art, or a full runtime rewrite.

Start with the smallest vertical Market proof path:

```txt
Market action catalog
  -> command source manifest
  -> command envelope
  -> source snapshot before
  -> preflight
  -> command result
  -> accepted mutation or rejected no-mutation
  -> transaction / journal rows
  -> source snapshot after
  -> interface nested-result adapter
  -> interface-composition.snapshot().lastResult
  -> exchange projection
  -> renderer readback
  -> GameHost diagnostics
  -> DOM-free fixture
```

## Required validation after implementation

```txt
node scripts/zombie-orchard-market-result-fixture.mjs
npm test
npm run build
```

No runtime source files changed in this documentation pass.
