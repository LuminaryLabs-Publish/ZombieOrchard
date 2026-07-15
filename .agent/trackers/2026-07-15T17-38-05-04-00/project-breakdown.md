# ZombieOrchard project breakdown: player movement control coverage

**Timestamp:** `2026-07-15T17-38-05-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `player-movement-action-coverage-authority-audited`

## Summary

The active session implements a `move` command and renders the player's changing position, but the browser host supplies no keyboard, pointer, touch, gamepad, or on-screen movement producer. The visible command surface exposes Collect, Clear, Next Phase, and route actions only, so players cannot intentionally approach apples or pests before using the proximity-gated actions.

## Plan ledger

**Goal:** give every supported device profile a complete, lifecycle-safe movement action path from physical input through accepted player-position state and the first matching Canvas2D frame.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all eligible repositories have root `.agent` state and synchronized documented heads.
- [x] Select only ZombieOrchard by the oldest synchronized central timestamp.
- [x] Trace browser boot, HTML command delegation, active-session commands, proximity interactions, Canvas2D rendering, smoke coverage, build, deployment, and central tracking.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits, and every offered service.
- [x] Define the missing player-movement control authority and 19 coordinating surfaces.
- [x] Add a new timestamped tracker and audit family.
- [ ] Implement movement producers and execute keyboard, pointer/touch, gamepad, lifecycle, build, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0

ZombieOrchard      2026-07-15T12-39-01-04-00  selected
TheUnmappedHouse   2026-07-15T12-59-24-04-00  next oldest
PhantomCommand     2026-07-15T13-41-25-04-00
AetherVale         2026-07-15T14-01-52-04-00
TheLongHaul        2026-07-15T14-40-11-04-00
MyCozyIsland       2026-07-15T15-01-22-04-00
IntoTheMeadow      2026-07-15T15-41-21-04-00
PrehistoricRush    2026-07-15T16-00-32-04-00
HorrorCorridor     2026-07-15T16-39-06-04-00
TheOpenAbove       2026-07-15T16-58-19-04-00
```

## Complete interaction loop

```txt
page load
  -> create resource, pressure, orchard, construction, roster, inventory, interface, active-session, and composition domains
  -> create Canvas2D and HTML renderers
  -> start one fixed 1/60 tick per RAF callback

active-session frame
  -> runtime ticks gameplay
  -> Canvas2D draws trees, apples, pests, and player position
  -> HTML draws Collect, Clear, Next Phase, and six route actions

visible interaction
  -> click data-command button
  -> HTML renderer submits collect, clear, or next-phase
  -> click data-action button
  -> interface composition submits a route action

movement path
  -> active-session supports command(type = move, payload = {x, y})
  -> each accepted command moves 22 world units and clamps to orchard bounds
  -> no keydown, keyup, pointer, touch, gamepad, joystick, D-pad, or directional-button producer submits move
  -> player remains at the initial position unless external code calls GameHost.engine or GameHost.tick/command surfaces

proximity gameplay
  -> collect requires an apple within radius 42
  -> clear requires a pest within distance 58
  -> without intentional movement, proximity gameplay depends on incidental spawn placement or external mutation
```

## Domains in use

```txt
browser document, RAF, click delegation, focus, visibility, and page lifecycle
input-device capability, action maps, control profiles, held-action state, and cancellation
kit registration, command dispatch, ticking, events, snapshots, and subscriptions
interface route identity and active-screen projection
resource ledger, pressure field, orchard world, construction, roster, and inventory
active-session player movement, collection, phase, pest, damage, score, and outcome
proximity eligibility for apples and pests
Canvas2D world rendering and HTML command rendering
public GameHost diagnostics
smoke validation, static build, Pages deployment, repo-local audit, and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned player-control surfaces: 19
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, commands, delta clamping, ticking, events, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, fields, selection, actions, events, snapshots |
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
| `interface-composition-kit` | route transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants, snapshots |
| `pressure-field-kit` | pressure adjustment, time growth, snapshots |
| `orchard-world-kit` | tree/apple generation, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages, snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages, snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and world projection |
| `html-interface-render-kit` | delegated route and gameplay commands, HTML projection, cards |
| `game-host-diagnostics-kit` | raw engine exposure, readback, manual ticking |
| `smoke-fixture-kit` | entry, direct Play, orchard-apple assertions |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed findings

```txt
active-session move command: present
movement delta per command: 22 world units
movement bounds: x -360..360, y -280..280
collect eligibility radius: 42
clear eligibility distance: 58
HTML gameplay buttons: Collect, Clear, Next Phase
HTML directional controls: 0
browser keyboard movement listeners: 0
pointer or touch movement producers: 0
gamepad movement producers: 0
on-screen joystick or D-pad: 0
movement action map: absent
held-action cancellation: absent
player position revision: absent
movement result receipt: absent
FirstPlayerMovementFrameAck: absent
movement smoke assertions: 0
```

## Main finding

The product contains a movement consumer without a player-facing movement producer. `active-session` accepts `move` and the Canvas2D renderer displays the resulting position, but `start.js` installs no input listeners and the HTML renderer exposes no directional controls. Collect and Clear are proximity-gated, so the authored harvesting and pest-clearing loop cannot be intentionally navigated through the shipped UI.

This is a source-backed control-coverage gap. It does not claim that random apple placement can never put an apple near the initial player position or that external diagnostic code cannot submit a move command.

## Required parent domain

`zombie-orchard-player-movement-control-action-coverage-authority-domain`

## Planned surfaces

| Surface | Service |
|---|---|
| `zombie-orchard-player-movement-control-action-coverage-authority-domain` | parent composition and settlement authority |
| `movement-action-schema-kit` | normalized move vector and action vocabulary |
| `device-capability-observation-kit` | keyboard, pointer, touch, and gamepad capability snapshot |
| `keyboard-movement-producer-kit` | WASD and arrow-key action production |
| `pointer-touch-movement-producer-kit` | pointer/touch directional production |
| `gamepad-movement-producer-kit` | analog and digital gamepad production |
| `on-screen-movement-control-kit` | visible D-pad or joystick surface |
| `action-state-normalization-kit` | dead zones, normalization, and conflict policy |
| `held-action-lifecycle-kit` | press, repeat, release, and cancellation state |
| `movement-command-admission-kit` | route- and revision-bound move submission |
| `movement-rate-policy-kit` | time-based movement rate independent of event repeat |
| `focus-overlay-arbitration-kit` | prevent movement while menus or text controls own input |
| `blur-visibility-cancellation-kit` | clear held actions on lifecycle interruption |
| `hybrid-input-deduplication-kit` | suppress duplicate mixed-device actions |
| `player-position-revision-kit` | immutable accepted position revisions |
| `movement-result-kit` | typed accepted/rejected/deferred result |
| `movement-presentation-receipt-kit` | bind simulation and Canvas2D frame revisions |
| `first-player-movement-frame-ack-kit` | first matching visible-frame evidence |
| `movement-control-fixture-kit` | keyboard, touch, gamepad, lifecycle, build, and Pages proof |

## Required command boundary

```txt
PlayerControlAdmissionCommand
  -> bind document, runtime, route, device-capability, action-map, and control-generation revisions
  -> require a complete movement profile for the admitted device set
  -> publish visible on-screen controls when the selected profile needs them
  -> normalize keyboard, pointer, touch, gamepad, and on-screen producers
  -> arbitrate overlays, focus, and hybrid-device conflicts
  -> cancel held actions on blur, hide, route transition, and retirement
  -> submit MovementCommand with expected PlayerPositionRevision
  -> publish MovementResult
  -> publish FirstPlayerMovementFrameAck
```

## Validation boundary

Documentation only. No movement producer, control profile, input lifecycle, time-based movement, browser fixture, artifact parity, Pages parity, or production-readiness claim is made.
