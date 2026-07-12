# Validation - ZombieOrchard

**Timestamp:** `2026-07-12T12-39-25-04-00`

## Scope

Documentation-only audit of semantic economy command admission, resource-key and amount policy, catalog references, price authority, revision checks, idempotency, conservation, atomic participant commit and visible-frame correlation. Runtime source, dependencies, package scripts, gameplay, rendering and deployment configuration were not changed.

## Plan ledger

**Goal:** record the exact source evidence and executable proof required before economic-safety claims are made.

- [x] Read `src/start.js` and confirm raw public command access.
- [x] Read `src/kits/runtime.js` and trace command dispatch and publication.
- [x] Read `src/kits/game-domains.js` and trace resource, build, hire, equip and collect mutations.
- [x] Read `src/kits/composition.js` and trace nested interface dispatch.
- [x] Read `src/presets/orchard-preset.js` and confirm authored catalog/action inputs.
- [x] Read canvas and HTML renderer projections.
- [x] Confirm negative payment mints resources.
- [x] Confirm negative roster cost can mint money and add an actor.
- [x] Confirm unknown construction ID falls back to the first item.
- [x] Confirm unknown inventory ID is accepted.
- [x] Confirm command/revision/conservation receipts are absent.
- [x] Add timestamped architecture and system audits.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run economy-admission fixtures.

## Source-backed findings

```txt
src/kits/runtime.js
  -> command validates only target domain presence
  -> forwards raw payload
  -> publishes generic result and snapshot
  -> no command ID, capability, expected revision or idempotency

src/kits/game-domains.js: resource-ledger
  -> accepts arbitrary resource keys
  -> accepts signed values
  -> negative pay value passes canPay
  -> subtracting negative value increases balance

src/kits/game-domains.js: roster-runtime
  -> trusts payload.cost
  -> negative cost reaches ledger.pay
  -> accepted hire can increase money and actor count

src/kits/game-domains.js: construction-runtime
  -> unknown requested ID falls back to catalog[0]

src/kits/game-domains.js: inventory-runtime
  -> assigns any payload.id as equipped

src/start.js
  -> exposes raw engine through window.GameHost

src/renderer/html-interface-renderer.js
  -> projects balances, built items, actors and inventory
  -> receives no economy revision or command receipt
```

## Deterministic observations

```txt
implemented kit surfaces: 27
engine-installed kits: 19
resource-key registry: 0
catalog revision fields: 0
economy command ID fields: 0
expected economy revision checks: 0
negative-cost rejection paths: 0
unknown construction ID rejection paths: 0
unknown inventory ID rejection paths: 0
balance delta receipts: 0
first visible economy-frame receipts: 0
```

## Required fixtures

```txt
negative direct payment rejection
negative roster cost rejection
unknown negative-cost resource-key rejection
unknown build ID rejection
unknown roster-offer rejection
unknown equip ID rejection
finite-number and precision validation
valid payment and exact balance receipts
valid build atomic resource/output receipts
duplicate command idempotency
stale economy/catalog revision rejection
participant failure rollback
public-host gateway admission
canvas/HTML economy revision parity
source/dist/Pages economy policy parity
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
canvas behavior changed: no
HTML behavior changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
economy fixtures: unavailable / not run
browser economy smoke: unavailable / not run
Pages economy smoke: unavailable / not run
```

The local container could not resolve GitHub for a fresh clone, so existing commands were not executed through a local checkout. Source evidence was read from the connected repository. No semantic-admission, conservation, catalog-integrity, idempotency, rollback or visible-frame claim is made.