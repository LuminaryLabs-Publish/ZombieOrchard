# Gameplay audit: command, tick and notify ordering loop

**Timestamp:** `2026-07-12T22-48-25-04-00`

## Summary

Gameplay mutations and observer delivery are coupled. Commands and ticks commit state first, then synchronously execute arbitrary observer code before returning the committed result or snapshot.

## Plan ledger

**Goal:** keep gameplay settlement exactly once even when observers fail, retry or attempt reentrant mutation.

- [x] Trace command settlement.
- [x] Trace tick settlement.
- [x] Trace reentrant command and tick behavior.
- [x] Identify duplicate-retry risk.
- [ ] Add executable settlement/publication fixtures.

## Command path

```txt
engine.command()
  -> domain.command()
  -> state mutates
  -> notify()
  -> observer throws
  -> caller receives exception, not accepted result
  -> state remains mutated
  -> caller may retry and duplicate effect
```

Concrete mutation categories at risk include resource grants/payments, construction, hiring, movement, collection, pest clearing and phase changes.

## Tick path

```txt
engine.tick()
  -> frame/elapsed advance
  -> every domain ticks
  -> state changes
  -> notify()
  -> observer throws or re-enters
  -> tick result is withheld or observation order regresses
```

## Required separation

```txt
MutationCommitResult
PublicationEnvelope
ObserverDeliveryReport
PresentationResult
```

These results must be related by IDs and revisions but must not share failure semantics. Observer delivery failure must not convert an accepted mutation into an ambiguous retry state.
