import { Block } from './Block';
export declare class BlockManager {
    private _blocks;
    private _size;
    constructor(size: number, blocks?: Block[]);
    readonly blocks: Block[];
    readonly puzzleSize: number;
    init(): void;
    shuffle(): void;
    tap(block: Block): void;
    sort(emptyIndex: number): void;
}
