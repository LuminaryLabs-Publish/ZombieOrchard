# Market Authority Audit: Source Result Fixture Contract

**Timestamp:** `2026-07-09T13-10-19-04-00`

## Current authority state

Market authority is not implemented yet.

The repo has:

```txt
exchange interface domain
  -> title: Market
  -> actions: Back only

resource-ledger
  -> canPay/pay/add

inventory-runtime
  -> equip only

interface-composition
  -> can dispatch nested commands
  -> does not retain nested command result
```

## Required Market authority contract

The next source slice needs source-owned rows for:

```txt
action catalog
command manifest
price source
capacity policy
command envelope
source snapshot before
preflight result
command result
accepted mutation
rejected no-mutation
source snapshot after
command journal
result journal
transaction history
inventory intake
```

## Stable action IDs

```txt
sell-apples
buy-basic-tool
buy-row-supply
back
```

## Stable rejection reasons

```txt
insufficient-resource
insufficient-inventory
capacity-full
unknown-market-action
invalid-command-envelope
```

## Result shape

```txt
{
  id,
  actionId,
  accepted,
  reason,
  before,
  after,
  resourceDelta,
  inventoryDelta,
  transaction,
  noMutationProof,
  frame
}
```

## No-mutation proof

Every rejected result should assert:

```txt
before.resources === after.resources
before.inventory === after.inventory
transaction === null
accepted === false
```

## Integration order

1. Add pure Market source/result files.
2. Add DOM-free Market fixture rows.
3. Add Exchange action rows from Market source.
4. Add nested result retention in `interface-composition`.
5. Add Exchange projection and readback in HTML renderer.
6. Add additive GameHost diagnostics.
7. Wire fixture to `npm test` or a dedicated package script.

## Defer

```txt
save/load
worker automation
new crops
new market categories
visual rewrite
shared kit extraction
```
