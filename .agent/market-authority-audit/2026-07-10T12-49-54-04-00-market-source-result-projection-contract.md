# Market authority audit — Source Result Projection Contract

## Timestamp

`2026-07-10T12-49-54-04-00`

## Current authority state

Market authority is not source-owned yet.

`orchard-preset.js` declares:

```txt
exchange: { title: "Market", actions: [{ id: "back", label: "Back", to: "active-session" }] }
```

That is enough for navigation, but not enough for a Market system.

## Authority rows needed next

```txt
marketActionCatalog
  owns stable action ids and labels

marketSourceManifest
  owns source version, rows, and fingerprints

marketPriceSource
  owns price/cost rows

marketCapacityPolicy
  owns capacity and inventory constraints

marketPreflight
  owns accepted/rejected decision rows

marketCommandResult
  owns accepted/rejected/no_mutation result rows

marketResultJournal
  owns durable last-N command results

marketExchangeProjection
  owns Exchange screen data derived from source + result rows

marketRenderReadback
  owns HTML renderer consumption proof

marketGameHostDiagnostics
  owns JSON-safe public readback
```

## Required result shape

```txt
{
  resultId,
  actionId,
  domain: "market",
  accepted,
  reason,
  cost,
  resourceDelta,
  inventoryDelta,
  projectionId,
  frame
}
```

## Required readback shape

```txt
GameHost.market = {
  sourceVersion,
  actions,
  lastResult,
  journal,
  projection,
  renderReadback,
  fixtureStatus
}
```

## Main finding

Market needs an authority contract before content or economy expansion. The contract should stay additive and should not rewrite the existing engine.
