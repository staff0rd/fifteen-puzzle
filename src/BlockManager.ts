import { Block } from './Block';

interface Point {
    x: number;
    y: number;
}

export class BlockManager {
    private _blocks: Block[];
    private _size: number;

    constructor(size: number) {
        this._size = size;

        this.init();
    }

    public get blocks() { return this._blocks };

    init() {
        this._blocks = [];

        for (var y = 0; y < this._size; y++) {
            for (var x = 0; x < this._size; x++) {
                if (x == 0 && y == 0)
                    this._blocks.push(undefined); // the empty space
                else
                    this._blocks.push(new Block(x + y * this._size, x, y));
            }
        }
    }
}