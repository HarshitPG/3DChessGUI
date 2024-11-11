import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useCallback, useContext, useEffect, Suspense, useState } from "react";
import Board from "../components3d/Board.jsx";
import { GameContext } from "../context/GameContext.jsx";
// import Modal3dChess from "../components/Model3d.jsx";
import { Background } from "../utils/Background.jsx";
import { Modal3dChessContext } from "../context/Model3dContext.jsx";
import { Clock } from "../components3d/Clock.jsx";
import Modal3dChess from "../components/Model3d.jsx";
import ModalGameOver from "../components3d/ModalGameOver.jsx";
import PgnTable from "../components3d/PgnTable.jsx";
import Headers from "../components3d/Headers.jsx";

const Scene = () => {
  const { state, dispatch } = useContext(GameContext);
  const {
    side,
    showModal,
    setSide,
    duration,
    setDuration,
    aiMovedRef,
    playerMovedRef,
    pauseClocks,
    resetClocks,
    gameOver,
    gameResult,
    setGameResult,
    subGameResult,
    setSubGameResult,
    setGameOver,
    setShowModel,
  } = useContext(Modal3dChessContext);
  const {
    board,
    figures,
    selectedCell,
    availableMoves,
    movingPiece,
    targetPosition,
    // isAiMove,
  } = state;

  const onCellSelect = useCallback(
    (cell, rowIndex, cellIndex) => {
      dispatch({
        type: "SET_SELECT_CELL",
        payload: { cell, rowIndex, cellIndex },
      });
    },
    [dispatch]
  );

  const onFigureMove = useCallback(
    (target) => {
      dispatch({
        type: "MOVE_FIGURE",
        payload: { target, aiMovedRef, playerMovedRef, movingPiece: true },
      });
    },
    [dispatch]
  );

  let status = "";

  let moveColor = "w";
  if (side === "black") {
    moveColor = "b";
  }
  console.log("moveColor", moveColor);

  if (state.isMate && !gameOver) {
    status = `Game over, ${moveColor} is in checkmate.`;
    pauseClocks();
    if (
      (moveColor === "b" && side === "black") ||
      (moveColor === "w" && side === "white")
    ) {
      console.log("You Lost :(");
      setGameResult("You Lost :(");
      setSubGameResult("AI Won..");
    } else {
      setGameResult("You Won :)");
      setSubGameResult("AI Lost..");
    }

    setTimeout(() => {
      setGameOver(true);
    }, 1000);
  } else if (state.isDraw && !gameOver) {
    status = "Game over, drawn position";
    setGameResult("Match Draw");
    setSubGameResult("AI Won..");
    setTimeout(() => {
      setGameOver(true);
    }, 1000);
    console.log(status);
  } else {
    status = `${moveColor} to move`;
    console.log(side);
    if (state.isCheck) {
      status += `, ${moveColor} is in check`;
    }
  }

  const onGameStart = useCallback(() => {
    if (side === "black" && showModal === false) {
      dispatch({
        type: "SET_WHOSE_MOVE",
        payload: moveColor,
      });
      startAiClock();
      console.log("Game Started");
    }
  }, [dispatch, side, showModal]);

  useEffect(() => {
    onGameStart();
  }, [onGameStart, showModal]);

  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    if (side === "black") {
      setRotation([0, -Math.PI, 0]);
      setPosition([3.5, 0, -3.5]);
    } else {
      setRotation([0, 0, 0]);
      setPosition([-3.5, 0, 3.5]);
    }
  }, [side]);

  const stopAiClock = useCallback(() => {
    dispatch({
      type: "STOP_AI_CLOCK",
      payload: { aiMovedRef, playerMovedRef },
    });
  }, [dispatch]);

  const startAiClock = useCallback(() => {
    dispatch({
      type: "START_AI_CLOCK",
      payload: { aiMovedRef, playerMovedRef },
    });
  }, [dispatch]);

  const newGame = useCallback(() => {
    dispatch({
      type: "NEW_GAME",
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state.isAiMoveLoading === false &&
      state.isAiMoveInProgress === false &&
      state.isMoveInProgress === true &&
      state.isMate === false &&
      state.isDraw === false &&
      state.isStaleMate === false
    ) {
      stopAiClock();
      console.log("stop ai clock");
    }
  }, [state.isAiMoveLoading, state.isAiMoveInProgress, state.isMoveInProgress]);

  useEffect(() => {
    if (
      state.isMate === true ||
      state.isDraw === true ||
      state.isStaleMate === true
    ) {
      pauseClocks();
      console.log("stop clock");
    }
    console.log("stop ");
  }, [state.figures]);

  const [playerColor, setPlayerColor] = useState(side === "black" ? "b" : "w");
  useEffect(() => {
    setPlayerColor(side === "black" ? "b" : "w");
  }, [side]);

  console.log("moveColor", playerColor);

  const sideSet = useCallback(() => {
    dispatch({ type: "SIDE", payload: { playerColor } });
  }, [dispatch, playerColor]);

  useEffect(() => {
    if (!showModal) sideSet();
  }, [showModal, sideSet]);

  const handleResetGame = useCallback(() => {
    if (showModal === false) {
      newGame();
      setGameOver(false);
      setShowModel(true);
      // resetClocks();
      // setDuration("");
      pauseClocks();
    }
  }, [dispatch, showModal, gameOver]);

  const [cameraPosition, setCameraPosition] = useState([10, 5, 0]);
  const [cameraFOV, setCameraFOV] = useState(45);
  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 768) {
        setCameraFOV(45);
        setCameraPosition([10, 5, 0]);
      } else if (window.innerWidth > 480) {
        setCameraFOV(65);
        setCameraPosition([10, 5, 0]);
      } else {
        setCameraFOV(95);
        setCameraPosition([10, 5, 0]);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <div className="root3d">
        <Suspense fallback={<div>Loading...</div>}>
          {showModal && <Modal3dChess />}
          {gameOver && (
            <ModalGameOver
              gameOver={gameOver}
              gameResult={gameResult}
              subGameResult={subGameResult}
              handleResetGame={handleResetGame}
            />
          )}
          {!showModal && <PgnTable />}
          {!showModal && <Headers handleResetGame={handleResetGame} />}
          <Canvas camera={{ fov: cameraFOV, position: cameraPosition }}>
            <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
            <ambientLight />
            <pointLight position={[0, 0, 0]} intensity={0} />
            {/* <Environment
              files="./hdr/086_hdrmaps_com_free_10K.exr"
              background
              blur={0.5}
            /> */}
            <Background />
            <Clock />
            <Board
              board={board}
              figures={figures}
              selectedCell={selectedCell}
              onCellSelect={onCellSelect}
              availableMoves={availableMoves}
              onFigureMove={onFigureMove}
              rotation={rotation}
              position={position}
              movingPiece={movingPiece}
              targetPosition={targetPosition}
            />

            {/* <axesHelper args={[5]} />
            <Stats /> */}
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};

export default Scene;
