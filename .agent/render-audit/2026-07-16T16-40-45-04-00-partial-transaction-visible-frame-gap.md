# Render audit: partial transaction visible-frame gap

**Timestamp:** `2026-07-16T16-40-45-04-00`

## Finding

Canvas2D and HTML render a snapshot after command dispatch and again after RAF ticking, but neither surface receives a transaction revision or settlement receipt. If a cross-domain action partially mutates, the next frame can display a removed apple, changed score, unchanged resources, changed pressure, or a generic accepted interface result without identifying that the participants did not settle together.

## Current projection

```txt
command mutation
  -> runtime notify snapshot
  -> next RAF tick
  -> Canvas2D world render
  -> HTML HUD/screen render
```

## Missing evidence

```txt
TransactionRevision
GameplayTransactionResult
participant commit receipts
rollback/compensation receipt
HTML transaction revision
Canvas transaction revision
FirstTransactionBoundFrameAck
source/dist/Pages transaction-frame parity
```

## Required frame rule

A world or interface frame may acknowledge a multi-domain action only after the transaction authority publishes one terminal committed, rejected, duplicate, rolled-back, compensated, or failed result. Canvas2D and HTML must bind the same terminal transaction revision.