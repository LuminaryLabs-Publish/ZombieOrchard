# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T20-31-27-04-00`  
**Status:** `pest-population-lifecycle-budget-authority-audited`  
**Branch:** `main`

## Summary

The active-session domain owns a mutable `pests` array and appends a random pest during night ticks when `Math.random() < dt * 0.55`. There is no active-count cap, encounter budget, age, TTL, despawn policy, population identity, generation or admission result.

Every tick iterates the full array for movement and contact damage. Every snapshot deep-clones it, and every canvas frame draws it. Each contacting pest subtracts damage independently, coupling population growth to CPU, allocation, draw work and lethality.

## Plan ledger

**Goal:** define a bounded pest-population lifecycle whose accepted revision is shared by simulation, damage, snapshots and rendering.

- [x] Compare current Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard under the oldest eligible fallback.
- [x] Read boot, runtime, composition, active-session, preset, renderers and smoke proof.
- [x] Identify the complete interaction loop, active domains, 27 implemented kits and services.
- [x] Confirm spawn has no capacity or generation authority.
- [x] Confirm only successful `clear` retires a pest.
- [x] Confirm day transition retains the entire population.
- [x] Confirm tick, snapshot and render costs scale with pest count.
- [ ] Implement and execute population lifecycle and budget fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T18-48-07-04-00 selected
MyCozyIsland       2026-07-12T19-00-22-04-00
TheUnmappedHouse   2026-07-12T19-11-01-04-00
AetherVale         2026-07-12T19-21-29-04-00
TheOpenAbove       2026-07-12T19-31-06-04-00
IntoTheMeadow      2026-07-12T19-49-41-04-00
PhantomCommand     2026-07-12T19-58-07-04-00
PrehistoricRush    2026-07-12T20-10-25-04-00
HorrorCorridor     2026-07-12T20-20-02-04-00
TheCavalryOfRome   excluded
```

No new, ledger-missing or root-`.agent`-missing eligible repository was found.

## Complete interaction loop

```txt
browser module boot
  -> createOrchardGame()
  -> install 19 engine kits
  -> create canvas and HTML renderers
  -> expose raw engine through window.GameHost
  -> start recursive RAF

night simulation
  -> active-session tick evaluates one spawn probability
  -> addPest() pushes random ID and edge position
  -> all pests move toward player
  -> each contacting pest subtracts dt * 7 condition

publication
  -> active-session snapshot deep-clones full pest array
  -> world canvas draws every pest
  -> HTML projects route and HUD

retirement
  -> clear finds one nearby pest
  -> two successful hits remove it
  -> reward scrap and score
  -> no other retirement path exists
```

## Source-backed findings

### Spawn is direct and unadmitted

`addPest()` creates an ID with `Math.random().toString(36)` and pushes directly into `state.pests`. There is no capacity check, duplicate check, run generation, spawn reason, policy revision or typed result.

### Population survives phase transitions

`next-phase` toggles day/night and increments day when returning to day. It does not retire, age or reclassify pests.

### Simulation and damage are population-linear

The active-session tick loops every pest. Movement, distance calculation and contact damage occur in the same loop. A contact group of size N applies N damage contributions during one step.

### Retirement is player-only

The `clear` command targets the first nearby pest, decrements condition, splices it when condition reaches zero and grants reward. No timeout, distance, terminal, route or budget retirement exists.

### Snapshot and render are population-linear

The active-session snapshot deep-clones `state`, including all pests. The canvas then loops every pest and draws one rectangle. No population revision, culling result or render budget is consumed.

### Existing proof is absent

`tests/smoke.mjs` validates Entry, Play and apple population only. It cannot detect unbounded growth, duplicate IDs, stale clear operations, damage spikes, retirement errors or render-budget drift.

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
11 generic scoped interface domains plus custom active-session
interface composition, nested dispatch, routing and automatic Outcome routing
runtime session, run generation, route and terminal admission
resource ledger and pressure field
orchard world, collection and refill
construction, roster and inventory
movement, phases, pest spawning, population, contact damage, clearing, score and failure
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
| runtime | Registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, fields, selection, actions, routing, back navigation, nested dispatch and Outcome routing |
| gameplay | Resources, pressure, orchard collection/refill, construction, hiring, equipment, movement, phases, pest spawn/movement/contact/clearing, score and failure |
| render | Canvas trees, apples, player, pests and built objects; HTML route, HUD, cards and Outcome |
| diagnostics/proof/deploy | Raw engine publication, state readback, manual tick, Node smoke, static copy and Pages deployment |

## Required composed domain

`zombie-orchard-pest-population-lifecycle-budget-authority-domain`

## Required transaction

```txt
PestSpawnRequest
  -> bind runtime session, run generation and expected population revision
  -> evaluate phase, capacity and spawn budget
  -> allocate deterministic unique pest identity
  -> commit typed spawn result
  -> advance admitted population under simulation budget
  -> derive one bounded contact and damage result
  -> retire cleared, expired or invalid pests exactly once
  -> publish population revision and fingerprint
  -> render an admitted visible subset
  -> acknowledge first matching visible frame
```

## Candidate kits

```txt
pest-population-id-kit
pest-id-kit
pest-generation-kit
pest-spawn-policy-kit
pest-spawn-budget-kit
pest-capacity-kit
pest-spawn-admission-kit
pest-spawn-result-kit
pest-lifecycle-state-kit
pest-age-kit
pest-despawn-policy-kit
pest-retirement-kit
pest-contact-set-kit
pest-damage-budget-kit
pest-simulation-budget-kit
pest-render-budget-kit
pest-population-snapshot-kit
pest-population-fingerprint-kit
pest-population-observation-kit
pest-population-journal-kit
first-pest-population-frame-ack-kit
pest-capacity-fixture-kit
pest-retirement-fixture-kit
pest-damage-budget-fixture-kit
pest-source-dist-pages-parity-fixture-kit
```

## Runtime non-claims

No runtime source, gameplay behavior, rendering, package scripts or deployment configuration changed. No bounded population, deterministic pest identity, exact retirement, damage ceiling, stable frame cost or visible population-frame claim is made.
