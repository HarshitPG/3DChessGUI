import { Pawn } from "./Pwanb";
import { Knight } from "./Knightb";
import { Bitshop } from "./Bitshopb";
import { Rook } from "./Rookb";
import { Queen } from "./Queenb";
import { King } from "./Kingb";
import { useSpring, animated } from "@react-spring/three";
import { PawnW } from "./Pwanw";
import { KnightW } from "./Knightw";
import { BitshopW } from "./Bitshopw";
import { RookW } from "./Rookw";
import { QueenW } from "./Queenw";
import { KingW } from "./Kingw";

const Figure = ({
  figure,
  position,
  selected,
  movingPiece,
  targetPosition,
}) => {
  console.log("Figure position:", position);
  console.log("Target position:", targetPosition);
  console.log("Is moving:", movingPiece);

  const { pos } = useSpring({
    pos: movingPiece
      ? [
          targetPosition.x < 4 ? targetPosition.y : targetPosition.y,
          0.45,
          targetPosition.x < 4 ? -targetPosition.x : -targetPosition.x,
        ]
      : [position.x, 0.45, position.y],
    config: { mass: 1, tension: 180, friction: 12, duration: 300 },
  });

  const { hover } = useSpring({
    hover: selected ? 0.05 : 0,
    config: { mass: 1, tension: 180, friction: 12 },
  });

  const { jump } = useSpring({
    jump: movingPiece && figure.type === "n" ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 120, duration: 500 },
  });

  const renderFigure = (Component) => (
    <animated.group position={pos}>
      <animated.group
        position-y={
          figure.type === "n" && movingPiece
            ? jump.to((j) => (j < 1 ? 0.15 + Math.sin(j * Math.PI) * 0.5 : 0))
            : hover
        }
      >
        <Component color={figure.color} selected={selected} />
      </animated.group>
    </animated.group>
  );

  if (!figure) return null;

  switch (figure.type) {
    case "p":
      return renderFigure(figure.color === "w" ? PawnW : Pawn);
    case "n":
      return renderFigure(figure.color === "w" ? KnightW : Knight);
    case "b":
      return renderFigure(figure.color === "w" ? BitshopW : Bitshop);
    case "r":
      return renderFigure(figure.color === "w" ? RookW : Rook);
    case "q":
      return renderFigure(figure.color === "w" ? QueenW : Queen);
    case "k":
      return renderFigure(figure.color === "w" ? KingW : King);
    default:
      return null;
  }
};

export default Figure;
