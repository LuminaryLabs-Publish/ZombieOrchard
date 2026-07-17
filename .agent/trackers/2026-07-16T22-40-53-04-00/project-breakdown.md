# ZombieOrchard project breakdown: interactive DOM control stability

**Timestamp:** `2026-07-16T22-40-53-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `interactive-dom-control-stability-focus-authority-audited`

## Summary

ZombieOrchard renders its HTML control surface by assigning `root.innerHTML` on every RAF. The visual labels can remain unchanged while every button node is destroyed and recreated. Root-level event delegation survives, but an in-progress pointer press or keyboard focus has no stable node, route generation, control generation, lease, retirement result, or frame acknowledgement.

## Plan ledger

**Goal:** preserve one admitted control identity from visible presentation through exact activation or explicit retirement.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead repositories.
- [x] Select only ZombieOrchard by the oldest synchronized central timestamp.
- [x] Trace boot, RAF, delegated input, HTML and Canvas projection, domain dispatch, smoke, build, and deployment.
- [x] Identify the complete interaction loop, all active domains, all 27 implemented kits, and every offered service.
- [x] Define one interactive-control parent authority with 18 coordinating surfaces.
- [x] Add a timestamped tracker and focused audit family.
- [ ] Implement stable DOM reconciliation and execute browser, artifact, and Pages fixtures.

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
selected prior timestamp: 2026-07-16T16-40-45-04-00
next oldest: LuminaryLabs-Publish/TheUnmappedHouse
next timestamp: 2026-07-16T16-58-39-04-00
```

## Complete interaction loop

```txt
page load
  -> create kit runtime and 19 engine domains
  -> create Canvas2D world renderer
  -> create delegated HTML interface renderer
  -> expose GameHost diagnostics
  -> start recursive RAF

every frame
  -> engine.tick(1/60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> replace ui-root innerHTML
  -> schedule next RAF

browser control gesture
  -> pointer or keyboard begins on one button node
  -> next frame replaces that node with a visually equivalent node
  -> delegated click may resolve only if browser activation survives replacement
  -> no control-generation result or focus settlement is published

domain command
  -> interface-composition or active-session command
  -> domain mutation and snapshot
  -> next HTML and Canvas frame
```

## Domains in use

```txt
browser document, RAF, DOM, pointer, keyboard and focus lifecycle
kit registration, command dispatch, ticking, events, snapshots and subscriptions
interface route identity, active-screen projection and nested command routing
resource, pressure, orchard, session, construction, roster and inventory truth
Canvas2D world projection
HTML route, HUD, card and command projection
public GameHost diagnostics
interactive control identity, reconciliation, press/focus ownership and settlement
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned interactive-control surfaces: 18
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, ticking, event buffering, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save Select projection, Back |
| `run-setup-domain-kit` | run setup projection, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest simulation, contact damage, clearing, score, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction projection, Storage Shed action, Back |
| `exchange-domain-kit` | Market projection, Back |
| `roster-domain-kit` | Roster projection, Back |
| `inventory-domain-kit` | Inventory projection, Back |
| `knowledge-domain-kit` | Codex projection, Back |
| `preferences-domain-kit` | Settings projection, Back |
| `outcome-domain-kit` | outcome projection, Title |
| `interface-composition-kit` | route transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants, snapshots |
| `pressure-field-kit` | pressure channels, clamped adjustment, time growth, commands, snapshots |
| `orchard-world-kit` | tree generation, apple generation and refill, collection, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages, snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages, snapshots |
| `inventory-runtime-kit` | item snapshots, equipment mutation |
| `world-canvas-render-kit` | canvas sizing, player projection, tree projection, apple projection, pest projection |
| `html-interface-render-kit` | delegated route commands, delegated gameplay commands, HUD projection, card projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual ticking |
| `smoke-fixture-kit` | entry assertion, Play assertion, orchard apple assertion |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed finding

```txt
RAF calls ui.render on every frame: present
gameplay branch root.innerHTML assignment: present
screen branch root.innerHTML assignment: present
persistent root click delegate: present

stable node reconciliation: absent
ControlId and ControlGeneration: absent
pointer press lease: absent
focus continuity/restoration: absent
removed-control settlement: absent
exact activation result: absent
FirstStableControlFrameAck: absent
browser interaction fixtures: 0
```

Concrete paths:

1. `src/start.js` ticks and calls `ui.render(snapshot)` on every recursive animation frame.
2. `src/renderer/html-interface-renderer.js` replaces `root.innerHTML` in both active-session and non-session routes.
3. The persistent click delegate dispatches from the event target but binds no product-owned control generation.
4. `tests/smoke.mjs` invokes engine commands directly and does not mount or interact with browser controls.

No failed click or keyboard incident was reproduced. This is a source-backed ownership and proof gap.

## Required parent domain

`zombie-orchard-interactive-dom-control-stability-focus-authority-domain`

## Planned surfaces

- `zombie-orchard-interactive-dom-control-stability-focus-authority-domain`
- `interface-control-manifest-kit`
- `interface-control-identity-kit`
- `interface-render-generation-kit`
- `stable-dom-reconciliation-kit`
- `control-retirement-settlement-kit`
- `focus-continuity-observer-kit`
- `focus-restoration-policy-kit`
- `pointer-press-lease-kit`
- `keyboard-activation-adapter-kit`
- `delegated-command-generation-adapter-kit`
- `control-activation-idempotency-kit`
- `interface-control-result-kit`
- `first-stable-control-frame-ack-kit`
- `pointer-hold-browser-fixture-kit`
- `keyboard-focus-browser-fixture-kit`
- `route-transition-control-fixture-kit`
- `source-dist-pages-control-parity-kit`

## Required command boundary

```txt
InterfaceControlFrameCommand
  -> bind route, snapshot and action-manifest revisions
  -> allocate one control generation

StableControlReconciliationCommand
  -> update matching controls in place
  -> preserve eligible focus and press leases
  -> retire removed controls explicitly

ControlGestureAdmissionCommand
  -> bind pointer or key evidence to ControlId and ControlGeneration
  -> reject stale, hidden, disabled or retired controls

ControlActivationSettlementCommand
  -> dispatch exactly once
  -> publish InterfaceControlResult
  -> publish FirstStableControlFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, commands, gameplay values, world generation, HTML, Canvas2D, tests, build, workflow, and deployment remain unchanged.
