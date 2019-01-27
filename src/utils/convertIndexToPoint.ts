interface Point {
    x: number;
    y: number;
}

export function convertIndexToPoint(index: number, size: number) : Point {
    return { x: index % size, y: Math.floor(index / size) };
}