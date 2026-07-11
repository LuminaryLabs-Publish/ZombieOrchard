# Interaction audit — Parent and child command result map

Timestamp: `2026-07-11T01-31-15-04-00`

## Browser interaction surfaces

```txt
data-action
  -> interface-composition.activate

data-command
  -> active-session collect | clear | next-phase
```

Movement, hiring, equipment, select and set-field remain unbound, as documented in the capability audit. This pass focuses on the commands that are reachable.

## Parent activation map

```txt
engine.command(interface-composition, activate, { actionId })
  -> active screen domain.command(activate)
  -> { accepted, action }
  -> optional child ctx.engine.command(...)
  -> optional move(to)
  -> parent result
```

## Result loss

The parent does not retain:

```txt
child accepted/rejected state
child rejection reason
child output entity
resource effects
child before/after state
nested publication count
```

When there is no route target, the parent returns `{ accepted: true }` after invoking the child regardless of the child result.

## Required parent result

```txt
{
  accepted,
  reason,
  commandId,
  transactionId,
  action,
  childResults,
  routeResult,
  committed,
  publicationCount
}
```

## Interaction admission rules

1. Resolve and validate the active action before mutation.
2. Preflight required child services and route targets.
3. Execute child mutations inside the parent transaction context.
4. Abort the route change when a required child rejects.
5. Publish once after all required effects commit.
6. Return the exact composite result to the browser adapter.
7. Project failure reasons through an accessible result surface.
8. Journal the command result independently of ephemeral tick events.

## Proof cases

```txt
missing action
explicitly disabled action
missing child domain
unknown child command
invalid build target
insufficient resources
successful build
successful route-only action
child command plus route success
child failure plus route suppression
subscriber notification count
```
