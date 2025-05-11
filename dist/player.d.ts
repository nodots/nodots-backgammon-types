import { BackgammonColor, BackgammonMoveDirection } from './Game';
import { BackgammonBoard } from './Board';
import { BackgammonPlayMoving } from './Play';
import { BackgammonMoveResult, BackgammonMoveOrigin } from './Move';
export interface PlayerClass {
    color: BackgammonColor;
    direction: BackgammonMoveDirection;
    dice?: any;
    pipCount: number;
    roll: (player: any) => any;
    move: (board: BackgammonBoard, play: BackgammonPlayMoving, origin: BackgammonMoveOrigin) => BackgammonMoveResult;
    getHomeBoard: (board: BackgammonBoard, player: any) => any;
    getOpponentBoard: (board: BackgammonBoard, player: any) => any;
}
export type BackgammonPlayer = any;
export type BackgammonPlayerCheckers = any;
export type BackgammonPlayers = any;
export declare const __player_module = true;
