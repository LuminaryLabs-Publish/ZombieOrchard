# Validation: ZombieOrchard run seed, RNG state and replay

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Scope

Documentation-only audit of the full Publish selection, current heads, root `.agent` coverage, preset/run setup, runtime composition, orchard and pest randomness, snapshots, diagnostics, Canvas2D projection, smoke coverage, static build, Pages deployment and central tracking.

## Plan ledger

**Goal:** separate source-backed ambient-randomness findings from unexecuted determinism and replay proofs.

- [x] Source inspected.
- [x] Organization and central ledger compared.
- [x] Root `.agent` coverage checked.
- [x] Eligible current heads compared with documented heads.
- [x] All random consumers traced.
- [x] Seed, stream, snapshot and replay surfaces inventoried.
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
same-seed fixture: unavailable
different-seed fixture: unavailable
stream-isolation fixture: unavailable
apple-refill and pest-spawn fixtures: unavailable
save/restore RNG fixture: unavailable
replay and canonical-hash fixtures: unavailable
FirstSeedBoundWorldFrameAck fixture: unavailable
dist smoke: not run
Pages smoke: not run
```

## Claims not made

No claim is made for deterministic generation, same-seed equivalence, stream isolation, deterministic IDs, exact RNG restoration, replay correctness, visible-frame convergence, artifact parity, Pages parity or production readiness.
