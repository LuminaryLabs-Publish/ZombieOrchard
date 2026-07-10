# Deploy audit: Market causality fixture build gate

Timestamp: `2026-07-10T15-48-18-04-00`

## Existing scripts

```txt
npm test      -> node tests/smoke.mjs
npm run build -> copy index.html and src into dist
```

The current smoke proves entry, Play transition, and apple presence. The build copies files without first proving Market command or transaction behavior.

## Required fixture

Add a DOM-free fixture that can create the game, open Exchange, activate Market actions, and inspect bounded proof rows without a browser or renderer.

Required cases:

```txt
accepted purchase
insufficient-funds rejection
inventory-capacity rejection
unknown-action rejection
duplicate-command behavior
parent-child result retention
resource transaction attribution
inventory intake attribution
Exchange projection attribution
JSON serialization of GameHost-equivalent readback
```

## Required assertions

- Stable source/action/activation/command/result/transaction/intake IDs.
- Accepted path applies both resource and inventory mutation.
- Rejected paths apply neither mutation.
- Parent activation retains the exact child result.
- Projection references retained result rows.
- Journals are bounded and JSON-safe.
- Fixture is deterministic and does not depend on `Math.random()` or animation timing.

## Gate order

```txt
node Market causality fixture
  -> npm test
  -> npm run build
  -> browser smoke
  -> Pages-sensitive work
```

## Validation for this documentation pass

```txt
runtime source changed: no
package scripts changed: no
deploy files changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
browser smoke: not run
Market causality fixture: not run because it does not exist yet
```
