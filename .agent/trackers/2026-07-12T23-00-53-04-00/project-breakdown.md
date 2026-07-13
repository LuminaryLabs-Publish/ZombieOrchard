# Project breakdown: ZombieOrchard runtime observer publication reconciliation

**Timestamp:** `2026-07-12T23-00-53-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Change type:** documentation only

## Summary

ZombieOrchard was selected because its repo-local runtime-observer audit at `2026-07-12T22-48-25-04-00` was newer than the central ledger state at `2026-07-12T20-31-27-04-00`. The audit identifies synchronous observer publication as a transaction boundary: one shared mutable snapshot is delivered to every subscriber, nested mutation can reverse observed order, and a thrown subscriber can hide a committed result and stop the browser frame loop.

## Plan ledger

**Goal:** synchronize the complete repository breakdown and establish one immutable, monotonic and fault-isolated publication authority between committed runtime state and visible projection.

- [x] Inventory all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with central tracking.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Select only ZombieOrchard because repo-local observer documentation was newer than central tracking.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all 27 implemented kit surfaces and their services.
- [x] Add a timestamped reconciliation tracker and audit family.
- [x] Refresh required root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime isolation and executable publication fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard
  central ledger: 2026-07-12T20-31-27-04-00
  repo-local observer audit: 2026-07-12T22-48-25-04-00
  selected: yes, newer repo-local state required central reconciliation

MyCozyIsland       2026-07-12T20-40-56-04-00
TheUnmappedHouse   2026-07-12T20-51-16-04-00
AetherVale         2026-07-12T21-15-06-04-00
TheOpenAbove       2026-07-12T21-31-40-04-00
IntoTheMeadow      2026-07-12T21-40-09-04-00
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-44-30-04-00
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
  -> domain mutates state
  -> runtime captures one snapshot object
  -> runtime synchronously invokes all listeners
  -> caller receives the command result only after delivery completes

tick
  -> clamp delta and advance frame/elapsed
  -> tick every domain
  -> capture and synchronously publish one snapshot
  -> capture and return a second snapshot
  -> render canvas and HTML
  -> request successor RAF

observer re-entry or failure
  -> nested command/tick can publish successor S2 before predecessor S1 finishes
  -> a thrown observer escapes after state commit
  -> later observers, both renderers and successor RAF can be skipped
```

## Domains in use

| Domain | Current responsibility |
|---|---|
| Browser host | Document, canvas, DOM, RAF and public `GameHost` |
| Runtime | Kit installation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| Interface | Twelve scoped screens, fields, selection and actions |
| Composition | Routing, Back, nested dispatch and automatic Outcome transition |
| Gameplay | Resources, pressure, orchard, construction, roster, inventory, movement, phases, pests, score and failure |
| Observer publication | Ambient shared-object listener iteration without identity, sequencing or fault isolation |
| Rendering | Canvas world and HTML route/HUD projection |
| Proof/deploy | Node smoke, static build and GitHub Pages publication |

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | Registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions, synchronous publication |
| `scoped-interface-domain-kit` | Screen state, field mutation, selection, action activation, snapshots |
| `entry-domain-kit` | Play, New Game and Settings |
| `session-select-domain-kit` | Save-select projection and Back |
| `run-setup-domain-kit` | Start and Back |
| `active-session-domain-kit` | Movement, collection, phases, pest spawn/movement/contact/clearing, score and failure |
| `interrupt-domain-kit` | Pause, Resume and Title |
| `construction-domain-kit` | Construction action routing and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | Run summary and Title |
| `interface-composition-kit` | Route transitions, Back, nested dispatch and automatic Outcome routing |
| `resource-ledger-kit` | Balance checks, payment, grants and snapshots |
| `pressure-field-kit` | Pressure adjustment, ticking and snapshots |
| `orchard-world-kit` | Tree/apple generation, nearest collection, refill and snapshots |
| `construction-runtime-kit` | Catalog, payment, built placement and snapshots |
| `roster-runtime-kit` | Payment, hiring and snapshots |
| `inventory-runtime-kit` | Equipment mutation and snapshots |
| `world-canvas-render-kit` | Canvas projection of trees, apples, player, pests and built objects |
| `html-interface-render-kit` | Delegated actions, HUD, screens, cards and Outcome projection |
| `game-host-diagnostics-kit` | Raw engine publication, state readback and manual tick |
| `smoke-fixture-kit` | Entry, Play and apple-population assertions |
| `static-build-copy-kit` | Static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Main findings

```txt
publication identity and sequence: absent
observer identity, generation and cursor: absent
immutable snapshot envelope: absent
shared-object mutation protection: absent
reentrancy fence or FIFO delivery queue: absent
observer exception isolation: absent
typed delivery and backpressure results: absent
committed-result/delivery-result separation: absent
first visible publication-frame acknowledgement: absent
```

## Required parent DSK

`zombie-orchard-runtime-observer-publication-authority-domain`

Required transaction:

```txt
committed command or simulation step
  -> allocate publication ID, sequence and predecessor
  -> capture state/frame/event provenance
  -> build immutable fingerprinted SnapshotEnvelope
  -> enqueue delivery after mutation unwinds
  -> deliver monotonically to identified observer generations
  -> isolate faults and continue to remaining observers
  -> record delivery duration, fault and backpressure results
  -> preserve the committed mutation result independently
  -> render one admitted publication
  -> acknowledge the first matching visible frame
```

## Validation boundary

This run changes documentation only. It does not claim immutable delivery, monotonic observer order, reentrancy isolation, observer fault containment, retry safety or browser-frame liveness.