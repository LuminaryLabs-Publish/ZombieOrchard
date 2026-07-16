# Transaction audit: participant prepare, commit, and rollback contract

**Timestamp:** `2026-07-16T16-40-45-04-00`

## Parent authority

`zombie-orchard-cross-domain-gameplay-transaction-settlement-authority-domain`

## Envelope

```txt
TransactionId
IdempotencyKey
CommandType
CanonicalPayloadDigest
Attempt
IssuedAt
ExpectedRouteRevision
ExpectedParticipantRevisions
RequiredParticipantIds
```

## Settlement phases

1. **Preflight:** validate route, target, funds, inventory, participants, policy, and expected revisions.
2. **Prepare:** derive immutable participant intents without changing state.
3. **Commit:** apply every intent once in a fixed order under one transaction generation.
4. **Recover:** rollback or compensate any incomplete commit and classify ambiguity.
5. **Journal:** persist the terminal result for exact duplicate delivery.
6. **Project:** bind Canvas2D and HTML to the committed transaction revision.

## Participant invariants

- Orchard removal and replacement share one commit.
- Resource grant/debit cannot settle without the associated gameplay effect.
- Pressure, score, reward, and message changes use the same transaction identity.
- Construction payment and built record are inseparable.
- Hiring payment and actor record are inseparable.
- Nested interface activation returns the exact transaction result.

## Rejection rule

A preflight rejection changes no participant. A failed commit must publish a rollback, compensation, or ambiguous-failure result; it must never report generic acceptance.