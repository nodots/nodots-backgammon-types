import { BackgammonGame } from './game'

// ========================================
// Base WebSocket Message Types
// ========================================

/**
 * Base interface for all WebSocket messages
 */
export interface WebSocketMessage<T = any> {
  type: string
  gameId?: string
  playerId?: string
  timestamp: string
  data: T
  messageId?: string
  version?: string
}

/**
 * Standard WebSocket response wrapper
 */
export interface WebSocketResponse<T = any> {
  success: boolean
  data?: T
  error?: WebSocketError
  messageId?: string
  timestamp: string
}

// ========================================
// WebSocket Event Types
// ========================================

/**
 * All possible WebSocket message types
 */
export type WebSocketMessageType =
  // Connection Management
  | 'CONNECT'
  | 'DISCONNECT'
  | 'AUTHENTICATE'
  | 'AUTHENTICATION_SUCCESS'
  | 'AUTHENTICATION_FAILED'

  // Game Management
  | 'GAME_JOIN'
  | 'GAME_LEAVE'
  | 'GAME_STATE_REQUEST'
  | 'GAME_STATE_UPDATE'
  | 'GAME_CREATED'
  | 'GAME_DELETED'
  | 'GAME_STARTED'
  | 'GAME_FINISHED'
  | 'GAME_PAUSED'
  | 'GAME_RESUMED'

  // Move Management
  | 'MOVE_REQUEST'
  | 'MOVE_EXECUTE'
  | 'MOVE_EXECUTED'
  | 'MOVE_INVALID'
  | 'POSSIBLE_MOVES_REQUEST'
  | 'POSSIBLE_MOVES_RESPONSE'

  // Cube Actions
  | 'CUBE_DOUBLE'
  | 'CUBE_ACCEPT'
  | 'CUBE_DECLINE'
  | 'CUBE_ACTION_EXECUTED'

  // Turn Management
  | 'TURN_START'
  | 'TURN_END'
  | 'TURN_TIMEOUT'
  | 'DICE_ROLL'
  | 'DICE_ROLLED'

  // Player Management
  | 'PLAYER_JOIN'
  | 'PLAYER_LEAVE'
  | 'PLAYER_READY'
  | 'PLAYER_NOT_READY'
  | 'PLAYER_TIMEOUT'

  // Simulation & AI
  | 'SIMULATION_START'
  | 'SIMULATION_UPDATE'
  | 'SIMULATION_COMPLETE'
  | 'AI_ANALYSIS_REQUEST'
  | 'AI_ANALYSIS_RESPONSE'

  // Error Handling
  | 'ERROR'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMIT_EXCEEDED'

  // System
  | 'PING'
  | 'PONG'
  | 'HEARTBEAT'

// ========================================
// Game Event Interfaces
// ========================================

/**
 * Game state update event data
 */
export interface GameStateUpdate {
  game: BackgammonGame
  lastMove?: any
  activePlayer?: any
  gameStatus: 'waiting' | 'playing' | 'finished' | 'paused'
  turnTimeRemaining?: number
}

/**
 * Move execution event data
 */
export interface MoveExecution {
  move: any
  playerId: string
  gameState: BackgammonGame
  isValid: boolean
  validationError?: string
}

/**
 * Cube action event data
 */
export interface CubeActionEvent {
  action: any
  playerId: string
  gameState: BackgammonGame
  isValid: boolean
  validationError?: string
}

/**
 * Dice roll event data
 */
export interface DiceRollEvent {
  dice: any
  playerId: string
  gameId: string
  rollType: 'normal' | 'opening' | 'reroll'
}

/**
 * Player join/leave event data
 */
export interface PlayerEvent {
  player: any
  gameId: string
  action: 'join' | 'leave' | 'ready' | 'not_ready' | 'timeout'
}

/**
 * Turn management event data
 */
export interface TurnEvent {
  playerId: string
  gameId: string
  turnType: 'start' | 'end' | 'timeout'
  timeRemaining?: number
  diceRoll?: any
}

/**
 * Simulation event data
 */
export interface SimulationEvent {
  simulationId: string
  gameId: string
  status: 'running' | 'completed' | 'failed'
  progress?: number
  gameState?: BackgammonGame
  results?: any
}

/**
 * AI analysis event data
 */
export interface AIAnalysisEvent {
  gameId: string
  analysisId: string
  moves: any[]
  evaluation: {
    equity: number
    winProbability: number
    gammonProbability: number
    backgammonProbability: number
  }
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

// ========================================
// Connection State Types
// ========================================

/**
 * WebSocket connection state
 */
export interface WebSocketConnectionState {
  isConnected: boolean
  isConnecting: boolean
  isAuthenticated: boolean
  reconnectAttempts: number
  maxReconnectAttempts: number
  lastError?: string
  lastConnectedAt?: string
  lastDisconnectedAt?: string
  connectionId?: string
  latency?: number
}

/**
 * Connection quality metrics
 */
export interface ConnectionQuality {
  latency: number
  jitter: number
  packetLoss: number
  quality: 'excellent' | 'good' | 'fair' | 'poor'
  lastMeasured: string
}

/**
 * Room management state
 */
export interface RoomState {
  roomId: string
  gameId?: string
  connectedUsers: string[]
  maxUsers: number
  isPrivate: boolean
  createdAt: string
}

// ========================================
// Authentication Types
// ========================================

/**
 * WebSocket authentication payload
 */
export interface WebSocketAuthPayload {
  token: string
  userId?: string
  gameId?: string
  reconnectId?: string
}

/**
 * Authentication success response
 */
export interface AuthenticationSuccess {
  userId: string
  connectionId: string
  permissions: string[]
  expiresAt: string
}

/**
 * Authentication failure response
 */
export interface AuthenticationFailure {
  reason: 'invalid_token' | 'expired_token' | 'unauthorized' | 'rate_limited'
  message: string
  retryAfter?: number
}

// ========================================
// Error Handling Types
// ========================================

/**
 * WebSocket error types
 */
export interface WebSocketError {
  code: string
  message: string
  details?: any
  timestamp: string
  retryable: boolean
  retryAfter?: number
}

/**
 * Validation error details
 */
export interface ValidationError {
  field: string
  message: string
  value?: any
  code: string
}

/**
 * Rate limiting error
 */
export interface RateLimitError {
  limit: number
  remaining: number
  resetTime: string
  retryAfter: number
}

// ========================================
// Message Payload Types
// ========================================

/**
 * Game join request payload
 */
export interface GameJoinPayload {
  gameId: string
  playerId?: string
  spectatorMode?: boolean
}

/**
 * Move request payload
 */
export interface MoveRequestPayload {
  gameId: string
  playerId: string
  requestPossibleMoves?: boolean
}

/**
 * Move execution payload
 */
export interface MoveExecutionPayload {
  gameId: string
  playerId: string
  move: any
}

/**
 * Cube action payload
 */
export interface CubeActionPayload {
  gameId: string
  playerId: string
  action: any
}

/**
 * Simulation start payload
 */
export interface SimulationStartPayload {
  player1: any
  player2: any
  numberOfGames: number
  pointsToWin: number
  simulationId?: string
}

// ========================================
// Configuration Types
// ========================================

/**
 * WebSocket client configuration
 */
export interface WebSocketClientConfig {
  url: string
  autoReconnect: boolean
  maxReconnectAttempts: number
  reconnectInterval: number
  timeout: number
  enableHeartbeat: boolean
  heartbeatInterval: number
  enableCompression: boolean
  authToken?: string
}

/**
 * WebSocket server configuration
 */
export interface WebSocketServerConfig {
  port: number
  cors: {
    origin: string[]
    credentials: boolean
  }
  rateLimit: {
    windowMs: number
    max: number
  }
  compression: boolean
  pingTimeout: number
  pingInterval: number
  maxConnections: number
}

// ========================================
// Utility Types
// ========================================

/**
 * WebSocket message with typed data
 */
export type TypedWebSocketMessage<
  T extends WebSocketMessageType,
  D = any
> = WebSocketMessage<D> & {
  type: T
}

/**
 * WebSocket event handler type
 */
export type WebSocketEventHandler<T = any> = (data: T) => void | Promise<void>

/**
 * WebSocket middleware function type
 */
export type WebSocketMiddleware = (
  message: WebSocketMessage,
  next: () => void
) => void | Promise<void>

/**
 * Connection status enumeration
 */
export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  AUTHENTICATED = 'authenticated',
  ERROR = 'error',
  RECONNECTING = 'reconnecting',
}

/**
 * Message priority levels
 */
export enum MessagePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// ========================================
// Exported Type Guards
// ========================================

/**
 * Type guard for WebSocket messages
 */
export function isWebSocketMessage(obj: any): obj is WebSocketMessage {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.type === 'string' &&
    typeof obj.timestamp === 'string'
  )
}

/**
 * Type guard for WebSocket responses
 */
export function isWebSocketResponse(obj: any): obj is WebSocketResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.success === 'boolean' &&
    typeof obj.timestamp === 'string'
  )
}

/**
 * Type guard for WebSocket errors
 */
export function isWebSocketError(obj: any): obj is WebSocketError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.code === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.retryable === 'boolean'
  )
}
