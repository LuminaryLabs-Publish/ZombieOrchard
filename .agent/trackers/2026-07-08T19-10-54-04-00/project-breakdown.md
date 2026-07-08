# ZombieOrchard Project Breakdown

**Timestamp:** `2026-07-08T19-10-54-04-00`

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Branch policy:** `main` only. No branches. No pull requests.

## Plan ledger

**Goal:** Refresh the repo-local breakdown around the oldest eligible Publish fallback target and narrow the next implementation to a Market command source manifest plus exchange consumer fixture gate.

**Checklist**

- [x] Compared the accessible `LuminaryLabs-Publish` repository list.
- [x] Compared the list against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/ZombieOrchard`.
- [x] Read root `.agent` state.
- [x] Read source entry, runtime, composition, interface, game-domain, preset, renderer, and package surfaces.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified implemented and next-cut kits.
- [x] Added architecture, render, gameplay, and Market authority audit files.
- [x] Updated root `.agent` operating docs.
- [x] Kept runtime source unchanged.

## Selection result

The accessible Publish organization list contains:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

`LuminaryLabs-Publish/TheCavalryOfRome` is excluded.

No checked non-Cavalry repo was fully new, absent from the central ledger, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`ZombieOrchard` was selected as the oldest current eligible fallback from the central ledger readback, with last central update `2026-07-08T16-20-00-04-00`.

## Current product read

`ZombieOrchard` is a static browser orchard survival/economy shell.

It already has a kit-composed runtime, an interface composition layer, canvas orchard rendering, HTML interface rendering, active session controls, Build, Market, Roster, Inventory, Codex, Settings, Outcome screens, and a minimal smoke test.

The Market screen is still a shell. It routes back, but does not yet own sell/buy commands, transaction history, nested command result propagation, or renderer-readable exchange projection.

## Current interaction loop

```txt
index.html
  -> src/boot.js
  -> src/start.js
  -> createOrchardGame()
  -> createWorldCanvas(document.querySelector("#world"))
  -> createHtmlInterfaceRenderer({ root: document.querySelector("#ui-root"), engine })
  -> requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> pressure-field and active-session tick
  -> engine.snapshot()
  -> world-canvas renders trees, apples, pests, and player
  -> html-interface-renderer renders active-session HUD or active screen panel
  -> [data-action] clicks call engine.command("interface-composition", "activate", { actionId })
  -> [data-command] clicks call engine.command("active-session", command)
  -> interface-composition can dispatch nested action.command through ctx.engine.command(...)
  -> nested command result is currently discarded
  -> window.GameHost exposes engine/getState/tick
```

## Domains in use

```txt
runtime:
  static browser host
  boot module
  start module
  game factory
  kit runtime
  engine context
  domain registry
  command router
  event emitter
  tick dispatcher
  snapshot aggregator
  subscription bus
  browser animation loop
  GameHost diagnostics
  smoke harness

interface:
  entry
  session-select
  run-setup
  active-session
  interrupt
  construction
  exchange
  roster
  inventory
  knowledge
  preferences
  outcome
  interface-composition
  HTML interface renderer

game:
  resource-ledger
  pressure-field
  orchard-world
  construction-runtime
  roster-runtime
  inventory-runtime
  active-session
  world-canvas renderer

market-authority-next:
  market action id catalog
  market command source manifest
  market command envelope
  market source snapshot
  market price source
  market capacity policy
  market preflight
  market command result
  market rejection reason catalog
  market command journal
  market result journal
  resource transaction history
  inventory purchase intake
  nested command result propagation
  exchange result projection
  exchange renderer readback
  market fixture replay
```

## Services the current kits offer

```txt
kit-runtime:
  install kits
  register domains
  route commands
  return command results
  tick domains
  emit events
  aggregate snapshots
  notify subscribers

scoped-interface-domain-kit:
  define screen actions
  select action rows
  mutate fields
  activate action rows
  emit action requests
  expose screen snapshots

interface-composition-kit:
  transition active screens
  go back
  activate active screen action
  dispatch nested action.command
  expose active/previous/activeSnapshot

resource-ledger-kit:
  store resource values
  canPay
  pay
  add
  command add/pay
  expose values snapshot

pressure-field-kit:
  store pressure channels
  adjust pressure
  tick rowPressure and curse
  expose pressure snapshot

orchard-world-kit:
  generate tree grid
  randomly seed apples
  collect nearest apple
  reseed apples
  expose tree/apple/bounds snapshot

construction-runtime-kit:
  keep build catalog
  spend resources
  append built item records
  expose build message

roster-runtime-kit:
  keep actor list
  spend resources to hire
  append actor records
  expose roster message

inventory-runtime-kit:
  keep item list
  equip item
  expose equipped/items snapshot

active-session-domain-kit:
  move player
  collect apples
  clear pests
  advance day/night phase
  spawn and move pests
  score session
  end session
  expose active-session snapshot

world-canvas-render-kit:
  resize canvas
  render trees/apples/pests/player from snapshot

html-interface-render-kit:
  render active-session HUD
  render generic interface screens
  route click actions
  route direct active-session commands
```

## Kits identified

```txt
implemented:
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

next-cut:
  market-action-id-catalog-kit
  market-command-source-manifest-kit
  market-command-envelope-kit
  market-source-snapshot-kit
  market-price-source-kit
  market-capacity-policy-kit
  market-preflight-kit
  market-command-result-kit
  market-rejection-reason-catalog-kit
  market-command-journal-kit
  market-result-journal-kit
  resource-transaction-history-kit
  inventory-purchase-intake-kit
  nested-command-result-propagation-kit
  exchange-result-projection-kit
  exchange-renderer-readback-kit
  market-fixture-replay-kit
```

## Main finding

`engine.command()` already returns command results, so the app does not need a runtime rewrite.

The next cut should install a source-owned Market command manifest and result propagation layer exactly where the gap exists: exchange actions, nested `ctx.engine.command(...)`, `interface-composition.snapshot().lastResult`, exchange projection, renderer readback, and DOM-free fixture rows.

## Next safe ledge

```txt
ZombieOrchard Market Command Source Manifest + Nested Result Consumer Fixture Gate
```

## Runtime validation

No runtime source files changed in this pass.

No local command execution was performed in this connector-only docs pass.

Next implementation should run:

```bash
npm test
npm run build
node tests/market-transaction-fixture.mjs
```
