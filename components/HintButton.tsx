import { useGameStore } from "@/store/gameStore";

export default function HintButton() {
  const hintsLeft = useGameStore((state) => state.hintsLeft);
  const showHint = useGameStore((state) => state.showHint);
  const shuffle = useGameStore((state) => state.reshuffleBoard);
  const buttonClass = hintsLeft === 0 ? "inactive-button" : "button";
  function handleHint() {
    if (hintsLeft > 0) {
      showHint();
    }
  }
  function handleShuffle() {
    shuffle();
  }

  return (
    <div>
      <button onClick={handleHint} className={`${buttonClass}`}>
        Podpowiedź ({hintsLeft})
      </button>
      <button onClick={handleShuffle} className="button">
        Zamieszaj
      </button>
    </div>
  );
}
