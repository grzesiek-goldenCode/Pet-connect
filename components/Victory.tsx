import { useGameStore } from "@/store/gameStore";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function Victory() {
  const resetGame = useGameStore((state) => state.resetGame);
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#a855f7", "#ec4899", "#f59e0b", "#10b981"];
    (function shootConfetti() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(shootConfetti);
      }
    })(); //() at end gives function execution, like "shootConfetti()"
  }, []);

  function triggerBigConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div
        onClick={triggerBigConfetti}
        className="flex flex-col justify-center items-center p-2 m-2"
      >
        <h2 className="text-4xl text-amber-400 m-3 font-bold">Wygrana!</h2>
        <p className="tetx-xl text-amber-400">Kliknij po więcej konfetti!!!</p>
      </div>
      <button onClick={resetGame} className="button">
        Zagraj Ponownie
      </button>
    </div>
  );
}
