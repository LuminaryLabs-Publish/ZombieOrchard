# ZombieOrchard project breakdown: cross-domain gameplay transaction settlement

**Timestamp:** `2026-07-16T16-40-45-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `cross-domain-gameplay-transaction-settlement-authority-audited`

## Summary

ZombieOrchard composes gameplay from small domains, but several accepted actions mutate multiple domains sequentially without one transaction identity, participant preflight, expected revisions, atomic commit, rollback, idempotency result, or frame acknowledgement. Collection can remove and replace an apple before optional resource and pressure changes; clearing can remove a pest before optional scrap credit; construction and hiring debit the ledger before recording the acquired object or actor; interface composition does not propagate nested command rejection.

## Plan ledger

**Goal:** settle each multi-domain gameplay action exactly once across all participants, or leave every participant unchanged with an explicit rejection result.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only ZombieOrchard by the oldest synchronized central timestamp.
- [x] Trace boot, delegated commands, nested interface dispatch, game-domain mutation, runtime notification, RAF ticking, Canvas2D, HTML, smoke, build, and deployment.
- [x] Identify the complete interaction loop, all active domains, all 27 implemented kits, and every offered service.
- [x] Define one cross-domain transaction parent authority with 20 coordinating surfaces.
- [x] Add a timestamped tracker and focused audit family.
- [ ] Implement transaction settlement and execute rejection, rollback, retry, artifact, and Pages fixtures.

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
prior central timestamp: 2026-07-16T09-02-09-04-00
next oldest: LuminaryLabs-Publish/TheUnmappedHouse
next timestamp: 2026-07-16T09-58-49-04-00
```

## Complete interaction loop

```txt
page load
  -> create kit runtime
  -> install 19 engine domains
  -> create Canvas2D and delegated HTML renderers
  -> expose GameHost diagnostics
  -> start recursive RAF

user action
  -> delegated click resolves data-action or data-command
  -> interface-composition activates the current action
  -> optional nested domain command executes
  -> one or more domains mutate immediately and sequentially
  -> runtime publishes a new snapshot notification
  -> nested result may be discarded

every frame
  -> engine.tick(1/60)
  -> pressure and active-session domains advance
  -> composition may route ended sessions to outcome
  -> Canvas2D and HTML consume the resulting snapshot

multi-domain examples
  collect
    -> orchard-world removes apple and seeds replacement
    -> resource-ledger grants apples and money when available
    -> pressure-field adjusts rowPressure when available
    -> active-session updates score and message

  clear
    -> active-session damages or removes pest
    -> resource-ledger grants scrap when available
    -> active-session updates score and message

  build or hire
    -> resource-ledger debits cost
    -> construction or roster records the result

  composition action
    -> nested command executes
    -> nested result is not returned to the caller
```

## Domains in use

```txt
browser document, RAF, pointer/click, focus, visibility, page lifecycle
kit registration, command dispatch, delta clamping, ticking, event buffering, snapshots, subscriptions
interface route identity, active-screen projection, action activation and nested command routing
resource balances, payments and grants
pressure channels and time growth
orchard trees, apples, collection and refill
active-session movement, collection, combat, phase, score, damage and failure
construction purchases and built records
roster hiring and actor records
inventory and equipment
Canvas2D world projection
HTML route, HUD, card and command projection
public GameHost diagnostics
cross-domain transaction identity, preflight, prepare, commit, rollback, idempotency and result propagation
smoke validation, static build, Pages deployment, repo-local audit and central tracking
```

## Implemented kit and service census

```txt
engine-installed kits: 19
host/tooling/support kits: 8
total implemented surfaces: 27
planned transaction-authority surfaces: 20
```

| Kit | Services |
|---|---|
| `kit-runtime` | registration, domain creation, command dispatch, delta clamping, ticking, event buffering, snapshots and subscriptions |
| `scoped-interface-domain-kit` | screen state, field mutation, selection, action activation, events and snapshots |
| `entry-domain-kit` | Play, New Game and Settings |
| `session-select-domain-kit` | Save Select projection and Back |
| `run-setup-domain-kit` | run setup projection, Start and Back |
| `active-session-domain-kit` | movement, collection, phase changes, pest spawning and movement, contact damage, clearing, score and failure |
| `interrupt-domain-kit` | Pause, Resume and Title |
| `construction-domain-kit` | construction projection, Storage Shed action and Back |
| `exchange-domain-kit` | Market projection and Back |
| `roster-domain-kit` | Roster projection and Back |
| `inventory-domain-kit` | Inventory projection and Back |
| `knowledge-domain-kit` | Codex projection and Back |
| `preferences-domain-kit` | Settings projection and Back |
| `outcome-domain-kit` | outcome projection and Title |
| `interface-composition-kit` | route transitions, nested commands, Back and outcome routing |
| `resource-ledger-kit` | balance checks, payments, grants and snapshots |
| `pressure-field-kit` | rowPressure and curse state, clamped adjustment, time growth, commands and snapshots |
| `orchard-world-kit` | tree generation, apple generation/refill, collection, bounds and snapshots |
| `construction-runtime-kit` | catalog lookup, payment, built records, messages and snapshots |
| `roster-runtime-kit` | hiring payment, actor records, messages and snapshots |
| `inventory-runtime-kit` | item snapshots and equipment mutation |
| `world-canvas-render-kit` | canvas sizing and player/tree/apple/pest projection |
| `html-interface-render-kit` | delegated route/gameplay commands, HUD and card projection |
| `game-host-diagnostics-kit` | raw engine exposure, state readback and manual ticking |
| `smoke-fixture-kit` | entry, Play and orchard apple assertions |
| `static-build-copy-kit` | static dist assembly |
| `pages-deploy-kit` | GitHub Pages publication |

## Source-backed finding

```txt
TransactionId: absent
IdempotencyKey: absent
expected participant revisions: absent
participant preflight: absent
prepare/commit boundary: absent
rollback or compensation: absent
transaction journal: absent
nested command result propagation: absent
partial mutation classification: absent
FirstTransactionBoundFrameAck: absent
cross-domain failure fixtures: 0
```

Concrete paths:

1. `collectNear()` removes the selected apple, seeds a replacement, and returns before the active-session command attempts optional resource and pressure mutations.
2. The `collect` command uses optional chaining for resource and pressure participants, yet still updates score/message and returns `accepted: true`.
3. The `clear` command can remove a pest before optional scrap credit.
4. Construction and roster commands call `ledger.pay()` before appending the built object or actor, with no compensation contract.
5. `interface-composition` executes an action's nested command but discards its result and may return a generic accepted result.
6. The smoke test proves only entry routing and initial apples; no missing-participant, rejection, duplicate-delivery, rollback, or result-propagation fixture exists.

No partial-settlement incident was reproduced. This is a source-backed ownership and proof gap.

## Required parent domain

`zombie-orchard-cross-domain-gameplay-transaction-settlement-authority-domain`

## Planned surfaces

| Surface | Service |
|---|---|
| `zombie-orchard-cross-domain-gameplay-transaction-settlement-authority-domain` | parent command, participant, commit, rollback and proof authority |
| `gameplay-transaction-command-envelope-kit` | stable transaction ID, command identity, payload digest and attempt metadata |
| `gameplay-transaction-idempotency-kit` | duplicate suppression and stored terminal-result replay |
| `participant-revision-precondition-kit` | expected resource, world, pressure, session, construction and roster revisions |
| `gameplay-transaction-preflight-kit` | participant presence, capability, funds, target and policy validation |
| `gameplay-transaction-prepare-kit` | immutable participant intents before mutation |
| `resource-ledger-transaction-adapter-kit` | prepared debit and grant operations |
| `orchard-collection-transaction-adapter-kit` | prepared apple removal and replacement generation |
| `pressure-adjustment-transaction-adapter-kit` | prepared pressure deltas |
| `session-score-message-transaction-adapter-kit` | prepared score, condition and message effects |
| `pest-clear-transaction-adapter-kit` | prepared damage, removal and reward effects |
| `construction-purchase-transaction-adapter-kit` | atomic payment and built-record settlement |
| `roster-hire-transaction-adapter-kit` | atomic payment and actor-record settlement |
| `inventory-equipment-transaction-adapter-kit` | item-existence and equipment settlement |
| `gameplay-transaction-commit-journal-kit` | ordered durable or replayable participant commit receipt |
| `gameplay-transaction-rollback-compensation-kit` | rollback or explicit compensation for failed commits |
| `nested-command-result-propagation-kit` | preserve exact nested accepted/rejected terminal result |
| `gameplay-transaction-result-kit` | committed, rejected, duplicate, rolled-back, compensated and failed results |
| `first-transaction-bound-frame-ack-kit` | bind the first HTML/Canvas frame to the committed transaction revision |
| `source-dist-pages-transaction-fixture-kit` | participant failure, retry, rollback, nested-result and deployment parity proof |

## Required command boundary

```txt
GameplayTransactionCommand
  -> bind TransactionId, IdempotencyKey, payload digest and expected participant revisions
  -> resolve all required participants
  -> preflight funds, target, capability and policy conditions
  -> prepare immutable participant intents without mutation
  -> reject missing, stale, invalid or unaffordable work before commit
  -> commit all participant intents exactly once
  -> rollback or compensate an incomplete commit explicitly
  -> store and replay the terminal result for exact duplicates
  -> propagate the exact nested command result through interface composition
  -> publish GameplayTransactionResult
  -> publish FirstTransactionBoundFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, commands, gameplay values, world generation, resources, pressure, construction, roster, inventory, HTML, Canvas2D, tests, build, workflow, and deployment remain unchanged.