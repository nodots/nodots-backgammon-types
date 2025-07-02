import { BackgammonBoard } from './board';
import { BackgammonMoveOrigin } from './checkercontainer';
import { BackgammonCube } from './cube';
import { BackgammonPlay, BackgammonPlayDoubled, BackgammonPlayMoving, BackgammonPlayRolled } from './play';
import { BackgammonPlayer, BackgammonPlayerActive, BackgammonPlayerDoubled, BackgammonPlayerInactive, BackgammonPlayerMoving, BackgammonPlayerRolled, BackgammonPlayerRolledForStart, BackgammonPlayerRolling, BackgammonPlayerWinner, BackgammonPlayers } from './player';
export type Latitude = 'north' | 'south';
export type Longitude = 'east' | 'west';
export type BackgammonColor = 'black' | 'white';
export type BackgammonMoveDirection = 'clockwise' | 'counterclockwise';
export declare const CHECKERS_PER_PLAYER = 15;
export type BackgammonGameStateKind = 'rolling-for-start' | 'rolled-for-start' | 'rolling' | 'rolled' | 'preparing-move' | 'doubling' | 'doubled' | 'moving' | 'moved' | 'completed';
interface BaseGame {
    id: string;
    players: BackgammonPlayers;
    board: BackgammonBoard;
    cube: BackgammonCube;
    asciiBoard?: string;
    winner?: BackgammonPlayer;
    activeColor?: BackgammonColor;
    activePlay?: BackgammonPlay;
    activePlayer?: BackgammonPlayer;
    inactivePlayer?: BackgammonPlayer;
    createdAt: Date;
    startTime?: Date;
    lastUpdate?: Date;
    endTime?: Date;
}
interface Game extends BaseGame {
    stateKind: BackgammonGameStateKind;
}
export type BackgammonGameRollingForStart = Game & {
    stateKind: 'rolling-for-start';
};
export type BackgammonGameRolledForStart = Game & {
    stateKind: 'rolled-for-start';
    activeColor: BackgammonColor;
    activePlayer: BackgammonPlayerRolledForStart;
    inactivePlayer: BackgammonPlayerInactive;
};
export type BackgammonGameRolling = Game & {
    stateKind: 'rolling';
    activeColor: BackgammonColor;
    activePlayer: BackgammonPlayerRolling;
    inactivePlayer: BackgammonPlayerInactive;
};
export type BackgammonGameRolled = Game & {
    stateKind: 'rolled';
    activeColor: BackgammonColor;
    activePlayer: BackgammonPlayerRolled;
    inactivePlayer: BackgammonPlayerInactive;
    activePlay: BackgammonPlayRolled;
};
export type BackgammonGamePreparingMove = Game & {
    stateKind: 'preparing-move';
    activeColor: BackgammonColor;
    activePlayer: BackgammonPlayerRolled;
    inactivePlayer: BackgammonPlayerInactive;
    activePlay: BackgammonPlayRolled;
};
export type BackgammonGameDoubling = Game & {
    stateKind: 'doubling';
    activeColor: BackgammonColor;
    activePlay: BackgammonPlayDoubled;
    activePlayer: BackgammonPlayerDoubled;
    inactivePlayer: BackgammonPlayerInactive;
};
export type BackgammonGameDoubled = Game & {
    stateKind: 'doubled';
    activeColor: BackgammonColor;
    activePlay: BackgammonPlayDoubled;
    activePlayer: BackgammonPlayerDoubled;
    inactivePlayer: BackgammonPlayerInactive;
};
export type BackgammonGameMoving = Game & {
    stateKind: 'moving';
    activeColor: BackgammonColor;
    activePlay: BackgammonPlayMoving;
    activePlayer: BackgammonPlayerMoving;
    inactivePlayer: BackgammonPlayerInactive;
};
export type BackgammonGameMoved = Game & {
    stateKind: 'moved';
    activeColor: BackgammonColor;
    activePlay: BackgammonPlayMoving;
    activePlayer: BackgammonPlayerMoving;
    inactivePlayer: BackgammonPlayerInactive;
};
export type BackgammonGameCompleted = Game & {
    stateKind: 'completed';
    winner: BackgammonPlayerWinner;
};
export type BackgammonGame = BackgammonGameRollingForStart | BackgammonGameRolledForStart | BackgammonGameRolling | BackgammonGameRolled | BackgammonGamePreparingMove | BackgammonGameDoubled | BackgammonGameMoving | BackgammonGameMoved | BackgammonGameCompleted;
export interface GameProps {
    players: BackgammonPlayers;
    board?: BackgammonBoard;
    cube?: BackgammonCube;
}
export interface GameClass {
    id: string;
    stateKind: BackgammonGameStateKind;
    players: BackgammonPlayers;
    board: BackgammonBoard;
    cube: BackgammonCube;
    activeColor: BackgammonColor;
    activePlay: BackgammonPlay;
    activePlayer: BackgammonPlayerActive;
    inactivePlayer: BackgammonPlayerInactive;
    initialize: (players: BackgammonPlayers, id?: string, stateKind?: BackgammonGameStateKind, board?: BackgammonBoard, cube?: BackgammonCube, activePlay?: BackgammonPlay, activeColor?: BackgammonColor, activePlayer?: BackgammonPlayerActive, inactivePlayer?: BackgammonPlayerInactive, origin?: BackgammonMoveOrigin) => BackgammonGame;
    rollForStart: (game: BackgammonGameRollingForStart) => BackgammonGameRolledForStart;
    roll: (game: BackgammonGameRolledForStart) => BackgammonGameRolled;
    /**
     * Transition from rolled to preparing-move state when a move is selected
     */
    prepareMove: (game: BackgammonGameRolled) => BackgammonGamePreparingMove;
    /**
     * This is a pseudo state transition. The user transitions into a "moving" state when they
     * click on a checker (rather than the cube). But the instant they click the
     * checker they are in a moved state.
     * v3.1.0 BREAKING CHANGE: Now only accepts preparing-move or doubled states
     * TODO v3.2.0: Remove any remaining backward compatibility shims for old state transitions
     */
    toMoving: (game: BackgammonGamePreparingMove | BackgammonGameDoubled) => BackgammonGameMoving;
    /**
     * This is another pseudo state transition. Argument for this is weaker.
     * v3.1.0 BREAKING CHANGE: Now only accepts preparing-move states
     * TODO v3.2.0: Remove any remaining backward compatibility shims for old state transitions
     */
    toDoubling: (game: BackgammonGamePreparingMove) => BackgammonGameDoubling;
    double: (game: BackgammonGameDoubling) => BackgammonGameDoubled;
    move: (game: BackgammonGameMoving | BackgammonGameRolled, origin: BackgammonMoveOrigin) => BackgammonGameMoved;
    getActivePlayer: (game: BackgammonGame) => BackgammonPlayerActive;
    getInactivePlayer: (game: BackgammonGame) => BackgammonPlayerInactive;
    getPlayersForColor: (players: BackgammonPlayers, color: BackgammonColor) => [BackgammonPlayerActive, BackgammonPlayerInactive];
    sanityCheckMovingGame: (game: BackgammonGame) => BackgammonGameMoving | false;
}
export {};
