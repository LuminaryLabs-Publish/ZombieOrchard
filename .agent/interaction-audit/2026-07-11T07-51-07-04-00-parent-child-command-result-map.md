# Parent/child command result map

## Audit timestamp

```txt
2026-07-11T07-51-07-04-00
```

## Goal

Map every result boundary from browser interaction through parent activation, child gameplay command, route decision and caller observation.

## Current result path

```txt
DOM click
  -> HTML renderer discards returned engine result

outer engine.command(interface-composition, activate)
  -> active screen command returns:
     { accepted: true, action }

interface-composition
  -> child engine.command(...) returns child result
  -> child result not assigned or checked
  -> optional route move evaluated
  -> returns generic parent result

outer caller
  -> receives parent result only
  -> UI has no result projection
```

## Current result classes

```txt
missing parent domain
  -> engine returns rejected result

missing/disabled screen action
  -> scoped interface returns rejected result

child command accepted
  -> result discarded

child command rejected
  -> result discarded

route target missing
  -> move returns rejected result only when a route is attempted

child rejected plus valid route
  -> route can still be attempted under the general action contract
```

## Required interaction result tree

```txt
CompositeCommandResult
  parent
    commandId
    domain
    type
    accepted
    reason
  children[]
    childCommandId
    domain
    type
    target
    accepted
    reason
    effects
  route
    from
    to
    accepted
    reason
  transaction
    transactionId
    state
    beforeFingerprint
    afterFingerprint
    publicationCount
  render
    firstRenderedFrameId
    consumedFingerprint
```

## Required caller behavior

- The DOM adapter obtains the result or a result observation keyed by command ID.
- Accepted commands can project a success message from committed effects.
- Rejected commands project the actual child reason.
- Duplicate commands resolve to the prior exactly-once result.
- Stale session/epoch commands return a typed rejection.
- No UI route changes unless the transaction's route step commits.
- No child command publishes independently.

## Recommended command envelope

```txt
{
  commandId,
  source: "dom" | "keyboard" | "gamehost" | "fixture",
  runtimeId,
  sessionId,
  sessionEpoch,
  expectedCommittedTickId,
  domain,
  type,
  payload
}
```

## Proof cases

```txt
accepted child
  -> parent accepted
  -> child retained
  -> caller sees exact effects

rejected required child
  -> parent rejected
  -> reason retained
  -> route unchanged

optional child rejected
  -> explicit policy recorded
  -> parent result identifies degraded outcome

unknown action/target/domain
  -> precise rejection layer recorded

rollback
  -> parent state rolled_back
  -> child failure retained
  -> before and after fingerprints equal
```
