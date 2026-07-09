# ZombieOrchard Interaction Audit: Data Action Nested Result Contract

**Timestamp:** `2026-07-09T16-34-14-04-00`

## Current input paths

```txt
HTML [data-action]
  -> html-interface-renderer click listener
  -> engine.command("interface-composition", "activate", { actionId })
  -> current interface domain command("activate")
  -> returns { accepted, action }
  -> interface-composition may dispatch action.command through ctx.engine.command(...)
  -> result is discarded
  -> interface-composition returns transition result or generic accepted result
```

```txt
HTML [data-command]
  -> html-interface-renderer click listener
  -> engine.command("active-session", commandName)
  -> active-session command mutates movement/collect/clear/phase state
```

## Interaction problem

The user-facing Exchange interaction cannot prove what happened after a nested command.

The composition layer currently knows an action was requested but does not retain:

```txt
- nested command target domain
- nested command type
- nested command payload
- nested command accepted/rejected status
- nested rejection reason
- source before/after snapshots
- mutation/no-mutation proof
```

## Required nested-result contract

Add an additive adapter around nested command dispatch.

```txt
InterfaceNestedResultAdapter
  input:
    active screen id
    action descriptor
    nested command result
    before source snapshot
    after source snapshot
  output:
    lastResult row in interface-composition snapshot
```

Minimum row:

```txt
{
  source: "interface-composition",
  active: "exchange",
  actionId: "sell-apples",
  command: { domain: "market-authority", type: "execute", payload: {...} },
  accepted: true,
  reason: null,
  resultType: "market-command-result",
  mutation: "accepted-resource-transaction"
}
```

## Interaction fixture rows

```txt
- activate exchange back action preserves current behavior
- activate sell-apples retains accepted nested result
- activate buy-basic-tool retains accepted nested result
- activate buy-row-supply without resources retains rejected nested result
- rejected nested result does not mutate resources or inventory
```

## Defer

```txt
- pointer controls
- keyboard shortcuts
- drag/drop inventory
- richer UI state
```
