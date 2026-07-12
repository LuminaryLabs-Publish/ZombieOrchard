# Player-control audit: movement binding, route and focus contract

## Authority

```txt
zombie-orchard-player-control-reachability-authority-domain
```

## Canonical binding manifest

```txt
move-up:    KeyW, ArrowUp
move-left:  KeyA, ArrowLeft
move-down:  KeyS, ArrowDown
move-right: KeyD, ArrowRight
```

Bindings resolve to a unit intent vector. Opposed directions cancel. Diagonal vectors normalize to unit length before movement magnitude is applied.

## Admission

Movement is accepted only when all are true:

```txt
runtime lifecycle == active
run is current
session epoch matches
active route == active-session
window/document focus lease is valid
run is not ended
input sequence is newer than the last consumed sequence
vector is finite and bounded
```

## Retirement

All held input and pending movement must be cleared on:

```txt
keyup
window blur
document visibility hidden
route transition away from active-session
pause
outcome
new run/reset
runtime stop/dispose
```

A retired lease cannot be resumed by an old keyup, delayed callback or predecessor-run frame.

## Result

```txt
MovementCommandResult {
  commandId,
  inputSequence,
  status,
  reason,
  beforePosition,
  afterPosition,
  routeRevision,
  stateRevision,
  simulationTickId,
  frameReceipt
}
```

## Integration rule

DOM adapters produce intent only. `active-session` remains the sole position writer, and the fixed-step runtime decides consumption cadence. The public host may observe detached results but may not access held-key state or mutate position directly.
