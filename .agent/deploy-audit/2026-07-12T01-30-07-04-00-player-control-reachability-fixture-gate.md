# Deploy audit: player-control reachability fixture gate

## Goal

Prevent deployment from claiming an explorable orchard until the browser product can reach, admit, retire and visibly prove player movement.

## DOM-free fixtures

```txt
binding-manifest-parity
opposed-direction-cancellation
diagonal-normalization
finite-vector-admission
route-rejection
ended-run-rejection
boundary-clamp
stale-input-sequence-rejection
lease-retirement
```

## Browser fixtures

```txt
open deployed game
click Play
record initial committed player position
press W for admitted fixed steps
release W
verify player y changed exactly through movement results
verify canvas frame presents the committed position
press A+D together and verify horizontal cancellation
hold a key, blur the window and verify movement stops
pause and verify movement is rejected
resume and verify a new input sequence is required
navigate to Outcome/Title and verify no held input survives
```

## Deployment requirements

- `npm test` includes the DOM-free control fixtures.
- Browser smoke runs against the built `dist` artifact.
- Pages smoke runs against the published URL.
- The public observation includes control and movement result provenance without exposing mutable owners.
- One control adapter and one listener set are active.
- Failed startup and disposal leave no held state or recurring callback.

## Current result

```txt
runtime implementation changed: no
control fixtures available: no
browser control smoke: no
Pages control smoke: no
deployment readiness for movement: unproven
```
