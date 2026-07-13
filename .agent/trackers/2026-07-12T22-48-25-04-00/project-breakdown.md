# Project breakdown: ZombieOrchard runtime observer publication

**Timestamp:** `2026-07-12T22-48-25-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Change type:** documentation only

## Summary

ZombieOrchard was selected as the oldest eligible repository after the complete Publish inventory was compared with central tracking. The audit identifies synchronous observer delivery as a transaction boundary: subscribers can reorder observations through reentrancy, mutate shared projections, throw after commit and stop the visible frame loop.

## Plan ledger

**Goal:** document the complete repository and define the DSK boundary required for immutable, monotonic and fault-isolated runtime publication.

- [x] Inventory all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with central ledgers.
- [x] Confirm every eligible repository has root `.agent` state.
- [x] Select only ZombieOrchard as the oldest eligible entry.
- [x] Read source-backed runtime, composition, gameplay, renderer, preset and smoke surfaces.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 27 implemented kits.
- [x] Identify every offered service.
- [x] Add required timestamped audits.
- [x] Refresh required root `.agent` documents and machine registry.
- [x] Update central tracking on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-12T20-31-27-04-00 selected
MyCozyIsland       2026-07-12T20-40-56-04-00
TheUnmappedHouse   2026-07-12T20-51-16-04-00
AetherVale         2026-07-12T21-15-06-04-00
TheOpenAbove       2026-07-12T21-31-40-04-00
IntoTheMeadow      2026-07-12T21-40-09-04-00
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-29-30-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/ZombieOrchard` was modified in the Publish organization.

## Complete interaction loop

```txt
boot
  -> install 19 engine kits
  -> create canvas and HTML renderers
  -> expose raw engine through GameHost
  -> start recursive RAF

command
  -> domain mutation
  -> shared snapshot capture
  -> synchronous subscriber delivery
  -> command result after all subscribers return

tick
  -> frame and elapsed mutation
  -> tick all domains
  -> shared snapshot capture
  -> synchronous subscriber delivery
  -> second snapshot return
  -> canvas and HTML render
  -> successor RAF

observer re-entry or failure
  -> nested publication can overtake predecessor
  -> thrown error escapes after commit
  -> later observers and visible frame can be skipped
```

## Domains in use

| Domain | Current responsibility |
|---|---|
| Browser host | Document, canvas, DOM, RAF and public `GameHost` |
| Runtime | Kit registration, commands, ticks, events, snapshots, subscriptions and publication |
| Interface | Twelve screens, fields, selection and actions |
| Composition | Routing, back navigation, nested dispatch and Outcome routing |
| Gameplay | Resources, pressure, orchard, construction, roster, inventory, movement, phases, pests, score and failure |
| Observer publication | Currently ambient synchronous listener iteration without authority |
| Rendering | Canvas world plus HTML route/HUD projection |
| Proof/deploy | Node smoke, static build and Pages publication |

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `kit-runtime` | Registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions, synchronous publication |
| `scoped-interface-domain-kit` | Screen state, fields, selection, action activation, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Session actions, movement, collection, phases, pests, damage, clearing, score and failure |
| `interrupt-domain-kit` | Pause, Resume and Title |
| `construction-domain-kit` | Construction action routing and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Transitions, Back, nested dispatch and automatic Outcome |
| `resource-ledger-kit` | Balance checks, payment, grants and snapshots |
| `pressure-field-kit` | Pressure adjustment, ticking and snapshots |
| `orchard-world-kit` | Tree/apple generation, collection, refill and snapshots |
| `construction-runtime-kit` | Catalog, payment, built placement and snapshots |
| `roster-runtime-kit` | Payment, hiring and snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas trees, apples, player and pests |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards and Outcome |
| `game-host-diagnostics-kit` | Raw engine, state readback and manual tick |
| `smoke-fixture-kit` | Entry, Play and apple assertions |
| `static-build-copy-kit` | Static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Core findings

```txt
same mutable snapshot object delivered to all observers
no publication sequence or predecessor
no observer identity, generation or cursor
no nested-publication prevention
no exception isolation
no committed-result/delivery-result separation
no time or queue budget
no visible-frame publication receipt
```

## Required parent DSK

`zombie-orchard-runtime-observer-publication-authority-domain`

## Required outcome

One committed state transition produces one immutable sequenced publication. Every active observer receives it in monotonic order or a typed failure is recorded without invalidating the committed result or stopping later observers and rendering.
