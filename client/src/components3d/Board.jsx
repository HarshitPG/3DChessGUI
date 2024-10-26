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
}) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
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
              color={(cellIndex + rowIndex) % 2 === 0 ? "#d0dff4" : "#4b648a"}
              position={{ x: rowIndex, y: -cellIndex }}
            />
          ))}
        </React.Fragment>
      ))}
      {figures.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((figure, cellIndex) => (
            <Figure
              key={rowIndex.toString() + cellIndex.toString()}
              position={{ x: rowIndex, y: -cellIndex }}
              selected={!!(figure && figure.square === selectedCell)}
              figure={figure}
            />
          ))}
        </React.Fragment>
      ))}
    </group>
  );
};

export default Board;
