import { Block } from './Block';
import { shuffle } from './utils/shuffle';
import { Point } from 'pixi.js';
import { convertIndexToPoint } from './utils/convertIndexToPoint';

export class BlockManager {
    private _blocks: Block[];
    private _size: number;

    constructor(size: number) {
        this._size = size;

        this.init();

        this.shuffle();
    }

    public get blocks() { return this._blocks };
    public get puzzleSize() { return this._size};

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

    shuffle() {
        const shuffled = shuffle(this._blocks);
        shuffled.forEach((block, index) => {
            if (block) { // ignore empty one
                const point = convertIndexToPoint(index, this._size);
                block.x = point.x;
                block.y = point.y;
            }
        });
        this._blocks = shuffled;
    }

    tap(block: Block) {
        console.log('you tapped ', block);
    }
}