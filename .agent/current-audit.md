# Current audit: ZombieOrchard

**Timestamp:** `2026-07-12T12-39-25-04-00`  
**Status:** `economy-command-admission-authority-audited`  
**Branch:** `main`

## Summary

The current economy command surfaces are structurally reachable but semantically ungoverned. `engine.command()` checks only whether a target domain exists. Resource, construction, roster and inventory handlers then accept raw payloads and mutate live state without one command schema, capability check, resource registry, catalog revision, price authority, expected predecessor revision, idempotency key or conservation receipt.

The most direct defect is negative-cost minting. `resource-ledger.pay()` considers a negative amount payable and then subtracts that negative value, increasing the balance. `roster-runtime.hire()` trusts `payload.cost`, so a public caller can hire an actor with a negative cost and gain money in the same accepted command.

## Plan ledger

**Goal:** define a semantic economy command transaction that rejects malformed, stale, unauthorized and non-conserving operations before any participant mutates.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Verify eligible central-ledger and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `ZombieOrchard` under the oldest eligible fallback rule.
- [x] Read runtime command dispatch and browser host exposure.
- [x] Read resource, construction, roster, inventory and collection mutation paths.
- [x] Reconcile the full interaction loop, domains, 27 implemented kit surfaces and services.
- [x] Confirm negative-cost resource minting.
- [x] Confirm arbitrary resource-key creation through negative payment.
- [x] Confirm unknown construction IDs fall back to the first item.
- [x] Confirm unknown inventory IDs are accepted.
- [x] Define parent DSK, transaction and fixture boundary.
- [ ] Implement and execute semantic economy fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T10-09-07-04-00 selected
MyCozyIsland       2026-07-12T10-20-02-04-00
TheUnmappedHouse   2026-07-12T10-30-00-04-00
AetherVale         2026-07-12T10-48-19-04-00
TheOpenAbove       2026-07-12T11-15-16-04-00
IntoTheMeadow      2026-07-12T11-29-40-04-00
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
browser module boot
  -> createOrchardGame()
  -> install 19 engine kits
  -> create world and HTML renderers
  -> expose raw engine through window.GameHost
  -> start recursive RAF

UI economy action
  -> delegated click
  -> interface-composition.activate
  -> active interface action
  -> optional nested engine.command(participant, type, payload)
  -> participant mutates live state
  -> nested participant API may mutate resource or pressure state
  -> synchronous notification

public economy action
  -> GameHost.engine.command(domainId, type, payload)
  -> participant mutates directly
  -> synchronous notification

frame
  -> engine.tick(1 / 60)
  -> participant ticks
  -> snapshot
  -> canvas render
  -> HTML render
```

## Source-backed findings

### Negative payment mints resources

`src/kits/game-domains.js` implements payment as a comparison against the caller-supplied value followed by subtraction. Negative values pass the comparison and subtraction increases the balance.

```txt
money = 40
pay({ money: -10 })
canPay: 40 >= -10 -> true
commit: 40 - (-10) -> 50
result: accepted
```

An unknown resource key follows the same path because missing balances normalize to zero.

### Caller controls roster price

`roster-runtime.command("hire")` passes `payload.cost || 25` to the resource ledger. A negative number is truthy, so it becomes the effective price. The command then adds an actor after the minting payment succeeds.

### Unknown construction ID builds another item

Construction resolves `find(id) || catalog[0]`. A missing requested ID therefore does not reject; it buys and builds the first catalog entry.

### Inventory accepts unknown item IDs

Inventory equip assigns `state.equipped = payload.id` and returns accepted without proving that the item exists or is owned.

### Resource namespace and numeric policy are implicit

`add()` and `pay()` accept arbitrary object keys. Amounts are normalized numerically, but no registered-key, sign, precision, minimum, maximum or administrative-delta policy exists.

### Command and revision evidence are absent

Commands contain no stable command ID, session identity, actor capability, route revision, expected economy revision or expected catalog revision. Results expose only generic acceptance and carry no before/delta/after balance receipts.

### Public reachability

`src/start.js` publishes the raw engine through `window.GameHost`, including direct access to `engine.command()`, domain APIs and graph mutation. The semantic defects are therefore not limited to authored UI buttons.

## Concrete failure paths

```txt
negative direct payment
  -> accepted
  -> balance increases

negative roster hire
  -> money increases
  -> actor count increases

unknown negative resource key
  -> new balance key materializes

unknown construction ID
  -> first catalog item is purchased and built

unknown inventory ID
  -> equipped state points to nonexistent item
```

## Domains in use

```txt
browser document, canvas, DOM and full-window shell
module boot, recursive RAF and public GameHost
runtime registration, commands, ticks, events, snapshots, subscriptions and publication
11 scoped interface domains plus gameplay active-session
interface composition and nested command dispatch
resource namespace, balances, prices and conservation
pressure field
orchard population, collection and refill
construction catalog and build state
roster offers and actor state
inventory catalog, ownership and equipped state
active-session movement, phases, pests, damage, score and failure
canvas world rendering and HTML route/HUD projection
Node smoke, static build, Pages deployment and central tracking
```

## Implemented kits

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

## Offered services

| Kit group | Services |
|---|---|
| runtime | Registration, live domain creation, commands, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, fields, selection, action activation, routing, nested dispatch and Outcome routing |
| gameplay/economy | Resource accounting, pressure, orchard collection, construction, hiring, equipment, movement, phases, pests, damage, score and failure |
| render | Canvas world drawing, HTML route/HUD projection and delegated actions |
| diagnostics/proof/deploy | Raw engine publication, snapshot readback, manual tick, Node smoke, static copy and Pages deployment |

## Required composed domain

```txt
zombie-orchard-economy-command-admission-authority-domain
```

## Required transaction

```txt
EconomyCommand
  -> bind command ID, runtime session, route and actor capability
  -> validate command and payload schema
  -> canonicalize registered resource keys and finite amounts
  -> reject negative costs and unauthorized signed deltas
  -> validate catalog, offer and inventory references
  -> validate expected participant revisions
  -> build immutable mutation plan
  -> prove balance floors and conservation policy
  -> atomically commit every participant
  -> publish typed result and before/delta/after receipts
  -> reject duplicate and stale commands
  -> acknowledge first visible canvas and HTML frame
```

## Runtime non-claims

No runtime source, economy behavior, rendering, package scripts or deployment configuration changed. No economic-conservation, catalog-integrity, idempotency or visible-frame claim is made.