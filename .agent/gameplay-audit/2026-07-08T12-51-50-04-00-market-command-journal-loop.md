# ZombieOrchard Market Command Journal Loop

**Timestamp:** `2026-07-08T12-51-50-04-00`

## Current player loop

```txt
Entry
-> Play
-> Active Session
-> collect apples
-> clear pests
-> next phase
-> open Market
-> exchange screen
-> Back only
```

## Current command gap

`engine.command()` already returns command results, but Market cannot yet be tested as a gameplay loop because the exchange screen has no source-owned sell/buy actions and interface-composition drops nested command results after dispatch.

## Required gameplay authority loop

```txt
active-session action: Market
-> interface-composition.transition to exchange
-> exchange action: sell-apples | buy-basic-tool | buy-row-supply | back
-> MarketCommandEnvelope
-> MarketSourceSnapshot
-> MarketPreflight
-> MarketCommandResult
-> mutation only if accepted
-> TransactionRecord if accepted
-> MarketCommandJournal row always
-> MarketResultProjection
-> nested result returned through interface-composition
-> fixture compares before/after snapshots
```

## Accepted command rows

```txt
sell-apples accepted:
  requires apples > 0
  decreases apples by quantity
  increases money by deterministic price * quantity
  appends sell TransactionRecord
  appends accepted MarketCommandJournal row

buy-basic-tool accepted:
  requires money >= price
  requires inventory capacity
  decreases money
  adds purchased item through purchase intake
  appends buy TransactionRecord
  appends accepted MarketCommandJournal row

buy-row-supply accepted:
  requires money >= price
  requires inventory capacity or resource capacity depending implementation
  decreases money
  adds supply item or resource
  appends buy TransactionRecord
  appends accepted MarketCommandJournal row
```

## Rejected command rows

```txt
sell-apples rejected:
  reason: insufficient-apples
  no resource mutation
  no inventory mutation
  rejected MarketCommandJournal row

buy rejected:
  reason: insufficient-funds | capacity-full
  no resource mutation
  no inventory mutation
  rejected MarketCommandJournal row

unknown command rejected:
  reason: unknown-market-command
  no mutation
  rejected MarketCommandJournal row

invalid quantity rejected:
  reason: invalid-quantity
  no mutation
  rejected MarketCommandJournal row
```

## Fixture order

```txt
1. createOrchardGame()
2. assert entry active
3. activate Play
4. assert active-session active
5. activate Market
6. assert exchange active
7. assert exchange exposes sell/buy/back actions
8. run accepted sell after adding apples or moving to apple collection state
9. run rejected sell with zero apples
10. run accepted buy with sufficient money
11. run rejected buy with insufficient money
12. assert MarketCommandJournal rows
13. assert resource/inventory before/after mutation policy
14. assert interface-composition.lastResult
15. assert projection and render readback shape
```

## Non-goals

```txt
- Do not change pest AI.
- Do not add save slots.
- Do not expand roster behavior.
- Do not replace the active-session HUD.
- Do not move Market economics into html-interface-renderer.
```
