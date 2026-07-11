# Deploy audit — Fresh Run Lifecycle Fixture Gate

## Summary

The current smoke test proves only initial Entry-to-Play routing and apple presence. Deployment does not prove that a run can end, exit, restart with fresh state, reject stale work or dispose resources without duplication.

## Current proof

```txt
npm test
  -> create one engine
  -> confirm Entry
  -> activate Play
  -> tick once
  -> confirm active-session
  -> confirm apples exist

npm run build
  -> copy index.html and src into dist
```

## Required DOM-free lifecycle fixture

```txt
create runtime
  -> assert idle identity
  -> Start run A
  -> assert canonical initial state and run A identity
  -> mutate every state-owning domain
  -> force terminal failure
  -> Exit to Title
  -> Start run B
  -> assert run B identity differs
  -> assert all run-scoped state equals canonical fresh preset
  -> submit stale run-A command and tick
  -> assert typed rejection and no mutation
  -> dispose twice
  -> assert idempotent result
```

## Required browser fixture

```txt
load page
  -> Play
  -> capture first run-A canvas, HTML and GameHost identity
  -> reach or inject terminal run-A state through a fixture adapter
  -> Outcome -> Title
  -> New Game -> Start
  -> wait for first committed run-B frame
  -> capture canvas, HTML and GameHost identity
  -> assert one RAF chain and one delegated listener
  -> assert no predecessor frame commits after run B
```

## Required failure fixtures

```txt
candidate domain creation throws
required domain missing
first canvas projection fails
first HTML projection fails
stale RAF callback fires after epoch advance
stale UI event fires after reset
GameHost uses predecessor run identity
reset requested during reset
page disposal during candidate start
```

## Deployment gate

Pages deployment should require:

```txt
npm test
npm run build
runtime-session fixture
fresh-run full-state fixture
stale-work fixture
first-frame coherence fixture
listener/RAF leak fixture
disposal idempotency fixture
```

## Current validation result

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render behavior changed: no
deployment configuration changed: no
branch created: no
pull request created: no
npm test: not run
npm run build: not run
runtime-session fixture: unavailable
fresh-run fixture: unavailable
browser lifecycle fixture: unavailable
stale-callback fixture: unavailable
disposal fixture: unavailable
```

No fresh-run, restart, pause, lifecycle, resource-retirement or deployment-readiness claim is made.