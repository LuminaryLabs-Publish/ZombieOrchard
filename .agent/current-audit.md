# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T14-38-35-04-00`  
**Status:** `run-reset-generation-authority-audited`  
**Branch:** `main`

## Summary

ZombieOrchard has route navigation but no authoritative run lifecycle. `createOrchardGame()` creates one mutable gameplay graph at module boot. The Play, New Game, Start, Resume and Title actions only call interface-composition route transitions. They do not allocate a run ID, construct initial participant state, reset the existing graph, retire the predecessor or return a lifecycle result.

The most visible defect occurs after failure. `active-session` sets `ended=true`; Outcome Title returns to Entry without clearing it. A later Play or New Game -> Start re-enters that same ended session, and `interface-composition.tick()` immediately routes back to Outcome.

## Plan ledger

**Goal:** define a clean, atomic and observable run-reset generation transaction across every mutable participant.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Verify eligible central-ledger and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` under the oldest eligible fallback rule.
- [x] Read boot, kit runtime, interface actions, composition, gameplay domains, preset, renderer and smoke proof.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kit surfaces and their services.
- [x] Confirm all gameplay domains are created once.
- [x] Confirm Play/New Game/Start do not create or reset a run.
- [x] Confirm Title does not reset terminal or partial state.
- [x] Confirm failed-run restart returns to Outcome on the next tick.
- [x] Define run identity, generation, participant reset, atomic commit, rollback, retirement and frame-proof contracts.
- [ ] Implement and execute reset/restart fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T12-39-25-04-00 selected
MyCozyIsland       2026-07-12T12-58-08-04-00
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
HorrorCorridor     2026-07-12T14-22-01-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
browser module boot
  -> createOrchardGame()
  -> install 19 engine kits once
  -> create world and HTML renderers
  -> expose raw engine through window.GameHost
  -> start recursive RAF

run entry
  -> Entry Play moves directly to active-session
  -> Entry New Game moves to run-setup
  -> Run Setup Start moves to active-session
  -> none creates or resets gameplay state

run mutation
  -> commands mutate resource, pressure, orchard, construction, roster, inventory and active-session objects
  -> recursive ticks advance pressure and active-session
  -> canvas and HTML project the same retained domain graph

return to title
  -> Pause Title or Outcome Title moves interface route to entry
  -> predecessor gameplay objects remain installed
  -> later Play or Start reuses them

terminal restart
  -> active-session ended=true
  -> composition moves to outcome
  -> Title -> entry
  -> Play/Start -> same active-session
  -> next composition tick sees ended=true
  -> route returns immediately to outcome
```

## Source-backed findings

### One graph for the page lifetime

`src/start.js` creates one engine at module evaluation. `src/game.js` installs all gameplay and interface kits into that engine once. No replacement or reset operation is called by menu actions.

### Route actions are not lifecycle commands

`src/presets/orchard-preset.js` defines Play, New Game, Start, Resume and Title using only `to` destinations. `src/kits/composition.js` resolves those actions through `move(next)`.

### Terminal state is sticky

`src/kits/game-domains.js` initializes `ended=false` once and sets it true when condition reaches zero. It exposes activate, move, collect, clear and next-phase commands, but no reset command.

`src/kits/composition.js` automatically moves to Outcome whenever the active-session snapshot reports `ended` and the current route is not Outcome.

### Every participant survives supposed New Game

```txt
resource-ledger.values and last
pressure-field.channels
orchard-world apples and generated IDs
construction-runtime built items and message
roster-runtime actors and message
inventory-runtime items and equipped item
active-session day, phase, player, pests, score, message and ended
scoped-interface fields and selection
interface-composition previous route
```

### Proof is absent

`tests/smoke.mjs` validates Entry, one Play transition and apple presence. It does not mutate a run, use New Game, return to Title, fail, restart or inspect clean participant state.

## Concrete failure paths

```txt
failed run -> Title -> Play
  -> Play is accepted
  -> active route briefly becomes active-session
  -> next tick returns to outcome

partial run -> Pause -> Title -> New Game -> Start
  -> old balances, pressure, apples, builds, roster, equipment, score and player condition survive

terminal run -> Title -> New Game -> Start
  -> ended remains true
  -> no new playable run becomes durable
```

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
11 scoped interface domains plus active-session
interface composition and automatic Outcome routing
resource ledger and pressure field
orchard world and collection
construction, roster and inventory
movement, phase, pests, damage, score and failure
canvas world and HTML interface projection
Node smoke, static build, Pages deployment and central tracking
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

| Kit group | Services |
|---|---|
| runtime | Registration, live domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, fields, selection, activation, routing, back navigation, nested dispatch and Outcome routing |
| gameplay | Resources, pressure, orchard collection/refill, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | Canvas world drawing, HTML route/HUD projection and delegated actions |
| diagnostics/proof/deploy | Raw engine publication, state readback, manual tick, Node smoke, static copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-run-reset-generation-authority-domain
```

## Required transaction

```txt
StartRunCommand or ResetRunCommand
  -> bind command ID, runtime session, route and predecessor run revision
  -> resolve authored preset and reset policy
  -> allocate run ID, generation and deterministic seed
  -> construct all participant candidates away from live state
  -> validate participant and cross-domain invariants
  -> atomically commit the complete successor generation
  -> rollback fully on candidate or commit failure
  -> retire predecessor state and fence stale commands/callbacks
  -> publish typed result and participant reset receipts
  -> acknowledge first canvas and HTML frame citing the successor generation
```

## Runtime non-claims

No runtime source, reset behavior, gameplay, rendering, package scripts or deployment configuration changed. No clean-restart, atomic-reset, stale-command fencing, deterministic new-run or visible reset-frame claim is made.