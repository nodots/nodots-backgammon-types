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