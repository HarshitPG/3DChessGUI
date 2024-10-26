import { Pawn } from "./Pwanb";
import { Knight } from "./Knightb";
import { Bitshop } from "./Bitshopb";
import { Rook } from "./Rookb";
import { Queen } from "./Queenb";
import { King } from "./Kingb";

const Figure = ({ figure, position, selected }) => {
  if (figure && figure.type === "p") {
    return (
      <Pawn color={figure.color} position={position} selected={selected} />
    );
  }
  if (figure && figure.type === "n") {
    return (
      <Knight color={figure.color} position={position} selected={selected} />
    );
  }
  if (figure && figure.type === "b") {
    return (
      <Bitshop color={figure.color} position={position} selected={selected} />
    );
  }
  if (figure && figure.type === "r") {
    return (
      <Rook color={figure.color} position={position} selected={selected} />
    );
  }
  if (figure && figure.type === "q") {
    return (
      <Queen color={figure.color} position={position} selected={selected} />
    );
  }
  if (figure && figure.type === "k") {
    return (
      <King color={figure.color} position={position} selected={selected} />
    );
  }
  return null;
};

export default Figure;
