# ZombieOrchard project breakdown: save-slot session selection

**Timestamp:** `2026-07-15T12-39-01-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `save-slot-session-selection-admission-authority-audited`

## Summary

ZombieOrchard declares a Save Select route and the HTML renderer can display slot cards, but no action reaches that route, the preset supplies no slots, and the runtime has no persistence service. `Play` routes directly into the existing in-memory active session, while the smoke test explicitly requires that bypass.

## Plan ledger

**Goal:** make Play, New Game, save discovery, load, commit, delete and active-session adoption one versioned session-selection contract.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all eligible repositories have root `.agent` state and matching documented heads.
- [x] Select only ZombieOrchard by the oldest synchronized central timestamp.
- [x] Trace entry, Save Select, New Game, active-session, renderer and smoke paths.
- [x] Identify all domains, all 27 implemented kits and every offered service.
- [x] Define the missing save-slot/session-selection parent domain and 20 coordinating surfaces.
- [x] Add a new timestamped tracker and audit family.
- [ ] Implement persistence and execute source, browser, dist and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0

ZombieOrchard      2026-07-15T08-26-01-04-00  selected
TheUnmappedHouse   2026-07-15T08-28-25-04-00
PhantomCommand     2026-07-15T08-41-37-04-00
AetherVale         2026-07-15T09-00-08-04-00
TheLongHaul        2026-07-15T09-40-51-04-00
MyCozyIsland       2026-07-15T10-01-08-04-00
IntoTheMeadow      2026-07-15T10-40-17-04-00
PrehistoricRush    2026-07-15T10-58-45-04-00
HorrorCorridor     2026-07-15T11-39-04-04-00
TheOpenAbove       2026-07-15T12-02-38-04-00
```

## Complete interaction loop

```txt
page load
  -> create resource, pressure, world, construction, roster and inventory domains
  -> create all interface domains, including session-select
  -> create active-session and interface-composition
  -> start at entry

Play
  -> entry action `play`
  -> interface-composition moves directly to active-session
  -> no save catalog, selected slot, load command or restore result
  -> current in-memory runtime state becomes visible

New Game
  -> entry action `new`
  -> run-setup
  -> Start moves directly to active-session
  -> no save-slot allocation or durable commit boundary

Save Select
  -> domain exists
  -> only action is Back
  -> no route points to it
  -> renderer reads `current.meta.slots`
  -> preset provides no slots
  -> screen is unreachable and empty

smoke
  -> activates Play
  -> requires immediate active-session transition
  -> does not exercise save discovery, selection, load, commit or reload
```

## Domains in use

```txt
browser document, RAF, DOM input and page lifecycle
kit registration, command dispatch, tick scheduling, events, snapshots and subscriptions
interface route identity and active-screen projection
save schema, save-slot identity, discovery, validation, migration and durable storage
session selection, new-run allocation, load adoption, delete and conflict handling
resource ledger, pressure, orchard world, construction, roster and inventory
active-session movement, collection, phases, pests, damage, score and outcome
Canvas2D world rendering and HTML route/card rendering
public GameHost diagnostics
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned save/session surfaces: 20
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, commands, delta clamping, ticking, events, snapshots and subscriptions |
| `scoped-interface-domain-kit` | screen state, fields, selection, actions, events and snapshots |
| `entry-domain-kit` | Play, New Game and Settings |
| `session-select-domain-kit` | Save Select title, empty metadata and Back |
| `run-setup-domain-kit` | New Orchard, Start and Back |
| `active-session-domain-kit` | movement, collection, phase changes, pests, damage, clearing, score and failure |
| `interrupt-domain-kit` | Pause, Resume and Title |
| `construction-domain-kit` | Build projection, Storage Shed action and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | Run Summary and Title |
| `interface-composition-kit` | route transitions, nested commands, Back and outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants and snapshots |
| `pressure-field-kit` | pressure adjustment, growth and snapshots |
| `orchard-world-kit` | tree/apple generation, collection, refill, bounds and snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages and snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages and snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and world projection |
| `html-interface-render-kit` | delegated actions/commands, route projection and slot-card rendering |
| `game-host-diagnostics-kit` | raw engine exposure, state readback and manual tick |
| `smoke-fixture-kit` | entry, direct Play and orchard assertions |
| `static-build-copy-kit` | static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed findings

```txt
session-select domain registered: yes
session-select route reachable from an action: no
session-select actions other than Back: 0
preset save slots: 0
renderer slot-card path: yes
save schema: absent
save catalog/discovery: absent
localStorage or IndexedDB owner: absent
serialize/restore command: absent
selected SaveSlotId: absent
load result: absent
commit result: absent
migration result: absent
first loaded-session frame acknowledgement: absent
smoke expects Play -> active-session: yes
```

## Main finding

The product presents a `session-select` domain without a session-selection system. The entry preset routes `play` directly to `active-session`; no action targets `session-select`. The renderer can draw cards from `current.meta.slots`, but the preset supplies no slot metadata and the screen exposes only Back. No source-backed storage, schema, catalog, serialization, restore, migration, conflict or durable-commit service exists.

This makes Play an implicit adoption of whichever mutable in-memory state already exists. The current smoke test codifies that behavior by failing unless Play moves immediately to active-session.

## Required parent domain

`zombie-orchard-save-slot-session-selection-admission-authority-domain`

## Planned surfaces

| Surface | Service |
|---|---|
| `save-slot-session-selection-admission-authority-domain` | parent composition and settlement authority |
| `save-schema-kit` | versioned durable document contract |
| `save-slot-identity-kit` | stable slot IDs and revisions |
| `save-catalog-kit` | immutable slot summaries |
| `save-discovery-kit` | storage enumeration and availability |
| `save-record-validation-kit` | shape, checksum and compatibility checks |
| `state-serialization-kit` | runtime-to-document projection |
| `state-migration-kit` | version upgrades and rejection |
| `save-commit-command-kit` | atomic durable write command |
| `save-load-command-kit` | validated load request |
| `save-delete-command-kit` | slot retirement and receipt |
| `session-selection-command-kit` | selected slot and expected revision |
| `new-run-command-kit` | fresh run/slot generation |
| `atomic-runtime-adoption-kit` | all-domain restore or predecessor retention |
| `storage-failure-rollback-kit` | no partial adoption on failure |
| `stale-save-conflict-kit` | duplicate and stale write rejection |
| `session-route-result-kit` | accepted route/session result |
| `persistence-presentation-receipt-kit` | HTML and Canvas projection receipts |
| `first-loaded-session-frame-ack-kit` | first matching visible frame proof |
| `save-slot-fixture-kit` | headless, reload, browser, dist and Pages fixtures |

## Required command boundary

```txt
DiscoverSaveSlotsCommand
  -> bind StorageGeneration and SaveSchemaRevision
  -> validate and summarize every readable slot
  -> classify empty, valid, migratable, corrupt and incompatible records
  -> publish SaveCatalogResult

SelectSessionCommand
  -> bind SaveSlotId expected SaveRevision and RouteRevision
  -> validate or migrate one save document
  -> prepare all runtime-domain state
  -> atomically adopt the loaded session or preserve the predecessor
  -> publish SessionSelectionResult
  -> route to active-session only after acceptance
  -> publish FirstLoadedSessionFrameAck

CreateNewSessionCommand
  -> allocate RunGeneration and SaveSlotId
  -> reset all participating domains
  -> durably commit the initial document
  -> publish NewSessionResult
```

## Validation boundary

Documentation only. No persistence, save selection, migration, durable commit, reload recovery, visible-frame convergence, artifact parity or production-readiness claim is made.
