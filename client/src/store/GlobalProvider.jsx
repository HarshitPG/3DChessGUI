import PropTypes from "prop-types";
import { GameProvider } from "../context/GameContext"; // Chess logic context
import { Modal3dChessContextProvider } from "../context/Model3dContext"; // Modal & other game-related context

// GlobalProvider component
export const GlobalProvider = ({ children }) => {
  return (
    <GameProvider>
      <Modal3dChessContextProvider>{children}</Modal3dChessContextProvider>
    </GameProvider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
