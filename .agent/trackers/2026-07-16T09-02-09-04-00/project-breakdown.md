# ZombieOrchard project breakdown: game audio event projection authority

**Timestamp:** `2026-07-16T09-02-09-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

ZombieOrchard has accepted route commands, collection, clearing, construction, hiring, phase changes, pest contact, failure, and outcome transitions, but the browser host installs only simulation, Canvas2D, HTML, diagnostics, smoke, build, and Pages surfaces. No audio context, unlock transaction, cue registry, preference bus, lifecycle settlement, deduplication, voice budget, or audible-frame acknowledgement exists.

## Plan ledger

**Goal:** project accepted gameplay and interface results into lifecycle-safe browser audio without moving simulation truth into click handlers, RAF callbacks, or an audio provider.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only ZombieOrchard by the oldest synchronized central timestamp.
- [x] Trace page boot, commands, domain results, simulation transitions, Canvas2D and HTML projection.
- [x] Identify the complete interaction loop, all active domains, all 27 implemented kits, and every offered service.
- [x] Define one game-audio parent domain with 20 coordinating surfaces.
- [x] Add a timestamped tracker and focused audit family.
- [ ] Implement audio projection and execute browser, artifact, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/ZombieOrchard
selection timestamp: 2026-07-16T03-41-28-04-00
next oldest: LuminaryLabs-Publish/TheUnmappedHouse
next timestamp: 2026-07-16T04-02-40-04-00
```

## Complete interaction loop

```txt
page load
  -> create kit runtime and 19 installed domains
  -> create Canvas2D world renderer
  -> create delegated HTML interface renderer
  -> start RAF loop

every frame
  -> engine.tick(1/60)
  -> pressure and active-session simulation advance
  -> snapshot is projected to canvas and HTML
  -> no audio projection is evaluated

user action
  -> delegated click resolves route or active-session command
  -> domain returns accepted/rejected result
  -> state and message change
  -> next frame redraws HTML/world
  -> no semantic AudioEventId or audible receipt exists

terminal path
  -> player condition reaches zero
  -> active-session marks ended
  -> composition routes to outcome
  -> visible outcome appears silently
```

## Domains in use

```txt
browser document, RAF, pointer/click, focus, visibility, page lifecycle and Web Audio capability
kit registration, command dispatch, ticking, event buffering, snapshots and subscriptions
interface route identity, active-screen projection and nested command routing
resource ledger and economy mutation
pressure channels and adjustment
orchard world generation, collection and refill
active-session movement, phase, pests, damage, score and failure
construction, roster and inventory state
Canvas2D world rendering
HTML command and HUD projection
public GameHost diagnostics
browser audio capability, unlock, cue projection, preferences, pooling and lifecycle settlement
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned audio-authority surfaces: 20
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, ticking, event buffering, snapshots and subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events and snapshots |
| `entry-domain-kit` | Play, New Game and Settings |
| `session-select-domain-kit` | Save Select projection and Back |
| `run-setup-domain-kit` | run setup projection, Start and Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest spawning and movement, contact damage, clearing, score and failure |
| `interrupt-domain-kit` | Pause, Resume and Title |
| `construction-domain-kit` | construction projection, Storage Shed action and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | outcome projection and Title |
| `interface-composition-kit` | route transitions, nested commands, Back and outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants and snapshots |
| `pressure-field-kit` | rowPressure and curse state, clamped adjustment, time growth, commands and snapshots |
| `orchard-world-kit` | tree generation, apple generation/refill, collection, bounds and snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages and snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages and snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and player/tree/apple/pest projection |
| `html-interface-render-kit` | delegated route/gameplay commands, HUD and card projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback and manual ticking |
| `smoke-fixture-kit` | entry, Play and orchard apple assertions |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed finding

```txt
AudioContext creation: absent
audio provider import: absent
accepted user-gesture unlock result: absent
semantic AudioEventId: absent
cue descriptor registry: absent
master/category preferences: absent
continuous ambience lifecycle: absent
spatial listener/source projection: absent
cue deduplication: absent
voice pooling/budget: absent
blur/visibility/pagehide audio settlement: absent
FirstAudibleCueAck: absent
FirstAudioVisualConvergenceAck: absent
browser audio fixture count: 0
```

The runtime already distinguishes accepted and rejected commands, changes session messages, advances phase, removes apples and pests, settles purchases and hiring, and publishes terminal state. Those are suitable semantic inputs, but no owned adapter converts them into bounded audio results.

## Required parent domain

`zombie-orchard-game-audio-event-projection-authority-domain`

## Planned surfaces

| Surface | Service |
|---|---|
| `zombie-orchard-game-audio-event-projection-authority-domain` | parent capability, unlock, event admission, cue projection and lifecycle authority |
| `audio-capability-observer-kit` | Web Audio capability and provider status |
| `audio-context-lifecycle-kit` | context creation, resume, suspend, close and generation identity |
| `audio-user-gesture-unlock-kit` | accepted gesture-bound unlock transaction |
| `audio-event-schema-kit` | stable AudioEventId, source revision and payload schema |
| `audio-cue-registry-kit` | authored cue descriptors and compatibility version |
| `interface-audio-event-adapter-kit` | route, button, accepted and rejected command cues |
| `collection-audio-event-adapter-kit` | red/gold collection and no-target results |
| `combat-audio-event-adapter-kit` | clear hit, pest defeat, contact damage and failure cues |
| `economy-audio-event-adapter-kit` | payment, grant, build and hire outcomes |
| `phase-audio-event-adapter-kit` | day/night transition cues |
| `outcome-audio-event-adapter-kit` | run failure and outcome cues |
| `orchard-ambience-audio-kit` | bounded day/night ambience lifecycle |
| `audio-listener-spatial-projection-kit` | player/listener and optional world-source transforms |
| `audio-preference-bus-kit` | master, UI, effects and ambience preferences |
| `audio-cue-deduplication-kit` | event/revision-based duplicate suppression |
| `audio-voice-pool-budget-kit` | priority, pooling and maximum concurrent voices |
| `audio-projection-result-kit` | played, suppressed, muted, stale, rejected and failed results |
| `audio-lifecycle-settlement-kit` | pause, blur, visibility, pagehide and route retirement |
| `audio-browser-parity-fixture-kit` | unlock, cue, lifecycle, source/dist/Pages and audiovisual convergence proof |

## Required command boundary

```txt
AudioProjectionAdmissionCommand
  -> bind document, route, runtime, frame, event and policy revisions
  -> observe capability and accepted gesture unlock
  -> consume accepted semantic command/state results
  -> resolve interface, collection, combat, economy, phase, outcome and ambience cues
  -> reject stale, duplicate, muted, suspended or retired work
  -> enforce preferences, priorities, pooling and voice budgets
  -> settle pause, blur, visibility, pagehide and route lifecycle
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Validation boundary

Documentation only. Runtime JavaScript, gameplay, HTML, Canvas2D, pressure, economy, audio behavior, packages, tests, build and deployment remain unchanged.