# Project breakdown: ZombieOrchard

**Timestamp:** `2026-07-14T10-59-56-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Selection:** oldest eligible synchronized repository after higher-priority classes were empty  
**Reviewed pre-audit head:** `b6d5da397dfd668b9dfddb431e5a78f0af8eb6f4`

## Summary

ZombieOrchard is a dependency-free browser orchard-survival and economy shell. It composes a mutable kit runtime, 12 interface domains, resource, pressure, orchard, construction, roster and inventory services, Canvas2D and HTML projection, a browser-global host, a Node smoke fixture, static build copying and GitHub Pages deployment.

The current breakdown isolates roster hiring. The browser route can only display roster cards and return to play, while the raw `roster-runtime/hire` command accepts caller-controlled names and costs, can mint money through negative costs, can hire for free through non-numeric costs, hardcodes every role to `harvest`, and never makes hired actors affect gameplay or Canvas2D presentation.

## Plan ledger

**Goal:** define hiring as one validated settlement from authored offer through payment, actor identity, role capability, gameplay adoption, safe projection, rollback and first visible proof.

- [x] Compare all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no new, ledger-missing, root-agent-missing or runtime-ahead repository has priority.
- [x] Select and modify only `LuminaryLabs-Publish/ZombieOrchard` under the oldest eligible rule.
- [x] Inspect boot, runtime, interfaces, composition, gameplay services, preset, renderers, smoke proof, build and deployment.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all 27 implemented kit surfaces and offered services.
- [x] Define the roster-hiring gameplay-adoption authority family.
- [x] Add one new timestamped tracker and audit family.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime authority and executable source/browser/build/Pages fixtures remain future work.

## Organization comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
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

Only `LuminaryLabs-Publish/ZombieOrchard` is modified in the Publish organization during this run.

## Complete interaction loop

```txt
browser boot
  -> create kit runtime
  -> install resource, pressure, orchard, construction, roster and inventory services
  -> install 12 interface domains and interface composition
  -> create Canvas2D and HTML renderers
  -> publish raw GameHost
  -> begin fixed 1/60 RAF tick

normal roster browser path
  -> enter active-session
  -> activate Roster
  -> transition to roster route
  -> render roster-runtime.actors as HTML cards
  -> expose Back only
  -> no authored Hire action exists

raw hiring path
  -> GameHost.engine.command("roster-runtime", "hire", payload)
  -> read payload.cost or default 25
  -> request resource-ledger payment
  -> append actor with caller-provided name
  -> hardcode role to harvest
  -> return generic accepted result

unsafe settlement cases
  -> negative numeric cost passes canPay
  -> subtracting a negative cost increases money
  -> truthy non-numeric cost normalizes to zero
  -> zero-cost actor is appended
  -> caller-provided HTML-like name reaches innerHTML projection without escaping

post-hire gameplay
  -> actor remains stored in roster snapshot
  -> collection, clearing, construction, pressure and survival never read roster state
  -> active HUD omits worker count, role and effects
  -> Canvas2D renders no hired actor
  -> no HireCommandId, RosterRevision, WorkerEffectRevision or first visible worker-frame acknowledgement exists
```

## Domains in use

```txt
browser document, DOM, delegated input, Canvas2D, RAF, error panel and public GameHost
kit registration, domain creation, arbitrary command dispatch, ticks, events, snapshots, subscriptions and publication
entry, session-select, run-setup, active-session, interrupt, construction, exchange, roster, inventory, knowledge, preferences and outcome
interface composition, nested action routing and route transitions
resource balances, payment and grants
pressure channels and ticking
orchard trees, apples, collection, refill and bounds
construction catalog, payment and built records
roster actors, roles, hiring, identity, cost settlement and worker effects
inventory items and equipped identity
movement, collection, phases, pests, clearing, score, damage, failure and outcome
HTML screens, cards, HUD, delegated controls and messages
Canvas2D orchard, apple, pest and player projection
source validation, smoke proof, static build, Pages deployment and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `kit-runtime` | kit registration, domain creation, arbitrary command dispatch, ticks, events, snapshots, subscriptions, publication |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, descriptors, events, snapshots |
| `entry-domain-kit` | Play, New Game, Settings |
| `session-select-domain-kit` | save-select projection, Back |
| `run-setup-domain-kit` | run setup, Start, Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest lifecycle, clearing, score, damage, failure |
| `interrupt-domain-kit` | Pause, Resume, Title |
| `construction-domain-kit` | construction screen, Storage Shed action, Back |
| `exchange-domain-kit` | market projection, Back |
| `roster-domain-kit` | roster projection, Back |
| `inventory-domain-kit` | inventory projection, Back |
| `knowledge-domain-kit` | codex projection, Back |
| `preferences-domain-kit` | settings projection, Back |
| `outcome-domain-kit` | run summary, Title |
| `interface-composition-kit` | route transitions, nested commands, Back, Outcome routing |
| `resource-ledger-kit` | balance checks, payment, grants, snapshots |
| `pressure-field-kit` | pressure adjustment, ticking, snapshots |
| `orchard-world-kit` | tree generation, apple generation, collection, refill, bounds, snapshots |
| `construction-runtime-kit` | catalog lookup, payment request, built-record append, message, snapshots |
| `roster-runtime-kit` | caller-controlled cost payment, actor append, caller-controlled name, hardcoded role, snapshots |
| `inventory-runtime-kit` | item snapshots, equipment mutation, equipped snapshot |
| `world-canvas-render-kit` | canvas sizing, tree projection, apple projection, pest projection, player projection |
| `html-interface-render-kit` | delegated actions, delegated commands, HUD, screens, cards, messages, titles, descriptions, innerHTML projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback, manual tick |
| `smoke-fixture-kit` | Entry assertion, Play assertion, apple assertion |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented kit surfaces: 27
planned roster-hiring authority surfaces including parent: 24
```

## Source-backed findings

- The roster interface route exposes only `Back`; browser users have no authored Hire action.
- `roster-runtime` accepts raw `hire` commands through `GameHost.engine.command`.
- The command reads `payload.cost || 25`, so a negative number is accepted as the charge and a truthy non-numeric value normalizes to zero in the resource ledger.
- Resource payment subtracts the supplied amount. A negative cost therefore increases the money balance before the actor is appended.
- The command accepts any caller-provided name and returns only `{ accepted: true }` after mutation.
- The HTML renderer converts values with `String()` but does not escape markup before assigning `innerHTML`.
- Every hired actor receives role `harvest`; configured roles are not resolved or validated.
- No roster capacity, duplicate identity, run generation, expected revision, wage, morale policy or actor lifecycle is enforced.
- Active-session collection, clearing, pressure, construction and damage never read `roster-runtime`.
- Canvas2D renders trees, apples, pests and the player only.
- The smoke fixture proves Entry, Play and apple presence only.

## Required authority

```txt
zombie-orchard-roster-hiring-gameplay-adoption-authority-domain
```

## Required transaction

```txt
HireWorkerCommand
  -> bind RunGeneration, HireCommandId, RosterRevision,
     WorkerCatalogRevision, ResourceRevision and route revision
  -> resolve one authored HireOffer and immutable WorkerRoleDescriptor
  -> normalize and safely encode display identity
  -> validate offer, role, capacity, cost, balance and duplicate policy
  -> reject negative, non-numeric, stale, duplicate, retired or unknown work
  -> reserve the exact positive cost without mutating the predecessor
  -> prepare roster, active-session, HTML and Canvas2D candidates
  -> atomically commit one RosterRevision and WorkerEffectRevision
  -> publish HireWorkerResult and participant receipts
  -> make orchard labor actions cite the accepted worker-effect revision
  -> project the same revision in roster, HUD and Canvas2D
  -> publish FirstVisibleRosterFrameAck
  -> otherwise release the reservation, restore the predecessor and dispose candidates
```

## Planned coordinating surfaces

```txt
hire-command-id-kit
run-generation-binding-kit
roster-revision-kit
worker-catalog-revision-kit
hire-offer-admission-kit
hire-cost-policy-kit
worker-name-normalization-kit
worker-name-safe-projection-kit
role-catalog-kit
roster-capacity-kit
hire-candidate-kit
resource-reservation-kit
worker-effect-descriptor-kit
active-session-worker-adoption-kit
orchard-labor-resolution-kit
roster-ui-command-kit
roster-hud-projection-kit
roster-canvas-projection-kit
hire-settlement-result-kit
hire-rollback-kit
first-visible-roster-frame-ack-kit
roster-hiring-fixture-matrix-kit
source-dist-pages-roster-parity-kit
```

## Validation boundary

```txt
runtime source changed: no
HTML or CSS changed: no
dependencies or package scripts changed: no
gameplay changed: no
roster behavior changed: no
resource behavior changed: no
Canvas2D or HTML behavior changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
headless roster fixtures: unavailable / not run
browser roster fixtures: unavailable / not run
dist roster smoke: unavailable / not run
Pages roster smoke: unavailable / not run
combined commit statuses before audit: none
```

No validated hiring, safe cost settlement, actor identity policy, worker gameplay adoption, matching visible state, rollback, artifact parity or production-readiness claim is made.