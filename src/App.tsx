import React, { useState } from "react";
import Board from "./components/Board.tsx";
import resetIcon from "./assets/reset-svgrepo-com.svg";
import calculateWinner from "./utils/calculateWinner.ts";
import type { Squares } from "./types/types";

export default function Game() {
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [history, setHistory] = useState<Squares[]>([Array(9).fill(null) as Squares]);
  const xIsNext = currentMove % 2 === 0;
  const squares = history[currentMove];

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + " Wins!";
  } else {
    status = "Current Player: " + (xIsNext ? "X" : "O");
  }

  const isDraw = squares.every(Boolean) && !winner;
  if (isDraw) status = "Draw";

  function handlePlay(nextSquares: Squares) {
    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
  }

  function handleReset() {
    setHistory([Array(9).fill(null) as Squares]);
    setCurrentMove(0);
  }

  function handleUndo() {
    if (currentMove > 0) setCurrentMove(currentMove - 1);
  }
  function handleRedo() {
    if (currentMove < history.length - 1) setCurrentMove(currentMove + 1);
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="icon-btn-group">
        <button onClick={handleUndo} disabled={currentMove === 0} aria-label="Undo" className="icon-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" />
            <polyline points="12 8 8 12 12 16" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="16" y1="12" x2="8" y2="12" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {isDraw && (
          <button onClick={handleReset} className="icon-btn" aria-label="Reset">
            <img src={resetIcon} alt="Reset" width="28" height="28" />
          </button>
        )}
        <button onClick={handleRedo} disabled={currentMove === history.length - 1} aria-label="Redo" className="icon-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" />
            <polyline points="12 8 16 12 12 16" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
      </div>
      <div className="game-info" />
    </div>
  );
}
