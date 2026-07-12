# Gameplay audit: activate, child command and commit loop

## Storage Shed path

```txt
click Storage Shed
  -> interface-composition.activate
  -> construction screen returns action descriptor
  -> nested construction-runtime.build
  -> ledger.pay(cost)
  -> if payment fails: child accepted=false, message changes
  -> composition ignores child result
  -> composition returns accepted=true
```

The parent result is therefore not a truthful gameplay result.

## Collection path

```txt
active-session.collect
  -> orchard-world.collectNear
  -> remove selected apple
  -> seed replacement apple using Math.random
  -> resource-ledger.add if available
  -> pressure-field.adjust if available
  -> increment score
  -> set message
```

The world mutation occurs before reward and pressure settlement. Optional participant calls allow an incomplete settlement to appear accepted.

## Clear path

```txt
active-session.clear
  -> select nearby pest
  -> decrement condition
  -> possibly remove pest
  -> increment score
  -> resource-ledger.add(scrap) if available
  -> set message
```

Pest retirement and score can commit without scrap settlement.

## Build and hire paths

```txt
prepare affordability: absent
ledger payment: immediate
entity append: later
rollback on append failure: absent
```

## Required gameplay transaction plans

```txt
CollectPlan {
  appleId,
  replacementAppleDescriptor,
  rewardDelta,
  pressureDelta,
  scoreDelta,
  message
}

ClearPlan {
  pestId,
  resultingCondition,
  retirePest,
  scrapDelta,
  scoreDelta,
  message
}

BuildPlan {
  catalogItemId,
  cost,
  resultingEntity,
  message
}

HirePlan {
  actorDescriptor,
  cost,
  message
}
```

Each plan must be fully validated before any participant mutates.

## Required outcomes

```txt
accepted
rejected-precondition
rejected-stale-revision
rejected-participant
rolled-back
accepted-duplicate
failed-commit
```

No gameplay caller should infer success from route movement, message text or a parent activation result.