import { BackgammonGame } from './game'
import { BackgammonPlayer } from './player'

// Game outcome types for scoring
export type BackgammonGameOutcome = 'normal' | 'gammon' | 'backgammon'

// Scoring multipliers for each outcome
export const GAME_OUTCOME_POINTS: Record<BackgammonGameOutcome, number> = {
  normal: 1,
  gammon: 2,
  backgammon: 3,
} as const

// Game completion details returned when a game ends
export interface BackgammonGameCompletionDetails {
  winnerId: string
  winnerColor: 'black' | 'white'
  outcome: BackgammonGameOutcome
  basePoints: number // 1, 2, or 3
  cubeValue: number // Current cube value
  finalScore: number // basePoints * cubeValue
}

// Event broadcast when game completes
export interface BackgammonGameCompletedEvent {
  gameId: string
  winnerId: string
  winnerColor: 'black' | 'white'
  outcome: BackgammonGameOutcome
  basePoints: number
  cubeValue: number
  finalScore: number
  matchId?: string
  newMatchScore?: [number, number]
}
