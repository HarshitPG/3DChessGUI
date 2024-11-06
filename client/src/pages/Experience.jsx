import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useCallback, useContext, useEffect, Suspense, useState } from "react";
import Board from "../components3d/Board.jsx";
import { GameContext } from "../context/GameContext.jsx";
// import Modal3dChess from "../components/Model3d.jsx";
import { Background } from "../utils/Background.jsx";
import { Modal3dChessContext } from "../context/Model3dContext.jsx";
import { Clock } from "../components3d/Clock.jsx";

const Scene = () => {
  const { state, dispatch } = useContext(GameContext);
  const { side, showModal, duration, aiMovedRef, playerMovedRef } =
    useContext(Modal3dChessContext);

  console.log("duration", duration);
  console.log("side", side);
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

  let moveColor = "w";
  if (side === "black") {
    moveColor = "b";
  }
  console.log("moveColor", moveColor);

  const onGameStart = useCallback(() => {
    if (side === "black" && showModal === false) {
      dispatch({
        type: "SET_WHOSE_MOVE",
        payload: moveColor,
      });
      startAiClock();
      console.log("Game Started");
    }
  }, [dispatch, side]);

  useEffect(() => {
    onGameStart();
  }, [onGameStart, showModal]);

  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, 0]);

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

  useEffect(() => {
    if (
      state.isAiMoveLoading === false &&
      state.isAiMoveInProgress === false &&
      state.isMoveInProgress === true
    ) {
      stopAiClock();
      console.log("stop  ai clock");
    }
  }, [state.isAiMoveLoading, state.isAiMoveInProgress, state.isMoveInProgress]);

  return (
    <>
      <div className="root3d">
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas camera={{ fov: 45, position: [10, 5, 0] }}>
            <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
            <ambientLight />
            <pointLight position={[0, 0, 10]} intensity={2} />
            <Environment
              files="./hdr/086_hdrmaps_com_free_10K.exr"
              background
              blur={0.5}
            />
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
