import { BackgammonColor } from './game'
import { BackgammonPlayer } from './player'

// --------------------------------------------------------------------------------------
// Doubling Cube API Request/Response Types
// These types define the contract between CLIENT and API for doubling actions.
// --------------------------------------------------------------------------------------

/**
 * Request to offer a double to the opponent.
 * Sent by the active player before rolling dice.
 */
export interface OfferDoubleRequest {
  gameId: string
  playerId: string
}

/**
 * Response after successfully offering a double.
 * Contains the updated game state with cube in 'offered' state.
 */
export interface OfferDoubleResponse {
  gameId: string
  offeredCubeValue: number
  currentCubeValue: number | undefined
  offeringPlayerId: string
  offeringPlayerColor: BackgammonColor
  targetPlayerId: string
  targetPlayerColor: BackgammonColor
}

/**
 * Request to accept an offered double.
 * Sent by the player who received the double offer.
 */
export interface AcceptDoubleRequest {
  gameId: string
  playerId: string
}

/**
 * Response after successfully accepting a double.
 * Contains the updated game state with new cube value and ownership.
 */
export interface AcceptDoubleResponse {
  gameId: string
  newCubeValue: number
  newCubeOwnerId: string
  newCubeOwnerColor: BackgammonColor
  previousCubeValue: number | undefined
}

/**
 * Request to decline an offered double.
 * Sent by the player who received the double offer.
 * Declining ends the game immediately with the offering player as winner.
 */
export interface DeclineDoubleRequest {
  gameId: string
  playerId: string
}

/**
 * Response after declining a double.
 * Contains the final game state with winner information.
 */
export interface DeclineDoubleResponse {
  gameId: string
  winnerId: string
  winnerColor: BackgammonColor
  finalCubeValue: number
  reason: 'double-declined'
}

// --------------------------------------------------------------------------------------
// WebSocket Event Types for Doubling
// These types define the payload structure for real-time doubling events.
// --------------------------------------------------------------------------------------

export interface DoubleOfferedEvent {
  gameId: string
  offeringPlayerId: string
  offeringPlayerColor: BackgammonColor
  targetPlayerId: string
  targetPlayerColor: BackgammonColor
  currentCubeValue: number | undefined
  offeredCubeValue: number
  timestamp: string
}

export interface DoubleAcceptedEvent {
  gameId: string
  acceptingPlayerId: string
  acceptingPlayerColor: BackgammonColor
  newCubeValue: number
  newCubeOwnerId: string
  timestamp: string
}

export interface DoubleDeclinedEvent {
  gameId: string
  decliningPlayerId: string
  decliningPlayerColor: BackgammonColor
  winnerId: string
  winnerColor: BackgammonColor
  finalCubeValue: number
  timestamp: string
}

/**
 * Union of all doubling WebSocket events
 */
export type DoublingWebSocketEvent =
  | { type: 'double-offered'; payload: DoubleOfferedEvent }
  | { type: 'double-accepted'; payload: DoubleAcceptedEvent }
  | { type: 'double-declined'; payload: DoubleDeclinedEvent }

// --------------------------------------------------------------------------------------
// Doubling Error Types
// Standard error codes for doubling-related failures.
// --------------------------------------------------------------------------------------

export type DoublingErrorCode =
  | 'INVALID_PLAYER'
  | 'INVALID_STATE'
  | 'CUBE_OWNED_BY_OPPONENT'
  | 'CUBE_MAXED'
  | 'NOT_TURN_START'
  | 'ALREADY_OFFERED'
  | 'NO_DOUBLE_TO_ACCEPT'
  | 'NO_DOUBLE_TO_DECLINE'
  | 'CRAWFORD_GAME'

export const DoublingErrorMessages: Record<DoublingErrorCode, string> = {
  INVALID_PLAYER: 'Only the active player can offer doubles',
  INVALID_STATE: 'Cannot offer double in current game state',
  CUBE_OWNED_BY_OPPONENT: 'Cannot offer double - opponent owns the cube',
  CUBE_MAXED: 'Cannot offer double - cube at maximum value (64)',
  NOT_TURN_START: 'Can only offer double at start of turn before rolling',
  ALREADY_OFFERED: 'Double already offered this turn',
  NO_DOUBLE_TO_ACCEPT: 'No double offer to accept',
  NO_DOUBLE_TO_DECLINE: 'No double offer to decline',
  CRAWFORD_GAME: 'Doubling is disabled during Crawford game',
}

export interface DoublingError {
  code: DoublingErrorCode
  message: string
  gameId?: string
  playerId?: string
}

// --------------------------------------------------------------------------------------
// Robot AI Doubling Decision Types (for future AI integration)
// --------------------------------------------------------------------------------------

/**
 * Position evaluation metrics used for doubling decisions
 */
export interface PositionEvaluation {
  winProbability: number // 0-1, probability of winning from current position
  gammonChance: number // 0-1, probability of winning a gammon
  backgammonChance: number // 0-1, probability of winning a backgammon
  loseGammonChance: number // 0-1, probability of losing a gammon
  position: 'winning' | 'losing' | 'even'
  volatility: 'low' | 'medium' | 'high'
  equity: number // Expected value of the position
}

/**
 * Criteria thresholds for making doubling decisions
 */
export interface DoublingCriteria {
  // Offer double thresholds
  minimumWinProbability: number // Typically 0.65-0.70 for money games
  minimumEquityGain: number // Minimum equity gain to justify doubling

  // Accept double thresholds
  minimumTakePoint: number // Typically 0.25 for money games (25% win chance)
  gammonConsideration: number // Factor for gammon risk in take/drop decision

  // Position factors
  volatilityBonus: number // Adjustment for volatile positions
  matchContextMultiplier: number // Adjustment for match play (vs money play)
}

/**
 * Result of robot's doubling decision analysis
 */
export interface DoublingDecision {
  shouldOffer: boolean
  shouldAccept: boolean
  confidence: number // 0-1, confidence in the decision
  reasoning: string // Human-readable explanation
  positionEvaluation: PositionEvaluation
  criteria: DoublingCriteria
}

/**
 * Default criteria for robot doubling decisions (money game defaults)
 */
export const DefaultDoublingCriteria: DoublingCriteria = {
  minimumWinProbability: 0.65,
  minimumEquityGain: 0.15,
  minimumTakePoint: 0.25,
  gammonConsideration: 0.20,
  volatilityBonus: 0.05,
  matchContextMultiplier: 1.0,
}
