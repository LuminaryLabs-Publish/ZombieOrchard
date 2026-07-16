# Deploy audit: transaction settlement browser fixture gate

**Timestamp:** `2026-07-16T16-40-45-04-00`

## Required fixtures

```txt
collection success with all participant revisions
collection rejection with no mutation
missing resource participant
missing pressure participant
stale orchard revision
duplicate collection delivery
pest removal plus scrap reward atomicity
construction debit plus built-record atomicity
roster debit plus actor-record atomicity
nested command rejection propagation
commit failure rollback
ambiguous failure compensation
Canvas2D/HTML transaction revision convergence
source/dist/Pages parity
```

## Release gate

A build is not transaction-safe until the source, copied `dist`, and deployed Pages origin produce the same terminal result and participant snapshot for every fixture. Unknown or partial settlement must fail closed.

## Current status

No transaction fixture exists. `tests/smoke.mjs` proves only entry routing and initial orchard apples. Build and Pages parity were not executed during this documentation audit.