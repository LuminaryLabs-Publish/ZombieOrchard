# Render audit — Affordance and command-binding gap

Timestamp: `2026-07-10T20-30-23-04-00`

## Current render surfaces

```txt
world-canvas.js
  -> trees
  -> apples
  -> pests
  -> player

html-interface-renderer.js
  -> active-session stat strip
  -> hard-coded Collect/Clear/Next Phase controls
  -> preset action buttons
  -> generic cards for slots, built objects, roster, inventory, outcome
```

## Finding

The HTML renderer projects state but does not project the full command surface implemented by the kits.

```txt
rendered state card
  does not imply
interactive service affordance
```

Roster actors and inventory items are rendered as static cards. No control emits `hire` or `equip`. Run Setup and Preferences have generic field state in their domain model, but the renderer emits no field controls. Session Select card support exists, but the route is unreachable and no slot commands exist.

## Active-session gap

The renderer hard-codes only:

```txt
collect
clear
next-phase
```

It does not bind `move`. There is no keyboard listener, directional control, pointer navigation, gamepad adapter, or accessible fallback. The world canvas renders player position changes that a human browser user cannot request.

## Disabled-state gap

Action descriptors preserve `disabled`, but `button(action)` does not emit the HTML `disabled` attribute. A disabled action therefore appears active and remains clickable until the domain rejects it.

## Render-consumption proof gap

Neither renderer records:

```txt
capabilityId
affordanceId
bindingId
commandId
resultId
consumed simulation tick
consumed state fingerprint
```

The host cannot prove that a public capability was displayed, enabled, invoked, or reflected in the next frame.

## Required renderer updates

1. Bind movement through a lifecycle-owned browser input adapter.
2. Provide an accessible on-screen movement fallback.
3. Render controls from capability/action descriptors rather than a hidden hard-coded subset.
4. Emit actual disabled controls for disabled actions.
5. Render field controls only for declared public fields.
6. Add interactive roster and inventory affordances only when their capabilities are public.
7. Project explicit unsupported/dormant copy for shell-only screens.
8. Record bounded affordance and render-consumption rows for diagnostics.
9. Return a disposer for every listener or input adapter installed by the renderer.

## Required fixture rows

```txt
route active-session
  -> movement affordance visible
  -> movement binding installed
  -> command accepted while running
  -> player position changed
  -> canvas consumed resulting position

route interrupt
  -> movement binding rejected or inactive
  -> player position unchanged

route roster
  -> hire capability either rendered and operational
     or explicitly classified non-public

route inventory
  -> equip capability either rendered and operational
     or explicitly classified non-public
```

## Non-goals

This gate does not require visual polish, a renderer rewrite, new art, or post-processing. It requires the existing render surfaces to truthfully expose and prove the intended command surface.