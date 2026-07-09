# ZombieOrchard Exchange Projection Readback Gap

**Timestamp:** `2026-07-09T18-49-13-04-00`

## Current render surface

`src/renderer/html-interface-renderer.js` renders two paths:

```txt
active-session HUD
otherwise generic screen panel
```

The generic panel reads `current.title`, `current.description`, `current.actions`, and optional extra cards for session-select, construction, roster, inventory, and outcome.

## Exchange gap

`exchange` currently falls through to the generic panel.

`src/presets/orchard-preset.js` defines Exchange as:

```txt
exchange: { title: "Market", actions: [{ id: "back", label: "Back", to: "active-session" }] }
```

Missing render/readback rows:

```txt
visible market action count
visible action ids
last accepted/rejected Market result
last rejection reason
resource transaction count
inventory intake count
rendered price/capacity rows
GameHost market diagnostics parity
```

## Next render-safe change

Do not replace the renderer first.

Add an Exchange-specific projection and readback branch after source-owned Market result rows exist.
