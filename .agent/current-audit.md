# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T20-03-22-04-00
status: versioned-save-load-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

`ZombieOrchard` contains a visible `session-select` domain and slot-card renderer but no persistence system. Entry never routes to Save Select, the preset supplies no slots or load actions, and the runtime has no save, load, delete, migration, storage or hydration service. `engine.snapshot()` is a one-way projection and cannot recreate the live closure graph or future random continuation.

## Plan ledger

**Goal:** define one versioned persistence authority that writes exact committed durable state, migrates older envelopes, stages a replacement graph, rolls back failed loads, and acknowledges the first restored frame.

- [x] Compare all ten accessible Publish repositories with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Read `src/start.js`, `src/game.js`, runtime, interface, composition, gameplay, preset, renderers and smoke proof.
- [x] Trace Entry, New Game, Save Select, snapshots, random state, render projection and diagnostics.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define slot identity, envelope versioning, migration, atomic save/load, load epoch, rollback and frame acknowledgement.
- [x] Add architecture, render, gameplay, interaction, persistence and deploy audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement prerequisite authorities and persistence fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: oldest eligible central timestamp
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Interaction loop

```txt
createOrchardGame() at module boot
  -> create all mutable domains
  -> seed random orchard apples
  -> return one closure graph

Entry
  -> Play routes to active-session
  -> New Game routes to run-setup
  -> Settings routes to preferences
  -> Save Select is not reachable

session-select, if forced active
  -> title: Save Select
  -> renderer reads meta.slots
  -> preset has no meta.slots
  -> only Back action exists

engine.snapshot()
  -> gathers domain.snapshot() projections
  -> does not include ctx frame, elapsed or random state
  -> has no import, restore or graph-replacement inverse

RAF
  -> mutates retained graph
  -> renders canvas and HTML
  -> exposes raw current snapshot through GameHost
```

## Main findings

1. `session-select-domain-kit` exists, but Entry has no transition to it.
2. The session-select preset has only a Back action and no slot metadata.
3. The HTML renderer can display `current.meta.slots`, but there is no slot-index service feeding it.
4. No browser storage API, filesystem API, storage adapter or persistence domain exists.
5. The runtime exposes `snapshot()` only; no domain exposes a restore or hydrate command.
6. Runtime clock state in `ctx.frame` and `ctx.elapsed` is omitted from snapshots.
7. Apple and pest generation use process-global `Math.random()`, whose internal continuation cannot be serialized.
8. Random string entity IDs cannot be continued deterministically after load.
9. There is no schema ID, schema version, preset fingerprint, migration registry or compatibility result.
10. There is no save ID, slot revision, checksum, state fingerprint or atomic write result.
11. There is no candidate graph, staged validation, load epoch, authority swap or rollback.
12. There is no corruption quarantine, conflict result, stale slot rejection or cross-context policy.
13. Canvas, HTML and GameHost cannot identify a save, load or first restored frame.
14. The smoke test proves only Entry-to-Play and apple presence.

## Domains in use

```txt
browser boot and runtime host
runtime-session and run lifecycle authority: missing
kit/domain graph construction
commands, ticks, events, snapshots, subscriptions and publication
fixed-step committed tick authority: missing
public capability and composite transaction authority: missing
seeded random stream and replay authority: missing
versioned save/load and migration authority: missing
12 interface-screen domains and composition
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory
movement, collection, phases, pests, damage, score and failure
world canvas projection
HTML projection and delegated input
GameHost diagnostics and manual control
Node smoke proof
static build and Pages deployment
```

## Implemented kits and services

| Kit group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, elapsed/frame mutation, all-domain tick, events, snapshots, subscriptions and publication |
| interface kits | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, gain and resource snapshot |
| `pressure-field-kit` | clamped pressure channels and per-tick growth |
| `orchard-world-kit` | tree grid, random apple population, nearest collection and refill |
| `construction-runtime-kit` | catalog selection, resource debit and built-object mutation |
| `roster-runtime-kit` | resource debit and actor hiring |
| `inventory-runtime-kit` | item state and equipment selection |
| `active-session-domain-kit` | movement, collection, phases, random pest admission/placement, pursuit, damage, score and terminal failure |
| render kits | orchard canvas, HUD, generic screens, slot-card projection, delegated actions and per-frame HTML replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke, static copy and Pages chain |

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
identity
  saveId
  slotId
  slotRevision
  schemaId
  schemaVersion

compatibility
  presetId
  presetFingerprint
  runtimePolicyVersion
  randomPolicyId
  randomPolicyVersion

continuity
  runtimeId
  runId
  sessionEpoch
  lifecycle
  simulationTickId
  commandSequence
  randomStreamStates
  entitySequences

state
  durableDomainState
  stateFingerprint
  checksum
  createdAt
  updatedAt
```

## Required save transaction

```txt
SaveRun command
  -> admit runtime, run, lifecycle and expected slot revision
  -> freeze one committed durable-state receipt
  -> include committed random continuation and entity sequences
  -> validate schema and fingerprint
  -> write candidate envelope
  -> atomically replace slot record and slot index
  -> return typed save result
  -> publish journal row
```

Rejected, stale, duplicate or failed saves must not advance slot revision or replace the prior valid envelope.

## Required load transaction

```txt
LoadRun command
  -> read slot envelope
  -> validate checksum and schema identity
  -> migrate through an explicit ordered registry
  -> validate preset and policy compatibility
  -> stage a fresh candidate graph
  -> restore durable domain, clock and random continuation state
  -> allocate a new load epoch
  -> fence predecessor callbacks and commands
  -> atomically transfer authority
  -> render canvas and HTML from the restored candidate
  -> acknowledge the first restored frame
  -> retire predecessor graph
```

Any read, migration, validation, staging or first-frame failure must preserve the prior committed run and valid slot.

## Required proof

```txt
slot save and load roundtrip
same durable fingerprint before save and after load
same future apple and pest continuation after load
old-schema migration to current schema
unknown future schema rejection
checksum corruption quarantine
stale slot revision conflict
failed candidate restore rollback
no predecessor mutation after load epoch commit
canvas, HTML and GameHost first-restored-frame parity
repeated save/load without RAF or listener leaks
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

Gate 6 must consume the committed identities, transaction results, random stream snapshots and durable fingerprint produced by Gates 1–5.