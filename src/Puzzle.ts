import * as PIXI from 'pixi.js';
import { BlockManager } from './BlockManager';
import { Block } from './Block';

interface IDrawableBlock {
    block: Block;
    container: PIXI.Container;
}

const PADDING = 2;
const LEFT_MARGIN = PADDING / 2;
const TOP_MARGIN = PADDING / 2;
const BLOCK_COLOR = 0x114261;
const FONT_COLOR = 0xbbc1c9;

export class Puzzle {
    private _pixi: PIXI.Application;
    private _blocks: IDrawableBlock[] = [];
    private _puzzleDrawSize: number;
    private _blockDrawSize: number;

    public get view() { return this._pixi.view;}

    
    constructor(drawSize: number, blockManager: BlockManager) {
        this._puzzleDrawSize = drawSize;
        this._pixi = new PIXI.Application(this._puzzleDrawSize, this._puzzleDrawSize, { backgroundColor: FONT_COLOR});
        this._blockDrawSize = this._puzzleDrawSize / blockManager.puzzleSize - PADDING;
        
        this.init(blockManager)
        this.arrange();
    }

    init(blockManager: BlockManager) {
        const nonEmpty = blockManager.blocks.filter(block => block); // we don't need to draw the empty one
        this._blocks = nonEmpty.map(block => {
            const container = this.buildContainer(block);
            container.interactive = true;
            container.buttonMode = true;
            container.on('pointertap', () => {
                blockManager.tap(block);
                this.arrange();
            });

            this._pixi.stage.addChild(container);

            return { block: block, container: container };
        });
    }

    buildContainer(block: Block) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(BLOCK_COLOR);
        graphics.drawRect(0, 0, this._blockDrawSize, this._blockDrawSize);
        graphics.endFill();

        const number = new PIXI.Text(block.id.toString(), { fontFamily: 'Arial', fontSize: this._blockDrawSize / 2, fill: FONT_COLOR });
        number.anchor.set(0.5);
        number.position.set(this._blockDrawSize/2);

        const container = new PIXI.Container();
        container.addChild(graphics);
        container.addChild(number);

        return container;
    }

    arrange() {
        this._blocks.forEach(block => {
            block.container.position.set(
                LEFT_MARGIN + (this._blockDrawSize + PADDING) * block.block.x, 
                TOP_MARGIN + (this._blockDrawSize + PADDING) * block.block.y
            );
        })
    }
}