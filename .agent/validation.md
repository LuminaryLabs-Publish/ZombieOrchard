# Validation: ZombieOrchard player movement control coverage

**Timestamp:** `2026-07-15T17-38-05-04-00`

## Scope

Documentation-only audit of the full Publish selection, current heads, root `.agent` coverage, browser host, HTML command producers, active-session movement, proximity interactions, Canvas2D projection, smoke coverage, static build, Pages deployment, and central tracking.

## Plan ledger

**Goal:** distinguish source-backed findings from unexecuted movement and device proofs.

- [x] Source inspected.
- [x] Organization and central ledger compared.
- [x] Root `.agent` coverage checked.
- [x] Eligible current heads compared with documented heads.
- [x] Movement command and proximity consumers traced.
- [x] Browser and visible movement producers inventoried.
- [x] Required fixture gate documented.
- [ ] Execute runtime and deployed fixtures.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML CSS or Canvas2D behavior changed: no
gameplay changed: no
public API changed: no
dependencies or package scripts changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Execution boundary

```txt
npm test: not run
npm run build: not run
headless movement fixture: unavailable
keyboard browser fixture: unavailable
touch browser fixture: unavailable
gamepad browser fixture: unavailable
hybrid and lifecycle fixtures: unavailable
proximity loop fixture: unavailable
FirstPlayerMovementFrameAck fixture: unavailable
dist smoke: not run
Pages smoke: not run
```

## Claims not made

No claim is made for player-control completeness, keyboard support, touch support, gamepad support, movement-rate correctness, lifecycle safety, intentional proximity-loop playability, visible-frame convergence, artifact parity, Pages parity, or production readiness.
