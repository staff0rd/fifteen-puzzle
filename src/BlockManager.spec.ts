import { BlockManager } from './BlockManager';

describe('Blockmanager', () => {
  describe('init', () => {
    it('should build the initial block array', () => {
      const manager = new BlockManager(4);

      expect(manager.blocks.length).toBe(16);
    });

    it('should contain one empty element', () => {
      const manager = new BlockManager(4);

      const emptyElements = manager.blocks.filter(e => !e);

      console.log(manager.blocks);

      expect(emptyElements.length).toBe(1);
    });
  });
});
