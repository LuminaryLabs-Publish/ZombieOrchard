# Project breakdown — ZombieOrchard

Timestamp: `2026-07-11T01-31-15-04-00`

Repository: `LuminaryLabs-Publish/ZombieOrchard`

Branch: `main`

## Plan ledger

**Goal:** Reconcile the current browser command path, identify every domain, kit, and service, and define an atomic command transaction boundary so one user intent produces one truthful result and one committed publication.

- [x] Compared the complete accessible `LuminaryLabs-Publish` repository inventory.
- [x] Compared all eligible repositories against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Confirmed all nine eligible repositories are tracked and have root `.agent` state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected only `LuminaryLabs-Publish/ZombieOrchard` through the oldest documented-selection fallback.
- [x] Read the browser boot, game factory, kit runtime, interface composition, scoped interface domains, gameplay domains, renderers, preset, package scripts, and smoke test.
- [x] Identified the interaction loop.
- [x] Identified all active domains.
- [x] Identified all implemented kits and offered services.
- [x] Traced parent activation, child command dispatch, resource payment, route mutation, notifications, snapshots, and render projection.
- [x] Added timestamped architecture, render, gameplay, interaction, command-transaction, deploy, and turn-ledger documentation.
- [x] Changed no runtime source, dependency, package script, workflow, or route.
- [x] Created no branch and no pull request.

## Selection comparison

All ten accessible Publish repositories were present in the central ledger. `TheCavalryOfRome` was excluded. Current ledger timestamps at selection were:

```txt
ZombieOrchard        selected / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
IntoTheMeadow        tracked  / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
HorrorCorridor       tracked  / 2026-07-11T01-10-28-04-00
PhantomCommand       tracked  / 2026-07-11T01-20-51-04-00
TheCavalryOfRome     excluded by rule
```

## Product interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame(orchardPreset)
  -> createKitRuntime(...kits)
  -> construct gameplay and interface domains
  -> attach delegated click listener
  -> start uncancelled requestAnimationFrame loop
  -> engine.tick(1 / 60)
  -> tick all domains
  -> aggregate snapshot
  -> render canvas
  -> replace interface HTML
  -> request next frame

DOM data-action click
  -> engine.command(interface-composition, activate)
  -> interface-composition calls active screen activate directly
  -> scoped screen resolves selected action
  -> optional ctx.engine.command(child domain, child command)
  -> child engine.command mutates and notifies subscribers immediately
  -> child result is discarded by interface-composition
  -> optional route transition occurs
  -> parent engine.command notifies subscribers again
  -> caller receives only parent result

DOM data-command click
  -> engine.command(active-session, collect | clear | next-phase)
  -> synchronous mutation
  -> one outer notification
  -> next RAF projects resulting snapshot
```

## Domains in use

```txt
static browser document and module entry
browser runtime host and RAF ownership
game factory and preset composition
kit registration and domain construction
command routing and nested dispatch
ephemeral event emission
tick routing and aggregate snapshots
subscriber notification
12 scoped interface screen domains
interface composition and route state
resource ledger
pressure field
orchard world and apple lifecycle
construction runtime
roster runtime
inventory runtime
active-session movement, collection, combat, phase, score and failure
ambient global randomness
world canvas projection
HTML interface and delegated DOM routing
GameHost diagnostic access
Node smoke fixture
static build copy
GitHub Pages deployment
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

## Kit services

### `kit-runtime`

```txt
kit registration
domain creation
command lookup
command invocation
delta clamping
tick routing
ephemeral event creation
snapshot aggregation
subscriber registration
subscriber notification
```

### Scoped interface kits

```txt
screen state
action catalogs
selection
field mutation
action activation
disabled-action rejection
screen snapshots
```

### `interface-composition-kit`

```txt
active screen state
previous screen state
transition
back navigation
parent action activation
child command dispatch
automatic Outcome projection
```

### Gameplay service kits

```txt
resource affordability, payment and addition
bounded pressure adjustment and passive growth
fixed tree generation
apple generation, replenishment and proximity collection
construction catalog lookup, payment and object creation
roster payment and actor creation
inventory equipment assignment
player movement
apple collection
pest clearing
phase transitions
pest spawn admission and placement
pest pursuit and damage
score and failure
```

### Render, diagnostics, proof and deploy kits

```txt
2D orchard projection
HUD projection
generic screen projection
delegated action and command routing
raw engine exposure
aggregate snapshot readback
manual tick exposure
entry-to-play smoke
apple-presence smoke
static dist copy
Pages test-build-deploy chain
```

## Main finding

The runtime has no atomic parent/child command transaction.

`interface-composition.activate` can invoke a child through `ctx.engine.command()`. That child command mutates state and publishes a subscriber notification before the parent command has resolved its optional route change. The child result is then discarded. The outer `engine.command()` publishes again after the parent returns.

For the current construction action this means:

```txt
click Storage Shed
  -> parent activation accepted
  -> child build may reject for missing resources
  -> child rejection is discarded
  -> parent returns accepted: true
  -> subscribers can observe an intermediate child publication
  -> UI receives no typed build result
```

The contract also permits an action to contain both `command` and `to`. A successful child mutation could therefore publish before a later route failure, with no rollback or composite result.

Related service gaps amplify the problem:

```txt
resource payment returns boolean only
unknown construction IDs fall back to the first catalog item
inventory equip accepts arbitrary IDs
commands have no sequence or transaction ID
results have no parent/child correlation
notifications have no commit barrier
events are cleared on the next tick
GameHost exposes no bounded command journal
render snapshots carry no command commit identity
```

## Missing authority

```txt
command envelope and sequence
parent/child transaction identity
preflight and admission result
single composite result
atomic state commit boundary
single subscriber publication barrier
rollback or no-commit result
resource debit attribution
bounded command journal
render-command correlation
DOM-free command transaction fixture
```

## Candidate DSK boundaries

```txt
command-envelope-kit
command-sequence-kit
composite-command-transaction-kit
child-command-result-kit
command-result-envelope-kit
command-publication-barrier-kit
command-rollback-kit
resource-transaction-result-kit
command-journal-kit
render-command-correlation-kit
command-transaction-fixture-kit
```

Prefer updating existing owners first:

```txt
kit-runtime
  -> allocate command sequence and transaction context
  -> stage nested commands
  -> publish once after commit
  -> record one detached composite result

interface-composition-kit
  -> preserve child result
  -> block route transition when required child fails
  -> return parent, child and route facts together

resource-ledger-kit
  -> typed debit/add result with before/after values and attribution

construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
  -> strict ID validation and typed mutation results

render kits and GameHost
  -> expose last committed command ID and bounded journal rows

tests/smoke.mjs
  -> add accepted, rejected, nested, route, publication-count and rollback fixtures
```

## Ordered safe ledges

```txt
1. ZombieOrchard Runtime Session Instance Authority
   + Start/Reset/Title/Outcome Fidelity Fixture Gate

2. ZombieOrchard Fixed-Step Clock Authority
   + Pause/30-60-120 Hz Parity Fixture Gate

3. ZombieOrchard Interaction Capability Reachability
   + Movement/Service-Binding Fixture Gate

4. ZombieOrchard Composite Command Transaction Authority
   + Parent/Child Result and Single-Publication Fixture Gate

5. ZombieOrchard Seeded Random and Replay Authority
   + Apple/Pest Determinism Fixture Gate
```

Command transaction authority moves ahead of replay because deterministic replay needs stable command IDs, truthful results, and one committed publication per admitted intent.

## Validation state

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy configuration changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
command transaction fixture: unavailable
```
