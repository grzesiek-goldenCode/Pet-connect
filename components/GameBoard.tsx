"use client";
import { gameCell } from "@/types/types";
import { useEffect, useState } from "react";
import { PET_EMOJIS } from "@/data/data";
import {
  generateBoard,
  checkMatch,
  hasAvailAbleMoves,
  findHint,
} from "@/data/utils";
import { useGameStore } from "@/store/gameStore";
import GameMenu from "./GameMenu";
import GameOver from "./GameOver";
import Victory from "./Victory";
import PauseOverlay from "./PauseOverlay";

export default function GameBoard() {
  // maximum number of different images
  const max = 30;

  // values for game window
  const rows = 12;
  const cols = 16;

  const [firstSelected, setFirstSelected] = useState<number | undefined>();
  const [secondSelected, setSecondSelected] = useState<number | undefined>();

  // Zustand context
  const initializeBoard = useGameStore((state) => state.initializeBoard);
  const removeTiles = useGameStore((state) => state.removeTiles);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const setGameStatus = useGameStore((state) => state.setGameStatus);
  const gameBoard = useGameStore((state) => state.gameBoard);
  const addTime = useGameStore((state) => state.addTime);
  const addScore = useGameStore((state) => state.addScore);
  const subtractPair = useGameStore((state) => state.subtractPair);
  const hintIds = useGameStore((state) => state.hintIds);
  const clearHint = useGameStore((state) => state.clearHint);
  const isShuffling = useGameStore((state) => state.isShuffling);

  // create game board
  useEffect(() => {
    initializeBoard(rows, cols);
  }, [initializeBoard]);

  //   handle click and check if numbers are qual
  function handleClick(id: number) {
    if (gameBoard[id].value === -1) {
      return;
    } else {
      if (firstSelected === undefined) {
        setFirstSelected(id);
      } else {
        if (id === firstSelected) {
          setFirstSelected(undefined);
          return;
        }

        if (gameBoard[firstSelected].value === gameBoard[id].value) {
          if (
            checkMatch(
              gameBoard[firstSelected],
              gameBoard[id],
              rows,
              cols,
              gameBoard
            )
          ) {
            removeTiles(firstSelected, id);
            addTime(10);
            addScore(10);
            setFirstSelected(undefined);
            setSecondSelected(undefined);
            subtractPair();
            if (hintIds) {
              clearHint();
            }

            const allRemoved = gameBoard.every((tile) => tile.value === -1);
            if (allRemoved && gameStatus === "playing") {
              setGameStatus("won");
            }

            return;
          } else {
            setFirstSelected(undefined);
            setSecondSelected(undefined);
            return;
          }
        } else {
          setFirstSelected(undefined);
          setSecondSelected(undefined);
          return;
        }
      }
      return;
    }
  }

  if (gameStatus === "lost") {
    return <GameOver />;
  }
  if (gameStatus === "won") {
    return <Victory />;
  }
  return (
    <div
      className={`relative grid grid-cols-16 grid-rows-12 gap-2  h-[95vh] text-center transition-opacity duration-100 ${
        isShuffling ? "opacity-50" : "opacity-100"
      } `}
    >
      <div className="absolute inset-0 z-10 h-min">
        <GameMenu />
      </div>
      {gameBoard.map((i) => {
        const isSelected = firstSelected === i.id;
        const isHinted =
          !isSelected &&
          hintIds &&
          (i.id === hintIds[0] || i.id === hintIds[1]);
        return (
          <p
            key={i.id}
            onClick={() => handleClick(i.id)}
            className={`aspect-square flex items-center justify-center text-4xl transition-all ${
              isSelected
                ? "outline-3 outline-amber-500 -outline-offset-4px"
                : ""
            } ${
              isHinted
                ? "outline-4 outline-green-500 -outline-offset-4 animate-pulse"
                : ""
            }
            ${isShuffling ? "animate-card-flip" : ""}`}
          >
            {i.value !== -1 && PET_EMOJIS[i.value]}
          </p>
        );
      })}
      <PauseOverlay />
    </div>
  );
}
