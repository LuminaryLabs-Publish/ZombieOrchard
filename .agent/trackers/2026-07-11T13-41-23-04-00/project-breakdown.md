# Project breakdown: ZombieOrchard runtime session instance authority

## Timestamp

```txt
2026-07-11T13-41-23-04-00
```

## Plan ledger

**Goal:** give the browser one explicit runtime-session owner so Play, New Game, Start, Pause, Title, Outcome, restart and disposal cannot reuse or mutate an unidentified graph.

- [x] Compare the full ten-repository `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible entry.
- [x] Read browser startup, graph construction, composition, gameplay, renderers, preset and smoke surfaces.
- [x] Identify the interaction loop, domains, kits and kit services.
- [x] Trace graph creation, route reuse, RAF ownership, listener ownership, global exposure and terminal reuse.
- [x] Define runtime/session identity, lifecycle, startup, reset, handoff, disposal and observation contracts.
- [x] Change documentation only.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement the session authority and executable lifecycle fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected: LuminaryLabs-Publish/ZombieOrchard
reason: oldest eligible central review timestamp after the 13:28 PhantomCommand refresh
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` is changed in the Publish organization during this run.

## Product interaction loop

```txt
module import
  -> create one mutable engine graph immediately
  -> create canvas and HTML renderers
  -> attach one delegated click listener
  -> expose raw engine and direct tick through window.GameHost
  -> start an unretained recursive RAF

Entry Play
  -> route the already-created graph to active-session

New Game -> Start
  -> route the same already-created graph to active-session

Pause -> Resume
  -> change interface route only
  -> graph, pressure and active-session ticking continue

Pause -> Title
  -> return to Entry while the same graph remains live

Failure -> Outcome -> Title
  -> ended active-session remains in the same graph
  -> composition can route back to Outcome on a later tick

page reload
  -> browser implicitly discards the graph
  -> no explicit runtime dispose result exists
```

## Main finding

`src/start.js` constructs the engine, renderers and browser bindings at module evaluation time. The RAF request ID is discarded, the click listener is anonymous and retained by the root element, and `window.GameHost` exposes the live engine and unrestricted `tick()` authority.

`Play`, `New Game` and `Start` are only route changes. They do not create a fresh orchard, resource ledger, pressure field, active session, random stream or session identity. `Title` and `Outcome` also do not retire the graph. The product therefore has one page-lifetime mutable graph rather than identified run instances.

The active-session domain has no reset or disposal service. Its `ended` latch, player damage, day, phase, pests and score remain attached to the graph. The orchard world, construction, roster, inventory, resources and pressure state remain attached as well.

## Required authority flow

```txt
RuntimeStartCommand
  -> validate lifecycle and host ownership
  -> allocate runtimeId, sessionId and sessionEpoch
  -> construct fresh graph off-line
  -> construct render and interaction resources
  -> register cleanup leases
  -> atomically publish RUNNING authority
  -> start one retained RAF lease
  -> publish immutable session descriptor

NewRunCommand
  -> admit against current runtime/session revision
  -> construct fresh graph and renderer bindings off-line
  -> stop mutation on the old session
  -> atomically transfer host/render/clock authority
  -> dispose the old graph and leases idempotently

RuntimeDisposeCommand
  -> reject new commands
  -> cancel RAF
  -> retire delegated listeners
  -> revoke GameHost capability
  -> unsubscribe listeners
  -> dispose render owners
  -> release graph references
  -> publish one stable DISPOSED result
```

## Domains in use

```txt
static browser route and ESM boot
browser runtime/session host
kit registration and domain graph construction
command, tick, event, snapshot, subscription and publication routing
12 scoped interface-screen domains
interface route composition and automatic Outcome routing
resource ledger and pressure field
orchard world and apple lifecycle
construction, roster and inventory runtimes
active-session movement, collection, phases, pests, damage, score and failure
world canvas projection
HTML interface projection and delegated input
GameHost diagnostics and direct mutation
Node smoke, static build and Pages deployment
missing runtime-session, clock, capability, transaction, replay and persistence authority
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `kit-runtime` | kit registration, domain creation, direct command routing, delta clamping, all-domain ticking, events, snapshots, subscriptions, publication |
| scoped interface kits | screen state, action catalog, selection, fields, activation, static disabled state, snapshots |
| `interface-composition-kit` | active route, transitions, back navigation, nested command dispatch, automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, additions, resource snapshot |
| `pressure-field-kit` | bounded pressure adjustment, passive growth, snapshot |
| `orchard-world-kit` | tree creation, random apple seeding and replenishment, nearby collection, world snapshot |
| `construction-runtime-kit` | catalog lookup, resource payment, construction creation, status |
| `roster-runtime-kit` | hiring payment, actor creation, status |
| `inventory-runtime-kit` | item/equipment state and equip mutation |
| `active-session-domain-kit` | movement, collection, clearing, phase changes, pest spawn/pursuit, damage, score and failure latch |
| render kits | canvas projection, HUD/screen HTML, delegated input binding, full HTML replacement |
| diagnostics/proof/deploy kits | raw engine host, snapshot readback, manual tick, smoke, static copy and Pages deployment |

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
  -> subscription-lease-kit
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

## Key gaps

```txt
no runtimeId, sessionId or sessionEpoch
no lifecycle state machine
one graph is created before Play
Play and Start reuse the same graph
New Game does not create new state
Pause and Title do not retire or suspend mutation authority
Outcome is not a terminal session object
no graph reset/dispose service
no retained RAF request ID
no delegated-listener removal lease
no renderer dispose service
no GameHost revocation
no startup rollback
no atomic old-session/new-session authority transfer
no lifecycle journal or immutable observation
no fresh-run/restart/dispose fixture
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / New Run / Title / Outcome / Dispose Fixture Gate
```

The fixed-step clock must consume `sessionId`, `sessionEpoch` and lifecycle admission from this gate. It must not invent parallel session identity.