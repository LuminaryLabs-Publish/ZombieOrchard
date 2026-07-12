# Gameplay audit: interface action, command and route loop

**Timestamp:** `2026-07-12T16-51-47-04-00`

## Summary

A menu action can cross from interface state into gameplay state and back into routing without a single result owner. The concrete construction action may fail its resource payment while the outer interface reports success.

## Plan ledger

**Goal:** describe the gameplay-affecting action loop and preserve gameplay-domain ownership while requiring typed orchestration.

- [x] Trace current command-bearing preset actions.
- [x] Trace construction payment and rejection.
- [x] Confirm composition ignores the nested result.
- [x] Confirm route/result policy is implicit.
- [ ] Add action-to-gameplay transaction fixtures.

## Current loop

```txt
Construction screen
  -> click Storage Shed
  -> construction domain activates action shed
  -> composition invokes construction-runtime.build(storage-shed)
  -> build resolves catalog item
  -> resource-ledger.pay(cost)
  -> build succeeds or rejects
  -> composition discards build result
  -> no next route exists
  -> composition returns accepted=true
```

## Gameplay consequences

```txt
caller cannot distinguish build success from rejection
outer acceptance is not evidence of resource mutation
future command+route actions could transition after command failure
no action command ID prevents duplicate effects
no action revision ties gameplay effect to visible feedback
```

## Ownership rule

```txt
interface authority owns:
  action identity
  admission
  orchestration result
  route policy

gameplay domain owns:
  build semantics
  price and resource checks
  state mutation
  gameplay result
```

## Required composed result

```txt
InterfaceActionResult {
  commandId
  actionId
  routeRevision
  actionSetRevision
  accepted
  nestedResult
  routeResult
  stateRevision
  reason
}
```

## Fixtures

```txt
insufficient resources -> nested rejection returned by composition
successful build -> one resource debit and one built object
duplicate command ID -> no second debit or object
command failure with configured route -> route policy enforced
stale route/action set -> no gameplay command invoked
visible result -> same action result revision as gameplay commit
```

## Non-claim

No construction, resource or routing behavior changed.