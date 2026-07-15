# Project breakdown: ZombieOrchard public runtime capability and frame admission

**Timestamp:** `2026-07-14T21-41-41-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `public-runtime-capability-frame-admission-authority-central-reconciled`

## Summary

ZombieOrchard publishes the complete mutable engine through `window.GameHost`, including raw domains, context, kit installation, arbitrary commands, subscriptions and manual ticking. A public `GameHost.tick(dt)` advances every domain but does not render HTML or Canvas2D; the next RAF advances the simulation again before showing a frame. Public mutations therefore have no capability policy, source identity, route or pause admission, result journal, frame correlation or first-visible-frame acknowledgement.

## Plan ledger

**Goal:** replace raw mutable host publication with versioned, least-authority capabilities whose accepted mutations settle once and are visibly acknowledged by both presentation surfaces.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger entries and ten root `.agent` states.
- [x] Compare all eligible repository heads with their recorded documentation heads.
- [x] Confirm zero new, ledger-missing, root-agent-missing or runtime-ahead eligible repositories.
- [x] Select only `LuminaryLabs-Publish/ZombieOrchard` as the oldest synchronized eligible repository.
- [x] Inspect browser boot, raw host publication, runtime commands, domain APIs, manual tick, snapshots, subscriptions and both renderers.
- [x] Identify the complete interaction loop, all domains, all kits and every offered service.
- [x] Preserve the complete 27-surface implemented inventory.
- [x] Add a timestamped tracker, turn ledger and focused audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement capability admission, external-tick policy, mutation receipts and browser fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected repository: ZombieOrchard
selection reason: oldest synchronized central documentation timestamp
```

```txt
ZombieOrchard        2026-07-14T16-41-33-04-00 selected
TheUnmappedHouse     2026-07-14T17-00-55-04-00
TheOpenAbove         2026-07-14T17-39-01-04-00
AetherVale           2026-07-14T17-58-14-04-00
PhantomCommand       2026-07-14T18-41-11-04-00
PrehistoricRush      2026-07-14T18-58-04-04-00
TheLongHaul          2026-07-14T19-39-36-04-00
MyCozyIsland         2026-07-14T20-05-56-04-00
IntoTheMeadow        2026-07-14T20-40-50-04-00
HorrorCorridor       2026-07-14T21-10-43-04-00
```

## Complete interaction loop

```txt
browser boot
  -> create one mutable engine and domain graph
  -> create Canvas2D and HTML renderers
  -> publish window.GameHost with raw engine, getState and tick
  -> start recursive RAF

normal RAF
  -> engine.tick(1/60)
  -> clear runtime events
  -> tick every domain
  -> notify subscribers with an unversioned snapshot
  -> render Canvas2D snapshot
  -> render HTML snapshot
  -> schedule next RAF

public manual tick
  -> any same-page script calls GameHost.tick(dt)
  -> runtime clamps dt to 0..0.1
  -> frame and elapsed advance
  -> events are cleared
  -> every domain ticks
  -> subscribers are notified
  -> no Canvas2D or HTML render occurs

next normal RAF
  -> engine advances again
  -> renderers display the state after the extra RAF step
  -> no receipt identifies the public mutation or matching visible frame

raw-engine bypass
  -> caller reads or mutates GameHost.engine.ctx and domains
  -> caller invokes engine.command, engine.addKit or direct domain APIs
  -> direct APIs can alter resources, pressure or orchard state without engine command publication
  -> no capability revision, source identity, run binding or route policy is enforced
```

## Domains in use

```txt
browser document, DOM, delegated click input, Canvas2D, RAF and public global publication
host capability publication, state readback, manual tick and raw engine exposure
kit registration, domain construction, arbitrary command dispatch, events, snapshots, subscriptions and notification
entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences and outcome
interface composition, nested actions, route transitions, Back and outcome routing
resource ledger, pressure field, orchard world, construction, roster and inventory
movement, collection, phase changes, pest lifecycle, clearing, score, damage, failure and outcome
public capability identity, caller classification, command admission, external-tick leases, result journaling and retirement
HTML screen/HUD projection and Canvas2D world projection
validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | kit registration, domain creation, arbitrary command dispatch, unconditional ticks, events, snapshots, subscriptions, publication |
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
| `interface-composition-kit` | route transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payment, grants, snapshots |
| `pressure-field-kit` | pressure adjustment, unconditional ticking, snapshots |
| `orchard-world-kit` | random tree and apple generation, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment request, built-record append, message, snapshots |
| `roster-runtime-kit` | caller-controlled payment, actor append, caller-controlled name, hardcoded role, snapshots |
| `inventory-runtime-kit` | item snapshots, equipment mutation, equipped snapshot |
| `world-canvas-render-kit` | canvas sizing, tree, apple, pest and player projection |
| `html-interface-render-kit` | delegated actions and commands, HUD, screens, cards, messages, titles, descriptions, `innerHTML` projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual tick |
| `smoke-fixture-kit` | Entry, first Play and apple assertions |
| `static-build-copy-kit` | static `dist` assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned capability-authority subkits: 19
planned authority family including parent: 20
```

## Source-backed findings

- `src/start.js` publishes `window.GameHost = { engine, getState, tick }` before the first draw call.
- The published `engine` includes mutable `ctx`, mutable `domains`, `addKit`, `command`, `tick`, `snapshot` and `subscribe`.
- `GameHost.tick(dt)` calls `engine.tick(dt)` only; it does not call either renderer.
- The recursive RAF always calls another `engine.tick(1 / 60)` before rendering.
- A single public manual tick can therefore become an invisible simulation step followed by another visible RAF step.
- `engine.snapshot()` returns domain snapshots only and omits runtime frame, elapsed time, event identity, caller identity and host generation.
- `engine.command()` accepts any domain ID and command available to the raw caller; no public command allowlist exists.
- Raw callers can invoke domain APIs directly, bypassing `engine.command()` and its subscriber notification path.
- `engine.addKit()` allows late replacement or addition of domain IDs without provider admission or generation identity.
- Public capabilities are never revoked on route exit, fatal error, page lifecycle change or host retirement.
- The smoke test does not exercise GameHost publication, manual tick, direct domain APIs, route/pause gating, stale capabilities or visible-frame convergence.

## Required authority

```txt
zombie-orchard-public-runtime-capability-frame-admission-authority-domain
```

## Required transactions

```txt
PublicCapabilityPublicationCommand
  -> bind HostGeneration, RunGeneration, route revision, pause revision and capability-policy revision
  -> prepare a least-authority readback and command surface
  -> exclude raw engine, mutable domains, mutable context and addKit
  -> assign CapabilitySetId and expiration/retirement policy
  -> publish PublicCapabilityPublicationResult

PublicMutationCommand
  -> bind CapabilitySetId, CallerId, CommandId, expected state revision and command policy
  -> admit only allowlisted product commands
  -> reject duplicate, stale, retired, route-ineligible and pause-ineligible work
  -> settle exactly once and publish PublicMutationResult
  -> project the accepted state to HTML and Canvas2D
  -> publish FirstVisiblePublicMutationFrameAck

ExternalTickCommand
  -> remain disabled in production by default
  -> require an explicit test/debug lease and expected frame revision
  -> validate dt, source, route, pause and run generation
  -> advance exactly one admitted simulation step
  -> render or explicitly classify headless execution
  -> publish ExternalTickResult and matching frame acknowledgement

PublicCapabilityRetirementCommand
  -> revoke the capability set and all leases
  -> reject late callers
  -> clear public references
  -> publish retirement receipts
```

## Repo-local output

```txt
.agent/trackers/2026-07-14T21-41-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T21-41-41-04-00.md
.agent/architecture-audit/2026-07-14T21-41-41-04-00-public-runtime-capability-frame-admission-dsk-map.md
.agent/render-audit/2026-07-14T21-41-41-04-00-manual-tick-visible-frame-divergence-gap.md
.agent/gameplay-audit/2026-07-14T21-41-41-04-00-external-tick-double-step-loop.md
.agent/interaction-audit/2026-07-14T21-41-41-04-00-public-capability-command-result-map.md
.agent/host-capability-audit/2026-07-14T21-41-41-04-00-gamehost-read-write-tick-contract.md
.agent/deploy-audit/2026-07-14T21-41-41-04-00-public-capability-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T21-41-41-04-00-oldest-selection-public-capability-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

Documentation only. Runtime source, public API behavior, gameplay, renderer behavior, dependencies, package scripts, tests, workflows, build and deployment are unchanged. No least-authority host surface, command admission, external-tick safety, frame correlation, capability retirement, artifact parity or production-readiness claim is made.