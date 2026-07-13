# Architecture audit: runtime observer publication DSK map

**Timestamp:** `2026-07-12T22-48-25-04-00`

## Summary

Snapshot publication is currently an internal helper rather than an owned domain. It combines state capture, delivery ordering, observer execution and error propagation in one synchronous loop.

## Plan ledger

**Goal:** separate committed mutation from immutable observation delivery while preserving strict sequence and fault isolation.

- [x] Map current owners.
- [x] Identify missing identities, results and invariants.
- [x] Define parent domain and candidate kits.
- [x] Define publication transaction.
- [ ] Implement the DSK and fixtures.

## Existing ownership

| Concern | Current owner | Gap |
|---|---|---|
| subscription registry | `createKitRuntime()` listener `Set` | no observer ID, generation or metadata |
| snapshot capture | `engine.snapshot()` | no publication envelope or sequence |
| delivery | `notify()` | synchronous, shared object, nested delivery allowed |
| failures | JavaScript call stack | exception aborts remaining observers |
| mutation result | `engine.command()` / `tick()` | returned only after delivery completes |
| rendering | `draw()` | aborted by observer exception before renderer calls |
| public access | `window.GameHost.engine` | callers can register reentrant observers |

## Required composed domain

`zombie-orchard-runtime-observer-publication-authority-domain`

## Candidate kits

```txt
runtime-publication-id-kit
runtime-publication-sequence-kit
snapshot-envelope-kit
snapshot-fingerprint-kit
snapshot-immutability-kit
observer-id-kit
observer-generation-kit
observer-subscription-kit
observer-cursor-kit
observer-delivery-queue-kit
observer-reentrancy-guard-kit
observer-mutation-admission-kit
observer-fault-isolation-kit
observer-delivery-result-kit
observer-backpressure-budget-kit
observer-retirement-kit
publication-journal-kit
publication-observation-kit
committed-command-result-kit
committed-tick-result-kit
first-publication-frame-ack-kit
observer-order-fixture-kit
observer-fault-fixture-kit
observer-reentrancy-fixture-kit
observer-source-dist-pages-parity-fixture-kit
```

## Required transaction

```txt
mutation candidate
  -> validate runtime session and predecessor state revision
  -> commit state and typed mutation result
  -> allocate publication ID and monotonic sequence
  -> capture immutable snapshot envelope and fingerprint
  -> enqueue after the mutation stack unwinds
  -> drain one sequence at a time
  -> deliver to each active observer generation
  -> reject or queue reentrant mutations by explicit policy
  -> isolate failures and continue delivery
  -> publish observer duration/fault/backpressure results
  -> retire stale observers exactly once
  -> correlate render frame with publication sequence
  -> acknowledge first matching visible frame
```

## Invariants

```txt
publication sequences never regress
sequence N delivery completes before N+1 begins
an observer cannot mutate another observer's envelope
observer failure cannot roll back committed state
observer failure cannot suppress later observers
caller receives committed mutation result exactly once
reentrant mutation cannot cause nested publication
rendered frame cites one admitted publication sequence
```
