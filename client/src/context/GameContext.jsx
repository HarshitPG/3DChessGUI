import { createContext, useEffect, useReducer } from "react";
import { Chess } from "chess.js";
import axios from "axios";
import PropTypes from "prop-types";
// import { Modal3dChessContext } from "./Model3dContext";

export let chess = new Chess();

const initialState = {
  board: [
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
  ],
  figures: chess.board(),
  prevFigures: "",
  selectedCell: null,
  availableMoves: [],
  aiAvailableMoves: [],
  whoseMove: "w",
  history: chess.history({ verbose: true }),
  gameType: "AI",
  isCheck: chess.isCheck(),
  isMate: chess.isGameOver(),
  isDraw: chess.isDraw(),
  isStaleMate: chess.isStalemate(),
  isAiMove: false,
  movingPiece: null,
  targetPosition: null,
  selectedRowIndex: null,
  selectedCellIndex: null,
  isMoveInProgress: false,
  isAiMoveInProgress: false,
  toState: "",
  toStateAi: "",
  fromStateAi: "",
  bestMoveAi: "",
  side: "",
};

export const GameContext = createContext();

const toggleMove = (currentMove) => (currentMove === "w" ? "b" : "w");

const GameReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_FIGURE": {
      const newState = { ...state };
      const { aiMovedRef, playerMovedRef, target } = action.payload;
      if (newState.selectedCell && newState.gameType === "AI") {
        newState.toState = target;
        const piece = chess.get(newState.selectedCell);
        if (piece) {
          newState.movingPiece = newState.selectedCell;
          newState.targetPosition = {
            x: target.charCodeAt(0) - "a".charCodeAt(0),
            y: 8 - parseInt(target[1]),
          };
          newState.selectedCell = null;
          newState.availableMoves = [];
          newState.isMoveInProgress = true;
          if (newState.isMate) {
            console.log("MAted");
            aiMovedRef.current = true;
            playerMovedRef.current = true;
          } else {
            aiMovedRef.current = false;
            playerMovedRef.current = true;
          }
        }
      }
      newState.prevFigures = newState.figures;
      const newFigures = chess.board();
      if (JSON.stringify(newState.prevFigures) !== JSON.stringify(newFigures)) {
        newState.figures = newFigures;
      }

      return {
        ...newState,
      };
    }

    case "STOP_AI_CLOCK": {
      const newState = { ...state };
      const { aiMovedRef, playerMovedRef } = action.payload;
      if (newState.isMate) {
        aiMovedRef.current = true;
        playerMovedRef.current = true;
      } else {
        aiMovedRef.current = true;
        playerMovedRef.current = false;
      }

      return {
        ...newState,
      };
    }

    case "STOP_CLOCK": {
      const newState = { ...state };
      const { aiMovedRef, playerMovedRef } = action.payload;
      if (newState.isMate) {
        aiMovedRef.current = true;
        playerMovedRef.current = true;
      }
      return {
        ...newState,
      };
    }

    case "START_AI_CLOCK": {
      const newState = { ...state };
      const { aiMovedRef, playerMovedRef } = action.payload;
      if (newState.isMate) {
        aiMovedRef.current = true;
        playerMovedRef.current = true;
      } else {
        aiMovedRef.current = false;
        playerMovedRef.current = true;
      }

      return {
        ...newState,
      };
    }

    case "SET_SELECT_CELL": {
      const newState = { ...state };
      const { cell, rowIndex, cellIndex } = action.payload;
      const colorOfSelectedFigure = chess.get(cell)?.color;
      console.log("color", state.side, colorOfSelectedFigure);

      if (
        colorOfSelectedFigure === state.side &&
        colorOfSelectedFigure === state.whoseMove
      ) {
        newState.selectedRowIndex = rowIndex;
        newState.selectedCellIndex = cellIndex;
        newState.selectedCell = cell;
        newState.availableMoves = chess.moves({
          square: cell,
          verbose: true,
          legal: true,
        });
        console.log(
          "availableMoves",
          newState.availableMoves,
          newState.selectedRowIndex,
          newState.selectedCellIndex,
          newState.selectedCell,
          newState.figures
        );
      }

      return newState;
    }

    case "SIDE": {
      const newState = { ...state };
      const { playerColor } = action.payload;
      newState.side = playerColor;
      console.log("playerColor", playerColor, newState.side);
      return newState;
    }

    case "AI_ANIMATION": {
      const newState = { ...state };
      const piece = chess.get(newState.fromStateAi);
      if (piece) {
        newState.movingPiece = newState.fromStateAi;
        newState.targetPosition = {
          x: newState.toStateAi.charCodeAt(0) - "a".charCodeAt(0),
          y: 8 - parseInt(newState.toStateAi[1]),
        };
        newState.isAiMoveInProgress = true;
      }
      newState.prevFigures = newState.figures;
      const newFigures = chess.board();
      if (JSON.stringify(newState.prevFigures) !== JSON.stringify(newFigures)) {
        newState.figures = newFigures;
      }

      return {
        ...newState,
      };
    }

    case "COMPLETE_MOVE":
      return {
        ...state,
        availableMoves: [],
        isMoveInProgress: false,
        history: chess.history({ verbose: true }),
        whoseMove: toggleMove(state.whoseMove),
        isCheck: chess.isCheck(),
        isMate: chess.isGameOver(),
        isDraw: chess.isDraw(),
        isAiMoveLoading: true,
        isAiMoveInProgress: true,
        figures: chess.board(),
      };

    case "UPDATE_AI_MOVE":
      return {
        ...state,
        figures: chess.board(),
        availableMoves: [],
        history: chess.history({ verbose: true }),
        whoseMove: toggleMove(state.whoseMove),
        isCheck: chess.isCheck(),
        isMate: chess.isGameOver(),
        isDraw: chess.isDraw(),
        isAiMoveLoading: false,
        isAiMoveInProgress: false,
        isMoveInProgress: true,
      };

    case "SET_WHOSE_MOVE":
      chess = new Chess();
      console.log("fig", chess.board());
      return {
        ...state,
        figures: chess.board(),
        selectedCell: null,
        isAiMoveLoading: true,
        history: [],
        whoseMove: "w",
      };

    case "NEW_GAME":
      chess = new Chess();
      console.log("fig", chess.board());
      return {
        ...state,
        figures: chess.board(),
        selectedCell: null,
        history: [],
        whoseMove: "w",
        isCheck: false,
        isMate: false,
        isDraw: false,
        isAiMove: false,
        movingPiece: null,
        targetPosition: null,
        selectedRowIndex: null,
        selectedCellIndex: null,
        isMoveInProgress: false,
        isAiMoveInProgress: false,
        toState: "",
        toStateAi: "",
        fromStateAi: "",
        bestMoveAi: "",
      };

    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  useEffect(() => {
    if (state.isAiMoveLoading) {
      const fetchAiMove = async () => {
        try {
          const response = await axios.post(
            "https://flask-chess-app-latest.onrender.com/make_move",
            new URLSearchParams({ fen: chess.fen() })
          );
          const { best_move } = response.data;
          console.log("best_move", best_move);
          state.bestMoveAi = best_move;

          let move;
          if (best_move === "O-O" || best_move === "O-O-O") {
            move =
              best_move === "O-O"
                ? { from: "e1", to: "g1" }
                : { from: "e1", to: "c1" };
          } else {
            const match = best_move.match(/^(.{2})(.{2})([qrbn]?)$/i);
            if (match) {
              const [, from, to, promotion] = match;
              move = { from, to };
              if (promotion) move.promotion = promotion;
            }
          }

          if (move) {
            // aiMovedRef.current = true;
            // playerMovedRef.current = false;
            state.fromStateAi = move.from;
            state.toStateAi = move.to;

            dispatch({ type: "AI_ANIMATION" });
          } else {
            console.error("Invalid best_move format:", best_move);
            fetchAiMove();
          }
          const timeoutId = setTimeout(() => {
            state.AiMoveLoading = false;
            // chess.move(best_move, { sloppy: true });
            chess.move({
              from: state.fromStateAi,
              to: state.toStateAi,
              ...(move.promotion ? { promotion: move.promotion } : {}),
            });
            dispatch({ type: "UPDATE_AI_MOVE" });
            console.log("hi1", best_move);
          }, 45);
          return () => clearTimeout(timeoutId);
        } catch (error) {
          console.error("Error making AI move:", error);
          fetchAiMove();
        }
      };

      const timeoutId = setTimeout(() => {
        fetchAiMove();
      }, 45);

      return () => clearTimeout(timeoutId);
    }
  }, [state.isAiMoveLoading]);

  useEffect(() => {
    console.log("Move progress check:", state.isMoveInProgress);
    const piece = chess.get(state.selectedCell);
    const isPromotion =
      piece &&
      piece.type === "p" &&
      (state.toState[1] === "8" || state.toState[1] === "1");

    if (state.isMoveInProgress) {
      const timeoutId = setTimeout(() => {
        // if (state.whoseMove === "w" && !state.isAiMoveInProgress) {
        if (!state.isAiMoveInProgress) {
          const moveConfig = chess.move({
            from: state.movingPiece,
            to: state.toState,
            ...(isPromotion ? { promotion: "q" } : {}),
          });

          if (moveConfig) {
            console.log("triggered", state);
            dispatch({ type: "COMPLETE_MOVE" });
          }
        }
      }, 45);

      return () => clearTimeout(timeoutId);
    }
  }, [state.isMoveInProgress, state.movingPiece, state.targetPosition]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
