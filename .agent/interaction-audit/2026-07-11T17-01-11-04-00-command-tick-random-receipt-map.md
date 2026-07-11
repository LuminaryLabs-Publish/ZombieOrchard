# Interaction audit: Command and Tick Random Receipt Map

## Plan ledger

**Goal:** require every authoritative random draw to belong to one admitted command or committed simulation tick and to remain observable through its result and first rendered acknowledgement.

- [x] Map collection-command random use.
- [x] Map night-tick random use.
- [x] Identify missing command, tick and draw identity.
- [x] Define accepted, rejected and rollback cursor behavior.
- [ ] Implement typed receipts and interaction fixtures.

## Current map

```txt
Collect click
  -> direct engine.command
  -> collect nearest apple
  -> refill with global Math.random
  -> command result returned
  -> caller discards result
  -> no random receipt

Night RAF tick
  -> engine.tick(1/60)
  -> random pest trial
  -> optional random spawn angle/id
  -> snapshot
  -> no committed tick or random receipt
```

## Required command map

```txt
PublicCommandEnvelope
  -> session and lifecycle admission
  -> command/transaction identity
  -> non-mutating preflight
  -> staged named-stream draws
  -> staged mutation
  -> atomic commit
  -> RandomDecisionReceipt[]
  -> CommandResult
  -> first-frame acknowledgement
```

## Required tick map

```txt
CommittedSimulationTick
  -> eligible night-spawn policy
  -> staged pest-admission draw
  -> optional staged placement draw
  -> atomic tick commit
  -> CommittedTickRandomReceipt
  -> state fingerprint
  -> render-frame acknowledgement
```

## Cursor rules

```txt
accepted and committed
  -> advance cursor
  -> append receipt

rejected before mutation
  -> do not advance authoritative cursor

rolled back
  -> restore staged cursor
  -> record rollback result, not a committed random receipt

duplicate command
  -> return cached result
  -> do not draw again

stale session/tick/replay
  -> typed rejection
  -> no cursor movement
```

## Required receipt fields

```txt
randomDecisionId
runtimeId
sessionId
runId
sessionEpoch
commandId or simulationTickId
transactionId
streamId
cursorBefore
cursorAfter
policyId
policyVersion
normalizedValue
mappedValue
committedStateFingerprint
```

The current UI and GameHost cannot present this evidence.