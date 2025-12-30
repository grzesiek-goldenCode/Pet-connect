import HintButton from "./HintButton";
import PauseButton from "./PauseButton";
import Score from "./Score";
import Timer from "./Timer";

export default function GameMenu() {
  return (
    <div className="flex items-center justify-evenly text-white">
      <PauseButton />
      <HintButton />
      <Timer />
      <Score />
    </div>
  );
}
