# Gameplay audit: seed, command, and tick replay loop

Timestamp: `2026-07-10T17-18-47-04-00`

## Current gameplay loop

```txt
fresh engine creation
  -> generate fixed tree grid
  -> seed 26 random apples
  -> enter active session
  -> direct movement / collect / clear / phase commands
  -> fixed 1/60 ticks
  -> random night pest spawn decisions
  -> random pest angle and ID
  -> pursuit and player damage
  -> score / resource mutation / failure
```

## Deterministic inputs already present

- Tree rows and columns use fixed loops and spacing.
- Runtime delta is clamped.
- Browser loop always requests `engine.tick(1 / 60)`.
- Commands are synchronous.
- Domain snapshots are serializable in current implementations.

## Uncontrolled inputs

### Orchard world

```txt
apple source tree selection
apple x/y offset
apple kind
apple ID
replacement apple draws after collection
```

### Active session

```txt
night spawn probability decision
pest spawn angle
pest ID
```

All use global `Math.random()` with no seed or stream ownership.

## Replay failure mode

Two engines receiving the same commands and tick count can diverge before the first command because startup apple state differs. They can diverge further during collection replenishment and every night tick.

Therefore this is not currently a valid deterministic replay statement:

```txt
same initial config + same commands + same ticks = same final snapshot
```

## Required scenario loop

```txt
create scenario(seed, presetRevision)
  -> allocate named random streams
  -> construct engine
  -> record initial fingerprint
  -> dispatch ordered command script
  -> tick fixed deltas
  -> commit frame observations
  -> record final fingerprint
  -> reconstruct from same scenario
  -> replay command/tick script
  -> compare every committed frame or final fingerprint
```

Recommended random streams:

```txt
orchard.apple.tree
orchard.apple.offset
orchard.apple.kind
orchard.apple.id
session.pest.spawn-decision
session.pest.angle
session.pest.id
```

## Acceptance scenarios

1. Same seed and same script produce identical initial and final fingerprints.
2. Different seeds produce different orchard fingerprints while preserving structural invariants.
3. A rejected command changes no gameplay fingerprint.
4. A duplicate idempotent command does not double-apply mutation.
5. A collection command records the replacement-apple random draw range.
6. A night tick records whether the pest spawn decision was accepted or skipped.
7. Replay catches any random call added outside the owned random service.

## Recommendation

Implement deterministic scenario ownership before adding more content or relying on whole-state Market fixture parity. Existing game domains should consume injected scenario services rather than reaching directly for global randomness.