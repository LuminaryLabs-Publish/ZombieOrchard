# Project breakdown: ZombieOrchard run reset generation

**Timestamp:** `2026-07-12T14-38-35-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `run-reset-generation-authority-audited`

## Summary

ZombieOrchard creates every gameplay and interface domain once during module boot. The visible `Play`, `New Game`, `Start`, `Title` and post-failure actions only move the interface route; none creates a new run, resets domains, allocates a run generation or retires predecessor state. A failed run therefore cannot be restarted: after `Title`, the next `Play` or `Start` reaches the still-ended `active-session`, and the composition tick immediately routes back to `outcome`.

## Plan ledger

**Goal:** define one atomic run-reset transaction that creates a clean, revisioned run generation across every mutable domain and proves the first visible frame belongs to that generation.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `ZombieOrchard` as the oldest eligible synchronized repository.
- [x] Read module boot, kit installation, route actions, composition, gameplay state, render projection and smoke proof.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Identify all 27 implemented kit surfaces and their services.
- [x] Trace title return, new-game entry, failed-run restart and pre-failure restart paths.
- [x] Define a run-reset authority, result contract and fixture boundary.
- [x] Add timestamped architecture, render, gameplay, interaction, run-reset and deploy audits.
- [x] Refresh required root `.agent` documents and registry.
- [x] Synchronize the central ledger and internal change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime reset implementation and executable restart fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

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

Only `LuminaryLabs-Publish/ZombieOrchard` was modified in the Publish organization.

## Complete interaction loop

```txt
module boot
  -> createOrchardGame()
  -> create all 19 engine-installed domains once
  -> create canvas and HTML renderers
  -> expose raw engine through GameHost
  -> start recursive RAF

first run
  -> Entry Play or New Game -> Start
  -> interface-composition changes active route
  -> existing active-session and participant domains continue
  -> movement, collection, building, hiring, equipment, pressure and combat mutate live state

return to title before failure
  -> Pause -> Title
  -> route becomes entry
  -> gameplay domains continue to exist with the same balances, world, score, actors, builds and session state
  -> Play or New Game resumes that same run

failure
  -> active-session condition reaches zero
  -> ended becomes true
  -> composition tick routes to outcome
  -> Outcome Title changes route to entry only
  -> Play or Start changes route to the same ended active-session
  -> next composition tick routes immediately back to outcome
```

## Domains in use

```txt
browser document, canvas, DOM, RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
entry, session-select, run-setup, interrupt, construction, exchange, roster, inventory, knowledge, preferences and outcome interface domains
active-session gameplay and interface domain
interface composition, routing and automatic outcome routing
resource ledger
pressure field
orchard trees, apples, collection and refill
construction catalog and built state
roster actor state
inventory ownership and equipment state
movement, day/night phases, pests, damage, score and failure
canvas world and HTML route/HUD projection
Node smoke, static build, Pages deployment and central tracking
```

## Implemented kits and services

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
```

### Engine-installed kits

```txt
resource-ledger-kit
pressure-field-kit
orchard-world-kit
construction-runtime-kit
roster-runtime-kit
inventory-runtime-kit
entry-domain-kit
session-select-domain-kit
run-setup-domain-kit
interrupt-domain-kit
construction-domain-kit
exchange-domain-kit
roster-domain-kit
inventory-domain-kit
knowledge-domain-kit
preferences-domain-kit
outcome-domain-kit
active-session-domain-kit
interface-composition-kit
```

### Host, renderer, proof and deployment kits

```txt
kit-runtime
scoped-interface-domain-kit
world-canvas-render-kit
html-interface-render-kit
game-host-diagnostics-kit
smoke-fixture-kit
static-build-copy-kit
pages-deploy-kit
```

| Kit group | Offered services |
|---|---|
| runtime | Kit registration, domain creation, commands, clamped ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, fields, selection, action activation, route transitions, back navigation, nested dispatch and outcome routing |
| resource/pressure | Balance checks, payment, grants, pressure adjustment and pressure ticking |
| orchard/session | Tree and apple population, nearest collection, apple refill, movement, phases, pest spawning and pursuit, damage, score and failure |
| construction/roster/inventory | Catalog projection, build placement, hiring, actor projection, equipment mutation and snapshots |
| rendering | Canvas world drawing, HTML screens/HUD/cards and delegated actions |
| diagnostics/proof/deploy | Raw engine publication, state readback, manual tick, Node smoke, static copy and Pages deployment |

## Source-backed findings

```txt
createOrchardGame installs mutable domains once: yes
Entry Play allocates a run: no
New Game allocates or resets a run: no
Run Setup Start allocates or resets a run: no
Pause Title resets gameplay domains: no
Outcome Title resets ended state: no
active-session exposes reset command: no
participant domains expose reset commands: no
runtime exposes atomic graph reset: no
run ID or generation: absent
reset command/result: absent
predecessor snapshot and rollback: absent
first visible reset-frame acknowledgement: absent
restart fixture: absent
```

## Concrete failure paths

```txt
failed-run restart
  -> condition reaches zero and ended=true
  -> outcome Title returns to entry
  -> Play moves to active-session
  -> next tick sees ended=true
  -> composition returns to outcome

New Game after partial run
  -> route enters run-setup
  -> Start moves to existing active-session
  -> resources, pressure, apples, builds, actors, equipment, score and player condition remain from predecessor

Title while night pests exist
  -> route leaves active-session
  -> route-scoped simulation gap can continue predecessor mutation
  -> later Play still references the same session and participant objects
```

## Required parent domain

```txt
zombie-orchard-run-reset-generation-authority-domain
```

## Required transaction

```txt
StartRunCommand or ResetRunCommand
  -> bind command ID, runtime session, route and predecessor run revision
  -> select authored preset and reset policy
  -> allocate candidate run ID, generation, seed and participant revisions
  -> construct clean candidate state for every mutable domain
  -> validate cross-domain invariants and initial read model
  -> cancel or reject stale predecessor commands and callbacks
  -> atomically install the complete candidate generation
  -> retire predecessor state exactly once
  -> return typed RunResetResult and per-domain reset receipts
  -> publish canvas and HTML snapshots with the new run generation
  -> acknowledge the first visible matching frame
```

## Candidate coordinating kits

```txt
run-id-kit
run-generation-kit
run-preset-id-kit
run-reset-command-kit
run-reset-command-id-kit
run-reset-policy-kit
run-reset-admission-kit
run-predecessor-revision-kit
run-seed-allocation-kit
run-participant-registry-kit
run-participant-reset-contract-kit
run-candidate-state-kit
run-candidate-validation-kit
run-reset-commit-kit
run-reset-rollback-kit
run-predecessor-retirement-kit
stale-run-command-rejection-kit
run-reset-result-kit
run-participant-reset-receipt-kit
run-observation-kit
run-reset-journal-kit
first-run-generation-frame-ack-kit
failed-run-restart-fixture-kit
new-game-clean-state-fixture-kit
pre-failure-title-reset-fixture-kit
run-reset-source-dist-pages-parity-kit
```

## Runtime non-claims

Runtime source, gameplay behavior, rendering, package scripts and deployment configuration were not changed. No clean-restart, atomic-reset, stale-command rejection, deterministic new-run or visible-frame claim is made.