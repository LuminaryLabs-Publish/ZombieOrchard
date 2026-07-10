# Architecture audit: deterministic scenario observation DSK map

Timestamp: `2026-07-10T17-18-47-04-00`

## Active composition

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> src/game.js
  -> createKitRuntime(kits)
  -> world canvas + HTML renderer
  -> GameHost raw engine/snapshot/tick exposure
```

## Current DSK/domain map

| Domain | Current owner | Services | Deterministic observation gap |
| --- | --- | --- | --- |
| Runtime | `src/kits/runtime.js` | register kits, command, tick, events, snapshot, notify | no command IDs, no durable command/event journal, no committed-frame record |
| Interface source | `src/presets/orchard-preset.js` | screen actions, transitions, initial gameplay configuration | no source revision or scenario identity |
| Scoped interface | `src/kits/scoped-interface-domains.js` | select, set fields, activate actions, snapshots | no activation sequence or source fingerprint |
| Composition | `src/kits/composition.js` | transition, back, parent activation, child dispatch, outcome routing | nested child result discarded; no command/frame correlation |
| Resources | `src/kits/game-domains.js` | canPay, pay, add, snapshot | boolean mutations only; no transaction row |
| Pressure | `src/kits/game-domains.js` | adjust, passive tick, snapshot | no input/tick attribution |
| Orchard world | `src/kits/game-domains.js` | generate trees/apples, collect, replenish | direct `Math.random()`; no seed, draw index, or replay input |
| Active session | `src/kits/game-domains.js` | move, collect, clear, phase, spawn/pursue pests, damage, score, failure | direct `Math.random()` in spawn angle, IDs, and tick decisions |
| Construction | `src/kits/game-domains.js` | build lookup, payment, placement, status | no command or transaction correlation |
| Roster | `src/kits/game-domains.js` | hire payment and actor creation | no command or transaction correlation |
| Inventory | `src/kits/game-domains.js` | equip and snapshot | no intake/transaction/replay row |
| World renderer | `src/renderer/world-canvas.js` | canvas sizing and scene drawing | no frame ID or consumed snapshot fingerprint |
| HTML renderer | `src/renderer/html-interface-renderer.js` | event binding, HUD, screen projection | no consumed frame/result row; full DOM replaced per frame |
| GameHost | `src/start.js` | raw engine, snapshot, manual tick | mutable engine exposure; no bounded immutable scenario observation |
| Smoke fixture | `tests/smoke.mjs` | entry, play transition, apple presence | no seed, command sequence, replay, or fingerprint parity |
| Pages deploy | `.github/workflows/deploy-pages.yml` | test, build, artifact, deploy | gate depends on a reachability-only smoke test |

## Current authority split

```txt
Random authority
  orchard-world -> Math.random()
  active-session -> Math.random()

Command authority
  kit-runtime -> dispatches and returns result
  composition -> can dispatch nested command but drops result

Frame authority
  start.js -> fixed 1/60 requestAnimationFrame loop
  runtime -> increments frame before domain ticks
  renderers -> consume aggregate snapshot after tick

Observation authority
  runtime snapshot -> domain snapshots only
  events -> ephemeral and omitted
  renderers -> no consumption records
  GameHost -> raw engine and live snapshot calls
```

No single owner can currently answer:

```txt
which seed produced this state
which random draws were consumed
which commands ran in which order
which command result caused each mutation
which events belonged to the committed frame
which snapshot the renderers consumed
whether a replay produced the same fingerprint
```

## Required contract chain

```txt
ScenarioConfig
  seed
  fixedDelta
  initialStateRevision
  presetRevision

RandomDrawRow
  drawIndex
  streamId
  value
  frame
  sourceDomain

CommandObservationRow
  commandId
  parentActivationId
  requestedFrame
  completedFrame
  domainId
  type
  payloadFingerprint
  accepted
  reason

CommittedFrameRow
  frame
  elapsed
  delta
  commandRange
  eventRange
  stateFingerprint

RenderConsumptionRow
  rendererId
  frame
  stateFingerprint
  projectionFingerprint

ScenarioObservation
  config
  commands
  frames
  renderConsumption
  finalFingerprint
```

## Domain-update-first recommendation

Update existing owners first:

1. `kit-runtime` — inject scenario services, sequence commands, retain bounded command/event/frame journals.
2. `orchard-world-kit` — consume a named random stream instead of `Math.random()`.
3. `active-session-domain-kit` — consume named random streams for spawn decisions, angles, and IDs.
4. `interface-composition-kit` — retain nested child results and correlation IDs.
5. `world-canvas-render-kit` — record consumed frame and snapshot fingerprint.
6. `html-interface-render-kit` — record consumed frame/projection fingerprint.
7. `game-host-diagnostics-kit` — return immutable JSON-safe scenario observations without exposing mutable authority as proof.
8. `smoke-fixture-kit` — replay the same scenario twice and compare fingerprints.

New kits are justified only for capabilities without a current owner:

```txt
deterministic-random-source-kit
scenario-fixture-adapter-kit
state-fingerprint-kit
```

## Architecture conclusion

The repository does not need a new engine architecture. It needs one cross-domain deterministic scenario contract layered through the existing kit owners. Market transaction causality should then be implemented as a scenario exercised by that proof surface, not as a separate unrepeatable test path.