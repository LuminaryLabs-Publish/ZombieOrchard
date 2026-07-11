# Deploy audit: Runtime session lifecycle fixture gate

## Plan ledger

**Goal:** prevent Pages deployment from claiming a restartable or disposable orchard runtime until lifecycle behavior is executable and repeatable.

- [x] Inspect current package scripts and smoke scope.
- [x] Identify lifecycle behaviors not covered by `npm test` or `npm run build`.
- [x] Define DOM-free and browser fixture requirements.
- [ ] Add fixtures to the deployment gate.

## Current gate

```txt
npm test
  -> one Node smoke
  -> Entry to Play
  -> one tick
  -> apple presence

npm run build
  -> copy index.html and src/ into dist
```

The current gate does not prove fresh-run creation, graph retirement, RAF ownership, listener cleanup, host revocation, startup rollback or disposal.

## Required DOM-free fixtures

```txt
session identity
  -> runtimeId is stable for one host lifetime
  -> sessionId changes for New Game or restart
  -> sessionEpoch increases monotonically

fresh graph
  -> prior resource, pressure, orchard, construction, roster, inventory and active-session state is absent

terminal retirement
  -> old terminal graph rejects commands and ticks
  -> Title does not bounce back to Outcome after retirement

startup rollback
  -> injected failure at each construction stage
  -> reverse cleanup rows are complete
  -> no current session is published

ordered disposal
  -> exactly one committed dispose result
  -> second dispose is a no-op
```

## Required browser fixtures

```txt
single RAF
  -> exactly one live animation-frame lease
  -> double start cannot create a second loop

listener lease
  -> delegated click listener works while live
  -> listener is removed on dispose
  -> stale click cannot mutate an old graph

public host
  -> clone-safe lifecycle/session observation
  -> no raw engine or unrestricted tick by default
  -> host is revoked on replacement or disposal

render resources
  -> old renderer generation rejects new-session frames
  -> canvas and HTML receipts cite the same session
  -> render-after-dispose rejects

reload and Pages smoke
  -> fresh startup
  -> New Game creates a fresh session
  -> pause/resume preserves the session
  -> Title and restart follow declared retention policy
  -> disposal leaves no active RAF or callback mutation
```

## Required deployment order

```txt
npm test
  -> runtime-session DOM-free fixtures
  -> fixed-step clock fixtures
  -> browser lifecycle smoke
  -> npm run build
  -> Pages artifact smoke
  -> deploy
```

## Current validation result

```txt
runtime session fixture: absent / not run
startup rollback fixture: absent / not run
RAF/listener lease fixture: absent / not run
fresh-run fixture: absent / not run
disposal fixture: absent / not run
browser lifecycle smoke: absent / not run
Pages lifecycle smoke: absent / not run
```