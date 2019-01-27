import { Block } from './Block';
export declare class BlockManager {
    private _blocks;
    private _size;
    constructor(size: number, blocks?: Block[]);
    readonly blocks: Block[];
    readonly puzzleSize: number;
    private init;
    private shuffle;
    tap(block: Block): void;
    private sort;
}
