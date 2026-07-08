# Market Command Result Loop

**Repository:** `LuminaryLabs-Publish/ZombieOrchard`

**Timestamp:** `2026-07-08T19-21-15-04-00`

## Current gameplay loop

```txt
entry
  -> active-session
  -> collect apples
  -> clear pests
  -> advance phase
  -> open build / market / roster / inventory / codex / settings
  -> exchange screen currently only exposes Back
```

## Current command loop

```txt
html click[data-action]
  -> engine.command("interface-composition", "activate", { actionId })
  -> active interface domain returns action row
  -> interface-composition dispatches optional action.command
  -> nested result is discarded
  -> optional screen transition happens
```

## Market gameplay gap

The Market route exists, but the exchange domain has no gameplay actions beyond Back.

The next gameplay authority should prove:

```txt
sell-apples:
  accepted when apples > 0
  rejected when apples = 0
  accepted mutation changes resources and records transaction
  rejected path proves no mutation

buy-basic-tool:
  accepted when money and capacity pass
  rejected on insufficient funds
  rejected on capacity full
  accepted path appends inventory item and transaction

buy-row-supply:
  accepted when money and capacity pass
  rejected on insufficient funds
  accepted path appends inventory/supply and transaction
```

## Result statuses

```txt
accepted
rejected
no_mutation
```

## Required reason catalog

```txt
market_source_manifest_loaded
market_command_enveloped
market_preflight_passed
market_unknown_command
market_invalid_quantity
market_insufficient_apples
market_insufficient_funds
market_inventory_capacity_full
market_transaction_recorded
market_result_projected
market_nested_result_returned
market_renderer_readback_created
```

## Stop condition

Stop after fixture rows prove Market commands and nested result propagation. Do not add wider economy systems until those rows are stable.
