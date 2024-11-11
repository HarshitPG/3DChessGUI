import { useContext } from "react";
import { Modal3dChessContext } from "../context/Model3dContext.jsx";
import { FaRegFlag } from "react-icons/fa6";

const Headers = ({ handleResetGame }) => {
  const { setGameOver, setGameResult, setSubGameResult, setShowModel } =
    useContext(Modal3dChessContext);

  const handleNewGameClick = () => {
    setGameOver(true);
    setShowModel(false);
    setGameResult("You Lost :(");
    setSubGameResult("You resigned..");
  };

  return (
    <>
      <div
        onClick={() => {
          handleNewGameClick();
          handleResetGame;
        }}
        className="fixed z-40 w-10 h-10 shadow-md  bg-gray-900 bg-opacity-50  backdrop-filter backdrop-blur-sm transition-transform top-14 right-10 flex items-center justify-center group"
      >
        <span className="absolute top-[-1.5rem] text-white text-xs rounded-sm px-2 opacity-0 group-hover:opacity-100 transition-opacity font-spaceGrotesk-regular  shadow-md  bg-gray-900 bg-opacity-50  backdrop-filter backdrop-blur-sm ">
          Resign
        </span>
        <FaRegFlag size={32} />
      </div>
    </>
  );
};

export default Headers;
