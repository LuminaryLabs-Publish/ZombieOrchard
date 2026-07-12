# Architecture audit: interface action admission DSK map

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

ZombieOrchard needs a parent interface-action authority between route descriptors and gameplay/domain effects. The current path mixes identity lookup, selection fallback, availability, nested dispatch and route movement without one typed transaction.

## Plan ledger

**Goal:** map the required domain and kit composition without moving gameplay ownership into the interface layer.

- [x] Preserve existing scoped interface, composition and gameplay domains.
- [x] Keep gameplay commands owned by gameplay domains.
- [x] Add exact interface-action admission before nested dispatch.
- [x] Add typed nested-result propagation.
- [x] Add route policy and visible-result proof.
- [ ] Implement candidate kits and fixtures.

## Current boundary

```txt
scoped interface descriptor
  -> generic activate lookup or selected fallback
  -> composition nested command
  -> optional route move
  -> uncorrelated snapshot publication
```

## Required parent domain

```txt
zombie-orchard-interface-action-admission-authority-domain
```

## Domain responsibilities

```txt
owns:
  action command identity
  route and action-set revision admission
  exact action descriptor lookup
  availability evaluation
  stale and duplicate rejection
  nested result propagation
  route-commit policy
  action result/journal
  first visible result acknowledgement

does not own:
  resource accounting
  construction semantics
  roster or inventory mutation
  orchard collection
  route rendering implementation
```

## Candidate kits

```txt
interface-action-id-kit
interface-action-set-revision-kit
interface-route-revision-kit
interface-action-manifest-kit
interface-action-availability-kit
interface-action-command-kit
interface-action-command-id-kit
interface-action-admission-kit
exact-action-lookup-kit
stale-action-rejection-kit
nested-command-result-propagation-kit
action-route-commit-policy-kit
interface-action-result-kit
interface-action-idempotency-kit
interface-action-observation-kit
interface-action-journal-kit
action-affordance-projection-kit
action-result-projection-kit
first-action-result-frame-ack-kit
```

## Required transaction

```txt
InterfaceActionCommand
  -> verify runtime session and run generation
  -> verify active route revision
  -> verify action-set revision and descriptor fingerprint
  -> exact lookup by action ID
  -> evaluate enabled/disabled availability
  -> reject stale, unknown, missing, disabled or duplicate command
  -> invoke nested gameplay command exactly once
  -> capture typed nested result
  -> apply action route policy
  -> commit InterfaceActionResult
  -> project feedback and acknowledge visible frame
```

## Invariants

```txt
invalid explicit ID never activates selection
selected activation is a separate command
nested rejection cannot become interface success
route transition cannot conceal required command failure
disabled projection matches command admission
duplicate command cannot duplicate gameplay effect
visible result cites the committed action result revision
```

## Dependency position

```txt
kit graph
  -> runtime session
  -> run generation
  -> route/action-set revisions
  -> interface action authority
  -> gameplay transaction owners
  -> render publication
```

## Non-claim

This file defines architecture only. No candidate kit is implemented.