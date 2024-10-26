import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useCallback, useContext, useEffect, Suspense, useState } from "react";
import Board from "../components3d/Board.jsx";
import { GameContext } from "../context/GameContext.jsx";
import Modal3dChess from "../components/Model3d.jsx";

const Scene = () => {
  const { state, dispatch } = useContext(GameContext);
  const { side, showModal, aiMovedRef, playerMovedRef } =
    useContext(GameContext);

  const { board, figures, selectedCell, availableMoves, whoseMove } = state;

  const onCellSelect = useCallback(
    (cell) => {
      dispatch({ type: "SET_SELECT_CELL", payload: cell });
    },
    [dispatch]
  );

  const onFigureMove = useCallback(
    (target) => {
      dispatch({
        type: "MOVE_FIGURE",
        payload: { target, aiMovedRef, playerMovedRef },
      });
    },
    [dispatch]
  );

  const onGameStart = useCallback(() => {
    if (!showModal) {
      dispatch({
        type: "SET_WHOSE_MOVE",
        payload: whoseMove,
      });
      console.log("Game Started");
    }
  }, [dispatch, showModal]);

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
  // useEffect(() => {
  //   return () => {
  //     console.log("Component unmounted");
  //   };
  // }, []);

  return (
    <>
      <div className="root3d">
        <Suspense fallback={<div>Loading...</div>}>
          {showModal && <Modal3dChess />}
          <Canvas camera={{ fov: 45, position: [10, 5, 0] }}>
            <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
            <ambientLight />
            <pointLight position={[0, 0, 10]} intensity={20} />
            <Environment
              files="./hdr/086_hdrmaps_com_free_10K.exr"
              background
              blur={0.5}
            />
            <Board
              board={board}
              figures={figures}
              selectedCell={selectedCell}
              onCellSelect={onCellSelect}
              availableMoves={availableMoves}
              onFigureMove={onFigureMove}
              rotation={rotation}
              position={position}
            />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};

export default Scene;
