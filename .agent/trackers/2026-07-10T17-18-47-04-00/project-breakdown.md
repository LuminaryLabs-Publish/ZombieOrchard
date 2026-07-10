# Project breakdown — deterministic scenario observation

Timestamp: `2026-07-10T17-18-47-04-00`

Repository: `LuminaryLabs-Publish/ZombieOrchard`

Branch: `main`

## Plan ledger

**Goal:** Reconcile the complete Publish inventory, select one eligible repository, then document the runtime, interaction, rendering, kit, and proof boundaries needed to make ZombieOrchard scenarios reproducible and observable without changing runtime behavior.

- [x] Compare the ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories against `LuminaryLabs-Dev/LuminaryLabs` ledger state.
- [x] Confirm eligible repositories have root `.agent` state.
- [x] Select only one repository.
- [x] Read the current root `.agent` routing documents.
- [x] Read the boot, game factory, runtime, interface, gameplay, render, fixture, package, and deploy surfaces.
- [x] Trace the interaction loop.
- [x] Identify domains in use.
- [x] Identify implemented kits.
- [x] Identify services offered by each kit family.
- [x] Trace all nondeterministic inputs and proof-loss boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, determinism, host-proof, and deploy audits.
- [x] Refresh the required root `.agent` documents.
- [x] Change no runtime, dependency, package, renderer, test, or deploy implementation.
- [x] Create no branch and no pull request.
- [x] Push documentation directly to `main`.

## Selection result

The accessible organization inventory contained ten repositories:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

All nine eligible non-Cavalry repositories were centrally tracked and had root `.agent` state. Recent repo-local activity made `HorrorCorridor` and `PhantomCommand` newer than their central ledger rows. `ZombieOrchard`, last aligned at `2026-07-10T15-48-18-04-00`, was the oldest eligible fallback.

Only `LuminaryLabs-Publish/ZombieOrchard` was changed.

## Product and interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> createKitRuntime([...kits])
  -> createWorldCanvas(...)
  -> createHtmlInterfaceRenderer(...)
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> tick every domain
  -> aggregate every domain snapshot
  -> render world canvas
  -> replace HTML interface projection

[data-action] click
  -> interface-composition.activate
  -> active scoped interface domain.activate
  -> action descriptor
  -> optional child engine.command
  -> child result discarded
  -> optional transition or generic accepted result

[data-command] click
  -> active-session command
  -> synchronous state mutation
  -> next frame snapshot and render
```

## Domains in use

### Host and lifecycle

```txt
static-browser-host
boot-module
runtime-entrypoint
game-factory
browser-animation-loop
gamehost-diagnostics
static-build-copy
pages-deploy
```

### Runtime

```txt
kit-runtime
engine-context
domain-registry
command-router
tick-dispatcher
event-emitter
snapshot-aggregator
subscription-notifier
```

### Interface

```txt
interface-screen-state
interface-composition
data-action-routing
data-command-routing
entry-domain
session-select-domain
run-setup-domain
active-session-domain
interrupt-domain
construction-domain
exchange-domain
roster-domain
inventory-domain
knowledge-domain
preferences-domain
outcome-domain
```

### Gameplay

```txt
resource-ledger
pressure-field
orchard-world
construction-runtime
roster-runtime
inventory-runtime
player-state
apple-collection
pest-simulation
phase-progression
score-and-failure
```

### Presentation and proof

```txt
world-canvas-renderer
html-interface-renderer
smoke-fixture
central-ledger-sync
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

- `kit-runtime`: kit installation, domain registration, command routing, delta clamping, tick dispatch, ephemeral event emission, aggregate snapshots, and subscriber notification.
- Scoped interface kits: screen state, action catalogs, selection, field mutation, action lookup, activation, and screen snapshots.
- `interface-composition-kit`: active/previous screen ownership, transition, back navigation, parent activation, child command dispatch, and outcome routing.
- `resource-ledger-kit`: affordability, boolean payment, addition, and aggregate resource snapshot.
- `pressure-field-kit`: bounded channel adjustment and passive pressure ticking.
- `orchard-world-kit`: tree generation, apple seeding/replenishment, proximity collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, resource payment, built-object creation, and status messages.
- `roster-runtime-kit`: actor/role state, hiring payment, actor creation, and status messages.
- `inventory-runtime-kit`: item/equipment state and equip command.
- `active-session-domain-kit`: movement, collection, pest clearing, phase changes, random pest spawning, pursuit, damage, score, and failure.
- Render kits: full-canvas orchard projection, active-session HUD, generic screen projection, DOM action/command binding, and per-frame HTML replacement.
- Diagnostics/proof kits: raw engine exposure, aggregate snapshot readback, manual ticking, entry-to-play smoke, static build copy, and Pages deployment.

## Evidence-backed findings

1. `orchard-world-kit` uses `Math.random()` for apple source selection, position, kind, and IDs during startup and replenishment.
2. `active-session-domain-kit` uses `Math.random()` for pest spawn angle, pest IDs, and probabilistic spawn decisions during ticks.
3. The same command and tick sequence therefore cannot reproduce the same snapshot or state fingerprint.
4. Runtime events are cleared at the start of each tick and are excluded from aggregate snapshots.
5. Commands return results but have no command sequence, durable request/result row, or committed-frame association.
6. `interface-composition.activate` discards nested child command results.
7. `GameHost` exposes the mutable engine and unbounded raw snapshots rather than immutable scenario observations.
8. The HTML renderer replaces its entire projection every frame and records no consumed frame, source, command, or result identity.
9. The smoke test proves entry-to-play reachability and apple presence only; it cannot detect random-source drift, result loss, or replay divergence.
10. The Pages workflow correctly runs `npm test` before `npm run build`, but the current test surface does not gate deterministic scenario proof.

## Main finding

The next blocker is broader than Market projection. The repository lacks a deterministic scenario authority that can reproduce and explain one run from seed, command sequence, and tick sequence through committed snapshot, renderer consumption, and GameHost readback.

A Market transaction fixture built before this boundary would be able to assert local mutations, but not stable whole-state parity or replay fidelity because orchard and pest state remain uncontrolled.

## Next safe ledge

```txt
ZombieOrchard Deterministic Scenario Authority
+ Command/Frame Observation Fixture Gate
```

Required proof chain:

```txt
ScenarioConfig(seed, fixedDelta, initialState)
  -> RandomSource
  -> CommandRequest(commandId, frame)
  -> CommandResult
  -> Domain mutations and durable events
  -> CommittedFrameSnapshot
  -> WorldRenderConsumption
  -> InterfaceRenderConsumption
  -> GameHostScenarioObservation
  -> ReplayFingerprint
```

Update existing owners first:

```txt
kit-runtime
orchard-world-kit
active-session-domain-kit
interface-composition-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
```

Create a new kit only for capability outside those boundaries, such as a reusable deterministic random source or scenario fixture adapter.

## Validation boundary

This was a documentation-only audit. Runtime validation was not executed because no runtime or test implementation changed. The next implementation must add a DOM-free deterministic scenario fixture before `npm test`, build, browser, or deployment readiness can be claimed.