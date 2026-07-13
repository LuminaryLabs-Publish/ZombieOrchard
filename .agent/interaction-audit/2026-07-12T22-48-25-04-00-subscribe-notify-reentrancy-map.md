# Interaction audit: subscribe, notify and reentrancy map

**Timestamp:** `2026-07-12T22-48-25-04-00`

## Summary

The public raw engine allows arbitrary subscription and mutation. Subscription callbacks execute inside command/tick publication and can recursively invoke the same mutation surface.

## Plan ledger

**Goal:** define explicit observer and mutation admission during publication.

- [x] Map public subscription reachability.
- [x] Map nested command/tick behavior.
- [x] Demonstrate possible order inversion.
- [x] Define admission results.
- [ ] Implement gateway and fixtures.

## Reentrancy sequence

```txt
outer command commits state A
  -> publish S1
  -> observer A receives S1
     -> observer A invokes nested command
     -> nested command commits state B
     -> publish S2
     -> observer A receives S2
     -> observer B receives S2
  -> outer publication resumes
  -> observer B receives S1
```

Observer B sees a newer state before an older state.

## Required admission results

```txt
ObserverSubscribed
ObserverAlreadySubscribed
ObserverRetired
ObserverGenerationStale
PublicationQueued
PublicationDelivered
ReentrantMutationQueued
ReentrantMutationRejected
ObserverDeliveryFailed
ObserverBudgetExceeded
```

## Required interaction boundary

Expose a bounded observation gateway. Do not expose mutation and subscription through the same unrestricted raw engine capability. An observer callback must not be able to start nested publication.
