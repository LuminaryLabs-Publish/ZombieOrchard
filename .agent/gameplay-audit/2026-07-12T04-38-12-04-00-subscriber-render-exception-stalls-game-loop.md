# ZombieOrchard Subscriber or Renderer Exception Stalls the Game Loop

**Timestamp:** `2026-07-12T04-38-12-04-00`

## Summary

A single post-commit exception can freeze the orchard. The runtime advances pressure, pests, player damage, elapsed time, and frame count before subscriber delivery. If publication or rendering throws, the recursive RAF chain is not renewed, leaving gameplay state committed but no longer advancing or visibly projecting.

## Plan ledger

**Goal:** document how a non-gameplay callback failure can become a gameplay-liveness failure and define the minimum recovery evidence.

- [x] Trace domain ticking and post-tick notification.
- [x] Trace command mutation and post-command notification.
- [x] Trace world/UI rendering and successor scheduling.
- [x] Confirm no stage catches or classifies exceptions.
- [x] Confirm public scripts can register subscribers through the raw engine.
- [x] Define deterministic failure sequences and gameplay invariants.
- [ ] Implement and run liveness fixtures.

## Failure sequence: observer during active play

```txt
night active
  -> tick advances elapsed/frame
  -> pressure increases
  -> pest spawn/movement/damage may mutate state
  -> runtime snapshots
  -> subscriber throws
  -> tick does not return
  -> world and HUD do not display successor state
  -> next RAF is never scheduled
```

Gameplay consequences:

```txt
committed pressure may be higher than visible pressure
committed player condition may be lower than visible condition
pest positions may advance without visible movement
terminal failure may commit without Outcome rendering
input clicks may continue reaching a stalled graph
public getState may report state newer than the frozen screen
```

## Failure sequence: observer during command

```txt
Collect click
  -> active-session removes nearby apple
  -> resource ledger adds apples/money
  -> pressure adjusts
  -> score/message mutate
  -> runtime notify begins
  -> subscriber throws
  -> engine.command throws to click handler
```

The command has already changed several owners, but the caller receives no stable accepted result and later subscribers may not receive the successor snapshot.

## Failure sequence: renderer after publication

```txt
tick commits state
  -> all observers receive successor snapshot
  -> world renderer succeeds
  -> HTML renderer throws
  -> world shows successor pixels
  -> HUD/route HTML remains predecessor
  -> next RAF is absent
```

## Missing gameplay authority

```txt
committedGameplayRevision
commandResultId
publicationCycleId
frameCycleId
requiredSurfacePolicy
visibleGameplayFrameReceipt
faultedRuntimeState
recoveryGeneration
inputAdmissionWhileFaulted
```

## Required gameplay policy

```txt
observer failure
  -> cannot roll back or reinterpret committed gameplay
  -> cannot suppress later observer delivery

render failure
  -> cannot produce a false complete gameplay frame
  -> must preserve explicit input policy while recovering

critical tick failure
  -> runtime becomes FAULTED or STOPPED
  -> gameplay input is rejected until explicit recovery/restart

recovery
  -> uses a new generation
  -> rejects predecessor callbacks
  -> first recovered frame cites the committed gameplay revision
```

## Fixtures

```txt
collect mutation + throwing observer preserves accepted result
night tick + throwing observer preserves explicit frame-cycle result
terminal mutation + render failure does not claim visible Outcome
HTML-only failure produces deterministic partial-frame policy
faulted runtime rejects gameplay commands
first recovered frame cites predecessor committed state revision
```

## Do not claim

Do not claim continuous gameplay, visible terminal state, command-result correctness, or recovery safety until forced observer and renderer faults are executed in browser fixtures.
