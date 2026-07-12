# Architecture audit: kit graph installation authority

**Timestamp:** `2026-07-12T10-00-00-04-00`

## Summary

The engine has kit factories but no authoritative kit graph. This DSK adds immutable manifests, compatible service resolution, deterministic phases, isolated candidate construction, atomic graph commit, rollback, disposal and graph-to-frame proof.

## Plan ledger

**Goal:** convert the mutable installation loop into a composed authority with typed inputs, results and lifecycle guarantees.

- [x] Map current construction and mutation paths.
- [x] Map implicit dependencies and order-sensitive consumers.
- [x] Define parent domain and coordinating kits.
- [x] Define transaction, rejection and rollback results.
- [x] Define first visible graph-frame acknowledgement.
- [ ] Implement and validate the DSK.

## Parent domain

```txt
zombie-orchard-kit-graph-installation-authority-domain
```

## Identity and schema kits

```txt
kit-manifest-schema-kit
kit-id-kit
kit-version-kit
kit-compatibility-range-kit
domain-id-ownership-kit
service-version-kit
kit-graph-id-kit
kit-graph-revision-kit
kit-graph-fingerprint-kit
```

## Contract and planning kits

```txt
provided-service-contract-kit
required-service-contract-kit
kit-dependency-graph-kit
kit-cycle-detection-kit
kit-phase-descriptor-kit
deterministic-kit-order-kit
kit-graph-predecessor-kit
```

## Candidate and validation kits

```txt
kit-graph-candidate-kit
isolated-kit-context-kit
kit-create-result-kit
kit-graph-validation-kit
duplicate-kit-rejection-kit
duplicate-domain-rejection-kit
missing-service-rejection-kit
incompatible-service-rejection-kit
```

## Commit and lifecycle kits

```txt
kit-graph-commit-kit
kit-graph-rollback-kit
kit-predecessor-retirement-kit
kit-disposal-result-kit
kit-installation-receipt-kit
kit-graph-observation-kit
kit-graph-journal-kit
first-kit-graph-frame-ack-kit
```

## Fixture kits

```txt
kit-order-fixture-kit
duplicate-domain-fixture-kit
missing-service-fixture-kit
failed-create-rollback-fixture-kit
runtime-replacement-fixture-kit
pages-kit-graph-smoke-kit
```

## Required transaction

```txt
KitGraphInstallCommand
  -> verify runtime session and expected graph predecessor
  -> normalize and freeze manifests
  -> validate unique kit/domain ownership
  -> resolve compatible service providers
  -> reject missing providers, incompatible versions and cycles
  -> calculate deterministic create, tick and dispose phases
  -> create all domains inside an isolated candidate context
  -> collect resource and disposal leases
  -> validate candidate APIs and snapshots
  -> atomically commit one KitGraphRevision
  -> migrate or retire replaced predecessors
  -> rollback candidate resources on any failure
  -> publish graph fingerprint and per-kit receipts
  -> acknowledge the first canvas and HTML frame citing the graph revision
```

## Current-to-target mapping

| Current surface | Target authority |
|---|---|
| Ordered array in `createOrchardGame()` | Immutable manifest set and deterministic resolver |
| `kit.create(ctx)` against live context | Isolated candidate context |
| `domains[id] = domain` | Atomic graph commit with duplicate rejection |
| Optional domain API lookup | Required/provided service contract |
| `Object.values(domains)` tick order | Named deterministic phase plan |
| Raw `GameHost.engine.addKit()` | Capability-gated install command |
| No cleanup on failure | Reverse rollback and disposal receipts |
| Domain-only snapshots | Graph ID, revision and fingerprint provenance |

## Invariants

```txt
one domain ID has one admitted owner per graph revision
all required services resolve before candidate creation commits
input manifest order cannot alter resolved phase order
a failed candidate cannot mutate or leak into the live graph
replacement is explicit and predecessor retirement is observable
canvas and HTML receipts cite the committed graph fingerprint
```

## Validation boundary

No implementation or compatibility claim is made until duplicate, missing-service, cycle, order, rollback, replacement and frame-provenance fixtures pass.