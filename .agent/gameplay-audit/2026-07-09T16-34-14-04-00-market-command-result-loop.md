# ZombieOrchard Gameplay Audit: Market Command Result Loop

**Timestamp:** `2026-07-09T16-34-14-04-00`

## Current playable loop

```txt
start route
  -> enter active-session
  -> collect nearby apples
  -> clear nearby pests
  -> advance day/night phase
  -> survive pest pressure
  -> move into build/roster/inventory/codex/settings/outcome screens through interface actions
```

## Current economy loop

```txt
active-session collect
  -> orchard-world.collectNear(player, 42)
  -> resource-ledger.add({ apples, money })
  -> pressure-field.adjust(rowPressure)
  -> active-session score/message mutation
```

```txt
construction build
  -> construction-runtime.command("build", payload)
  -> resource-ledger.pay(item.cost)
  -> built item append if accepted
```

```txt
roster hire
  -> roster-runtime.command("hire", payload)
  -> resource-ledger.pay({ money })
  -> actor append if accepted
```

## Market gap

The product already says it is an orchard survival/economy shell, but the Exchange/Market loop is not yet a true gameplay loop.

Current Exchange state:

```txt
exchange screen
  -> scoped interface descriptor
  -> generic screen rendering
  -> Back action only
```

Missing Market gameplay proof:

```txt
- sell apples for money
- buy basic tool
- buy row supply
- stable accepted result
- stable rejected insufficient-resource result
- stable rejected capacity result
- no-mutation proof for rejected rows
- transaction history
- inventory purchase intake
- replayable fixture rows
```

## Target gameplay loop

```txt
collect apples
  -> open Exchange
  -> choose sell-apples
  -> Market envelope created
  -> before snapshot records resources/inventory/prices/capacity
  -> preflight accepts if apples > 0
  -> resource transaction changes apples/money
  -> accepted result row retained
  -> Exchange projection shows result
  -> GameHost diagnostics expose same result

open Exchange
  -> choose buy-basic-tool
  -> Market envelope created
  -> preflight accepts only if money is enough and inventory capacity available
  -> resource transaction changes money
  -> inventory intake adds item
  -> accepted result row retained

open Exchange
  -> choose buy-row-supply without enough money or capacity
  -> preflight rejects
  -> before and after snapshots match
  -> rejected result row retained
  -> Exchange projection shows stable reason
```

## Gameplay recommendation

Do not expand zombies, crops, day/night balancing, or worker automation next. First prove the Market accepted/rejected loop as source-owned command/result gameplay.
