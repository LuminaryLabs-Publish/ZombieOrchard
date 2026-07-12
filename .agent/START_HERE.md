# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Updated:** `2026-07-12T10-00-00-04-00`

## Summary

`ZombieOrchard` is a dependency-free orchard survival and economy shell built from a mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates kit-graph installation authority. `createOrchardGame()` supplies an ordered array of kits, while `createKitRuntime()` creates each domain imperatively and assigns it into one mutable `domains` object. Installation has no manifest, dependency declaration, service contract, version, duplicate-domain rejection, candidate graph, rollback, graph revision or graph fingerprint. The public `GameHost.engine.addKit()` surface can also replace a live domain by ID after startup without retiring the predecessor or proving a coherent visible frame.

## Plan ledger

**Goal:** make kit installation a validated, atomic and observable graph transaction so every runtime starts from one compatible service graph and cannot silently replace live domain ownership.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Confirm no repo-local audit is newer than its central ledger.
- [x] Select only `ZombieOrchard` as the oldest eligible synchronized repository.
- [x] Trace `createOrchardGame()`, kit installation, domain registration, tick order, interface composition and public host mutation.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits and offered services.
- [x] Confirm duplicate domain IDs overwrite live owners without a typed result.
- [x] Confirm tick order is inherited from mutable object insertion order.
- [x] Confirm dependencies and service versions are undeclared and unvalidated.
- [x] Define graph manifests, candidate construction, dependency resolution, atomic commit, predecessor retirement and graph-frame proof.
- [x] Add timestamped architecture, render, gameplay, interaction, kit-graph and deployment audits.
- [x] Refresh required root `.agent` files and the machine registry.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable kit-graph fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local newer than central: 0

ZombieOrchard      2026-07-12T07-51-04-04-00 selected oldest
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

Only `LuminaryLabs-Publish/ZombieOrchard` is in scope for Publish changes.

## Interaction loop

```txt
module boot
  -> createOrchardGame()
  -> construct an ordered kit array
  -> createKitRuntime({ kits })
  -> for each kit call engine.addKit(kit)
  -> call kit.create(ctx)
  -> require only domain.id
  -> assign domains[domain.id] = domain
  -> create renderers and delegated click handling
  -> expose raw engine through window.GameHost
  -> start recursive RAF

frame
  -> engine.tick(1 / 60)
  -> iterate Object.values(domains) in current property order
  -> tick each available domain
  -> notify subscribers synchronously
  -> return a domain snapshot
  -> draw canvas and HTML

runtime graph mutation
  -> external caller reaches GameHost.engine.addKit(kit)
  -> candidate creates against the live context
  -> matching domain ID silently replaces the live owner
  -> no dependency check, lifecycle result, rollback or visible-frame receipt occurs
```

## Main findings

```txt
kit manifest: absent
kit version and compatibility range: absent
provided-service declaration: absent
required-service declaration: absent
dependency graph validation: absent
deterministic topological order: absent
duplicate kit ID rejection: absent
duplicate domain ID rejection: absent
candidate graph: absent
atomic graph commit: absent
installation rollback: absent
uninstall or predecessor disposal: absent
graph ID, revision and fingerprint: absent
service-resolution receipt: absent
first visible graph-frame acknowledgement: absent
```

`engine.addKit()` validates only that `kit.create(ctx)` returned a domain with an `id`. It then writes that domain into the live object. A second domain with the same ID replaces the first without warning. `tick()` later iterates the mutable domain object directly, so installation history determines execution order.

## Current authority boundary

```txt
zombie-orchard-kit-graph-installation-authority-domain
```

Required flow:

```txt
KitGraphInstallCommand
  -> validate graph predecessor and requested policy
  -> normalize immutable kit manifests
  -> verify kit IDs, domain IDs, versions and service contracts
  -> resolve dependencies into a deterministic phase order
  -> reject missing, cyclic, duplicate or incompatible candidates
  -> create every domain inside an isolated candidate context
  -> validate candidate snapshots, services and lifecycle hooks
  -> commit one KitGraphRevision atomically
  -> retire and dispose explicitly replaced predecessors
  -> publish graph fingerprint and per-kit installation receipts
  -> acknowledge the first visible frame using that graph revision
```

## Domains in use

```txt
browser document, canvas, DOM and full-window shell
module boot, recursive RAF and public GameHost
kit manifest, dependency, service, version and installation authority gap
runtime registration, domains, commands, ticks, events, snapshots, subscriptions and publication
runtime session, clock, route and public-capability boundaries
12 interface-screen domains and interface composition
resource ledger and pressure field
orchard trees, apples and refill
construction, roster and inventory
active-session movement, phases, pests, damage, score and failure
canvas world and HTML interface projection
Node smoke, static build, Pages deployment and central audit tracking
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

## Offered services

| Kit group | Services |
|---|---|
| runtime | Registration, domain construction, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, actions, activation, routing, nested dispatch and automatic Outcome routing |
| game | Resources, pressure, trees, apples, collection refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | Canvas world drawing, HUD and route HTML, cards and delegated click handling |
| diagnostics/proof/deploy | Raw engine publication, snapshot readback, unrestricted manual tick, Node smoke, static copy and Pages deployment |

## Read this run first

```txt
.agent/trackers/2026-07-12T10-00-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T10-00-00-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T10-00-00-04-00-kit-graph-installation-authority-dsk-map.md
.agent/render-audit/2026-07-12T10-00-00-04-00-graph-revision-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T10-00-00-04-00-install-order-domain-behavior-loop.md
.agent/interaction-audit/2026-07-12T10-00-00-04-00-kit-install-command-result-map.md
.agent/kit-graph-audit/2026-07-12T10-00-00-04-00-manifest-dependency-atomic-commit-contract.md
.agent/deploy-audit/2026-07-12T10-00-00-04-00-kit-graph-fixture-gate.md
```

## Retained audits

```txt
seeded random and replay:          2026-07-11T17-01-11-04-00
runtime session instance:          2026-07-11T18-28-40-04-00
versioned persistence:             2026-07-11T20-03-22-04-00
route-scoped simulation:           2026-07-11T21-40-49-04-00
public capability gateway:         2026-07-11T23-41-55-04-00
composite command transaction:     2026-07-11T23-48-14-04-00
player-control reachability:       2026-07-12T01-30-07-04-00
fixed-step clock authority:        2026-07-12T03-11-51-04-00
frame publication fault handling:  2026-07-12T04-38-12-04-00
canvas render surface:             2026-07-12T06-19-56-04-00
HTML interface projection:         2026-07-12T07-51-04-04-00
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not mutate the live domain map during candidate construction.
Do not use object insertion history as an implicit simulation phase contract.
Do not silently replace a domain owner.
Do not claim graph compatibility or first-frame parity until fixtures pass.
```