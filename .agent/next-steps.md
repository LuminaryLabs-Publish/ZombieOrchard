# Next steps - ZombieOrchard

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Summary

Add a pest-population authority before expanding waves, combat or visual density. Spawn, movement, contact damage, clearing, retirement and rendering must consume one run-scoped population revision.

## Plan ledger

**Goal:** replace the raw pest array with bounded lifecycle and budget transactions.

- [ ] Define `PestPopulationId`, revision and configuration fingerprint.
- [ ] Define deterministic `PestId` and pest generation.
- [ ] Add maximum active count and per-step/per-phase spawn budgets.
- [ ] Return typed spawn results.
- [ ] Add age and lifecycle state.
- [ ] Define clear, expiry, distance, terminal and run-reset retirement reasons.
- [ ] Make retirement exactly once and reward exactly once.
- [ ] Build one contact set per simulation step.
- [ ] Bound or explicitly aggregate multi-pest damage.
- [ ] Add simulation and render work budgets.
- [ ] Publish population snapshot and fingerprint.
- [ ] Bind canvas frames to population revision.
- [ ] Add Node, browser, dist and Pages fixtures.

## Immediate safe ledge

1. Add `maxActivePests` to configuration.
2. Reject spawn when capacity is reached.
3. Replace random string IDs with run-scoped monotonic IDs.
4. Add population revision increments on spawn and retirement.
5. Add an explicit `retirePest(id, reason)` path.
6. Return typed clear and retirement results.
7. Add one population snapshot with count and fingerprint.
8. Add a long-night capacity test.
9. Add duplicate-clear reward protection.
10. Add canvas draw-count and revision proof.

## Required runtime flow

```txt
night spawn request
  -> capacity and budget admission
  -> deterministic identity allocation
  -> population revision commit
  -> bounded simulation
  -> contact-set and damage result
  -> exact retirement and reward result
  -> snapshot fingerprint
  -> matching visible canvas frame
```

## Target files

```txt
src/kits/game-domains.js
src/presets/orchard-preset.js
src/kits/runtime.js
src/game.js
src/start.js
src/renderer/world-canvas.js
src/kits/pest-population-authority.js
src/kits/pest-contact-authority.js
src/kits/pest-retirement-authority.js
tests/pest-capacity.fixture.mjs
tests/pest-retirement.fixture.mjs
tests/pest-damage-budget.fixture.mjs
scripts/smoke-pest-population-browser.mjs
package.json
```

## Required fixtures

```txt
spawn under capacity -> accepted
spawn at capacity -> CapacityReached
long night -> count remains bounded
pest IDs -> unique and deterministic
clear -> one retirement and one reward
duplicate clear -> no duplicate reward
stale generation clear -> rejected
large contact set -> bounded deterministic damage
population revision -> increments exactly once
canvas -> matching revision and admitted draw count
source/dist/Pages -> equivalent results
```

## Do not claim

Do not claim population safety, difficulty stability, performance bounds, exact retirement or visible-frame parity until the fixture matrix passes on `main`.
