# ZombieOrchard Architecture Audit: Domain Service Breakdown

**Timestamp:** `2026-07-08T03-08-39-04-00`

## Runtime tree

```txt
ZombieOrchard
├─ static host
│  ├─ index.html
│  ├─ canvas#world
│  ├─ section#ui-root
│  └─ section#error-panel
├─ boot
│  └─ src/boot.js -> src/start.js
├─ game factory
│  └─ src/game.js -> createOrchardGame(preset)
├─ kit runtime
│  ├─ createKitRuntime
│  ├─ ctx.frame / ctx.elapsed / ctx.delta
│  ├─ ctx.events
│  ├─ domains registry
│  ├─ engine.command(domainId, type, payload)
│  ├─ engine.tick(delta)
│  ├─ engine.snapshot()
│  └─ engine.subscribe(listener)
├─ domain kits
│  ├─ resource-ledger-kit
│  ├─ pressure-field-kit
│  ├─ orchard-world-kit
│  ├─ construction-runtime-kit
│  ├─ roster-runtime-kit
│  ├─ inventory-runtime-kit
│  ├─ scoped interface domain kits
│  ├─ active-session-domain-kit
│  └─ interface-composition-kit
├─ host renderers
│  ├─ world-canvas
│  └─ html-interface-renderer
└─ diagnostics
   └─ window.GameHost
```

## Interface domain tree

```txt
interface
├─ entry
├─ session-select
├─ run-setup
├─ active-session
├─ interrupt
├─ construction
├─ exchange
├─ roster
├─ inventory
├─ knowledge
├─ preferences
├─ outcome
└─ interface-composition
```

## Game domain tree

```txt
game
├─ resource-ledger
│  ├─ values
│  ├─ canPay(cost)
│  ├─ pay(cost)
│  └─ add(values)
├─ pressure-field
│  ├─ channels
│  ├─ adjust(id, amount)
│  └─ pressure tick
├─ orchard-world
│  ├─ tree grid
│  ├─ apple seed/reseed
│  └─ collectNear(point, radius)
├─ construction-runtime
│  ├─ catalog
│  ├─ built records
│  └─ build command
├─ roster-runtime
│  ├─ actors
│  ├─ roles
│  └─ hire command
├─ inventory-runtime
│  ├─ items
│  ├─ equipped
│  └─ equip command
└─ active-session
   ├─ day / phase
   ├─ player condition and position
   ├─ pests
   ├─ score
   ├─ move
   ├─ collect
   ├─ clear
   ├─ next-phase
   └─ session ending
```

## DSK-style split still needed

```txt
active-session
├─ movement-domain-kit
├─ harvest-interaction-kit
├─ pest-clearance-kit
├─ phase-authority-kit
├─ session-health-kit
├─ score-ledger-kit
└─ outcome-trigger-kit
```

Do not split this yet. Market authority should land first because it gives resource, transaction, and replay contracts that later domains can reuse.
