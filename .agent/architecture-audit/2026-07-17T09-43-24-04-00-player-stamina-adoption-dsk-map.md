# Architecture audit: player stamina effort and recovery DSK map

**Timestamp:** `2026-07-17T09-43-24-04-00`  
**Status:** `player-stamina-effort-recovery-projection-authority-audited`

## Current ownership

```txt
active-session-domain-kit
  owns player.stamina field
  owns move, collect, clear and next-phase commands
  owns night pest simulation and condition damage

pressure-field-kit
  owns rowPressure and curse
  has no stamina policy

html-interface-render-kit
  projects condition and other HUD values
  omits stamina

world-canvas-render-kit
  projects player position and pests
  has no exhaustion projection
```

The field is therefore owned structurally but not behaviorally. No domain decides action cost, exhaustion, recovery, pressure coupling, result publication or presentation convergence.

## Required parent domain

`zombie-orchard-player-stamina-effort-recovery-projection-authority-domain`

## DSK boundary

| Surface | Responsibility |
|---|---|
| `stamina-state-schema-kit` | define current, maximum, exhaustion threshold and revision |
| `effort-cost-policy-kit` | resolve deterministic costs by action and equipment |
| `action-effort-admission-kit` | accept, degrade or reject actions from current stamina evidence |
| `movement-effort-adapter-kit` | settle movement cost with accepted displacement |
| `collection-effort-adapter-kit` | settle collection cost only when an apple is actually collected |
| `clearing-effort-adapter-kit` | settle attack cost only for an admitted clear attempt |
| `phase-recovery-policy-kit` | define day/night settlement recovery rules |
| `passive-recovery-tick-kit` | apply bounded recovery through accepted simulation time |
| `exhaustion-state-kit` | derive exhausted/recovering/ready states |
| `pressure-stamina-coupling-kit` | optionally modify cost or recovery from row pressure and curse |
| `stamina-command-result-kit` | publish typed action and recovery results |
| `stamina-hud-projection-kit` | expose visible current/max stamina and exhaustion state |
| `stamina-outcome-projection-kit` | expose relevant final effort evidence |
| `first-stamina-bound-frame-ack-kit` | prove accepted state reached the visible interface generation |

## Command and result flow

```txt
Move / Collect / Clear evidence
  -> StaminaActionAdmissionCommand
  -> ActionEffortAdmissionResult
  -> accepted gameplay mutation
  -> exact stamina settlement
  -> StaminaActionResult
  -> HUD projection
  -> FirstStaminaBoundFrameAck

accepted tick / phase settlement
  -> StaminaRecoveryCommand
  -> bounded recovery
  -> StaminaRecoveryResult
  -> HUD projection
```

## Constraints

- Do not create a parallel player domain.
- Keep `active-session-domain-kit` as gameplay owner.
- Charge only accepted work; rejected collection or clear commands must not silently consume effort unless the policy explicitly says attempts cost stamina.
- Make exhaustion semantics explicit rather than relying on a numeric threshold spread across commands.
- Ensure recovery uses the accepted simulation clock, not browser frame count.
- Preserve deterministic snapshots and future save compatibility.

## Validation boundary

This map is proposed architecture. No runtime DSK, command, result, projection or fixture was implemented.