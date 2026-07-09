# Gameplay Audit: Market Command Fixture Loop

**Timestamp:** `2026-07-09T05-01-51-04-00`

## Current gameplay loop

```txt
entry screen
  -> play
  -> active-session
  -> move / collect / clear / next-phase commands
  -> build / market / roster / inventory / codex actions
  -> day/night pressure and pest tick
  -> outcome when player condition reaches zero
```

## Current Market gameplay state

The Market/Exchange screen exists as an interface domain, but it only has `back` in the preset.

There is no source-owned Market action catalog yet.

## Required Market gameplay rows

```txt
sell-apples accepted:
  before apples > 0
  after apples decreases
  money increases
  transaction row created
  result accepted

sell-apples rejected:
  before apples = 0
  after resources unchanged
  result rejected / reason no-apples

buy-basic-tool accepted:
  before enough money
  after money decreases
  inventory intake row created
  result accepted

buy-basic-tool rejected:
  before insufficient money
  after resources and inventory unchanged
  result rejected / reason insufficient-money

buy-row-supply accepted:
  before enough money and capacity available
  after money decreases
  inventory or resource row increases
  result accepted

unknown-market-command rejected:
  no mutation
  stable reason unknown-market-command
```

## Fixture loop target

```txt
createOrchardGame()
  -> force or route to exchange
  -> run MarketCommandEnvelope rows
  -> capture before source snapshots
  -> apply Market command path
  -> capture after source snapshots
  -> assert result status and reason
  -> assert transaction or no-mutation
  -> assert interface-composition lastResult when routed through activate
  -> assert MarketResultProjection
  -> assert MarketRenderReadback without DOM when possible
  -> assert GameHost diagnostic shape through pure helper
```

## Main finding

The first useful gameplay upgrade is not a larger economy loop.

The first useful gameplay upgrade is making one Market vertical slice accepted/rejected/replayable so future economy features have a stable command/result contract.
