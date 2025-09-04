# Release Notes - @nodots-llc/backgammon-types v3.7.2

## Breaking Changes
- Removed `allowDraw` setting from `BaseGame` interface and `GameClass` - Backgammon doesn't support draws as a game outcome

## New Features
- Added comprehensive roll-for-start functionality with new types:
  - `BackgammonDiceRollingForStart` and `BackgammonDiceRolledForStart` for dice states during starting phase
  - `BackgammonPlayerRollingForStart` and `BackgammonPlayerRolledForStart` for player states during roll-for-start
- Enhanced dice and player state management for improved type safety

## Improvements
- Better organization of imports in move.ts
- Updated .gitignore to prevent compiled files from being included in package

## Bug Fixes
- Fixed issue where moves on activePlay in various states were not marked as required fields

## Technical Details
This release focuses on simplifying the game configuration by removing unnecessary options and enhancing the roll-for-start phase with proper type definitions that support the game's starting mechanics.