# Architecture audit: interactive DOM control stability DSK map

**Timestamp:** `2026-07-16T22-40-53-04-00`  
**Authority:** `zombie-orchard-interactive-dom-control-stability-focus-authority-domain`

## Current composition

```txt
start.js
  -> createOrchardGame()
  -> createWorldCanvas()
  -> createHtmlInterfaceRenderer()
  -> RAF: engine.tick -> world.render -> ui.render

html-interface-renderer
  -> one persistent root click delegate
  -> current snapshot to HTML string
  -> root.innerHTML replacement on every frame

interface-composition
  -> active route and active snapshot
  -> nested domain commands

19 engine-installed domains
  -> interface, session, world, pressure, resources,
     construction, roster and inventory truth
```

## Implemented DSK and service inventory

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

## Required authority map

```txt
zombie-orchard-interactive-dom-control-stability-focus-authority-domain
  -> interface-control-manifest-kit
  -> interface-control-identity-kit
  -> interface-render-generation-kit
  -> stable-dom-reconciliation-kit
  -> control-retirement-settlement-kit
  -> focus-continuity-observer-kit
  -> focus-restoration-policy-kit
  -> pointer-press-lease-kit
  -> keyboard-activation-adapter-kit
  -> delegated-command-generation-adapter-kit
  -> control-activation-idempotency-kit
  -> interface-control-result-kit
  -> first-stable-control-frame-ack-kit
  -> browser and deployment fixtures
```

## Ownership rule

The HTML renderer owns node reconciliation and visible control generations. Interface domains continue to own route and action truth. The control authority coordinates identity and settlement without copying gameplay state.
