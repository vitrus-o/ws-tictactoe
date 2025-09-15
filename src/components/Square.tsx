import type { SquareProps } from "../types/types";

export function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value === "X" ? <span className="x">X</span> : value === "O" ? <span className="o">O</span> : null}
    </button>
  );
}
