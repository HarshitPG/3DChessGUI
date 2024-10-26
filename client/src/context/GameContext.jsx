import { createContext, useEffect, useReducer } from "react";
import { Chess } from "chess.js";
import axios from "axios";
import PropTypes from "prop-types";
import { useSpring } from "react-spring";

// Initial chess setup
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
  isAiMove: false,
  isAiMoveLoading: false,
};

const getMovePath = (pieceType, from, to) => {
  // Custom logic for each piece type
  if (pieceType === "n") {
    // Knight (L shape, jumps directly to destination)
    return [{ x: to[0], y: to[1] }];
  } else if (pieceType === "r") {
    // Rook (straight lines)
    return [
      { x: from[0], y: from[1] },
      { x: to[0], y: to[1] },
    ];
  } else if (pieceType === "b") {
    // Bishop (diagonal lines)
    return [
      { x: from[0], y: from[1] },
      { x: to[0], y: to[1] },
    ];
  } else if (pieceType === "q") {
    // Queen (straight or diagonal)
    return [
      { x: from[0], y: from[1] },
      { x: to[0], y: to[1] },
    ];
  } else if (pieceType === "k") {
    // King (one square any direction)
    return [{ x: to[0], y: to[1] }];
  } else {
    // Default case for pawns and other pieces
    return [{ x: to[0], y: to[1] }];
  }
};
// Create Context
export const GameContext = createContext();

// Reducer function for state management
const gameReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_FIGURE": {
      const newState = { ...state };
      const { aiMovedRef, playerMovedRef, target } = action.payload;
      if (newState.whoseMove === "w") {
        if (newState.selectedCell && newState.gameType === "AI") {
          console.log("from", newState.selectedCell);

          // const move = chess.move({
          //   from: newState.selectedCell,
          //   to: target,
          //   promotion: "q",
          // });
          const piece = chess.get(newState.selectedCell);
          const isPromotion =
            piece &&
            piece.type === "p" &&
            (target[1] === "8" || target[1] === "1");

          const moveConfig = chess.move({
            from: newState.selectedCell,
            to: target,
            ...(isPromotion ? { promotion: "q" } : {}), // Conditionally add promotion
          });

          if (moveConfig) {
            // Apply animation based on piece type and destination
            const movePath = getMovePath(
              piece.type,
              newState.selectedCell,
              target
            );

            movePath.forEach((step, index) => {
              setTimeout(() => {
                newState.figures = chess.board();
              }, index * 3000); // Adjust time delay for each step
            });

            console.log("move", moveConfig);
            newState.selectedCell = null;
            newState.availableMoves = [];
            newState.history = chess.history({ verbose: true });
            newState.whoseMove = "b";
            newState.isCheck = chess.isCheck();
            newState.isMate = chess.isGameOver();
            newState.isDraw = chess.isDraw();
            newState.isAiMoveLoading = true;
            // aiMovedRef.current = false;
            // playerMovedRef.current = true;

            if (newState.isMate) {
              aiMovedRef.current = true;
              playerMovedRef.current = true;
            }
          }
          console.log("board", chess.fen());
          if (newState.whoseMove === "b" && newState.gameType === "AI") {
            // axios
            //   .post(
            //     "http://127.0.0.1:5000/make_move",
            //     new URLSearchParams({ fen: chess.fen() })
            //   )
            //   .then((response) => {
            //     const data = response.data;
            //     const ismoved = data.best_move;
            //     chess.move(ismoved, { sloppy: true });
            //     newState.selectedCell = null;
            //     newState.availableMoves = [];
            //     newState.history = chess.history({ verbose: true });
            //     newState.whoseMove = "w";
            //     newState.isCheck = chess.isCheck();
            //     newState.isMate = chess.isGameOver();
            //     newState.isDraw = chess.isDraw();
            //     newState.ismovedCheck = ismoved;
            //   })
            //   .catch((error) => {
            //     console.error("Error making AI move:", error);
            //     // Handle the error gracefully, e.g., show a message to the user
            //     newState.whoseMove = "w";
            //   });
          }
        }
        newState.prevFigures = newState.figures;
        const newFigures = chess.board();
        console.log("new figure ", newFigures);
        if (
          JSON.stringify(newState.prevFigures) !== JSON.stringify(newFigures)
        ) {
          newState.figures = newFigures;
        }

        console.log("newstate", newState);
        // console.log("state", ...state);
      }

      return {
        ...newState,
      };
    }
    case "SET_SELECT_CELL": {
      const newState = { ...state };
      const colorOfSelectedFigure = chess.get(action.payload)?.color;

      // Allow selecting cell if it's the current player's turn
      if (colorOfSelectedFigure === state.whoseMove) {
        newState.selectedCell = action.payload;
        newState.availableMoves = chess.moves({
          square: action.payload,
          verbose: true,
          legal: true,
        });
        console.log("availableMoves", newState.availableMoves);
      }

      return newState;
    }

    case "UPDATE_AI_MOVE":
      return {
        ...state,
        figures: chess.board(),
        history: chess.history({ verbose: true }),
        whoseMove: "w",
        isCheck: chess.isCheck(),
        isMate: chess.isGameOver(),
        isDraw: chess.isDraw(),
        isAiMoveLoading: false,
      };

    case "SET_WHOSE_MOVE":
      chess = new Chess();
      return {
        ...state,
        figures: chess.board(),
        selectedCell: null,
        history: [],
        whoseMove: action.payload,
      };

    default:
      return state;
  }
};

// Provider component to wrap the app
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const animatedProps = useSpring({
    to: async (next) => {
      const movePath = getMovePath(
        state.selectedCell,
        state.prevFigures,
        state.figures
      );

      // Move the piece along the calculated path
      for (const step of movePath) {
        await next({
          transform: `translate(${step.x * 100}%, ${step.y * 100}%)`,
        });
      }
    },
    from: { transform: `translate(0%, 0%)` },
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    if (state.isAiMoveLoading) {
      const fetchAiMove = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/make_move",
            new URLSearchParams({ fen: chess.fen() })
          );
          const { best_move } = response.data;
          chess.move(best_move, { sloppy: true });
          dispatch({ type: "UPDATE_AI_MOVE" });
        } catch (error) {
          console.error("Error making AI move:", error);
          dispatch({ type: "UPDATE_AI_MOVE" }); // Reset loading even on error
        }
      };

      const timeoutId = setTimeout(() => {
        fetchAiMove();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [state.isAiMoveLoading]);

  return (
    <GameContext.Provider value={{ state, dispatch, animatedProps }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
