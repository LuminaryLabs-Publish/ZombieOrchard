# Render audit: Single-publication and first-frame proof gap

## Summary

The renderers consume aggregate snapshots after command-side publication, but snapshots carry no command, transaction, session, tick, or fingerprint identity. A nested child command can publish an intermediate state before the parent command completes, and neither renderer can prove which committed transaction produced a visible frame.

## Plan ledger

**Goal:** define the minimum render proof needed to show that one committed parent and child transaction produced one coherent visible state.

- [x] Trace command-side subscriber publication.
- [x] Trace aggregate snapshot creation.
- [x] Trace canvas and HTML consumers.
- [x] Identify intermediate-state exposure.
- [x] Identify missing first-frame acknowledgement.
- [x] Define a detached render receipt.
- [ ] Implement render correlation.
- [ ] Add browser proof.

## Current render path

```txt
child public command
  -> child mutation
  -> runtime notify()
  -> aggregate snapshot A
  -> subscribers may observe partial parent state

parent command resumes
  -> optional route mutation
  -> parent returns
  -> runtime notify()
  -> aggregate snapshot B

next RAF
  -> engine.tick(1 / 60)
  -> aggregate snapshot C
  -> world-canvas-render-kit.render(C)
  -> html-interface-render-kit.render(C)
```

## Gaps

```txt
snapshot has no commandId
snapshot has no transactionId
snapshot has no sessionId or sessionEpoch
snapshot has no committedTickId
snapshot has no state fingerprint
renderers expose no consumed fingerprint
renderers expose no firstRenderedFrameId
HTML is replaced every frame without a commit receipt
GameHost cannot distinguish intermediate from committed state
```

## Required render observation

```txt
renderFrameId
rendererId
runtimeId
sessionId
sessionEpoch
committedTickId
commandId
transactionId
stateFingerprint
canvasCommitted
htmlCommitted
presentedAt
```

## Required policy

1. Child execution inside a composite transaction must not notify subscribers.
2. Parent acceptance, rejection, or rollback must produce one committed snapshot.
3. Canvas and HTML renderers must consume the same fingerprint.
4. The first frame consuming that fingerprint must publish one detached acknowledgement.
5. A later frame may repeat the state, but cannot claim a new transaction commit.
6. GameHost must expose copied observations rather than live renderer or engine references.

## Fixture gate

```txt
accepted shed build
  -> one publication
  -> one committed fingerprint
  -> canvas and HTML consume the same fingerprint
  -> one first-frame acknowledgement

rejected shed build
  -> one publication
  -> unchanged gameplay fingerprint
  -> rejection result remains observable
  -> no partial debit/build frame

rollback case
  -> one publication
  -> restored before fingerprint
  -> no transient built object reaches either renderer
```
