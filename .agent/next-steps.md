# Next steps - ZombieOrchard

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

Add a semantic economy command gateway before expanding authored market, roster, construction or inventory behavior. Prices must come from versioned catalogs, resource keys must be registered, costs must be nonnegative and every multi-part mutation must commit atomically with conservation receipts.

## Plan ledger

**Goal:** replace raw participant mutation with a versioned, idempotent and conservation-checked economy transaction.

- [ ] Define `EconomyCommand` and `EconomyCommandResult` schemas.
- [ ] Add stable command IDs and duplicate-command replay behavior.
- [ ] Bind commands to runtime session, route and actor capabilities.
- [ ] Define a versioned resource-key registry.
- [ ] Require finite numeric amounts and explicit precision/range policy.
- [ ] Reject negative costs.
- [ ] Separate administrative signed deltas from player economy commands.
- [ ] Remove caller-authored roster prices.
- [ ] Version construction, roster-offer and inventory catalogs.
- [ ] Reject unknown catalog references instead of falling back.
- [ ] Require inventory ownership before equip.
- [ ] Add expected economy and catalog revisions.
- [ ] Build immutable participant mutation plans.
- [ ] Validate balance floors and conservation before commit.
- [ ] Commit resource, roster, build, inventory, orchard, pressure and score changes atomically.
- [ ] Publish before/delta/after balance receipts.
- [ ] Route public diagnostics through the admitted gateway.
- [ ] Correlate canvas and HTML with the committed economy revision.
- [ ] Add Node, browser, dist and Pages fixtures.

## Immediate safe ledge

1. Add a pure `normalizeEconomyCommand()` helper.
2. Add `validateResourceAmounts()` with finite, key, sign and range checks.
3. Move roster price lookup into an authored offer catalog.
4. Change construction and equip lookup misses to typed rejection.
5. Add `economyRevision` to the authoritative read model.
6. Add an idempotency map keyed by command ID.
7. Calculate a complete mutation plan without writing participant state.
8. Validate conservation and participant predecessor revisions.
9. Commit all participant state under one revision.
10. Return typed receipts and acknowledge the first matching frame.

## Required runtime flow

```txt
raw economy intent
  -> canonical command envelope
  -> session/route/capability admission
  -> schema and numeric validation
  -> registered resource and catalog reference resolution
  -> expected revision validation
  -> immutable mutation plan
  -> conservation and balance-floor checks
  -> atomic participant commit
  -> typed result and receipts
  -> visible-frame acknowledgement
```

## Target files

```txt
src/kits/runtime.js
src/kits/game-domains.js
src/kits/composition.js
src/start.js
src/kits/economy-command.js
src/kits/resource-schema.js
src/kits/catalog-registry.js
src/kits/economy-transaction.js
src/kits/economy-observation.js
tests/economy-negative-cost.fixture.mjs
tests/economy-resource-key.fixture.mjs
tests/economy-catalog-reference.fixture.mjs
tests/economy-idempotency.fixture.mjs
tests/economy-rollback.fixture.mjs
scripts/smoke-economy-browser.mjs
package.json
```

## Required fixtures

```txt
negative direct payment -> typed rejection and unchanged balances
negative roster cost -> typed rejection and unchanged actor count
unknown resource key -> typed rejection and key remains absent
unknown build ID -> typed rejection and no fallback build
unknown roster offer -> typed rejection
unknown equip ID -> typed rejection and equipped unchanged
NaN/Infinity/noncanonical numeric input -> typed rejection
valid build -> exact resource and built-item receipts
duplicate command ID -> same result and no second mutation
stale economy/catalog revision -> typed rejection
participant failure -> full rollback
canvas/HTML frame -> matching economy revision
source/dist/Pages -> equivalent fixture results
```

## Dependency order

```txt
kit graph installation
  -> runtime session and public capability gateway
  -> economy command admission
  -> composite transaction commit
  -> frame publication and render correlation
  -> replay and persistence
```

## Do not claim

Do not claim economic conservation, catalog integrity, safe prices, idempotency, atomic participant commit or visible economy-frame parity until the fixtures pass on `main`.