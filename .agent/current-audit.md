# Current audit: ZombieOrchard

## Status

```txt
last aligned: 2026-07-11T18-28-40-04-00
status: runtime-session-instance-fresh-run-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
central internal change log: pending until central commit
```

## Summary

`ZombieOrchard` creates one mutable engine graph at module boot and reuses it for all interface routes. Play, New Game, Start, Pause, Outcome and Title do not instantiate, reset, replace or dispose a run. After failure, Outcome -> Title -> Play reuses the ended active-session, and the composition tick returns immediately to Outcome. Every other gameplay domain also retains its prior mutable state.

## Plan ledger

**Goal:** establish one runtime/run/session authority and atomic fresh-run transaction before clock, capability, composite transaction, seeded replay or persistence work.

- [x] Compare all ten accessible Publish repositories with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` as the oldest eligible central entry.
- [x] Read `src/start.js`, `src/game.js`, `src/kits/runtime.js`, `src/kits/composition.js`, `src/kits/scoped-interface-domains.js`, `src/kits/game-domains.js`, `src/presets/orchard-preset.js`, both renderers and `tests/smoke.mjs`.
- [x] Trace module boot, mutable graph ownership, route transitions, terminal failure, Title and restart paths.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define runtime/run identity, lifecycle, reset transaction, rollback, first-frame and disposal contracts.
- [x] Add architecture, render, gameplay, interaction, session-lifecycle and deploy audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run runtime-session fixtures.
- [ ] Synchronize the central ledger and internal change log.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected: ZombieOrchard
reason: oldest eligible central timestamp
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/ZombieOrchard` was changed in the Publish organization.

## Interaction loop

```txt
createOrchardGame() at module boot
  -> create resource, pressure, orchard, construction,
     roster, inventory, interface and active-session domains
  -> seed apples
  -> return one graph

browser boot
  -> create canvas renderer
  -> create delegated HTML renderer
  -> start recursive RAF
  -> expose raw GameHost

visible lifecycle actions
  -> interface-composition activate
  -> optional child command
  -> route move only

RAF
  -> tick every domain regardless active route
  -> auto-route ended active-session to Outcome
  -> render world canvas from orchard and session
  -> render HTML from active interface route

terminal restart path
  -> failure sets ended
  -> Outcome -> Title moves to Entry
  -> Play or Start moves to active-session
  -> same ended graph remains
  -> next tick moves back to Outcome
```

## Main findings

1. `src/start.js` creates the engine once before any Play or New Game action.
2. `src/game.js` creates every mutable state-owning domain once.
3. `interface-composition-kit` owns only `active` and `previous` route fields.
4. `move(to)` changes route state but does not construct, reset or dispose domains.
5. `active-session-domain-kit` sets `ended = true` at zero condition and exposes no reset.
6. Outcome Title routes to Entry only.
7. Entry Play and Run Setup Start route to the existing active-session only.
8. Composition auto-routes any ended session back to Outcome on the next tick.
9. Resources, pressure, apples, built objects, roster, inventory, day, phase, player, pests and score survive the supposed restart.
10. RAF and tickable domains continue on Entry, Run Setup, Pause, menus and Outcome.
11. Canvas always renders world state regardless active interface route.
12. No runtime/run/session identity, lifecycle revision, reset transaction, rollback, first-frame acknowledgement or ordered disposal exists.

## Domains in use

```txt
browser boot and runtime host
runtime-session and run lifecycle authority: missing
kit/domain graph construction
commands, ticks, events, snapshots, subscriptions and publication
fixed-step committed tick authority: missing
public capability and composite transaction authority: missing
seeded random stream and replay authority: missing
versioned persistence authority: missing
12 interface-screen domains and composition
resource, pressure, orchard, construction, roster and inventory
movement, collection, phases, pests, damage, score and failure
canvas and HTML rendering
GameHost diagnostics
smoke, build and Pages deployment
```

## Implemented kits and services

| Kit group | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, elapsed/frame mutation, all-domain tick, events, snapshots, subscriptions and publication |
| interface kits | screen state, actions, selection, fields, activation, routing, nested dispatch and automatic Outcome routing |
| `resource-ledger-kit` | affordability, payment, gain and resource snapshot |
| `pressure-field-kit` | clamped pressure channels and per-tick growth |
| `orchard-world-kit` | tree grid, apple population, nearest collection and refill |
| `construction-runtime-kit` | catalog selection, resource debit and built-object mutation |
| `roster-runtime-kit` | resource debit and actor hiring |
| `inventory-runtime-kit` | item state and equipment selection |
| `active-session-domain-kit` | movement, collection, phases, pest admission/placement, pursuit, damage, score and terminal failure |
| render kits | orchard canvas, HUD, generic screens, delegated actions and per-frame HTML replacement |
| diagnostics/proof/deploy | raw engine, snapshot, manual tick, smoke, static copy and Pages chain |

## Complete implemented kit inventory

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

## Required composed domain

```txt
zombie-orchard-runtime-session-authority-domain
  -> runtime-instance-id-kit
  -> run-instance-id-kit
  -> session-epoch-kit
  -> lifecycle-state-machine-kit
  -> fresh-run-state-factory-kit
  -> run-start-command-kit
  -> run-start-admission-kit
  -> run-reset-plan-kit
  -> run-reset-transaction-kit
  -> run-state-commit-kit
  -> route-session-binding-kit
  -> run-end-latch-kit
  -> title-exit-transaction-kit
  -> stale-run-command-rejection-kit
  -> run-snapshot-provenance-kit
  -> first-run-frame-ack-kit
  -> runtime-session-journal-kit
  -> fresh-run-fixture-kit
  -> restart-disposal-fixture-kit
```

## Required proof

```txt
initial Play commits run A with canonical fresh state
Outcome -> Title retires run A
Title -> Play commits run B, not run A
New Game -> Start commits a distinct fresh run
all state-owning domains reset through one candidate graph
failed candidate validation rolls back without partial authority
stale run-A callbacks and commands cannot mutate run B
canvas, HTML and GameHost cite one committed run/frame
repeated restart cycles retain one RAF chain and one delegated listener
disposal is ordered and idempotent
```

## Ordered safe ledges

```txt
1. Runtime Session Instance Authority
2. Fixed-Step Clock Authority
3. Public Capability Gateway and Reachability
4. Composite Command Transaction Authority
5. Seeded Random and Replay Authority
6. Versioned Save / Load Authority
```

Gate 2 and later must consume Gate 1 `runtimeId`, `runId`, `sessionEpoch`, lifecycle and graph revision.