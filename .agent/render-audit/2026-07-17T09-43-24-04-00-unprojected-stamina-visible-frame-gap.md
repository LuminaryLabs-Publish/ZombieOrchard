# Render audit: unprojected stamina visible-frame gap

**Timestamp:** `2026-07-17T09-43-24-04-00`

## Summary

The active-session snapshot includes `player.stamina`, but the HTML HUD renders day, phase, money, apples, wood, pressure and condition only. The outcome summary renders score and day only. Canvas2D has no exhaustion or recovery presentation.

## Visible-frame gap

```txt
player stamina state exists
  -> no stamina projection descriptor
  -> no HUD value or meter
  -> no exhaustion state
  -> no recovery feedback
  -> no frame acknowledgement
```

Even after stamina becomes behavioral, the player cannot reason about action availability unless the accepted value and exhaustion state reach a visible frame.

## Required projection contract

```txt
StaminaProjectionCommitCommand
  -> bind run, player, stamina and interface revisions
  -> project current/max stamina
  -> project ready, exhausted or recovering state
  -> preserve condition as a separate health concept
  -> publish StaminaProjectionResult
  -> publish FirstStaminaBoundFrameAck
```

## Required fixtures

- initial 100/max state appears in the active HUD;
- an accepted effort mutation updates the next matching frame;
- exhaustion state appears when the threshold is crossed;
- recovery clears exhaustion only after the accepted recovery threshold;
- outcome projection follows the chosen design policy;
- source, built artifact and Pages origin produce equivalent values.

## Validation boundary

Documentation only. No HUD, Canvas2D, CSS, outcome or rendering behavior changed.