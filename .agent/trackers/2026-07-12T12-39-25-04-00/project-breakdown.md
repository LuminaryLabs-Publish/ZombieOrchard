# Project breakdown: ZombieOrchard economy command admission

**Timestamp:** `2026-07-12T12-39-25-04-00`  
**Repository:** `LuminaryLabs-Publish/ZombieOrchard`  
**Branch:** `main`  
**Status:** `economy-command-admission-authority-audited`

## Summary

ZombieOrchard exposes resource, construction, roster and inventory commands through the mutable runtime and public `GameHost`. The shipped command handlers do not enforce nonnegative costs, known resource namespaces, valid catalog references, expected revisions or conservation receipts. A negative roster hire cost can mint money while adding an actor, and a negative resource-ledger payment can mint any requested resource key.

## Plan ledger

**Goal:** define one semantic command-admission and economic-conservation authority before any resource, catalog, roster or inventory mutation is committed.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are represented in the central ledger and have root `.agent` routing state.
- [x] Select only `ZombieOrchard` as the oldest eligible synchronized ledger entry.
- [x] Read runtime commands, public host exposure, resource accounting, construction, roster, inventory and interface dispatch.
- [x] Identify the interaction loop, all domains, all 27 implemented kit surfaces and offered services.
- [x] Confirm signed and arbitrary resource mutation is accepted.
- [x] Confirm negative costs can increase balances.
- [x] Confirm unknown construction IDs fall back to the first catalog entry.
- [x] Confirm inventory equip accepts an unknown item ID.
- [x] Define an economy command admission parent domain and fixture boundary.
- [x] Update required root `.agent` files and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable economy fixtures remain future work.

## Selection comparison

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

## Interaction loop

```txt
browser action or public GameHost caller
  -> engine.command(domainId, type, payload)
  -> domain accepts raw payload
  -> resource/catalog/roster/inventory state mutates immediately
  -> nested APIs may mutate additional domains
  -> synchronous subscriber publication
  -> canvas and HTML render successor snapshots
```

## Source-backed failure paths

```txt
resource-ledger pay({ money: -10 })
  -> canPay succeeds because current money >= -10
  -> subtracting -10 adds 10 money
  -> accepted: true

resource-ledger pay({ arbitraryKey: -25 })
  -> unknown key normalizes to zero
  -> zero >= -25
  -> arbitraryKey becomes 25

roster-runtime hire({ cost: -10 })
  -> negative payload cost reaches ledger.pay
  -> money increases by 10
  -> actor is added

construction-runtime build({ id: "missing" })
  -> lookup misses
  -> catalog[0] is selected
  -> a different item is purchased and built

inventory-runtime equip({ id: "missing" })
  -> equipped becomes an unknown ID
  -> accepted: true
```

## Domains in use

```txt
browser document, canvas, DOM and public GameHost
runtime registration, commands, ticks, snapshots and publication
interface routing and nested action dispatch
resource namespace, balances, costs and conservation
construction catalog and build admission
roster offer and hire admission
inventory catalog and equip admission
orchard collection rewards and pressure side effects
active-session movement, pests, damage, score and failure
canvas and HTML projection
validation, static build, Pages deployment and central tracking
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
| runtime | Kit installation, command dispatch, delta clamp, ticks, events, snapshots, subscriptions and synchronous publication |
| interface | Screen state, selection, fields, action activation, route transitions and nested dispatch |
| economy/gameplay | Resource accounting, pressure, orchard collection, construction, hiring, equipment, movement, phases, pests, damage, scoring and failure |
| rendering | Canvas world drawing, HTML route/HUD projection and delegated click handling |
| diagnostics/proof/deploy | Raw engine exposure, state readback, manual tick, Node smoke, static build and Pages deployment |

## Required parent domain

```txt
zombie-orchard-economy-command-admission-authority-domain
```

## Required transaction

```txt
EconomyCommand
  -> bind command ID, runtime session, route and actor capability
  -> validate command and payload schema
  -> canonicalize resource keys and finite amounts
  -> reject negative costs and unauthorized signed deltas
  -> validate catalog, offer and inventory references
  -> read expected resource and catalog revisions
  -> build an immutable economic mutation plan
  -> prove balance floors and conservation policy
  -> atomically commit all participant mutations
  -> publish typed result, balance deltas and revision receipts
  -> reject duplicate, stale and malformed commands
  -> acknowledge the first visible matching frame
```

## Validation

Documentation only. Runtime source, package scripts, gameplay, rendering and deployment configuration were not changed. Existing tests and browser/Pages economy fixtures were not run because the required semantic-admission fixtures do not exist.