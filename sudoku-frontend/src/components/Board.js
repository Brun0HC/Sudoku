import React from 'react';
import Cell from './Cell';
import './css/Board.css';

const Board = ({ board, onCellChange, boardBCK }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              readonly={cell !== 0}
              onChange={(value) => onCellChange(rowIndex, colIndex, value)}
              disabled={boardBCK[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
