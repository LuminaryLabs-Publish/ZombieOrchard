# Render audit: unbounded pest array visible-frame budget gap

**Timestamp:** `2026-07-12T20-31-27-04-00`

## Finding

`world-canvas.js` loops over every `session.pests` entry and draws a rectangle for each. The canvas receives no pest population revision, quality profile, render cap, culling result, draw budget, or visible-frame acknowledgement.

The boot loop also renders the world regardless of active interface route. After terminal failure, the pest array remains part of the snapshot and continues to be drawn while Outcome is visible.

## Risks

- draw work scales linearly with active population;
- snapshot cloning and canvas drawing can grow together;
- no proof links a visible frame to an admitted population revision;
- no degradation policy exists when population exceeds a render budget.

## Required result

`PestRenderPlanResult` must identify population revision, admitted visible IDs, culled IDs, draw count, budget status and frame generation.
