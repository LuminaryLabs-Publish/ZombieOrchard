# Architecture audit — random source and replay authority DSK map

**Run:** `2026-07-10T23-50-53-04-00`

## Current ownership

```txt
createOrchardGame(preset)
  -> creates kit runtime
  -> runtime context exposes frame, elapsed, delta, events and domains
  -> orchard-world-kit calls global Math.random()
  -> active-session-domain-kit calls global Math.random()
```

The random source is not injected, registered or observable. It exists outside the DSK graph.

## Direct consumers

### `orchard-world-kit`

```txt
seedApples()
  -> random tree index
  -> random apple ID
  -> random X offset
  -> random Y offset
  -> random apple kind
```

The same function is used for initial population and post-collection replenishment. No draw index or purpose is retained.

### `active-session-domain-kit`

```txt
night tick
  -> random spawn-admission sample

addPest()
  -> random angle
  -> random pest ID
```

Spawn admission occurs once per simulation tick, so random consumption is coupled to the clock.

## Required authority split

### Update existing owners

```txt
src/game.js
  accept session configuration and random provider

kit-runtime
  expose random service through context
  attach session epoch and simulation tick to decision rows

orchard-world-kit
  own world-stream consumers and stable apple IDs

active-session-domain-kit
  own encounter-stream consumers and stable pest IDs

GameHost
  expose detached seed, cursor, recent-decision and replay readback
```

### Add only missing cross-domain kits

```txt
seeded-random-source-kit
random-stream-partition-kit
random-decision-ledger-kit
command-replay-ledger-kit
state-fingerprint-kit
seed-replay-fixture-kit
```

## Contract shape

```js
random.draw({
  streamId: "world",
  purpose: "apple.kind",
  sessionEpoch,
  simulationTick
})
```

The result must include normalized value, stream ID, draw index, purpose, session epoch and simulation tick.

## Invariants

```txt
one session owns one declared root seed
world and encounter streams are independently derived
draw indexes are monotonic within each stream
pause does not advance stream cursors
rendering never consumes gameplay randomness
snapshots do not mutate generator state
same seed + same committed schedule = same decisions and state fingerprint
different seed may diverge but must preserve all state invariants
```

## Dependency

This authority must be implemented after session and fixed-step clock ownership so `sessionEpoch` and `simulationTick` are stable correlation keys.
