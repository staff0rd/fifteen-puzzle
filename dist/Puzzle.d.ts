import { BlockManager } from './BlockManager';
export declare class Puzzle {
    private _pixi;
    private _blocks;
    private _puzzleDrawSize;
    private _blockDrawSize;
    readonly view: HTMLCanvasElement;
    constructor(drawSize: number, blockManager: BlockManager);
    private init;
    private buildContainer;
    private arrange;
}
