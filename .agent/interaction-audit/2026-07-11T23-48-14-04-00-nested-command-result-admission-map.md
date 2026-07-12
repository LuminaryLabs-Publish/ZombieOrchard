# Interaction audit: nested command result admission map

## Current map

```txt
DOM click
  -> data-action
  -> interface-composition.activate
  -> active screen activate
  -> action descriptor
  -> optional child engine.command
  -> child result discarded
  -> optional route transition
  -> parent result returned
  -> caller discards parent result
```

## Missing admission data

```txt
commandId
transactionId
capabilityId
hostGeneration
runtimeId
runId
sessionEpoch
lifecycleRevision
routeRevision
expectedStateRevision
source interaction ID
```

## Required interaction map

```txt
browser intent
  -> create CommandEnvelope
  -> admit capability/session/lifecycle/route/revision
  -> resolve action descriptor
  -> resolve child and route participant plan
  -> prepare all participants
  -> aggregate reject or commit
  -> return AggregateCommandResult
  -> project pending/success/rejection state
  -> acknowledge canvas and HTML frame
```

## Result propagation rules

1. Child rejection is aggregate rejection.
2. Route transition occurs only after required child commit succeeds.
3. An action without a child may still produce one aggregate result.
4. The DOM caller retains the result or a result ID.
5. Disabled and rejected reasons are projected explicitly.
6. Rapid duplicate clicks reuse the prior accepted receipt.
7. Stale route or state revisions reject before preparation.
8. No capability token is stored in DOM attributes.

## Initial interaction fixtures

```txt
Storage Shed insufficient funds -> visible rejection
Storage Shed success -> one debit, one building, one result
rapid double click -> one effect
Back action -> route-only transaction
Collect -> one aggregate gameplay result
unknown action -> stable rejection
stale route revision -> no mutation
```