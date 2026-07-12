# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T23-41-55-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build and Pages deployment.

The current audit isolates the missing public capability gateway. `src/start.js` publishes the complete runtime as `window.GameHost.engine`, plus unrestricted snapshot and manual-tick helpers. The exposed engine includes mutable `ctx`, mutable `domains`, registration, commands, ticking and subscriptions. External diagnostics can therefore replace domain authority, call domain APIs directly, advance isolated domains or submit extra full-graph steps beside the browser RAF.

## Plan ledger

**Goal:** replace raw engine publication with one versioned, revocable gateway that exposes clone-safe observation and explicitly admitted commands without exposing runtime implementation, graph registration or uncoordinated clock mutation.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Identify the product interaction loop, domains, all 27 implemented kits and their services.
- [x] Trace `GameHost`, engine, context, domain, API, registration, command, tick and subscription reachability.
- [x] Define capability manifests, leases, allowlists, schemas, single-writer stepping, read models, frame receipts and revocation.
- [x] Add timestamped architecture and system audits.
- [x] Refresh the required root `.agent` files and kit registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [x] Synchronize the central repo ledger and internal change log.
- [ ] Implement the gateway and run executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T23-41-55-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T23-41-55-04-00-public-capability-gateway-dsk-map.md
.agent/render-audit/2026-07-11T23-41-55-04-00-host-read-model-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T23-41-55-04-00-raw-host-bypass-loop.md
.agent/interaction-audit/2026-07-11T23-41-55-04-00-public-command-capability-admission-map.md
.agent/capability-audit/2026-07-11T23-41-55-04-00-raw-engine-graph-exposure-contract.md
.agent/deploy-audit/2026-07-11T23-41-55-04-00-public-host-capability-fixture-gate.md
.agent/turn-ledger/2026-07-11T23-41-55-04-00.md
.agent/kit-registry.json
```

Retain prerequisite audits:

```txt
seeded random and replay: 2026-07-11T17-01-11-04-00
runtime session instance: 2026-07-11T18-28-40-04-00
versioned save/load: 2026-07-11T20-03-22-04-00
route-scoped simulation admission: 2026-07-11T21-40-49-04-00
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-11T21-40-49-04-00 selected
TheUnmappedHouse   2026-07-11T21-48-44-04-00
AetherVale         2026-07-11T22-02-01-04-00
MyCozyIsland       2026-07-11T22-20-00-04-00
PrehistoricRush    2026-07-11T22-38-54-04-00
TheOpenAbove       2026-07-11T22-58-50-04-00
IntoTheMeadow      2026-07-11T23-10-51-04-00
HorrorCorridor     2026-07-11T23-18-16-04-00
PhantomCommand     2026-07-11T23-28-29-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
module boot
  -> create retained graph
  -> create canvas and HTML renderers
  -> publish raw GameHost
  -> start recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> tick every registered domain
  -> snapshot domain map
  -> world canvas render
  -> active-route HTML render

UI click
  -> delegated action/command lookup
  -> raw engine.command(...)
  -> optional nested command and route move
  -> subscriber publication

external host caller
  -> GameHost.engine
  -> ctx, domains, addKit, command, tick, snapshot or subscribe
  -> optional direct domain api/command/tick
  -> mutation outside the intended public boundary
```

## Main finding

```txt
public diagnostic surface
  ==
complete mutable runtime surface
```

Current reachability permits:

```txt
addKit with duplicate ID -> overwrite existing domain entry
domain.api.* -> direct unnotified gameplay mutation
domain.command(...) -> bypass runtime publication
domain.tick(...) -> partial-domain simulation
ctx mutation -> alter frame/time/events/domain table
GameHost.tick(dt) -> extra steps beside active RAF
subscribe(...) -> unmanaged listener lifetime
```

`getState()` returns detached domain snapshots for the current implementations, but it omits runtime/session identity, lifecycle, route revision, simulation tick, render frame and capability revision. It is not a committed frame-correlated read model.

## Domains in use

```txt
browser boot, window-global host and RAF
kit/domain graph construction
command, tick, event, snapshot, subscription and publication routing
runtime/session lifecycle authority: missing
fixed-step clock and single-writer authority: missing
route-scoped simulation admission authority: missing
public capability gateway and host revocation authority: missing
12 scoped interface-screen domains
interface composition and nested dispatch
resource ledger and pressure field
orchard world and random apple lifecycle
construction, roster and inventory
active-session movement, phases, pests, damage, score and terminal failure
canvas and HTML rendering
Node smoke proof
static build and Pages deployment
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

| Kit group | Services |
|---|---|
| runtime | registration, domain creation, commands, clamped ticks, events, snapshots, subscriptions and publication |
| interface | screen state, fields, selection, actions, activation, routing, nested dispatch and automatic Outcome routing |
| game | affordability, resources, pressure, trees, apples, collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | orchard canvas, HUD, route screens, cards, delegated bindings and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, Node smoke, static copy and Pages chain |

## Required authority

```txt
zombie-orchard-public-capability-gateway-authority-domain
  -> public-host-contract-kit
  -> host-capability-manifest-kit
  -> capability-id-kit
  -> capability-lease-kit
  -> public-read-model-kit
  -> host-observation-revision-kit
  -> public-command-envelope-kit
  -> public-command-allowlist-kit
  -> command-payload-schema-kit
  -> command-session-admission-kit
  -> single-writer-step-lease-kit
  -> manual-step-capability-kit
  -> public-command-result-kit
  -> host-frame-receipt-kit
  -> duplicate-domain-registration-guard-kit
  -> host-revocation-kit
  -> capability-journal-kit
  -> public-host-observation-kit
  -> public-host-capability-fixture-kit
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fixed-Step Clock Authority
+ Route-Scoped Simulation Admission Authority
+ Public Capability Gateway and Host Revocation
+ Reachability/Single-Writer/Frame-Receipt Fixture Gate
```
