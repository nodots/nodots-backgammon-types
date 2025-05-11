import { BackgammonPlayer, BackgammonPlayers } from './Player';
export type BackgammonCubeValue = undefined | 2 | 4 | 8 | 16 | 32 | 64;
export declare const BackgammonCubeValues: BackgammonCubeValue[];
export type BackgammonCubeStateKind = 'initialized' | 'doubled' | 'maxxed';
interface BaseCube {
    owner: BackgammonPlayer | undefined;
    value: BackgammonCubeValue | undefined;
}
interface Cube extends BaseCube {
    stateKind: BackgammonCubeStateKind;
}
export type BackgammonCubeInitialized = Cube & {};
export type BackgammonCubeDoubled = Cube & {};
export type BackgammonCubeMaxxed = Cube & {};
export type BackgammonCube = BackgammonCubeInitialized | BackgammonCubeDoubled | BackgammonCubeMaxxed;
export interface CubeProps {
    stateKind?: BackgammonCubeStateKind;
    value?: BackgammonCubeValue;
    owner?: BackgammonPlayer;
}
export interface CubeClass {
    stateKind: BackgammonCubeStateKind;
    value: BackgammonCubeValue | undefined;
    owner: BackgammonPlayer | undefined;
    initialize: (cube?: CubeProps) => Cube;
    double: (cube: Cube, player: BackgammonPlayer, players: BackgammonPlayers) => BackgammonCubeDoubled | BackgammonCubeMaxxed;
}
export declare const __cube_module = true;
export {};
