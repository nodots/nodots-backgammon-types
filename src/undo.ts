import { BackgammonMove, BackgammonChecker, BackgammonBoard } from './index'

export interface UndoMoveRequest {
  playerId: string
}

export interface UndoMoveResponse {
  success: boolean
  message?: string
  error?: string
  game?: any
  undoneMove?: any
  remainingMoveHistory?: any[]
}

export interface UndoEnabledMove extends Omit<BackgammonMove, 'stateKind'> {
  stateKind: 'ready' | 'in-progress' | 'completed'
  moveHistory?: {
    previousBoardState: string // gnuPositionId
    hitCheckers?: BackgammonChecker[]
    executionTimestamp: string
    undoMetadata?: {
      canUndo: boolean
      undoChainIndex: number
      originalMoveId: string
    }
  }
  undoChainIndex?: number
}

export interface CompressedBoardState {
  points: Array<{
    position: { clockwise: number; counterclockwise: number }
    checkerCount: number
    checkerColor?: 'white' | 'black'
  }>
  bar: {
    white: number
    black: number
  }
  off: {
    white: number
    black: number
  }
  checksum?: string
}

export interface UndoStateUpdate {
  canUndo: boolean
  undoStackDepth: number
  boardChecksum: string
  lastMoveTimestamp?: string
}

export interface UndoConfiguration {
  enabled: boolean
  allowUndoAfterDoubling: boolean
  allowUndoInTournamentMode: boolean
}