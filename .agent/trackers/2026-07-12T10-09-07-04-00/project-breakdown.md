# ZombieOrchard project breakdown

**Timestamp:** `2026-07-12T10-09-07-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Scope:** documentation and central-ledger reconciliation only

## Summary

`ZombieOrchard` is a dependency-free browser orchard survival shell composed from a mutable kit runtime, 12 interface-domain definitions, gameplay services, canvas and HTML projection, a public `GameHost`, Node smoke proof, static build copy and GitHub Pages deployment.

This run selected `ZombieOrchard` because its repo-local kit-graph audit at `2026-07-12T10-00-00-04-00` was newer than the central ledger entry at `2026-07-12T07-51-04-04-00`. Source review confirms the kit-graph authority gap and corrects the machine census from 21 to **19 engine-installed kits**.

## Plan ledger

**Goal:** synchronize the newest repo-local audit centrally while preserving a source-backed inventory of the interaction loop, domains, kits, services and missing kit-graph authority.

- [x] Compare the complete ten-repository `LuminaryLabs-Publish` inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Verify all nine eligible repositories have central-ledger entries.
- [x] Verify all nine eligible repositories have root `.agent/START_HERE.md` state.
- [x] Identify `ZombieOrchard` as repo-local-newer-than-central and select only it.
- [x] Read `index.html`, `src/start.js`, `src/game.js`, `src/kits/runtime.js`, `src/kits/scoped-interface-domains.js`, `src/kits/composition.js` and `src/kits/game-domains.js`.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 27 implemented kits and their offered services.
- [x] Correct the engine-installed kit count from 21 to 19.
- [x] Reconfirm duplicate-domain replacement, implicit dependencies and insertion-order ticking.
- [x] Add a new timestamped tracker, turn ledger and audit family.
- [x] Refresh the root start page and machine registry.
- [x] Synchronize the central repository ledger and add an internal change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable kit-graph fixtures remain future work.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 1

ZombieOrchard      central 2026-07-12T07-51-04-04-00; local 2026-07-12T10-00-00-04-00 selected
MyCozyIsland       2026-07-12T08-00-16-04-00
TheUnmappedHouse   2026-07-12T08-10-36-04-00
AetherVale         2026-07-12T08-31-49-04-00
PrehistoricRush    2026-07-12T09-01-44-04-00
TheOpenAbove       2026-07-12T09-02-10-04-00
IntoTheMeadow      2026-07-12T09-21-40-04-00
PhantomCommand     2026-07-12T09-28-05-04-00
HorrorCorridor     2026-07-12T09-48-15-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was modified in the Publish organization.

## Interaction loop

```txt
browser module evaluation
  -> import src/start.js
  -> createOrchardGame()
  -> create six gameplay kit descriptors
  -> create 12 interface descriptors and remove the generic active-session descriptor
  -> add 11 scoped interface kits
  -> add the gameplay-backed active-session kit
  -> add interface-composition last
  -> createKitRuntime({ kits })

initial installation
  -> create one mutable domains object and shared ctx
  -> call engine.addKit() for each of 19 engine-installed kits
  -> call kit.create(ctx) against the live graph
  -> require only a returned domain.id
  -> assign domains[domain.id] = domain
  -> continue without manifest, dependency, version or duplicate checks

host startup
  -> create canvas and HTML renderers
  -> expose the raw engine through window.GameHost
  -> start recursive requestAnimationFrame

frame
  -> engine.tick(1 / 60)
  -> clamp the submitted delta
  -> increment frame and elapsed time
  -> clear events
  -> iterate Object.values(domains) in object insertion order
  -> tick each domain
  -> notify subscribers and snapshot every domain
  -> render canvas and HTML

post-start mutation
  -> browser code calls GameHost.engine.addKit(candidate)
  -> candidate creates against the live ctx
  -> a matching domain ID replaces the predecessor immediately
  -> no dependency check, migration, rollback, disposal, graph revision or visible-frame receipt occurs
```

## Domains in use

```txt
browser document, canvas, DOM and full-window shell
module boot, recursive RAF and public GameHost
kit identity, manifests, versions and compatibility gap
provided and required service contracts gap
dependency resolution and deterministic phase ordering gap
candidate graph construction, validation, commit, rollback and disposal gap
graph identity, revision, fingerprint, observation and frame-correlation gap
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
11 scoped interface domains plus gameplay-backed active-session
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard trees, apples and collection refill
construction, roster and inventory
active-session movement, phases, pests, damage, score and failure
canvas world rendering and HTML interface projection
Node smoke, static build, Pages deployment and audit tracking
```

## Implemented kit census

```txt
implemented kit surfaces: 27
engine-installed kits: 19
host/tooling/support kits: 8
```

### Engine-installed kits

```txt
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
active-session-domain-kit
interface-composition-kit
```

### Host, factory, proof and deployment kits

```txt
kit-runtime
scoped-interface-domain-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

## Offered services

| Kit group | Offered services |
|---|---|
| runtime | kit registration, live domain creation, command dispatch, delta clamping, ticks, events, snapshots, subscriptions and synchronous publication |
| scoped interface | screen state, field mutation, selection, actions and activation results |
| composition | route transitions, nested action dispatch and automatic Outcome routing |
| resource and pressure | balance checks, payment, additions and pressure-channel adjustment |
| orchard | deterministic tree layout, nondeterministic apple seeding, nearby collection and refill |
| construction | catalog projection, resource payment and built-object records |
| roster | actor and role projection, resource-backed hiring and messages |
| inventory | item projection and equipment selection |
| active session | movement, apple collection, pest clearing, phase changes, pest spawning, pursuit, damage, scoring and terminal state |
| rendering | canvas world drawing, HTML route/HUD projection and delegated actions |
| diagnostics/proof/deploy | raw engine publication, snapshot readback, manual tick, Node smoke, static copy and Pages deployment |

## Main findings

### 1. Installation validates only the returned domain ID

`engine.addKit()` calls `kit.create(ctx)`, checks only `domain.id`, then writes directly into the live map.

### 2. Duplicate domain IDs replace live owners

`domains[domain.id] = domain` overwrites a predecessor without a typed replacement result, migration, disposal or graph revision.

### 3. Tick order is inherited from object insertion order

`tick()` uses `Object.values(domains)`. The current graph relies on `interface-composition` being installed after `active-session` so Outcome routing sees terminal state in the same tick.

### 4. Dependencies are implicit

Construction, roster and active-session resolve collaborators from `ctx.domains[...]?.api`. Missing providers are converted into gameplay-like failures instead of graph-admission errors.

### 5. Initial construction is not atomic

If a later `kit.create()` throws, already-created domains remain without a reverse cleanup stack or acquisition ledger.

### 6. The raw public host can mutate the graph

`window.GameHost.engine` exposes `addKit()` after startup with no capability gate or graph lock.

### 7. The prior machine census was incorrect

Source composition installs six gameplay kits, 11 generic interface kits, one gameplay-backed active-session kit and one composition kit: **19**, not 21.

## Required parent domain

```txt
zombie-orchard-kit-graph-installation-authority-domain
```

Required composition:

```txt
kit-manifest-schema-kit
kit-id-kit
kit-version-kit
kit-compatibility-range-kit
domain-id-ownership-kit
provided-service-contract-kit
required-service-contract-kit
service-version-kit
kit-dependency-graph-kit
kit-cycle-detection-kit
kit-phase-descriptor-kit
deterministic-kit-order-kit
kit-graph-predecessor-kit
kit-graph-candidate-kit
isolated-kit-context-kit
kit-create-result-kit
kit-graph-validation-kit
duplicate-kit-rejection-kit
duplicate-domain-rejection-kit
missing-service-rejection-kit
incompatible-service-rejection-kit
kit-graph-commit-kit
kit-graph-rollback-kit
kit-predecessor-retirement-kit
kit-disposal-result-kit
kit-graph-id-kit
kit-graph-revision-kit
kit-graph-fingerprint-kit
kit-installation-receipt-kit
kit-graph-observation-kit
kit-graph-journal-kit
first-kit-graph-frame-ack-kit
```

## Required transaction

```txt
KitGraphInstallCommand
  -> validate runtime session and expected graph predecessor
  -> normalize and freeze manifests
  -> validate unique kit and domain ownership
  -> resolve required services to compatible providers
  -> reject missing, cyclic, duplicate or incompatible graphs
  -> calculate deterministic lifecycle and tick phases
  -> create domains in an isolated candidate context
  -> collect acquisition and disposal leases
  -> validate candidate APIs, snapshots and service bindings
  -> atomically commit one graph revision
  -> migrate or retire explicit predecessors
  -> rollback all candidate acquisitions on failure
  -> publish graph fingerprint and installation receipts
  -> acknowledge the first canvas and HTML frame citing the committed graph revision
```

## New audit output

```txt
.agent/trackers/2026-07-12T10-09-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T10-09-07-04-00.md
.agent/architecture-audit/2026-07-12T10-09-07-04-00-kit-graph-census-central-sync-dsk-map.md
.agent/render-audit/2026-07-12T10-09-07-04-00-graph-revision-canvas-html-proof-gap.md
.agent/gameplay-audit/2026-07-12T10-09-07-04-00-install-order-service-failure-loop.md
.agent/interaction-audit/2026-07-12T10-09-07-04-00-add-kit-command-replacement-result-map.md
.agent/kit-graph-audit/2026-07-12T10-09-07-04-00-engine-installed-census-contract.md
.agent/central-sync-audit/2026-07-12T10-09-07-04-00-local-central-ledger-reconciliation.md
.agent/deploy-audit/2026-07-12T10-09-07-04-00-kit-graph-browser-pages-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
gameplay changed: no
rendering changed: no
dependencies changed: no
package scripts changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
kit-graph fixtures: unavailable
browser and Pages graph smoke: not run
```

No deterministic composition, dependency safety, duplicate-owner protection, atomic replacement, resource cleanup or visible graph-frame claim is made.