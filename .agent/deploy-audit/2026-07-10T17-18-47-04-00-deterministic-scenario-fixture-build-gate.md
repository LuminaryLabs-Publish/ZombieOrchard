# Deploy audit: deterministic scenario fixture build gate

Timestamp: `2026-07-10T17-18-47-04-00`

## Current deploy chain

```txt
push to main
  -> actions/checkout@v4
  -> actions/setup-node@v4 / Node 22
  -> npm test
  -> npm run build
  -> upload dist
  -> deploy Pages
```

## Current test gate

`npm test` runs `tests/smoke.mjs`, which proves:

```txt
entry screen exists
play transitions to active-session
orchard contains apples
```

It does not prove:

```txt
same seed replay parity
command ordering
nested result retention
durable event/frame observations
random stream ownership
state fingerprint stability
renderer consumption identity
GameHost JSON-safe bounded readback
```

## Required fixture gate

Add a DOM-free scenario fixture before deployment that:

1. Creates a scenario with a fixed seed and fixed delta.
2. Captures the initial fingerprint.
3. Runs a stable command/tick script.
4. Captures command, frame, event, and final fingerprint rows.
5. Reconstructs the same scenario.
6. Replays the same script.
7. Asserts identical command results and fingerprints.
8. Runs a different seed and asserts structural validity with a distinct world fingerprint.
9. Verifies no gameplay domain calls global `Math.random()`.
10. Serializes the bounded GameHost scenario observation.

## Suggested script structure

```txt
npm test
  -> existing reachability smoke
  -> deterministic scenario replay fixture
  -> command/result observation fixture
  -> GameHost serialization fixture

npm run build
  -> only after all fixtures pass
```

## Deployment status

The workflow structure is adequate. Do not replace the Pages workflow. Expand the test contract that it gates.

## Validation this pass

```txt
workflow changed: no
package scripts changed: no
runtime changed: no
fixture executed: no
build executed: no
Pages deployment inspected after push: no
```