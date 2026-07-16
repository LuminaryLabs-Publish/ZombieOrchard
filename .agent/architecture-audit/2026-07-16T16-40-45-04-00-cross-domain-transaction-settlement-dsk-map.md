# Architecture audit: cross-domain gameplay transaction settlement DSK map

**Timestamp:** `2026-07-16T16-40-45-04-00`

## Current ownership

```txt
interface-composition
  -> resolves action
  -> invokes optional nested command
  -> discards nested result

active-session
  -> collection, clearing, phase, score, message and failure

orchard-world
  -> apple removal and replacement generation

resource-ledger
  -> payment and grants

pressure-field
  -> pressure adjustment

construction-runtime / roster-runtime
  -> payment followed by acquired-record mutation
```

## Gap

No domain owns the full command across all participants. Mutation order is observable, but there is no transaction generation, prepare phase, atomic commit, rollback, compensation, idempotency journal, or exact composite result.

## Required parent

`zombie-orchard-cross-domain-gameplay-transaction-settlement-authority-domain`

## DSK boundary

```txt
GameplayTransactionCommand
  -> transaction envelope
  -> participant revision preconditions
  -> preflight
  -> prepared participant intents
  -> atomic commit or explicit rollback/compensation
  -> stored terminal result
  -> nested result propagation
  -> GameplayTransactionResult
  -> FirstTransactionBoundFrameAck
```

## Participant adapters

- orchard collection and replacement
- resource debit/grant
- pressure adjustment
- session score/message
- pest damage/removal/reward
- construction purchase
- roster hire
- inventory equipment

## Rule

Individual domains retain their own state. The transaction authority coordinates revisions and settlement; it does not absorb world, economy, pressure, session, construction, roster, or inventory truth.