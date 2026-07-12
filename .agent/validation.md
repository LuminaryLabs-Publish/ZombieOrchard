# Validation — ZombieOrchard

## Scope

Documentation-only audit of player-control reachability. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the missing browser-to-movement path and the proof required before the orchard is treated as product-explorable.

- [x] Read browser boot and RAF ownership.
- [x] Read delegated HTML bindings and active-session controls.
- [x] Read active-session movement, collection radii and start position.
- [x] Read world-canvas projection and smoke proof.
- [x] Confirm movement is implemented but unreachable from the shipped UI.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and run control fixtures.

## Source-backed findings

```txt
src/start.js
  -> creates engine, canvas renderer and HTML renderer
  -> starts RAF
  -> installs no movement input listener

html-interface-renderer.js
  -> one delegated click listener
  -> data-action and data-command only
  -> active-session buttons: Collect, Clear, Next Phase

world-canvas.js
  -> reads and draws player position
  -> no input adapter

active-session-domain-kit
  -> starts player at x=0, y=180
  -> move adds 22 * x/y and clamps bounds
  -> collect requires apple within 42 units

orchard-world-kit
  -> randomly seeds apples around the orchard
  -> does not guarantee an apple inside the start collection radius
```

## Required DOM-free fixtures

```txt
binding-manifest-parity
opposed-direction-cancellation
diagonal-normalization
finite-vector-admission
route-rejection
ended-run-rejection
boundary-clamp
stale-input-sequence-rejection
control-lease-retirement
movement-result-shape
```

## Required browser fixtures

```txt
Play -> W changes player position
Arrow keys and WASD share canonical bindings
key repeat does not multiply simulation cadence
diagonal speed is normalized
blur retires held input
pause and route exit reject movement
outcome/reset/disposal retire predecessor input
canvas frame presents the committed movement result
one listener set and one control owner remain
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
render behavior changed: no
deploy configuration changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser smoke: not run
player-control fixture: unavailable / not run
input-retirement fixture: unavailable / not run
movement-frame fixture: unavailable / not run
Pages control smoke: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: complete
central internal change log: complete
```

No movement reachability, focus safety, held-input retirement, fixed-step control or movement-to-frame claim is made.
