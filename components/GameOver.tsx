import { useGameStore } from "@/store/gameStore";

export default function GameOver() {
  const reset = useGameStore((state) => state.resetGame);
  return (
    <div className="flex flex-col w-full h-full items-center justify-center ">
      <p className="text-5xl text-amber-400 font-bold p-5">Koniec Gry!</p>
      <button
        onClick={reset}
        className="text-xl font-semi-bold p-2 bg-amber-400 rounded-lg hover:bg-amber-500 hover:scale-103"
      >
        Reset
      </button>
    </div>
  );
}
