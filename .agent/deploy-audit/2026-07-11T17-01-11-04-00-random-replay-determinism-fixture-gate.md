# Deploy audit: Random and Replay Determinism Fixture Gate

## Plan ledger

**Goal:** prevent deterministic-run, replay or resumable-save claims until seeded random streams and replay verification pass in Node and the deployed browser route.

- [x] Review the current package proof surface.
- [x] Identify missing random and replay fixtures.
- [x] Define DOM-free and browser gates.
- [x] Define deployment evidence.
- [ ] Implement the fixtures.
- [ ] Run the fixtures and Pages smoke.

## Current proof surface

```txt
npm test
  -> tests/smoke.mjs
  -> verifies Entry to Play and apple presence

npm run build
  -> copies index.html and src into dist
```

Current proof does not control a seed, inspect stream cursors, compare two runs, replay commands or verify state fingerprints.

## Required DOM-free fixtures

```txt
same-seed startup
  -> identical 26 apple ids, tree choices, offsets and kinds
  -> identical stream cursor states

different-seed startup
  -> deterministic intentional difference

stream isolation
  -> extra committed apple generation does not alter pest stream

rejected command
  -> no cursor advancement

duplicate command
  -> cached result and no extra draw

fixed-tick replay
  -> same pest admission and angle receipts
  -> same durable-state fingerprint after every tick

first divergence
  -> typed result identifies event, stream and cursor

save/restore continuation
  -> restored stream state continues exactly
```

## Required browser fixtures

```txt
start run with explicit seed
  -> GameHost observation exposes seed fingerprint and random policy version

collect and enter night
  -> command/tick results expose random receipt ranges

reload replay artifact
  -> canvas, HTML and host acknowledge the same final fingerprint

stale policy or manifest
  -> typed rejection without silent reseed
```

## Deployment gate

Pages may deploy the static artifact, but release notes must not claim deterministic runs, replayability or resumable random state until:

```txt
session fixtures pass
clock fixtures pass
command transaction fixtures pass
seeded random fixtures pass
replay parity fixtures pass
save/restore continuation fixtures pass
browser frame-correlation smoke passes
```

## Current result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
deployment workflow changed: no
npm test: not run
npm run build: not run
random fixtures: unavailable
replay fixtures: unavailable
browser smoke: not run
```
