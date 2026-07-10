# Current audit — ZombieOrchard

## Status

Docs refreshed for `2026-07-10T15-48-18-04-00`.

## Selection audit

```txt
The complete accessible LuminaryLabs-Publish inventory contains ten repositories.
All nine eligible non-Cavalry repositories are centrally tracked and have root .agent state.
LuminaryLabs-Publish/TheCavalryOfRome remained excluded by rule.
ZombieOrchard was selected as the oldest eligible fallback.
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
  -> aggregate snapshot/render
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
world-canvas-renderer
html-interface-renderer
smoke-fixture
static-build-copy
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
```

## Services offered by kits

- `kit-runtime`: kit registration, domain creation, command routing, bounded tick routing, event emission, aggregate snapshots, and subscriptions.
- Scoped interface kits: action catalog, selection, fields, metadata, activation, and interface snapshots.
- `interface-composition-kit`: active/previous screen state, transition, back, parent activation, and child command dispatch.
- Runtime game kits: resource affordability/payment/addition, pressure adjustment, orchard/apple collection, construction, roster hiring, inventory equipment, movement, collection, clearing, phase change, pest simulation, score, and failure.
- Render kits: orchard canvas projection, active-session HUD, generic screens, and DOM bindings.
- Diagnostics/proof kits: raw engine/snapshot/tick access, entry/play/apple smoke, and static build copy.

## Verified gaps

1. Runtime commands have no sequence ID or durable request/result journal.
2. Parent interface activation does not retain child command results.
3. Emitted events are cleared on tick and are absent from snapshots.
4. Resource payment returns a boolean without transaction attribution.
5. Inventory has no purchase-intake or capacity service.
6. Exchange is Back-only and has no Market source or command surface.
7. HTML rendering has no Exchange result or consumption readback.
8. GameHost is raw/mutable rather than a bounded JSON-safe proof surface.
9. Smoke coverage does not prove accepted/rejected transaction behavior.

## Current finding

The architecture is already split into usable runtime, interface, gameplay, rendering, and proof owners. The missing boundary is a stable command-causality chain joining parent activation, child Market result, resource transaction, inventory intake, projection, render consumption, and readback.

## What not to do next

Do not start with a runtime rewrite, renderer replacement, economy expansion, new Market art, broader Market content, or unrelated orchard visual work.