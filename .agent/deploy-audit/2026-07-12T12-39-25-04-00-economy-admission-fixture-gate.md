# Deploy audit: economy admission fixture gate

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Summary

The current smoke and static build prove only basic startup and artifact copying. They do not prove semantic economy admission, conservation, catalog integrity, idempotency or source/dist/Pages parity for rejected commands.

## Plan ledger

**Goal:** prevent deployment claims until source, built artifact and Pages exhibit the same economy command policy.

- [x] Identify current Node smoke and static build surfaces.
- [x] Define semantic economy fixture matrix.
- [x] Define browser and Pages proof requirements.
- [ ] Add fixtures and CI gates.
- [ ] Run source, dist and deployed proof.

## Required Node fixtures

```txt
negative resource payment rejected with zero mutation
negative roster cost rejected with zero mutation
unknown resource key rejected
unknown construction ID rejected without catalog[0] fallback
unknown inventory ID rejected
insufficient balance returns stable reason code
valid build commits exact balance and built-item receipts
duplicate command ID does not mutate twice
stale expected economy revision rejected
participant proposal failure rolls back all changes
```

## Required browser fixtures

```txt
public host exposes admitted command gateway only
malformed payload does not reach participant mutation
HTML values remain unchanged after rejection
valid command produces matching command/result revision
canvas and HTML acknowledge the same economy revision
```

## Required artifact parity

```txt
src runtime policy fingerprint == dist policy fingerprint
dist fixture results == source fixture results
Pages negative-cost attempt == typed rejection
Pages unknown-reference attempt == typed rejection
Pages valid build == exact resource and catalog receipts
```

## Gate result

```txt
npm test: not run
npm run build: not run
economy fixtures: unavailable
browser economy smoke: unavailable
Pages economy smoke: unavailable
```

Deployment remains structurally available, but no semantic economy-safety claim is made.