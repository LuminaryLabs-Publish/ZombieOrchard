# Interaction audit — command to random-outcome correlation map

**Run:** `2026-07-10T23-50-53-04-00`

## Current command path

```txt
DOM click
  -> interface-composition.activate or active-session command
  -> synchronous domain mutation
  -> optional nested command
  -> next tick/render
```

There is no stable command sequence, and nested child results can be discarded.

## Randomly affected interactions

| Interaction | Immediate command | Random consequence |
| --- | --- | --- |
| Play / Start | screen transition only | existing random orchard is merely revealed |
| New Game | screen transition only | no new seed or reset policy |
| Collect | `active-session.collect` | apple replenishment consumes world random draws |
| Next Phase | `active-session.next-phase` | later night ticks begin encounter random draws |
| Pause | screen transition only | random pest admission continues |
| Title | screen transition only | existing stream state remains live |
| manual `GameHost.tick()` | unrestricted tick | may consume encounter draws outside browser cadence |

## Required correlation chain

```txt
commandSequence
  -> command result
  -> committed simulation tick
  -> consumed random decision sequence range
  -> committed state fingerprint
  -> rendered frame observation
```

## Interaction rules

- Rejected commands consume no gameplay random draws.
- Pause and non-running states consume no encounter draws.
- New Game returns the admitted seed and new stream cursors.
- Replay applies commands by sequence and tick boundary.
- Nested commands return their child result instead of silently discarding it.
- Manual ticking is rejected while automatic clock authority is active.

## Fixture need

The fixture must prove that one accepted collect consumes only the expected world-stream range and that pause, rejected collect and Title consume no random draws.
