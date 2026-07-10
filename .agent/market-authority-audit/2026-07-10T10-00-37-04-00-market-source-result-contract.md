# Market authority audit — Source/result contract

## Authority status

Market is not ready for economy expansion. It needs source/result authority first.

## Source rows needed

```txt
market_action_id
market_action_label
market_action_command
market_price_source
market_capacity_source
market_inventory_target
market_resource_target
market_screen_source
```

## Result rows needed

```txt
market_preflight_checked
market_command_dispatched
market_command_result_retained
market_resource_delta_recorded
market_inventory_delta_recorded
market_projection_built
market_render_readback_emitted
market_gamehost_diagnostic_emitted
```

## Contract

A Market action is complete only when all of these are true:

1. The action has a stable source row.
2. The preflight explains acceptance or rejection.
3. The nested command result is retained.
4. The result records resource/inventory deltas or no mutation.
5. The Exchange projection reads from the retained result.
6. `GameHost` exposes JSON-safe Market diagnostics.
7. A DOM-free fixture proves accepted and rejected paths.

## Current blocker

`engine.command()` returns useful command results, but `interface-composition` drops nested command results before projection/readback. Fixing that seam is the narrowest next cut.
