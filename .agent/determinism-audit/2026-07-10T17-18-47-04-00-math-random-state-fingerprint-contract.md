# Determinism audit: Math.random and state fingerprint contract

Timestamp: `2026-07-10T17-18-47-04-00`

## Direct global randomness

### `orchard-world-kit`

```txt
Math.random() -> source tree index
Math.random() -> apple x offset
Math.random() -> apple y offset
Math.random() -> apple kind
Math.random() -> apple ID
```

These draws occur during initial engine construction and replacement-apple replenishment.

### `active-session-domain-kit`

```txt
Math.random() -> pest spawn probability decision
Math.random() -> pest spawn angle
Math.random() -> pest ID
```

These draws occur during night ticks.

## Current contract failure

There is no stable mapping from:

```txt
scenario input
command sequence
tick sequence
```

to:

```txt
initial snapshot
per-frame snapshots
final snapshot
render projection
```

The runtime can clamp time, but it cannot reproduce random state.

## Required random service

```txt
random.next(streamId, metadata)
random.int(streamId, min, max, metadata)
random.range(streamId, min, max, metadata)
random.id(streamId, prefix, metadata)
random.snapshot()
```

Every draw should be derived from:

```txt
scenarioSeed
streamId
drawIndex
```

Every draw row should be JSON-safe and bounded for diagnostics.

## State fingerprint rules

A scenario fingerprint should:

- Include domain snapshots in stable domain-key order.
- Sort entity arrays by stable ID before hashing.
- Exclude renderer handles, DOM nodes, functions, and mutable engine references.
- Include scenario seed, preset revision, frame, elapsed, and fixed delta.
- Include command and event range IDs.
- Use one documented canonical serialization.

## Fixture matrix

```txt
same seed + same script + same tick count -> identical fingerprint
different seed + same script -> different world fingerprint
same seed + rejected command -> no gameplay fingerprint change
same seed + duplicate idempotent command -> no second mutation
same seed + replay -> matching command, frame, and final fingerprints
```

## Enforcement

The fixture should fail when:

- `Math.random()` is called from gameplay domains.
- A random stream consumes an unexpected extra draw.
- Entity IDs are not stable.
- Snapshot ordering changes the fingerprint.
- Replay command results diverge.
- Renderers consume a different frame than the committed observation.

## Recommendation

Treat deterministic random-source injection as a shared service, not a utility imported ad hoc by each domain. This keeps random authority visible in the DSK composition and allows headless replay without a browser.