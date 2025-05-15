import { BackgammonColor } from '.';
import { BackgammonCheckerContainerPosition } from './checkercontainer';
export interface BackgammonCheckerContainerImport {
    position: BackgammonCheckerContainerPosition;
    direction?: 'clockwise' | 'counterclockwise';
    checkers: {
        qty: number;
        color: BackgammonColor;
    };
}
export interface BackgammonBoardImports {
    clockwise: BackgammonCheckerContainerImport[];
    counterclockwise: BackgammonCheckerContainerImport[];
}
