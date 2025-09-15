import { useState } from "react";
import resetIcon from "./assets/reset-svgrepo-com.svg";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, status }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const xIsNext = currentMove % 2 === 0;
  const squares = history[currentMove];

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + " Wins!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const isDraw = squares.every(Boolean) && !winner;
  if (isDraw) status = "Draw";

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
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
            <circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2"/>
            <polyline points="12 8 8 12 12 16" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <line x1="16" y1="12" x2="8" y2="12" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {isDraw && (
          <button onClick={handleReset} className="icon-btn" aria-label="Reset">
            <img src={resetIcon} alt="Reset" width="28" height="28" />
          </button>
        )}
        <button onClick={handleRedo} disabled={currentMove === history.length - 1} aria-label="Redo" className="icon-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2"/>
            <polyline points="12 8 16 12 12 16" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <line x1="8" y1="12" x2="16" y2="12" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
