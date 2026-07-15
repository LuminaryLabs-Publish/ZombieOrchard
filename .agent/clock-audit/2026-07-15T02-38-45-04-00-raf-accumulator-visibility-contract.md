# Clock audit: RAF accumulator and visibility contract

## Target algorithm

```txt
on first callback
  -> store monotonic timestamp
  -> render prepared state without synthetic wall debt

on later callback
  -> wallDelta = clamp((timestamp - priorTimestamp) / 1000)
  -> accumulator += wallDelta
  -> steps = min(floor(accumulator / fixedStep), catchUpBudget)
  -> execute steps with exactly fixedStep
  -> accumulator -= executedSteps * fixedStep
  -> classify excess as deferred or dropped by policy
  -> render once from latest state
```

## Required policies

```txt
fixedStep: explicit and versioned
maxWallDelta: explicit
maxCatchUpSteps: explicit
overflow: defer | discard | suspend
hidden tab: suspend | reduced simulation | bounded continuation
resume: reset timestamp and settle accumulator debt
render with zero steps: explicit
external diagnostic tick: separate capability authority
```

## Invariants

- Equal wall-time traces produce equal admitted fixed-step counts independent of callback frequency.
- Gameplay domains receive only the declared fixed quantum.
- One simulation step has one stable ID and one result.
- One host frame renders no more than once.
- Both renderers consume the same accepted state revision.
- Hidden and resumed states cannot inherit unbounded stale time debt.
- Dropped or deferred time is observable diagnostics, not silent behavior.
- Host retirement rejects late callbacks.

## Missing today

All listed identities, policies, receipts and fixtures are absent from the active host.