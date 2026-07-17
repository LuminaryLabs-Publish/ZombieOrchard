# Interface-control audit: stable node, focus and press contract

**Timestamp:** `2026-07-16T22-40-53-04-00`  
**Parent domain:** `zombie-orchard-interactive-dom-control-stability-focus-authority-domain`

## Contract

1. Every action receives a stable semantic `ControlId`.
2. Every route/action manifest receives a monotonic `ControlGeneration`.
3. Rendering updates attributes and text in place when identity is unchanged.
4. Pointerdown creates a lease bound to pointer, control and generation.
5. Enter and Space create one keyboard activation attempt bound to focused control.
6. A removed or replaced control settles its lease as retired, cancelled or transferred by explicit policy.
7. Duplicate browser events replay the stored terminal activation result.
8. Focus restoration occurs only to an eligible control in the accepted route generation.
9. The first matching HTML frame publishes `FirstStableControlFrameAck`.

## Rejection classes

```txt
stale-route
stale-control-generation
control-removed
control-disabled
pointer-mismatch
focus-mismatch
duplicate-activation
route-retired
renderer-disposed
```

## Non-goal

This authority does not own gameplay effects. It guarantees that one browser gesture dispatches one exact domain command from one visible control generation.
