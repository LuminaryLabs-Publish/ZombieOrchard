# Deploy audit — Save roundtrip and atomic load fixture gate

## Current gate

```txt
push to main
  -> npm test
  -> npm run build
  -> upload dist
  -> deploy Pages
```

`npm test` currently proves only Entry -> Play and nonempty apples.

## Required Node fixture gate

Use an injected in-memory persistence adapter.

```txt
1. Create deterministic session.
2. Admit commands and ticks to reach a known committed state.
3. Save to slot A.
4. Record durable-state fingerprint and envelope metadata.
5. Mutate the session.
6. Load slot A.
7. Assert every durable owner matches the saved fingerprint.
8. Assert one load result and one publication.
9. Assert new loadEpoch.
10. Assert corrupt/incompatible/partial-failure cases preserve before state.
```

## Required browser fixture gate

```txt
save slot
  -> reload page
  -> list slot metadata
  -> load slot
  -> verify first committed frame fingerprint
  -> delete slot
  -> verify slot index update
```

## Workflow rule

Do not add persistence claims to the deployed UI until Node roundtrip, migration, rollback, and browser reload fixtures are part of `npm test` or a required build job.

## Current result

```txt
save fixture: absent
load fixture: absent
migration fixture: absent
rollback fixture: absent
browser reload fixture: absent
deployment protection: insufficient for save/resume
```
