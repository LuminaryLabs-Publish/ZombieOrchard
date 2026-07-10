# Market authority audit: Command and transaction causality contract

Timestamp: `2026-07-10T15-48-18-04-00`

## Authority split

The Market implementation should preserve clear ownership:

```txt
orchard preset or Market source kit
  owns catalog ids, labels, prices, item descriptors, and capacity policy inputs

exchange-domain-kit
  owns Market screen projection and selected action state

interface-composition-kit
  owns parent activation, child dispatch, transition policy, and retained child result

market command boundary
  owns command envelope, preflight, accepted/rejected result, and correlation ids

resource-ledger-kit
  owns affordability and resource transaction rows

inventory-runtime-kit
  owns capacity and inventory intake rows

HTML renderer
  owns projection consumption and render readback

GameHost diagnostics
  owns bounded JSON-safe observation only
```

## Minimum source row

```txt
sourceId
revision
itemId
actionId
operation
price
resourceKey
inventoryItem
capacityCost
enabled
```

## Minimum command envelope

```txt
commandId
activationId
sourceId
domain
type
payload
frame
elapsed
```

## Minimum result row

```txt
resultId
commandId
accepted
reason
mutation
resourceTransactionId
inventoryIntakeId
before
beforeHash
after
afterHash
```

## Stable rejection reasons

```txt
unknown_action
source_disabled
stale_source
insufficient_funds
inventory_capacity
missing_resource_domain
missing_inventory_domain
duplicate_command
invalid_payload
```

## Journal behavior

- Keep a bounded ring buffer rather than unbounded history.
- Preserve request and result ordering.
- Keep rejected and no-mutation rows.
- Make snapshots JSON-safe.
- Do not expose mutable internal objects through readback.
- Define duplicate command behavior before replay fixtures.

## Authority conclusion

Market state should not be inferred from the latest aggregate resources and inventory. It should be explained by source, command, transaction, intake, projection, and render rows joined through stable IDs.