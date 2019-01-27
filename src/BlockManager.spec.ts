import { BlockManager } from './BlockManager';
import { Block } from './Block';
import { convertIndexToPoint } from './utils/convertIndexToPoint';

function getBlockArray(ids: number[]) {
  return ids.map((id, index) => {
    if (id !== undefined) {
      const point = convertIndexToPoint(index, 4);
      return new Block(id, point.x, point.y);
    }
  });
}

function getIdArray(blocks: Block[]) {
  return blocks.map(block => block ? block.id : undefined);
}

describe('Blockmanager', () => {
  describe('init', () => {
    it('should build the initial block array', () => {
      const manager = new BlockManager(4);

      expect(manager.blocks.length).toBe(16);
    });

    it('should contain one empty element', () => {
      const manager = new BlockManager(4);

      const emptyElements = manager.blocks.filter(e => !e);

      expect(emptyElements.length).toBe(1);
    });
  });

  describe('tap', () => {
      const x: number = undefined;
      const initial = [
        1,  2,  3,  4,
        5,  6,  7,  8,
        9,  10, x,  11,
        12, 13, 14, 15
      ];

      let blocks: Block[];
      let manager: BlockManager;

    beforeEach(() => {
      blocks = getBlockArray(initial);
      manager = new BlockManager(4, blocks)
    });

    describe('column aligned with empty space', () => {
      it ('should push blocks down', () => {

        manager.tap(blocks[2]);

        const result = getIdArray(manager.blocks);

        const expected = [
          1,  2,  x,  4,
          5,  6,  3,  8,
          9,  10, 7,  11,
          12, 13, 14, 15
        ];

        expect(result).toEqual(expected);

      });

      it ('should push blocks up', () => {
        const manager = new BlockManager(4, blocks)

        manager.tap(blocks[14]);

        const result = getIdArray(manager.blocks);

        const expected = [
          1,  2,  3,  4,
          5,  6,  7,  8,
          9,  10, 14, 11,
          12, 13, x,  15
        ];

        expect(result).toEqual(expected);

      });
    });

    describe('row aligned with empty space', () => {
      it ('should push blocks left', () => {
        const manager = new BlockManager(4, blocks)

        manager.tap(blocks[11]);

        const result = getIdArray(manager.blocks);

        const expected = [
          1,  2,  3,  4,
          5,  6,  7,  8,
          9,  10, 11, x,
          12, 13, 14, 15
        ];

        expect(result).toEqual(expected);
      });

      it ('should push blocks right #1', () => {
        const manager = new BlockManager(4, blocks)

        manager.tap(blocks[8]);

        const result = getIdArray(manager.blocks);

        const expected = [
          1,  2,  3,  4,
          5,  6,  7,  8,
          x,  9,  10,  11,
          12, 13, 14, 15
        ];

        expect(result).toEqual(expected);
      });

      it ('should push blocks right #2', () => {
        const manager = new BlockManager(4, blocks)

        manager.tap(blocks[9]);

        const result = getIdArray(manager.blocks);

        const expected = [
          1,  2,  3,  4,
          5,  6,  7,  8,
          9,  x,  10, 11,
          12, 13, 14, 15
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('not aligned with empty space', () => {
      it ('should not move anything', () => {
        const manager = new BlockManager(4, blocks)

        manager.tap(blocks[0]);

        const result = getIdArray(manager.blocks);

        const expected = [
          1,  2,  3,  4,
          5,  6,  7,  8,
          9,  10, x,  11,
          12, 13, 14, 15
        ];

        expect(result).toEqual(expected);
      });
    });
  })
});
