import Score from "./Score";
import Timer from "./Timer";

export default function GameMenu() {
  return (
    <div className="flex items-center justify-evenly text-white">
      <button>Pauza</button>
      <Timer />
      <Score />
    </div>
  );
}
