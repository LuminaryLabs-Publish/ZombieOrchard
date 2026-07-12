# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T23-41-55-04-00
status: public-capability-gateway-and-host-revocation-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Summary

`src/start.js` publishes the complete mutable kit runtime as `window.GameHost.engine`. The public object exposes context, the domain table, kit registration, command dispatch, ticking, snapshots and subscriptions, plus another unrestricted `tick()` helper.

The current snapshot implementations are generally clone-oriented, but the public host is not a read-only committed observation surface. It lets diagnostics replace domain entries, invoke domain APIs or commands directly, advance one domain independently, mutate runtime clock/event fields or add extra full-graph steps beside the active browser RAF.

## Plan ledger

**Goal:** define one public capability gateway that exposes only versioned observation, allowlisted commands, explicit fixture stepping and revocable subscriptions while keeping the engine graph unreachable.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard as the oldest eligible central entry.
- [x] Read browser boot, game construction, runtime, composition, scoped interfaces, gameplay domains, HTML bindings and smoke proof.
- [x] Identify the interaction loop, domains, all implemented kits and services.
- [x] Trace public reachability through engine, context, domains, APIs, registration, commands, ticks and subscriptions.
- [x] Define the capability, admission, read-model, frame-receipt, duplicate-registration and revocation contracts.
- [x] Add architecture, render, gameplay, interaction, capability and deploy audits.
- [ ] Implement the gateway and run fixtures.

## Interaction loop

```txt
module boot
  -> create graph and renderers
  -> publish raw GameHost
  -> start RAF

RAF
  -> engine.tick(1 / 60)
  -> all-domain mutation
  -> domain snapshot
  -> canvas render
  -> HTML render

UI command
  -> delegated DOM binding
  -> engine.command(...)
  -> optional nested composition command
  -> notify subscribers

public diagnostic
  -> GameHost.engine or GameHost.tick
  -> unrestricted graph access or stepping
```

## Source-backed findings

1. `window.GameHost` contains the raw `engine`, `getState()` and unrestricted `tick(dt)`.
2. The engine publicly exposes `ctx`, `domains`, `addKit`, `command`, `tick`, `snapshot` and `subscribe`.
3. `ctx` contains mutable frame, elapsed, delta, events, domains and a back-reference to the engine.
4. `addKit()` assigns by domain ID without duplicate protection; a duplicate can overwrite the previous entry.
5. Game-domain objects expose internal `api` functions for resource gain/payment, pressure adjustment and apple collection.
6. Direct domain API calls mutate state without runtime `notify()`.
7. Direct domain command calls bypass the runtime command boundary and publication.
8. Direct domain tick calls can advance partial gameplay state.
9. Public full-graph ticks can run beside the production RAF without a single-writer lease.
10. Public commands have no capability, host-generation, session, lifecycle, route or expected-revision identity.
11. Public snapshots omit runtime clock, session, route revision, simulation tick and render-frame receipts.
12. Subscriptions have no capability lease identity or forced host-level retirement.
13. The host has no revocation state for dispose, session replacement or fatal failure.
14. The Node smoke test never instantiates or inspects the browser-global host.

## Domains in use

```txt
browser module boot and window-global publication
runtime graph registration and mutable context
commands, ticks, events, snapshots, subscriptions and publication
runtime/session lifecycle authority: missing
fixed-step and single-writer clock authority: missing
route-scoped simulation admission authority: missing
public capability gateway/revocation authority: missing
12 interface-screen domains
interface composition and nested dispatch
resource ledger and pressure field
orchard world and random apple lifecycle
construction, roster and inventory runtimes
active-session movement, phases, pests, damage, score and failure
world-canvas and HTML projection
Node smoke proof
static build and Pages deployment
```

## Implemented kits and services

| Kit group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, elapsed/frame mutation, all-domain tick, events, snapshots, subscriptions and publication |
| interface kits | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, gain and resource projection |
| `pressure-field-kit` | pressure adjustment, clamping and unconditional per-tick growth |
| `orchard-world-kit` | tree grid, random apple population, nearest collection and refill |
| construction/roster/inventory kits | build, hire, equip and state projection |
| `active-session-domain-kit` | movement, collection, phase changes, pest spawn/pursuit, damage, score and terminal failure |
| render kits | orchard canvas, HUD, route screens, cards, delegated actions and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine publication, snapshot, manual tick, smoke proof, static copy and Pages chain |

## Complete implemented kit inventory

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

## Required composed domain

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
  -> subscriber-lease-kit
  -> host-revocation-kit
  -> capability-journal-kit
  -> public-host-observation-kit
  -> public-host-capability-fixture-kit
```

## Required public contract

```txt
GameHost {
  apiVersion
  hostGeneration
  capabilityRevision
  capabilities()
  observe()
  command(envelope)
  subscribe(listener) -> lease
  revoke(reason)
}
```

The public object must not contain or return:

```txt
engine
ctx
domains
domain objects
domain APIs
addKit
raw tick
renderer objects
DOM nodes
```

## Required command transaction

```txt
PublicCommandEnvelope
  -> host-generation admission
  -> capability lease admission
  -> session/lifecycle/route admission
  -> allowlist and payload-schema validation
  -> single-writer clock admission when time advances
  -> composite command transaction
  -> typed result
  -> render-frame acknowledgement or explicit headless receipt
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
2a. Route-Scoped Simulation Admission Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```
