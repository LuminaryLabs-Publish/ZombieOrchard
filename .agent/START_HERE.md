# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T20-03-22-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, smoke proof, static build and Pages deployment.

The current audit establishes the missing versioned save/load authority. A `session-select` domain and slot renderer exist, but the screen is unreachable from Entry, has no slot data or load actions, and no storage service exists. `engine.snapshot()` is a one-way projection with no hydration path, schema version, migration, checksum, atomic slot write, staged load, rollback, random continuation, load epoch, or first-restored-frame acknowledgement.

## Plan ledger

**Goal:** define a durable save/load boundary that can preserve one committed run exactly, migrate older envelopes safely, reject corrupt or conflicting data, atomically replace the live graph, and prove the first rendered restored frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Trace Entry, New Game, Save Select, runtime snapshots, random state, rendering and proof surfaces.
- [x] Define versioned envelopes, migration, slot indexing, atomic save/load, rollback and restored-frame contracts.
- [x] Add timestamped architecture and system audits.
- [x] Change documentation only on `main` with no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement prerequisite session, clock, command and random authorities.
- [ ] Implement persistence authority and roundtrip fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T20-03-22-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T20-03-22-04-00-versioned-save-load-authority-dsk-map.md
.agent/render-audit/2026-07-11T20-03-22-04-00-save-slot-load-result-frame-gap.md
.agent/gameplay-audit/2026-07-11T20-03-22-04-00-play-new-game-save-select-continuity-loop.md
.agent/interaction-audit/2026-07-11T20-03-22-04-00-save-load-slot-command-result-map.md
.agent/persistence-audit/2026-07-11T20-03-22-04-00-versioned-slot-migration-restore-contract.md
.agent/deploy-audit/2026-07-11T20-03-22-04-00-persistence-roundtrip-fixture-gate.md
.agent/turn-ledger/2026-07-11T20-03-22-04-00.md
.agent/kit-registry.json
```

Retain the prerequisite audits:

```txt
runtime session: 2026-07-11T18-28-40-04-00
seeded random and replay: 2026-07-11T17-01-11-04-00
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

ZombieOrchard      2026-07-11T18-28-40-04-00 selected
TheUnmappedHouse   2026-07-11T18-38-45-04-00
AetherVale         2026-07-11T18-48-21-04-00
IntoTheMeadow      2026-07-11T19-01-08-04-00
PrehistoricRush    2026-07-11T19-09-25-04-00
MyCozyIsland       2026-07-11T19-20-22-04-00
TheOpenAbove       2026-07-11T19-28-28-04-00
HorrorCorridor     2026-07-11T19-38-14-04-00
PhantomCommand     2026-07-11T19-48-09-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Product interaction loop

```txt
module boot
  -> create one mutable engine graph
  -> seed orchard apples with Math.random()
  -> create canvas and HTML renderers
  -> install delegated click listener
  -> start recursive RAF

Entry
  -> Play routes directly to active-session
  -> New Game routes to run-setup
  -> Settings routes to preferences
  -> no route to session-select

session-select, if forced active
  -> renderer reads current.meta.slots
  -> preset provides no slots
  -> only Back action exists
  -> no save, load, delete or inspect command exists

engine.snapshot()
  -> exports current domain projections
  -> omits runtime clock context and random-generator state
  -> has no inverse import or hydration service

RAF
  -> mutates retained graph
  -> renders canvas and HTML
  -> exposes raw snapshot through GameHost
```

## Main finding

```txt
visible Save Select surface
  !=
versioned persistence system
```

There is no `saveId`, slot revision, schema version, migration registry, preset fingerprint, state checksum, committed tick, random stream state, deterministic entity sequence, atomic write result, staged load candidate, load epoch, rollback, corruption quarantine, conflict result, or first-restored-frame acknowledgement.

A raw JSON copy of `engine.snapshot()` would not be sufficient. The runtime has no restore API, `ctx.frame` and `ctx.elapsed` are not included, future `Math.random()` continuation cannot be reproduced, and all authoritative state lives inside closures that cannot be atomically replaced from a snapshot.

## Domains in use

```txt
static browser route and ESM boot
runtime and run lifecycle authority: missing
kit registration and mutable graph construction
command, tick, event, snapshot, subscription and publication routing
fixed-step committed tick authority: missing
public capability and composite transaction authority: missing
seeded random stream and replay authority: missing
versioned persistence and migration authority: missing
12 scoped interface-screen domains
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard world, trees, apples and collection refill
construction, roster and inventory runtimes
active-session movement, phases, pests, damage, score and failure
canvas and HTML rendering
GameHost diagnostics
smoke, static build and Pages deployment
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
| runtime | registration, domain creation, commands, ticks, events, snapshots, subscriptions and publication |
| interface | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| game | resources, pressure, orchard/apples, collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | orchard canvas, HUD, generic screens, delegated bindings, slot-card projection and per-frame DOM replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke proof, static copy and Pages chain |

## Required persistence domain

```txt
zombie-orchard-versioned-persistence-authority-domain
  -> save-slot-id-kit
  -> save-slot-index-kit
  -> save-envelope-schema-kit
  -> save-schema-version-kit
  -> save-preset-fingerprint-kit
  -> durable-state-projection-kit
  -> random-continuation-state-kit
  -> save-state-fingerprint-kit
  -> save-checksum-kit
  -> save-command-kit
  -> save-result-kit
  -> atomic-storage-adapter-kit
  -> load-command-kit
  -> load-admission-kit
  -> save-migration-registry-kit
  -> load-candidate-graph-kit
  -> load-validation-kit
  -> load-transaction-kit
  -> load-epoch-kit
  -> load-rollback-kit
  -> slot-conflict-result-kit
  -> corrupt-save-quarantine-kit
  -> persistence-journal-kit
  -> first-restored-frame-ack-kit
  -> persistence-roundtrip-fixture-kit
  -> persistence-migration-fixture-kit
```

## Required durable envelope

```txt
saveId
slotId
slotRevision
schemaId
schemaVersion
createdAt
updatedAt
runtimeId
runId
sessionEpoch
lifecycle
presetId
presetFingerprint
simulationTickId
commandSequence
randomPolicyId
randomPolicyVersion
randomStreamStates
entitySequences
durableDomainState
stateFingerprint
checksum
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

Persistence must consume the identities and commit semantics from Gates 1–5. It must not invent parallel run, tick, command, random or frame authority.

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Fresh Graph Factory
+ Lifecycle Transaction and Stale Work Fence
+ First Fresh Frame and Disposal Fixture Gate
```

The persistence boundary is now documented, but implementation remains blocked until the earlier authorities produce a canonical durable state and deterministic continuation.