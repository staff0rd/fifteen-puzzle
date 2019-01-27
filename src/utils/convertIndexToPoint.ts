import { IPoint } from '../IPoint';

export function convertIndexToPoint(index: number, size: number) : IPoint {
    return { x: index % size, y: Math.floor(index / size) };
}