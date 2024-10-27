/* eslint-disable react/prop-types */
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
  isMoving,
  targetPosition,
}) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <group position={position} rotation={rotation}>
      {board.map((row, rowIndex) => {
        // console.log(`Row index: ${rowIndex} , ${row}`);
        return (
          <React.Fragment key={rowIndex}>
            {row.map((cell, cellIndex) => {
              // console.log(`Cell index: ${cellIndex} , ${cell}`);
              return (
                <Cell
                  availableMoves={availableMoves}
                  onFigureMove={onFigureMove}
                  onCellSelect={onCellSelect}
                  key={rowIndex.toString() + cellIndex.toString()}
                  cell={cell}
                  color={(cellIndex + rowIndex) % 2 === 0 ? "#d0dff4" : "black"}
                  position={{ x: rowIndex, y: -cellIndex }}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                />
              );
            })}
          </React.Fragment>
        );
      })}
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
                  isMoving={isMoving}
                  targetPosition={targetPosition}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                />
              )
          )}
        </React.Fragment>
      ))}
    </group>
  );
};

export default Board;
