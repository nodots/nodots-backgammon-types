import { BackgammonBoard } from './board'
import { BackgammonMoveOrigin } from './checkercontainer'
import { BackgammonCube } from './cube'
import { BackgammonPlay, BackgammonPlayMoving } from './play'
import {
  BackgammonPlayer,
  BackgammonPlayerActive,
  BackgammonPlayerDoubled,
  BackgammonPlayerInactive,
  BackgammonPlayerMoving,
  BackgammonPlayerRolledForStart,
  BackgammonPlayerRolling,
  BackgammonPlayers,
  BackgammonPlayersCompleted,
  BackgammonPlayersDoubled,
  BackgammonPlayersMoved,
  BackgammonPlayersMoving,
  BackgammonPlayersRolledForStart,
  BackgammonPlayersRolling,
  BackgammonPlayersRollingForStart,
} from './player'

// --------------------------------------------------------------------------------------
// DESIGN NOTE: Game State Modeling - "playing"/"played" vs. "moving"/"moved"
//
// The current model uses "moving" and "moved" states, which are primarily driven by UI events
// (e.g., when a user clicks or drags a checker). However, in the rules of backgammon, a player's
// turn (a "play") consists of a sequence of moves (2 or 4, depending on the dice roll), and the
// turn is only complete when the player has finished all possible/legal moves and explicitly
// indicates they are done (e.g., by clicking a "Done" button).
//
// A more accurate and robust model would use "playing" and "played" states:
//   - "playing": The player is in the process of making their play (their turn), which may consist
//     of multiple moves. The player remains in this state until they indicate completion.
//   - "played": The player has finished their play (clicked "Done"), and the game can validate
//     the play and transition to the next state (e.g., next player's turn, or game end).
//
// This approach:
//   - Aligns the state machine with the actual rules and flow of backgammon, not just UI actions.
//   - Makes it easier to reason about game logic, validation, and undo/redo functionality.
//   - Separates UI-driven pseudo-states from rule-driven game states, leading to a cleaner design.
//
// For now, the code retains "moving" and "moved" for compatibility, but a future refactor should
// implement "playing" and "played" as described above.
// --------------------------------------------------------------------------------------

export type Latitude = 'north' | 'south'
export type Longitude = 'east' | 'west'
export type BackgammonColor = 'black' | 'white'
export type BackgammonMoveDirection = 'clockwise' | 'counterclockwise'

export const CHECKERS_PER_PLAYER = 15

export type BackgammonGameStateKind =
  | 'rolling-for-start'
  | 'rolled-for-start'
  | 'rolling'
  | 'doubled'
  | 'moving'
  | 'moved'
  | 'completed'

// New game metadata and statistics interfaces
export interface BackgammonGameMetadata {
  title?: string
  description?: string
  tags?: string[]
  isPublic?: boolean
  isRanked?: boolean
  tournamentId?: string
  roundNumber?: number
  matchNumber?: number
}

export interface BackgammonGameStatistics {
  totalMoves: number
  totalRolls: number
  totalDoubles: number
  averageMoveTime: number
  longestMoveTime: number
  shortestMoveTime: number
  pipCountHistory: Array<{
    turn: number
    black: number
    white: number
  }>
  cubeHistory: Array<{
    turn: number
    value: number
    offeredBy: BackgammonColor
    accepted: boolean
  }>
}

export interface BackgammonGameTiming {
  timeLimit?: number // in seconds, undefined = no limit
  timePerMove?: number // in seconds, undefined = no limit
  timeRemaining: {
    black: number
    white: number
  }
  lastMoveTime?: Date
  averageTimePerTurn: number
}

interface BaseGame {
  id: string
  board: BackgammonBoard
  cube: BackgammonCube
  createdAt: Date
  asciiBoard?: string
  winner?: string // player.id of the winning player
  activeColor?: BackgammonColor
  activePlay?: BackgammonPlay
  activePlayer?: BackgammonPlayer
  inactivePlayer?: BackgammonPlayer
  startTime?: Date
  lastUpdate?: Date
  endTime?: Date

  // New attributes for enhanced game tracking
  metadata?: BackgammonGameMetadata
  statistics?: BackgammonGameStatistics
  timing?: BackgammonGameTiming
  gnuPositionId?: string
  version: string // Game format version for compatibility
  rules: {
    useCrawfordRule?: boolean
    useJacobyRule?: boolean
    useBeaverRule?: boolean
    useRaccoonRule?: boolean
    useMurphyRule?: boolean
    useHollandRule?: boolean
  }
  settings: {
    allowUndo?: boolean
    allowResign?: boolean
    autoPlay?: boolean
    showHints?: boolean
    showProbabilities?: boolean
  }
}

// Base interface for game states - all game state types extend BaseGame directly

export type BackgammonGameRollingForStart = BaseGame & {
  stateKind: 'rolling-for-start'
  players: BackgammonPlayersRollingForStart
}

export type BackgammonGameRolledForStart = BaseGame & {
  stateKind: 'rolled-for-start'
  players: BackgammonPlayersRolledForStart
  activeColor: BackgammonColor
  activePlayer: BackgammonPlayerRolledForStart
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameRolling = BaseGame & {
  stateKind: 'rolling'
  players: BackgammonPlayersRolling
  activeColor: BackgammonColor
  activePlayer: BackgammonPlayerRolling
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameDoubled = Omit<BaseGame, 'activePlay'> & {
  stateKind: 'doubled'
  players: BackgammonPlayersDoubled
  activeColor: BackgammonColor
  activePlayer: BackgammonPlayerDoubled
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameMoving = BaseGame & {
  stateKind: 'moving'
  players: BackgammonPlayersMoving
  activeColor: BackgammonColor
  activePlay: BackgammonPlayMoving
  activePlayer: BackgammonPlayerMoving
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameMoved = BaseGame & {
  stateKind: 'moved'
  players: BackgammonPlayersMoved
  activeColor: BackgammonColor
  activePlay: BackgammonPlayMoving
  activePlayer: BackgammonPlayerMoving
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameCompleted = BaseGame & {
  stateKind: 'completed'
  players: BackgammonPlayersCompleted
  winner: string // player.id of the winning player
}

export type BackgammonGame =
  | BackgammonGameRollingForStart
  | BackgammonGameRolledForStart
  | BackgammonGameRolling
  | BackgammonGameDoubled
  | BackgammonGameMoving
  | BackgammonGameMoved
  | BackgammonGameCompleted

export interface GameProps {
  players: BackgammonPlayers
  board?: BackgammonBoard
  cube?: BackgammonCube
}

export interface GameClass {
  id: string
  stateKind: BackgammonGameStateKind
  players: BackgammonPlayers
  board: BackgammonBoard
  cube: BackgammonCube
  activeColor: BackgammonColor
  activePlay: BackgammonPlay
  activePlayer: BackgammonPlayerActive
  inactivePlayer: BackgammonPlayerInactive
  metadata?: BackgammonGameMetadata
  statistics?: BackgammonGameStatistics
  timing?: BackgammonGameTiming
  version: string
  rules: {
    useCrawfordRule?: boolean
    useJacobyRule?: boolean
    useBeaverRule?: boolean
    useRaccoonRule?: boolean
    useMurphyRule?: boolean
    useHollandRule?: boolean
  }
  settings: {
    allowUndo?: boolean
    allowResign?: boolean
    autoPlay?: boolean
    showHints?: boolean
    showProbabilities?: boolean
  }

  initialize: (
    players: BackgammonPlayers,
    id?: string,
    stateKind?: BackgammonGameStateKind,
    board?: BackgammonBoard,
    cube?: BackgammonCube,
    activePlay?: BackgammonPlay,
    activeColor?: BackgammonColor,
    activePlayer?: BackgammonPlayerActive,
    inactivePlayer?: BackgammonPlayerInactive,
    origin?: BackgammonMoveOrigin,
    metadata?: BackgammonGameMetadata,
    statistics?: BackgammonGameStatistics,
    timing?: BackgammonGameTiming,
    version?: string,
    rules?: {
      useCrawfordRule?: boolean
      useJacobyRule?: boolean
      useBeaverRule?: boolean
      useRaccoonRule?: boolean
      useMurphyRule?: boolean
      useHollandRule?: boolean
    },
    settings?: {
      allowUndo?: boolean
      allowResign?: boolean
      autoPlay?: boolean
      showHints?: boolean
      showProbabilities?: boolean
    }
  ) => BackgammonGame
  rollForStart: (
    game: BackgammonGameRollingForStart
  ) => BackgammonGameRolledForStart
  roll: (
    game:
      | BackgammonGameRolledForStart
      | BackgammonGameRolling
      | BackgammonGameDoubled
  ) => BackgammonGameMoving
  double: (game: BackgammonGameRolling) => BackgammonGameDoubled
  move: (
    game: BackgammonGameMoving,
    origin: BackgammonMoveOrigin
  ) => BackgammonGameMoved
  getActivePlayer: (game: BackgammonGame) => BackgammonPlayerActive
  getInactivePlayer: (game: BackgammonGame) => BackgammonPlayerInactive
  getPlayersForColor: (
    players: BackgammonPlayers,
    color: BackgammonColor
  ) => [BackgammonPlayerActive, BackgammonPlayerInactive]
  sanityCheckMovingGame: (game: BackgammonGame) => BackgammonGameMoving | false
}
