# ZombieOrchard project breakdown: player stamina adoption

**Timestamp:** `2026-07-17T09-43-24-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `player-stamina-effort-recovery-projection-authority-audited`

## Summary

ZombieOrchard exposes `active-session.player.stamina = 100`, but no implemented command, tick, phase transition, pressure rule, HUD projection, outcome projection, or fixture reads or mutates that value. Movement, collection, and clearing remain accepted at full effectiveness regardless of stamina.

The current game is playable without stamina, so no production failure is claimed. The finding is that a public gameplay field implies an effort system that does not yet exist. The implementation should either admit stamina as a real gameplay capability or remove the dead field and avoid advertising it.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/ZombieOrchard
selection class: oldest synchronized documented timestamp
selected prior timestamp: 2026-07-17T04-41-15-04-00
pre-audit repository head: 0233b458bb895a1ca8ccd07cb2ecd8f56208325f
next oldest reported by the latest full comparison: later than ZombieOrchard
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
page load
  -> boot imports start
  -> create kit runtime and 19 engine domains
  -> create Canvas2D and HTML renderers
  -> publish GameHost
  -> start fixed-delta RAF loop

active play
  -> route to active-session
  -> move command changes player x/y by a fixed step
  -> collect command removes and refills an apple
  -> clear command damages one nearby pest
  -> next-phase toggles day/night
  -> night tick spawns and advances pests
  -> contact drains player condition
  -> condition <= 0 ends the run
  -> Canvas2D projects world actors
  -> HTML projects phase, resources, pressure and condition

stamina path
  -> player snapshot begins with stamina 100
  -> no action cost is computed
  -> no action is rejected or degraded by exhaustion
  -> no tick or phase transition restores stamina
  -> no pressure channel changes stamina policy
  -> no HUD or outcome surface displays stamina
  -> no stamina result or frame acknowledgement exists
```

## Domains in use

```txt
browser boot, DOM roots, RAF and public host capabilities
kit registration, domain creation, commands, ticks, events, snapshots and subscriptions
interface routes, screen state, action activation and nested command routing
resource balances, payments and grants
pressure channels and time growth
orchard trees, apples, collection and refill
active-session movement, collection, pest combat, phase, score, condition and failure
construction purchases and built records
roster hiring and actor records
inventory and equipment
Canvas2D world projection
HTML route, HUD, card and command projection
player effort, stamina admission, exhaustion, recovery and projection
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned stamina-authority surfaces: 19
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, ticking, event buffering, snapshots, subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | Save Select projection, Back |
| `run-setup-domain-kit` | run setup projection, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest simulation, contact damage, clearing, score, failure, public player stamina field |
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
player.stamina initialized to 100: present
stamina included in active-session snapshot: present
movement effort cost: absent
collection effort cost: absent
clearing effort cost: absent
exhaustion admission/rejection: absent
passive or phase recovery: absent
pressure-to-stamina policy: absent
stamina HUD projection: absent
stamina outcome projection: absent
StaminaActionResult: absent
FirstStaminaBoundFrameAck: absent
stamina fixtures: 0
```

Concrete paths:

1. `src/kits/game-domains.js` initializes stamina but movement, collect, clear, next-phase and tick do not consume, restore or gate it.
2. `src/renderer/html-interface-renderer.js` projects condition but not stamina in the active HUD and does not include stamina in the outcome summary.
3. `src/renderer/world-canvas.js` has no exhaustion or recovery presentation state.
4. `src/presets/orchard-preset.js` defines no effort-cost or recovery policy.
5. The current smoke fixture does not validate depletion, rejection, recovery or presentation.

## Required parent domain

`zombie-orchard-player-stamina-effort-recovery-projection-authority-domain`

## Planned surfaces

- `zombie-orchard-player-stamina-effort-recovery-projection-authority-domain`
- `stamina-state-schema-kit`
- `effort-cost-policy-kit`
- `action-effort-admission-kit`
- `movement-effort-adapter-kit`
- `collection-effort-adapter-kit`
- `clearing-effort-adapter-kit`
- `phase-recovery-policy-kit`
- `passive-recovery-tick-kit`
- `exhaustion-state-kit`
- `stamina-command-result-kit`
- `pressure-stamina-coupling-kit`
- `stamina-hud-projection-kit`
- `stamina-outcome-projection-kit`
- `first-stamina-bound-frame-ack-kit`
- `depletion-boundary-fixture-kit`
- `recovery-boundary-fixture-kit`
- `action-rejection-fixture-kit`
- `source-dist-pages-stamina-parity-kit`

## Required command boundary

```txt
StaminaActionAdmissionCommand
  -> bind run, player, action and stamina revisions
  -> resolve movement, collect or clear effort cost
  -> accept, degrade or reject the action explicitly
  -> publish StaminaActionResult

StaminaRecoveryCommand
  -> bind accepted tick or phase transition evidence
  -> apply bounded recovery exactly once
  -> publish StaminaRecoveryResult

StaminaProjectionCommitCommand
  -> bind the accepted player and interface revisions
  -> project stamina and exhaustion state
  -> publish FirstStaminaBoundFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, packages, tests, build, workflow and deployment remain unchanged. No stamina capability, effort-cost correctness, exhaustion behavior, recovery behavior, visible projection, artifact parity, Pages parity or production readiness is claimed.