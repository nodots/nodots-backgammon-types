import { BackgammonChecker } from './Checker';
export interface BackgammonCheckerContainer {
    checkers: BackgammonChecker[];
}
export interface BackgammonPoint extends BackgammonCheckerContainer {
    index: number;
}
export interface BackgammonBar extends BackgammonCheckerContainer {
}
export interface BackgammonOff extends BackgammonCheckerContainer {
}
export type BackgammonCheckerContainerPosition = any;
export type BackgammonPoints = BackgammonPoint[];
export declare const __checkercontainer_module = true;
