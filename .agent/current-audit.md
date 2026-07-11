# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T13-41-23-04-00
status: runtime-session-instance-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
central internal change log: pending until central commit
```

## Summary

`ZombieOrchard` creates one mutable graph at module evaluation and keeps that graph for the page lifetime. Play, New Game, Start, Pause, Resume, Title and Outcome are interface-route operations, not run-instance lifecycle operations. The browser host has no runtime/session identity, lifecycle revision, off-line graph construction, atomic authority transfer, startup rollback, retained RAF lease, removable listener lease, renderer disposal or public-host revocation.

## Plan ledger

**Goal:** establish one product-level runtime-session owner before the fixed-step clock and all later mutation authorities.

- [x] Compare all ten accessible Publish repositories and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Read startup, graph construction, preset routing, composition, gameplay and render surfaces.
- [x] Identify all domains, implemented kits and services.
- [x] Trace graph reuse across Play, New Game, Start, Pause, Title and Outcome.
- [x] Trace RAF, listener, renderer and `GameHost` ownership.
- [x] Define runtime/session identity, lifecycle commands, handoff, rollback and disposal contracts.
- [x] Add architecture, render, gameplay, interaction, lifecycle and deploy audits.
- [x] Push documentation only to `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute runtime-session fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: oldest eligible central review timestamp after PhantomCommand was refreshed at 13:28
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Interaction loop

```txt
src/start.js module evaluation
  -> createOrchardGame()
  -> create all domain closures
  -> create canvas renderer
  -> create HTML renderer and delegated click listener
  -> expose window.GameHost
  -> call draw()

one draw callback
  -> engine.tick(1 / 60)
  -> mutate the same graph
  -> aggregate snapshot
  -> render world and UI
  -> requestAnimationFrame(draw)

route actions
  -> engine.command(interface-composition, activate)
  -> route same graph among Entry, Setup, Active, Pause and Outcome
```

## Runtime-session findings

### The graph exists before the player starts

`src/start.js` calls `createOrchardGame()` immediately. Resource, pressure, orchard, construction, roster, inventory, interface and active-session state all exist before Play or New Game is selected.

### New Game is a route, not a new run

The preset maps Entry `new` to `run-setup` and `start` to `active-session`. No fresh graph is constructed. The same resources, pressure, apples, buildings, roster, inventory, player, pests, score and `ended` latch remain authoritative.

### Title does not retire the run

Pause `title` and Outcome `title` move the interface to Entry only. The runtime continues ticking every domain. If `active-session.ended` remains true, composition can move the route back to Outcome on a later tick.

### Browser resources have no owner

```txt
RAF request ID: discarded
RAF generation fence: missing
HTML listener lease: missing
runtime subscription lease: missing
canvas renderer dispose: missing
HTML renderer dispose: missing
GameHost revocation: missing
startup rollback stack: missing
ordered disposal result: missing
```

### Public mutation authority is not revocable

`window.GameHost` exposes the live engine and direct `tick(dt)`. There is no session, epoch, lifecycle or graph-revision admission and no clone-safe limited capability surface.

## Domains in use

```txt
browser route and ESM boot
browser runtime/session host
kit registration and graph construction
command, tick, event, snapshot, subscription and publication routing
12 interface-screen domains
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory
active-session movement, collection, phases, pests, damage, score and failure
world canvas projection
HTML projection and delegated input
GameHost diagnostics and direct control
smoke, build and Pages deployment
missing runtime-session authority
missing fixed-step clock authority
missing capability, transaction, replay and persistence authority
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `kit-runtime` | kit registration, domain creation, direct command routing, delta clamp, all-domain tick, events, snapshots, subscriptions, publication |
| screen domain kits | screen state, actions, selection, fields, activation, static disabled state, snapshots |
| `interface-composition-kit` | route ownership, transitions, back, nested dispatch, automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, addition, snapshot |
| `pressure-field-kit` | bounded adjustment, passive growth, snapshot |
| `orchard-world-kit` | tree creation, random apple seeding/replenishment, nearby collection, snapshot |
| `construction-runtime-kit` | catalog lookup, payment, construction creation, status |
| `roster-runtime-kit` | hiring payment, actor creation, status |
| `inventory-runtime-kit` | item/equipment state and equip mutation |
| `active-session-domain-kit` | movement, collection, clearing, phase changes, pest spawn/pursuit, damage, score and failure |
| render kits | canvas projection, active HUD, generic screen HTML, delegated bindings, full HTML replacement |
| diagnostics/proof/deploy kits | raw engine, snapshot, manual tick, smoke, static copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-runtime-session-instance-authority-domain
  -> runtime-id-kit
  -> session-id-kit
  -> session-epoch-kit
  -> lifecycle-state-kit
  -> runtime-start-command-kit
  -> new-run-command-kit
  -> runtime-startup-transaction-kit
  -> graph-construction-plan-kit
  -> authority-transfer-kit
  -> animation-frame-lease-kit
  -> delegated-listener-lease-kit
  -> renderer-resource-owner-kit
  -> public-host-lease-kit
  -> runtime-cleanup-stack-kit
  -> ordered-runtime-dispose-kit
  -> startup-rollback-kit
  -> lifecycle-result-kit
  -> lifecycle-journal-kit
  -> lifecycle-observation-kit
  -> runtime-session-fixture-kit
```

## Required contract

```txt
start host
  -> allocate runtime identity
  -> construct graph/resources off-line
  -> register cleanup leases
  -> atomically publish current authority
  -> start one retained RAF

start new run
  -> allocate new session ID and epoch
  -> construct fresh graph off-line
  -> fence old callbacks
  -> atomically transfer clock/render/input authority
  -> dispose old graph and resources

stop host
  -> reject new commands
  -> cancel RAF
  -> remove listeners
  -> revoke GameHost
  -> dispose renderers
  -> retire graph
  -> publish stable DISPOSED result
```

## Fixture matrix

```txt
fresh startup and exactly one RAF
double-start rejection
New Game creates fully fresh state
pause/resume preserves one session
Title follows explicit retain-or-retire policy
terminal graph cannot reopen after retirement
old-session commands and RAF callbacks reject
startup failure rolls back in reverse order
listener and GameHost leases are revoked
dispose is ordered and idempotent
render frames cite live session and epoch
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

The clock must consume session identity and lifecycle state from Gate 1. It must not invent its own runtime or epoch model.