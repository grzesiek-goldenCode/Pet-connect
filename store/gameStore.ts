import { checkMatch, findHint, generateBoard } from "@/data/utils";
import { gameCell } from "@/types/types";
import { stat, Stats } from "fs";
import { create } from "zustand";

type GameStatus = "playing" | "won" | "lost" | "paused";

interface GameStore {
  gameBoard: gameCell[];
  timeLeft: number;
  score: number;
  gameStatus: GameStatus;
  pairsLeft: number;
  hintIds: [number, number] | null;
  hintsLeft: number;
  isShuffling: boolean;

  initializeBoard: (rows: number, cols: number) => void;
  removeTiles: (tile1: number, tile2: number) => void;
  setGameStatus: (status: GameStatus) => void;
  addTime: (seconds: number) => void;
  addScore: (seconds: number) => void;
  decrementTime: () => void;
  resetGame: () => void;
  subtractPair: () => void;
  showHint: () => void;
  clearHint: () => void;
  checkForAvailAbleMoves: () => boolean;
  reshuffleBoard: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameBoard: [],
  timeLeft: 300,
  score: 0,
  gameStatus: "playing",
  pairsLeft: 70,
  hintIds: null,
  hintsLeft: 5,
  isShuffling: false,

  initializeBoard: (rows, cols) => {
    const board = generateBoard(rows, cols);
    set({ gameBoard: board, score: 0, timeLeft: 300 });
  },
  removeTiles: (tile1, tile2) => {
    set((state) => ({
      gameBoard: state.gameBoard.map((tile) =>
        tile.id === tile1 || tile.id === tile2 ? { ...tile, value: -1 } : tile
      ),
    }));
    setTimeout(() => {
      console.log("sprawdzam ruchy");
      const hasMoves = get().checkForAvailAbleMoves();
      if (!hasMoves) {
        setTimeout(() => {
          get().reshuffleBoard();
        }, 1000);
      }
    }, 100);
  },

  setGameStatus: (status) => set({ gameStatus: status }),

  addTime: (seconds) =>
    set((state) => ({
      timeLeft: state.timeLeft + seconds,
    })),

  addScore: (points) =>
    set((state) => ({
      score: state.score + points,
    })),

  decrementTime: () => {
    set((state) => {
      const newTime = Math.max(0, state.timeLeft - 1);
      if (newTime === 0 && state.gameStatus === "playing") {
        return { timeLeft: 0, gameStatus: "lost" };
      }
      return { timeLeft: newTime };
    });
  },

  resetGame: () => {
    const board = generateBoard(12, 16);
    set({
      gameBoard: board,
      timeLeft: 300,
      score: 0,
      gameStatus: "playing",
      pairsLeft: 70,
      hintsLeft: 5,
    });
  },
  subtractPair: () => {
    set((state) => ({ pairsLeft: state.pairsLeft - 1 }));
  },
  showHint: () => {
    const state = get();
    const hint = findHint(state.gameBoard, 12, 16, checkMatch);

    if (hint) {
      set({
        hintIds: hint,
        hintsLeft: state.hintsLeft - 1,
        timeLeft: state.timeLeft - 20,
      });
      setTimeout(() => {
        get().clearHint();
      }, 2000);
    } else {
      alert("Ups.. brak możliwych ruchów!");
    }
  },
  clearHint: () => {
    set({ hintIds: null });
  },
  checkForAvailAbleMoves: () => {
    const state = get();
    const hint = findHint(state.gameBoard, 12, 16, checkMatch);
    return hint !== null;
  },
  reshuffleBoard: () => {
    const state = get();
    set({ isShuffling: true });

    setTimeout(() => {
      const values: number[] = [];
      const currentBoard = get().gameBoard;
      currentBoard.forEach((tile) => {
        if (tile.value !== -1) {
          values.push(tile.value);
        }
        for (let i = values.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [values[i], values[j]] = [values[j], values[i]];
        }
      });
      let valueIndex = 0;
      const newBoard = currentBoard.map((tile) => {
        if (tile.value !== -1) {
          return { ...tile, value: values[valueIndex++] };
        }
        return tile;
      });

      set({ gameBoard: newBoard });
    }, 800);
    setTimeout(() => {
      set({ isShuffling: false });
    }, 1200);
    setTimeout(() => {
      get().checkForAvailAbleMoves();
    }, 1500);
  },
}));
