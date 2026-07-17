# Next steps: ZombieOrchard interactive control stability

**Timestamp:** `2026-07-16T22-40-53-04-00`  
**Status:** `interactive-dom-control-stability-focus-authority-audited`

## Summary

The next implementation slice is a keyed HTML renderer that preserves control identity and focus, binds pointer and keyboard gestures to one control generation, and settles activation or retirement exactly once.

## Plan ledger

**Goal:** stop frame projection from silently invalidating in-progress UI interaction.

- [ ] Emit a stable `ControlId` and `ControlGeneration` for every visible action.
- [ ] Replace unconditional `innerHTML` assignment with keyed DOM reconciliation.
- [ ] Preserve the active control and restore focus only when policy allows.
- [ ] Bind pointerdown and keyboard activation to one control generation.
- [ ] Retire removed or route-replaced controls with an explicit result.
- [ ] Deduplicate click, Enter, and Space activation.
- [ ] Publish `InterfaceControlResult` and `FirstStableControlFrameAck`.
- [ ] Add real-browser pointer-hold, keyboard-focus, route-transition, dist, and Pages fixtures.

## Ordering

```txt
control manifest
  -> route and render generation
  -> keyed DOM reconciliation
  -> focus and pointer lease admission
  -> exact activation or retirement
  -> interface control result
  -> stable-control frame acknowledgement
  -> source/dist/Pages parity
```

Do not solve this by pausing the entire simulation while a control is focused. Preserve stable control identity while domain truth continues to tick.
