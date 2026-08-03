# My Ciné Engine 3.0 Architecture

Engine 3.0 is modular and intentionally separate from the UI.

## Stages

1. Candidate Engine
2. Canon Engine
3. Quality Engine
4. Freshness Engine
5. Diversity Engine
6. Taste Engine
7. Casting Engine
8. Editor-in-Chief Audit

## Design goal

A recommendation is not generated. It is published only after every stage passes.

## Current release

This package establishes the full architecture and keeps the existing user interface intact.
The next implementation step is switching the live `buildPicks` flow to `runEngine3Pipeline`.
