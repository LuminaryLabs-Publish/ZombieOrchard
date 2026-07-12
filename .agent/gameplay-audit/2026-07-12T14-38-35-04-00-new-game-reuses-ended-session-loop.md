# Gameplay audit: New Game reuses ended session

**Timestamp:** `2026-07-12T14-38-35-04-00`

## Summary

The authored menu promises Play and New Game, but both routes reuse the one boot-time gameplay graph. A completed failure remains terminal because `active-session.ended` is never cleared.

## Plan ledger

**Goal:** document the exact player-visible restart failure and define acceptance criteria for a clean new run.

- [x] Trace Entry Play.
- [x] Trace Entry New Game and Run Setup Start.
- [x] Trace Pause Title.
- [x] Trace failure, Outcome Title and later Play.
- [x] Inventory predecessor state that survives.
- [x] Define clean-run gameplay invariants.
- [ ] Add and execute restart fixtures.

## Failed-run loop

```txt
night pests damage player
  -> condition reaches zero
  -> active-session sets ended=true
  -> composition tick moves to outcome
  -> player chooses Title
  -> composition moves to entry only
  -> player chooses Play or New Game -> Start
  -> composition moves to existing active-session
  -> next tick reads ended=true
  -> composition moves back to outcome
```

## Partial-run loop

```txt
collect apples / build / hire / change equipment / lose condition
  -> Pause
  -> Title
  -> New Game
  -> Start
  -> predecessor balances, pressure, apples, builds, actors, equipment, score, player condition and phase remain
```

## Clean-run invariants

```txt
new run has a new runId and generation
ended=false
player position, condition and stamina match preset
score=0
day=1 and phase=day
pests=[]
resources match preset exactly
pressure matches preset exactly
built=[]
roster matches preset
inventory ownership/equipment match preset
orchard population derives from the new run seed
interface route is active-session with reset selected fields
no predecessor command can mutate the successor
```

## Player-facing severity

This blocks reliable replay after failure and makes the New Game label materially inaccurate even before failure.

## Non-claim

No gameplay state was reset and no restart behavior changed.