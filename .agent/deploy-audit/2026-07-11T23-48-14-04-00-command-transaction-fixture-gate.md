# Deploy audit: command transaction fixture gate

## Current deployment proof

The repository has a Node smoke test, static copy build and Pages deployment path. None executes browser command atomicity, nested result propagation, rollback, idempotency, publication count or result-to-frame correlation.

## Required pre-deploy gate

```txt
npm test
  -> existing smoke
  -> command transaction DOM-free fixtures

browser smoke
  -> delegated actions
  -> visible rejection/success projection
  -> duplicate-click behavior
  -> canvas/HTML frame correlation

Pages gate
  -> build artifact contains current transaction fixtures and host contract
```

## Mandatory DOM-free fixtures

```txt
child-rejection-propagation
no-partial-build
collect-rollback
clear-rollback
single-publication
idempotent-success
stale-revision
aggregate-result-shape
transaction-journal-order
```

## Mandatory browser fixtures

```txt
insufficient Storage Shed shows rejection
successful Storage Shed applies once
rapid double click applies once
Collect and Clear never partially settle
subscriber cannot observe intermediate transaction state
canvas, HTML and public host cite one committed revision
```

## Failure injection

Fixtures must be able to force failure after each prepare and commit boundary for:

```txt
resource ledger
orchard world
pressure field
active session
construction runtime
roster runtime
inventory runtime
interface composition
canvas render
HTML render
```

## Release rule

Do not deploy a claim of atomic or idempotent commands until all required participant, publication and frame-correlation fixtures pass from `main`. Documentation-only changes do not alter the existing deployment output.