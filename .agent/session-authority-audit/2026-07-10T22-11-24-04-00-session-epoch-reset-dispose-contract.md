# Session authority audit — Epoch, reset, stop, and disposal contract

Timestamp: `2026-07-10T22-11-24-04-00`

## Authority boundary

One application-level owner must hold:

```txt
current lifecycle state
current session epoch
current committed session handle
preset and seed provenance
clock mode
last committed simulation tick
bounded lifecycle result journal
retired session handles pending disposal
host disposal state
```

No interface screen, renderer, or gameplay domain should own this cross-domain state.

## Session states

```txt
idle
starting
running
paused
ended
stopping
stopped
disposed
failed
```

## Epoch rules

1. Boot begins at epoch `0` with no active session.
2. A successful Play or New Game commit increments the epoch.
3. Pause, Resume, and End preserve the epoch.
4. A failed start/reset preserves the current epoch and session.
5. Stop retires the current session without reusing its epoch.
6. Dispose is terminal for the host instance.

## Reset ownership matrix

| Domain | Reset source | Required proof |
| --- | --- | --- |
| resource ledger | preset resources | exact values and empty transient message state |
| pressure field | preset pressures | exact channels |
| orchard world | preset plus random-source policy | expected tree/world fingerprint |
| construction runtime | preset catalog | empty built rows and reset message |
| roster runtime | preset actors/roles | exact roster |
| inventory runtime | preset items/equipped | exact inventory and valid equipped ID |
| active session | domain initial-state factory | exact player/day/phase/pests/score/ended state |
| scoped interfaces | preset descriptors | selected index and fields reset |
| composition | initial route policy | expected active/previous values |

## Reset transaction

```txt
request reset
  -> verify host not disposed
  -> create candidate graph
  -> validate required domains
  -> compute candidate fingerprint
  -> stop prior automatic mutation
  -> retire prior graph
  -> commit candidate graph atomically
  -> increment epoch
  -> resume clock if policy says running
  -> publish one reset result
  -> dispose retired graph
```

## Failure contract

A failed candidate creation, validation, fingerprint, or commit must leave the prior session untouched and return a stable rejected result. Partial domain replacement is forbidden.

## Stop contract

```txt
running/paused/ended
  -> stopping
  -> cancel automatic clock ownership
  -> reject new gameplay commands
  -> retire session
  -> stopped
```

## Dispose contract

```txt
stop if needed
  -> cancel RAF
  -> remove DOM listeners
  -> dispose renderers
  -> dispose runtime/session domains
  -> clear subscribers and journals according to policy
  -> disposed
```

`dispose()` must be idempotent. Every command after disposal must return a detached rejection result rather than mutate state or throw unexpectedly.

## Required GameHost readback

```json
{
  "lifecycle": "running",
  "sessionEpoch": 2,
  "clockMode": "automatic",
  "simulationTick": 120,
  "sessionFingerprint": "...",
  "lastTransition": {
    "type": "reset",
    "status": "committed",
    "previousEpoch": 1,
    "nextEpoch": 2
  },
  "disposed": false
}
```

## Gate

Do not treat screen transitions as evidence of lifecycle correctness. The fixture must assert session identity, state fingerprints, clock eligibility, and resource disposal independently of the rendered screen.