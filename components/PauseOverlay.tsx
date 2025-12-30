import { useGameStore } from "@/store/gameStore";

export default function PauseOverlay() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const setGameStatus = useGameStore((state) => state.setGameStatus);
  const resetGame = useGameStore((state) => state.resetGame);
  const pairsLeft = useGameStore((state) => state.pairsLeft);
  const timeLeft = useGameStore((state) => state.timeLeft);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (gameStatus !== "paused") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        onClick={() => setGameStatus("playing")}
      />
      <div className="relative z-10 flex flex-col justify-center items-center">
        <div className="mb-10 flex justify-between gap-20">
          <p className="text-white ">
            Pozostały czas: {minutes} : {seconds.toString().padStart(2, "0")}
          </p>
          <p className="text-white ">Pozostałe pary: {pairsLeft} / 70</p>
        </div>
        <div className="">
          <h2 className="text-2xl text-amber-400 p-2">Gra wstrzymana</h2>
          <p className="text-lg text-amber-400 p-2">
            Kliknij aby kontynuować grę
          </p>
          <p className="text-lg text-amber-400 p-2">lub:</p>
          <button
            onClick={resetGame}
            className="text-xl bg-amber-400 rounded-lg px-2 py-1 m-2 hover:bg-amber-500 hover:scale-103"
          >
            Zacznij od nowa
          </button>
        </div>
      </div>
    </div>
  );
}
