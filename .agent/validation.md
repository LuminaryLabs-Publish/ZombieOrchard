# Validation — ZombieOrchard

## Scope

Documentation-only seeded-random and replay authority audit. Runtime source, dependencies, package scripts, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record source-backed randomness findings and the exact proof required before deterministic-seed, replay or resumable-random-state claims are made.

- [x] Read the current architecture chain and runtime sources.
- [x] Confirm all apple and pest randomness uses global `Math.random()`.
- [x] Confirm apple refill and pest spawning share one implicit source.
- [x] Confirm random IDs, stream cursors and replay receipts are absent.
- [x] Confirm snapshots do not contain random causality or durable fingerprints.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement prerequisite session, clock and transaction authorities.
- [ ] Implement and run random/replay fixtures.

## Source-backed findings

```txt
src/kits/game-domains.js
  orchard-world-kit
    -> random tree selection
    -> random apple id
    -> random x/y offsets
    -> random rarity
    -> refill after successful collection

  active-session-domain-kit
    -> random night spawn trial
    -> random pest angle
    -> random pest id

src/kits/runtime.js
  -> no run/session/tick/transaction identity
  -> no random receipt or replay journal
  -> snapshot contains outcomes only
```

## Current proof surface

```txt
npm test
  -> tests/smoke.mjs
  -> verifies Entry to Play and apple presence

npm run build
  -> copies static application into dist
```

This does not prove seed control, stream isolation, deterministic IDs, cursor rules, replay parity, first-divergence localization or random-state continuation.

## Required DOM-free fixtures

```txt
same-seed startup
  -> identical apples and stream cursors

different-seed startup
  -> deterministic intentional difference

apple/pest stream isolation
  -> apple generation does not alter pest receipts

rejected, duplicate and rolled-back commands
  -> no extra authoritative cursor advancement

fixed-tick replay
  -> identical random receipts and state fingerprints

first divergence
  -> identifies event, stream, cursor and fingerprint

save/restore continuation
  -> exact future random sequence after restore
```

## Required browser fixtures

```txt
explicit-seed run startup
visible seed fingerprint and policy version
command/tick random receipt acknowledgement
canvas/HTML/GameHost final fingerprint parity
stale manifest or policy rejection
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
same-seed fixture: unavailable / not run
stream-isolation fixture: unavailable / not run
cursor commit/rollback fixture: unavailable / not run
replay parity fixture: unavailable / not run
save/restore continuation fixture: unavailable / not run

repo-local docs pushed to main: yes
central ledger update: pending
central internal change log: pending
```

No deterministic random or replay claim is made.