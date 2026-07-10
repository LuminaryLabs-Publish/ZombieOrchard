# ZombieOrchard Interaction Audit — Nested Command Result Retention Map

**Timestamp:** `2026-07-10T08-28-26-04-00`

## Inputs in use

```txt
click [data-action]
  -> engine.command("interface-composition", "activate", { actionId })

click [data-command]
  -> engine.command("active-session", command)
```

## Current interaction path

```txt
HTML button click
  -> html-interface-renderer
  -> engine.command(...)
  -> kit-runtime.command
  -> domain.command
  -> result returned to caller
```

For interface actions:

```txt
interface-composition.activate
  -> current domain activate returns { accepted, action }
  -> if action.command exists, calls ctx.engine.command(...)
  -> nested result is discarded
  -> if action.to exists, transition occurs
  -> returns transition result or { accepted: true }
```

## Concrete gap

The command API is already strong enough to return accepted/rejected data.

The interaction adapter loses the key detail when a button triggers a nested command.

Examples:

```txt
construction action -> construction-runtime build result is dropped
future market action -> market result would be dropped
future rejected purchase -> UI/GameHost cannot read reason
future accepted purchase -> UI/GameHost cannot read resource delta or intake
```

## Needed interaction services

```txt
interface-nested-result-adapter-kit
nested-command-result-row-kit
market-command-envelope-kit
market-preflight-reason-kit
market-command-result-kit
interaction-result-journal-kit
GameHost-interaction-readback-kit
```

## Recommendation

Add nested result retention before adding Market actions.

Then Market buttons can prove accepted/rejected states without relying on final resource totals or generic screen transitions.
