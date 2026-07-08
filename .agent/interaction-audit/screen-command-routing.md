# ZombieOrchard Interaction Audit: Screen Command Routing

**Timestamp:** `2026-07-08T03-08-39-04-00`

## Current command routes

```txt
HTML data-action click
-> html-interface-renderer
-> engine.command("interface-composition", "activate", { actionId })
-> interface-composition delegates to active screen domain
-> action.to transitions screens
-> action.command dispatches nested command, but result is discarded
```

```txt
HTML data-command click
-> html-interface-renderer
-> engine.command("active-session", commandName)
-> active-session mutates session state directly
```

## Good parts

```txt
- screen actions are data-driven through preset config
- interface screen domains are reusable and scoped
- active screen ownership is centralized in interface-composition
- game commands remain accessible through engine.command
```

## Main issue

Nested command dispatch currently lacks result retention. For Market actions this means a buy/sell command cannot surface accepted/rejected state, prices, disabled reasons, or transaction records back to the renderer without adding explicit projection state.

## Required next routing contract

```txt
interface-composition.activate
├─ capture action
├─ normalize optional action.command
├─ dispatch nested command
├─ store nested result as lastResult
├─ emit interface.commandResult event
├─ transition only if action.to exists and command policy allows it
└─ expose lastResult in snapshot
```

## Market-specific routing contract

```txt
exchange-domain-kit action
-> market-command-dispatch-kit
-> market-preflight-kit
-> resource-ledger / inventory-runtime
-> market-command-result-journal-kit
-> market-result-projection-kit
-> html-interface-renderer exchange branch
```
