# Current audit — ZombieOrchard

## Status

Docs refreshed for `2026-07-10T17-18-47-04-00`.

## Selection audit

```txt
The complete accessible LuminaryLabs-Publish inventory contains ten repositories.
All nine eligible non-Cavalry repositories are centrally tracked and have root .agent state.
LuminaryLabs-Publish/TheCavalryOfRome remained excluded by rule.
Recent repo-local HorrorCorridor and PhantomCommand audits were treated as fresh activity.
ZombieOrchard was selected as the oldest eligible documented fallback.
Only ZombieOrchard was changed in the Publish organization during this pass.
```

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> createKitRuntime(...kits)
  -> world canvas + HTML interface renderer
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> domain ticks
  -> aggregate snapshot
  -> world and interface render

DOM data-action
  -> interface-composition.activate
  -> active interface domain.activate
  -> action descriptor
  -> optional child engine.command
  -> child result discarded
  -> optional transition or generic accepted result

DOM data-command
  -> active-session command
  -> direct synchronous mutation
  -> aggregate snapshot/render on the next draw
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
subscription-notifier
browser-animation-loop
gamehost-diagnostics
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
world-canvas-renderer
html-interface-renderer
smoke-fixture
static-build-copy
pages-deploy
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

- `kit-runtime`: kit registration, domain creation, command routing, delta clamping, tick routing, ephemeral event emission, aggregate snapshots, and subscriber notification.
- Scoped interface kits: screen state, action catalogs, selection, field mutation, action activation, and screen snapshots.
- `interface-composition-kit`: active/previous screen ownership, transition, back navigation, parent activation, child command dispatch, and outcome routing.
- Runtime gameplay kits: resource affordability/payment/addition, pressure adjustment, orchard generation, apple replenishment and collection, construction, roster hiring, inventory equipment, movement, clearing, phase progression, pest simulation, score, and failure.
- Render kits: orchard canvas projection, active-session HUD, generic screen projection, and DOM action/command binding.
- Diagnostics/proof/deploy kits: raw engine/snapshot/tick access, entry/play/apple smoke, static build copy, and Pages deployment.

## Verified deterministic and observation gaps

1. `orchard-world-kit` uses global `Math.random()` for apple source selection, position, kind, and IDs.
2. `active-session-domain-kit` uses global `Math.random()` for pest spawn decisions, angles, and IDs.
3. The same command and tick script cannot guarantee the same initial, per-frame, or final snapshot.
4. Runtime commands have no stable sequence ID or durable request/result journal.
5. Parent interface activation does not retain child command results.
6. Runtime events are cleared at tick start and excluded from snapshots.
7. Aggregate snapshots have no scenario, seed, preset revision, command range, event range, or canonical fingerprint.
8. Renderers record no consumed frame or state/projection fingerprint.
9. `GameHost` exposes mutable engine authority and raw snapshots rather than bounded immutable scenario observations.
10. Smoke coverage proves reachability only and cannot detect replay drift.
11. The Pages workflow gates deploy on `npm test`, but the test suite has no deterministic scenario fixture.
12. Market transaction causality remains missing, but stable whole-state proof depends on deterministic scenario authority first.

## Current finding

The architecture is already split into usable runtime, interface, gameplay, rendering, proof, and deployment owners. The missing boundary is a cross-domain deterministic scenario contract joining seed ownership, named random draws, command results, durable events, committed frames, renderer consumption, GameHost readback, and replay fingerprints.

## What not to do next

Do not start with a runtime rewrite, renderer replacement, economy expansion, new Market content, new pest types, visual polish, or unrelated orchard growth. Update existing domain owners first and add only the shared deterministic/random/fixture capabilities that have no current owner.