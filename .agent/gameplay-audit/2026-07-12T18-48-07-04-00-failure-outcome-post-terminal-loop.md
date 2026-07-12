# Gameplay audit: failure, Outcome and post-terminal mutation loop

**Timestamp:** `2026-07-12T18-48-07-04-00`

## Summary

Failure is not a complete gameplay phase transition. Tick simulation halts, but gameplay commands remain legal and can change the final state.

## Plan ledger

**Goal:** map every mutation reachable after failure and define the exact point at which the run must become immutable.

- [x] Trace pest contact damage.
- [x] Trace failure predicate and ended mutation.
- [x] Trace Outcome routing.
- [x] Trace every active-session command after failure.
- [x] Define the required terminal barrier.
- [ ] Implement and execute gameplay fixtures.

## Current loop

```txt
night
  -> pests spawn and pursue
  -> each contacting pest subtracts condition
  -> condition <= 0
  -> condition = 0
  -> ended = true
  -> failure message

later in same/next frame
  -> composition routes Outcome

after Outcome
  -> move can change player
  -> collect can mutate orchard/resources/pressure/score/message
  -> clear can mutate pests/resources/score/message
  -> next-phase can mutate phase/day/message
```

## Mutation matrix

| Command | Still accepted after ended | Possible terminal-state drift |
|---|---:|---|
| move | yes | player position |
| collect | yes | apples, money, pressure, score, message, orchard membership |
| clear | yes | pest condition/list, scrap, score, message |
| next-phase | yes | phase, day, message |
| activate | depends on ID | interface action result |
| tick | returns early | no active-session tick mutation |

## Required gameplay phases

```txt
READY
ACTIVE
TERMINAL_PENDING
TERMINAL_COMMITTED
RETIRED
```

Only `ACTIVE` may admit movement, collection, clearing, phase and economy effects. `TERMINAL_PENDING` accepts only terminal settlement. `TERMINAL_COMMITTED` accepts readback and explicit restart/title commands through separate authorities.

## Required result

```txt
TerminalGameplayResult
  terminalOutcomeId
  cause
  finalScore
  finalDay
  finalPhase
  finalPlayerCondition
  finalResourceRevision
  finalWorldRevision
  finalPressureRevision
  rejectedCommandRevision
```
