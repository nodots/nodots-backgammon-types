import type { BackgammonColor } from './game'
import type { BackgammonDieValue } from './dice'
import type { BackgammonGame } from './game'

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

export type GameActionData = Record<string, unknown>

export interface GameActionMetadata {
  duration?: number
  undoable?: boolean
  difficulty?: string
  gnuPositionId?: string
  moveNumber?: number
  isForced?: boolean
  robotId?: string
  additionalData?: Record<string, unknown>
  [key: string]: unknown
}

export interface CheckerSnapshot {
  id: string
  color: BackgammonColor
  position: number | 'bar' | 'off'
}

export interface BoardPositionSnapshot {
  points: Record<string, CheckerSnapshot[]>
  bar: { black: CheckerSnapshot[]; white: CheckerSnapshot[] }
  off: { black: CheckerSnapshot[]; white: CheckerSnapshot[] }
}

export interface DicePlayerSnapshot {
  currentRoll?: [BackgammonDieValue, BackgammonDieValue]
  availableMoves: BackgammonDieValue[]
  usedMoves: BackgammonDieValue[]
  stateKind: string
}

export interface DiceStateSnapshot {
  black: DicePlayerSnapshot
  white: DicePlayerSnapshot
}

export interface CubeStateSnapshot {
  value: number
  owner?: BackgammonColor
  stateKind: 'centered' | 'offered' | 'doubled' | 'maxed'
  position: BackgammonColor | 'center'
}

export interface PlayerStateSnapshot {
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

export interface PlayerStatesSnapshot {
  black: PlayerStateSnapshot
  white: PlayerStateSnapshot
}

export interface GameStateSnapshot {
  stateKind: BackgammonGame['stateKind']
  activeColor: BackgammonColor
  turnNumber: number
  moveNumber: number
  boardPositions: BoardPositionSnapshot
  diceState: DiceStateSnapshot
  cubeState: CubeStateSnapshot
  playerStates: PlayerStatesSnapshot
  pipCounts: { black: number; white: number }
  gnuPositionId?: string
}

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

export interface PlayerHistoryMetadata {
  userId: string
  isRobot: boolean
}

export interface GameHistoryMetadata {
  totalActions: number
  gameStartTime: Date
  players: {
    black: PlayerHistoryMetadata
    white: PlayerHistoryMetadata
  }
  settings: {
    doubleAllowed: boolean
    beaverAllowed: boolean
    jacobyRule: boolean
    matchPlay: boolean
  }
  averageActionDuration: number
  totalThinkingTime: number
  version: string
}

export interface GameHistory {
  gameId: string
  createdAt: Date
  updatedAt: Date
  actions: GameHistoryAction[]
  metadata: GameHistoryMetadata
}

export interface GameReconstructionOptions {
  validateIntegrity?: boolean
}
