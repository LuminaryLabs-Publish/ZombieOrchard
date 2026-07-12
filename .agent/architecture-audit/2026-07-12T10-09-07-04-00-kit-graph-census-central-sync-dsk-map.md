# Architecture audit: kit graph census and authority map

**Timestamp:** `2026-07-12T10-09-07-04-00`

## Summary

The shipped graph installs 19 kits into one mutable domain object, but installation is not modeled as a domain transaction. The source has no manifest, dependency graph, service compatibility, duplicate-owner rejection, atomic commit, rollback, predecessor retirement or graph provenance.

## Plan ledger

**Goal:** replace ambient installation order and mutable map assignment with a deterministic, validated and observable kit-graph authority.

- [x] Count engine-installed kits directly from source.
- [x] Separate engine-installed kits from host/tooling surfaces.
- [x] Identify implicit service dependencies.
- [x] Identify order-sensitive consumers.
- [x] Define parent domain and child kits.
- [x] Define commit and rollback transaction.
- [ ] Implement and validate the authority.

## Current graph

```txt
createOrchardGame
  -> six gameplay kits
  -> eleven generic interface kits
  -> one gameplay active-session kit
  -> one interface-composition kit
  -> 19 engine-installed kits total

createKitRuntime
  -> one live domains object
  -> one shared mutable context
  -> sequential kit.create(ctx)
  -> direct domains[domain.id] assignment
```

## DSK/domain breakdown

```txt
zombie-orchard-kit-graph-installation-authority-domain
  identity
    kit-manifest-schema-kit
    kit-id-kit
    kit-version-kit
    kit-compatibility-range-kit
    domain-id-ownership-kit

  services
    provided-service-contract-kit
    required-service-contract-kit
    service-version-kit
    service-binding-result-kit

  planning
    kit-dependency-graph-kit
    kit-cycle-detection-kit
    kit-phase-descriptor-kit
    deterministic-kit-order-kit
    kit-graph-predecessor-kit
    kit-graph-candidate-kit

  construction
    isolated-kit-context-kit
    kit-create-result-kit
    kit-graph-validation-kit
    duplicate-kit-rejection-kit
    duplicate-domain-rejection-kit
    missing-service-rejection-kit
    incompatible-service-rejection-kit

  commit
    kit-graph-commit-kit
    kit-graph-rollback-kit
    kit-predecessor-retirement-kit
    kit-disposal-result-kit

  provenance
    kit-graph-id-kit
    kit-graph-revision-kit
    kit-graph-fingerprint-kit
    kit-installation-receipt-kit
    kit-graph-observation-kit
    kit-graph-journal-kit
    first-kit-graph-frame-ack-kit
```

## Required service edges

```txt
construction-runtime -> resource-ledger.pay
roster-runtime       -> resource-ledger.pay
active-session       -> orchard-world.collectNear
active-session       -> resource-ledger.add
active-session       -> pressure-field.adjust
interface-composition -> active-session.snapshot
interface-composition -> active route command surface
```

## Required phases

```txt
phase 0: identity and pure ledgers
phase 1: world/economy providers
phase 2: gameplay/session consumers
phase 3: interface domains
phase 4: interface composition and outcome routing
phase 5: publication and render projection
```

## Atomic transaction

```txt
KitGraphInstallCommand
  -> normalize immutable manifests
  -> validate identities and versions
  -> resolve services and phases
  -> reject duplicate, missing, cyclic or incompatible graph
  -> construct detached candidate graph
  -> collect resource leases
  -> validate candidate snapshots and APIs
  -> atomically commit one graph revision
  -> retire explicit predecessors
  -> rollback candidate resources on failure
  -> publish fingerprint and receipts
  -> acknowledge first visible canvas/HTML frame
```

## Guardrail

Do not allow `GameHost` or diagnostics to call raw `addKit()` after graph lock. Public mutation must pass through a capability-gated graph command.