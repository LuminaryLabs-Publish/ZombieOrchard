# START HERE: ZombieOrchard

## Last aligned

```txt
2026-07-11T18-28-40-04-00
```

## Summary

`ZombieOrchard` is a dependency-free static orchard survival and economy shell built from a small kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, smoke proof, static build and Pages deployment.

The current audit establishes the missing runtime-session instance authority. The browser creates one mutable graph before Play, and Play, New Game, Start, Pause, Outcome and Title only change interface routes. After failure, Title returns to Entry without retiring the ended run; Play or Start reuses `ended = true`, and the next tick routes back to Outcome. Resources, pressures, orchard state, construction, roster, inventory, pests, score and player condition also survive.

## Plan ledger

**Goal:** make every orchard run an identified, fresh, atomically committed and disposable authority before adding fixed-step clock, command transaction, seeded replay or persistence work.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Trace module boot, graph creation, routing, terminal failure, Title and restart paths.
- [x] Define runtime/run identity, lifecycle, reset transaction, rollback, first-frame and disposal contracts.
- [x] Add timestamped architecture and system audits.
- [x] Change documentation only on `main` with no branch or pull request.
- [ ] Implement runtime-session authority and lifecycle fixtures.
- [ ] Implement dependent clock, transaction, random/replay and persistence authorities.

## Read this first

```txt
.agent/trackers/2026-07-11T18-28-40-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T18-28-40-04-00-runtime-session-instance-authority-dsk-map.md
.agent/render-audit/2026-07-11T18-28-40-04-00-stale-run-first-frame-projection-gap.md
.agent/gameplay-audit/2026-07-11T18-28-40-04-00-outcome-title-play-reuse-loop.md
.agent/interaction-audit/2026-07-11T18-28-40-04-00-start-new-game-title-lifecycle-map.md
.agent/session-lifecycle-audit/2026-07-11T18-28-40-04-00-run-instance-reset-transaction-contract.md
.agent/deploy-audit/2026-07-11T18-28-40-04-00-fresh-run-lifecycle-fixture-gate.md
.agent/turn-ledger/2026-07-11T18-28-40-04-00.md
.agent/kit-registry.json
```

Retain the seeded-random audit as the later dependency:

```txt
.agent/architecture-audit/2026-07-11T17-01-11-04-00-seeded-random-replay-authority-dsk-map.md
.agent/random-replay-audit/2026-07-11T17-01-11-04-00-seed-stream-cursor-replay-contract.md
```

## Product interaction loop

```txt
module boot
  -> create one mutable engine graph
  -> seed orchard apples
  -> create canvas and HTML renderers
  -> install delegated click listener
  -> start recursive RAF

Play / New Game / Start / Pause / Resume / Title
  -> interface-composition route mutation only
  -> no lifecycle transaction
  -> no new graph or run identity

RAF
  -> engine.tick(1 / 60) on every callback and route
  -> world canvas renders orchard and active-session
  -> HTML renders selected interface route

failure
  -> active-session.ended = true
  -> composition routes to Outcome

Outcome -> Title -> Play
  -> Entry route, then active-session route
  -> same ended graph
  -> next tick routes back to Outcome
```

## Main finding

```txt
visible New Game semantics
  !=
actual route-only behavior
```

There is no `runtimeId`, `runId`, `sessionEpoch`, lifecycle state machine, fresh-run factory, reset transaction, rollback, stale-callback rejection, first-run-frame acknowledgement or ordered disposal.

## Domains in use

```txt
static browser route and ESM boot
runtime and run lifecycle authority: missing
kit registration and mutable graph construction
command, tick, event, snapshot, subscription and publication routing
fixed-step committed tick authority: missing
public capability and composite transaction authority: missing
seeded random stream and replay authority: missing
versioned persistence authority: missing
12 scoped interface-screen domains
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard world, trees, apples and collection refill
construction, roster and inventory runtimes
active-session movement, phases, pests, damage, score and failure
canvas and HTML rendering
GameHost diagnostics
smoke, static build and Pages deployment
```

## Implemented kits

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

## Kit services

| Kit group | Services |
|---|---|
| runtime | registration, domain creation, commands, ticks, events, snapshots, subscriptions and publication |
| interface | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| game | resources, pressure, orchard/apples, collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | orchard canvas, HUD, generic screens, delegated bindings and per-frame DOM projection |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke proof, static copy and Pages chain |

## Required runtime-session domain

```txt
zombie-orchard-runtime-session-authority-domain
  -> runtime-instance-id-kit
  -> run-instance-id-kit
  -> session-epoch-kit
  -> lifecycle-state-machine-kit
  -> fresh-run-state-factory-kit
  -> run-start-command-kit
  -> run-start-admission-kit
  -> run-reset-plan-kit
  -> run-reset-transaction-kit
  -> run-state-commit-kit
  -> route-session-binding-kit
  -> run-end-latch-kit
  -> title-exit-transaction-kit
  -> stale-run-command-rejection-kit
  -> run-snapshot-provenance-kit
  -> first-run-frame-ack-kit
  -> runtime-session-journal-kit
  -> fresh-run-fixture-kit
  -> restart-disposal-fixture-kit
```

## Ordered implementation queue

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / New Game / Outcome / Title / Reset Contract
+ Stale Callback and Command Fence
+ First Fresh Run Frame Acknowledgement
+ Lifecycle and Disposal Fixture Gate
```

Later authorities must consume the committed runtime/run/epoch identity and must not create parallel ownership.