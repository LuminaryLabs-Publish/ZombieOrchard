# Gameplay audit: Play and New Game session adoption loop

**Timestamp:** `2026-07-15T12-39-01-04-00`

## Summary

Play and New Game both reach active-session without a save identity, load result or durable new-run result. Play adopts the current mutable runtime directly; New Game only adds an intermediate setup screen.

## Plan ledger

**Goal:** make every playable run originate from an accepted loaded slot or an accepted new-session creation result.

- [x] Trace Play, New Game, Start and active-session routes.
- [x] Confirm no save selection or durable commit occurs.
- [x] Confirm the smoke test requires direct Play entry.
- [ ] Bind active-session to `RunGeneration` and `SaveSlotId`.
- [ ] Reject route entry without an accepted session result.

## Current loop

```txt
Play
  -> entry.activate(play)
  -> move(active-session)
  -> use existing mutable runtime domains

New Game
  -> entry.activate(new)
  -> move(run-setup)
  -> run-setup.activate(start)
  -> move(active-session)
  -> no slot allocation or initial save commit
```

## Required loop

```txt
Play
  -> DiscoverSaveSlotsCommand
  -> SaveCatalogResult
  -> select or explicitly choose new session

Select slot
  -> SelectSessionCommand
  -> validate/migrate/prepare
  -> atomic runtime adoption
  -> SessionSelectionResult
  -> active-session

New Game
  -> CreateNewSessionCommand
  -> reset all domains
  -> initial durable commit
  -> NewSessionResult
  -> active-session
```

## Validation boundary

No save, reload, migration or gameplay-adoption fixture was executed.
