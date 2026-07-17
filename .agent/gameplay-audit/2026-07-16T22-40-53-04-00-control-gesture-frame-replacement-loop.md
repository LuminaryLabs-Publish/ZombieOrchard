# Gameplay audit: control gesture frame-replacement loop

**Timestamp:** `2026-07-16T22-40-53-04-00`

## Interaction loop

```txt
page load
  -> engine, Canvas2D renderer and HTML renderer
  -> root click delegation installed once

every frame
  -> engine.tick(1/60)
  -> world.render(snapshot)
  -> ui.render(snapshot)
  -> all interface controls replaced
  -> next RAF scheduled

player gesture
  -> pointerdown, Tab focus, Enter or Space begins on one node
  -> one or more frames replace that node
  -> activation may be lost, retargeted or unprovable
  -> engine command occurs only if the surviving delegated click resolves data attributes
```

## Gameplay impact boundary

The affected controls include Play, New Game, Settings, Start, Back, Pause, Resume, Title, Collect, Clear, Next Phase, construction, roster, inventory, market, codex and outcome actions.

No failed player gesture was reproduced. The gap is the absence of stable interaction ownership and browser proof.
