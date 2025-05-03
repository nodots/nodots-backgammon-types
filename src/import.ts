import { BackgammonColor } from '.';
import { BackgammonCheckercontainerPosition } from './checkercontainer';

export interface BackgammonCheckercontainerImport {
  position: BackgammonCheckercontainerPosition;
  direction?: 'clockwise' | 'counterclockwise';
  checkers: {
    qty: number;
    color: BackgammonColor;
  };
}

export interface BackgammonBoardImports {
  clockwise: BackgammonCheckercontainerImport[];
  counterclockwise: BackgammonCheckercontainerImport[];
}
