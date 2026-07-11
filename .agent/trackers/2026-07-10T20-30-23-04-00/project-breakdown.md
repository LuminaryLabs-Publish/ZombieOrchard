# Project breakdown — ZombieOrchard

Timestamp: `2026-07-10T20-30-23-04-00`

## Plan ledger

**Goal:** Reconcile the current runtime, interface routes, implemented kits, offered services, and actual browser bindings; preserve lifecycle authority as the first implementation gate; define the next bounded capability-reachability gate.

```txt
[x] Compare the complete accessible LuminaryLabs-Publish inventory.
[x] Compare central ledger and root .agent timestamps.
[x] Exclude TheCavalryOfRome.
[x] Select one repository only.
[x] Read runtime, kits, preset, renderers, smoke, build, and deploy surfaces.
[x] Identify the interaction loop.
[x] Identify all domains in use.
[x] Identify all implemented kits.
[x] Identify every service offered by each kit.
[x] Trace implemented commands to routes and renderer bindings.
[x] Classify reachable, indirect, unbound, dormant, and unsupported capabilities.
[x] Define lifecycle-first and capability-reachability-second implementation gates.
[x] Update repo-local .agent state.
[x] Synchronize the central repo ledger and internal change log.
```

## Selection

The accessible organization inventory contains ten repositories. Nine are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. Every eligible repository has a central ledger entry and root `.agent` state.

```txt
ZombieOrchard        selected / prior root alignment 2026-07-10T18-49-54-04-00
TheUnmappedHouse     tracked  / 2026-07-10T19-00-19-04-00
MyCozyIsland         tracked  / 2026-07-10T19-11-19-04-00
PrehistoricRush      tracked  / 2026-07-10T19-30-36-04-00
AetherVale           tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow        tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove         tracked  / 2026-07-10T19-58-34-04-00
HorrorCorridor       tracked  / 2026-07-10T20-08-46-04-00
PhantomCommand       tracked  / 2026-07-10T20-19-35-04-00
TheCavalryOfRome     excluded
```

`ZombieOrchard` is the oldest eligible documented fallback and the only product repository changed in this run.

## Product summary

`ZombieOrchard` is a dependency-free static browser orchard survival/economy shell. It uses a small kit runtime, scoped interface domains, gameplay domains, a Canvas 2D world renderer, an HTML interface renderer, a raw diagnostic host, a Node smoke test, and a Pages deployment workflow.

## Runtime path

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createKitRuntime()
  -> instantiate gameplay and interface domains
  -> create world canvas renderer
  -> create HTML interface renderer
  -> attach delegated click listener
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> tick every domain
  -> notify subscribers
  -> return aggregate snapshot
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> next RAF
```

## Human interaction loop

```txt
Entry
  -> Play -> Active Session
  -> New Game -> Run Setup -> Active Session
  -> Settings -> Preferences -> Entry

Active Session
  -> Collect
  -> Clear
  -> Next Phase
  -> Pause -> Resume or Title
  -> Build -> Storage Shed or Back
  -> Market -> Back
  -> Roster -> Back
  -> Inventory -> Back
  -> Codex -> Back

Session failure
  -> automatic Outcome route
  -> Title action
  -> automatic re-entry to Outcome on next tick because ended session persists
```

## Command routing loop

```txt
[data-action]
  -> engine.command(interface-composition, activate)
  -> active screen domain.activate
  -> action descriptor
  -> optional nested child command
  -> nested result discarded
  -> optional screen transition
  -> aggregate notification

[data-command]
  -> engine.command(active-session, commandName)
  -> direct mutation
  -> aggregate notification
  -> next RAF render
```

## Domains in use

### Host and runtime

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
kit-runtime
engine-context
domain-registry
command-router
ephemeral-event-emitter
tick-dispatcher
snapshot-aggregator
subscription-notifier
browser-animation-loop
gamehost-diagnostics
```

### Interface

```txt
interface-screen-state
interface-composition
data-action-routing
data-command-routing
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

### Gameplay and economy

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
player-state
player-movement
apple-collection
pest-spawn
pest-pursuit
pest-clearing
phase-progression
damage
score
failure
```

### Rendering, proof, and deployment

```txt
world-canvas-renderer
html-interface-renderer
smoke-fixture
static-build-copy
pages-deploy
central-ledger-sync
```

### Missing authority domains

```txt
runtime-session-authority
simulation-clock-authority
capability-registry
interaction-binding-authority
command-result-journal
render-consumption-proof
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
pages-deploy-kit
```

## Services offered by kits

### `kit-runtime`

- kit registration and domain construction
- command routing
- delta normalization and clamping
- tick dispatch
- ephemeral event emission
- aggregate snapshot construction
- subscriber notification

### Scoped interface domain kits

- title, description, selected index, fields, and metadata state
- action descriptor catalog
- action selection
- arbitrary field mutation
- action activation
- screen snapshot

### `interface-composition-kit`

- active and previous screen ownership
- explicit transition and back commands
- active-screen action activation
- nested child command dispatch
- automatic Outcome routing when the active session ends

### `resource-ledger-kit`

- affordability check
- boolean payment
- resource addition
- aggregate values snapshot

### `pressure-field-kit`

- bounded channel adjustment
- passive row-pressure growth
- passive curse growth
- channel snapshot

### `orchard-world-kit`

- 7 x 9 tree grid generation
- random apple seeding to 26 active apples
- random apple replenishment after collection
- nearest-apple collection within a radius
- world snapshot

### `construction-runtime-kit`

- build catalog lookup
- resource payment
- built-object creation
- status message
- construction snapshot

### `roster-runtime-kit`

- actor and role state
- worker hiring payment
- actor creation
- status message
- roster snapshot

### `inventory-runtime-kit`

- inventory item state
- equipped item state
- equipment assignment
- inventory snapshot

### `active-session-domain-kit`

- interface action descriptors
- movement
- apple collection
- pest clearing
- day/night phase change
- random pest spawning
- pest pursuit
- player damage
- score
- failure
- session snapshot

### Render kits

- Canvas 2D projection of trees, apples, pests, and player
- canvas resize each frame
- active-session HUD and quick controls
- generic screen panels and cards
- delegated click routing
- full HTML replacement each render

### Diagnostics, proof, and deployment

- raw engine handle
- aggregate state readback
- unrestricted manual tick hook
- Entry -> Play smoke
- apple-presence smoke
- static `dist` copy
- Pages test/build/deploy chain on `main`

## Capability reachability

### Reachable directly through the browser

```txt
Entry: Play, New Game, Settings
Run Setup: Start, Back
Active Session: Collect, Clear, Next Phase, Pause, Build, Market, Roster, Inventory, Codex
Pause: Resume, Title
Construction: Build Storage Shed, Back
Other visible screens: Back
```

### Reachable indirectly

```txt
resource-ledger.add       through apple collection and pest clearing
resource-ledger.pay       through construction
pressure-field.adjust     through collection and passive ticking
orchard-world.collectNear through active-session.collect
```

### Implemented but not browser-bound

```txt
active-session.move
roster-runtime.hire
inventory-runtime.equip
scoped-interface.select
scoped-interface.set-field
interface-composition.transition
interface-composition.back
```

### Dormant or shell-only

```txt
session-select            no incoming route
run-setup fields          no descriptors or controls
preferences fields        no descriptors or controls
knowledge content         no source or cards
exchange                  Back-only shell
```

### Unsupported

```txt
market source
market transaction
purchase intake
save slot load/create/delete
```

## Main findings

1. The lifecycle and clock authority gap remains the first blocker.
2. The human interaction surface exposes only a subset of implemented services.
3. `active-session.move` has no browser input binding.
4. The player starts at `{ x: 0, y: 180 }`, while collection requires an apple within radius `42`.
5. Random apple placement does not guarantee that initial condition.
6. The core collection loop can therefore begin without a recoverable player action.
7. Roster hiring and inventory equipment are implemented but unreachable.
8. Session Select is instantiated but unrouted.
9. Market is represented as a screen despite having no market service.
10. Disabled action metadata is not reflected in rendered controls.
11. No canonical capability catalog distinguishes public, indirect, internal, dormant, and unsupported services.
12. The smoke test does not prove any of these interaction paths.

## DSK update map

Update existing owners first:

```txt
src/start.js
  -> browser input lifetime beneath runtime-session ownership

kit-runtime
  -> capability catalog and result-journal access

active-session-domain-kit
  -> movement admission and typed movement result

scoped-interface-domain-kit
  -> stable capability descriptors

interface-composition-kit
  -> route capability descriptors and nested-result retention

orchard-preset
  -> explicit route/affordance declarations

html-interface-render-kit
  -> movement controls, disabled state, field controls, service affordances

game-host-diagnostics-kit
  -> capability and result readback

smoke-fixture-kit
  -> reachability fixture gate
```

Add only the missing cross-cutting kits:

```txt
runtime-session-authority-kit
fixed-step-clock-kit
browser-input-adapter-kit
capability-registry-kit
capability-reachability-fixture-kit
```

## Ordered safe ledges

```txt
1. Runtime Session Clock and Lifecycle Authority
   + Pause/Reset/Refresh-Rate Fixture Gate

2. Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate
```

## Validation status

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy workflow changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
lifecycle fixture: unavailable
capability reachability fixture: unavailable
```

This is a documentation-only breakdown. No runtime success is claimed.