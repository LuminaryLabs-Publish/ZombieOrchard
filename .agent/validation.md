# Validation: ZombieOrchard pressure gameplay adoption

**Timestamp:** `2026-07-16T03-41-28-04-00`

## Scope

Documentation-only audit of the full Publish selection, current heads, root `.agent` coverage, pressure initialization and growth, collection-side pressure writes, active-session consumers, phase and outcome routing, HTML projection, smoke coverage, static build, Pages deployment and central tracking.

## Plan ledger

**Goal:** separate source-backed pressure-adoption findings from unexecuted gameplay, replay and deployed proofs.

- [x] Source inspected.
- [x] Organization and central ledger compared.
- [x] Root `.agent` coverage checked through synchronized documented heads.
- [x] Eligible current heads compared with documented heads.
- [x] Pressure producers, snapshots and potential consumers traced.
- [x] Required pressure-effect fixture gate documented.
- [ ] Execute runtime and deployed fixtures.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML CSS or Canvas2D behavior changed: no
pressure values or gameplay changed: no
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
pressure threshold fixture: unavailable
pressure consumer fixture: unavailable
boundary-crossing deduplication fixture: unavailable
save/restore pressure fixture: unavailable
replay pressure fixture: unavailable
FirstPressureEffectFrameAck fixture: unavailable
dist smoke: not run
Pages smoke: not run
combined commit statuses: not yet reviewed
```

## Claims not made

No claim is made for pressure gameplay adoption, threshold correctness, modifier balance, curse behavior, deterministic pressure effects, visible-frame convergence, artifact parity, Pages parity or production readiness.
