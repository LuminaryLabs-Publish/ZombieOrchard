# ZombieOrchard project breakdown: pressure threshold and gameplay adoption authority

**Timestamp:** `2026-07-16T03-41-28-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `pressure-threshold-gameplay-adoption-authority-audited`

## Summary

ZombieOrchard owns two continuously changing pressure channels, `rowPressure` and `curse`. The pressure domain grows both values each tick and collection adds more `rowPressure`, but active-session simulation does not read the pressure snapshot. Pest spawn probability, pest movement speed, contact damage, phase transitions, player failure and outcome routing are fixed independently from both channels. The HUD displays `rowPressure`; `curse` has no visible or gameplay consumer.

## Plan ledger

**Goal:** give every accepted pressure revision one versioned evaluation path that produces an authored gameplay effect or explicit no-effect result, preserves deterministic replay and is acknowledged by the matching UI/world frame.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all eligible repositories retain root `.agent` state through synchronized documented heads.
- [x] Compare every eligible current `main` head with its documented repo-local head.
- [x] Select only ZombieOrchard by the oldest synchronized central timestamp.
- [x] Trace browser boot, runtime creation, pressure initialization, pressure ticking, collection writes, active-session simulation, route/outcome composition, rendering, smoke coverage, build and deployment.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits and every offered service.
- [x] Define one pressure-adoption parent domain with 17 coordinating surfaces.
- [x] Add a new timestamped tracker and audit family.
- [ ] Implement pressure policy and execute gameplay, replay, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states preserved by synchronized heads: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0

ZombieOrchard      2026-07-15T22-40-29-04-00  selected
TheUnmappedHouse   2026-07-15T23-00-03-04-00  next oldest
PhantomCommand     2026-07-16T00-00-40-04-00
AetherVale         2026-07-16T00-26-16-04-00
TheLongHaul        2026-07-16T00-38-29-04-00
MyCozyIsland       2026-07-16T00-59-16-04-00
IntoTheMeadow      2026-07-16T01-38-56-04-00
PrehistoricRush    2026-07-16T02-03-42-04-00
HorrorCorridor     2026-07-16T02-40-29-04-00
TheOpenAbove       2026-07-16T03-03-22-04-00
```

## Complete interaction loop

```txt
page load
  -> create pressure-field with rowPressure=0 and curse=4
  -> create orchard, session, route and renderer domains
  -> start one fixed 1/60 tick per RAF callback

every runtime tick
  -> pressure-field adds dt*0.8 to rowPressure
  -> pressure-field adds dt*0.2 to curse
  -> active-session advances pests independently
  -> pest spawn chance remains dt*0.55
  -> pest movement speed remains 36 units/sec
  -> contact damage remains 7 condition/sec

collect
  -> orchard removes and replaces an apple
  -> resource ledger grants apples and money
  -> pressure-field adds 0.5 or 2 to rowPressure
  -> active-session score/message changes
  -> no pressure-effect evaluation occurs

projection
  -> HTML displays rounded rowPressure
  -> HTML omits curse and active-effect semantics
  -> Canvas2D renders player, trees, apples and pests
  -> no pressure-effect frame acknowledgement exists

terminal path
  -> outcome routing occurs only when player condition reaches zero
  -> no rowPressure or curse threshold participates
```

## Domains in use

```txt
browser document, RAF, click input, focus, visibility and page lifecycle
kit registration, command dispatch, ticking, events, snapshots and subscriptions
interface route identity and active-screen projection
resource ledger and economy mutation
pressure channel state, growth, adjustment and snapshot projection
orchard world generation, apple collection and refill
active-session movement, collection, phase, pest, damage, score and outcome
construction, roster and inventory runtime state
pressure policy, threshold evaluation and gameplay consumer adoption
Canvas2D world rendering and HTML command/HUD rendering
public GameHost diagnostics
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned pressure-adoption surfaces: 18
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, ticking, events, snapshots and subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events and snapshots |
| `entry-domain-kit` | Play, New Game and Settings |
| `session-select-domain-kit` | Save Select projection and Back |
| `run-setup-domain-kit` | run setup projection, Start and Back |
| `active-session-domain-kit` | movement, collection, phase changes, fixed-rate pest spawning and movement, fixed-rate contact damage, clearing, score and failure |
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
| `pressure-field-kit` | rowPressure and curse channel state, clamped adjustment, fixed time growth, commands and snapshots |
| `orchard-world-kit` | tree generation, ambient-random apple generation and refill, collection, bounds and snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages and snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages and snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and world projection |
| `html-interface-render-kit` | delegated gameplay and route commands, HTML projection and card rendering |
| `game-host-diagnostics-kit` | raw engine exposure, state readback and manual ticking |
| `smoke-fixture-kit` | entry, direct Play and orchard apple assertions |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed findings

```txt
pressure channels: rowPressure, curse
initial values: rowPressure=0, curse=4
automatic growth: rowPressure +0.8/sec, curse +0.2/sec
collection adjustment: rowPressure +0.5 red / +2 gold
pressure snapshot: present
active-session pressure lookup: absent
pest spawn formula: Math.random() < dt*0.55
pest movement speed: dt*36
contact damage: dt*7
pressure threshold policy: absent
pressure effect event/result: absent
rowPressure HUD projection: present
curse HUD projection: absent
pressure-linked outcome: absent
pressure gameplay fixture count: 0
```

## Main finding

The game owns pressure state but not pressure consequence. `pressure-field-kit` produces accepted, bounded channel values and collection mutates one channel, yet the gameplay domain never consumes the resulting snapshot. The visible `rowPressure` number therefore communicates rising risk without a source-backed rule that changes spawn, movement, damage, phase, eligibility, failure or outcome. `curse` is neither visible nor consumed.

This is a source-backed gameplay-adoption and evidence gap. It does not claim that pressure must use any particular balance curve. The missing authority is the versioned policy and result boundary that would make authored pressure effects explicit, deterministic and testable.

## Required parent domain

`zombie-orchard-pressure-threshold-gameplay-adoption-authority-domain`

## Planned surfaces

| Surface | Service |
|---|---|
| `zombie-orchard-pressure-threshold-gameplay-adoption-authority-domain` | parent pressure policy, evaluation, effect adoption and frame acknowledgement |
| `pressure-channel-schema-kit` | channel IDs, units, ranges, defaults and compatibility version |
| `pressure-snapshot-revision-kit` | immutable channel snapshot and monotonic revision |
| `pressure-threshold-policy-kit` | authored thresholds, bands, modifiers and hysteresis |
| `pressure-effect-evaluation-kit` | evaluate expected pressure/session/phase revisions |
| `pressure-threshold-crossing-kit` | enter, exit and sustained-band identity with deduplication |
| `phase-pressure-modifier-kit` | explicit day/night policy participation |
| `collection-pressure-consequence-kit` | typed consequence of collection-side pressure writes |
| `pest-spawn-pressure-consumer-kit` | authored spawn-rate consumer |
| `pest-motion-pressure-consumer-kit` | authored pest-motion consumer |
| `pest-damage-pressure-consumer-kit` | authored contact-damage consumer |
| `curse-effect-consumer-kit` | authored curse effect or explicit non-gameplay classification |
| `pressure-outcome-gate-kit` | optional threshold eligibility and terminal policy |
| `pressure-effect-result-kit` | applied, unchanged, rejected and stale result envelope |
| `pressure-feedback-projection-kit` | bounded HUD/read-model projection of channels and active effects |
| `pressure-effect-frame-ack-kit` | first world/HUD frame bound to accepted effect revision |
| `pressure-gameplay-fixture-kit` | low, boundary, high, crossing, reset, restore and replay proof |
| `pressure-pages-parity-fixture-kit` | source, dist and deployed-origin parity proof |

## Required command boundary

```txt
PressureEffectEvaluationCommand
  -> bind PressureRevision, SessionRevision, PhaseRevision and PolicyVersion
  -> validate registered pressure consumers
  -> evaluate thresholds and modifiers exactly once
  -> publish PressureEffectEvaluationResult
  -> return an explicit unchanged result when no policy applies

PressureEffectAdoptionCommand
  -> bind the accepted evaluation and expected gameplay revision
  -> atomically apply authored effects in owning domains
  -> reject stale, duplicate or incompatible evaluations
  -> publish PressureEffectAdoptionResult

PressureFeedbackProjectionCommand
  -> bind pressure, effect, route and visible-frame revisions
  -> project both channel state and active effects
  -> publish FirstPressureEffectFrameAck
```

## Validation boundary

Documentation only. No pressure policy, threshold, pest behavior, damage, phase, outcome, HTML, Canvas2D, test, build, deployment or readiness behavior changed.
