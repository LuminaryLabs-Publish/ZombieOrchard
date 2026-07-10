# Validation — ZombieOrchard

## Latest pass

`2026-07-10T17-18-47-04-00`

## Documentation validation performed

```txt
- Compared all ten accessible LuminaryLabs-Publish repositories.
- Compared central and recent repo-local activity for all nine eligible non-Cavalry repositories.
- Confirmed all eligible repositories are tracked and have root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected only ZombieOrchard as the oldest eligible documented fallback.
- Read package.json and README.md.
- Read src/boot.js, src/start.js, and src/game.js.
- Read src/kits/runtime.js, composition.js, scoped-interface-domains.js, and game-domains.js.
- Read src/presets/orchard-preset.js.
- Read both renderer modules and tests/smoke.mjs.
- Read .github/workflows/deploy-pages.yml.
- Reconfirmed the interaction loop, domains, services, and kits.
- Traced global random calls in orchard and active-session domains.
- Traced command, event, snapshot, frame, renderer, and GameHost observation boundaries.
- Added a timestamped tracker, turn ledger, and system-specific audits.
- Refreshed the required root .agent files.
```

## Runtime validation not performed

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy configuration changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
deterministic scenario fixture: not run because it does not exist yet
replay fingerprint comparison: not run because scenario authority does not exist yet
```

## Why runtime validation was not run

This pass changed internal documentation only. No runtime, package, renderer, test, or deployment implementation changed. The available connector surface supported source inspection and direct documentation updates but did not execute repository-local Node scripts.

## Validation required for the next implementation

```txt
DOM-free deterministic scenario fixture
same-seed replay parity
same-seed per-frame fingerprint parity
different-seed structural invariant check
global Math.random gameplay rejection check
command/result journal ordering check
nested child result retention check
committed frame observation check
world renderer consumption check
HTML renderer consumption check
GameHost.scenario JSON serialization
bounded journal length and overflow checks
rejected-command no-mutation check
duplicate-command idempotency check
npm test
npm run build
browser smoke
```

## Required fixture assertions

- Stable scenario, random stream, draw, activation, command, event, and frame IDs.
- Same seed, commands, and ticks produce identical initial and final fingerprints.
- Different seeds produce distinct world fingerprints while preserving tree/apple invariants.
- Gameplay domains do not call global `Math.random()`.
- Parent interface results retain exact child results.
- Rejected commands produce no gameplay-state fingerprint change.
- Duplicate idempotent commands do not double-apply mutations.
- Committed frames reference exact command and event ranges.
- World and HTML renderers reference the committed frame they consumed.
- GameHost scenario readback is bounded, immutable to consumers, and JSON-safe.

## Deployment statement

The existing Pages workflow already runs `npm test` before `npm run build`. The workflow structure is adequate; the missing work is the deterministic scenario test surface that it should gate.