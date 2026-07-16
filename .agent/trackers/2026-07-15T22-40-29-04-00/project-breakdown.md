# ZombieOrchard project breakdown: run seed, RNG state and replay authority

**Timestamp:** `2026-07-15T22-40-29-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `run-seed-rng-replay-authority-audited`

## Summary

ZombieOrchard creates orchard apples, apple identities, pest spawn angles and pest identities through ambient global `Math.random()`. The run-setup route has no seed field, `createOrchardGame()` accepts no random provider, snapshots contain no seed or RNG cursor, and the smoke test proves only that apples exist. The same command and tick sequence therefore has no source-backed guarantee of producing the same run.

## Plan ledger

**Goal:** give every run one versioned identity and deterministic random-stream state that can be created, saved, restored, retried, replayed and rendered without depending on ambient browser randomness.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all eligible repositories have root `.agent` state and synchronized documented heads.
- [x] Select only ZombieOrchard by the oldest synchronized central timestamp.
- [x] Trace browser boot, preset composition, runtime creation, orchard seeding, apple refill, pest spawning, snapshots, diagnostics, rendering, smoke coverage, build and deployment.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits and every offered service.
- [x] Define one run-seed/RNG/replay authority with 20 coordinating surfaces.
- [x] Add a new timestamped tracker and audit family.
- [ ] Implement deterministic streams and execute same-seed, replay, restore, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0

ZombieOrchard      2026-07-15T17-38-05-04-00  selected
TheUnmappedHouse   2026-07-15T18-02-58-04-00  next oldest
PhantomCommand     2026-07-15T18-39-30-04-00
AetherVale         2026-07-15T18-58-52-04-00
TheLongHaul        2026-07-15T19-38-38-04-00
MyCozyIsland       2026-07-15T19-58-42-04-00
IntoTheMeadow      2026-07-15T20-38-13-04-00
PrehistoricRush    2026-07-15T20-59-46-04-00
HorrorCorridor     2026-07-15T21-39-15-04-00
TheOpenAbove       2026-07-15T22-00-36-04-00
```

## Complete interaction loop

```txt
page load
  -> create one game runtime from orchardPreset
  -> create resource, pressure, orchard, construction, roster, inventory,
     interface, active-session and composition domains
  -> orchard-world immediately creates 63 trees
  -> orchard-world fills 26 apples through Math.random()
  -> start one fixed 1/60 tick per RAF callback

active run
  -> active-session accepts movement, collect, clear and next-phase commands
  -> collecting removes one apple
  -> orchard-world immediately refills through Math.random()
  -> night ticks may spawn pests through Math.random()
  -> pest angle and pest id consume ambient random draws
  -> runtime snapshots state but not seed, algorithm, stream or cursor
  -> Canvas2D renders the resulting world
  -> HTML renders resources, pressure, status and commands

reproduction path
  -> run-setup has no seed field
  -> createOrchardGame has no RNG injection
  -> GameHost exposes snapshots and manual ticking only
  -> smoke creates one fresh ambient-random run
  -> no same-seed, replay, restore or snapshot-hash comparison exists
```

## Domains in use

```txt
browser document, RAF, click input, focus, visibility and page lifecycle
run identity, seed admission, RNG algorithm version and stream partitioning
kit registration, command dispatch, ticking, events, snapshots and subscriptions
interface route identity and active-screen projection
resource ledger, pressure field, orchard world, construction, roster and inventory
active-session movement, collection, phase, pest, damage, score and outcome
orchard layout, apple refill, pest spawn and entity-id randomness
save/retry/replay compatibility and deterministic snapshot hashing
Canvas2D world rendering and HTML command rendering
public GameHost diagnostics
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned run-seed/RNG surfaces: 20
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, commands, delta clamping, ticking, events, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, fields, selection, action activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save Select projection and Back |
| `run-setup-domain-kit` | New Orchard, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pests, damage, clearing, score, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | Build projection, Storage Shed command, Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | Run Summary and Title |
| `interface-composition-kit` | route transitions, nested commands, Back and outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants and snapshots |
| `pressure-field-kit` | pressure adjustment, time growth and snapshots |
| `orchard-world-kit` | tree generation, ambient-random apple generation/refill, collection, bounds and snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages and snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages and snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and world projection |
| `html-interface-render-kit` | delegated route/gameplay commands, HTML projection and cards |
| `game-host-diagnostics-kit` | raw engine exposure, state readback and manual ticking |
| `smoke-fixture-kit` | entry, direct Play and apple-presence assertions |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed findings

```txt
run seed in preset: absent
run seed field in run-setup: absent
RNG provider injection: absent
RNG algorithm/version: absent
named RNG streams: absent
RNG state in snapshots: absent
RNG restore path: absent
deterministic entity IDs: absent
orchard apple Math.random calls: present
apple refill Math.random calls: present
pest angle Math.random calls: present
pest id Math.random calls: present
same-seed retry: absent
replay command log: absent
deterministic snapshot hash: absent
same-seed fixture count: 0
```

## Main finding

The current run has no reproducible random authority. Orchard construction consumes ambient global randomness during game creation; later collection and night simulation consume more global draws. Because the algorithm, seed, stream partition, cursor and entity-id sequence are not owned or serialized, identical visible inputs and tick deltas cannot be proven to yield identical apples, pests, IDs, scores or frames.

This is a source-backed determinism and evidence gap. It does not claim that the current game fails to create apples or pests, only that those results cannot be reliably reproduced from an explicit run identity.

## Required parent domain

`zombie-orchard-run-seed-rng-replay-authority-domain`

## Planned surfaces

| Surface | Service |
|---|---|
| `zombie-orchard-run-seed-rng-replay-authority-domain` | parent run identity, RNG and replay composition |
| `run-seed-schema-kit` | normalized seed encoding and validation |
| `run-generation-identity-kit` | immutable RunGeneration and RunId |
| `seed-input-admission-kit` | generated, user-entered and restored seed admission |
| `rng-algorithm-version-kit` | stable algorithm identity and compatibility version |
| `rng-stream-partition-kit` | independent named streams and deterministic derivation |
| `orchard-layout-rng-kit` | deterministic initial tree/apple placement |
| `apple-refill-rng-kit` | deterministic replacement apple generation |
| `pest-spawn-rng-kit` | deterministic spawn eligibility, angle and position |
| `deterministic-entity-id-kit` | stable IDs independent from ambient randomness |
| `rng-state-snapshot-kit` | immutable stream cursors and draw counts |
| `rng-state-restore-kit` | exact stream restoration before simulation resumes |
| `rng-revision-admission-kit` | expected RNG revision for commands that consume draws |
| `replay-command-log-kit` | ordered accepted commands and fixed-step metadata |
| `same-seed-retry-kit` | create a clean run with the same accepted seed |
| `new-seed-session-kit` | allocate a distinct accepted seed and generation |
| `seed-version-migration-kit` | compatibility policy for saved algorithm versions |
| `deterministic-snapshot-hash-kit` | canonical state hashing for comparisons |
| `first-seed-bound-world-frame-ack-kit` | first visible frame bound to run/RNG revisions |
| `rng-replay-fixture-kit` | same-seed, different-seed, restore and Pages proof |

## Required command boundary

```txt
RunSeedAdmissionCommand
  -> bind document, runtime, route, preset and seed-policy revisions
  -> normalize or generate one seed
  -> bind one RNG algorithm version
  -> allocate RunGeneration and named random streams
  -> create orchard and active-session state from those streams
  -> publish RunSeedAdmissionResult
  -> publish FirstSeedBoundWorldFrameAck

RandomDrawCommand
  -> bind RunGeneration, stream id and expected RNG revision
  -> consume draws only from the named accepted stream
  -> publish value, next revision and draw count
  -> reject stale, retired or mismatched generations

ReplayOrRestoreCommand
  -> bind seed, algorithm version, stream cursors and command log
  -> rebuild or restore all participants atomically
  -> compare deterministic snapshot hashes
  -> publish ReplayOrRestoreResult
```

## Validation boundary

Documentation only. No seeded RNG, deterministic ID, replay log, same-seed retry, snapshot restoration, deterministic hash, browser fixture, artifact parity, Pages parity or production-readiness claim is made.
