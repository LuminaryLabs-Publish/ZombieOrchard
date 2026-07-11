# Deploy audit: Composite command fixture gate

## Summary

The current smoke and Pages pipeline does not exercise composite commands. A deployment can therefore succeed while nested publication, false parent success, target fallback, missing rollback, or render divergence remains present.

## Plan ledger

**Goal:** define the minimum automated proof required before composite-command runtime changes can be considered deployable.

- [x] Review the current smoke scope.
- [x] Identify missing transaction cases.
- [x] Define DOM-free fixtures.
- [x] Define browser fixtures.
- [x] Define publication and render assertions.
- [x] Define the deployment gate order.
- [ ] Implement fixtures.
- [ ] Add fixtures to the package scripts and Pages workflow.
- [ ] Run local and deployed proof.

## Current proof

```txt
npm test
  -> construct engine
  -> verify Entry
  -> activate Play
  -> tick once
  -> verify Active Session
  -> verify at least one apple
```

This does not prove construction, child-result propagation, single publication, target admission, rollback, route coupling, idempotency, or render correlation.

## Required DOM-free fixture command

```txt
npm run fixture:composite-command
```

Required cases:

```txt
valid Storage Shed build
insufficient resources
unknown build id
missing child domain
child failure after staged debit
command plus route accepted
command plus route child rejected
duplicate command id
stale session and epoch
stale committed tick
accepted, rejected, and rolled-back publication counts
```

## Required browser fixture

```txt
open Construction
  -> click Storage Shed
  -> capture command result
  -> confirm one debit
  -> confirm one built object
  -> confirm one subscriber publication
  -> confirm canvas and HTML consume one fingerprint
  -> confirm first rendered frame acknowledges the transaction
```

The browser fixture must also prove that an insufficient-resource rejection shows no transient built object and no route change.

## Deployment gate order

```txt
syntax and import checks
  -> existing smoke
  -> runtime session fixtures
  -> fixed-step clock fixtures
  -> capability reachability fixtures
  -> composite-command DOM-free fixture
  -> composite-command browser fixture
  -> static build
  -> artifact inspection
  -> Pages deployment
  -> deployed-route smoke
```

## Required evidence record

```txt
source commit
fixture version
runtime/session identity policy
transaction schema version
case results
publication counts
before/after fingerprints
first-frame acknowledgements
artifact hash
deployed URL and checked timestamp
```

## Current result

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
fixtures implemented: no
fixtures run: no
browser smoke run: no
Pages smoke run: no
```
