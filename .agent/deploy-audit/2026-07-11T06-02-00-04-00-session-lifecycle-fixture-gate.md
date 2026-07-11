# Deploy audit — Session lifecycle fixture gate

## Timestamp

```txt
2026-07-11T06-02-00-04-00
```

## Current validation chain

```txt
npm test
  -> create one engine
  -> verify Entry
  -> activate Play
  -> tick once
  -> verify Active Session
  -> verify apples exist

npm run build
  -> copy index.html and src into dist

Pages workflow
  -> test
  -> build
  -> deploy static artifact
```

The current gate proves module construction and one Entry-to-Play route transition. It does not prove that a run is fresh, pausable, terminal, resettable, disposable, or protected from stale work.

## Required Node fixture matrix

```txt
boot -> no gameplay mutation before start
Play -> fresh session identity and initial fingerprint
New Game -> Start -> fresh graph
mutate -> Title -> New Game -> initial state restored
Pause -> 600 simulated render callbacks -> gameplay fingerprint unchanged
Resume -> same epoch and subsequent committed tick
Outcome -> immutable terminal snapshot
Outcome -> Title -> repeated ticks -> remains Entry
Outcome -> Title -> Play -> fresh non-ended session
reset failure -> old session remains authoritative
accepted reset -> epoch increments exactly once
duplicate start command -> one graph and one result
stale command/tick/callback -> rejection without mutation
stop/start -> one RAF owner
dispose twice -> idempotent result and zero owned leases
```

## Required browser fixture matrix

```txt
click Play -> first-frame session observation present
click Pause at night -> visible state freezes
click Resume -> same session continues
reach/inject terminal condition -> Outcome appears once
click Title -> Entry remains stable
click New Game -> initial HUD/world state appears
rapid double-click Start -> one session created
unmount/remount or reload harness -> no duplicate listener or RAF owners
GameHost observation -> detached lifecycle/result journals only
```

## Required deployment artifact assertions

```txt
session lifecycle fixture files included in repository
npm test executes lifecycle fixture
build output contains the tested runtime sources
Pages workflow fails on fixture failure
browser smoke targets deployed artifact
reported commit SHA matches deployed artifact
```

## Proof records

Every fixture should emit JSON-safe records containing:

```txt
runtimeGeneration
sessionId
sessionEpoch
lifecycleState
commandId
resultCode
committedTickId
renderFrameId
stateFingerprint
activeRafOwners
activeListenerLeases
activeGlobalLeases
```

## Current result

```txt
runtime source changed by this audit: no
package scripts changed: no
deploy workflow changed: no
npm test: not run
npm run build: not run
browser smoke: not run
session lifecycle fixture: unavailable
Pages session lifecycle gate: unavailable
```

## Next safe ledge

```txt
ZombieOrchard Runtime Session Instance Authority
+ Start / Reset / Title / Outcome Fidelity Fixture Gate
```
