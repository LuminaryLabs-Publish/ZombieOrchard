# Deploy audit: stamina source, build and Pages fixture gate

**Timestamp:** `2026-07-17T09-43-24-04-00`

## Current proof

The smoke fixture checks entry state, Play routing and orchard apple presence. It does not execute stamina depletion, exhaustion, recovery, HUD projection or deployed-origin behavior.

## Required gate

```txt
source runtime
  -> run deterministic action/depletion fixture
  -> verify StaminaActionResult
  -> verify recovery result
  -> verify FirstStaminaBoundFrameAck

built artifact
  -> repeat the same fixture against dist

GitHub Pages
  -> repeat the browser-visible fixture at deployed origin

all origins
  -> compare policy revision, stamina sequence and visible value
```

## Required cases

- initial current/max state;
- accepted movement depletion;
- collection and clearing cost policy;
- exact exhaustion threshold;
- rejected or degraded exhausted action;
- passive and phase recovery;
- pressure modifier policy if enabled;
- reset generation;
- stale and duplicate action rejection;
- matching HUD frame;
- source/dist/Pages parity.

## Gate status

```txt
runtime authority: absent
headless fixtures: absent
browser fixtures: absent
built artifact smoke: not run
Pages smoke: not run
production gate: open
```

## Validation boundary

Documentation only. Workflow, package scripts, build output and Pages configuration remain unchanged.