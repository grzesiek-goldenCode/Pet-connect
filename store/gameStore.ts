import { generateBoard } from "@/data/utils";
import { gameCell } from "@/types/types";
import { stat } from "fs";
import { create } from "zustand";

interface GameStore {
  gameBoard: gameCell[];
  timeLeft: number;
  score: number;

  initializeBoard: (rows: number, cols: number) => void;
  addTime: (seconds: number) => void;
  addScore: (seconds: number) => void;
  decrementTime: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameBoard: [],
  timeLeft: 300,
  score: 0,

  initializeBoard: (rows, cols) => {
    const board = generateBoard(rows, cols);
    set({ gameBoard: board, score: 0, timeLeft: 300 });
  },
  addTime: (seconds) =>
    set((state) => ({
      timeLeft: state.timeLeft + seconds,
    })),
  addScore: (points) =>
    set((state) => ({
      score: state.score + points,
    })),
  decrementTime: () =>
    set((state) => ({
      timeLeft: Math.max(0, state.timeLeft - 1),
    })),
  resetGame: () => {
    const board = generateBoard(12, 16);
    set((state) => ({
      gameBoard: board,
      timeLeft: 300,
      score: 0,
    }));
  },
}));
