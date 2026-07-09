# Render Audit: Exchange Render Readback Ledger Parity

**Timestamp:** `2026-07-09T13-10-19-04-00`

## Render surfaces

```txt
world-canvas:
  src/renderer/world-canvas.js
  consumes snapshot["orchard-world"] and snapshot["active-session"]
  renders trees, apples, pests, and player.

html-interface-renderer:
  src/renderer/html-interface-renderer.js
  consumes snapshot["interface-composition"], active-session, resource-ledger, pressure-field, construction-runtime, roster-runtime, inventory-runtime.
  renders active-session HUD or generic screen panel.
```

## Current Exchange behavior

```txt
active-session Market action
  -> action.to = "exchange"
  -> interface-composition moves active to exchange
  -> html-interface-renderer sees active === "exchange"
  -> no Exchange-specific branch exists
  -> generic screen renders title, description, and current.actions
  -> current.actions only includes Back
```

## Readback gap

There is no renderer-readable proof that a Market command was:

```txt
visible
clicked
normalized
preflighted
accepted or rejected
mutated or blocked
journaled
projected
rendered
reported through GameHost
```

## What not to change first

```txt
- Do not redraw the orchard canvas.
- Do not rebuild the HTML renderer.
- Do not replace the generic screen renderer.
- Do not add high-fidelity visuals before Exchange command/result readback exists.
```

## Required Exchange projection

Add an additive projection branch that can render and report:

```txt
market.actions.length
market.lastResult.accepted
market.lastResult.reason
market.lastResult.actionId
market.lastResult.transactionId
market.resourcesBefore
market.resourcesAfter
market.transactionCount
market.rejectedNoMutation
```

## Required render readback

Add a small source-owned readback record after rendering Exchange:

```txt
{
  screen: "exchange",
  visibleActionIds: ["sell-apples", "buy-basic-tool", "buy-row-supply", "back"],
  renderedLastResult: true,
  renderedRejectionReason: true,
  renderedTransactionCount: true,
  frameSource: "html-interface-renderer"
}
```

## Fixture expectation

A DOM-free fixture should prove projection rows without requiring the browser:

```txt
accepted sell apples -> projection accepted + resource delta
accepted buy tool -> projection accepted + inventory intake
rejected insufficient resources -> projection rejected + no mutation
rejected capacity -> projection rejected + no mutation
```
