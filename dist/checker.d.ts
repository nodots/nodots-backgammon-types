import { BackgammonColor } from './Game';
import { BackgammonPlayerCheckers } from './Player';
import { BackgammonBoard } from './Board';
export interface BackgammonChecker {
    id: string;
    color: BackgammonColor;
    checkercontainerId: string;
    highlight?: boolean;
}
export interface BackgammonCheckers {
    white: BackgammonPlayerCheckers;
    black: BackgammonPlayerCheckers;
}
export interface CheckerClass {
    getCheckers: (board: BackgammonBoard) => BackgammonChecker[];
    initialize: (color: BackgammonColor, checkercontainerId: string) => BackgammonChecker;
    buildCheckersForCheckercontainerId: (checkercontainerId: string, color: BackgammonColor, count: number) => BackgammonChecker[];
    getChecker: (board: BackgammonBoard, id: string) => BackgammonChecker;
}
