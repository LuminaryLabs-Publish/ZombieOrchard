# Randomness audit — seeded RNG and deterministic replay contract

**Run:** `2026-07-10T23-50-53-04-00`

## Problem statement

Global `Math.random()` is hidden mutable state. It cannot be seeded, snapshotted, reset, partitioned, replayed or correlated with a session. ZombieOrchard therefore cannot prove that a reset is clean or that a reported failure is reproducible.

## Required public contract

```txt
createOrchardGame({
  preset,
  session: { seed, epoch },
  randomProvider
})
```

The default provider may generate a seed, but the accepted start result must return that seed.

## Generator requirements

```txt
deterministic for a stable seed
portable across Node and browser
explicit arithmetic policy
normalized [0, 1) output
serializable stream cursor/state
no ambient Math.random fallback after admission
```

## Stream derivation

```txt
root seed
  -> world stream
  -> encounter stream
  -> future UI-only stream if needed
```

Stream IDs and derivation version must be recorded so future algorithm changes can be versioned.

## Decision row

```txt
sequence
sessionEpoch
simulationTick
streamId
drawIndex
purpose
value
resolvedOutcome
```

Purposes include:

```txt
apple.treeIndex
apple.offsetX
apple.offsetY
apple.kind
pest.spawnAdmission
pest.spawnAngle
```

IDs should be monotonic domain IDs or deterministic derivations, not random base-36 fragments.

## Snapshot policy

Detached snapshots should expose:

```txt
root seed
random algorithm/version
per-stream cursors
bounded recent decision rows
committed state fingerprint
replay receipt ID
```

They should not expose a mutable generator object.

## Replay policy

A replay consists of:

```txt
preset/content fingerprint
session seed and epoch
fixed-step configuration
ordered admitted commands with tick boundaries
expected final state fingerprint
```

Random values should normally be regenerated from seed and cursors. The decision journal is proof and diagnostics, not the primary state source.

## Compatibility policy

Changing generator algorithm, stream derivation or draw order is a replay-schema change. Old receipts must either declare incompatibility or route through a versioned replay adapter.

## Fixture matrix

```txt
same seed / same schedule -> exact equality
same seed / paused interval -> exact equality and unchanged cursor
same seed / rejected command -> exact equality and unchanged cursor
different seed / same schedule -> declared divergence with valid invariants
world-code extra draw -> encounter stream unchanged
replay receipt -> final fingerprint equality
```
