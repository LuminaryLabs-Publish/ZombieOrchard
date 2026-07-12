# START HERE: ZombieOrchard

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Updated:** `2026-07-12T04-38-12-04-00`

## Summary

`ZombieOrchard` is a dependency-free orchard survival/economy shell built from a mutable kit runtime, 12 interface domains, gameplay services, canvas and HTML projection, diagnostics, Node smoke proof, static build, and Pages deployment.

The current audit isolates frame-publication fault containment. Runtime commands and ticks mutate durable owners before synchronously notifying subscribers. A throwing subscriber can therefore make an accepted command throw after mutation, or abort a browser frame before either renderer runs. Because `draw()` schedules the next RAF only after tick and both renderers complete, one subscriber or renderer exception can permanently stop the game loop.

## Plan ledger

**Goal:** preserve committed command results and browser-loop liveness when a subscriber or renderer fails, while producing typed delivery, render, recovery, and frame receipts.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Detect newer unsynchronized repo-local work in `HorrorCorridor` and `PhantomCommand` and avoid overwriting it.
- [x] Select only `ZombieOrchard` as the next-oldest stable eligible repository.
- [x] Trace command mutation, tick mutation, snapshot creation, subscriber delivery, canvas rendering, HTML rendering, RAF scheduling, public host access, and smoke proof.
- [x] Identify the interaction loop, all domains, all 27 implemented kits, and offered services.
- [x] Confirm subscriber exceptions escape after mutation.
- [x] Confirm tick, notification, or renderer exceptions prevent the next RAF from being scheduled.
- [x] Define publication, observer, render-stage, scheduling, recovery, observation, and fixture contracts.
- [x] Refresh required root `.agent` documents and kit registry.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fault-containment fixtures remain future work.

## Current interaction loop

```txt
module boot
  -> create mutable engine graph
  -> create world and HTML renderers
  -> expose raw engine through window.GameHost
  -> start draw()

public observer
  -> GameHost.engine.subscribe(listener)

command
  -> domain.command mutates state
  -> notify() snapshots and invokes listeners synchronously
  -> listener may throw
  -> mutation remains, typed command result never returns

browser frame
  -> engine.tick mutates clock and domains
  -> notify() invokes listeners synchronously
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> requestAnimationFrame(draw)

failure
  -> any tick, listener, world-render, or UI-render exception escapes
  -> next RAF is not scheduled
  -> visible frame and public state can remain behind committed simulation
```

## Current ledge

```txt
ZombieOrchard Frame Publication Fault Containment Authority
+ Observer Delivery Isolation
+ Command Result Preservation
+ Render-Stage Results
+ RAF Liveness and Recovery
+ Browser Fault Fixture Gate
```

## Domains and services

```txt
browser module boot, DOM ownership, recursive RAF, and global host
runtime registration, commands, ticks, events, snapshots, subscriptions, and publication
12 interface-screen domains and interface composition
resources, pressure, orchard, construction, roster, inventory, and active-session gameplay
canvas world projection and per-frame HTML projection
observer delivery, render-stage classification, scheduling, recovery, and bounded fault observation
Node smoke, static build, Pages deployment, and central audit tracking
```

Implemented services remain provided by 27 kits covering runtime composition, interface routing, orchard/economy/survival state, canvas/HTML rendering, diagnostics, smoke proof, static build, and Pages deployment.

## Read this pass first

```txt
.agent/trackers/2026-07-12T04-38-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T04-38-12-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T04-38-12-04-00-frame-publication-fault-containment-dsk-map.md
.agent/render-audit/2026-07-12T04-38-12-04-00-simulation-publication-render-liveness-gap.md
.agent/gameplay-audit/2026-07-12T04-38-12-04-00-subscriber-render-exception-stalls-game-loop.md
.agent/interaction-audit/2026-07-12T04-38-12-04-00-command-notify-result-fault-map.md
.agent/frame-cycle-audit/2026-07-12T04-38-12-04-00-observer-render-schedule-failure-contract.md
.agent/deploy-audit/2026-07-12T04-38-12-04-00-frame-loop-fault-fixture-gate.md
```

## Retained prerequisite audits

```txt
runtime session instance:        2026-07-11T18-28-40-04-00
route-scoped simulation:         2026-07-11T21-40-49-04-00
public capability gateway:       2026-07-11T23-41-55-04-00
composite command transaction:   2026-07-11T23-48-14-04-00
player-control reachability:     2026-07-12T01-30-07-04-00
fixed-step clock authority:      2026-07-12T03-11-51-04-00
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not allow observer failure to rewrite an already committed command result.
Do not treat a scheduled callback as proof that a visible frame committed.
Do not silently continue after a critical simulation-stage failure without an explicit recovery policy.
Do not claim frame-loop liveness until subscriber and renderer fault fixtures pass.
```
