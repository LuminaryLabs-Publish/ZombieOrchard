# Current audit: ZombieOrchard

**Timestamp:** `2026-07-13T01-18-20-04-00`  
**Status:** `runtime-event-lifecycle-publication-authority-audited`  
**Branch:** `main`

## Summary

`ctx.emit()` appends mutable records to one ambient `ctx.events` array. The runtime does not include the array in `engine.snapshot()`, subscriber publication or public state readback. Commands do not clear the buffer, so records from multiple commands can mix. The next tick clears the entire buffer before domain ticks and before both renderers consume their snapshot.

The result is a write-mostly event service with no durable identity, causal provenance, retention result or consumer contract.

## Plan ledger

**Goal:** define one event lifecycle from emission through immutable publication, consumer acknowledgement and visible-frame correlation.

- [x] Compare current Publish inventory and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard as the oldest eligible repository.
- [x] Read `runtime.js`, `scoped-interface-domains.js`, `composition.js`, `start.js`, both renderers and existing audit state.
- [x] Confirm interface selection, field and action commands call `ctx.emit()`.
- [x] Confirm command events persist until the next tick.
- [x] Confirm tick clears events before domain ticks.
- [x] Confirm snapshots, subscribers, renderers and `GameHost.getState()` omit events.
- [x] Confirm raw `GameHost.engine.ctx.events` remains mutable.
- [x] Preserve 27 implemented kits and offered services.
- [x] Add and route this audit family.
- [ ] Implement and execute event-lifecycle fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-12T23-00-53-04-00  selected
MyCozyIsland       2026-07-12T23-08-37-04-00
TheUnmappedHouse   2026-07-12T23-20-51-04-00
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
IntoTheMeadow      2026-07-13T00-18-48-04-00
PhantomCommand     2026-07-13T00-40-00-04-00
PrehistoricRush    2026-07-13T00-58-50-04-00
HorrorCorridor     2026-07-13T01-08-28-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was modified in the Publish organization.

## Complete interaction loop

```txt
browser interaction
  -> delegated click calls engine.command(...)
  -> scoped interface domain may call ctx.emit(...)
  -> command mutates domain state
  -> runtime notify publishes only domain snapshots

between commands
  -> emitted records accumulate in mutable ctx.events
  -> records share the current frame and elapsed values
  -> no event ID, sequence, command ID or consumer cursor exists

next RAF
  -> engine.tick(1 / 60)
  -> ctx.events.length = 0 before domain ticks
  -> command-originated events are erased
  -> renderers receive engine.snapshot(), which never contains ctx.events

public diagnostics
  -> GameHost.getState() returns only engine.snapshot()
  -> raw GameHost.engine.ctx.events is the only direct event readback
  -> external code can mutate or clear the live buffer
```

## Source-backed findings

- `src/kits/runtime.js` creates `{type, payload, frame, elapsed}` event objects and appends them to `ctx.events`.
- `engine.command()` calls the domain and publishes a domain snapshot without clearing or exposing the event buffer.
- `engine.tick()` clears `ctx.events` before ticking domains, then publishes a snapshot that still omits events.
- `engine.snapshot()` is built only from registered domain snapshots.
- `src/kits/scoped-interface-domains.js` emits selection, field-change and action-request events.
- `src/kits/composition.js` can directly activate a child domain and then invoke a nested engine command, but emitted records have no command identity or causal chain.
- `src/start.js` renders only the snapshot returned by `engine.tick()`, after command-originated events have been cleared.
- `window.GameHost.getState()` also returns only `engine.snapshot()`, while the raw engine exposes the mutable live context.
- Existing smoke proof has no event assertion.

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, snapshots, subscriptions, event emission and event buffering
11 generic scoped interface domains plus custom active-session
interface composition, nested dispatch, routing and automatic Outcome routing
resource ledger and pressure field
orchard generation, apple collection and refill
construction, roster and inventory
movement, phases, pest lifecycle, score, damage and failure
canvas world and HTML interface projection
Node smoke, static build, Pages deployment and central tracking
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `kit-runtime` | Kit registration, domain creation, command dispatch, delta clamp, ticks, event emission, mutable event buffering, snapshots, subscriptions and synchronous publication |
| `scoped-interface-domain-kit` | Screen state, field mutation, selection, action activation, event emission and interface snapshots |
| `entry-domain-kit` | Play, New Game and Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Movement, collection, phase changes, pest lifecycle, score, damage and failure |
| `interrupt-domain-kit` | Pause, Resume and Title |
| `construction-domain-kit` | Construction screen, build routing and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Route transitions, Back, nested dispatch and Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants and snapshots |
| `pressure-field-kit` | Pressure adjustment, ticking and snapshots |
| `orchard-world-kit` | Tree/apple generation, collection, refill and snapshots |
| `construction-runtime-kit` | Catalog, payment, placement and snapshots |
| `roster-runtime-kit` | Payment, hiring and snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas projection of trees, apples, player, pests and built objects |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards and Outcome |
| `game-host-diagnostics-kit` | Raw engine exposure, snapshot readback and manual tick |
| `smoke-fixture-kit` | Entry, Play and apple assertions |
| `static-build-copy-kit` | Static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

## Required composed domain

`zombie-orchard-runtime-event-lifecycle-publication-authority-domain`

## Required transaction

```txt
accepted command or tick
  -> allocate command/tick provenance
  -> allocate monotonic EventId and EventSequence per emitted record
  -> clone or freeze payload at emission
  -> append to a bounded event journal
  -> define retention and overflow policy
  -> commit domain state and terminal command/tick result
  -> publish one immutable snapshot envelope with an event range
  -> advance identified consumer cursors
  -> acknowledge, retry or dead-letter delivery under explicit policy
  -> render one admitted event-aware frame when presentation consumes an event
  -> publish FirstEventFrameAck
```

## Runtime non-claims

No runtime source, gameplay behavior, renderer, package script or deployment configuration changed. No event retention, immutable delivery, causal order, overflow handling, consumer acknowledgement, replay safety or event-to-frame parity claim is made.
