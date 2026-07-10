# Market Authority Audit — Result Retention Contract

## Timestamp

```txt
2026-07-10T11-20-54-04-00
```

## Current authority

Market authority is not yet source-owned.

Existing authority is split across:

```txt
scoped-interface-domains.js generic exchange action surface
composition.js nested action dispatch
resource-ledger pay/add API
game-domains runtime command results
html-interface-renderer generic Exchange rendering
start.js raw GameHost surface
```

## Contract needed next

```txt
marketActionCatalog stable ids
marketSourceManifest stable rows
marketCommandEnvelope serializable command rows
marketPreflight accepted/rejected rows
marketNestedResult retained command result
marketResourceTransaction resource deltas
marketInventoryIntake item deltas
marketExchangeProjection visible result state
marketRenderReadback renderer-consumed rows
marketGameHostDiagnostics JSON-safe diagnostics
marketFixtureReplay accepted/rejected fixture rows
```

## Acceptance gate

Do not expand the economy or change visuals until fixture rows prove:

```txt
accepted Market action retains nested command result
rejected Market action retains stable reason
resource transaction links to result id
inventory intake links to result id
Exchange projection consumes retained result
HTML renderer exposes Market readback
GameHost.market is JSON-safe
```
