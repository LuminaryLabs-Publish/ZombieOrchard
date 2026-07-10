# ZombieOrchard Render Audit — Exchange Market Projection Readback Gap

**Timestamp:** `2026-07-10T08-28-26-04-00`

## Render surfaces

`ZombieOrchard` has two visual surfaces:

```txt
world canvas renderer
  -> trees
  -> apples
  -> pests
  -> player

HTML interface renderer
  -> active-session HUD
  -> generic interface screens
  -> cards for session-select / construction / roster / inventory / outcome
  -> actions from current interface domain
```

## Current render loop

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
```

## Current Market/Exchange projection

`orchard-preset.js` defines:

```txt
exchange: { title: "Market", actions: [{ id: "back", label: "Back", to: "active-session" }] }
```

`html-interface-renderer.js` does not have an Exchange/Market-specific branch.

It renders `exchange` through the generic screen path:

```txt
<section class="screen">
  <div class="panel">
    <h1>Market</h1>
    <p></p>
    <div class="actions">Back</div>
  </div>
</section>
```

## Render gap

No render/readback rows exist for:

```txt
Market action catalog
Market prices
resource affordability
capacity status
accepted/rejected transaction result
resource before/after
inventory intake
nested command result
Market reason code
Exchange projection state
GameHost.market diagnostics
```

## Needed render services

```txt
market-projection-kit
exchange-market-screen-kit
market-result-row-render-kit
market-render-readback-kit
market-gamehost-render-proof-kit
```

## Recommendation

Do not redesign the orchard visuals next.

Add Exchange-specific Market projection rows and readback first, while keeping the existing HTML renderer entrypoint and world canvas renderer stable.
