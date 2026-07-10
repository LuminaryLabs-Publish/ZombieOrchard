# Interaction audit: Interface parent-child command causality map

Timestamp: `2026-07-10T15-48-18-04-00`

## Current action path

```txt
DOM click on [data-action]
  -> interface-composition.activate({ actionId })
  -> active interface domain.activate({ actionId })
  -> returns { accepted, action }
  -> optional action.command dispatched
  -> child result discarded
  -> optional transition executed
  -> parent returns transition result or generic accepted
```

## Observable ambiguity

For construction today, the Storage Shed action can return parent `{ accepted: true }` even when the child build command rejects for missing resources. The same ambiguity would affect Market commands.

The UI cannot distinguish:

```txt
parent action accepted but child rejected
parent action accepted and child accepted
child was not dispatched
transition succeeded after child rejected
unknown child domain
unknown child command
```

## Required parent result

```json
{
  "accepted": false,
  "activationId": "activation-12",
  "actionId": "buy-apple-crate",
  "activeDomain": "exchange",
  "transition": null,
  "child": {
    "commandId": "command-31",
    "domain": "market-runtime",
    "type": "buy",
    "accepted": false,
    "reason": "insufficient_funds",
    "mutation": "none"
  }
}
```

## Interaction rules

1. A parent activation must retain the child command result.
2. Parent acceptance must not conceal child rejection.
3. Transition policy must be explicit: before child, after accepted child, after any child, or no transition.
4. Unknown action, disabled action, missing domain, and unknown command require stable reasons.
5. Every activation and child command needs stable sequence/correlation IDs.
6. Rendered feedback must source from retained result rows rather than inferred aggregate state.

## Interaction conclusion

Update `interface-composition-kit` rather than adding an unrelated UI controller. The composition domain already owns parent activation and child dispatch, so it is the correct authority for the retained result contract.