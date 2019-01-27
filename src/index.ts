import { BlockManager } from './BlockManager';
import { Puzzle } from './Puzzle';

const manager = new BlockManager(4);

const puzzle = new Puzzle(500, manager);

document.body.appendChild(puzzle.view);
