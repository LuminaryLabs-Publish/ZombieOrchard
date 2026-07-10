# Validation — ZombieOrchard

## Latest pass

`2026-07-10T15-48-18-04-00`

## Documentation validation performed

```txt
- Compared all ten accessible LuminaryLabs-Publish repositories.
- Compared central ledger recency for all nine eligible non-Cavalry repositories.
- Confirmed all eligible repositories are tracked and have root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected only ZombieOrchard as the oldest eligible documented fallback.
- Read package.json and index.html.
- Read src/boot.js, src/start.js, and src/game.js.
- Read src/kits/runtime.js, composition.js, scoped-interface-domains.js, and game-domains.js.
- Read src/presets/orchard-preset.js.
- Read both renderer modules and tests/smoke.mjs.
- Reconfirmed the interaction loop, domains, services, and kits.
- Traced parent activation, child command, resource, inventory, projection, and readback boundaries.
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
Market command causality fixture: not run because it does not exist yet
```

## Why runtime validation was not run

This pass changed internal documentation only. No runtime, package, renderer, test, or deployment implementation changed.

## Validation required for the next implementation

```txt
DOM-free Market command causality fixture
npm test
npm run build
browser smoke
GameHost.market JSON serialization
bounded journal length checks
duplicate command/idempotency check
```

## Required fixture assertions

- Stable source, activation, command, result, transaction, and intake IDs.
- Parent interface result retains the exact child result.
- Accepted purchase mutates both resources and inventory.
- Rejected purchase mutates neither resources nor inventory.
- Stable insufficient-funds, capacity, unknown-action, and duplicate-command reasons.
- Resource and inventory rows reference the source command.
- Exchange projection references retained source/result rows.
- Renderer consumption references the projection row.
- GameHost readback is bounded, immutable to consumers, and JSON-safe.
