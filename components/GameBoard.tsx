"use client";
import { gameCell } from "@/types/types";
import { useEffect, useState } from "react";
import { PET_EMOJIS } from "@/data/data";
import { generateBoard } from "@/data/utils";

export default function GameBoard() {
  // maximum number of different images
  const max = 30;

  // values for game window
  const rows = 10;
  const cols = 14;

  const [gameBoard, setGameBoard] = useState<gameCell[]>([]);
  const [firstSelected, setFirstSelected] = useState<number | undefined>();
  const [secondSelected, setSecondSelected] = useState<number | undefined>();
  // create game board
  useEffect(() => {
    // add 2 to rows and col for empty space around game board
    setGameBoard(generateBoard(rows + 2, cols + 2));
  }, []);

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
          gameBoard[firstSelected].value = -1;
          gameBoard[id].value = -1;
          setFirstSelected(undefined);
          setSecondSelected(undefined);
          return;
        } else {
          setFirstSelected(undefined);
          setSecondSelected(undefined);
          return;
        }
      }
      return;
    }
  }
  return (
    <div
      className={`grid grid-cols-${cols + 2} grid-rows-${
        rows + 2
      } gap-2 border-2 h-[95vh] text-center bg-black`}
    >
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
