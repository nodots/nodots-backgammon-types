import { BackgammonChecker } from './checker';
import { BackgammonBoard } from './board';
import { BackgammonCheckerContainerImport } from './import';
import { BackgammonMoveDirection } from './game';
import { IntegerRange } from './generics';
type BarPosition = 'bar';
type OffPosition = 'off';
interface BackgammonPointPosition {
    clockwise: BackgammonPointValue;
    counterclockwise: BackgammonPointValue;
}
export type BackgammonCheckerContainerPosition = BackgammonPointPosition | BarPosition | OffPosition;
type CheckerContainerKind = 'point' | 'bar' | 'off';
export type BackgammonCheckerContainer = {
    id: string;
    kind: CheckerContainerKind;
    position: BackgammonCheckerContainerPosition;
    checkers: BackgammonChecker[];
};
export interface BackgammonPoint extends BackgammonCheckerContainer {
    kind: 'point';
    position: {
        clockwise: BackgammonPointValue;
        counterclockwise: BackgammonPointValue;
    };
}
export interface BackgammonBar extends BackgammonCheckerContainer {
    kind: 'bar';
    direction: BackgammonMoveDirection;
    position: BarPosition;
}
export type BackgammonBarContainer = {
    [direction in BackgammonMoveDirection]: BackgammonBar;
};
export interface BackgammonOff extends BackgammonCheckerContainer {
    kind: 'off';
    direction: BackgammonMoveDirection;
    position: OffPosition;
}
export type BackgammonOffContainer = {
    [direction in BackgammonMoveDirection]: BackgammonOff;
};
export type BackgammonPointValue = IntegerRange<1, 24>;
export type BackgammonPoints = [
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint,
    BackgammonPoint
];
export type BackgammonMoveOrigin = BackgammonPoint | BackgammonBar;
export type BackgammonMoveDestination = BackgammonPoint | BackgammonOff;
export interface CheckercontainerClass {
    getCheckercontainers: (board: BackgammonBoard) => BackgammonCheckerContainer[];
    getCheckercontainer: (board: BackgammonBoard, id: string) => BackgammonCheckerContainer;
    buildBar: (boardImport: BackgammonCheckerContainerImport[]) => {
        clockwise: BackgammonBar;
        counterclockwise: BackgammonBar;
    };
    buildOff: (boardImport: BackgammonCheckerContainerImport[]) => {
        clockwise: BackgammonOff;
        counterclockwise: BackgammonOff;
    };
}
export {};
