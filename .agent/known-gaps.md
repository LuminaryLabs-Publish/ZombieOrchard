# Known gaps: ZombieOrchard player stamina adoption

**Timestamp:** `2026-07-17T09-43-24-04-00`  
**Status:** `player-stamina-effort-recovery-projection-authority-audited`

## Summary

Stamina is currently a dead public state field. The game has no effort policy, exhaustion behavior, recovery path, visible projection, typed result or executable proof.

## Checklist

**Goal:** keep the capability and proof gaps explicit until stamina is either implemented or removed.

- [x] Record source-backed state, command, tick, phase, pressure and projection gaps.
- [x] Preserve current product boundaries.
- [x] Define required results and fixtures.
- [ ] Close the gaps in runtime code or remove the field.

## Gaps

```txt
StaminaState schema and revision
maximum and threshold policy
effort-cost policy
movement effort settlement
collection effort settlement
clearing effort settlement
failed-attempt cost policy
exhaustion state and action admission
passive recovery
phase-entry recovery
pressure modifier policy
equipment modifier policy
reset and future restore generation
StaminaActionResult
StaminaRecoveryResult
stamina HUD projection
stamina outcome policy
FirstStaminaBoundFrameAck
depletion boundary fixture
exhausted-action fixture
recovery fixture
stale/duplicate action fixture
source/dist/Pages stamina parity
```

## Retained gaps

The browser-host lifecycle audit and all earlier phase, control, transaction, audio, pressure, determinism, persistence, rendering, command, accessibility, kit-graph and gameplay-adoption gaps remain retained unless separately implemented and validated.