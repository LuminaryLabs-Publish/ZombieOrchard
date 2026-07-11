# Current audit — ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T03-48-31-04-00
status: session-clock-capability-command-replay-then-versioned-save
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Selection audit

All ten accessible `LuminaryLabs-Publish` repositories were compared. All nine eligible non-Cavalry repositories had central ledger and root `.agent` state, so the oldest documented-selection rule applied.

```txt
ZombieOrchard        selected / 2026-07-11T01-31-15-04-00
TheUnmappedHouse     tracked  / 2026-07-11T01-38-28-04-00
MyCozyIsland         tracked  / 2026-07-11T02-02-59-04-00
AetherVale           tracked  / 2026-07-11T02-10-13-04-00
IntoTheMeadow        tracked  / 2026-07-11T02-28-12-04-00
PrehistoricRush      tracked  / 2026-07-11T02-48-17-04-00
TheOpenAbove         tracked  / 2026-07-11T03-01-38-04-00
HorrorCorridor       tracked  / 2026-07-11T03-18-44-04-00
PhantomCommand       tracked  / 2026-07-11T03-31-26-04-00
TheCavalryOfRome     excluded by rule
```

`ZombieOrchard` was the only product repository changed.

## Interaction loop

```txt
route boot
  -> construct one mutable engine graph from orchardPreset
  -> construct 12 interface domains and 7 gameplay/runtime domains
  -> attach one delegated click listener
  -> run one fixed simulation tick per RAF callback
  -> aggregate every domain snapshot
  -> render canvas and HTML
  -> expose raw engine, aggregate state, and unrestricted manual tick on GameHost

action path
  -> data-action or data-command
  -> engine.command
  -> synchronous mutation
  -> subscriber publication
  -> next rendered aggregate snapshot

save/select path
  -> session-select exists in INTERFACE_DOMAIN_IDS
  -> orchardPreset defines title and Back only
  -> no incoming route reaches it
  -> renderer reads current.meta.slots
  -> no domain populates slots
  -> no save, load, overwrite, delete, rename, import, export, or migration command exists
```

## Domains in use

```txt
static browser route and module entry
browser runtime host and uncancelled RAF ownership
game factory and unvalidated preset composition
kit registration, domain creation, command routing, ticking, snapshots, subscriptions
12 scoped interface screen domains
interface composition and route projection
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster, and inventory runtimes
active-session movement, collection, pests, phases, score, and failure
ambient global randomness
world canvas rendering
HTML interface rendering and delegated input
GameHost diagnostics
Node smoke fixture
static build copy
Pages deployment
dormant session-select and slot projection surface
missing persistence, save schema, restore, migration, and atomic load authority
```

## Implemented kits and services

- `kit-runtime`: kit registration, domain creation, command lookup/invocation, delta clamping, ticking, events, aggregate snapshots, subscriptions, and notification.
- `scoped-interface-domain-kit` plus 12 screen kits: screen state, action catalogs, selection, field mutation, disabled-action rejection, activation, metadata, and snapshots.
- `interface-composition-kit`: active/previous route state, transition, back navigation, nested child dispatch, and automatic Outcome routing.
- `resource-ledger-kit`: affordability, boolean payment, addition, and aggregate resource snapshots.
- `pressure-field-kit`: bounded channel adjustment and passive growth.
- `orchard-world-kit`: fixed trees, random apple seeding/replenishment, nearby collection, and world snapshots.
- `construction-runtime-kit`: catalog lookup, payment, built-object creation, and status message.
- `roster-runtime-kit`: actor/role state, payment, actor creation, and status message.
- `inventory-runtime-kit`: item state and equipment assignment.
- `active-session-domain-kit`: movement, collection, clearing, phase changes, pest spawning/pursuit, damage, score, and failure.
- `world-canvas-render-kit`: world projection.
- `html-interface-render-kit`: HUD/screen projection, slot-card projection, delegated DOM action routing, and per-frame HTML replacement.
- `game-host-diagnostics-kit`: raw engine access, aggregate snapshot readback, and unrestricted manual ticking.
- `smoke-fixture-kit`, `static-build-copy-kit`, and `pages-deploy-kit`: minimal proof, artifact copy, and deployment.

## Persistence finding

The current aggregate snapshot cannot serve as an authoritative save.

```txt
missing schema version
missing product/content identity
missing session epoch
missing committed simulation tick
missing declared seed and random stream cursors
missing command journal and terminal result range
missing state fingerprint
missing slot identity and metadata owner
missing export admission result
missing restore/import methods on domains
missing migration registry
missing atomic load transaction
missing load epoch and stale-work rejection
missing detached save/load result journal
```

The Session Select UI is specifically misleading:

1. `session-select-domain-kit` is created, but Entry and Run Setup do not route to it.
2. The preset supplies no `meta.slots`.
3. The HTML renderer has a slot-card branch that therefore always renders empty.
4. No action can save, load, overwrite, delete, or select a slot.
5. No persistence adapter exists in browser or Node.
6. `GameHost` exposes no save or load result surface.

## Why `engine.snapshot()` is not a save

```txt
resource, pressure, construction, roster, inventory, world, session, and route
state live in independent closures

snapshots are export-only presentation objects
no domain exposes restore/import/reset
action catalogs and transient messages are mixed with durable state
random generator state does not exist
IDs are generated from Math.random
simulation time and command identity are not authoritative
a partial restore could mutate some domains before another rejects
```

## Candidate persistence DSK map

```txt
save-envelope-kit
save-schema-version-kit
content-identity-kit
save-slot-index-kit
committed-snapshot-export-kit
state-restore-kit
save-admission-validation-kit
save-migration-registry-kit
atomic-load-transaction-kit
browser-persistence-adapter-kit
load-epoch-authority-kit
save-load-result-journal-kit
save-roundtrip-fixture-kit
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Interaction Capability Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save/Load Authority
```

## What not to do next

Do not add a localStorage blob around `engine.snapshot()`, expose Save Select as operational, or claim resume support. Establish the five prerequisite authority gates first, then add a versioned envelope and atomic restore transaction.
