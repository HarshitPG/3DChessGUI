/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "./GameContext";
export const Modal3dChessContext = createContext();

export const Modal3dChessContextProvider = ({ children }) => {
  const { state, dispatch } = useContext(GameContext);
  const { isAiMove } = useContext(GameContext);
  const [showModal, setShowModel] = useState(true);
  const [duration, setDuration] = useState("");
  const [side, setSide] = useState("");
  const [playerMoved, setPlayerMoved] = useState();
  const [aiMoved, setAiMoved] = useState();
  const aiMovedRef = useRef();
  const playerMovedRef = useRef();
  const originalDurationRef = useRef();
  const [ismovedAi, setIsmovedAi] = useState(null);
  const [reset, setReset] = useState();
  const [pause, setPause] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [subGameResult, setSubGameResult] = useState("");

  console.log("dur", duration);

  useEffect(() => {
    originalDurationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    if (side === "white") {
      aiMovedRef.current = true;
      playerMovedRef.current = false;
    } else if (side === "black") {
      aiMovedRef.current = false;
      playerMovedRef.current = true;
    }
  }, [side]);

  const closeModal = () => {
    setShowModel(false);
  };

  const resetClocks = () => {
    setPlayerMoved(false);
    setAiMoved(false);
    aiMovedRef.current = false;
    playerMovedRef.current = false;
    setReset(true);
    setDuration(duration);
    console.log("resetdone", originalDurationRef.current);
    if (side === "white") {
      aiMovedRef.current = true;
      playerMovedRef.current = false;
    }
  };

  const pauseClocks = () => {
    // setPlayerMoved(true);
    // setAiMoved(true);
    aiMovedRef.current = true;
    playerMovedRef.current = true;
    setPause(true);
    console.log("pausedone", aiMovedRef.current, playerMovedRef.current);
  };

  const resumeClocks = () => {
    // setPlayerMoved(true);
    // setAiMoved(true);
    aiMovedRef.current = false;
    playerMovedRef.current = false;
    setPause(false);
    console.log("reset", aiMovedRef.current, playerMovedRef.current);
  };

  const contextValue = {
    showModal,
    setShowModel,
    duration,
    setDuration,
    side,
    setSide,
    closeModal,
    aiMovedRef,
    playerMovedRef,
    ismovedAi,
    setIsmovedAi,
    playerMoved: playerMovedRef.current,
    setPlayerMoved: (value) => {
      playerMovedRef.current = value;
    },
    aiMoved: aiMovedRef.current,
    setAiMoved: (value) => {
      aiMovedRef.current = value;
    },
    reset,
    setReset,
    resetClocks,
    pauseClocks,
    pause,
    setPause,
    resumeClocks,
    gameOver,
    setGameOver,
    gameResult,
    setGameResult,
    subGameResult,
    setSubGameResult,
  };

  return (
    <Modal3dChessContext.Provider value={contextValue}>
      {children}
    </Modal3dChessContext.Provider>
  );
};

Modal3dChessContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
