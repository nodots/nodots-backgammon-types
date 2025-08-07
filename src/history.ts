import { BackgammonColor, BackgammonGameStateKind } from './game'
import { BackgammonDieValue } from './dice'
import { BackgammonMoveKind } from './move'

/**
 * Comprehensive game history tracking for Nodots Backgammon
 * Enables game reconstruction, move analysis, and XG format compatibility
 */

export interface GameHistoryAction {
  id: string
  gameId: string
  sequenceNumber: number
  timestamp: Date
  playerId: string
  actionType: GameActionType
  actionData: GameActionData
  gameStateBefore: GameStateSnapshot
  gameStateAfter: GameStateSnapshot
  metadata?: GameActionMetadata
}

export interface GameActionMetadata {
  duration?: number // milliseconds taken for action
  undoable?: boolean
  difficulty?: 'beginner' | 'intermediate' | 'advanced' // for robot moves
  gnuPositionId?: string // GNU Backgammon position ID
  moveNumber?: number // move number in the game
  isForced?: boolean // if this was the only legal move
}

export type GameActionType = 
  | 'roll-for-start'
  | 'roll-dice'
  | 'switch-dice'
  | 'make-move'
  | 'confirm-turn'
  | 'offer-double'
  | 'accept-double'
  | 'decline-double'
  | 'resign'
  | 'undo-move'
  | 'auto-pass'
  | 'timeout'

export interface GameActionData {
  rollForStart?: RollForStartAction
  rollDice?: RollDiceAction
  switchDice?: SwitchDiceAction
  makeMove?: MakeMoveAction
  confirmTurn?: ConfirmTurnAction
  offerDouble?: OfferDoubleAction
  acceptDouble?: AcceptDoubleAction
  declineDouble?: DeclineDoubleAction
  resign?: ResignAction
  undoMove?: UndoMoveAction
  autoPass?: AutoPassAction
  timeout?: TimeoutAction
}

export interface RollForStartAction {
  dieValue: BackgammonDieValue
}

export interface RollDiceAction {
  dice: [BackgammonDieValue, BackgammonDieValue]
  isDouble: boolean
}

export interface SwitchDiceAction {
  fromOrder: [BackgammonDieValue, BackgammonDieValue]
  toOrder: [BackgammonDieValue, BackgammonDieValue]
}

export interface MakeMoveAction {
  checkerId: string
  originPosition: number | 'bar' | 'off'
  destinationPosition: number | 'bar' | 'off'  
  dieValue: BackgammonDieValue
  isHit: boolean
  moveKind: BackgammonMoveKind
  hitCheckerId?: string // ID of checker that was hit
}

export interface ConfirmTurnAction {
  allMovesCompleted: boolean
  remainingMoves?: number
  forcedPass?: boolean // when no legal moves available
}

export interface OfferDoubleAction {
  fromValue: number
  toValue: number
  cubeOwner?: BackgammonColor
}

export interface AcceptDoubleAction {
  cubeValue: number
  newOwner: BackgammonColor
}

export interface DeclineDoubleAction {
  cubeValue: number
  decliningPlayer: BackgammonColor
}

export interface ResignAction {
  reason?: 'voluntary' | 'timeout' | 'connection-lost'
  points: number // points awarded to winner
}

export interface UndoMoveAction {
  moveSequenceNumber: number
  undoType: 'single-move' | 'full-turn'
}

export interface AutoPassAction {
  reason: 'no-legal-moves' | 'all-checkers-off'
}

export interface TimeoutAction {
  timeoutType: 'move' | 'turn' | 'game'
  remainingTime: number
}

/**
 * Complete snapshot of game state at a point in time
 * Enables perfect reconstruction of any game position
 */
export interface GameStateSnapshot {
  stateKind: BackgammonGameStateKind
  activeColor: BackgammonColor
  turnNumber: number
  moveNumber: number
  
  boardPositions: BoardPositionSnapshot
  diceState: DiceStateSnapshot
  cubeState: CubeStateSnapshot
  playerStates: PlayerStatesSnapshot
  
  // Performance optimization: pre-calculated values
  pipCounts: Record<BackgammonColor, number>
  
  // GNU Backgammon compatibility
  gnuPositionId?: string
  gnuMatchId?: string
}

export interface BoardPositionSnapshot {
  points: {
    [position: string]: CheckerSnapshot[] // '1-24'
  }
  bar: Record<BackgammonColor, CheckerSnapshot[]>
  off: Record<BackgammonColor, CheckerSnapshot[]>
}

export interface CheckerSnapshot {
  id: string
  color: BackgammonColor
  position: number | 'bar' | 'off'
}

export type DiceStateSnapshot = {
  [color in BackgammonColor]: {
    currentRoll?: [BackgammonDieValue, BackgammonDieValue]
    availableMoves: BackgammonDieValue[]
    usedMoves: BackgammonDieValue[]
    stateKind: 'inactive' | 'rolling' | 'rolled' | 'moving' | 'completed'
  }
}

export interface CubeStateSnapshot {
  value: number
  owner?: BackgammonColor
  stateKind: 'centered' | 'offered' | 'doubled' | 'maxed'
  position: 'center' | BackgammonColor
}

export type PlayerStatesSnapshot = {
  [color in BackgammonColor]: {
    pipCount: number
    stateKind: string
    isRobot: boolean
    userId: string
    timeRemaining?: number
    movesThisTurn: number
    totalMoves: number
    canBearOff: boolean
    hasCheckersOnBar: boolean
  }
}

/**
 * Complete game history with metadata and analysis
 */
export interface GameHistory {
  gameId: string
  createdAt: Date
  updatedAt: Date
  actions: GameHistoryAction[]
  metadata: GameHistoryMetadata
  analysis?: GameHistoryAnalysis
}

export interface GameHistoryMetadata {
  totalActions: number
  gameStartTime: Date
  gameEndTime?: Date
  gameDuration?: number // milliseconds
  
  finalResult?: GameResult
  players: GamePlayerInfo
  
  matchInfo?: MatchInfo
  settings: GameSettings
  
  // Performance metrics
  averageActionDuration: number
  totalThinkingTime: number
  
  // Data integrity
  version: string // history format version
  checksum?: string // for data verification
}

export interface GameResult {
  winner: BackgammonColor
  loser: BackgammonColor
  points: number
  reason: 'checkmate' | 'resignation' | 'timeout' | 'gammon' | 'backgammon'
  finalCubeValue: number
}

export type GamePlayerInfo = {
  [color in BackgammonColor]: {
    userId: string
    nickname?: string
    isRobot: boolean
    skillLevel?: string
    rating?: number
    robotDifficulty?: 'beginner' | 'intermediate' | 'advanced'
  }
}

export interface MatchInfo {
  matchId: string
  gameNumber: number
  matchLength: number
  matchScore: Record<BackgammonColor, number>
  isCrawford?: boolean
}

export interface GameSettings {
  timeLimit?: number
  doubleAllowed: boolean
  beaverAllowed: boolean
  jacobyRule: boolean
  autoDoubleLimit?: number
  matchPlay: boolean
}

/**
 * Analysis results for game history
 */
export interface GameHistoryAnalysis {
  gameId: string
  analyzedAt: Date
  version: string
  
  playerAnalysis: Record<BackgammonColor, PlayerAnalysis>
  
  gameQuality: GameQualityMetrics
  criticalMoments: CriticalMoment[]
  patterns: GamePattern[]
}

export interface PlayerAnalysis {
  userId: string
  color: BackgammonColor
  
  moveAnalysis: MoveAnalysis
  cubeAnalysis: CubeAnalysis
  timeAnalysis: TimeAnalysis
  
  skillAssessment: SkillAssessment
  improvementSuggestions: ImprovementSuggestion[]
}

export interface MoveAnalysis {
  totalMoves: number
  blunders: number
  mistakes: number
  goodMoves: number
  excellentMoves: number
  
  averageError: number // in equity points
  worstMoves: WorstMove[]
  
  patterns: {
    commonMistakes: string[]
    strengths: string[]
    weaknesses: string[]
  }
}

export interface CubeAnalysis {
  totalCubeDecisions: number
  correctDoubles: number
  missedDoubles: number
  wrongDoubles: number
  correctTakes: number
  wrongTakes: number
  correctPasses: number
  wrongPasses: number
  
  cubeError: number // in equity points
  cubeEfficiency: number // percentage
}

export interface TimeAnalysis {
  averageMoveTime: number
  longestMoveTime: number
  shortestMoveTime: number
  totalThinkingTime: number
  
  timeDistribution: {
    quick: number // < 5 seconds
    normal: number // 5-30 seconds  
    slow: number // 30-120 seconds
    veryLong: number // > 120 seconds
  }
}

export interface SkillAssessment {
  estimatedRating: number
  confidence: number // 0-1
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  
  strengths: string[]
  weaknesses: string[]
  
  comparison: {
    betterThan: number // percentage of players
    skillTrend: 'improving' | 'stable' | 'declining'
  }
}

export interface ImprovementSuggestion {
  category: 'movement' | 'cube' | 'timing' | 'strategy'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  examples: string[]
  resources?: string[] // links to learning materials
}

export interface GameQualityMetrics {
  overallQuality: number // 0-100 score
  complexity: number // 0-100 score  
  competitiveness: number // how close the game was
  
  keyStats: {
    totalMoves: number
    gameLength: number
    cubeActions: number
    lead: number // largest lead during game
  }
}

export interface CriticalMoment {
  actionId: string
  sequenceNumber: number
  momentType: 'blunder' | 'great-move' | 'cube-decision' | 'game-winner'
  description: string
  equitySwing: number // change in winning probability
  alternativePlay?: string
}

export interface WorstMove {
  actionId: string
  sequenceNumber: number
  actualMove: string
  bestMove: string
  errorMagnitude: number // equity points lost
  description: string
}

export interface GamePattern {
  patternType: 'opening' | 'middle-game' | 'race' | 'endgame' | 'cube'
  description: string
  frequency: number
  playerColors: BackgammonColor[]
  examples: string[] // position descriptions or moves
}

/**
 * XG Format compatibility interfaces
 */
export interface XGGameHeader {
  match: XGMatchInfo
  game: XGGameInfo
  players: XGPlayerInfo[]
}

export interface XGMatchInfo {
  length: number
  score: [number, number]
  crawford: boolean
  cube: number
}

export interface XGGameInfo {
  number: number
  initial: boolean
  cube: number
  dice: [number, number]
}

export interface XGPlayerInfo {
  name: string
  rating?: number
  experience?: number
}

export interface XGPosition {
  board: number[][] // 26 points, bar at 0 and 25
  turn: 0 | 1 // 0 for player 1, 1 for player 2  
  dice: [number, number]
  cube: number
  cubeOwner: 0 | 1 | -1 // -1 for centered
  canDouble: [boolean, boolean]
  score: [number, number]
  matchLength: number
  crawford: boolean
}

/**
 * History query and filter interfaces
 */
export interface HistoryQuery {
  gameId?: string
  userId?: string
  dateRange?: {
    start: Date
    end: Date
  }
  actionTypes?: GameActionType[]
  playerColors?: BackgammonColor[]
  gameResults?: ('win' | 'loss' | 'ongoing')[]
  limit?: number
  offset?: number
  sortBy?: 'timestamp' | 'sequenceNumber' | 'duration'
  sortOrder?: 'asc' | 'desc'
}

export interface HistoryFilter {
  includeRobotGames?: boolean
  includeMatchGames?: boolean
  minGameLength?: number
  maxGameLength?: number
  cubeValueRange?: [number, number]
  skillLevelRange?: ['beginner' | 'intermediate' | 'advanced']
}

/**
 * Reconstruction and replay interfaces
 */
export interface GameReconstructionOptions {
  sequenceNumber?: number // reconstruct up to this action
  includeAnalysis?: boolean // include move analysis
  format?: 'full' | 'compact' | 'xg' // output format
  validateIntegrity?: boolean // verify data consistency
}

export interface ReplayEvent {
  type: 'action' | 'state-change' | 'analysis'
  timestamp: Date
  data: GameHistoryAction | GameStateSnapshot | GameHistoryAnalysis
}

export interface ReplayOptions {
  speed?: number // 1.0 = normal speed
  startFrom?: number // sequence number to start from
  endAt?: number // sequence number to end at
  includeAnalysis?: boolean
  showAlternatives?: boolean // show alternative moves
}

/**
 * Export and import interfaces
 */
export interface ExportOptions {
  format: 'json' | 'xg' | 'mat' | 'sgf'
  includeAnalysis?: boolean
  includeMetadata?: boolean
  compression?: 'none' | 'gzip' | 'brotli'
}

export interface ImportOptions {
  format: 'json' | 'xg' | 'mat' | 'sgf'
  validateFormat?: boolean
  createAnalysis?: boolean
  preserveIds?: boolean // keep original IDs if present
}

export interface ImportResult {
  success: boolean
  gameHistory?: GameHistory
  errors: string[]
  warnings: string[]
  metadata: {
    originalFormat: string
    importedAt: Date
    version: string
  }
}