# ZombieOrchard project breakdown: day/phase transition admission

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Summary

ZombieOrchard exposes `next-phase` as a direct active-session command. Each accepted command toggles day/night immediately, and every night-to-day toggle increments the day counter. The command has no expected phase or revision, minimum phase duration, transition lock, idempotency key, required settlement, or matching-frame acknowledgement. Two activations can therefore enter and leave night before a simulation tick applies night pressure or pest behavior.

## Plan ledger

**Goal:** make every day/night transition an admitted, revision-bound settlement rather than an unconditional toggle.

- [x] Compare all 11 accessible Publish repositories and exclude `TheCavalryOfRome`.
- [x] Compare the ten eligible repositories with central ledgers and root `.agent` state.
- [x] Select only ZombieOrchard because repo-local audit state was ahead of the central ledger and it remained the oldest central selection.
- [x] Trace page boot, RAF, HTML controls, command dispatch, active-session phase mutation, pressure, pest simulation, Canvas2D, smoke, build, and Pages deployment.
- [x] Identify the complete interaction loop, all domains, all 27 implemented kits, and every offered service.
- [x] Define one day/phase transition parent authority with 19 coordinating surfaces.
- [x] Add a new timestamped tracker and focused audit family.
- [ ] Implement transition admission and run rapid-activation, zero-night-tick, artifact, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
repo-local-ahead-of-central: 1

selected: LuminaryLabs-Publish/ZombieOrchard
repo-local head before this run: daa0d61a562f980a4a52c591752664ec7ad58430
central documented repo-local head: 5492bae4c3186744a758a4b825ec77e484eb0804
ahead by: 15 documentation commits
```

## Complete interaction loop

```txt
page load
  -> create kit runtime and 19 engine domains
  -> create Canvas2D world renderer
  -> create delegated HTML interface renderer
  -> expose GameHost diagnostics
  -> start recursive RAF

every frame
  -> engine.tick(1/60)
  -> pressure increases
  -> active-session simulates night pests and contact damage
  -> interface composition may route outcome
  -> Canvas2D renders world snapshot
  -> HTML renders HUD and controls
  -> request next RAF

Next Phase activation
  -> delegated click finds data-command="next-phase"
  -> engine.command("active-session", "next-phase")
  -> phase toggles immediately
  -> night-to-day increments day immediately
  -> result returns accepted
  -> no expected phase, duration, lock, settlement, or frame receipt
```

## Domains in use

```txt
browser document, RAF, DOM, pointer, keyboard, focus and page lifecycle
kit registration, domain creation, command dispatch, delta clamping, ticking, events, snapshots and subscriptions
interface route identity, active-screen projection and nested command routing
resource balances, payments and grants
pressure channels and time growth
orchard generation, apples, collection and refill
active-session movement, collection, combat, phase, score, damage and failure
construction purchases and built records
roster hiring and actor records
inventory and equipment
Canvas2D world projection
HTML route, HUD, card and command projection
public GameHost diagnostics
phase transition identity, preconditions, duration, settlement, idempotency and frame acknowledgement
smoke validation, static build, Pages deployment, repo-local audit and central reconciliation
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned phase-transition surfaces: 19
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, ticking, event buffering, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save Select projection, Back |
| `run-setup-domain-kit` | run setup projection, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest simulation, contact damage, clearing, score, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction projection, Storage Shed action, Back |
| `exchange-domain-kit` | Market projection, Back |
| `roster-domain-kit` | Roster projection, Back |
| `inventory-domain-kit` | Inventory projection, Back |
| `knowledge-domain-kit` | Codex projection, Back |
| `preferences-domain-kit` | Settings projection, Back |
| `outcome-domain-kit` | outcome projection, Title |
| `interface-composition-kit` | route transitions, nested commands, Back, outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants, snapshots |
| `pressure-field-kit` | pressure channels, clamped adjustment, time growth, commands, snapshots |
| `orchard-world-kit` | tree generation, apple generation and refill, collection, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages, snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages, snapshots |
| `inventory-runtime-kit` | item snapshots, equipment mutation |
| `world-canvas-render-kit` | canvas sizing, player projection, tree projection, apple projection, pest projection |
| `html-interface-render-kit` | delegated route commands, delegated gameplay commands, HUD projection, card projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual ticking |
| `smoke-fixture-kit` | entry assertion, Play assertion, orchard apple assertion |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed finding

```txt
Next Phase direct DOM command: present
unconditional phase toggle: present
night-to-day day increment: present
night-only pest simulation: present
fixed RAF tick after browser events: present

PhaseTransitionId: absent
expected phase/day/revision: absent
minimum phase duration: absent
transition eligibility policy: absent
pending-transition lock: absent
settlement participants: absent
idempotency journal: absent
terminal PhaseTransitionResult: absent
FirstPhaseBoundFrameAck: absent
rapid-double-activation fixture: absent
```

Concrete paths:

1. `src/renderer/html-interface-renderer.js` renders `Next Phase` with `data-command="next-phase"` and delegates directly to `active-session`.
2. `src/kits/game-domains.js` toggles `state.phase` on every command and increments `state.day` whenever the resulting phase is `day`.
3. The same active-session tick simulates pests only while the phase is `night`.
4. `src/start.js` performs the next fixed tick only during the next RAF.
5. `tests/smoke.mjs` does not test phase transitions, rapid activation, or one-night-tick admission.

Two activations delivered before the next RAF can produce `day -> night -> day`, increment the day counter, and expose no night simulation tick. This is a source-backed gameplay-policy and proof gap; no production incident was reproduced.

## Required parent domain

`zombie-orchard-day-phase-transition-admission-settlement-authority-domain`

## Planned surfaces

- `zombie-orchard-day-phase-transition-admission-settlement-authority-domain`
- `phase-transition-command-envelope-kit`
- `phase-generation-identity-kit`
- `expected-phase-precondition-kit`
- `phase-duration-policy-kit`
- `transition-eligibility-policy-kit`
- `transition-cooldown-kit`
- `pending-transition-lock-kit`
- `night-entry-settlement-kit`
- `day-entry-settlement-kit`
- `pressure-settlement-adapter-kit`
- `pest-settlement-adapter-kit`
- `session-day-counter-adapter-kit`
- `phase-transition-idempotency-kit`
- `phase-transition-result-kit`
- `first-phase-bound-frame-ack-kit`
- `rapid-double-activation-fixture-kit`
- `zero-night-tick-fixture-kit`
- `source-dist-pages-phase-parity-kit`

## Required command boundary

```txt
PhaseTransitionAdmissionCommand
  -> bind TransitionId, IdempotencyKey, expected phase, day and session revision
  -> verify minimum duration, route, player state and pending-transition policy
  -> reject duplicate, stale, early, terminal or suspended work

PhaseTransitionSettlementCommand
  -> settle outgoing phase exactly once
  -> apply pressure, pest, score and day-counter policy
  -> publish the accepted new phase generation
  -> publish PhaseTransitionResult
  -> publish FirstPhaseBoundFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, commands, phase timing, pressure, pest behavior, gameplay values, HTML, Canvas2D, tests, build, workflow, and deployment remain unchanged.