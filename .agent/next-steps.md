# Next steps: ZombieOrchard player stamina adoption

**Timestamp:** `2026-07-17T09-43-24-04-00`  
**Status:** `player-stamina-effort-recovery-projection-authority-audited`

## Summary

The next implementation slice is a targeted stamina authority around `active-session-domain-kit`. It should make action costs, exhaustion, recovery and projection explicit without creating a parallel player system.

## Checklist

**Goal:** ensure every stamina-affecting action and recovery step settles once and reaches a matching visible frame.

- [ ] Decide whether stamina is adopted or removed from public state.
- [ ] Define current, maximum, exhaustion threshold, recovery threshold and revision.
- [ ] Add declarative movement, collect and clear effort policies.
- [ ] Admit actions against expected stamina revision before gameplay mutation.
- [ ] Define cost policy for failed collect and clear attempts.
- [ ] Add deterministic passive and/or phase recovery through accepted simulation time.
- [ ] Keep condition damage separate from stamina depletion.
- [ ] Add optional pressure and equipment modifiers only through explicit adapters.
- [ ] Publish `StaminaActionResult` and `StaminaRecoveryResult`.
- [ ] Project current/max stamina and exhaustion state in the HUD.
- [ ] Publish `FirstStaminaBoundFrameAck`.
- [ ] Add depletion, rejection, recovery, reset, source, dist and Pages fixtures.

## Ordering

```txt
state schema and policy
  -> action admission
  -> gameplay mutation plus exact charge
  -> recovery settlement
  -> HUD projection
  -> matching-frame acknowledgement
  -> deterministic and deployed-origin fixtures
```

Preserve the existing active-session, pressure, renderer and interface boundaries. This is targeted product capability adoption, not an engine restructure.