# Interaction audit: gameplay transaction command/result map

**Timestamp:** `2026-07-16T16-40-45-04-00`

## Current map

| Action | Current command path | Current result gap |
|---|---|---|
| Collect | HTML -> active-session.collect -> orchard/resources/pressure/session | no composite participant result |
| Clear | HTML -> active-session.clear -> pest/session/resources | no reward/removal atomicity |
| Build | HTML -> interface-composition.activate -> construction-runtime.build -> ledger/construction | nested result discarded |
| Hire | runtime command -> roster-runtime.hire -> ledger/roster | caller-controlled operation lacks transaction receipt |
| Equip | runtime command -> inventory-runtime.equip | no item/revision precondition |

## Required results

```txt
GameplayTransactionCommitted
GameplayTransactionRejectedPreflight
GameplayTransactionRejectedStale
GameplayTransactionRejectedMissingParticipant
GameplayTransactionDuplicateReturned
GameplayTransactionRolledBack
GameplayTransactionCompensated
GameplayTransactionFailedAmbiguous
NestedCommandResultPropagated
FirstTransactionBoundFrameAcknowledged
```

## Command rule

The delegated HTML adapter may request an action, but it must not infer success. Interface composition must return the exact terminal result from the nested transaction authority.