# Render audit — Exchange Market render/readback gap

## Render surface

`ZombieOrchard` has two browser render surfaces:

```txt
world canvas renderer
HTML interface renderer
```

## Current render path

```txt
requestAnimationFrame(draw)
  -> engine.tick(1 / 60)
  -> engine.snapshot()
  -> world canvas paints orchard state
  -> HTML renderer paints active-session HUD or generic screen
  -> Exchange/Market screen renders generic interface content
```

## Finding

The HTML renderer is not the next blocker by itself. It can render generic interface screens, but it has no Market-specific projection branch and no readback rows proving which Market actions, prices, capacity states, command outcomes, or resource deltas were shown.

## Missing readback rows

```txt
market_screen_opened
market_action_listed
market_action_disabled_reason
market_preflight_price
market_preflight_capacity
market_command_accepted
market_command_rejected
market_resource_delta_rendered
market_inventory_delta_rendered
market_back_only_fallback
```

## Do not start with

- visual polish
- renderer rewrite
- canvas rewrite
- economy expansion
- new Market art

## Next render proof

Wire retained Market command results into a renderer-safe projection and expose a normalized readback object through `GameHost` and a DOM-free fixture before changing visuals.
