import { useGameStore } from "@/store/gameStore";

export default function PauseButton() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const setGameStatus = useGameStore((state) => state.setGameStatus);

  function togglePause() {
    setGameStatus(gameStatus === "paused" ? "playing" : "paused");
  }
  return (
    <div className="w-1/4">
      <button onClick={togglePause} className=" button">
        {gameStatus === "playing" ? "Pauza" : "Graj Dalej"}
      </button>
    </div>
  );
}
