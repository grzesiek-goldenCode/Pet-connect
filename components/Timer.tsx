"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export default function Timer() {
  const timeLeft = useGameStore((state) => state.timeLeft);
  const decrementTime = useGameStore((state) => state.decrementTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(decrementTime, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, decrementTime]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-2xl font-bold">
      {minutes} : {seconds.toString().padStart(2, "0")}
    </div>
  );
}
