export type SquareValue = "X" | "O" | null;

export interface SquareProps {
    value: SquareValue;
    onSquareClick: () => void;
}

export type Squares = [SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue];

export interface BoardProps {
    xIsNext: boolean;
    squares: Squares;
    onPlay: (nextSquares: Squares) => void;
}