# Project breakdown: ZombieOrchard terminal outcome seal

**Timestamp:** `2026-07-12T18-48-07-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Mode:** documentation-only

## Summary

ZombieOrchard was selected because the complete ten-repository Publish inventory had no new, ledger-missing or root-`.agent`-missing eligible repository and ZombieOrchard had the oldest central update. The breakdown identifies a terminal-outcome authority gap: failure stops ticking but does not freeze commands or final result state.

## Plan ledger

**Goal:** preserve the full repository breakdown while defining a one-way terminal transaction from damage evidence through immutable Outcome projection.

- [x] Enumerate the full Publish organization inventory.
- [x] Compare all eligible repositories with central ledger timestamps.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only ZombieOrchard.
- [x] Inspect boot, runtime, composition, gameplay, preset, render and smoke files.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 27 implemented kit surfaces.
- [x] Identify the services each kit offers.
- [x] Isolate terminal outcome sealing and post-terminal mutation.
- [x] Define the required DSK/domain composition.
- [x] Define render, gameplay, interaction and deploy proof.
- [ ] Implement runtime changes or fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

ZombieOrchard      2026-07-12T16-51-47-04-00 selected
MyCozyIsland       2026-07-12T17-10-31-04-00
TheUnmappedHouse   2026-07-12T17-20-42-04-00
AetherVale         2026-07-12T17-35-48-04-00
TheOpenAbove       2026-07-12T17-41-25-04-00
IntoTheMeadow      2026-07-12T17-58-43-04-00
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
module boot
  -> install 19 engine kits
  -> create renderers
  -> expose GameHost
  -> start RAF

active run
  -> active-session tick advances pest movement and damage
  -> condition crossing zero sets ended=true
  -> composition later observes ended and routes Outcome
  -> Outcome reads live score/day

post-terminal
  -> direct active-session command remains available
  -> gameplay/economy/world state can mutate
  -> Outcome summary changes
```

## Domains in use

```txt
browser host and public diagnostics
kit runtime and synchronous publication
interface screens and composition
route selection and Outcome projection
resource ledger and pressure field
orchard generation, collection and refill
construction, roster and inventory
player movement and phase progression
pest spawning, pursuit, damage and clearing
score, failure and terminal outcome
canvas world projection
HTML HUD and screen projection
tests, static build and Pages deployment
central documentation tracking
```

## All implemented kit surfaces and offered services

| Kit | Services |
|---|---|
| kit-runtime | Kit registration, domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions, synchronous publication |
| scoped-interface-domain-kit | Screen state, fields, selection, action descriptors, activation and snapshots |
| entry-domain-kit | Play, New Game and Settings actions |
| session-select-domain-kit | Save-select projection and back navigation |
| run-setup-domain-kit | Start and Back actions |
| active-session-domain-kit | Movement, collection, clearing, phase changes, pest simulation, damage, score, failure and session snapshot |
| interrupt-domain-kit | Pause, Resume and Title actions |
| construction-domain-kit | Build screen action routing and Back |
| exchange-domain-kit | Market screen and Back |
| roster-domain-kit | Roster screen and Back |
| inventory-domain-kit | Inventory screen and Back |
| knowledge-domain-kit | Codex screen and Back |
| preferences-domain-kit | Settings screen and Back |
| outcome-domain-kit | Run Summary and Title |
| interface-composition-kit | Route transition, Back, nested command dispatch and automatic Outcome routing |
| resource-ledger-kit | Balance checks, payment, grants and resource snapshot |
| pressure-field-kit | Pressure adjustment, ticking and snapshot |
| orchard-world-kit | Tree generation, apple generation, nearest collection, refill and world snapshot |
| construction-runtime-kit | Catalog lookup, resource payment, built-object placement and snapshot |
| roster-runtime-kit | Resource payment, actor hiring and snapshot |
| inventory-runtime-kit | Equipment mutation and snapshot |
| world-canvas-render-kit | Trees, apples, pests and player canvas projection |
| html-interface-render-kit | Delegated actions, HUD, screens, cards and Outcome summary |
| game-host-diagnostics-kit | Raw engine publication, snapshot readback and manual tick |
| smoke-fixture-kit | Entry, Play transition and apple-population assertions |
| static-build-copy-kit | Static dist assembly |
| pages-deploy-kit | GitHub Pages publication |

## Main findings

```txt
failure detection: mutable Boolean inside active-session tick
simulation after failure: stopped
commands after failure: still callable
terminal result object: absent
terminal revision: absent
participant freeze: absent
command capability revocation: absent
Outcome route atomic with terminal commit: no
Outcome projection source: live active-session state
public direct command path: present
terminal fixtures: absent
```

## Required parent domain

```txt
zombie-orchard-terminal-outcome-seal-authority-domain
```

## Required kit composition

```txt
terminal identity and cause
  -> terminal-outcome-id-kit
  -> terminal-cause-kit
  -> terminal-predicate-evidence-kit

admission and commit
  -> terminal-outcome-candidate-kit
  -> terminal-outcome-admission-kit
  -> terminal-state-seal-kit
  -> terminal-outcome-result-kit
  -> terminal-outcome-revision-kit

revocation and projection
  -> terminal-command-revocation-kit
  -> terminal-capability-lease-kit
  -> post-terminal-rejection-kit
  -> terminal-route-commit-kit
  -> terminal-outcome-read-model-kit
  -> terminal-outcome-projection-kit
  -> first-terminal-frame-ack-kit

proof
  -> failure-threshold-fixture-kit
  -> post-terminal-command-fixture-kit
  -> terminal-summary-immutability-fixture-kit
  -> terminal-source-dist-pages-parity-fixture-kit
```

## Validation boundary

No runtime, gameplay, rendering, package, dependency or deployment file changed. The output is an architecture and proof plan only.
