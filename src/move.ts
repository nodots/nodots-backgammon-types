import { BackgammonBoard } from '.';
import {
  BackgammonCheckercontainer,
  BackgammonMoveDestination,
  BackgammonMoveOrigin,
  BackgammonPoint,
} from './checkercontainer';
import { BackgammonDieValue } from './dice';
import { BackgammonMoveDirection } from './game';
import { BackgammonPlayMoving } from './play';
import {
  BackgammonPlayer,
  BackgammonPlayerActive,
  BackgammonPlayerMoving,
  BackgammonPlayerRolled,
} from './player';

export type BackgammonMoveStateKind =
  | 'ready'
  | 'in-progress'
  | 'completed'
  | 'confirmed';

export type BackgammonMoveKind =
  | 'no-move'
  | 'point-to-point'
  | 'reenter'
  | 'bear-off';

export type BackgammonMoveSkeleton = {
  dieValue: BackgammonDieValue;
  direction: BackgammonMoveDirection;
  origin: BackgammonMoveOrigin;
  destination: BackgammonMoveDestination;
};

type BaseMove = {
  id: string;
  player: BackgammonPlayerActive;
  stateKind: BackgammonMoveStateKind;
  dieValue: BackgammonDieValue;
  possibleMoves: BackgammonMoveSkeleton[];
  moveKind?: BackgammonMoveKind;
  isHit?: boolean;
  origin?: BackgammonMoveOrigin;
  destination?: BackgammonMoveDestination;
};

type Move = BaseMove & {
  stateKind: BackgammonMoveStateKind;
};

export type BackgammonMoveReady = Move & {
  stateKind: 'ready';
  player: BackgammonPlayerRolled;
  dieValue: BackgammonDieValue;
};

export type BackgammonMoveInProgress = Move & {
  stateKind: 'in-progress';
  moveKind: BackgammonMoveKind;
  player: BackgammonPlayerMoving;
  dieValue: BackgammonDieValue;
  origin: BackgammonMoveOrigin;
  destination: BackgammonMoveDestination;
};

export type BackgammonMoveCompleted = Move & {
  stateKind: 'completed';
  moveKind: BackgammonMoveKind;
  origin: BackgammonMoveOrigin;
  destination: BackgammonMoveDestination;
};

export type BackgammonMoveConfirmed = Move & {
  stateKind: 'confirmed';
  moveKind: BackgammonMoveKind;
  origin: BackgammonMoveOrigin;
  destination: BackgammonMoveDestination;
};

export type BackgammonMoveNoMove = Move & {
  stateKind: 'completed';
  moveKind: 'no-move';
};

export type BackgammonMove =
  | BackgammonMoveReady
  | BackgammonMoveInProgress
  | BackgammonMoveCompleted
  | BackgammonMoveConfirmed
  | BackgammonMoveNoMove;

export type BackgammonMoves =
  | [BackgammonMove, BackgammonMove]
  | [BackgammonMove, BackgammonMove, BackgammonMove, BackgammonMove];

export type BackgammonMoveResult = {
  board: BackgammonBoard;
  move: BackgammonMoveCompleted;
};

export type BackgammonMoveDryRunResult = {
  board: BackgammonBoard;
  move: BackgammonMoveReady;
};

export interface MoveProps {
  move: BackgammonMove;
  origin: BackgammonMoveOrigin;
}

export interface MoveClass {
  player: BackgammonPlayer;
  id: string;
  dieValue: BackgammonDieValue;
  stateKind: BackgammonMoveStateKind;
  moveKind: BackgammonMoveKind | undefined;
  origin: BackgammonCheckercontainer | undefined;
  destination: BackgammonCheckercontainer | undefined;

  initialize: (props: MoveProps) => BackgammonMove;
  isPointOpen: (
    point: BackgammonPoint,
    player: BackgammonPlayerMoving | BackgammonPlayerRolled
  ) => boolean;
  move: (
    board: BackgammonBoard,
    move: BackgammonMoveReady,
    isDryRun?: boolean
  ) => BackgammonMoveResult | BackgammonMoveDryRunResult;
  confirmMove: (move: BackgammonMoveInProgress) => BackgammonMoveConfirmed;
}
