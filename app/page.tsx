"use client";
import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <div
      id="main-game"
      className="w-full h-screen flex items-center justify-center"
    >
      <GameBoard />
    </div>
  );
}
