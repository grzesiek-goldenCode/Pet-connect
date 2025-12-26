"use client";
import { useGameStore } from "@/store/gameStore";

export default function Score() {
  const score = useGameStore((state) => state.score);
  return <div className="text-xl">Wynik: {score}</div>;
}
