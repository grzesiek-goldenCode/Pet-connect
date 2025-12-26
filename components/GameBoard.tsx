"use client";
import { gameCell } from "@/types/types";
import { useEffect, useState } from "react";
import { PET_EMOJIS } from "@/data/data";
import { generateBoard, checkMatch } from "@/data/utils";
import { useGameStore } from "@/store/gameStore";
import GameMenu from "./GameMenu";
import GameOver from "./GameOver";

export default function GameBoard() {
  // maximum number of different images
  const max = 30;

  // values for game window
  const rows = 10;
  const cols = 14;

  const [firstSelected, setFirstSelected] = useState<number | undefined>();
  const [secondSelected, setSecondSelected] = useState<number | undefined>();

  // Zustand context
  const initializeBoard = useGameStore((state) => state.initializeBoard);
  const gameBoard = useGameStore((state) => state.gameBoard);
  const addTime = useGameStore((state) => state.addTime);
  const addScore = useGameStore((state) => state.addScore);
  const timeLeft = useGameStore((state) => state.timeLeft);

  // create game board
  useEffect(() => {
    initializeBoard(12, 16);
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
            gameBoard[firstSelected].value = -1;
            gameBoard[id].value = -1;
            addTime(10);
            addScore(10);
            setFirstSelected(undefined);
            setSecondSelected(undefined);
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

  if (timeLeft === 0) {
    return <GameOver />;
  }
  return (
    <div
      className={`relative grid grid-cols-16 grid-rows-12 gap-2 border-2 h-[95vh] text-center bg-black`}
    >
      <div className="absolute inset-0 z-10 h-min">
        <GameMenu />
      </div>
      {gameBoard.map((i) => (
        <p
          key={i.id}
          onClick={() => handleClick(i.id)}
          className={`aspect-square flex items-center justify-center text-4xl ${
            i.id === firstSelected
              ? "outline-3 outline-amber-500 -outline-offset-4px"
              : ""
          }`}
        >
          {i.value >= 0 && PET_EMOJIS[i.value]}
        </p>
      ))}
    </div>
  );
}
