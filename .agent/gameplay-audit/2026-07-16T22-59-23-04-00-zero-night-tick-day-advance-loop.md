# Gameplay audit: zero-night-tick day advance loop

**Timestamp:** `2026-07-16T22-59-23-04-00`  
**Status:** `day-phase-transition-admission-settlement-authority-audited`

## Current loop

```txt
player presses Next Phase
  -> phase toggles immediately
  -> entering day increments day
  -> accepted result returned

night simulation
  -> occurs only in active-session.tick(dt)
  -> pest spawn chance applies only when phase === night
  -> pests move and damage the player only during subsequent ticks
```

Because browser click events can run multiple times before the next RAF, `day -> night -> day` can complete with no intervening active-session tick. The day counter advances while the intended night exposure may be skipped.

## Gameplay risks

```txt
rapid day farming
night danger bypass
pressure/day mismatch
unobservable intermediate phase
repeated activation ambiguity
save or outcome snapshots bound to an unsettled phase
```

## Required gameplay policy

- Define minimum day and night duration or explicit completion criteria.
- Bind transitions to expected phase/day/session revisions.
- Lock or reject a second transition while settlement is pending.
- Decide whether phase exit requires at least one simulation settlement tick.
- Increment the day counter only in accepted day-entry settlement.
- Publish exact rejected reasons for early, duplicate, stale, terminal, paused, or suspended requests.

## Required fixtures

```txt
rapid double click
programmatic duplicate delivery
zero elapsed night
one required night settlement tick
stale expected phase
outcome during pending transition
source/dist/Pages parity
```

No exploit was executed in a browser during this audit; the gap is directly supported by the command and tick ordering in source.