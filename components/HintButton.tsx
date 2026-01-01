import { useGameStore } from "@/store/gameStore";

export default function HintButton() {
  const hintsLeft = useGameStore((state) => state.hintsLeft);
  const showHint = useGameStore((state) => state.showHint);

  const buttonClass = hintsLeft === 0 ? "inactive-button" : "button";
  function handleHint() {
    if (hintsLeft > 0) {
      showHint();
    }
  }

  return (
    <div>
      <button onClick={handleHint} className={`${buttonClass}`}>
        Podpowiedź ({hintsLeft})
      </button>
    </div>
  );
}
