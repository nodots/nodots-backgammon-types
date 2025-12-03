# @nodots-llc/backgammon-types

[![npm version](https://badge.fury.io/js/@nodots-llc%2Fbackgammon-types.svg)](https://www.npmjs.com/package/@nodots-llc/backgammon-types)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Comprehensive TypeScript type definitions for backgammon game development

## Overview

`@nodots-llc/backgammon-types` is a TypeScript library that provides complete type definitions and interfaces for building backgammon applications. This package serves as the foundation for type-safe backgammon game development, covering everything from basic board representation to complex game state management and AI telemetry.

### Key Features

- **Complete Type Coverage** - Fully typed interfaces for all aspects of backgammon gameplay
- **State Machine Modeling** - Type-safe game state transitions and validation
- **AI Integration** - Built-in types for AI telemetry and decision tracking
- **History Tracking** - Comprehensive game history and replay support
- **Match Play** - Support for match play with Crawford rule and cube handling
- **Flexible Architecture** - Designed for use across core, AI, API, and client applications

### What's Included

This package provides TypeScript definitions for:

- **Game State & Management** - Complete game state modeling with type-safe transitions
- **Board Representation** - Points, bar, and off positions with checker tracking
- **Checker Movement** - Move validation, execution, and undo capabilities
- **Dice & Cube** - Dice rolling, doubling cube decisions, and offer management
- **Player Management** - Player states, turns, and action tracking
- **Game Rules** - Crawford rule, Jacoby rule, Beaver, and other variants
- **AI Telemetry** - Move override tracking and decision analysis
- **Match History** - Game snapshots, move history, and replay data

## Installation

Install via npm:

```bash
npm install @nodots-llc/backgammon-types
```

Or using yarn:

```bash
yarn add @nodots-llc/backgammon-types
```

### Requirements

- Node.js >= 18
- TypeScript >= 5.0 (recommended)

## Project Structure

The type definitions are organized into focused modules:

| Module | Description |
|--------|-------------|
| `board.ts` | Board state, points, bar, and off positions |
| `checker.ts` | Checker representation and properties |
| `checkercontainer.ts` | Point, bar, and off container management |
| `cube.ts` | Doubling cube state and decisions |
| `dice.ts` | Dice rolling, values, and validation |
| `game.ts` | Core game state, rules, and configuration |
| `history.ts` | Game history, snapshots, and AI telemetry |
| `match.ts` | Match play and Crawford rule handling |
| `move.ts` | Move representation, validation, and execution |
| `offer.ts` | Double, resign, and other game offers |
| `play.ts` | Play state transitions and turn management |
| `player.ts` | Player state, colors, and turn tracking |
| `players.ts` | Multi-player management |
| `doubling.ts` | Doubling cube logic and ownership |
| `import.ts` | Import/export formats and serialization |
| `xg.ts` | XG format compatibility |

## Usage

### Basic Imports

Import the types you need in your TypeScript project:

```typescript
import { 
  BackgammonGame, 
  BackgammonMove, 
  BackgammonPlayer, 
  BackgammonBoard 
} from '@nodots-llc/backgammon-types'
```

### Game State Management

```typescript
import { BackgammonGame, BackgammonGameState } from '@nodots-llc/backgammon-types'

// Define a game state
const game: BackgammonGame = {
  id: 'game-123',
  version: '4.6.0',
  stateKind: 'playing',
  board: { /* board state */ },
  players: { /* player states */ },
  cube: { /* cube state */ },
  // ... other properties
}

// Check game state
if (game.stateKind === 'playing') {
  console.log('Game in progress')
}
```

### Working with Moves

```typescript
import { 
  BackgammonMove, 
  BackgammonMoveKind,
  BackgammonDieValue 
} from '@nodots-llc/backgammon-types'

// Define a move
const move: BackgammonMove = {
  id: 'move-456',
  player: { /* player reference */ },
  dieValue: 6 as BackgammonDieValue,
  stateKind: 'ready',
  moveKind: 'point-to-point',
  possibleMoves: []
}

// Check move type
if (move.moveKind === 'bear-off') {
  console.log('Bearing off a checker')
}
```

### Board Representation

```typescript
import { BackgammonBoard, BackgammonPoint } from '@nodots-llc/backgammon-types'

// Access board structure
const board: BackgammonBoard = {
  id: 'board-789',
  points: {
    '1': { /* point 1 state */ },
    '2': { /* point 2 state */ },
    // ... points 3-24
  },
  bar: {
    clockwise: { /* bar for clockwise player */ },
    counterclockwise: { /* bar for counterclockwise player */ }
  },
  off: {
    clockwise: { /* off for clockwise player */ },
    counterclockwise: { /* off for counterclockwise player */ }
  }
}
```

### AI Telemetry (History Module)

```typescript
import { 
  AITelemetryStep, 
  OverrideReason, 
  OverrideInfo 
} from '@nodots-llc/backgammon-types/history'

// Track AI decision-making
const telemetry: AITelemetryStep = {
  positionId: 'gnuBG-position-123',
  roll: [6, 5],
  rollSource: 'random',
  planLength: 4,
  planIndex: 2,
  planSource: 'gnu-backgammon',
  hintCount: 3,
  mappedOriginId: 'point-8',
  mappingStrategy: 'exact-match',
  mappingOutcome: 'success',
  // ... other telemetry data
}

// Handle move overrides
const override: OverrideInfo = {
  reasonCode: 'mapping-failed',
  reasonText: 'Could not map GNU hint to current board state'
}
```

### Player Management

```typescript
import { 
  BackgammonPlayer, 
  BackgammonColor,
  BackgammonPlayerMoving 
} from '@nodots-llc/backgammon-types'

// Define player states
const player: BackgammonPlayerMoving = {
  id: 'player-1',
  color: 'white',
  name: 'Alice',
  stateKind: 'moving',
  direction: 'clockwise',
  isActive: true,
  dice: { /* dice state */ },
  activePlay: { /* current play */ }
}
```

### Match Play

```typescript
import { BackgammonMatch, BackgammonMatchScore } from '@nodots-llc/backgammon-types'

// Track match state
const match: BackgammonMatch = {
  id: 'match-001',
  matchLength: 5,
  score: {
    white: 2,
    black: 3
  },
  crawford: {
    enabled: true,
    isInCrawford: false,
    crawfordPlayerColor: null
  },
  currentGameId: 'game-456'
}
```

## Changelog

See [RELEASE_NOTES.md](./RELEASE_NOTES.md) for detailed version history.

### Recent Releases

#### Version 4.4.0 - AI Telemetry & Override Tracking

**New Features:**
- AI telemetry types for game history analysis
- `OverrideReason` - Categorizes AI move override reasons
- `OverrideInfo` - Override metadata with reason codes
- `AITelemetryStep` - Comprehensive AI move execution telemetry
  - Position and roll tracking
  - One-shot plan context
  - Engine and mapping diagnostics
  - CORE legality snapshots
  - Dice handling telemetry

**Improvements:**
- Enhanced workspace build system with TypeScript project references
- Clean scripts for package maintenance
- Improved `package.json` exports configuration
- Build optimizations using `tsc -b`

#### Version 3.7.2 - Roll-for-Start Enhancement

**Breaking Changes:**
- Removed `allowDraw` setting (backgammon doesn't support draws)

**New Features:**
- Roll-for-start type definitions
- `BackgammonDiceRollingForStart` and `BackgammonDiceRolledForStart`
- `BackgammonPlayerRollingForStart` and `BackgammonPlayerRolledForStart`

#### Version 3.2.0 - Game Metadata & Statistics

**New Features:**
- `BackgammonGameMetadata` - Game metadata and tournament info
- `BackgammonGameStatistics` - Statistics tracking (moves, rolls, timing, pip counts)
- `BackgammonGameTiming` - Time management and limits
- Enhanced `BackgammonGame` interface with optional metadata, statistics, and timing
- Support for rule variations (Crawford, Jacoby, Beaver)
- Game settings for undo, resign, hints, etc.

## Development

### Prerequisites

- **Node.js** >= 18 (Latest LTS recommended)
- **npm** (comes with Node.js)
- **TypeScript** knowledge for contributing

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nodots/nodots-backgammon-types.git
   cd nodots-backgammon-types
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the package**
   ```bash
   npm run build
   ```

The compiled JavaScript and TypeScript declaration files will be generated in the `dist/` directory.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript and generate `.d.ts` files |
| `npm run clean` | Remove the `dist/` directory |
| `npm test` | Run tests (currently placeholder for types package) |
| `npm run prepare` | Automatically runs before package installation |
| `npm run release` | Build and publish to npm with public access |
| `npm run publish:dry-run` | Test the publishing process without actually publishing |

### Project Architecture

This is a **types-only package** that provides TypeScript definitions without runtime code. The package:

- Uses TypeScript's project references for incremental builds
- Exports both ESM and CommonJS compatible modules
- Ships `.d.ts` files for maximum compatibility
- Supports subpath exports (e.g., `@nodots-llc/backgammon-types/history`)

### Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

Key points:
- Create feature branches from `development`
- Keep PRs focused and small
- Update documentation for any type changes
- Follow the existing code style and naming conventions

### Publishing

This package is published to npm under the `@nodots-llc` scope:

```bash
npm run release:provenance
```

For testing before publishing:

```bash
npm run publish:dry-run
```

## Package Exports

The package provides multiple export paths:

```typescript
// Main export - all types
import { BackgammonGame, BackgammonMove } from '@nodots-llc/backgammon-types'

// History module - AI telemetry and game history
import { AITelemetryStep, OverrideReason } from '@nodots-llc/backgammon-types/history'
```

## Ecosystem Integration

This package is designed to work seamlessly with other Nodots Backgammon packages:

- **@nodots-llc/backgammon-core** - Core game engine and logic
- **@nodots-llc/backgammon-ai** - AI players and move analysis
- **@nodots-llc/backgammon-api** - RESTful API server
- **@nodots-llc/backgammon-client** - Web client application

## License

MIT License

Copyright (c) 2025 Nodots Advisory Group

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Support & Links

- **Author:** Ken Riley <kenr@nodots.com>
- **Repository:** [github.com/nodots/nodots-backgammon-types](https://github.com/nodots/nodots-backgammon-types)
- **NPM Package:** [@nodots-llc/backgammon-types](https://www.npmjs.com/package/@nodots-llc/backgammon-types)
- **Issues:** [Report bugs or request features](https://github.com/nodots/nodots-backgammon-types/issues)

---

**Note:** This package provides shared TypeScript type definitions used across the Nodots Backgammon ecosystem. It contains no runtime code and is purely for type checking and IDE support.
