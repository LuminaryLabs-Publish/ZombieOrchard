# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T10-00-00-04-00`  
**Status:** `kit-graph-installation-authority-audited`  
**Branch:** `main`

## Summary

The runtime composes the shipped product from 27 implemented kits, but the composition itself is not an authority. `createOrchardGame()` supplies one manually ordered kit array. `createKitRuntime()` calls `kit.create(ctx)` against the live context, checks only for a returned domain ID, and writes the result directly into the mutable domain map.

There is no manifest, version, provided-service declaration, required-service declaration, dependency resolver, deterministic phase plan, duplicate-domain rejection, candidate graph, rollback, predecessor disposal, graph revision or visible-frame receipt. The raw engine is also exposed through `window.GameHost`, so runtime callers can invoke `addKit()` after startup and silently replace a live domain by ID.

## Plan ledger

**Goal:** define a deterministic kit-graph installation transaction that validates compatibility before mutation, commits the complete graph atomically and proves which graph produced the visible frame.

- [x] Compare the complete Publish inventory against central ledgers.
- [x] Verify root `.agent` coverage and central synchronization for all nine eligible repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` under the oldest synchronized fallback rule.
- [x] Read browser boot, game construction, runtime registration, interface composition, gameplay domains and public host exposure.
- [x] Reconcile the interaction loop, all domains, all 27 kits and their services.
- [x] Trace initial and post-start kit installation.
- [x] Confirm duplicate domain IDs overwrite live owners.
- [x] Confirm domain tick order depends on mutable object insertion order.
- [x] Confirm service dependencies and versions are implicit.
- [x] Confirm no atomic install, rollback, uninstall or graph-frame proof exists.
- [x] Define the parent DSK and fixture boundary.
- [ ] Implement the authority and run source/browser/Pages graph fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T07-51-04-04-00 selected oldest synchronized
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

## Complete interaction loop

```txt
browser module evaluation
  -> createOrchardGame()
  -> create interface and gameplay kit descriptors
  -> createKitRuntime({ kits })

initial graph installation
  -> create mutable domains object and shared ctx
  -> for each kit call engine.addKit(kit)
  -> kit.create(ctx) executes against the live predecessor graph
  -> require only domain.id
  -> assign domains[domain.id] = domain
  -> continue without dependency, version or duplicate checks

runtime host setup
  -> create world canvas and HTML renderer
  -> attach delegated UI listener
  -> publish raw engine through window.GameHost
  -> begin RAF

frame
  -> clamp one supplied delta
  -> increment ambient frame and elapsed counters
  -> clear events
  -> iterate Object.values(domains)
  -> call each domain tick in mutable property order
  -> synchronously notify subscribers
  -> snapshot domains
  -> render canvas and HTML

post-start graph mutation
  -> external code calls GameHost.engine.addKit(candidate)
  -> candidate creates against the live ctx
  -> matching domain ID replaces predecessor immediately
  -> no graph revision, migration, disposal or render acknowledgement occurs
```

## Source-backed findings

### Installation validates only the returned domain ID

`src/kits/runtime.js` implements installation as:

```js
addKit(kit) {
  const domain = kit.create(ctx);
  if (!domain?.id) throw new Error("Kit returned a domain without an id.");
  domains[domain.id] = domain;
  return domain;
}
```

The runtime does not inspect a kit manifest, dependencies, provided services, version, lifecycle hooks or phase. It also does not reject an existing `domain.id`.

### Duplicate IDs silently replace live ownership

A second kit returning `id: "active-session"` overwrites the existing domain in place. The predecessor receives no stop or dispose call. Existing state disappears, while renderers and public callers continue reading the same map key. No replacement command, migration result, graph revision or first-frame acknowledgement identifies the ownership change.

### Tick order is an installation-history side effect

`tick()` uses:

```js
for (const domain of Object.values(domains)) domain.tick?.(ctx.delta);
```

Current behavior therefore depends on object property order created by the manually ordered array in `createOrchardGame()`. The interface-composition domain is installed last and routes to Outcome after active-session ticks. A future insertion, replacement or refactor can change whether a consumer observes predecessor or current-tick state without any explicit phase contract.

### Dependencies are implicit and weakly admitted

Gameplay domains find collaborators through `ctx.domains[domainId]?.api`. Examples include construction using `resource-ledger`, roster hiring using the ledger, and active-session collection using orchard, ledger and pressure services. No required-service declaration proves those providers exist or that their API shape and version match.

Optional chaining avoids immediate crashes but converts graph errors into product behavior. A missing ledger can look like insufficient resources. A missing orchard can look like no nearby apple. A missing pressure service silently drops pressure mutation.

### Initial installation is not transactional

The initial loop installs domains one at a time into the live candidate object. If a later `kit.create()` throws, previously created domains and any side effects they acquired have no rollback or disposal path. The current kits are mostly in-memory, but the runtime contract permits future listeners, timers, transports or renderer resources without an acquisition ledger.

### Public runtime mutation bypasses composition policy

`src/start.js` exposes the raw engine as `window.GameHost.engine`. That surface includes `addKit()`. A browser diagnostic, editor or third-party script can mutate the graph after startup without an installation command, capability check, replacement policy or graph lock.

### Graph provenance is absent

Snapshots contain domain projections only. They do not include:

```txt
graphId
graphRevision
graphFingerprint
kit manifest fingerprints
resolved dependency order
service binding receipts
installation results
replacement lineage
```

Canvas and HTML renderers therefore cannot prove which kit graph produced a visible frame.

## Concrete failure paths

### Silent active-session replacement

```txt
run is active
  -> external code adds a kit returning domain ID active-session
  -> predecessor state is overwritten
  -> player, pests, day and score reset or change shape
  -> interface-composition and renderers read the new owner
  -> no lifecycle transition, migration or replacement result exists
```

### Order-sensitive outcome routing

```txt
active-session tick commits ended = true
  -> interface-composition tick currently runs later and moves to outcome

composition is installed before active-session in a future graph
  -> composition observes predecessor ended = false
  -> outcome routing is delayed by one tick
  -> no phase descriptor or graph validation reports the behavior change
```

### Missing service disguised as gameplay rejection

```txt
construction-runtime installs without resource-ledger
  -> build command resolves no ledger API
  -> pay result is false-like
  -> player receives Missing resources
  -> graph misconfiguration is presented as economy state
```

### Failed creation with leaked acquisition

```txt
kit A creates a listener or timer
  -> kit B creation throws
  -> createKitRuntime aborts
  -> no reverse cleanup stack runs
  -> acquired work can survive a failed graph
```

## Domains in use

```txt
browser document, canvas, DOM and full-window CSS
module boot, recursive RAF and public GameHost
kit manifest and graph-installation authority gap
kit identity, domain identity, versions and compatibility
provided and required service contracts
dependency resolution and deterministic phase ordering
candidate graph construction, validation, commit, rollback and disposal
graph identity, revision, fingerprint, observation and visible-frame correlation
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
12 interface-screen domains and interface composition
resource ledger and pressure field
orchard trees, apples and refill
construction, roster and inventory
active-session movement, phases, pests, damage, score and failure
canvas world rendering and HTML projection
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
| runtime | Kit registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, actions, activation, route transitions, nested dispatch and Outcome routing |
| game | Resource accounting, pressure, orchard population, collection, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | Canvas world drawing, HUD and route HTML, card projection and delegated clicks |
| diagnostics/proof/deploy | Raw engine publication, state readback, unrestricted manual tick, Node smoke, static build copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-kit-graph-installation-authority-domain
```

Candidate kits:

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
kit-order-fixture-kit
duplicate-domain-fixture-kit
missing-service-fixture-kit
failed-create-rollback-fixture-kit
runtime-replacement-fixture-kit
pages-kit-graph-smoke-kit
```

## Required transaction

```txt
KitGraphInstallCommand
  -> admit against expected runtime session and graph predecessor
  -> normalize and freeze all kit manifests
  -> validate unique kit and domain ownership
  -> resolve required services to compatible providers
  -> reject missing, cyclic or incompatible graphs
  -> calculate deterministic lifecycle and tick phase order
  -> create domains inside an isolated candidate context
  -> collect acquisition and disposal leases
  -> validate candidate APIs, snapshots and service bindings
  -> atomically replace the graph under one revision
  -> migrate or retire explicitly replaced predecessors
  -> rollback candidate acquisition on any failure
  -> publish graph fingerprint and per-kit receipts
  -> acknowledge first canvas and HTML frame citing that graph revision
```

## Ordered implementation queue

```txt
0. Kit Graph Installation Authority
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
2b. Player-Control Reachability Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
4a. Frame Publication Fault Containment Authority
4b. Canvas Render Surface Authority
4c. HTML Interface Projection and Focus Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Proof boundary

Do not claim deterministic composition, dependency safety, compatible services, duplicate-owner protection, atomic replacement, resource-safe failed installation or graph-to-frame provenance until source, candidate-graph, browser, built-artifact and Pages fixtures pass on `main`.