# V42 Incremental Romcom Engine

The all-or-nothing seven-batch preloader has been removed from the live path.

Each request now:
1. Reads the session used-title ledger
2. Excludes every previously shown title
3. Resolves recent arrivals
4. Resolves Canon titles in small chunks
5. Stops once enough eligible titles exist
6. Composes one balanced batch
7. Saves the seven IDs to the ledger

This allows each batch to succeed independently and avoids large preload failure.
