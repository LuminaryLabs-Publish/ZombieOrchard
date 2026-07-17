# Stamina-system audit: effort, recovery and projection contract

**Timestamp:** `2026-07-17T09-43-24-04-00`

## Authority

`zombie-orchard-player-stamina-effort-recovery-projection-authority-domain`

## State contract

```txt
StaminaState
  current
  maximum
  exhaustionThreshold
  recoveryThreshold
  state: ready | exhausted | recovering
  revision
```

## Policy contract

```txt
EffortCostPolicy
  movementPerUnit
  collectSuccessCost
  collectAttemptCost
  clearSuccessCost
  clearAttemptCost
  equipmentModifiers
  pressureModifiers

RecoveryPolicy
  passivePerSecond
  dayEntryAmount
  nightEntryAmount
  recoveryDelay
```

The exact values are product tuning, not part of this documentation audit. The authority must make them declarative and testable.

## Settlement rules

1. Admission resolves cost from immutable action evidence.
2. The action and charge share one action identity.
3. Duplicate identities settle once.
4. Stale stamina revisions are rejected.
5. Costs clamp at zero and maximum is never exceeded by recovery.
6. Exhaustion state changes only through the authority.
7. Recovery uses accepted simulation time or an explicit phase result.
8. HUD projection binds the accepted stamina revision.
9. Reset and restore establish a new stamina generation.

## Minimum fixtures

```txt
initial state fixture
movement depletion fixture
successful collect cost fixture
failed collect policy fixture
successful clear cost fixture
failed clear policy fixture
exact exhaustion threshold fixture
exhausted action rejection fixture
passive recovery fixture
phase recovery fixture
pressure modifier fixture
duplicate action idempotency fixture
stale revision rejection fixture
reset generation fixture
FirstStaminaBoundFrameAck fixture
source/dist/Pages parity fixture
```

## Adoption boundary

No new top-level engine core domain is required. This is a product gameplay authority composed around `active-session-domain-kit`, with adapters into pressure, interface projection, reset and future persistence.

## Validation boundary

Contract only. No values, policies, runtime code or fixtures were added.