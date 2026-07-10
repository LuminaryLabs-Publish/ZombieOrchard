# Render audit — Exchange Market render result readback gap

Timestamp: `2026-07-10T07-08-10-04-00`

## Render surface

`ZombieOrchard` has two render surfaces:

```txt
world canvas renderer -> orchard/world state
HTML interface renderer -> active-session HUD and generic interface screens
```

## Current Exchange state

Exchange exists as a domain/interface concept, but the live interface projection is still generic. It does not render a Market transaction table, accepted/rejected result rows, resource deltas, purchase intake, or stable command IDs.

## Current readback state

```txt
window.GameHost.engine -> raw engine object
window.GameHost.getState() -> raw snapshot
window.GameHost.tick(dt) -> manual tick
```

This surface is enough for basic smoke checks, but it is not enough to prove that Market actions were sourced, rendered, accepted/rejected, or retained after nested dispatch.

## Render gaps

```txt
No Exchange-specific Market projection branch.
No Market result row in HTML renderer output.
No accepted/rejected command status copy.
No stable reason-code display/readback.
No price, capacity, resource delta, or inventory intake rows.
No render-consumption ledger connecting Market source rows to UI rows.
No GameHost.market readback block.
```

## Do not do next

```txt
Do not replace the canvas renderer.
Do not redesign orchard visuals.
Do not expand Market economy values before result rows exist.
Do not add visual polish before Exchange projection/readback is fixture-safe.
```

## Next render-safe ledge

```txt
Market source row -> command result -> Exchange render model -> HTML projection -> GameHost.market readback -> fixture assertion
```
