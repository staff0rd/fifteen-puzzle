import * as PIXI from 'pixi.js';
import { BlockManager } from './BlockManager';
import { Block } from './Block';
export declare class Puzzle {
    private _pixi;
    private _blocks;
    private _puzzleDrawSize;
    private _blockDrawSize;
    readonly view: HTMLCanvasElement;
    constructor(drawSize: number, blockManager: BlockManager);
    init(blockManager: BlockManager): void;
    buildContainer(block: Block): PIXI.Container;
    arrange(): void;
}
