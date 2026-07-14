# Project breakdown: ZombieOrchard clean run reset

**Timestamp:** `2026-07-14T16-41-33-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `run-start-clean-reset-authority-audited`

## Summary

ZombieOrchard constructs one mutable engine and one set of domain closures when the page loads. `Play`, `New Game`, `Start`, `Title`, `Pause`, and `Resume` only move the interface route. They never create, reset, suspend, archive, or replace a run. Every domain is ticked on every RAF regardless of the visible route, so pressure and gameplay continue behind title, setup, pause, and other screens. After defeat, returning to title and starting again reuses the ended session, modified resources, built objects, roster, equipment, pressure, and randomized orchard.

## Plan ledger

**Goal:** define one authoritative clean-run transaction that settles or preserves the predecessor, creates deterministic candidate state for every mandatory domain, adopts it atomically, rejects stale predecessor work, and proves the first matching visible frame.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger entries and ten root `.agent` states.
- [x] Compare current eligible heads with their recorded documentation heads.
- [x] Confirm no new, ledger-missing, root-agent-missing, or runtime-ahead repository has priority.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest eligible central entry.
- [x] Inspect boot, runtime, composition, interface, preset, gameplay, render, smoke, build, and deployment surfaces.
- [x] Identify the complete interaction loop, domains, kits, and offered services.
- [x] Preserve all 27 implemented kit surfaces.
- [x] Define the clean-run reset authority family and fixture boundary.
- [x] Add a new timestamped tracker and system-specific audits.
- [x] Keep all repository writes on `main`; create no branch or pull request.
- [ ] Implement and execute clean-run reset fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected repository: ZombieOrchard
selection basis: oldest eligible central documentation timestamp
```

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheLongHaul
TheOpenAbove
TheUnmappedHouse
ZombieOrchard          selected
TheCavalryOfRome       excluded
```

## Complete interaction loop

```txt
browser boot
  -> createOrchardGame() constructs one mutable engine
  -> install 19 engine domains once
  -> orchard-world seeds random apples once
  -> create Canvas2D and HTML renderers
  -> expose raw GameHost
  -> begin perpetual requestAnimationFrame loop

entry Play
  -> interface-composition moves entry -> active-session
  -> no run creation or reset command

entry New Game
  -> interface-composition moves entry -> run-setup
  -> Start moves run-setup -> active-session
  -> no preset reapplication, seed allocation, state reset, or candidate adoption

all visible routes
  -> runtime.tick() advances every domain every frame
  -> pressure-field always increases
  -> active-session continues during entry, setup, pause, construction, roster, inventory, settings, and outcome until ended
  -> Canvas2D always renders orchard-world and active-session behind the current HTML route

failure
  -> active-session sets ended=true
  -> interface-composition routes to outcome on a later tick
  -> outcome Title moves only to entry

second Play or New Game
  -> reuses the same ended active-session
  -> reuses modified resources, pressure, built records, roster, inventory, world, score, day, player, and pests
  -> next composition tick can route directly back to outcome
```

## Domains in use

```txt
browser document, DOM, delegated input, Canvas2D, RAF, error panel, and public GameHost
kit runtime, domain registration, command dispatch, ticks, events, snapshots, subscriptions, and publication
entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences, and outcome
interface composition, nested commands, route transitions, Back, and outcome routing
resource ledger, pressure field, orchard world, construction, roster, and inventory
movement, collection, phases, pests, clearing, score, damage, failure, and outcome
run identity, deterministic seed, preset fingerprint, predecessor settlement, reset, candidate graph adoption, stale-work rejection, and retry lineage
HTML route projection, HUD, cards, controls, messages, and summaries
Canvas2D world projection and stale predecessor-frame risk
validation, static build, Pages deployment, repo-local audit state, and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | kit registration, domain creation, arbitrary command dispatch, ticks, events, snapshots, subscriptions, publication |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, descriptors, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | save-select projection, Back |
| `run-setup-domain-kit` | run setup projection, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest lifecycle, clearing, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction screen, Storage Shed action, Back |
| `exchange-domain-kit` | market projection, Back |
| `roster-domain-kit` | roster projection, Back |
| `inventory-domain-kit` | inventory projection, Back |
| `knowledge-domain-kit` | codex projection, Back |
| `preferences-domain-kit` | settings projection, Back |
| `outcome-domain-kit` | run summary, Title |
| `interface-composition-kit` | transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payment, grants, snapshots |
| `pressure-field-kit` | pressure adjustment, unconditional ticking, snapshots |
| `orchard-world-kit` | random tree/apple state, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment request, built-record append, messages, snapshots |
| `roster-runtime-kit` | payment request, actor append, names, hardcoded role, snapshots |
| `inventory-runtime-kit` | item snapshots, equipment mutation, equipped snapshot |
| `world-canvas-render-kit` | canvas sizing, tree, apple, pest, and player projection |
| `html-interface-render-kit` | delegated actions and commands, HUD, screens, cards, messages, titles, descriptions, innerHTML projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual tick |
| `smoke-fixture-kit` | Entry assertion, first Play assertion, apple assertion |
| `static-build-copy-kit` | static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
planned clean-run authority surfaces including parent: 22
```

## Source-backed findings

- `createOrchardGame()` constructs one engine and all mutable domain closures once.
- The preset's `Play` and `Start` actions only provide `to: "active-session"`; they do not issue a run command.
- `interface-composition` mutates only `active` and `previous` route fields.
- `runtime.tick()` invokes `tick()` on every domain without checking the active interface route.
- `pressure-field` therefore advances on title, setup, pause, menus, and outcome.
- `active-session` also advances on those routes until `ended` becomes true.
- `Title` from pause or outcome does not reset any gameplay domain.
- An ended session remains ended; a later Play or Start can be routed back to outcome on the next tick.
- Resources, constructed objects, roster actors, equipped item, pressure, day, score, player state, pests, and orchard state are retained.
- `orchard-world` uses `Math.random()` and exposes no seed, replay identity, or reset function.
- Canvas2D always renders the retained world and player behind non-game screens.
- The smoke test proves only the first entry-to-play transition and apple presence.

## Required authority

```txt
zombie-orchard-run-start-clean-reset-authority-domain
```

```txt
RunStartCommand
  -> bind StartCommandId, HostGeneration, expected predecessor RunGeneration,
     preset fingerprint, seed policy, route revision, and start mode
  -> settle, archive, or explicitly preserve the predecessor outcome
  -> allocate a new RunId, RunGeneration, deterministic seed, and initial frame revision
  -> privately prepare resource, pressure, world, construction, roster,
     inventory, active-session, interface, event, and presentation candidates
  -> validate every candidate against the accepted preset and seed
  -> atomically adopt the complete candidate graph or retain every predecessor
  -> reject duplicate, stale, retired, or superseded commands and callbacks
  -> publish RunStartResult and participant reset/adoption receipts
  -> route to active-session only after adoption succeeds
  -> project the new generation in HTML and Canvas2D
  -> publish FirstVisibleRunFrameAck

RunExitCommand
  -> bind the active RunGeneration and exit reason
  -> stop active gameplay admission before title/outcome routing
  -> retain the accepted outcome and bounded predecessor evidence
  -> publish RunExitResult without mutating a successor
```

## Required fixtures

```txt
Play creates one clean RunGeneration
New Game -> Start creates a distinct clean RunGeneration
second start restores exact preset resources and inventory
second start clears construction, roster, pests, score, damage, day, and ended state
new world generation is deterministic for a bound seed
same seed reproduces world and first snapshot
new seed produces a new admitted world
entry, setup, pause, menus, and outcome do not advance gameplay or pressure
Title cannot leave predecessor gameplay active
outcome -> title -> Play cannot immediately bounce to predecessor outcome
duplicate and stale start commands settle zero or one time
failed candidate construction leaves the predecessor untouched
late predecessor ticks and events cannot commit into the successor
HTML and Canvas2D expose the same RunGeneration
first visible successor frame is acknowledged
source, dist, and Pages behavior match
```

## Validation boundary

Documentation only. Runtime JavaScript, gameplay, interface behavior, renderers, random generation, dependencies, package scripts, tests, workflows, build, and deployment were not changed. No clean reset, pause fidelity, deterministic run creation, atomic domain replacement, stale-work isolation, first-frame convergence, artifact parity, or production-readiness claim is made.