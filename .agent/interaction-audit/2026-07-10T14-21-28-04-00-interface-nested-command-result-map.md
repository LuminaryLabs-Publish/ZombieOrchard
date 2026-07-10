# Interaction audit: interface nested command result map

Timestamp: 2026-07-10T14-21-28-04-00

## Interaction surface

The browser routes actions through:

```txt
html-interface-renderer click
  -> engine.command("interface-composition", "activate", { actionId })
  -> active domain command("activate") returns action
  -> optional action.command dispatches nested engine.command(...)
  -> optional action.to transitions screen
```

## Exact gap

`interface-composition.activate` currently dispatches nested commands but discards the nested result. The parent result becomes only transition success or `{ accepted: true }`.

## Required result map

The next result map should keep:

- parent active domain;
- action id and label;
- nested command domain/type/payload;
- nested result accepted flag;
- nested rejection reason;
- transition target;
- resource/inventory deltas;
- render projection target;
- GameHost readback row.

## Fixture target

Prove retained nested results for accepted and rejected Market commands without DOM clicks, then expose the rows through `GameHost.market`.
