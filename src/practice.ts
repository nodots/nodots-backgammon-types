import type { BackgammonColor, BackgammonMoveDirection } from './game'

export type PracticeBoardLocation =
  | 'bearingOff'
  | 'homeInner'
  | 'outerBoard'
  | 'opponentOuter'
  | 'opponentInner'
  | 'opponentBearing'
  | 'bar'
  | 'off'

export type PracticeGamePhase =
  | 'opening'
  | 'middlegame'
  | 'bearingOff'
  | 'endgameRace'

export type PracticeErrorSeverity = 'doubtful' | 'error' | 'blunder' | 'veryBad'

export interface PracticeMove {
  from: number
  to: number
}

export interface PracticeExercise {
  exerciseId: string
  sourceGameId: string
  sourceSequenceNumber: number
  positionId: string
  dice: [number, number]
  activePlayerColor: BackgammonColor
  activePlayerDirection: BackgammonMoveDirection
  playerMovePlayed: PracticeMove[]
  bestMove: PracticeMove[]
  equityLoss: number
  errorSeverity: PracticeErrorSeverity
  boardLocation: PracticeBoardLocation
  gamePhase: PracticeGamePhase
}

export interface PracticeAttempt {
  attemptNumber: 1 | 2 | 3
  moveChosen: PracticeMove[]
  wasCorrect: boolean
  equityLoss: number
  hintsUsed: number
  durationMs: number
}

export type PracticeHintLevel = 1 | 2 | 3

export type PracticeHintContent =
  | {
      level: 1
      areaDescription: string
      boardLocation: PracticeBoardLocation
    }
  | {
      level: 2
      sourcePoints: number[]
      areaDescription: string
    }
  | {
      level: 3
      bestMove: PracticeMove[]
      bestEquity: number
      moveEquities: Array<{
        move: PracticeMove[]
        equity: number
      }>
    }

export interface PracticeHint {
  level: PracticeHintLevel
  content: PracticeHintContent
}

export interface PracticeExerciseQueueItem {
  exercise: PracticeExercise
  previousAttempts: PracticeAttempt[]
  solvedCorrectlyOnFirstTry: boolean
}

export interface PracticeAttemptResult {
  wasCorrect: boolean
  equityLoss: number
  equityOfChoice: number
  bestEquity: number
  matchedRank: number | null
  bestMove: PracticeMove[]
  playerOriginalMove: PracticeMove[]
}

export interface PracticeLocationProgress {
  totalExercises: number
  totalAttempts: number
  correctFirstTry: number
  totalHintsUsed: number
}

export interface PracticePhaseProgress {
  totalExercises: number
  totalAttempts: number
  correctFirstTry: number
  totalHintsUsed: number
}

export interface PracticeProgressSummary {
  userId: string
  totalExercises: number
  totalAttempts: number
  correctFirstTry: number
  totalHintsUsed: number
  accuracyRate: number
  averageHintsUsed: number
  byBoardLocation: Record<PracticeBoardLocation, PracticeLocationProgress>
  byGamePhase: Record<PracticeGamePhase, PracticePhaseProgress>
  lastPracticedAt: string | null
}

export interface PracticeExerciseFilters {
  severity?: PracticeErrorSeverity
  boardLocation?: PracticeBoardLocation
  gamePhase?: PracticeGamePhase
  excludeCompleted?: boolean
}
