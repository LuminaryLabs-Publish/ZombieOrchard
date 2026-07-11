# Architecture audit — Command transaction authority DSK map

Timestamp: `2026-07-11T01-31-15-04-00`

## Current call graph

```txt
HTML data-action
  -> kit-runtime.engine.command(interface-composition, activate)
  -> interface-composition.command(activate)
  -> active screen domain.command(activate)
  -> action descriptor
  -> optional kit-runtime.engine.command(child domain, child type)
  -> child mutation
  -> child notification
  -> child result discarded
  -> optional composition route mutation
  -> parent result
  -> parent notification
```

## Current ownership map

| Owner | Current responsibility | Authority gap |
| --- | --- | --- |
| `kit-runtime` | command lookup, invocation and notification | no command sequence, transaction context, staging, commit barrier, rollback or journal |
| scoped interface domain | action selection and disabled rejection | no command envelope or parent correlation |
| `interface-composition-kit` | child dispatch and route movement | discards child result and can publish child state before route resolution |
| `resource-ledger-kit` | affordability and boolean payment | no typed debit result, attribution, reservation or rollback |
| `construction-runtime-kit` | lookup, pay and create build row | unknown IDs fall back to the first item; no composite result |
| `roster-runtime-kit` | pay and add actor | no request identity or debit attribution |
| `inventory-runtime-kit` | assign equipped ID | accepts arbitrary IDs |
| renderers | project next snapshot | no committed command ID or result correlation |
| `GameHost` | raw engine and snapshot access | no detached command/result journal |

## Required authority contract

```txt
CommandEnvelope
  commandId
  parentCommandId
  transactionId
  sessionEpoch
  domainId
  type
  payload
  source

CommandPreflightResult
  accepted
  reason
  plannedChildren
  plannedRoute
  plannedResourceEffects

CompositeCommandResult
  commandId
  transactionId
  accepted
  reason
  parentResult
  childResults[]
  routeResult
  resourceResults[]
  beforeFingerprint
  afterFingerprint
  publicationCount
  committed

CommandJournalRow
  envelope
  preflight
  result
  committedTick
  renderedFrameId
```

## Candidate kits

```txt
command-envelope-kit
command-sequence-kit
composite-command-transaction-kit
child-command-result-kit
command-result-envelope-kit
command-publication-barrier-kit
command-rollback-kit
resource-transaction-result-kit
command-journal-kit
render-command-correlation-kit
command-transaction-fixture-kit
```

## Update-existing-first plan

1. Extend `kit-runtime` with a transaction stack and one publish-on-commit path.
2. Change nested dispatch to return child results into the parent context rather than notifying immediately.
3. Change `interface-composition-kit` to preserve child and route results and reject the whole action when a required child fails.
4. Add strict catalog/item validation to construction, roster and inventory mutations.
5. Replace boolean resource payment with a typed, attributed result.
6. Publish one bounded detached command journal through `GameHost`.
7. Correlate the next rendered snapshot with the committed command ID.
8. Add DOM-free fixtures proving accepted, rejected and rolled-back composite commands.

## Dependency placement

```txt
session authority
  -> command sessionEpoch
fixed-step clock
  -> committedTick
capability registry
  -> public command admission
composite command transaction
  -> stable command/result journal
seeded replay
  -> correlate random decision ranges with committed commands
```
