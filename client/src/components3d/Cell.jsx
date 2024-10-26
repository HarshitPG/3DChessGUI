/* eslint-disable react/prop-types */
import { Move } from "./Move";

const Cell = ({
  color,
  position,
  cell,
  onCellSelect,
  availableMoves,
  onFigureMove,
}) => {
  return (
    <>
      {availableMoves.map((move, index) =>
        move.to === cell ? (
          <Move
            key={cell + index + "m"}
            move={move}
            position={position}
            cell={cell}
            onFigureMove={onFigureMove}
          />
        ) : null
      )}
      <mesh
        onClick={() => onCellSelect(cell)}
        scale={[1, 1, 0.1]}
        position={[position.x, 0, position.y]}
        rotation={[Math.PI / -2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
        <boxGeometry />
      </mesh>
    </>
  );
};

export default Cell;
