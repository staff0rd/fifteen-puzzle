import { Block } from './Block';
import { shuffle } from './utils/shuffle';
import { convertIndexToPoint } from './utils/convertIndexToPoint';

export class BlockManager {
    private _blocks: Block[];
    private _size: number;

    constructor(size: number, blocks?: Block[]) {
        this._size = size;

        if (!blocks) {
            this.init();
            this.shuffle();
        } else
            this._blocks = blocks;
    }

    public get blocks() { return this._blocks };
    public get puzzleSize() { return this._size};

    init() {
        this._blocks = [];

        for (let y = 0; y < this._size; y++) {
            for (let x = 0; x < this._size; x++) {
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
        const tappedLocation = convertIndexToPoint(this._blocks.indexOf(block), this._size);
        const emptyLocation = convertIndexToPoint(this._blocks.indexOf(undefined), this._size);

        if (tappedLocation.x == emptyLocation.x) { 
            if (tappedLocation.y < emptyLocation.y) { // slide down
                const blocksToMove = this._blocks.filter(b => b && b.x == tappedLocation.x && b.y < emptyLocation.y && b.y >= tappedLocation.y);
                blocksToMove.forEach(b => b.y++);
            } else { // slide up
                const blocksToMove = this._blocks.filter(b => b && b.x == tappedLocation.x && b.y > emptyLocation.y && b.y <= tappedLocation.y);
                blocksToMove.forEach(b => b.y--);
            }
            this.blocks.filter(b => b && b.x == tappedLocation.x)
        } else if (tappedLocation.y == emptyLocation.y) { 
            if (tappedLocation.x < emptyLocation.x) { // slide right
                const blocksToMove = this._blocks.filter(b => b && b.y == tappedLocation.y && b.x < emptyLocation.x && b.x >= tappedLocation.x);
                blocksToMove.forEach(b => b.x++);
            } else { // slide left
                const blocksToMove = this._blocks.filter(b => b && b.y == tappedLocation.y && b.x > emptyLocation.x && b.x <= tappedLocation.x);
                blocksToMove.forEach(b => b.x--);
            }

        } else return;
        
        this.sort(tappedLocation.y * this._size + tappedLocation.x);
    }

    sort(emptyIndex: number) {
        const blocks: Block[] = [];
        for (let y = 0; y < this._size; y++) {
            for (let x = 0; x < this._size; x++) {
                if (y * this._size + x != emptyIndex) {
                    const block = this._blocks.filter(b => b && b.x == x && b.y == y)[0];
                    blocks.push(block);
                } else {
                    blocks.push(undefined);
                }
            }
        }
        this._blocks = blocks;
    }
}