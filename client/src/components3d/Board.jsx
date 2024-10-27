import React from "react";
import Cell from "./Cell";
import Figure from "../components3d/figures/figure";

const Board = ({
  board,
  figures,
  onCellSelect,
  selectedCell,
  availableMoves,
  onFigureMove,
  rotation,
  position,
  movingPiece,
  targetPosition,
}) => {
  return (
    <group position={position} rotation={rotation}>
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              availableMoves={availableMoves}
              onFigureMove={onFigureMove}
              onCellSelect={onCellSelect}
              key={rowIndex.toString() + cellIndex.toString()}
              cell={cell}
              color={(cellIndex + rowIndex) % 2 === 0 ? "#d0dff4" : "black"}
              position={{ x: rowIndex, y: -cellIndex }}
            />
          ))}
        </React.Fragment>
      ))}
      {figures.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map(
            (figure, cellIndex) =>
              figure && (
                <Figure
                  key={rowIndex.toString() + cellIndex.toString()}
                  position={{ x: rowIndex, y: -cellIndex }}
                  selected={figure.square === selectedCell}
                  figure={figure}
                  movingPiece={figure.square === movingPiece}
                  targetPosition={
                    targetPosition || { x: rowIndex, y: -cellIndex }
                  }
                />
              )
          )}
        </React.Fragment>
      ))}
    </group>
  );
};

export default Board;
