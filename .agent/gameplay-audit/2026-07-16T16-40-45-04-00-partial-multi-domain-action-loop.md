# Gameplay audit: partial multi-domain action loop

**Timestamp:** `2026-07-16T16-40-45-04-00`

## Interaction loop

```txt
Collect
  -> remove selected apple
  -> seed replacement
  -> optionally grant apples/money
  -> optionally increase row pressure
  -> increase score
  -> publish accepted message

Clear
  -> damage/remove pest
  -> optionally grant scrap
  -> increase score
  -> publish accepted message

Build/Hire
  -> debit resources
  -> append acquired record
```

## Gap

Each operation is treated as one player action but implemented as multiple immediate mutations. Missing participants are tolerated in collection and clearing, and there is no rollback after a debit or removal. Retried delivery has no stable transaction identity.

## Gameplay contract

- An accepted collection must settle apple identity, replacement, reward, pressure, score, and message together.
- An accepted pest clear must settle damage/removal, reward, score, and message together.
- An accepted purchase or hire must settle payment and acquisition together.
- A rejected operation must leave every participant unchanged.
- An exact retry must return the stored terminal result without applying effects again.