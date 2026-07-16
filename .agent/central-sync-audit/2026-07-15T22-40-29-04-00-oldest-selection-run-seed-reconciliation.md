# Central sync audit: oldest selection and run-seed reconciliation

**Timestamp:** `2026-07-15T22-40-29-04-00`

## Summary

The complete current Publish installation contains 11 repositories. Ten remain eligible after excluding TheCavalryOfRome. Every eligible repository has a central ledger, root `.agent` state and current head matching its documented repo-local head. ZombieOrchard has the oldest synchronized central timestamp and was the only selected project.

## Plan ledger

**Goal:** preserve one-project selection order and bind the repo-local seeded-run finding to the central ledger.

- [x] Compare the full organization inventory.
- [x] Compare all ten eligible central ledgers.
- [x] Verify all ten root `.agent` states.
- [x] Verify all ten current heads.
- [x] Exclude TheCavalryOfRome.
- [x] Select only ZombieOrchard.
- [x] Record the run-seed/RNG/replay audit family.
- [ ] Bind the final repo-local documentation head in the central ledger and change log.

## Selection evidence

```txt
selected: LuminaryLabs-Publish/ZombieOrchard
prior central timestamp: 2026-07-15T17-38-05-04-00
next oldest: LuminaryLabs-Publish/TheUnmappedHouse
next timestamp: 2026-07-15T18-02-58-04-00
```

## Central outputs

```txt
repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
internal-change-log/2026-07-15T22-40-29-04-00-zombie-orchard-run-seed-rng-replay.md
```
