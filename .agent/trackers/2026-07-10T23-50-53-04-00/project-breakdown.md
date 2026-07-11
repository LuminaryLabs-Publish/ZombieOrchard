# Project breakdown — ZombieOrchard

**Run:** `2026-07-10T23-50-53-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Scope:** internal documentation only

## Plan ledger

**Goal:** Reconfirm the full ZombieOrchard architecture and add an implementation-ready contract for deterministic apple and pest behavior without changing runtime code.

```txt
[x] enumerate the complete LuminaryLabs-Publish inventory
[x] compare all eligible repositories against the central ledger
[x] exclude TheCavalryOfRome
[x] select only the oldest eligible documented repository
[x] inspect the active browser, runtime, domain, renderer and fixture path
[x] identify the interaction loop
[x] identify all domains
[x] identify all implemented kits and services
[x] trace every random draw
[x] define missing random, replay and provenance authorities
[x] add timestamped architecture, render, gameplay, interaction, randomness and deploy audits
[x] refresh required root .agent state
[x] update the central repository ledger and internal change log
```

## Selection

```txt
ZombieOrchard        selected / 2026-07-10T22-11-24-04-00
TheUnmappedHouse     tracked  / 2026-07-10T22-21-17-04-00
MyCozyIsland         tracked  / 2026-07-10T22-29-21-04-00
AetherVale           tracked  / 2026-07-10T22-50-02-04-00
IntoTheMeadow        tracked  / 2026-07-10T22-58-36-04-00
PrehistoricRush      tracked  / 2026-07-10T23-08-11-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
HorrorCorridor       tracked  / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
TheCavalryOfRome     excluded by rule
```

No repository was new, ledger-missing, root-agent-missing, or otherwise undocumented. `ZombieOrchard` was therefore selected under the oldest documented-selection fallback.

## Interaction loop

```txt
boot
  -> construct one kit runtime
  -> construct orchard-world
  -> globally randomize 26 apples
  -> construct active-session
  -> install renderers and delegated click routing
  -> start recursive RAF
  -> fixed 1/60 tick per callback
  -> pressure mutation
  -> optional globally random night spawn
  -> pest pursuit/damage/outcome mutation
  -> aggregate snapshot
  -> canvas and HTML projection
```

## Domains in use

```txt
host and boot
game factory
kit runtime and context
domain registry
command routing
events, ticks, snapshots and subscriptions
12 interface screen domains
interface composition
resource ledger
pressure field
orchard world
construction runtime
roster runtime
inventory runtime
active session
player movement and collection
pest spawning, pursuit and damage
phase, score and outcome
global random source
canvas rendering
HTML rendering
GameHost diagnostics
smoke fixture
build and Pages deployment
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

## Services offered

- Runtime registration, domain creation, command routing, tick dispatch, events, snapshots and subscriptions.
- Screen state, action catalogs, selection, field mutation, activation and route composition.
- Resource payment/addition, pressure growth, orchard generation, collection, construction, hiring and equipment.
- Movement, phase changes, apple collection, pest clearing, pest simulation, scoring and failure.
- Canvas/HTML projection, delegated click binding, aggregate diagnostics, static build and Pages deployment.

## New finding

Randomness is external to the kit architecture. Apple generation and pest generation both call global `Math.random()` directly, and no seed or stream state is admitted through the preset, factory or runtime context. The current outputs are observable, but the decisions that produced them are not.

```txt
session epoch + declared seed
  -> partitioned world and encounter streams
  -> stable draw indexes
  -> random decision rows
  -> command/tick correlation
  -> committed state fingerprint
  -> render provenance
  -> deterministic replay receipt
```

## Implementation order

```txt
1. runtime session instance authority
2. fixed-step clock authority
3. interaction capability reachability
4. seeded random and replay authority
```

## Validation boundary

No runtime source, package script, dependency or deployment workflow was changed. Node/browser execution was not available; all new fixtures remain planned.
