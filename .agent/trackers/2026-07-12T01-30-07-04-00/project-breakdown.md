# Project breakdown: ZombieOrchard player-control reachability

## Plan ledger

**Goal:** make the implemented player-movement service reachable through one route-aware browser input path with explicit focus, held-key retirement, command results, observations and browser proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible entry.
- [x] Identify the interaction loop, domains, 27 implemented kits and their services.
- [x] Trace browser boot, delegated controls, active-session commands and canvas projection.
- [x] Define the missing player-control authority and fixture gate.
- [x] Update documentation only on `main`; create no branch or pull request.
- [ ] Implement and validate the control path.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing: 0
root-.agent-missing: 0

ZombieOrchard      2026-07-11T23-48-14-04-00 selected
TheUnmappedHouse   2026-07-12T00-01-25-04-00
AetherVale         2026-07-12T00-10-23-04-00
MyCozyIsland       2026-07-12T00-20-01-04-00
PrehistoricRush    2026-07-12T00-30-49-04-00
TheOpenAbove       2026-07-12T00-39-05-04-00
IntoTheMeadow      2026-07-12T00-58-12-04-00
HorrorCorridor     2026-07-12T01-08-06-04-00
PhantomCommand     2026-07-12T01-20-00-04-00
TheCavalryOfRome   excluded
```

## Product interaction loop

```txt
module boot
  -> create one mutable game graph
  -> create canvas and HTML renderers
  -> publish GameHost
  -> start recursive RAF

RAF
  -> engine.tick(1 / 60)
  -> snapshot all domains
  -> render world canvas
  -> replace active-route HTML

browser interaction
  -> delegated click on data-action or data-command
  -> menu/route actions, Collect, Clear or Next Phase
  -> no keyboard, pointer-direction or touch movement adapter

implemented but unreachable movement
  -> active-session.command("move", { x, y })
  -> add 22 units per command and clamp to orchard bounds
  -> no shipped product control calls this command
```

## Main finding

The active-session domain implements a valid movement command, but the browser product has no binding that can issue it. `start.js` installs no input listeners. The HTML renderer binds only delegated clicks and exposes Collect, Clear, Next Phase and route actions. The world canvas is render-only.

The player therefore starts at `{ x: 0, y: 180 }` and remains there during normal play. Apple collection is limited to randomly seeded apples already within 42 units of that point. Orchard exploration is not reliably reachable, and the visible player marker has no corresponding movement control contract.

## Domains in use

```txt
browser boot, DOM and recursive RAF
mutable kit runtime, command, tick, snapshot and subscription routing
runtime/session, fixed-step and route admission authorities: missing
player-control reachability authority: missing
12 interface-screen domains and composition
resources, pressure, orchard world and random spawning
construction, roster and inventory
active-session movement, collection, clearing, phases, pests and failure
canvas and HTML rendering
public diagnostics, smoke proof, static build and Pages deployment
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

## Offered services

| Group | Services |
|---|---|
| runtime | registration, domain creation, command dispatch, clamped ticks, events, snapshots, subscriptions and publication |
| interface | screen state, actions, activation, routing, nested dispatch and Outcome routing |
| game | resources, pressure, trees, apples, collection, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | orchard canvas, HUD, route screens, cards, delegated button bindings and per-frame DOM replacement |
| proof/deploy | raw host readback, manual stepping, Node smoke, static copy and Pages deployment |

## Required authority

```txt
zombie-orchard-player-control-reachability-authority-domain
  -> control-binding-manifest-kit
  -> browser-keyboard-input-adapter-kit
  -> held-control-state-kit
  -> movement-intent-kit
  -> movement-vector-normalization-kit
  -> route-focus-control-lease-kit
  -> movement-command-admission-kit
  -> input-retirement-kit
  -> movement-command-result-kit
  -> control-observation-kit
  -> movement-frame-receipt-kit
  -> player-control-fixture-kit
  -> browser-player-control-smoke-kit
```

## Required control path

```txt
keyboard/touch intent
  -> normalize binding and movement vector
  -> verify runtime, run, route, focus and control lease
  -> submit movement through the canonical command path
  -> apply movement once per admitted simulation step
  -> publish typed result and state revision
  -> render and acknowledge the first matching canvas/HTML frame
  -> clear held input on blur, route exit, reset, failure and disposal
```
