import { BackgammonBoard } from './board'
import { BackgammonMoveOrigin } from './checkercontainer'
import { BackgammonCube } from './cube'
import {
  BackgammonPlay,
  BackgammonPlayDoubled,
  BackgammonPlayMoving,
  BackgammonPlayRolled,
} from './play'
import {
  BackgammonPlayer,
  BackgammonPlayerActive,
  BackgammonPlayerDoubled,
  BackgammonPlayerInactive,
  BackgammonPlayerMoving,
  BackgammonPlayerRolled,
  BackgammonPlayerRolledForStart,
  BackgammonPlayerRolling,
  BackgammonPlayerRollingForStart,
  BackgammonPlayers,
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
  | 'rolled'
  | 'preparing-move'
  | 'doubling'
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
  players: BackgammonPlayers
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
  gnuPositionId: string
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
    allowDraw?: boolean
    autoPlay?: boolean
    showHints?: boolean
    showProbabilities?: boolean
  }
}

interface Game extends BaseGame {
  stateKind: BackgammonGameStateKind
}

export type BackgammonGameRollingForStart = Game & {
  stateKind: 'rolling-for-start'
  activePlayer: BackgammonPlayerRollingForStart
  inactivePlayer: BackgammonPlayerRollingForStart
}

export type BackgammonGameRolledForStart = Game & {
  stateKind: 'rolled-for-start'
  activeColor: BackgammonColor
  activePlayer: BackgammonPlayerRolledForStart
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameRolling = Game & {
  stateKind: 'rolling'
  activeColor: BackgammonColor
  activePlayer: BackgammonPlayerRolling
  inactivePlayer: BackgammonPlayerInactive
}

// Changed activePlayer to BackgammonPlayerRolled
export type BackgammonGameRolled = Game & {
  stateKind: 'rolled'
  activeColor: BackgammonColor
  activePlayer: BackgammonPlayerRolled
  inactivePlayer: BackgammonPlayerInactive
  activePlay: BackgammonPlayRolled
}

export type BackgammonGamePreparingMove = Game & {
  stateKind: 'preparing-move'
  activeColor: BackgammonColor
  activePlayer: BackgammonPlayerRolled
  inactivePlayer: BackgammonPlayerInactive
  activePlay: BackgammonPlayRolled
}

export type BackgammonGameDoubling = Game & {
  stateKind: 'doubling'
  activeColor: BackgammonColor
  activePlay: BackgammonPlayDoubled
  activePlayer: BackgammonPlayerDoubled
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameDoubled = Game & {
  stateKind: 'doubled'
  activeColor: BackgammonColor
  activePlay: BackgammonPlayDoubled
  activePlayer: BackgammonPlayerDoubled
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameMoving = Game & {
  stateKind: 'moving'
  activeColor: BackgammonColor
  activePlay: BackgammonPlayMoving
  activePlayer: BackgammonPlayerMoving
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameMoved = Game & {
  stateKind: 'moved'
  activeColor: BackgammonColor
  activePlay: BackgammonPlayMoving
  activePlayer: BackgammonPlayerMoving
  inactivePlayer: BackgammonPlayerInactive
}

export type BackgammonGameCompleted = Game & {
  stateKind: 'completed'
  winner: string // player.id of the winning player
}

export type BackgammonGame =
  | BackgammonGameRollingForStart
  | BackgammonGameRolledForStart
  | BackgammonGameRolling
  | BackgammonGameRolled
  | BackgammonGamePreparingMove
  | BackgammonGameDoubling
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
    allowDraw?: boolean
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
      allowDraw?: boolean
      autoPlay?: boolean
      showHints?: boolean
      showProbabilities?: boolean
    }
  ) => BackgammonGame
  rollForStart: (
    game: BackgammonGameRollingForStart
  ) => BackgammonGameRolledForStart
  roll: (game: BackgammonGameRolledForStart) => BackgammonGameRolled
  /**
   * Transition from rolled to preparing-move state when a move is selected
   */
  prepareMove: (game: BackgammonGameRolled) => BackgammonGamePreparingMove
  /**
   * This is a pseudo state transition. The user transitions into a "moving" state when they
   * click on a checker (rather than the cube). But the instant they click the
   * checker they are in a moved state.
   * v3.1.0 BREAKING CHANGE: Now only accepts preparing-move or doubled states
   * TODO v3.2.0: Remove any remaining backward compatibility shims for old state transitions
   */
  toMoving: (
    game: BackgammonGamePreparingMove | BackgammonGameDoubled
  ) => BackgammonGameMoving
  /**
   * This is another pseudo state transition. Argument for this is weaker.
   * v3.1.0 BREAKING CHANGE: Now only accepts preparing-move states
   * TODO v3.2.0: Remove any remaining backward compatibility shims for old state transitions
   */
  toDoubling: (game: BackgammonGamePreparingMove) => BackgammonGameDoubling
  double: (game: BackgammonGameDoubling) => BackgammonGameDoubled
  move: (
    game: BackgammonGameMoving | BackgammonGameRolled,
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
