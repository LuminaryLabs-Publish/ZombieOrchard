# Gameplay audit: duplicate-host simulation loop

**Timestamp:** `2026-07-17T04-41-15-04-00`

## Interaction loop

```txt
host generation A
  -> tick pressure and active session
  -> render
  -> schedule next frame

host generation B against the same page
  -> create a second independent engine
  -> install another delegated listener
  -> tick and render independently
  -> overwrite window.GameHost
```

The current source does not normally create generation B. It also has no lease or retirement authority that would prevent this pattern if boot is re-executed or recovery creates a replacement host.

## Gameplay risk

Without exclusive host ownership, two loops can advance unrelated game states while competing for one canvas and one HTML root. The visible state, public `GameHost`, click target, and simulation owner can diverge.

```txt
single gameplay owner: assumed, not proven
predecessor simulation retirement: absent
stale command rejection by HostSessionId: absent
replacement state-transfer policy: absent
terminal host lifecycle result: absent
```

## Required policy

A replacement host must either:

1. reject while a healthy predecessor owns the document root; or
2. retire the predecessor completely before the new generation can tick, accept commands, or render.

No gameplay value or domain behavior should change as part of the lifecycle wrapper.