# Project breakdown: ZombieOrchard runtime event lifecycle

**Timestamp:** `2026-07-13T01-18-20-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `runtime-event-lifecycle-publication-authority-audited`

## Summary

ZombieOrchard was selected by the oldest-eligible rule. The runtime offers `ctx.emit()` but has no event publication authority: command events accumulate in a mutable array, normal snapshots never include them, and the next tick erases them before rendering.

## Plan ledger

**Goal:** document the full project and define a DSK boundary that makes events ordered, immutable, retained and consumable.

- [x] Compare the full Publish inventory against the central ledger.
- [x] Exclude Cavalry of Rome.
- [x] Select one repository only.
- [x] Identify the complete interaction loop.
- [x] Identify all domains.
- [x] Identify all implemented kits and services.
- [x] Trace event emission, retention, publication and rendering.
- [x] Add required root and timestamped audit files.
- [x] Update central tracking.
- [ ] Implement runtime event authority and fixtures.

## Selection

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

## Interaction loop

```txt
browser click
  -> engine.command(...)
  -> scoped interface domain may call ctx.emit(...)
  -> domain state mutates
  -> notify publishes domain snapshots only

between commands
  -> events accumulate in mutable ctx.events
  -> no event ID, sequence or command correlation

next RAF
  -> engine.tick(1 / 60)
  -> ctx.events.length = 0
  -> command events are erased
  -> canvas and HTML render event-free snapshots
```

## Domains

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime commands, ticks, snapshots, subscriptions, event emission and buffering
11 generic interface domains plus active-session
interface composition and routing
resource ledger, pressure field and orchard world
construction, roster and inventory
movement, phases, pest lifecycle, score, damage and failure
canvas and HTML projection
Node smoke, static build, Pages deployment and central tracking
```

## Kits and services

The repository retains 27 implemented kit surfaces: 19 engine-installed kits and 8 host/support kits. Services cover runtime registration and publication; scoped interface actions and event emission; entry, setup, active-session, pause, construction, market, roster, inventory, codex, settings and outcome screens; composition; resources; pressure; orchard generation and collection; construction; hiring; equipment; canvas/HTML rendering; public diagnostics; smoke proof; static build and Pages deployment.

## Required parent domain

`zombie-orchard-runtime-event-lifecycle-publication-authority-domain`

## Required flow

```txt
accepted command or tick
  -> allocate command/tick provenance
  -> allocate EventId and monotonic EventSequence
  -> freeze payload
  -> append to bounded event journal
  -> commit state and terminal result
  -> publish immutable snapshot with event range
  -> advance consumer cursors
  -> acknowledge, expire or dead-letter explicitly
  -> publish first matching event-driven frame acknowledgement
```

## Proof boundary

Documentation only. Runtime event correctness is not implemented or proven.
