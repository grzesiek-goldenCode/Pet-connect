"use client";
import GameBoard from "@/components/GameBoard";

import { useState } from "react";

export default function Home() {
  const [gameStart, setGameStart] = useState<boolean>(false);
  return (
    <div
      id="main-game"
      className="w-full h-screen flex items-center justify-center bg-linear-to-br from-black via-purple-950 to-slate-950 "
    >
      {!gameStart && (
        <div>
          <button onClick={() => setGameStart(true)} className="button">
            Rozpocznij grę!
          </button>
        </div>
      )}
      {gameStart && <GameBoard />}
    </div>
  );
}
