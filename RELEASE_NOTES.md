# Release Notes - @nodots-llc/backgammon-types

## Version 4.4.0 (2025-10-22)

### Overview

Version 4.4.0 introduces comprehensive AI telemetry and override tracking capabilities to support advanced game history analysis and debugging of AI move decisions. This release focuses on providing the type infrastructure needed for monitoring and analyzing AI behavior in backgammon games.

### New Features

#### AI Telemetry and Override Tracking

Added three new type exports in the history module to support AI move tracking and analysis:

**OverrideReason Type**

A union type categorizing why the AI system overrode a planned move:

- `plan-origin-not-legal` - Planned origin position was not legal
- `mapping-failed` - Failed to map GNU Backgammon hint to game state
- `no-gnu-hints` - GNU Backgammon provided no move hints
- `no-gnu-hints-or-mapping-failed` - Combined failure condition
- `core-move-mismatch` - Mismatch between planned and available moves
- `single-die-encoding` - Special handling for single die remaining
- `ready-empty` - No ready moves available
- `invalid-state` - Game state validation failed
- `safety-fallback` - Fallback to safe move selection
- `unknown` - Unclassified override reason

```typescript
import { OverrideReason } from '@nodots-llc/backgammon-types/history'

const reason: OverrideReason = 'mapping-failed'
```

**OverrideInfo Interface**

Structured metadata for AI move overrides:

```typescript
interface OverrideInfo {
  reasonCode: OverrideReason
  reasonText?: string  // Optional human-readable explanation
}
```

**AITelemetryStep Interface**

Comprehensive telemetry data captured for each AI move step including:

- Position and roll tracking (positionId, roll, rollSource)
- One-shot plan context (planLength, planIndex, planSource)
- Engine and mapping diagnostics (hintCount, mappedOriginId, mappingStrategy, mappingOutcome)
- CORE legality snapshots for debugging mismatches
- Dice handling telemetry (singleDieRemaining)

### Improvements

- Enhanced monorepo build system with TypeScript project references
- Added clean scripts for package maintenance
- Improved package.json configuration with proper exports field for history module
- Build optimizations using `tsc -b` for faster incremental builds

### Breaking Changes

None. All changes are backward compatible additions.

### Migration Guide

Import from the history submodule:

```typescript
import {
  OverrideReason,
  OverrideInfo,
  AITelemetryStep
} from '@nodots-llc/backgammon-types/history'
```

---

## Version 3.7.2

### Breaking Changes
- Removed `allowDraw` setting from `BaseGame` interface and `GameClass` - Backgammon doesn't support draws as a game outcome

### New Features
- Added comprehensive roll-for-start functionality with new types:
  - `BackgammonDiceRollingForStart` and `BackgammonDiceRolledForStart` for dice states during starting phase
  - `BackgammonPlayerRollingForStart` and `BackgammonPlayerRolledForStart` for player states during roll-for-start
- Enhanced dice and player state management for improved type safety

### Improvements
- Better organization of imports in move.ts
- Updated .gitignore to prevent compiled files from being included in package

### Bug Fixes
- Fixed issue where moves on activePlay in various states were not marked as required fields