# Migration Plan

## Step 1
Keep the current TMDB fetchers.

## Step 2
Pass raw current-year, previous-year and alternative title pools into `runEngine3Pipeline`.

## Step 3
Move existing enrichment into the `enrichTitles` callback.

## Step 4
Move current hero selection into the `chooseHero` callback.

## Step 5
Compare Engine 2 and Engine 3 output using the same Romcom test pool.

## Step 6
Remove the old monolithic assembly code only after Engine 3 passes:
- exactly seven
- no duplicates
- all 7.5+
- no Canon exclusions
- no recent repeats
- format and country balance
