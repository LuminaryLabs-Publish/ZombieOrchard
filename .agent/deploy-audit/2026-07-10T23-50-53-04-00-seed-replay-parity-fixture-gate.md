# Deploy audit — seed/replay parity fixture gate

**Run:** `2026-07-10T23-50-53-04-00`

## Current gate

```txt
npm test
  -> tests/smoke.mjs
  -> Entry to Play
  -> apples array is nonempty

npm run build
  -> copy index.html and src into dist

Pages workflow
  -> test
  -> build
  -> deploy
```

The deployment shape is adequate, but the smoke coverage cannot detect nondeterministic or unreplayable gameplay.

## Required fixture files

```txt
tests/session-reset.mjs
tests/clock-parity.mjs
tests/capability-reachability.mjs
tests/seeded-world.mjs
tests/seeded-encounter.mjs
tests/replay-receipt.mjs
tests/render-provenance.mjs
```

## Seeded world assertions

```txt
same seed creates identical 26-apple population
IDs, positions and kinds are exact
collecting the same apple yields the same replacement
world cursor advances by the declared number of draws
encounter cursor does not change
```

## Seeded encounter assertions

```txt
same seed and committed tick schedule yields identical admission decisions
pest IDs and angles are exact
pause advances neither encounter cursor nor gameplay state
different render cadence with fixed-step clock yields identical encounter receipt
```

## Replay assertions

```txt
replay input names content fingerprint, seed, clock config and commands
replay final fingerprint equals recorded final fingerprint
decision sequence and stream cursors are bounded and JSON-safe
renderer observation refers to the same committed fingerprint
```

## Workflow requirement

Keep `npm test` before `npm run build`, but make `npm test` execute every authority fixture. No Pages artifact should deploy when deterministic replay proof fails.
